import { mockAttendance } from '../data/attendance';
import type { AttendanceSummary } from '../data/attendance';

export const getAttendanceSummary = (): Promise<AttendanceSummary> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockAttendance);
    }, 450);
  });
};
