import { mockLeaveRequests } from '../data/leaveRequests';
import type { LeaveRequest } from '../data/leaveRequests';

let leaveStore: LeaveRequest[] = [...mockLeaveRequests];

export const getAllLeaveRequests = async (): Promise<LeaveRequest[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...leaveStore]);
    }, 120);
  });
};

export const getLeaveRequestById = async (id: string): Promise<LeaveRequest | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const item = leaveStore.find(l => l.id.toLowerCase() === id.toLowerCase()) || null;
      resolve(item);
    }, 120);
  });
};

export const getDepartmentLeaveRequests = async (departmentId: string): Promise<LeaveRequest[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(leaveStore.filter(l => l.departmentId === departmentId || departmentId === 'dept-ds'));
    }, 120);
  });
};

export const approveLeaveRequest = async (id: string, reviewedBy: string, remark?: string): Promise<LeaveRequest | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const idx = leaveStore.findIndex(l => l.id.toLowerCase() === id.toLowerCase());
      if (idx !== -1) {
        leaveStore[idx] = {
          ...leaveStore[idx],
          status: 'Approved',
          reviewedBy,
          remark: remark || 'Approved by HOD'
        };
        resolve(leaveStore[idx]);
      } else {
        resolve(null);
      }
    }, 150);
  });
};

export const rejectLeaveRequest = async (id: string, reviewedBy: string, remark?: string): Promise<LeaveRequest | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const idx = leaveStore.findIndex(l => l.id.toLowerCase() === id.toLowerCase());
      if (idx !== -1) {
        leaveStore[idx] = {
          ...leaveStore[idx],
          status: 'Rejected',
          reviewedBy,
          remark: remark || 'Rejected by HOD'
        };
        resolve(leaveStore[idx]);
      } else {
        resolve(null);
      }
    }, 150);
  });
};

export const submitLeaveRequest = async (data: Omit<LeaveRequest, 'id' | 'status' | 'submittedAt'>): Promise<LeaveRequest> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newReq: LeaveRequest = {
        ...data,
        id: `LV-${Math.floor(100 + Math.random() * 900)}`,
        status: 'Pending',
        submittedAt: new Date().toLocaleString()
      };
      leaveStore.unshift(newReq);
      resolve(newReq);
    }, 150);
  });
};
