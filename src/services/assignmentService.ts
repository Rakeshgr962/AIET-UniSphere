import { supabase } from '../lib/supabase';
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

export const getAssignments = async (): Promise<Assignment[]> => {
  try {
    const { data: { user } } = await (supabase as any).auth.getUser();
    if (!user) return [];

    // Query profile for student department
    const { data: profile } = await (supabase as any)
      .from('profiles')
      .select('department_id')
      .eq('id', user.id)
      .single();

    if (!profile?.department_id) return [];

    // Fetch assignments for department
    const { data: assignmentsData, error } = await (supabase as any)
      .from('assignments')
      .select('*')
      .eq('department_id', profile.department_id)
      .order('created_at', { ascending: false });

    if (error || !assignmentsData) {
      console.error('Error fetching student assignments:', error);
      return [];
    }

    // Fetch student's submissions
    const { data: submissionsData } = await (supabase as any)
      .from('assignment_submissions')
      .select('*')
      .eq('student_id', user.id);

    const submissionsMap = new Map((submissionsData || []).map((s: any) => [s.assignment_id, s]));

    return assignmentsData.map((a: any) => {
      const sub: any = submissionsMap.get(a.id);
      let status: Assignment['status'] = 'Pending';
      if (sub) {
        status = sub.status === 'Graded' ? 'Graded' : 'Submitted';
      } else if (new Date(a.deadline) < new Date()) {
        status = 'Overdue';
      }

      return {
        id: a.id,
        title: a.title,
        courseId: a.course_id,
        courseName: a.course_name,
        deadline: a.deadline,
        marks: Number(a.marks),
        status,
        instructions: a.instructions || a.description || '',
        resources: Array.isArray(a.resources) ? a.resources : [],
        rubric: Array.isArray(a.rubric) ? a.rubric : [],
        submittedFile: sub ? { name: sub.file_name, submittedAt: sub.submitted_at } : undefined,
        grade: sub?.status === 'Graded' ? {
          score: Number(sub.marks || 0),
          feedback: sub.feedback || '',
          gradedBy: 'Faculty Evaluator'
        } : undefined
      };
    });
  } catch (err) {
    console.error('Failed to query assignments:', err);
    return [];
  }
};

export const getFacultyAssignments = async (): Promise<Assignment[]> => {
  try {
    const { data: { user } } = await (supabase as any).auth.getUser();
    if (!user) return [];

    const { data: profile } = await (supabase as any)
      .from('profiles')
      .select('department_id')
      .eq('id', user.id)
      .single();

    if (!profile?.department_id) return [];

    const { data: assignmentsData, error } = await (supabase as any)
      .from('assignments')
      .select('*')
      .or(`department_id.eq.${profile.department_id},created_by.eq.${user.id}`)
      .order('created_at', { ascending: false });

    if (error || !assignmentsData) return [];

    return assignmentsData.map((a: any) => ({
      id: a.id,
      title: a.title,
      courseId: a.course_id,
      courseName: a.course_name,
      deadline: a.deadline,
      marks: Number(a.marks),
      status: 'Pending',
      instructions: a.instructions || '',
      resources: Array.isArray(a.resources) ? a.resources : [],
      rubric: Array.isArray(a.rubric) ? a.rubric : []
    }));
  } catch (err) {
    console.error('Failed to query faculty assignments:', err);
    return [];
  }
};

export const getAssignmentById = async (id: string): Promise<Assignment | undefined> => {
  try {
    const { data: a, error } = await (supabase as any)
      .from('assignments')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !a) return undefined;

    const { data: { user } } = await (supabase as any).auth.getUser();
    let sub: any = null;
    if (user) {
      const { data } = await (supabase as any)
        .from('assignment_submissions')
        .select('*')
        .eq('assignment_id', id)
        .eq('student_id', user.id)
        .maybeSingle();
      sub = data;
    }

    let status: Assignment['status'] = 'Pending';
    if (sub) {
      status = sub.status === 'Graded' ? 'Graded' : 'Submitted';
    } else if (new Date(a.deadline) < new Date()) {
      status = 'Overdue';
    }

    return {
      id: a.id,
      title: a.title,
      courseId: a.course_id,
      courseName: a.course_name,
      deadline: a.deadline,
      marks: Number(a.marks),
      status,
      instructions: a.instructions || '',
      resources: Array.isArray(a.resources) ? a.resources : [],
      rubric: Array.isArray(a.rubric) ? a.rubric : [],
      submittedFile: sub ? { name: sub.file_name, submittedAt: sub.submitted_at } : undefined,
      grade: sub?.status === 'Graded' ? {
        score: Number(sub.marks || 0),
        feedback: sub.feedback || '',
        gradedBy: 'Faculty Evaluator'
      } : undefined
    };
  } catch (err) {
    console.error('Failed to query assignment by id:', err);
    return undefined;
  }
};

export const submitAssignment = async (id: string, fileName: string): Promise<Assignment> => {
  const { data: { user } } = await (supabase as any).auth.getUser();
  if (!user) throw new Error("Authenticated session required.");

  const { data: existing } = await (supabase as any)
    .from('assignment_submissions')
    .select('id')
    .eq('assignment_id', id)
    .eq('student_id', user.id)
    .maybeSingle();

  if (existing) {
    await (supabase as any)
      .from('assignment_submissions')
      .update({
        file_name: fileName,
        submitted_at: new Date().toISOString(),
        status: 'Submitted'
      })
      .eq('id', existing.id);
  } else {
    await (supabase as any)
      .from('assignment_submissions')
      .insert({
        assignment_id: id,
        student_id: user.id,
        file_name: fileName,
        submitted_at: new Date().toISOString(),
        status: 'Submitted'
      });
  }

  const updated = await getAssignmentById(id);
  if (!updated) throw new Error("Assignment submission failed.");
  return updated;
};

export const createAssignment = async (payload: CreateAssignmentPayload): Promise<Assignment> => {
  const { data: { user } } = await (supabase as any).auth.getUser();
  if (!user) throw new Error("Authenticated session required.");

  // Get current user's profile to resolve department_id
  const { data: profile, error: profErr } = await (supabase as any)
    .from('profiles')
    .select('department_id')
    .eq('id', user.id)
    .single();

  if (profErr || !profile?.department_id) {
    throw new Error("No active department assigned to your profile. Cannot create assignment.");
  }

  const { data, error } = await (supabase as any)
    .from('assignments')
    .insert({
      title: payload.title,
      course_id: payload.courseId,
      course_name: payload.courseName,
      instructions: payload.instructions,
      deadline: payload.deadline,
      marks: payload.marks,
      department_id: profile.department_id,
      created_by: user.id,
      status: 'Active',
      resources: payload.resources || [],
      rubric: payload.rubric || [
        "Technical Accuracy & Completeness (10 Marks)",
        "Code/Document Formatting & Structure (5 Marks)",
        "Timely Submission (5 Marks)"
      ]
    })
    .select()
    .single();

  if (error || !data) {
    throw new Error(error?.message || "Failed to create assignment.");
  }

  return {
    id: data.id,
    title: data.title,
    courseId: data.course_id,
    courseName: data.course_name,
    deadline: data.deadline,
    marks: Number(data.marks),
    status: 'Pending',
    instructions: data.instructions || '',
    resources: Array.isArray(data.resources) ? data.resources : [],
    rubric: Array.isArray(data.rubric) ? data.rubric : []
  };
};

export const getSubmissionsForAssignment = async (assignmentId: string): Promise<FacultyAssignmentSubmission[]> => {
  try {
    const { data, error } = await (supabase as any)
      .from('assignment_submissions')
      .select('*, profiles!student_id(full_name, usn_or_employee_id)')
      .eq('assignment_id', assignmentId);

    if (error || !data) return [];

    return data.map((s: any) => ({
      id: s.id,
      assignmentId: s.assignment_id,
      studentId: s.student_id,
      studentName: s.profiles?.full_name || 'Student',
      usn: s.profiles?.usn_or_employee_id || 'N/A',
      submittedAt: s.submitted_at,
      fileName: s.file_name,
      status: s.status,
      marks: s.marks ? Number(s.marks) : undefined,
      feedback: s.feedback || undefined
    }));
  } catch (err) {
    console.error('Error fetching submissions:', err);
    return [];
  }
};

export const gradeSubmission = async (
  assignmentId: string,
  submissionId: string,
  marks: number,
  feedback: string,
  gradedBy: string = "Faculty Evaluator"
): Promise<FacultyAssignmentSubmission> => {
  const { data: { user } } = await (supabase as any).auth.getUser();

  const { data, error } = await (supabase as any)
    .from('assignment_submissions')
    .update({
      status: 'Graded',
      marks,
      feedback,
      graded_by: user?.id || null,
      graded_at: new Date().toISOString()
    })
    .eq('id', submissionId)
    .select('*, profiles!student_id(full_name, usn_or_employee_id)')
    .single();

  if (error || !data) throw new Error(error?.message || "Failed to grade submission.");

  return {
    id: data.id,
    assignmentId: data.assignment_id,
    studentId: data.student_id,
    studentName: data.profiles?.full_name || 'Student',
    usn: data.profiles?.usn_or_employee_id || 'N/A',
    submittedAt: data.submitted_at,
    fileName: data.file_name,
    status: data.status,
    marks: Number(data.marks),
    feedback: data.feedback || undefined
  };
};
