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

export const mockServiceRequests: ServiceRequestItem[] = [];
