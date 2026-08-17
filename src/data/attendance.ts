export interface AttendanceSubject {
  subject: string;
  code: string;
  held: number;
  attended: number;
  percentage: number;
  status: 'Good' | 'Monitor' | 'Critical';
}

export interface AttendanceHistoryItem {
  date: string;
  subject: string;
  code: string;
  status: 'Present' | 'Absent' | 'Late';
  faculty: string;
  session: string;
}

export interface AttendanceTrend {
  month: string;
  percentage: number;
}

export interface AttendanceSummary {
  overallPercentage: number;
  subjects: AttendanceSubject[];
  history: AttendanceHistoryItem[];
  trend: AttendanceTrend[];
}

export const mockAttendance: AttendanceSummary = {
  overallPercentage: 0,
  subjects: [],
  trend: [],
  history: []
};
