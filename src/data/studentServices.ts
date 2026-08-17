export interface ServiceTypeItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  estimatedTime: string;
  requiredDocs: boolean;
  category: 'Certificates' | 'Academic' | 'Grievance' | 'General';
}

export interface ServiceTimelineStep {
  step: string;
  status: 'completed' | 'current' | 'upcoming';
  date?: string;
  note?: string;
}

export interface ServiceRequestItem {
  id: string;
  requestType: string;
  serviceTypeId: string;
  subject: string;
  description: string;
  submittedDate: string;
  lastUpdatedDate: string;
  status: 'Pending' | 'In Review' | 'Approved' | 'Rejected' | 'Resolved';
  timeline: ServiceTimelineStep[];
  attachmentName?: string;
  remarks?: string;
}

export interface CreateServiceRequestPayload {
  serviceTypeId: string;
  requestType: string;
  subject: string;
  description: string;
  attachmentName?: string;
}

export const mockServiceTypes: ServiceTypeItem[] = [
  {
    id: 'srv-1',
    title: 'Bonafide Certificate',
    description: 'Request an official bonafide student status certificate for bank loans, passport, or internship applications.',
    iconName: 'FileCheck',
    estimatedTime: '1 - 2 Working Days',
    requiredDocs: false,
    category: 'Certificates'
  },
  {
    id: 'srv-2',
    title: 'Certificate Request',
    description: 'Request supported academic certificates including conduct certificates, medium of instruction, or backlog statements.',
    iconName: 'Award',
    estimatedTime: '2 - 3 Working Days',
    requiredDocs: true,
    category: 'Certificates'
  },
  {
    id: 'srv-3',
    title: 'Grievance Submission',
    description: 'Submit an academic, examination, or institutional concern directly to the student welfare office.',
    iconName: 'ShieldAlert',
    estimatedTime: '3 - 5 Working Days',
    requiredDocs: true,
    category: 'Grievance'
  },
  {
    id: 'srv-4',
    title: 'Feedback Submission',
    description: 'Share construct feedback or suggestions about courses, lab facilities, or college services.',
    iconName: 'MessageSquare',
    estimatedTime: 'Reviewed Weekly',
    requiredDocs: false,
    category: 'General'
  },
  {
    id: 'srv-5',
    title: 'Help & Technical Support',
    description: 'Get assistance with platform login, timetable clashes, attendance discrepancy, or portal technical issues.',
    iconName: 'HelpCircle',
    estimatedTime: '24 Hours',
    requiredDocs: false,
    category: 'General'
  }
];

export const mockServiceRequests: ServiceRequestItem[] = [
  {
    id: 'REQ-2026-0891',
    serviceTypeId: 'srv-1',
    requestType: 'Bonafide Certificate',
    subject: 'Bonafide Certificate for Passport Renewal Application',
    description: 'I need an official Bonafide Certificate issued for my passport renewal application at the Regional Passport Office.',
    submittedDate: '15 Aug 2026',
    lastUpdatedDate: '16 Aug 2026',
    status: 'In Review',
    attachmentName: 'fee_receipt_sem6.pdf',
    remarks: 'Application verified by HOD CSE office. Pending Registrar signature.',
    timeline: [
      { step: 'Submitted', status: 'completed', date: '15 Aug 2026', note: 'Request submitted online.' },
      { step: 'Under Review', status: 'current', date: '16 Aug 2026', note: 'Document verified by Student Section.' },
      { step: 'Action Taken', status: 'upcoming', note: 'Certificate generated & signed.' },
      { step: 'Completed', status: 'upcoming', note: 'Ready for digital download / collection.' }
    ]
  },
  {
    id: 'REQ-2026-0742',
    serviceTypeId: 'srv-2',
    requestType: 'Certificate Request',
    subject: 'Medium of Instruction Certificate (English)',
    description: 'Requesting English Medium of Instruction certificate for higher studies application.',
    submittedDate: '02 Aug 2026',
    lastUpdatedDate: '04 Aug 2026',
    status: 'Approved',
    attachmentName: 'grade_card_sem5.pdf',
    remarks: 'Certificate generated successfully. Available for instant download.',
    timeline: [
      { step: 'Submitted', status: 'completed', date: '02 Aug 2026', note: 'Request submitted.' },
      { step: 'Under Review', status: 'completed', date: '03 Aug 2026', note: 'Verified by Academic Section.' },
      { step: 'Action Taken', status: 'completed', date: '04 Aug 2026', note: 'Digital signature applied.' },
      { step: 'Completed', status: 'completed', date: '04 Aug 2026', note: 'Approved and issued.' }
    ]
  },
  {
    id: 'REQ-2026-0610',
    serviceTypeId: 'srv-5',
    requestType: 'Help & Technical Support',
    subject: 'Attendance Discrepancy in CS603 Lab Session',
    description: 'Marked absent for CS603 Operating Systems Lab on 28 July despite submitting lab code.',
    submittedDate: '29 Jul 2026',
    lastUpdatedDate: '31 Jul 2026',
    status: 'Resolved',
    remarks: 'Attendance record updated from Absent to Present after faculty verification.',
    timeline: [
      { step: 'Submitted', status: 'completed', date: '29 Jul 2026' },
      { step: 'Under Review', status: 'completed', date: '30 Jul 2026' },
      { step: 'Action Taken', status: 'completed', date: '31 Jul 2026' },
      { step: 'Completed', status: 'completed', date: '31 Jul 2026' }
    ]
  }
];
