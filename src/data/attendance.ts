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
  overallPercentage: 82,
  subjects: [
    { subject: "Database Management Systems", code: "CSE-601", held: 40, attended: 35, percentage: 88, status: "Good" },
    { subject: "Operating Systems", code: "CSE-602", held: 38, attended: 31, percentage: 81, status: "Good" },
    { subject: "Computer Networks", code: "CSE-603", held: 42, attended: 32, percentage: 76, status: "Monitor" },
    { subject: "Artificial Intelligence", code: "CSE-604", held: 40, attended: 36, percentage: 90, status: "Good" },
    { subject: "Design & Analysis of Algorithms", code: "CSE-605", held: 45, attended: 38, percentage: 84, status: "Good" },
    { subject: "Software Engineering", code: "CSE-606", held: 35, attended: 31, percentage: 89, status: "Good" }
  ],
  trend: [
    { month: "Jan", percentage: 85 },
    { month: "Feb", percentage: 82 },
    { month: "Mar", percentage: 88 },
    { month: "Apr", percentage: 79 },
    { month: "May", percentage: 83 },
    { month: "Jun", percentage: 82 }
  ],
  history: [
    { date: "2026-08-14", subject: "Database Management Systems", code: "CSE-601", status: "Present", faculty: "Dr. Rajesh Kumar", session: "09:00 AM - 10:00 AM" },
    { date: "2026-08-14", subject: "Operating Systems", code: "CSE-602", status: "Present", faculty: "Prof. Sunita Sharma", session: "10:15 AM - 11:15 AM" },
    { date: "2026-08-14", subject: "Computer Networks", code: "CSE-603", status: "Absent", faculty: "Dr. Amit Patel", session: "11:30 AM - 12:30 PM" },
    
    { date: "2026-08-13", subject: "Artificial Intelligence", code: "CSE-604", status: "Present", faculty: "Dr. Lakshmi Prasad", session: "09:00 AM - 10:00 AM" },
    { date: "2026-08-13", subject: "Design & Analysis of Algorithms", code: "CSE-605", status: "Late", faculty: "Prof. Anil Verma", session: "10:15 AM - 11:15 AM" },
    { date: "2026-08-13", subject: "Software Engineering", code: "CSE-606", status: "Present", faculty: "Dr. Sneha Reddy", session: "01:30 PM - 02:30 PM" },
    
    { date: "2026-08-12", subject: "Database Management Systems", code: "CSE-601", status: "Present", faculty: "Dr. Rajesh Kumar", session: "09:00 AM - 10:00 AM" },
    { date: "2026-08-12", subject: "Operating Systems", code: "CSE-602", status: "Present", faculty: "Prof. Sunita Sharma", session: "10:15 AM - 11:15 AM" },
    { date: "2026-08-12", subject: "Computer Networks", code: "CSE-603", status: "Present", faculty: "Dr. Amit Patel", session: "11:30 AM - 12:30 PM" },
    
    { date: "2026-08-11", subject: "Artificial Intelligence", code: "CSE-604", status: "Present", faculty: "Dr. Lakshmi Prasad", session: "09:00 AM - 10:00 AM" },
    { date: "2026-08-11", subject: "Design & Analysis of Algorithms", code: "CSE-605", status: "Present", faculty: "Prof. Anil Verma", session: "10:15 AM - 11:15 AM" },
    { date: "2026-08-11", subject: "Software Engineering", code: "CSE-606", status: "Absent", faculty: "Dr. Sneha Reddy", session: "01:30 PM - 02:30 PM" },

    { date: "2026-08-10", subject: "Database Management Systems", code: "CSE-601", status: "Present", faculty: "Dr. Rajesh Kumar", session: "09:00 AM - 10:00 AM" },
    { date: "2026-08-10", subject: "Operating Systems", code: "CSE-602", status: "Late", faculty: "Prof. Sunita Sharma", session: "10:15 AM - 11:15 AM" },
    { date: "2026-08-10", subject: "Computer Networks", code: "CSE-603", status: "Present", faculty: "Dr. Amit Patel", session: "11:30 AM - 12:30 PM" }
  ]
};
