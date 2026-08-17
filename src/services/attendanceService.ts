import { mockAttendance } from '../data/attendance';
import type { AttendanceSummary, AttendanceHistoryItem } from '../data/attendance';

export interface FacultyAttendanceRecord {
  studentId: string;
  studentName: string;
  usn: string;
  status: 'Present' | 'Absent' | 'Late';
  currentAttendancePercent: number | null;
}

export interface AttendanceSessionLog {
  id: string;
  date: string;
  courseCode: string;
  courseName: string;
  presentCount: number;
  absentCount: number;
  lateCount: number;
  totalStudents: number;
  markedBy: string;
}

let sessionAttendance: AttendanceSummary = { ...mockAttendance };

let sessionFacultyLogs: AttendanceSessionLog[] = [];

export const getAttendanceSummary = (): Promise<AttendanceSummary> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ ...sessionAttendance });
    }, 150);
  });
};

export const getFacultyAttendanceLogs = (): Promise<AttendanceSessionLog[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...sessionFacultyLogs]);
    }, 150);
  });
};

export const markAttendanceSession = (
  courseCode: string,
  courseName: string,
  date: string,
  sessionTime: string,
  records: FacultyAttendanceRecord[]
): Promise<AttendanceSessionLog> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const presentCount = records.filter(r => r.status === 'Present').length;
      const absentCount = records.filter(r => r.status === 'Absent').length;
      const lateCount = records.filter(r => r.status === 'Late').length;

      const newLog: AttendanceSessionLog = {
        id: `att-log-${Date.now()}`,
        date,
        courseCode,
        courseName,
        presentCount,
        absentCount,
        lateCount,
        totalStudents: records.length,
        markedBy: "Dr. Sneha Reddy"
      };

      sessionFacultyLogs = [newLog, ...sessionFacultyLogs];

      // Update student Jane Doe (std-1 / 1AB20CS002) attendance if included in records
      const janeRecord = records.find(r => r.usn === '1AB20CS002' || r.studentId === 'std-1');
      if (janeRecord) {
        const subjIdx = sessionAttendance.subjects.findIndex(s => s.code === courseCode);
        if (subjIdx !== -1) {
          const subj = sessionAttendance.subjects[subjIdx];
          const newHeld = subj.held + 1;
          const newAttended = janeRecord.status === 'Present' || janeRecord.status === 'Late' ? subj.attended + 1 : subj.attended;
          const newPct = Math.round((newAttended / newHeld) * 100);

          sessionAttendance.subjects[subjIdx] = {
            ...subj,
            held: newHeld,
            attended: newAttended,
            percentage: newPct,
            status: newPct >= 85 ? 'Good' : newPct >= 75 ? 'Monitor' : 'Critical'
          };
        }

        // Add to history
        const newHistItem: AttendanceHistoryItem = {
          date,
          subject: courseName,
          code: courseCode,
          status: janeRecord.status,
          faculty: "Dr. Sneha Reddy",
          session: sessionTime || "10:00 AM - 11:00 AM"
        };
        sessionAttendance.history = [newHistItem, ...sessionAttendance.history];
      }

      resolve(newLog);
    }, 250);
  });
};
