import { mockAuditLogs } from '../admin/data/auditLogs';
import type { AuditLogEvent } from '../shared/types/audit';

let auditLogsStore: AuditLogEvent[] = [...mockAuditLogs];

export const getAuditLogs = async (): Promise<AuditLogEvent[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...auditLogsStore]);
    }, 100);
  });
};

export const addAuditLog = (event: Omit<AuditLogEvent, 'id'>): AuditLogEvent => {
  const newLog: AuditLogEvent = {
    ...event,
    id: `aud-${Math.floor(100 + Math.random() * 900)}`
  };
  auditLogsStore.unshift(newLog);
  return newLog;
};
