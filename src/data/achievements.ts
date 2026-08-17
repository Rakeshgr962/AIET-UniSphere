export interface AchievementItem {
  id: string;
  title: string;
  category: 'Academic' | 'Projects' | 'Technical' | 'Competitions' | 'Certifications';
  description: string;
  date: string;
  iconName: string;
  status: 'Unlocked' | 'In Progress';
  evidenceText: string;
  relatedProjectOrCourse?: string;
}

export const mockAchievements: AchievementItem[] = [
  {
    id: 'ach-1',
    title: 'Academic Excellence (Sem 5)',
    category: 'Academic',
    description: 'Achieved an SGPA of 8.78 in Semester 5 Examinations.',
    date: 'Jan 2026',
    iconName: 'Award',
    status: 'Unlocked',
    evidenceText: 'Verified via Official Grade Card — Rank Top 5% in CSE Department.',
    relatedProjectOrCourse: 'Semester 5 Grade Card'
  },
  {
    id: 'ach-2',
    title: 'Completed First Capstone Project',
    category: 'Projects',
    description: 'Successfully submitted Phase 1 architecture review for AI Campus Analytics.',
    date: 'Aug 2026',
    iconName: 'FolderCheck',
    status: 'Unlocked',
    evidenceText: 'Project submission evaluated & approved by Faculty Mentor Prof. Rakesh Sharma.',
    relatedProjectOrCourse: 'AI Campus Analytics'
  },
  {
    id: 'ach-3',
    title: 'AIET Annual Hackathon Finalist',
    category: 'Competitions',
    description: 'Secured 3rd place in 24-hour Smart Campus AI Challenge.',
    date: 'May 2026',
    iconName: 'Trophy',
    status: 'Unlocked',
    evidenceText: 'Certificate of Merit awarded by AIET Innovation Council.',
    relatedProjectOrCourse: 'Smart Campus AI Challenge'
  },
  {
    id: 'ach-4',
    title: 'Python Skill Milestone Level 3',
    category: 'Technical',
    description: 'Completed 5 verified data analysis assignments and project modules.',
    date: 'Jul 2026',
    iconName: 'Code',
    status: 'Unlocked',
    evidenceText: 'Verified through Skill Passport Git commits & assignment submissions.',
    relatedProjectOrCourse: 'CS601 Artificial Intelligence'
  },
  {
    id: 'ach-5',
    title: 'Peer Reviewer & Git Contributor',
    category: 'Certifications',
    description: 'Contributed 50+ commits and reviewed 10 pull requests in team projects.',
    date: 'Aug 2026',
    iconName: 'GitMerge',
    status: 'Unlocked',
    evidenceText: 'GitHub Version Control activity badge verified by system statistics.',
    relatedProjectOrCourse: 'AIET-UniSphere Repository'
  },
  {
    id: 'ach-6',
    title: '100% Attendance Streak (DBMS)',
    category: 'Academic',
    description: 'Maintained zero absences across 32 continuous Database Management lectures.',
    date: 'Jul 2026',
    iconName: 'CalendarCheck',
    status: 'Unlocked',
    evidenceText: 'Verified via Institutional Biometric Attendance Records.',
    relatedProjectOrCourse: 'CS602 Database Management Systems'
  }
];
