import {
  mockFacultyProfile,
  mockTodaysClasses,
  mockPendingWork,
  mockStudentAlerts,
  mockFacultyActivities
} from '../data/facultyData';
import type {
  FacultyProfile,
  TodayClass,
  PendingWorkItem,
  StudentAlertItem,
  FacultyActivityItem
} from '../data/facultyData';

export interface FacultyDashboardData {
  profile: FacultyProfile;
  stats: {
    myCoursesCount: number;
    studentsCount: number;
    todaysClassesCount: number;
    pendingEvaluationsCount: number;
    activeAssignmentsCount: number;
    attendanceAlertsCount: number;
  };
  todaysClasses: TodayClass[];
  pendingWork: PendingWorkItem[];
  studentAlerts: StudentAlertItem[];
  recentActivities: FacultyActivityItem[];
}

export const getFacultyProfile = async (): Promise<FacultyProfile> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ ...mockFacultyProfile });
    }, 100);
  });
};

export const getFacultyDashboardData = async (): Promise<FacultyDashboardData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        profile: mockFacultyProfile,
        stats: {
          myCoursesCount: 0,
          studentsCount: 0,
          todaysClassesCount: mockTodaysClasses.length,
          pendingEvaluationsCount: 0,
          activeAssignmentsCount: 0,
          attendanceAlertsCount: mockStudentAlerts.length
        },
        todaysClasses: [...mockTodaysClasses],
        pendingWork: [...mockPendingWork],
        studentAlerts: [...mockStudentAlerts],
        recentActivities: [...mockFacultyActivities]
      });
    }, 150);
  });
};
