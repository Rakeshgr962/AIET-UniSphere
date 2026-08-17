export interface Announcement {
  id: string;
  title: string;
  content: string;
  category: 'Academic' | 'Exam' | 'Event' | 'General';
  departmentId: string;
  departmentName: string;
  createdBy: string;
  authorRole: 'HOD' | 'Faculty' | 'Admin';
  targetAudience: 'Students' | 'Faculty' | 'Students + Faculty';
  publishedAt: string;
  status: 'Published' | 'Draft';
}

export const mockAnnouncements: Announcement[] = [
  {
    id: "anc-201",
    title: "AIET Hackathon 2026 Registration Open",
    content: "Registrations are open for the annual AIET Hackathon. Cash prizes up to ₹1.5 Lakhs. Form teams of 4 members and register before August 25.",
    category: "Event",
    departmentId: "dept-ds",
    departmentName: "CSE — Data Science",
    createdBy: "Dr. Sneha Reddy",
    authorRole: "HOD",
    targetAudience: "Students + Faculty",
    publishedAt: "2026-08-14 09:30 AM",
    status: "Published"
  },
  {
    id: "anc-202",
    title: "Library Hours Extended for Mid-Sem Exams",
    content: "The Central Digital Library will remain open until 10:00 PM starting next Monday for examination preparation.",
    category: "General",
    departmentId: "dept-ds",
    departmentName: "CSE — Data Science",
    createdBy: "Central Library Cell",
    authorRole: "Admin",
    targetAudience: "Students",
    publishedAt: "2026-08-10 11:00 AM",
    status: "Published"
  },
  {
    id: "anc-203",
    title: "Submitting Project Proposals for Semester 6",
    content: "All 6th Semester students are requested to upload project abstracts and team rosters in the Project Portal by August 25.",
    category: "Academic",
    departmentId: "dept-ds",
    departmentName: "CSE — Data Science",
    createdBy: "Dr. Sneha Reddy",
    authorRole: "HOD",
    targetAudience: "Students",
    publishedAt: "2026-08-05 02:15 PM",
    status: "Published"
  },
  {
    id: "anc-204",
    title: "Department Faculty Meeting on Curriculum Revision",
    content: "All Data Science department faculty members are requested to attend the monthly syllabus review meeting on Friday at 03:30 PM in Seminar Hall B.",
    category: "Academic",
    departmentId: "dept-ds",
    departmentName: "CSE — Data Science",
    createdBy: "Dr. Sneha Reddy",
    authorRole: "HOD",
    targetAudience: "Faculty",
    publishedAt: "2026-08-16 04:00 PM",
    status: "Draft"
  }
];
