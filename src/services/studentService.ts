import { supabase } from '../lib/supabase';
import type { ServiceTypeItem, ServiceRequestItem, CreateServiceRequestPayload } from '../data/studentServices';
import { mockServiceTypes, mockServiceRequests } from '../data/studentServices';
import type { StudentProfile, ExtendedStudent } from '../data/students';

let localRequests: ServiceRequestItem[] = [...mockServiceRequests];

const mapProfileToStudent = (profile: any, studentProf?: any): ExtendedStudent => {
  const deptName = profile.department?.name || (profile.department_id ? 'Loading Department...' : 'Department not assigned');

  return {
    id: profile.id,
    name: profile.full_name || profile.email.split('@')[0],
    usn: profile.usn_or_employee_id || 'N/A',
    email: profile.email,
    phone: studentProf?.phone || null,
    department: deptName,
    semester: studentProf?.semester != null ? Number(studentProf.semester) : null,
    academicYear: studentProf?.academic_year || null,
    cgpa: studentProf?.cgpa != null ? Number(studentProf.cgpa) : null,
    dateOfBirth: studentProf?.date_of_birth || null,
    gender: studentProf?.gender || null,
    address: studentProf?.address || null,
    city: studentProf?.city || null,
    state: studentProf?.state || null,
    pincode: studentProf?.pincode || null,
    parentName: studentProf?.parent_name || null,
    parentPhone: studentProf?.parent_phone || null,
    attendancePercent: null,
    assignmentsCompleted: null,
    assignmentsTotal: null,
    academicStatus: 'Good Standing',
    coursePerformance: []
  };
};

export const getStudentProfile = async (): Promise<StudentProfile | null> => {
  try {
    const { data: { user } } = await (supabase as any).auth.getUser();
    if (!user) return null;

    const { data: profile } = await (supabase as any)
      .from('profiles')
      .select(`
        *,
        department:departments (
          id,
          name,
          code
        )
      `)
      .eq('id', user.id)
      .single();

    if (!profile) return null;

    const { data: studentProf } = await (supabase as any)
      .from('student_profiles')
      .select('*')
      .eq('profile_id', user.id)
      .maybeSingle();

    return {
      name: profile.full_name || profile.email.split('@')[0],
      usn: profile.usn_or_employee_id || 'N/A',
      department: profile.department?.name || (profile.department_id ? 'Loading...' : 'Department not assigned'),
      semester: studentProf?.semester != null ? Number(studentProf.semester) : null,
      academicYear: studentProf?.academic_year || null,
      cgpa: studentProf?.cgpa != null ? Number(studentProf.cgpa) : null,
      phone: studentProf?.phone || null,
      dateOfBirth: studentProf?.date_of_birth || null,
      gender: studentProf?.gender || null,
      address: studentProf?.address || null,
      city: studentProf?.city || null,
      state: studentProf?.state || null,
      pincode: studentProf?.pincode || null,
      parentName: studentProf?.parent_name || null,
      parentPhone: studentProf?.parent_phone || null
    };
  } catch {
    return null;
  }
};

export const getStudentFullProfile = async (targetId?: string): Promise<{ profile: any; studentProfile: any } | null> => {
  try {
    let uid = targetId;
    if (!uid) {
      const { data: { user }, error: userErr } = await (supabase as any).auth.getUser();
      if (userErr) console.error("Error getting auth user:", userErr);
      if (!user) return null;
      uid = user.id;
    }

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
      .or(`id.eq.${uid},usn_or_employee_id.eq.${uid}`)
      .single();

    if (error) {
      console.error("Error fetching profile from DB:", error);
      return null;
    }
    if (!profile) return null;

    const { data: studentProf, error: spErr } = await (supabase as any)
      .from('student_profiles')
      .select('*')
      .eq('profile_id', profile.id)
      .maybeSingle();

    if (spErr) {
      console.error("Error fetching student_profiles from DB:", spErr);
    }

    return {
      profile,
      studentProfile: studentProf || null
    };
  } catch (err) {
    console.error("Unexpected error in getStudentFullProfile:", err);
    return null;
  }
};

export const updateStudentProfile = async (payload: {
  phone?: string;
  date_of_birth?: string;
  gender?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  parent_name?: string;
  parent_phone?: string;
  semester?: number;
  academic_year?: string;
  cgpa?: number;
}): Promise<any> => {
  const { data: { user }, error: userErr } = await (supabase as any).auth.getUser();
  if (userErr || !user) {
    console.error("Authentication error before profile update:", userErr);
    throw new Error("Authenticated user session required.");
  }

  const updateData = {
    profile_id: user.id,
    phone: payload.phone?.trim() || null,
    date_of_birth: payload.date_of_birth || null,
    gender: payload.gender || null,
    address: payload.address?.trim() || null,
    city: payload.city?.trim() || null,
    state: payload.state?.trim() || null,
    pincode: payload.pincode?.trim() || null,
    parent_name: payload.parent_name?.trim() || null,
    parent_phone: payload.parent_phone?.trim() || null,
    semester: payload.semester != null ? payload.semester : null,
    academic_year: payload.academic_year?.trim() || null,
    cgpa: payload.cgpa != null ? payload.cgpa : null,
    updated_at: new Date().toISOString()
  };

  const { data: savedRecord, error: upsertErr } = await (supabase as any)
    .from('student_profiles')
    .upsert(updateData, { onConflict: 'profile_id' })
    .select('*')
    .single();

  if (upsertErr) {
    console.error('Student profile save failed in Supabase:', upsertErr);
    throw new Error(upsertErr.message || 'Failed to save student profile in database.');
  }

  return savedRecord;
};

export const getAllStudents = async (): Promise<ExtendedStudent[]> => {
  try {
    const { data: { user } } = await (supabase as any).auth.getUser();
    if (!user) return [];

    // Get active caller profile
    const { data: callerProfile } = await (supabase as any)
      .from('profiles')
      .select('role, department_id')
      .eq('id', user.id)
      .single();

    if (!callerProfile) return [];

    let query = (supabase as any)
      .from('profiles')
      .select(`
        *,
        department:departments (
          id,
          name,
          code
        )
      `)
      .eq('role', 'STUDENT')
      .eq('account_status', 'ACTIVE');

    // FACULTY and HOD can view ONLY students belonging to their department
    if (callerProfile.role === 'FACULTY' || callerProfile.role === 'HOD') {
      if (!callerProfile.department_id) {
        return []; // No department assigned to faculty/HOD
      }
      query = query.eq('department_id', callerProfile.department_id);
    }

    const { data: studentsData, error } = await query;
    if (error || !studentsData || studentsData.length === 0) {
      return [];
    }

    // Fetch all corresponding student_profiles
    const studentIds = studentsData.map((s: any) => s.id);
    const { data: extendedProfiles } = await (supabase as any)
      .from('student_profiles')
      .select('*')
      .in('profile_id', studentIds);

    const extMap = new Map((extendedProfiles || []).map((ep: any) => [ep.profile_id, ep]));

    return studentsData.map((s: any) => mapProfileToStudent(s, extMap.get(s.id)));
  } catch (err) {
    console.error("Failed to load students:", err);
    return [];
  }
};

export const getStudentById = async (id: string): Promise<ExtendedStudent | null> => {
  try {
    const fullProf = await getStudentFullProfile(id);
    if (!fullProf || !fullProf.profile) return null;
    return mapProfileToStudent(fullProf.profile, fullProf.studentProfile);
  } catch {
    return null;
  }
};

export const getStudentsByCourse = async (courseId: string): Promise<ExtendedStudent[]> => {
  return getAllStudents();
};

export const getAvailableServices = async (): Promise<ServiceTypeItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockServiceTypes]);
    }, 100);
  });
};

export const getServiceRequests = async (): Promise<ServiceRequestItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...localRequests]);
    }, 100);
  });
};

export const getServiceRequestById = async (id: string): Promise<ServiceRequestItem | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const req = localRequests.find(r => r.id === id) || null;
      resolve(req);
    }, 100);
  });
};

export const createServiceRequest = async (payload: CreateServiceRequestPayload): Promise<ServiceRequestItem> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newId = `REQ-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const nowStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

      const newReq: ServiceRequestItem = {
        id: newId,
        serviceTypeId: payload.serviceTypeId,
        requestType: payload.requestType,
        subject: payload.subject,
        description: payload.description,
        submittedDate: nowStr,
        lastUpdatedDate: nowStr,
        status: 'Pending',
        attachmentName: payload.attachmentName || undefined,
        remarks: 'Request submitted successfully. Waiting for Student Section assignment.',
        timeline: [
          { step: 'Submitted', status: 'completed', date: nowStr, note: 'Online request submitted.' },
          { step: 'Under Review', status: 'current', note: 'Queued for Student Welfare Office review.' },
          { step: 'Action Taken', status: 'upcoming' },
          { step: 'Completed', status: 'upcoming' }
        ]
      };

      localRequests = [newReq, ...localRequests];
      resolve(newReq);
    }, 300);
  });
};
