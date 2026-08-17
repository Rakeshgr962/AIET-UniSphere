import { mockFacultyRoster } from '../data/faculty';
import type { FacultyMember } from '../data/faculty';

export const getAllFaculty = async (): Promise<FacultyMember[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockFacultyRoster]);
    }, 120);
  });
};

export const getFacultyRoster = getAllFaculty;

export const getFacultyById = async (id: string): Promise<FacultyMember | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const fac = mockFacultyRoster.find(f => f.id === id || f.employeeId.toLowerCase() === id.toLowerCase()) || null;
      resolve(fac);
    }, 120);
  });
};

export const getFacultyByDepartment = async (departmentId: string): Promise<FacultyMember[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockFacultyRoster.filter(f => f.departmentId === departmentId || departmentId === 'dept-ds'));
    }, 120);
  });
};
