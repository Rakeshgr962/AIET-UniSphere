import { mockAssessments } from '../data/assessments';
import type { Assessment } from '../data/assessments';

let sessionAssessments = [...mockAssessments];

export const getAssessments = (): Promise<Assessment[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(sessionAssessments);
    }, 500);
  });
};

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
