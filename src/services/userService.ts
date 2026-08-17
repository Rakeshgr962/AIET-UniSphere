import { mockUsersList } from '../admin/data/users';
import { mockStudentsRoster } from '../data/students';
import type { ExtendedStudent } from '../data/students';
import { mockFacultyRoster } from '../data/faculty';
import type { FacultyMember } from '../data/faculty';
import { addAuditLog } from './auditService';
import type { User, UserRole, AccountStatus } from '../shared/types/user';

let usersStore: User[] = [...mockUsersList];

export const getUsers = async (
  filterRole?: string,
  filterDept?: string,
  filterStatus?: string,
  searchQuery?: string,
  sortBy?: string
): Promise<User[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let result = [...usersStore];

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

      resolve(result);
    }, 120);
  });
};

export const getUserById = async (id: string): Promise<User | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const u = usersStore.find(user => user.id === id || user.userId.toLowerCase() === id.toLowerCase());
      resolve(u || null);
    }, 100);
  });
};

export const createUser = async (data: Omit<User, 'id' | 'createdAt' | 'lastActivity'>): Promise<User> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newUser: User = {
        ...data,
        id: `usr-${Math.floor(100 + Math.random() * 900)}`,
        createdAt: new Date().toISOString().split('T')[0],
        lastActivity: 'Just created'
      };

      usersStore.unshift(newUser);

      // Synchronize with shared Student roster if STUDENT
      if (newUser.role === 'STUDENT') {
        const newStudent: ExtendedStudent = {
          id: `std-${newUser.id}`,
          name: newUser.name,
          usn: newUser.userId,
          department: newUser.departmentName,
          semester: newUser.semester || 6,
          academicYear: '2026–27',
          cgpa: 7.5,
          email: newUser.email,
          phone: newUser.phone || '+91 98765 00000',
          attendancePercent: 85,
          assignmentsCompleted: 10,
          assignmentsTotal: 10,
          academicStatus: 'Good Standing',
          coursePerformance: []
        };
        mockStudentsRoster.unshift(newStudent);
      }

      // Synchronize with shared Faculty roster if FACULTY or HOD
      if (newUser.role === 'FACULTY' || newUser.role === 'HOD') {
        const newFaculty: FacultyMember = {
          id: `fac-${newUser.id}`,
          employeeId: newUser.userId,
          name: newUser.name,
          department: newUser.departmentName,
          departmentId: newUser.departmentId,
          designation: newUser.role === 'HOD' ? 'Professor & HOD' : (newUser.designation as any || 'Assistant Professor'),
          email: newUser.email,
          phone: newUser.phone || '+91 98450 00000',
          status: newUser.status === 'Active' ? 'Active' : 'On Leave',
          assignedCourses: [],
          totalStudents: 0,
          assignmentsCreatedCount: 0,
          attendanceLogCount: 0
        };
        mockFacultyRoster.unshift(newFaculty);
      }

      // Record Audit Event
      addAuditLog({
        actorUserId: 'ADM-001',
        actorName: 'System Administrator',
        action: 'USER_CREATED',
        targetUserId: newUser.userId,
        targetUserName: newUser.name,
        timestamp: new Date().toLocaleString(),
        metadata: `Role: ${newUser.role}, Dept: ${newUser.departmentName}`,
        status: 'Success'
      });

      resolve(newUser);
    }, 150);
  });
};

export const updateUser = async (id: string, updates: Partial<User>): Promise<User | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = usersStore.findIndex(u => u.id === id || u.userId === id);
      if (index !== -1) {
        const updated = {
          ...usersStore[index],
          ...updates,
          lastActivity: 'Updated just now'
        };
        usersStore[index] = updated;

        // Synchronize with Student Roster
        const stdIdx = mockStudentsRoster.findIndex(s => s.usn === updated.userId);
        if (stdIdx !== -1) {
          mockStudentsRoster[stdIdx] = {
            ...mockStudentsRoster[stdIdx],
            name: updated.name,
            email: updated.email,
            department: updated.departmentName,
            semester: updated.semester || mockStudentsRoster[stdIdx].semester
          };
        }

        // Synchronize with Faculty Roster
        const facIdx = mockFacultyRoster.findIndex(f => f.employeeId === updated.userId);
        if (facIdx !== -1) {
          mockFacultyRoster[facIdx] = {
            ...mockFacultyRoster[facIdx],
            name: updated.name,
            email: updated.email,
            department: updated.departmentName,
            departmentId: updated.departmentId
          };
        }

        addAuditLog({
          actorUserId: 'ADM-001',
          actorName: 'System Administrator',
          action: 'USER_UPDATED',
          targetUserId: updated.userId,
          targetUserName: updated.name,
          timestamp: new Date().toLocaleString(),
          metadata: 'User profile details updated',
          status: 'Success'
        });

        resolve(updated);
      } else {
        resolve(null);
      }
    }, 150);
  });
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
  return new Promise((resolve) => {
    setTimeout(() => {
      const idx = usersStore.findIndex(u => u.id === id || u.userId === id);
      if (idx !== -1) {
        const oldRole = usersStore[idx].role;
        usersStore[idx] = {
          ...usersStore[idx],
          role: newRole,
          lastActivity: `Role changed to ${newRole}`
        };

        addAuditLog({
          actorUserId: 'ADM-001',
          actorName: 'System Administrator',
          action: 'ROLE_CHANGED',
          targetUserId: usersStore[idx].userId,
          targetUserName: usersStore[idx].name,
          timestamp: new Date().toLocaleString(),
          metadata: `Role changed from ${oldRole} → ${newRole}`,
          status: 'Success'
        });

        resolve(usersStore[idx]);
      } else {
        resolve(null);
      }
    }, 150);
  });
};

export const resetUserPassword = async (id: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const idx = usersStore.findIndex(u => u.id === id || u.userId === id);
      if (idx !== -1) {
        usersStore[idx] = {
          ...usersStore[idx],
          passwordStatus: 'Reset Required',
          lastPasswordReset: new Date().toISOString().split('T')[0]
        };

        addAuditLog({
          actorUserId: 'ADM-001',
          actorName: 'System Administrator',
          action: 'PASSWORD_RESET_REQUESTED',
          targetUserId: usersStore[idx].userId,
          targetUserName: usersStore[idx].name,
          timestamp: new Date().toLocaleString(),
          metadata: 'Administrative password reset link issued',
          status: 'Success'
        });

        resolve(true);
      } else {
        resolve(false);
      }
    }, 150);
  });
};

export const generateTempCredential = async (id: string): Promise<string | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const idx = usersStore.findIndex(u => u.id === id || u.userId === id);
      if (idx !== -1) {
        usersStore[idx] = {
          ...usersStore[idx],
          passwordStatus: 'Temporary',
          lastPasswordReset: new Date().toISOString().split('T')[0]
        };

        addAuditLog({
          actorUserId: 'ADM-001',
          actorName: 'System Administrator',
          action: 'TEMPORARY_CREDENTIAL_GENERATED',
          targetUserId: usersStore[idx].userId,
          targetUserName: usersStore[idx].name,
          timestamp: new Date().toLocaleString(),
          metadata: 'One-time temporary credential token generated',
          status: 'Success'
        });

        // Return a mock token identifier (NOT a plaintext password)
        resolve(`TOKEN-TEMP-${Math.floor(1000 + Math.random() * 9000)}`);
      } else {
        resolve(null);
      }
    }, 150);
  });
};

const updateUserStatus = (id: string, status: AccountStatus, auditAction: any, metadata: string): Promise<User | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const idx = usersStore.findIndex(u => u.id === id || u.userId === id);
      if (idx !== -1) {
        usersStore[idx] = {
          ...usersStore[idx],
          status,
          lastActivity: `Status updated to ${status}`
        };

        addAuditLog({
          actorUserId: 'ADM-001',
          actorName: 'System Administrator',
          action: auditAction,
          targetUserId: usersStore[idx].userId,
          targetUserName: usersStore[idx].name,
          timestamp: new Date().toLocaleString(),
          metadata,
          status: 'Success'
        });

        resolve(usersStore[idx]);
      } else {
        resolve(null);
      }
    }, 150);
  });
};
