import { supabase } from '../lib/supabase';
import type { LeaveRequest } from '../data/leaveRequests';
export type { LeaveRequest };

export const getStudentLeaveRequests = async (): Promise<LeaveRequest[]> => {
  try {
    const { data: { user } } = await (supabase as any).auth.getUser();
    if (!user) return [];

    const { data, error } = await (supabase as any)
      .from('leave_requests')
      .select(`
        *,
        student:profiles!student_id(full_name, usn_or_employee_id, email, role, department:departments(name, code)),
        reviewer:profiles!reviewed_by(full_name)
      `)
      .eq('student_id', user.id)
      .order('created_at', { ascending: false });

    if (error || !data) {
      console.error('Error fetching student leave requests:', error);
      return [];
    }

    return data.map((l: any) => {
      const sDate = new Date(l.start_date);
      const eDate = new Date(l.end_date);
      const diffTime = Math.abs(eDate.getTime() - sDate.getTime());
      const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

      const statusFormatted = (l.status.charAt(0).toUpperCase() + l.status.slice(1).toLowerCase()) as any;

      return {
        id: l.reference_id || l.id,
        dbId: l.id,
        requesterId: l.student_id,
        requesterName: l.student?.full_name || 'Student',
        requesterUsnOrEmpId: l.student?.usn_or_employee_id || 'N/A',
        requesterRole: 'STUDENT',
        requesterEmail: l.student?.email || undefined,
        departmentId: l.department_id,
        departmentName: l.student?.department?.name || 'Department not assigned',
        leaveType: l.leave_type as any,
        startDate: l.start_date,
        endDate: l.end_date,
        days: isNaN(days) ? 1 : days,
        reason: l.reason,
        status: statusFormatted,
        submittedAt: new Date(l.created_at).toLocaleDateString(),
        reviewedBy: l.reviewed_by ? (l.reviewer?.full_name || 'HOD') : undefined,
        reviewerName: l.reviewer?.full_name || undefined,
        remark: l.rejection_reason || undefined
      };
    });
  } catch (err) {
    console.error('Failed to query leave requests:', err);
    return [];
  }
};

export const getDepartmentLeaveRequests = async (): Promise<LeaveRequest[]> => {
  try {
    const { data: { user } } = await (supabase as any).auth.getUser();
    if (!user) return [];

    const { data: profile } = await (supabase as any)
      .from('profiles')
      .select('department_id, role')
      .eq('id', user.id)
      .single();

    if (!profile?.department_id) return [];

    const { data, error } = await (supabase as any)
      .from('leave_requests')
      .select(`
        *,
        student:profiles!student_id(full_name, usn_or_employee_id, email, role, department:departments(name, code)),
        reviewer:profiles!reviewed_by(full_name)
      `)
      .eq('department_id', profile.department_id)
      .order('created_at', { ascending: false });

    if (error || !data) {
      console.error('Error fetching department leave requests:', error);
      return [];
    }

    return data.map((l: any) => {
      const sDate = new Date(l.start_date);
      const eDate = new Date(l.end_date);
      const diffTime = Math.abs(eDate.getTime() - sDate.getTime());
      const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

      const statusFormatted = (l.status.charAt(0).toUpperCase() + l.status.slice(1).toLowerCase()) as any;

      return {
        id: l.reference_id || l.id,
        dbId: l.id,
        requesterId: l.student_id,
        requesterName: l.student?.full_name || 'Student',
        requesterUsnOrEmpId: l.student?.usn_or_employee_id || 'N/A',
        requesterRole: 'STUDENT',
        requesterEmail: l.student?.email || undefined,
        departmentId: l.department_id,
        departmentName: l.student?.department?.name || 'Department not assigned',
        leaveType: l.leave_type as any,
        startDate: l.start_date,
        endDate: l.end_date,
        days: isNaN(days) ? 1 : days,
        reason: l.reason,
        status: statusFormatted,
        submittedAt: new Date(l.created_at).toLocaleDateString(),
        reviewedBy: l.reviewed_by ? (l.reviewer?.full_name || 'HOD') : undefined,
        reviewerName: l.reviewer?.full_name || undefined,
        remark: l.rejection_reason || undefined
      };
    });
  } catch (err) {
    console.error('Failed to query HOD department leave requests:', err);
    return [];
  }
};

export const getAllLeaveRequests = async (): Promise<LeaveRequest[]> => {
  return getStudentLeaveRequests();
};

export const getLeaveRequestById = async (idOrUuid: string): Promise<LeaveRequest | null> => {
  try {
    const { data: { user } } = await (supabase as any).auth.getUser();
    if (!user) throw new Error("Authenticated session required.");

    // Query active user's profile to check department scoping
    const { data: callerProfile } = await (supabase as any)
      .from('profiles')
      .select('id, role, department_id')
      .eq('id', user.id)
      .single();

    if (!callerProfile) throw new Error("User profile not found.");

    // Select target leave request by id (UUID) or reference_id ('LV-101')
    const { data: l, error } = await (supabase as any)
      .from('leave_requests')
      .select(`
        *,
        student:profiles!student_id (
          id,
          full_name,
          usn_or_employee_id,
          email,
          role,
          department_id,
          department:departments (
            id,
            name,
            code
          )
        ),
        reviewer:profiles!reviewed_by (
          full_name
        )
      `)
      .or(`id.eq.${idOrUuid},reference_id.eq.${idOrUuid}`)
      .single();

    if (error || !l) {
      console.error("Error fetching leave request by ID:", error);
      return null;
    }

    // Security Check: HOD can only view leave requests belonging to their own department
    if (callerProfile.role === 'HOD' && l.department_id !== callerProfile.department_id) {
      throw new Error("ACCESS DENIED: You are only authorized to review leave requests for your own department.");
    }

    // Fetch extended student profile for academic info (semester, cgpa)
    const { data: studentProf } = await (supabase as any)
      .from('student_profiles')
      .select('*')
      .eq('profile_id', l.student_id)
      .maybeSingle();

    const sDate = new Date(l.start_date);
    const eDate = new Date(l.end_date);
    const diffTime = Math.abs(eDate.getTime() - sDate.getTime());
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    const statusFormatted = (l.status.charAt(0).toUpperCase() + l.status.slice(1).toLowerCase()) as any;

    return {
      id: l.reference_id || l.id,
      dbId: l.id,
      requesterId: l.student_id,
      requesterName: l.student?.full_name || 'Student',
      requesterUsnOrEmpId: l.student?.usn_or_employee_id || 'N/A',
      requesterRole: 'STUDENT',
      requesterEmail: l.student?.email || 'N/A',
      departmentId: l.department_id,
      departmentName: l.student?.department?.name || 'Department not assigned',
      leaveType: l.leave_type as any,
      startDate: l.start_date,
      endDate: l.end_date,
      days: isNaN(days) ? 1 : days,
      reason: l.reason,
      status: statusFormatted,
      submittedAt: new Date(l.created_at).toLocaleDateString(),
      reviewedBy: l.reviewed_by ? (l.reviewer?.full_name || 'HOD') : undefined,
      reviewerName: l.reviewer?.full_name || undefined,
      remark: l.rejection_reason || undefined,
      semester: studentProf?.semester != null ? studentProf.semester : null,
      cgpa: studentProf?.cgpa != null ? studentProf.cgpa : null
    };
  } catch (err: any) {
    console.error("Failed to load leave request detail:", err);
    throw err;
  }
};

export const submitLeaveRequest = async (payload: {
  leaveType: string;
  reason: string;
  startDate: string;
  endDate: string;
}): Promise<LeaveRequest> => {
  const { data: { user } } = await (supabase as any).auth.getUser();
  if (!user) throw new Error("Authenticated session required.");

  // Resolve student profile and department_id
  const { data: studentProfile, error: profErr } = await (supabase as any)
    .from('profiles')
    .select('id, full_name, department_id')
    .eq('id', user.id)
    .single();

  if (profErr || !studentProfile?.department_id) {
    throw new Error("No department is assigned to your profile. Please contact administration.");
  }

  // Find active HOD for the same department via RPC
  let hodProfile: { id: string; full_name: string } | null = null;

  const { data: rpcData, error: rpcError } = await (supabase.rpc as any)('get_department_hod', {
    p_department_id: studentProfile.department_id
  });

  if (rpcError) {
    console.error("RPC get_department_hod error:", rpcError);
  }

  if (rpcData && rpcData.length > 0) {
    hodProfile = rpcData[0];
  } else {
    // Direct query fallback
    const { data: directHod, error: directErr } = await (supabase as any)
      .from('profiles')
      .select('id, full_name')
      .eq('role', 'HOD')
      .eq('department_id', studentProfile.department_id)
      .eq('account_status', 'ACTIVE')
      .limit(1)
      .maybeSingle();

    if (directErr) {
      console.error("Error finding department HOD:", directErr);
    }
    if (directHod) {
      hodProfile = directHod;
    }
  }

  if (!hodProfile) {
    throw new Error("No active HOD is assigned to your department. Please contact the administration.");
  }

  // Insert leave request
  const { data, error } = await (supabase as any)
    .from('leave_requests')
    .insert({
      student_id: user.id,
      department_id: studentProfile.department_id,
      hod_id: hodProfile.id,
      leave_type: payload.leaveType,
      reason: payload.reason,
      start_date: payload.startDate,
      end_date: payload.endDate,
      status: 'PENDING'
    })
    .select('*, profiles!student_id(full_name, usn_or_employee_id)')
    .single();

  if (error || !data) {
    console.error("Leave request insert error:", error);
    throw new Error(error?.message || "Failed to submit leave request.");
  }

  // Notify assigned HOD
  await (supabase as any).from('notifications').insert({
    user_id: hodProfile.id,
    title: 'New Leave Request Received',
    short_message: `New leave request submitted by ${studentProfile.full_name || 'Student'} (${data.reference_id})`,
    full_message: `${studentProfile.full_name} submitted a ${payload.leaveType} from ${payload.startDate} to ${payload.endDate}.`,
    source: 'Student Portal',
    category: 'Leave',
    type: 'Request'
  });

  // Notify the student that their leave was submitted
  await (supabase as any).from('notifications').insert({
    user_id: user.id,
    title: 'Leave Request Submitted',
    short_message: `Your ${payload.leaveType} request (${data.reference_id}) from ${payload.startDate} to ${payload.endDate} has been submitted and is pending HOD review.`,
    full_message: `Your leave request has been submitted successfully.\n\nLeave Type: ${payload.leaveType}\nDates: ${payload.startDate} to ${payload.endDate}\nReason: ${payload.reason}\nStatus: PENDING\n\nYour department HOD will review this request.`,
    source: 'Student Portal',
    category: 'Leave',
    type: 'Request',
    related_link: '/student/leave-requests'
  });

  const sDate = new Date(data.start_date);
  const eDate = new Date(data.end_date);
  const diffTime = Math.abs(eDate.getTime() - sDate.getTime());
  const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

  return {
    id: data.reference_id,
    dbId: data.id,
    requesterId: data.student_id,
    requesterName: studentProfile.full_name || 'Student',
    requesterUsnOrEmpId: data.profiles?.usn_or_employee_id || 'N/A',
    requesterRole: 'STUDENT',
    departmentId: data.department_id,
    leaveType: data.leave_type as any,
    startDate: data.start_date,
    endDate: data.end_date,
    days: isNaN(days) ? 1 : days,
    reason: data.reason,
    status: 'Pending',
    submittedAt: new Date(data.created_at).toLocaleDateString()
  };
};

export const approveLeaveRequest = async (referenceOrId: string, reviewedBy?: string, remark?: string): Promise<boolean> => {
  const { data: { user } } = await (supabase as any).auth.getUser();
  if (!user) throw new Error("Authenticated session required.");

  // Resolve leave request target UUID
  const { data: leaveReq, error: fetchErr } = await (supabase as any)
    .from('leave_requests')
    .select('id, reference_id, student_id, leave_type, department_id, status')
    .or(`id.eq.${referenceOrId},reference_id.eq.${referenceOrId}`)
    .single();

  if (fetchErr || !leaveReq) throw new Error("Leave request record not found.");

  // Security check: caller must be HOD of the target department
  const { data: callerProfile } = await (supabase as any)
    .from('profiles')
    .select('role, department_id')
    .eq('id', user.id)
    .single();

  if (!callerProfile || (callerProfile.role === 'HOD' && callerProfile.department_id !== leaveReq.department_id)) {
    throw new Error("ACCESS DENIED: You are only authorized to review leave requests for your own department.");
  }

  if (leaveReq.status !== 'PENDING') {
    throw new Error(`This leave request is already ${leaveReq.status.toLowerCase()} and cannot be modified.`);
  }

  // 1. Primary: Use SECURITY DEFINER RPC function review_leave_request
  const { data: rpcData, error: rpcErr } = await (supabase.rpc as any)('review_leave_request', {
    p_leave_id: leaveReq.id,
    p_status: 'APPROVED',
    p_rejection_reason: null
  });

  if (rpcErr) {
    console.warn("RPC review_leave_request error, using direct query fallback:", rpcErr);

    const { error: directErr } = await (supabase as any)
      .from('leave_requests')
      .update({
        status: 'APPROVED',
        reviewed_by: user.id,
        reviewed_at: new Date().toISOString()
      })
      .eq('id', leaveReq.id);

    if (directErr) {
      console.error("Direct update approval failed:", directErr);
      throw new Error(directErr.message);
    }

    // Direct notification fallback
    await (supabase as any).from('notifications').insert({
      user_id: leaveReq.student_id,
      title: `Leave Request ${leaveReq.reference_id || ''} Approved`,
      short_message: `Your ${leaveReq.leave_type} request ${leaveReq.reference_id || ''} has been approved by your HOD.`,
      source: 'HOD Portal',
      category: 'Leave',
      type: 'Approval',
      related_link: '/student/leave-requests'
    });
  }

  return true;
};

export const rejectLeaveRequest = async (referenceOrId: string, reviewedBy?: string, remark?: string): Promise<boolean> => {
  const { data: { user } } = await (supabase as any).auth.getUser();
  if (!user) throw new Error("Authenticated session required.");

  const cleanRemark = remark?.trim();
  if (!cleanRemark) {
    throw new Error("Rejection reason is required when rejecting a leave request.");
  }

  // Resolve leave request target UUID
  const { data: leaveReq, error: fetchErr } = await (supabase as any)
    .from('leave_requests')
    .select('id, reference_id, student_id, leave_type, department_id, status')
    .or(`id.eq.${referenceOrId},reference_id.eq.${referenceOrId}`)
    .single();

  if (fetchErr || !leaveReq) throw new Error("Leave request record not found.");

  // Security check: caller must be HOD of target department
  const { data: callerProfile } = await (supabase as any)
    .from('profiles')
    .select('role, department_id')
    .eq('id', user.id)
    .single();

  if (!callerProfile || (callerProfile.role === 'HOD' && callerProfile.department_id !== leaveReq.department_id)) {
    throw new Error("ACCESS DENIED: You are only authorized to review leave requests for your own department.");
  }

  if (leaveReq.status !== 'PENDING') {
    throw new Error(`This leave request is already ${leaveReq.status.toLowerCase()} and cannot be modified.`);
  }

  // 1. Primary: Use SECURITY DEFINER RPC function review_leave_request
  const { data: rpcData, error: rpcErr } = await (supabase.rpc as any)('review_leave_request', {
    p_leave_id: leaveReq.id,
    p_status: 'REJECTED',
    p_rejection_reason: cleanRemark
  });

  if (rpcErr) {
    console.warn("RPC review_leave_request error, using direct query fallback:", rpcErr);

    const { error: directErr } = await (supabase as any)
      .from('leave_requests')
      .update({
        status: 'REJECTED',
        reviewed_by: user.id,
        reviewed_at: new Date().toISOString(),
        rejection_reason: cleanRemark
      })
      .eq('id', leaveReq.id);

    if (directErr) {
      console.error("Direct update rejection failed:", directErr);
      throw new Error(directErr.message);
    }

    // Direct notification fallback
    await (supabase as any).from('notifications').insert({
      user_id: leaveReq.student_id,
      title: `Leave Request ${leaveReq.reference_id || ''} Rejected`,
      short_message: `Your ${leaveReq.leave_type} request ${leaveReq.reference_id || ''} was rejected by your HOD. Reason: ${cleanRemark}`,
      source: 'HOD Portal',
      category: 'Leave',
      type: 'Rejection',
      related_link: '/student/leave-requests'
    });
  }

  return true;
};
