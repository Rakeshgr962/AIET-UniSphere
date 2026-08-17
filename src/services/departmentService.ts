import { supabase } from '../lib/supabase';
import type { Department } from '../types/database.types';
import { getAllStudents } from './studentService';
import { getFacultyCourses } from './courseService';
import { getFacultyAssignments } from './assignmentService';
import { getFacultyAttendanceLogs } from './attendanceService';
import { getAllFaculty } from './facultyService';
import type { ExtendedStudent } from '../data/students';
import type { FacultyCourseItem } from './courseService';
import type { FacultyMember } from '../data/faculty';
import type { AttendanceSessionLog } from './attendanceService';
import type { Assignment } from '../data/assignments';

export const getActiveDepartments = async (): Promise<Department[]> => {
  try {
    const { data, error } = await supabase
      .from('departments')
      .select('id, name, code, status, created_at')
      .eq('status', 'ACTIVE')
      .order('name', { ascending: true });

    if (error || !data) {
      console.error('Error fetching active departments:', error);
      return [];
    }

    return data as Department[];
  } catch (err) {
    console.error('Failed to query active departments:', err);
    return [];
  }
};

export const getAllDepartments = async (): Promise<Department[]> => {
  try {
    const { data, error } = await supabase
      .from('departments')
      .select('id, name, code, status, created_at')
      .order('name', { ascending: true });

    if (error || !data) {
      console.error('Error fetching all departments:', error);
      return [];
    }

    return data as Department[];
  } catch (err) {
    console.error('Failed to query all departments:', err);
    return [];
  }
};

export const createDepartment = async (payload: { name: string; code: string; status?: 'ACTIVE' | 'INACTIVE' }): Promise<Department> => {
  const { data, error } = await (supabase as any)
    .from('departments')
    .insert({
      name: payload.name,
      code: payload.code.toUpperCase(),
      status: payload.status || 'ACTIVE'
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as Department;
};

export const updateDepartment = async (id: string, payload: { name?: string; code?: string; status?: 'ACTIVE' | 'INACTIVE' }): Promise<Department> => {
  const updates: Record<string, any> = {};
  if (payload.name !== undefined) updates.name = payload.name;
  if (payload.code !== undefined) updates.code = payload.code.toUpperCase();
  if (payload.status !== undefined) updates.status = payload.status;

  const { data, error } = await (supabase as any)
    .from('departments')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as Department;
};

export interface DepartmentOverview {
  departmentName: string;
  departmentCode: string;
  hodName: string;
  academicYear: string;
  totalFaculty: number;
  activeFacultyToday: number;
  totalStudents: number;
  activeCourses: number;
  overallAttendancePercent: number;
  academicAlertsCount: number;
  pendingReviewsCount: number;
}

export interface DepartmentAttendanceMetrics {
  overallAttendance: number;
  presentRate: number;
  absentRate: number;
  lateRate: number;
  semesterBreakdown: { semester: number; attendancePercent: number }[];
  courseAttendance: {
    courseId: string;
    courseCode: string;
    courseName: string;
    facultyName: string;
    studentCount: number;
    attendancePercent: number;
    status: 'Healthy' | 'Needs Attention' | 'Critical';
  }[];
  lowAttendanceStudents: {
    studentId: string;
    studentName: string;
    usn: string;
    semester: number;
    courseCode: string;
    attendancePercent: number;
  }[];
}

export const getDepartmentOverview = async (): Promise<DepartmentOverview> => {
  const [students, courses, faculty] = await Promise.all([
    getAllStudents(),
    getFacultyCourses(),
    getAllFaculty()
  ]);

  const lowAttendanceCount = students.filter(s => (s.attendancePercent ?? 0) < 75).length;

  return {
    departmentName: "Computer Science & Engineering",
    departmentCode: "CSE",
    hodName: faculty.length > 0 ? faculty[0].name : "HOD",
    academicYear: "2026–27",
    totalFaculty: faculty.length,
    activeFacultyToday: faculty.filter(f => f.status === 'Active').length,
    totalStudents: students.length,
    activeCourses: courses.length,
    overallAttendancePercent: students.length > 0 
      ? Math.round(students.reduce((sum, s) => sum + (s.attendancePercent ?? 0), 0) / students.length)
      : 0,
    academicAlertsCount: lowAttendanceCount,
    pendingReviewsCount: 0
  };
};

export const getDepartmentAttendanceMetrics = async (): Promise<DepartmentAttendanceMetrics> => {
  const [students, courses] = await Promise.all([
    getAllStudents(),
    getFacultyCourses()
  ]);

  const lowAttStuds = students.filter(s => (s.attendancePercent ?? 0) < 75).map(s => ({
    studentId: s.id,
    studentName: s.name,
    usn: s.usn,
    semester: s.semester ?? 0,
    courseCode: s.coursePerformance[0]?.courseCode || "CSE-601",
    attendancePercent: s.attendancePercent ?? 0
  }));

  const courseAtt = courses.map(c => ({
    courseId: c.id,
    courseCode: c.code,
    courseName: c.name,
    facultyName: c.faculty,
    studentCount: c.studentCount,
    attendancePercent: c.averageAttendancePercent,
    status: (c.averageAttendancePercent >= 80 ? 'Healthy' : c.averageAttendancePercent >= 75 ? 'Needs Attention' : 'Critical') as 'Healthy' | 'Needs Attention' | 'Critical'
  }));

  const overallAtt = students.length > 0 
    ? Math.round(students.reduce((sum, s) => sum + (s.attendancePercent ?? 0), 0) / students.length)
    : 0;

  return {
    overallAttendance: overallAtt,
    presentRate: overallAtt,
    absentRate: overallAtt > 0 ? 100 - overallAtt : 0,
    lateRate: 0,
    semesterBreakdown: [
      { semester: 3, attendancePercent: 0 },
      { semester: 4, attendancePercent: 0 },
      { semester: 5, attendancePercent: 0 },
      { semester: 6, attendancePercent: 0 }
    ],
    courseAttendance: courseAtt,
    lowAttendanceStudents: lowAttStuds
  };
};

export const getDepartmentActivityLogs = async () => {
  return [];
};
