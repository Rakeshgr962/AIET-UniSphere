export interface StudentProfile {
  name: string;
  usn: string;
  department: string;
  semester: number;
  academicYear: string;
  cgpa: number;
}

export interface ExtendedStudent extends StudentProfile {
  id: string;
  email: string;
  phone: string;
  attendancePercent: number;
  assignmentsCompleted: number;
  assignmentsTotal: number;
  academicStatus: 'Good Standing' | 'Warning' | 'At Risk';
  coursePerformance: {
    courseCode: string;
    courseName: string;
    attendance: number;
    assignmentCompletion: number;
    assessmentAvg: number;
  }[];
}

export const mockStudentProfile: StudentProfile = {
  name: "Jane Doe",
  usn: "1AB20CS002",
  department: "CSE — Data Science",
  semester: 6,
  academicYear: "2026–27",
  cgpa: 7.62
};

export const mockStudentsRoster: ExtendedStudent[] = [
  {
    id: "std-1",
    name: "Jane Doe",
    usn: "1AB20CS002",
    department: "CSE — Data Science",
    semester: 6,
    academicYear: "2026–27",
    cgpa: 8.62,
    email: "jane.doe@student.aiet.edu",
    phone: "+91 98765 43210",
    attendancePercent: 88,
    assignmentsCompleted: 14,
    assignmentsTotal: 15,
    academicStatus: "Good Standing",
    coursePerformance: [
      { courseCode: "CSE-601", courseName: "Database Management Systems", attendance: 88, assignmentCompletion: 92, assessmentAvg: 85 },
      { courseCode: "CSE-602", courseName: "Operating Systems", attendance: 81, assignmentCompletion: 88, assessmentAvg: 80 },
      { courseCode: "CSE-603", courseName: "Computer Networks", attendance: 76, assignmentCompletion: 80, assessmentAvg: 75 },
      { courseCode: "CSE-604", courseName: "Artificial Intelligence", attendance: 90, assignmentCompletion: 95, assessmentAvg: 90 },
      { courseCode: "CSE-605", courseName: "Design & Analysis of Algorithms", attendance: 84, assignmentCompletion: 85, assessmentAvg: 82 },
      { courseCode: "CSE-606", courseName: "Software Engineering", attendance: 89, assignmentCompletion: 94, assessmentAvg: 88 }
    ]
  },
  {
    id: "std-2",
    name: "Rakesh G R",
    usn: "4AI21DS001",
    department: "CSE — Data Science",
    semester: 6,
    academicYear: "2026–27",
    cgpa: 8.95,
    email: "rakesh.gr@student.aiet.edu",
    phone: "+91 98765 12345",
    attendancePercent: 94,
    assignmentsCompleted: 15,
    assignmentsTotal: 15,
    academicStatus: "Good Standing",
    coursePerformance: [
      { courseCode: "CSE-601", courseName: "Database Management Systems", attendance: 96, assignmentCompletion: 100, assessmentAvg: 92 },
      { courseCode: "CSE-602", courseName: "Operating Systems", attendance: 92, assignmentCompletion: 95, assessmentAvg: 88 },
      { courseCode: "CSE-603", courseName: "Computer Networks", attendance: 90, assignmentCompletion: 90, assessmentAvg: 86 }
    ]
  },
  {
    id: "std-3",
    name: "Ananya Rao",
    usn: "4AI21DS008",
    department: "CSE — Data Science",
    semester: 6,
    academicYear: "2026–27",
    cgpa: 6.80,
    email: "ananya.rao@student.aiet.edu",
    phone: "+91 98765 23456",
    attendancePercent: 71,
    assignmentsCompleted: 9,
    assignmentsTotal: 15,
    academicStatus: "Warning",
    coursePerformance: [
      { courseCode: "CSE-601", courseName: "Database Management Systems", attendance: 71, assignmentCompletion: 60, assessmentAvg: 65 },
      { courseCode: "CSE-603", courseName: "Computer Networks", attendance: 72, assignmentCompletion: 65, assessmentAvg: 62 }
    ]
  },
  {
    id: "std-4",
    name: "Kiran Kumar",
    usn: "4AI21DS014",
    department: "CSE — Data Science",
    semester: 6,
    academicYear: "2026–27",
    cgpa: 7.15,
    email: "kiran.kumar@student.aiet.edu",
    phone: "+91 98765 34567",
    attendancePercent: 73,
    assignmentsCompleted: 11,
    assignmentsTotal: 15,
    academicStatus: "Warning",
    coursePerformance: [
      { courseCode: "CSE-601", courseName: "Database Management Systems", attendance: 78, assignmentCompletion: 75, assessmentAvg: 70 },
      { courseCode: "CSE-603", courseName: "Computer Networks", attendance: 73, assignmentCompletion: 70, assessmentAvg: 68 }
    ]
  },
  {
    id: "std-5",
    name: "Vikram Shetty",
    usn: "4AI21DS022",
    department: "CSE — Data Science",
    semester: 6,
    academicYear: "2026–27",
    cgpa: 6.45,
    email: "vikram.shetty@student.aiet.edu",
    phone: "+91 98765 45678",
    attendancePercent: 68,
    assignmentsCompleted: 7,
    assignmentsTotal: 15,
    academicStatus: "At Risk",
    coursePerformance: [
      { courseCode: "CSE-601", courseName: "Database Management Systems", attendance: 68, assignmentCompletion: 50, assessmentAvg: 58 }
    ]
  },
  {
    id: "std-6",
    name: "Siddharth Pai",
    usn: "4AI21DS031",
    department: "CSE — Data Science",
    semester: 6,
    academicYear: "2026–27",
    cgpa: 6.20,
    email: "siddharth.pai@student.aiet.edu",
    phone: "+91 98765 56789",
    attendancePercent: 74,
    assignmentsCompleted: 8,
    assignmentsTotal: 15,
    academicStatus: "At Risk",
    coursePerformance: [
      { courseCode: "CSE-601", courseName: "Database Management Systems", attendance: 74, assignmentCompletion: 55, assessmentAvg: 52 }
    ]
  },
  {
    id: "std-7",
    name: "Pooja Hegde",
    usn: "4AI21DS045",
    department: "CSE — Data Science",
    semester: 6,
    academicYear: "2026–27",
    cgpa: 9.12,
    email: "pooja.hegde@student.aiet.edu",
    phone: "+91 98765 67890",
    attendancePercent: 96,
    assignmentsCompleted: 15,
    assignmentsTotal: 15,
    academicStatus: "Good Standing",
    coursePerformance: [
      { courseCode: "CSE-601", courseName: "Database Management Systems", attendance: 98, assignmentCompletion: 100, assessmentAvg: 95 }
    ]
  },
  {
    id: "std-8",
    name: "Varun Sharma",
    usn: "4AI21DS050",
    department: "CSE — Data Science",
    semester: 6,
    academicYear: "2026–27",
    cgpa: 8.10,
    email: "varun.sharma@student.aiet.edu",
    phone: "+91 98765 78901",
    attendancePercent: 86,
    assignmentsCompleted: 13,
    assignmentsTotal: 15,
    academicStatus: "Good Standing",
    coursePerformance: [
      { courseCode: "CSE-601", courseName: "Database Management Systems", attendance: 86, assignmentCompletion: 88, assessmentAvg: 82 }
    ]
  }
];

