export interface FacultyMember {
  id: string;
  employeeId: string;
  name: string;
  department: string;
  departmentId: string;
  designation: 'Professor & HOD' | 'Professor' | 'Associate Professor' | 'Assistant Professor';
  email: string;
  phone: string;
  status: 'Active' | 'On Leave' | 'Busy';
  assignedCourses: {
    courseId: string;
    courseCode: string;
    courseName: string;
    semester: number;
    studentCount: number;
  }[];
  totalStudents: number;
  totalStudentsTaught?: number;
  assignmentsCreatedCount: number;
  attendanceLogCount: number;
  attendanceLoggedCount?: number;
  allocatedCoursesCount?: number;
}

export const mockFacultyRoster: FacultyMember[] = [];
