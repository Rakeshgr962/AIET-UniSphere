import { mockAssessments } from '../data/assessments';
import type { Assessment } from '../data/assessments';

let sessionAssessments = [...mockAssessments];

export const getAssessments = (): Promise<Assessment[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(sessionAssessments);
    }, 300);
  });
};

export const getDepartmentAssessments = getAssessments;

export const getAssessmentById = (id: string): Promise<Assessment | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const assessment = sessionAssessments.find(a => a.id === id);
      resolve(assessment);
    }, 300);
  });
};

export const submitAssessmentAnswers = (
  id: string, 
  answers: { [questionId: number]: number }
): Promise<Assessment> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = sessionAssessments.findIndex(a => a.id === id);
      if (index !== -1) {
        const assessment = sessionAssessments[index];
        if (!assessment.questions) {
          reject(new Error("No questions available for grading"));
          return;
        }

        let correctCount = 0;
        let score = 0;
        const totalQuestions = assessment.questions.length;

        assessment.questions.forEach((q) => {
          const selectedOption = answers[q.id];
          if (selectedOption === q.correctOptionIndex) {
            correctCount++;
            score += q.marks;
          }
        });

        const totalPossibleMarks = assessment.questions.reduce((sum, q) => sum + q.marks, 0);
        const percentage = totalPossibleMarks > 0 ? Math.round((score / totalPossibleMarks) * 100) : 0;
        const incorrectCount = totalQuestions - correctCount;

        // Dynamic topic breakdown for grading visual reports
        const topicPerformance = [
          { topic: "Theory & Terminology", score: percentage >= 80 ? 90 : 70 },
          { topic: "Application & Synthesis", score: percentage >= 80 ? 82 : 60 }
        ];

        const updated: Assessment = {
          ...assessment,
          status: 'Completed',
          result: {
            score,
            percentage,
            correctCount,
            incorrectCount,
            topicPerformance
          }
        };

        sessionAssessments[index] = updated;
        resolve(updated);
      } else {
        reject(new Error("Assessment not found"));
      }
    }, 1000);
  });
};

export interface CreateAssessmentPayload {
  title: string;
  courseId: string;
  courseName: string;
  courseCode?: string;
  semester?: number;
  date: string;
  dueDate?: string;
  time: string;
  duration: number; // in minutes
  totalMarks?: number;
  instructions: string;
}

export const getFacultyAssessments = getAssessments;

export const createAssessment = (payload: CreateAssessmentPayload): Promise<Assessment> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newId = `asm-${Date.now()}`;
      const newAssessment: Assessment = {
        id: newId,
        title: payload.title,
        courseId: payload.courseId,
        courseCode: payload.courseCode || payload.courseId,
        courseName: payload.courseName,
        semester: payload.semester || 6,
        date: payload.date,
        dueDate: payload.dueDate || payload.date,
        time: payload.time || '10:00 AM',
        duration: payload.duration || 60,
        durationMinutes: payload.duration || 60,
        status: 'Upcoming',
        questionsCount: 5,
        totalMarks: payload.totalMarks || 50,
        instructions: payload.instructions,
        questions: [
          {
            id: 1,
            text: `Sample question for ${payload.title}`,
            options: ['Option A', 'Option B', 'Option C', 'Option D'],
            correctOptionIndex: 0,
            marks: 10
          }
        ]
      };
      sessionAssessments = [newAssessment, ...sessionAssessments];
      resolve(newAssessment);
    }, 250);
  });
};
