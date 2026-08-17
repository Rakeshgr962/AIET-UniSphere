export interface CourseResultSummary {
  courseId: string;
  courseCode: string;
  courseName: string;
  facultyName: string;
  semester: number;
  totalStudents: number;
  averageMarksPercent: number;
  highestMarksPercent: number;
  lowestMarksPercent: number;
  passRatePercent: number;
  status: 'Healthy' | 'Needs Attention' | 'Critical';
}

export interface StudentResultSummary {
  studentId: string;
  studentName: string;
  usn: string;
  semester: number;
  gpa: number;
  totalCredits: number;
  courseMarks: {
    courseCode: string;
    courseName: string;
    internalMarks: number;
    externalMarks: number;
    totalMarks: number;
    grade: 'S' | 'A' | 'B' | 'C' | 'D' | 'F';
  }[];
}

export const mockCourseResults: CourseResultSummary[] = [
  {
    courseId: "cse-601",
    courseCode: "CSE-601",
    courseName: "Database Management Systems",
    facultyName: "Dr. Rajesh Kumar",
    semester: 6,
    totalStudents: 62,
    averageMarksPercent: 82,
    highestMarksPercent: 96,
    lowestMarksPercent: 54,
    passRatePercent: 96.8,
    status: "Healthy"
  },
  {
    courseId: "cse-602",
    courseCode: "CSE-602",
    courseName: "Operating Systems",
    facultyName: "Prof. Sunita Sharma",
    semester: 6,
    totalStudents: 60,
    averageMarksPercent: 78,
    highestMarksPercent: 94,
    lowestMarksPercent: 48,
    passRatePercent: 93.3,
    status: "Healthy"
  },
  {
    courseId: "cse-603",
    courseCode: "CSE-603",
    courseName: "Computer Networks",
    facultyName: "Dr. Amit Patel",
    semester: 6,
    totalStudents: 58,
    averageMarksPercent: 76,
    highestMarksPercent: 92,
    lowestMarksPercent: 45,
    passRatePercent: 91.4,
    status: "Needs Attention"
  },
  {
    courseId: "cse-604",
    courseCode: "CSE-604",
    courseName: "Artificial Intelligence",
    facultyName: "Dr. Lakshmi Prasad",
    semester: 6,
    totalStudents: 62,
    averageMarksPercent: 85,
    highestMarksPercent: 98,
    lowestMarksPercent: 58,
    passRatePercent: 98.4,
    status: "Healthy"
  },
  {
    courseId: "cse-605",
    courseCode: "CSE-605",
    courseName: "Design & Analysis of Algorithms",
    facultyName: "Prof. Anil Verma",
    semester: 6,
    totalStudents: 61,
    averageMarksPercent: 74,
    highestMarksPercent: 90,
    lowestMarksPercent: 42,
    passRatePercent: 88.5,
    status: "Needs Attention"
  },
  {
    courseId: "cse-606",
    courseCode: "CSE-606",
    courseName: "Software Engineering",
    facultyName: "Dr. Sneha Reddy",
    semester: 6,
    totalStudents: 62,
    averageMarksPercent: 88,
    highestMarksPercent: 99,
    lowestMarksPercent: 62,
    passRatePercent: 100,
    status: "Healthy"
  }
];

export const mockStudentResults: StudentResultSummary[] = [
  {
    studentId: "std-1",
    studentName: "Jane Doe",
    usn: "1AB20CS002",
    semester: 6,
    gpa: 8.62,
    totalCredits: 24,
    courseMarks: [
      { courseCode: "CSE-601", courseName: "Database Management Systems", internalMarks: 44, externalMarks: 42, totalMarks: 86, grade: "S" },
      { courseCode: "CSE-602", courseName: "Operating Systems", internalMarks: 40, externalMarks: 40, totalMarks: 80, grade: "A" },
      { courseCode: "CSE-603", courseName: "Computer Networks", internalMarks: 38, externalMarks: 37, totalMarks: 75, grade: "B" },
      { courseCode: "CSE-604", courseName: "Artificial Intelligence", internalMarks: 46, externalMarks: 44, totalMarks: 90, grade: "S" },
      { courseCode: "CSE-605", courseName: "Design & Analysis of Algorithms", internalMarks: 42, externalMarks: 40, totalMarks: 82, grade: "A" },
      { courseCode: "CSE-606", courseName: "Software Engineering", internalMarks: 45, externalMarks: 43, totalMarks: 88, grade: "S" }
    ]
  },
  {
    studentId: "std-2",
    studentName: "Rakesh G R",
    usn: "4AI21DS001",
    semester: 6,
    gpa: 8.95,
    totalCredits: 24,
    courseMarks: [
      { courseCode: "CSE-601", courseName: "Database Management Systems", internalMarks: 48, externalMarks: 46, totalMarks: 94, grade: "S" },
      { courseCode: "CSE-602", courseName: "Operating Systems", internalMarks: 45, externalMarks: 43, totalMarks: 88, grade: "S" },
      { courseCode: "CSE-603", courseName: "Computer Networks", internalMarks: 44, externalMarks: 42, totalMarks: 86, grade: "S" }
    ]
  }
];
