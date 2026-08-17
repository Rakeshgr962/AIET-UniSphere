export interface FacultyProfile {
  id: string;
  name: string;
  title: string;
  department: string;
  email: string;
  office: string;
  academicYear: string;
}

export interface TodayClass {
  id: string;
  time: string;
  courseCode: string;
  courseName: string;
  department: string;
  semester: number;
  room: string;
  status: 'Completed' | 'Current' | 'Upcoming';
}

export interface PendingWorkItem {
  id: string;
  title: string;
  courseName: string;
  pendingCount: number;
  type: 'assignment' | 'attendance';
  link: string;
}

export interface StudentAlertItem {
  id: string;
  studentName: string;
  usn: string;
  type: 'Low Attendance' | 'Pending Assignments' | 'Academic Attention';
  details: string;
  value: string;
  severity: 'high' | 'medium';
}

export interface FacultyActivityItem {
  id: string;
  timestamp: string;
  day: 'Today' | 'Yesterday' | 'Earlier';
  description: string;
  category: 'Assignment' | 'Attendance' | 'Evaluation' | 'System';
}

export const mockFacultyProfile: FacultyProfile = {
  id: "FAC-1023",
  name: "Dr. Sneha Reddy",
  title: "Associate Professor",
  department: "CSE — Data Science",
  email: "sneha.reddy@aiet.edu",
  office: "Academic Block B — Room 402",
  academicYear: "2026–27"
};

export const mockTodaysClasses: TodayClass[] = [
  {
    id: "cls-1",
    time: "09:00 AM – 10:00 AM",
    courseCode: "CSE-601",
    courseName: "Database Management Systems",
    department: "CSE — Data Science",
    semester: 6,
    room: "Room 302",
    status: "Completed"
  },
  {
    id: "cls-2",
    time: "10:00 AM – 11:00 AM",
    courseCode: "CSE-603",
    courseName: "Computer Networks",
    department: "CSE — Data Science",
    semester: 6,
    room: "Lab 2",
    status: "Current"
  },
  {
    id: "cls-3",
    time: "02:00 PM – 03:00 PM",
    courseCode: "CSE-606",
    courseName: "Software Engineering",
    department: "CSE — Data Science",
    semester: 6,
    room: "Room 405",
    status: "Upcoming"
  }
];

export const mockPendingWork: PendingWorkItem[] = [
  {
    id: "pw-1",
    title: "DBMS Assignment 04",
    courseName: "Database Management Systems",
    pendingCount: 18,
    type: "assignment",
    link: "/faculty/assignments/assign-dbms-04"
  },
  {
    id: "pw-2",
    title: "OS Assignment 02",
    courseName: "Operating Systems",
    pendingCount: 12,
    type: "assignment",
    link: "/faculty/assignments/assign-os-02"
  },
  {
    id: "pw-3",
    title: "Attendance Pending — Computer Networks",
    courseName: "Computer Networks (Lab 2)",
    pendingCount: 1,
    type: "attendance",
    link: "/faculty/attendance"
  }
];

export const mockStudentAlerts: StudentAlertItem[] = [
  {
    id: "alt-1",
    studentName: "Ananya Rao",
    usn: "4AI21DS008",
    type: "Low Attendance",
    details: "Attendance currently at 71% in DBMS",
    value: "71%",
    severity: "high"
  },
  {
    id: "alt-2",
    studentName: "Kiran Kumar",
    usn: "4AI21DS014",
    type: "Low Attendance",
    details: "Attendance currently at 73% in Computer Networks",
    value: "73%",
    severity: "high"
  },
  {
    id: "alt-3",
    studentName: "Vikram Shetty",
    usn: "4AI21DS022",
    type: "Pending Assignments",
    details: "3 consecutive assignments unsubmitted",
    value: "3 Pending",
    severity: "medium"
  },
  {
    id: "alt-4",
    studentName: "Siddharth Pai",
    usn: "4AI21DS031",
    type: "Academic Attention",
    details: "Mid-semester internal score below 40%",
    value: "Needs Review",
    severity: "high"
  }
];

export const mockFacultyActivities: FacultyActivityItem[] = [
  {
    id: "act-1",
    timestamp: "10:30 AM",
    day: "Today",
    description: "DBMS Assignment 04 posted for CSE 6th Semester",
    category: "Assignment"
  },
  {
    id: "act-2",
    timestamp: "09:05 AM",
    day: "Today",
    description: "Attendance marked for Database Management Systems (62 present)",
    category: "Attendance"
  },
  {
    id: "act-3",
    timestamp: "04:15 PM",
    day: "Yesterday",
    description: "Evaluated 15 submissions for Software Engineering Assignment 01",
    category: "Evaluation"
  },
  {
    id: "act-4",
    timestamp: "02:00 PM",
    day: "Yesterday",
    description: "Student submission received from Jane Doe (1AB20CS002)",
    category: "Assignment"
  }
];
