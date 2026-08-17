import { supabase } from '../lib/supabase';
import { mockUsersList } from '../admin/data/users';
import { addAuditLog } from './auditService';
import type { User, UserRole, AccountStatus } from '../shared/types/user';

let localUsersStore: User[] = [...mockUsersList];

const mapProfileToUser = (profile: any): User => {
  const statusMap: Record<string, AccountStatus> = {
    'ACTIVE': 'Active',
    'INACTIVE': 'Inactive',
    'LOCKED': 'Locked',
    'PENDING': 'Pending'
  };

  const deptName = profile.role === 'ADMIN'
    ? 'Central Administration'
    : (profile.department?.name || (profile.department_id ? 'Loading Department...' : 'Department not assigned'));

  return {
    id: profile.id,
    userId: profile.usn_or_employee_id || profile.id.substring(0, 8),
    name: profile.full_name || profile.email.split('@')[0],
    email: profile.email,
    phone: '+91 98765 00000',
    role: profile.role,
    departmentId: profile.department_id || profile.department?.id || '',
    departmentName: deptName,
    designation: profile.role === 'HOD' ? 'Professor & HOD' : (profile.role === 'FACULTY' ? 'Assistant Professor' : undefined),
    status: statusMap[profile.account_status] || 'Active',
    lastActivity: 'Active on platform',
    createdAt: profile.created_at ? profile.created_at.split('T')[0] : new Date().toISOString().split('T')[0]
  };
};

export const getUsers = async (
  filterRole?: string,
  filterDept?: string,
  filterStatus?: string,
  searchQuery?: string,
  sortBy?: string
): Promise<User[]> => {
  try {
    const { data: dbProfiles, error } = await (supabase as any)
      .from('profiles')
      .select(`
        *,
        department:departments (
          id,
          name,
          code
        )
      `)
      .order('created_at', { ascending: false });

    let result: User[] = [];

    if (!error && dbProfiles && dbProfiles.length > 0) {
      result = dbProfiles.map((p: any) => mapProfileToUser(p));
    } else {
      result = [...localUsersStore];
    }

    if (filterRole && filterRole !== 'All') {
      result = result.filter(u => u.role === filterRole);
    }
    if (filterDept && filterDept !== 'All') {
      result = result.filter(u => u.departmentId === filterDept || u.departmentName.toLowerCase().includes(filterDept.toLowerCase()));
    }
    if (filterStatus && filterStatus !== 'All') {
      result = result.filter(u => u.status === filterStatus);
    }
    if (searchQuery && searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(u => 
        u.name.toLowerCase().includes(q) ||
        u.userId.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q)
      );
    }

    if (sortBy) {
      if (sortBy === 'Name') {
        result.sort((a, b) => a.name.localeCompare(b.name));
      } else if (sortBy === 'Role') {
        result.sort((a, b) => a.role.localeCompare(b.role));
      } else if (sortBy === 'Department') {
        result.sort((a, b) => a.departmentName.localeCompare(b.departmentName));
      } else if (sortBy === 'Status') {
        result.sort((a, b) => a.status.localeCompare(b.status));
      }
    }

    return result;
  } catch (err) {
    console.error("Error in getUsers:", err);
    return localUsersStore;
  }
};

export const getUserById = async (id: string): Promise<User | null> => {
  try {
    const { data: profile, error } = await (supabase as any)
      .from('profiles')
      .select(`
        *,
        department:departments (
          id,
          name,
          code
        )
      `)
      .or(`id.eq.${id},usn_or_employee_id.eq.${id}`)
      .single();

    if (!error && profile) {
      return mapProfileToUser(profile);
    }
  } catch {
    // Fallback to local
  }
  const u = localUsersStore.find(user => user.id === id || user.userId.toLowerCase() === id.toLowerCase());
  return u || null;
};

export const createUser = async (data: Omit<User, 'id' | 'createdAt' | 'lastActivity'> & { password?: string }): Promise<User> => {
  const tempPassword = data.password || `Aiet@${Math.floor(100000 + Math.random() * 900000)}`;

  try {
    const { data: edgeData, error: edgeError } = await supabase.functions.invoke('admin-provision-user', {
      body: {
        fullName: data.name,
        usn_or_employee_id: data.userId,
        email: data.email,
        department_id: data.departmentId,
        password: tempPassword,
        role: data.role
      }
    });

    if (edgeError) {
      let customErrorMsg = edgeError.message;
      try {
        if (edgeError.context && typeof edgeError.context.json === 'function') {
          const errJson = await edgeError.context.json();
          if (errJson && errJson.error) {
            customErrorMsg = errJson.error;
          }
        }
      } catch {
        // Keep default edgeError.message if json parse fails
      }
      throw new Error(customErrorMsg || 'Provisioning failed via Edge Function.');
    }

    if (edgeData && edgeData.error) {
      throw new Error(edgeData.error);
    }

    if (edgeData && edgeData.user) {
      // Re-fetch user by ID to get full department relation
      const createdUser = await getUserById(edgeData.user.id);
      
      addAuditLog({
        actorUserId: 'ADM-001',
        actorName: 'System Administrator',
        action: 'USER_CREATED',
        targetUserId: data.userId,
        targetUserName: data.name,
        timestamp: new Date().toLocaleString(),
        metadata: `Provisioned via Edge Function. Role: ${data.role}`,
        status: 'Success'
      });

      return createdUser || mapProfileToUser(edgeData.user);
    }
  } catch (err: unknown) {
    if (err instanceof Error && !err.message.includes('Failed to fetch')) {
      throw err;
    }
  }

  // Local fallback if edge function unavailable
  const newUser: User = {
    ...data,
    id: `usr-${Math.floor(100 + Math.random() * 900)}`,
    createdAt: new Date().toISOString().split('T')[0],
    lastActivity: 'Just created'
  };

  localUsersStore.unshift(newUser);
  return newUser;
};

export const updateUser = async (id: string, updates: Partial<User>): Promise<User | null> => {
  const dbStatusMap: Record<string, string> = {
    'Active': 'ACTIVE',
    'Inactive': 'INACTIVE',
    'Locked': 'LOCKED',
    'Pending': 'PENDING'
  };

  const payload: any = {
    updated_at: new Date().toISOString()
  };

  if (updates.name !== undefined) payload.full_name = updates.name;
  if (updates.departmentId !== undefined) payload.department_id = updates.departmentId || null;
  if (updates.status !== undefined && dbStatusMap[updates.status]) {
    payload.account_status = dbStatusMap[updates.status];
  }
  if (updates.role !== undefined && updates.role !== 'ADMIN') {
    payload.role = updates.role;
  }

  try {
    const { error } = await (supabase as any)
      .from('profiles')
      .update(payload)
      .eq('id', id);

    if (error) {
      console.error('Error updating profile in Supabase:', error);
      throw new Error(error.message);
    }
  } catch (err: any) {
    console.error('Failed to update user profile in Supabase:', err);
    throw err;
  }

  const updatedUser = await getUserById(id);
  return updatedUser;
};

export const deactivateUser = async (id: string): Promise<User | null> => {
  return updateUserStatus(id, 'Inactive', 'ACCOUNT_DEACTIVATED', 'Account deactivated by Administrator');
};

export const reactivateUser = async (id: string): Promise<User | null> => {
  return updateUserStatus(id, 'Active', 'ACCOUNT_REACTIVATED', 'Account reactivated by Administrator');
};

export const lockUser = async (id: string): Promise<User | null> => {
  return updateUserStatus(id, 'Locked', 'ACCOUNT_LOCKED', 'Account administrative lock applied');
};

export const unlockUser = async (id: string): Promise<User | null> => {
  return updateUserStatus(id, 'Active', 'ACCOUNT_UNLOCKED', 'Account administrative lock removed');
};

export const changeUserRole = async (id: string, newRole: UserRole): Promise<User | null> => {
  if (newRole === 'ADMIN') {
    throw new Error("Client cannot elevate user to ADMIN role.");
  }
  return updateUser(id, { role: newRole });
};

export const resetUserPassword = async (id: string): Promise<boolean> => {
  const user = await getUserById(id);
  if (user && user.email) {
    const { error } = await supabase.auth.resetPasswordForEmail(user.email);
    return !error;
  }
  return false;
};

export const generateTempCredential = async (id: string): Promise<string | null> => {
  return `TOKEN-TEMP-${Math.floor(1000 + Math.random() * 9000)}`;
};

const updateUserStatus = async (id: string, status: AccountStatus, auditAction: any, metadata: string): Promise<User | null> => {
  const dbStatusMap: Record<string, string> = {
    'Active': 'ACTIVE',
    'Inactive': 'INACTIVE',
    'Locked': 'LOCKED',
    'Pending': 'PENDING'
  };

  try {
    const { error: edgeErr } = await supabase.functions.invoke('admin-provision-user', {
      body: {
        action: 'update_status',
        targetUserId: id,
        newStatus: dbStatusMap[status] || 'ACTIVE'
      }
    });

    if (edgeErr) {
      await (supabase as any)
        .from('profiles')
        .update({
          account_status: dbStatusMap[status] || 'ACTIVE',
          updated_at: new Date().toISOString()
        })
        .or(`id.eq.${id},usn_or_employee_id.eq.${id}`);
    }
  } catch {
    // Ignored if offline
  }

  const updatedUser = await getUserById(id);
  return updatedUser;
};
