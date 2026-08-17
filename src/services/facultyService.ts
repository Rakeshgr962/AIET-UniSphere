import { supabase } from '../lib/supabase';
import type { FacultyMember } from '../data/faculty';

const mapProfileToFaculty = (profile: any): FacultyMember => {
  const deptName = profile.department?.name || (profile.department_id ? 'Loading...' : 'Department not assigned');

  return {
    id: profile.id,
    employeeId: profile.usn_or_employee_id || 'N/A',
    name: profile.full_name || profile.email.split('@')[0],
    department: deptName,
    departmentId: profile.department_id || profile.department?.id || '',
    email: profile.email,
    phone: '+91 98765 00000',
    designation: profile.role === 'HOD' ? 'Professor & HOD' : 'Assistant Professor',
    status: profile.account_status === 'ACTIVE' ? 'Active' : 'On Leave',
    assignedCourses: [
      { courseId: 'c1', courseCode: 'CSE-601', courseName: 'Database Management Systems', semester: 6, studentCount: 60 },
      { courseId: 'c2', courseCode: 'CSE-401', courseName: 'Data Structures & Algorithms', semester: 4, studentCount: 60 }
    ],
    totalStudents: 120,
    assignmentsCreatedCount: 5,
    attendanceLogCount: 42
  };
};

export const getAllFaculty = async (): Promise<FacultyMember[]> => {
  try {
    const { data: { user } } = await (supabase as any).auth.getUser();
    if (!user) return [];

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
      .in('role', ['FACULTY', 'HOD'])
      .eq('account_status', 'ACTIVE');

    if (callerProfile.role === 'HOD') {
      if (!callerProfile.department_id) return [];
      query = query.eq('department_id', callerProfile.department_id);
    }

    const { data: facultyData, error } = await query;
    if (error || !facultyData) return [];

    return facultyData.map(mapProfileToFaculty);
  } catch {
    return [];
  }
};

export const getFacultyRoster = getAllFaculty;

export const getFacultyById = async (id: string): Promise<FacultyMember | null> => {
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
      return mapProfileToFaculty(profile);
    }
  } catch {
    // Ignored
  }
  return null;
};

export const getFacultyByDepartment = async (departmentId: string): Promise<FacultyMember[]> => {
  return getAllFaculty();
};
