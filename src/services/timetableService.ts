import { mockTimetableEntries } from '../data/timetable';
import type { TimetableEntry } from '../data/timetable';

let timetableStore: TimetableEntry[] = [...mockTimetableEntries];

export const getDepartmentTimetable = async (semester?: number, facultyId?: string, room?: string): Promise<TimetableEntry[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let result = [...timetableStore];
      if (semester) {
        result = result.filter(t => t.semester === semester);
      }
      if (facultyId) {
        result = result.filter(t => t.facultyId === facultyId || t.facultyName.toLowerCase().includes(facultyId.toLowerCase()));
      }
      if (room) {
        result = result.filter(t => t.room.toLowerCase() === room.toLowerCase());
      }
      resolve(result);
    }, 120);
  });
};

export const getTimetableConflicts = async (): Promise<TimetableEntry[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(timetableStore.filter(t => t.hasConflict));
    }, 120);
  });
};
