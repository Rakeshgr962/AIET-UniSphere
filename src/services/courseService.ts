import { mockCourses } from '../data/courses';
import type { Course } from '../data/courses';

export const getCourses = (): Promise<Course[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockCourses);
    }, 500);
  });
};

export const getCourseById = (id: string): Promise<Course | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const course = mockCourses.find(c => c.id === id);
      resolve(course);
    }, 300);
  });
};
