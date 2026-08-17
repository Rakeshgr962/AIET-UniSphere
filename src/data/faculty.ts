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
  assignmentsCreatedCount: number;
  attendanceLogCount: number;
}

export const mockFacultyRoster: FacultyMember[] = [
  {
    id: "fac-101",
    employeeId: "EMP-DS-01",
    name: "Dr. Sneha Reddy",
    department: "CSE — Data Science",
    departmentId: "dept-ds",
    designation: "Professor & HOD",
    email: "sneha.reddy@aiet.edu",
    phone: "+91 98450 11223",
    status: "Active",
    assignedCourses: [
      { courseId: "cse-606", courseCode: "CSE-606", courseName: "Software Engineering", semester: 6, studentCount: 62 },
      { courseId: "cse-601", courseCode: "CSE-601", courseName: "Database Management Systems", semester: 6, studentCount: 62 }
    ],
    totalStudents: 124,
    assignmentsCreatedCount: 6,
    attendanceLogCount: 18
  },
  {
    id: "fac-102",
    employeeId: "EMP-DS-02",
    name: "Dr. Rajesh Kumar",
    department: "CSE — Data Science",
    departmentId: "dept-ds",
    designation: "Professor",
    email: "rajesh.kumar@aiet.edu",
    phone: "+91 98450 22334",
    status: "Active",
    assignedCourses: [
      { courseId: "cse-601", courseCode: "CSE-601", courseName: "Database Management Systems", semester: 6, studentCount: 62 }
    ],
    totalStudents: 62,
    assignmentsCreatedCount: 5,
    attendanceLogCount: 16
  },
  {
    id: "fac-103",
    employeeId: "EMP-DS-03",
    name: "Prof. Sunita Sharma",
    department: "CSE — Data Science",
    departmentId: "dept-ds",
    designation: "Associate Professor",
    email: "sunita.sharma@aiet.edu",
    phone: "+91 98450 33445",
    status: "Active",
    assignedCourses: [
      { courseId: "cse-602", courseCode: "CSE-602", courseName: "Operating Systems", semester: 6, studentCount: 60 }
    ],
    totalStudents: 60,
    assignmentsCreatedCount: 4,
    attendanceLogCount: 14
  },
  {
    id: "fac-104",
    employeeId: "EMP-DS-04",
    name: "Dr. Amit Patel",
    department: "CSE — Data Science",
    departmentId: "dept-ds",
    designation: "Associate Professor",
    email: "amit.patel@aiet.edu",
    phone: "+91 98450 44556",
    status: "Active",
    assignedCourses: [
      { courseId: "cse-603", courseCode: "CSE-603", courseName: "Computer Networks", semester: 6, studentCount: 58 }
    ],
    totalStudents: 58,
    assignmentsCreatedCount: 4,
    attendanceLogCount: 12
  },
  {
    id: "fac-105",
    employeeId: "EMP-DS-05",
    name: "Dr. Lakshmi Prasad",
    department: "CSE — Data Science",
    departmentId: "dept-ds",
    designation: "Professor",
    email: "lakshmi.prasad@aiet.edu",
    phone: "+91 98450 55667",
    status: "Active",
    assignedCourses: [
      { courseId: "cse-604", courseCode: "CSE-604", courseName: "Artificial Intelligence", semester: 6, studentCount: 62 }
    ],
    totalStudents: 62,
    assignmentsCreatedCount: 3,
    attendanceLogCount: 15
  },
  {
    id: "fac-106",
    employeeId: "EMP-DS-06",
    name: "Prof. Anil Verma",
    department: "CSE — Data Science",
    departmentId: "dept-ds",
    designation: "Assistant Professor",
    email: "anil.verma@aiet.edu",
    phone: "+91 98450 66778",
    status: "Active",
    assignedCourses: [
      { courseId: "cse-605", courseCode: "CSE-605", courseName: "Design & Analysis of Algorithms", semester: 6, studentCount: 61 }
    ],
    totalStudents: 61,
    assignmentsCreatedCount: 5,
    attendanceLogCount: 17
  },
  {
    id: "fac-107",
    employeeId: "EMP-DS-07",
    name: "Dr. Meera Nambiar",
    department: "CSE — Data Science",
    departmentId: "dept-ds",
    designation: "Associate Professor",
    email: "meera.nambiar@aiet.edu",
    phone: "+91 98450 77889",
    status: "Active",
    assignedCourses: [
      { courseId: "cse-401", courseCode: "CSE-401", courseName: "Data Structures & Applications", semester: 4, studentCount: 64 }
    ],
    totalStudents: 64,
    assignmentsCreatedCount: 4,
    attendanceLogCount: 15
  },
  {
    id: "fac-108",
    employeeId: "EMP-DS-08",
    name: "Prof. Vikramaditya Sen",
    department: "CSE — Data Science",
    departmentId: "dept-ds",
    designation: "Assistant Professor",
    email: "vikram.sen@aiet.edu",
    phone: "+91 98450 88990",
    status: "On Leave",
    assignedCourses: [
      { courseId: "cse-402", courseCode: "CSE-402", courseName: "Discrete Mathematical Structures", semester: 4, studentCount: 64 }
    ],
    totalStudents: 64,
    assignmentsCreatedCount: 2,
    attendanceLogCount: 10
  }
];
