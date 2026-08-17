export interface TimetableEntry {
  id: string;
  courseId: string;
  courseCode: string;
  courseName: string;
  facultyId: string;
  facultyName: string;
  semester: number;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  startTime: string;
  endTime: string;
  room: string;
  section: string;
  hasConflict?: boolean;
  conflictReason?: string;
}

export const mockTimetableEntries: TimetableEntry[] = [
  {
    id: "tt-101",
    courseId: "cse-601",
    courseCode: "CSE-601",
    courseName: "Database Management Systems",
    facultyId: "fac-102",
    facultyName: "Dr. Rajesh Kumar",
    semester: 6,
    day: "Monday",
    startTime: "09:00 AM",
    endTime: "10:00 AM",
    room: "LH-302",
    section: "Sec A"
  },
  {
    id: "tt-102",
    courseId: "cse-604",
    courseCode: "CSE-604",
    courseName: "Artificial Intelligence",
    facultyId: "fac-105",
    facultyName: "Dr. Lakshmi Prasad",
    semester: 6,
    day: "Monday",
    startTime: "10:00 AM",
    endTime: "11:00 AM",
    room: "LH-302",
    section: "Sec A"
  },
  {
    id: "tt-103",
    courseId: "cse-606",
    courseCode: "CSE-606",
    courseName: "Software Engineering Lab",
    facultyId: "fac-101",
    facultyName: "Dr. Sneha Reddy",
    semester: 6,
    day: "Monday",
    startTime: "11:15 AM",
    endTime: "01:15 PM",
    room: "Computer Lab 4",
    section: "Sec A"
  },
  {
    id: "tt-104",
    courseId: "cse-602",
    courseCode: "CSE-602",
    courseName: "Operating Systems",
    facultyId: "fac-103",
    facultyName: "Prof. Sunita Sharma",
    semester: 6,
    day: "Monday",
    startTime: "02:00 PM",
    endTime: "03:00 PM",
    room: "LH-201",
    section: "Sec A"
  },
  {
    id: "tt-105",
    courseId: "cse-603",
    courseCode: "CSE-603",
    courseName: "Computer Networks",
    facultyId: "fac-104",
    facultyName: "Dr. Amit Patel",
    semester: 6,
    day: "Tuesday",
    startTime: "09:00 AM",
    endTime: "10:00 AM",
    room: "LH-302",
    section: "Sec A"
  },
  {
    id: "tt-106",
    courseId: "cse-605",
    courseCode: "CSE-605",
    courseName: "Design & Analysis of Algorithms",
    facultyId: "fac-106",
    facultyName: "Prof. Anil Verma",
    semester: 6,
    day: "Tuesday",
    startTime: "10:00 AM",
    endTime: "11:00 AM",
    room: "LH-302",
    section: "Sec A"
  },
  {
    id: "tt-107",
    courseId: "cse-601",
    courseCode: "CSE-601",
    courseName: "Database Management Systems Lab",
    facultyId: "fac-101",
    facultyName: "Dr. Sneha Reddy",
    semester: 6,
    day: "Tuesday",
    startTime: "11:15 AM",
    endTime: "01:15 PM",
    room: "Computer Lab 4",
    section: "Sec A"
  },
  // Mock conflict entry for demonstration
  {
    id: "tt-108",
    courseId: "cse-606",
    courseCode: "CSE-606",
    courseName: "Software Engineering Seminar",
    facultyId: "fac-101",
    facultyName: "Dr. Sneha Reddy",
    semester: 6,
    day: "Wednesday",
    startTime: "10:00 AM",
    endTime: "11:00 AM",
    room: "LH-302",
    section: "Sec A",
    hasConflict: true,
    conflictReason: "Faculty conflict: Dr. Sneha Reddy assigned to CSE-601 simultaneously."
  },
  {
    id: "tt-109",
    courseId: "cse-401",
    courseCode: "CSE-401",
    courseName: "Data Structures & Applications",
    facultyId: "fac-107",
    facultyName: "Dr. Meera Nambiar",
    semester: 4,
    day: "Monday",
    startTime: "09:00 AM",
    endTime: "10:00 AM",
    room: "LH-104",
    section: "Sec B"
  },
  {
    id: "tt-110",
    courseId: "cse-402",
    courseCode: "CSE-402",
    courseName: "Discrete Mathematical Structures",
    facultyId: "fac-108",
    facultyName: "Prof. Vikramaditya Sen",
    semester: 4,
    day: "Monday",
    startTime: "10:00 AM",
    endTime: "11:00 AM",
    room: "LH-104",
    section: "Sec B"
  }
];
