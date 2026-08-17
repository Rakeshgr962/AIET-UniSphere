import { mockCourseResults, mockStudentResults } from '../data/results';
import type { CourseResultSummary, StudentResultSummary } from '../data/results';

export const getDepartmentResults = async (): Promise<CourseResultSummary[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockCourseResults]);
    }, 120);
  });
};

export const getStudentResultSummary = async (studentId: string): Promise<StudentResultSummary | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const res = mockStudentResults.find(s => s.studentId === studentId || s.usn.toLowerCase() === studentId.toLowerCase()) || null;
      resolve(res);
    }, 120);
  });
};

export const getSemesterPerformanceSummary = async () => {
  return [
    { semester: 3, averagePercent: 0 },
    { semester: 4, averagePercent: 0 },
    { semester: 5, averagePercent: 0 },
    { semester: 6, averagePercent: 0 }
  ];
};
