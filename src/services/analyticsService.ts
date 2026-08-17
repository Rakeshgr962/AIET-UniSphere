import type { 
  AcademicOverviewStats, 
  SemesterTrendItem, 
  SubjectPerformanceItem, 
  AssessmentBreakdownItem, 
  AssignmentCompletionData, 
  PerformanceInsights 
} from '../data/analytics';
import { 
  mockAcademicOverview, 
  mockSemesterTrends, 
  mockSubjectPerformances, 
  mockAssessmentBreakdown, 
  mockAssignmentStats, 
  mockPerformanceInsights 
} from '../data/analytics';

export const getAcademicOverview = async (): Promise<AcademicOverviewStats> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ ...mockAcademicOverview });
    }, 100);
  });
};

export const getSemesterTrends = async (): Promise<SemesterTrendItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockSemesterTrends]);
    }, 100);
  });
};

export const getSubjectPerformances = async (): Promise<SubjectPerformanceItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockSubjectPerformances]);
    }, 100);
  });
};

export const getAssessmentBreakdown = async (): Promise<AssessmentBreakdownItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockAssessmentBreakdown]);
    }, 100);
  });
};

export const getAssignmentStats = async (): Promise<AssignmentCompletionData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ ...mockAssignmentStats });
    }, 100);
  });
};

export const getPerformanceInsights = async (): Promise<PerformanceInsights> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ ...mockPerformanceInsights });
    }, 100);
  });
};
