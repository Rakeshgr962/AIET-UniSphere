import { mockAssignments } from '../data/assignments';
import type { Assignment } from '../data/assignments';
export type { Assignment };
import { addNotification } from './notificationService';

export interface FacultyAssignmentSubmission {
  id: string;
  assignmentId: string;
  studentId: string;
  studentName: string;
  usn: string;
  submittedAt: string;
  fileName: string;
  status: 'Submitted' | 'Graded';
  marks?: number;
  feedback?: string;
}

export interface CreateAssignmentPayload {
  title: string;
  courseId: string;
  courseName: string;
  deadline: string;
  marks: number;
  instructions: string;
  resources?: string[];
  rubric?: string[];
}

// Shared reactive session state
let sessionAssignments: Assignment[] = [...mockAssignments];

let sessionSubmissions: FacultyAssignmentSubmission[] = [
  {
    id: "sub-1",
    assignmentId: "assign-dbms-04",
    studentId: "std-1",
    studentName: "Jane Doe",
    usn: "1AB20CS002",
    submittedAt: "2026-08-16T14:30:00",
    fileName: "1AB20CS002_DBMS_Optimization.pdf",
    status: "Submitted"
  },
  {
    id: "sub-2",
    assignmentId: "assign-dbms-04",
    studentId: "std-2",
    studentName: "Rakesh G R",
    usn: "4AI21DS001",
    submittedAt: "2026-08-16T16:15:00",
    fileName: "4AI21DS001_DBMS_Query_Tuning.pdf",
    status: "Submitted"
  },
  {
    id: "sub-3",
    assignmentId: "assign-dbms-04",
    studentId: "std-7",
    studentName: "Pooja Hegde",
    usn: "4AI21DS045",
    submittedAt: "2026-08-17T08:45:00",
    fileName: "4AI21DS045_Indexing_Benchmark.pdf",
    status: "Submitted"
  },
  {
    id: "sub-4",
    assignmentId: "assign-da-02",
    studentId: "std-1",
    studentName: "Jane Doe",
    usn: "1AB20CS002",
    submittedAt: "2026-08-11T21:40:00",
    fileName: "1AB20CS002_Algorithms_DP.pdf",
    status: "Submitted"
  },
  {
    id: "sub-5",
    assignmentId: "assign-se-01",
    studentId: "std-1",
    studentName: "Jane Doe",
    usn: "1AB20CS002",
    submittedAt: "2026-08-04T15:30:00",
    fileName: "1AB20CS002_SE_Hostel_UML.pdf",
    status: "Graded",
    marks: 13,
    feedback: "Great object relations in the Class diagram. The Sequence diagram was missing the database entity lifecycle step."
  }
];

export const getAssignments = (): Promise<Assignment[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...sessionAssignments]);
    }, 150);
  });
};

export const getFacultyAssignments = (): Promise<Assignment[]> => {
  return getAssignments();
};

export const getAssignmentById = (id: string): Promise<Assignment | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const assignment = sessionAssignments.find(a => a.id === id);
      resolve(assignment ? { ...assignment } : undefined);
    }, 150);
  });
};

export const submitAssignment = (id: string, fileName: string): Promise<Assignment> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = sessionAssignments.findIndex(a => a.id === id);
      if (index !== -1) {
        const updated: Assignment = {
          ...sessionAssignments[index],
          status: 'Submitted',
          submittedFile: {
            name: fileName,
            submittedAt: new Date().toISOString()
          }
        };
        sessionAssignments[index] = updated;

        // Also add or update submission entry for faculty view
        const existingSubIdx = sessionSubmissions.findIndex(s => s.assignmentId === id && s.studentId === 'std-1');
        if (existingSubIdx !== -1) {
          sessionSubmissions[existingSubIdx] = {
            ...sessionSubmissions[existingSubIdx],
            submittedAt: new Date().toISOString(),
            fileName: fileName,
            status: 'Submitted'
          };
        } else {
          sessionSubmissions.push({
            id: `sub-${Date.now()}`,
            assignmentId: id,
            studentId: "std-1",
            studentName: "Jane Doe",
            usn: "1AB20CS002",
            submittedAt: new Date().toISOString(),
            fileName: fileName,
            status: "Submitted"
          });
        }

        resolve(updated);
      } else {
        reject(new Error("Assignment not found"));
      }
    }, 300);
  });
};

export const createAssignment = (payload: CreateAssignmentPayload): Promise<Assignment> => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      const newId = `assign-${payload.courseId}-${Date.now().toString().slice(-4)}`;
      const newAssignment: Assignment = {
        id: newId,
        title: payload.title,
        courseId: payload.courseId,
        courseName: payload.courseName,
        deadline: payload.deadline,
        marks: payload.marks,
        status: 'Pending',
        instructions: payload.instructions,
        resources: payload.resources || [],
        rubric: payload.rubric || [
          "Technical Accuracy & Completeness (10 Marks)",
          "Code/Document Formatting & Structure (5 Marks)",
          "Timely Submission (5 Marks)"
        ]
      };

      sessionAssignments = [newAssignment, ...sessionAssignments];

      // Send automated notification to students
      await addNotification({
        title: `New Assignment Posted: ${payload.title}`,
        message: `${payload.courseName} assignment posted by faculty. Due date: ${payload.deadline.slice(0, 10)}.`,
        category: 'Assignments',
        type: 'urgent',
        link: `/student/assignments/${newId}`
      });

      resolve(newAssignment);
    }, 250);
  });
};

export const getSubmissionsForAssignment = (assignmentId: string): Promise<FacultyAssignmentSubmission[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const subs = sessionSubmissions.filter(s => s.assignmentId === assignmentId);
      resolve([...subs]);
    }, 150);
  });
};

export const gradeSubmission = (
  assignmentId: string,
  submissionId: string,
  marks: number,
  feedback: string,
  gradedBy: string = "Dr. Sneha Reddy"
): Promise<FacultyAssignmentSubmission> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const subIdx = sessionSubmissions.findIndex(s => s.id === submissionId || (s.assignmentId === assignmentId && s.id === submissionId));
      if (subIdx !== -1) {
        const updatedSub: FacultyAssignmentSubmission = {
          ...sessionSubmissions[subIdx],
          status: 'Graded',
          marks,
          feedback
        };
        sessionSubmissions[subIdx] = updatedSub;

        // Sync with student assignment view if this belongs to Jane Doe (std-1)
        const assignIdx = sessionAssignments.findIndex(a => a.id === assignmentId);
        if (assignIdx !== -1) {
          sessionAssignments[assignIdx] = {
            ...sessionAssignments[assignIdx],
            status: 'Graded',
            grade: {
              score: marks,
              feedback,
              gradedBy
            }
          };
        }

        resolve(updatedSub);
      } else {
        reject(new Error("Submission not found"));
      }
    }, 250);
  });
};
