import { mockCourses } from '../data/courses';
import type { Course } from '../data/courses';

export interface FacultyCourseItem extends Course {
  studentCount: number;
  activeAssignmentsCount: number;
  upcomingAssessmentsCount: number;
  averageAttendancePercent: number;
  department: string;
}

export const mockFacultyCoursesList: FacultyCourseItem[] = mockCourses.map((c, idx) => ({
  ...c,
  studentCount: [62, 60, 58, 62, 61, 62][idx % 6],
  activeAssignmentsCount: [4, 2, 3, 1, 2, 3][idx % 6],
  upcomingAssessmentsCount: [1, 2, 1, 1, 0, 1][idx % 6],
  averageAttendancePercent: [84, 81, 76, 91, 84, 89][idx % 6],
  department: "CSE — Data Science"
}));

export const getCourses = (): Promise<Course[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockCourses);
    }, 150);
  });
};

export const getFacultyCourses = (): Promise<FacultyCourseItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockFacultyCoursesList]);
    }, 150);
  });
};

export const getCourseById = (id: string): Promise<Course | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const course = mockCourses.find(c => c.id === id || c.code.toLowerCase() === id.toLowerCase());
      resolve(course);
    }, 150);
  });
};

export const getFacultyCourseById = (id: string): Promise<FacultyCourseItem | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const course = mockFacultyCoursesList.find(c => c.id === id || c.code.toLowerCase() === id.toLowerCase());
      resolve(course);
    }, 150);
  });
};
