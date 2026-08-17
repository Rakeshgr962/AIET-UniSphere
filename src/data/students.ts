export interface StudentProfile {
  name: string;
  usn: string;
  department: string;
  semester: number;
  academicYear: string;
  cgpa: number;
}

export const mockStudentProfile: StudentProfile = {
  name: "Jane Doe",
  usn: "1AB20CS002",
  department: "CSE — Data Science",
  semester: 6,
  academicYear: "2026–27",
  cgpa: 7.62
};
