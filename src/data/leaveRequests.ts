export interface LeaveRequest {
  id: string;
  requesterId: string;
  requesterName: string;
  requesterUsnOrEmpId: string;
  requesterRole: 'STUDENT' | 'FACULTY';
  departmentId: string;
  leaveType: 'Duty Leave' | 'Medical Leave' | 'Casual Leave' | 'Academic Leave';
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  submittedAt: string;
  reviewedBy?: string;
  remark?: string;
  supportingDocument?: string;
}

export const mockLeaveRequests: LeaveRequest[] = [
  {
    id: "LV-089",
    requesterId: "std-1",
    requesterName: "Jane Doe",
    requesterUsnOrEmpId: "1AB20CS002",
    requesterRole: "STUDENT",
    departmentId: "dept-ds",
    leaveType: "Duty Leave",
    startDate: "2026-08-14",
    endDate: "2026-08-16",
    days: 3,
    reason: "Participation in AIET Campus Tech Fest hackathon final round.",
    status: "Approved",
    submittedAt: "2026-08-12 10:30 AM",
    reviewedBy: "Dr. Sneha Reddy",
    remark: "Approved for college tech event participation."
  },
  {
    id: "LV-092",
    requesterId: "std-3",
    requesterName: "Ananya Rao",
    requesterUsnOrEmpId: "4AI21DS008",
    requesterRole: "STUDENT",
    departmentId: "dept-ds",
    leaveType: "Medical Leave",
    startDate: "2026-08-18",
    endDate: "2026-08-20",
    days: 3,
    reason: "Severe viral fever and doctor prescribed bed rest.",
    status: "Pending",
    submittedAt: "2026-08-16 04:15 PM",
    supportingDocument: "Medical_Certificate_Ananya.pdf"
  },
  {
    id: "LV-095",
    requesterId: "fac-103",
    requesterName: "Prof. Sunita Sharma",
    requesterUsnOrEmpId: "EMP-DS-03",
    requesterRole: "FACULTY",
    departmentId: "dept-ds",
    leaveType: "Academic Leave",
    startDate: "2026-08-22",
    endDate: "2026-08-24",
    days: 3,
    reason: "Attending International IEEE Conference on Data Science in Bengaluru.",
    status: "Pending",
    submittedAt: "2026-08-15 11:00 AM",
    supportingDocument: "IEEE_Conference_Invitation.pdf"
  },
  {
    id: "LV-054",
    requesterId: "std-4",
    requesterName: "Kiran Kumar",
    requesterUsnOrEmpId: "4AI21DS014",
    requesterRole: "STUDENT",
    departmentId: "dept-ds",
    leaveType: "Medical Leave",
    startDate: "2026-07-02",
    endDate: "2026-07-04",
    days: 3,
    reason: "Viral Fever & Doctor Advice",
    status: "Approved",
    submittedAt: "2026-07-01 09:00 AM",
    reviewedBy: "Dr. Sneha Reddy",
    remark: "Verified medical documents."
  },
  {
    id: "LV-077",
    requesterId: "std-5",
    requesterName: "Vikram Shetty",
    requesterUsnOrEmpId: "4AI21DS022",
    requesterRole: "STUDENT",
    departmentId: "dept-ds",
    leaveType: "Casual Leave",
    startDate: "2026-08-05",
    endDate: "2026-08-06",
    days: 2,
    reason: "Personal family emergency out of station.",
    status: "Rejected",
    submittedAt: "2026-08-04 02:20 PM",
    reviewedBy: "Dr. Sneha Reddy",
    remark: "Insufficient attendance percentage to grant casual leave."
  }
];
