import type { ServiceTypeItem, ServiceRequestItem, CreateServiceRequestPayload } from '../data/studentServices';
import { mockServiceTypes, mockServiceRequests } from '../data/studentServices';
import { mockStudentProfile } from '../data/students';
import type { StudentProfile } from '../data/students';

let localRequests: ServiceRequestItem[] = [...mockServiceRequests];

export const getStudentProfile = async (): Promise<StudentProfile> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockStudentProfile);
    }, 100);
  });
};

export const getAvailableServices = async (): Promise<ServiceTypeItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockServiceTypes]);
    }, 100);
  });
};

export const getServiceRequests = async (): Promise<ServiceRequestItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...localRequests]);
    }, 100);
  });
};

export const getServiceRequestById = async (id: string): Promise<ServiceRequestItem | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const req = localRequests.find(r => r.id === id) || null;
      resolve(req);
    }, 100);
  });
};

export const createServiceRequest = async (payload: CreateServiceRequestPayload): Promise<ServiceRequestItem> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newId = `REQ-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const nowStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

      const newReq: ServiceRequestItem = {
        id: newId,
        serviceTypeId: payload.serviceTypeId,
        requestType: payload.requestType,
        subject: payload.subject,
        description: payload.description,
        submittedDate: nowStr,
        lastUpdatedDate: nowStr,
        status: 'Pending',
        attachmentName: payload.attachmentName || undefined,
        remarks: 'Request submitted successfully. Waiting for Student Section assignment.',
        timeline: [
          { step: 'Submitted', status: 'completed', date: nowStr, note: 'Online request submitted.' },
          { step: 'Under Review', status: 'current', note: 'Queued for Student Welfare Office review.' },
          { step: 'Action Taken', status: 'upcoming' },
          { step: 'Completed', status: 'upcoming' }
        ]
      };

      localRequests = [newReq, ...localRequests];
      resolve(newReq);
    }, 300);
  });
};
