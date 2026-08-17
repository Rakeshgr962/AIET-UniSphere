export type UserRole = 'STUDENT' | 'FACULTY' | 'HOD' | 'ADMIN';
export type AccountStatus = 'ACTIVE' | 'INACTIVE' | 'LOCKED' | 'PENDING';
export type LeaveStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface Department {
  id: string;
  name: string;
  code: string | null;
  status: 'ACTIVE' | 'INACTIVE';
  created_at: string;
}

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  usn_or_employee_id: string | null;
  role: UserRole;
  department_id?: string | null;
  department?: Department | null;
  account_status: AccountStatus;
  created_at: string;
  updated_at: string;
}

export interface DBAssignment {
  id: string;
  title: string;
  course_id: string;
  course_name: string;
  description: string | null;
  instructions: string | null;
  deadline: string;
  marks: number;
  department_id: string;
  created_by: string;
  status: string;
  resources?: string[];
  rubric?: string[];
  created_at: string;
  department?: Department | null;
  creator_profile?: Profile | null;
}

export interface DBAssignmentSubmission {
  id: string;
  assignment_id: string;
  student_id: string;
  file_name: string;
  submitted_at: string;
  status: 'Submitted' | 'Graded';
  marks?: number | null;
  feedback?: string | null;
  graded_by?: string | null;
  graded_at?: string | null;
  student_profile?: Profile | null;
}

export interface DBLeaveRequest {
  id: string;
  reference_id: string;
  student_id: string;
  department_id: string;
  hod_id?: string | null;
  leave_type: string;
  reason: string;
  start_date: string;
  end_date: string;
  status: LeaveStatus;
  reviewed_by?: string | null;
  reviewed_at?: string | null;
  rejection_reason?: string | null;
  created_at: string;
  student_profile?: Profile | null;
  department?: Department | null;
  reviewer_profile?: Profile | null;
}

export interface DBNotification {
  id: string;
  user_id: string;
  title: string;
  short_message: string;
  full_message?: string | null;
  source?: string | null;
  category?: string | null;
  type?: string | null;
  related_link?: string | null;
  is_read: boolean;
  created_at: string;
}

export interface DBStudentProfile {
  id: string;
  profile_id: string;
  phone?: string | null;
  date_of_birth?: string | null;
  gender?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  pincode?: string | null;
  parent_name?: string | null;
  parent_phone?: string | null;
  semester?: number | null;
  academic_year?: string | null;
  cgpa?: number | null;
  profile_photo_url?: string | null;
  created_at: string;
  updated_at: string;
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, 'created_at' | 'updated_at'> & {
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Omit<Profile, 'id'>>;
      };
      student_profiles: {
        Row: DBStudentProfile;
        Insert: Omit<DBStudentProfile, 'id' | 'created_at' | 'updated_at'> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Omit<DBStudentProfile, 'id'>>;
      };
      departments: {
        Row: Department;
        Insert: Omit<Department, 'id' | 'created_at'> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Omit<Department, 'id'>>;
      };
      assignments: {
        Row: DBAssignment;
        Insert: Omit<DBAssignment, 'id' | 'created_at'> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Omit<DBAssignment, 'id'>>;
      };
      assignment_submissions: {
        Row: DBAssignmentSubmission;
        Insert: Omit<DBAssignmentSubmission, 'id' | 'submitted_at'> & {
          id?: string;
          submitted_at?: string;
        };
        Update: Partial<Omit<DBAssignmentSubmission, 'id'>>;
      };
      leave_requests: {
        Row: DBLeaveRequest;
        Insert: Omit<DBLeaveRequest, 'id' | 'reference_id' | 'created_at'> & {
          id?: string;
          reference_id?: string;
          created_at?: string;
        };
        Update: Partial<Omit<DBLeaveRequest, 'id'>>;
      };
      notifications: {
        Row: DBNotification;
        Insert: Omit<DBNotification, 'id' | 'created_at'> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Omit<DBNotification, 'id'>>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
