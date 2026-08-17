export interface AcademicOverviewStats {
  cgpa: number;
  sgpa: number;
  attendancePercent: number;
  assignmentCompletionPercent: number;
  assessmentAveragePercent: number;
}

export interface SemesterTrendItem {
  semester: string;
  gpa: number;
  target: number;
}

export interface SubjectPerformanceItem {
  id: string;
  code: string;
  name: string;
  average: number;
  trend: 'Improving' | 'Stable' | 'Needs Attention';
  trendValue: string;
  grade: string;
}

export interface AssessmentBreakdownItem {
  name: string;
  score: number;
  total: number;
  percentage: number;
  date: string;
  trend: 'up' | 'down' | 'same';
}

export interface AssignmentCompletionData {
  submitted: number;
  pending: number;
  late: number;
  graded: number;
  completionPercentage: number;
}

export interface PerformanceInsights {
  strongestArea: {
    subject: string;
    score: number;
    details: string;
  };
  needsAttention: {
    subject: string;
    score: number;
    details: string;
  };
  improving: {
    subject: string;
    score: number;
    details: string;
  };
}

export const mockAcademicOverview: AcademicOverviewStats = {
  cgpa: 8.62,
  sgpa: 8.85,
  attendancePercent: 88.5,
  assignmentCompletionPercent: 94.1,
  assessmentAveragePercent: 85.4
};

export const mockSemesterTrends: SemesterTrendItem[] = [
  { semester: 'Sem 1', gpa: 8.20, target: 8.00 },
  { semester: 'Sem 2', gpa: 8.45, target: 8.00 },
  { semester: 'Sem 3', gpa: 8.30, target: 8.50 },
  { semester: 'Sem 4', gpa: 8.65, target: 8.50 },
  { semester: 'Sem 5', gpa: 8.78, target: 8.50 },
  { semester: 'Current (Sem 6)', gpa: 8.85, target: 8.75 }
];

export const mockSubjectPerformances: SubjectPerformanceItem[] = [
  {
    id: 'sub-1',
    code: 'CS601',
    name: 'Artificial Intelligence',
    average: 91.2,
    trend: 'Improving',
    trendValue: '+4.5%',
    grade: 'A+'
  },
  {
    id: 'sub-2',
    code: 'CS602',
    name: 'Database Management Systems',
    average: 84.0,
    trend: 'Improving',
    trendValue: '+8.0%',
    grade: 'A'
  },
  {
    id: 'sub-3',
    code: 'CS603',
    name: 'Operating Systems',
    average: 81.5,
    trend: 'Stable',
    trendValue: '+0.5%',
    grade: 'A'
  },
  {
    id: 'sub-4',
    code: 'CS604',
    name: 'Computer Networks',
    average: 76.2,
    trend: 'Needs Attention',
    trendValue: '-2.1%',
    grade: 'B+'
  }
];

export const mockAssessmentBreakdown: AssessmentBreakdownItem[] = [
  { name: 'Internal Assessment 1', score: 23.5, total: 30, percentage: 78.3, date: '12 Jul 2026', trend: 'up' },
  { name: 'Internal Assessment 2', score: 25.2, total: 30, percentage: 84.0, date: '28 Jul 2026', trend: 'up' },
  { name: 'Unit Test 1', score: 16.2, total: 20, percentage: 81.0, date: '04 Aug 2026', trend: 'up' },
  { name: 'Unit Test 2', score: 17.4, total: 20, percentage: 87.0, date: '14 Aug 2026', trend: 'up' }
];

export const mockAssignmentStats: AssignmentCompletionData = {
  submitted: 16,
  pending: 1,
  late: 1,
  graded: 15,
  completionPercentage: 94.1
};

export const mockPerformanceInsights: PerformanceInsights = {
  strongestArea: {
    subject: 'Artificial Intelligence',
    score: 91.2,
    details: 'Consistently high performance in search algorithms and neural network labs.'
  },
  needsAttention: {
    subject: 'Computer Networks',
    score: 76.2,
    details: 'Routing algorithms (BGP/OSPF) and subnetting require additional focus.'
  },
  improving: {
    subject: 'Database Management Systems',
    score: 84.0,
    details: '+8.0% score increase following 3NF normalization practice sets.'
  }
};
