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

  const totalStuds = students.length * 10; // Scaled for 620 total department students representation
  const lowAttendanceCount = students.filter(s => s.attendancePercent < 75).length;

  return {
    departmentName: "Computer Science & Engineering — Data Science",
    departmentCode: "CSE-DS",
    hodName: "Dr. Sneha Reddy",
    academicYear: "2026–27",
    totalFaculty: 24,
    activeFacultyToday: 18,
    totalStudents: 620,
    activeCourses: 38,
    overallAttendancePercent: 84,
    academicAlertsCount: 12,
    pendingReviewsCount: 8
  };
};

export const getDepartmentAttendanceMetrics = async (): Promise<DepartmentAttendanceMetrics> => {
  const [students, courses, faculty] = await Promise.all([
    getAllStudents(),
    getFacultyCourses(),
    getAllFaculty()
  ]);

  const lowAttStuds = students.filter(s => s.attendancePercent < 75).map(s => ({
    studentId: s.id,
    studentName: s.name,
    usn: s.usn,
    semester: s.semester,
    courseCode: s.coursePerformance[0]?.courseCode || "CSE-601",
    attendancePercent: s.attendancePercent
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

  return {
    overallAttendance: 84,
    presentRate: 84,
    absentRate: 12,
    lateRate: 4,
    semesterBreakdown: [
      { semester: 3, attendancePercent: 86 },
      { semester: 4, attendancePercent: 83 },
      { semester: 5, attendancePercent: 85 },
      { semester: 6, attendancePercent: 82 }
    ],
    courseAttendance: courseAtt,
    lowAttendanceStudents: lowAttStuds
  };
};

export const getDepartmentActivityLogs = async () => {
  const [assignments, attendanceLogs] = await Promise.all([
    getFacultyAssignments(),
    getFacultyAttendanceLogs()
  ]);

  const activities = [
    {
      id: "act-1",
      timestamp: "Today 09:15 AM",
      type: "Assignment Created",
      title: "DBMS Assignment 05 — Transaction Management",
      by: "Dr. Sneha Reddy",
      details: "Posted for CSE-601 Semester 6 (62 Students Enrolled)"
    },
    {
      id: "act-2",
      timestamp: "Today 10:05 AM",
      type: "Attendance Session",
      title: "Operating Systems — Morning Session Marked",
      by: "Prof. Sunita Sharma",
      details: "Recorded 54 Present, 6 Absent (90% Attendance)"
    },
    {
      id: "act-3",
      timestamp: "Yesterday 04:30 PM",
      type: "Submissions Evaluated",
      title: "18 Submissions Graded for Computer Networks Lab",
      by: "Dr. Amit Patel",
      details: "Grades synchronized across Student & HOD portals"
    },
    {
      id: "act-4",
      timestamp: "14 Aug 02:00 PM",
      type: "Course Info Updated",
      title: "Software Engineering Syllabus Module 5 Published",
      by: "Dr. Sneha Reddy",
      details: "Module resources and assignment specifications updated"
    }
  ];

  return activities;
};
