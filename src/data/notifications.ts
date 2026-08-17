export type NotificationType = 
  | 'Assignment' 
  | 'Assessment' 
  | 'Attendance' 
  | 'Leave' 
  | 'Announcement' 
  | 'Course' 
  | 'Project' 
  | 'Faculty' 
  | 'System';

export type NotificationCategory = 'Academic' | 'Projects' | 'System';

export interface NotificationItem {
  id: string;
  type: NotificationType;
  category: NotificationCategory;
  title: string;
  shortMessage: string;
  fullMessage: string;
  time: string;
  timestamp: string;
  isRead: boolean;
  priority?: 'high' | 'medium' | 'low';
  source: string;
  relatedLink?: string;
  relatedItem?: {
    type: string;
    id: string;
    title: string;
  };
}

export const mockNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    type: 'Assignment',
    category: 'Academic',
    title: 'DBMS Assignment 04 Due Tomorrow',
    shortMessage: 'DBMS Assignment 04 is due tomorrow at 11:59 PM. Please submit your SQL queries report.',
    fullMessage: 'Your assignment "DBMS Assignment 04 — Complex Joins & Subqueries" is scheduled for submission by tomorrow, 11:59 PM. Ensure your submission includes schema definitions, queries, and execution outputs.',
    time: '2 hours ago',
    timestamp: '2026-08-17T07:14:00Z',
    isRead: false,
    priority: 'high',
    source: 'Dr. Faculty Name (DBMS)',
    relatedLink: '/student/assignments/asg-4',
    relatedItem: {
      type: 'Assignment',
      id: 'asg-4',
      title: 'DBMS Assignment 04'
    }
  },
  {
    id: 'notif-2',
    type: 'Leave',
    category: 'Academic',
    title: 'Leave Request Updated',
    shortMessage: 'Your leave request for Tech Fest participation has been approved by HOD.',
    fullMessage: 'Great news! Your attendance leave application (Ref: LV-2026-089) for 14th Aug to 16th Aug 2026 has been verified and approved by the Department Head. Your attendance register will be updated accordingly.',
    time: 'Yesterday',
    timestamp: '2026-08-16T14:30:00Z',
    isRead: false,
    priority: 'medium',
    source: 'Academic Department',
    relatedLink: '/student/leave-requests',
    relatedItem: {
      type: 'Leave Request',
      id: 'LV-2026-089',
      title: 'Tech Fest Duty Leave'
    }
  },
  {
    id: 'notif-3',
    type: 'Project',
    category: 'Projects',
    title: 'Project Milestone Review Scheduled',
    shortMessage: 'API Integration milestone review for "Smart Campus Analytics" is set for Aug 22.',
    fullMessage: 'Dr. Mentor Faculty has scheduled the Phase 2 Milestone Review for project "Smart Campus Analytics". Team leads are required to bring live API endpoint demos and GitHub commit history.',
    time: 'Yesterday',
    timestamp: '2026-08-16T09:15:00Z',
    isRead: true,
    priority: 'high',
    source: 'Project Management Office',
    relatedLink: '/student/projects/proj-1',
    relatedItem: {
      type: 'Project',
      id: 'proj-1',
      title: 'Smart Campus Analytics'
    }
  },
  {
    id: 'notif-4',
    type: 'Assessment',
    category: 'Academic',
    title: 'Mid-Sem Assessment Results Published',
    shortMessage: 'Data Structures & Algorithms Mid-Term test scores are now live.',
    fullMessage: 'The results for DSA Mid-Term Online Assessment (30 Marks) are published. You scored 27/30 (90%). Check detailed section feedback in the Assessments tab.',
    time: '2 days ago',
    timestamp: '2026-08-15T11:00:00Z',
    isRead: true,
    priority: 'medium',
    source: 'Exam Cell',
    relatedLink: '/student/assessments',
    relatedItem: {
      type: 'Assessment',
      id: 'asm-2',
      title: 'DSA Mid-Term Evaluation'
    }
  },
  {
    id: 'notif-5',
    type: 'Announcement',
    category: 'System',
    title: 'Campus Hackathon 2026 Registration Open',
    shortMessage: 'Annual AIET Hackathon registrations are now open for 3rd and 4th year students.',
    fullMessage: 'AIET-UniSphere Hackathon 2026 is officially live! Theme: "AI for Sustainable Smart Cities". Form teams of up to 4 members. Total prize pool ₹1.5 Lakhs.',
    time: '3 days ago',
    timestamp: '2026-08-14T16:45:00Z',
    isRead: true,
    priority: 'low',
    source: 'Innovation & Incubation Cell',
    relatedLink: '/student/announcements',
    relatedItem: {
      type: 'Announcement',
      id: 'anc-101',
      title: 'AIET Hackathon 2026'
    }
  },
  {
    id: 'notif-6',
    type: 'Attendance',
    category: 'Academic',
    title: 'Attendance Alert: Computer Networks',
    shortMessage: 'Attendance in Computer Networks is at 78%. Minimum 80% required.',
    fullMessage: 'Your current attendance percentage in CS-602 Computer Networks has dropped to 78% (28 out of 36 sessions attended). Ensure attendance in upcoming lectures to avoid condonation fee.',
    time: '4 days ago',
    timestamp: '2026-08-13T10:20:00Z',
    isRead: true,
    priority: 'high',
    source: 'Attendance Portal',
    relatedLink: '/student/attendance'
  },
  {
    id: 'notif-7',
    type: 'Faculty',
    category: 'Academic',
    title: 'Lab Session Rescheduled',
    shortMessage: 'Web Technologies Lab session on Friday shifted to 2:00 PM.',
    fullMessage: 'Prof. Tech Instructor has moved Friday\'s 10:00 AM Web Tech Lab to 2:00 PM in Computer Lab 4 due to departmental faculty meeting.',
    time: '5 days ago',
    timestamp: '2026-08-12T08:30:00Z',
    isRead: true,
    priority: 'low',
    source: 'Department Notice'
  },
  {
    id: 'notif-8',
    type: 'System',
    category: 'System',
    title: 'System Maintenance Completed',
    shortMessage: 'AIET-UniSphere Student Portal v4.2 update successful.',
    fullMessage: 'System maintenance and IDE Developer Workspace integration upgrades are complete. All services are running with enhanced performance.',
    time: '1 week ago',
    timestamp: '2026-08-10T00:00:00Z',
    isRead: true,
    priority: 'low',
    source: 'AIET IT Support'
  }
];
