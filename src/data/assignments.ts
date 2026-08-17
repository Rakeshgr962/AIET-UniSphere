export interface Assignment {
  id: string;
  title: string;
  courseId: string;
  courseName: string;
  deadline: string;
  marks: number;
  status: 'Pending' | 'Submitted' | 'Graded' | 'Overdue';
  instructions: string;
  resources: string[];
  rubric: string[];
  submittedFile?: {
    name: string;
    submittedAt: string;
  };
  grade?: {
    score: number;
    feedback: string;
    gradedBy: string;
  };
}

export const mockAssignments: Assignment[] = [];
