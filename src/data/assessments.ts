export interface AssessmentQuestion {
  id: number;
  text: string;
  options: string[];
  correctOptionIndex: number;
  marks: number;
}

export interface Assessment {
  id: string;
  title: string;
  courseId: string;
  courseCode?: string;
  courseName: string;
  semester?: number;
  date: string;
  dueDate?: string;
  time: string;
  duration: number; // in minutes
  durationMinutes?: number;
  status: 'Upcoming' | 'Completed' | 'Active' | 'Graded';
  questionsCount: number;
  instructions: string;
  totalMarks?: number;
  questions?: AssessmentQuestion[];
  result?: {
    score: number;
    percentage: number;
    correctCount: number;
    incorrectCount: number;
    topicPerformance: { topic: string; score: number }[];
  };
}

export const mockAssessments: Assessment[] = [];
