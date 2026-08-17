import { mockAssignments } from '../data/assignments';
import type { Assignment } from '../data/assignments';

// In-memory assignment storage for session persistence during mock interactions
let sessionAssignments = [...mockAssignments];

export const getAssignments = (): Promise<Assignment[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(sessionAssignments);
    }, 500);
  });
};

export const getAssignmentById = (id: string): Promise<Assignment | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const assignment = sessionAssignments.find(a => a.id === id);
      resolve(assignment);
    }, 300);
  });
};

export const submitAssignment = (id: string, fileName: string): Promise<Assignment> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = sessionAssignments.findIndex(a => a.id === id);
      if (index !== -1) {
        const updated = {
          ...sessionAssignments[index],
          status: 'Submitted' as const,
          submittedFile: {
            name: fileName,
            submittedAt: new Date().toISOString()
          }
        };
        sessionAssignments[index] = updated;
        resolve(updated);
      } else {
        reject(new Error("Assignment not found"));
      }
    }, 1200); // Simulate upload latency
  });
};
