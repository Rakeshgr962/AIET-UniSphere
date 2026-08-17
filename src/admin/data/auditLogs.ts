import type { AuditLogEvent } from '../../shared/types/audit';

export const mockAuditLogs: AuditLogEvent[] = [
  {
    id: "aud-101",
    actorUserId: "ADM-001",
    actorName: "System Administrator",
    action: "USER_CREATED",
    targetUserId: "4AI21CS012",
    targetUserName: "Student Four",
    timestamp: "2026-08-16 04:30 PM",
    metadata: "Role: STUDENT, Dept: Computer Science & Engineering, Sem: 4, Sec: A",
    status: "Success"
  },
  {
    id: "aud-102",
    actorUserId: "ADM-001",
    actorName: "System Administrator",
    action: "SECTION_CHANGED",
    targetUserId: "4AI21DS045",
    targetUserName: "Student Three",
    timestamp: "2026-08-15 02:15 PM",
    metadata: "Reassigned Section A → Section B",
    status: "Success"
  },
  {
    id: "aud-103",
    actorUserId: "ADM-001",
    actorName: "System Administrator",
    action: "ACCOUNT_LOCKED",
    targetUserId: "EMP-DS-08",
    targetUserName: "Prof. Vikramaditya Sen",
    timestamp: "2026-08-14 11:25 AM",
    metadata: "Automatic lock triggered after 4 failed password attempts",
    status: "Success"
  },
  {
    id: "aud-104",
    actorUserId: "ADM-001",
    actorName: "System Administrator",
    action: "ACCOUNT_DEACTIVATED",
    targetUserId: "4AI21DS045",
    targetUserName: "Student Three",
    timestamp: "2026-08-01 10:20 AM",
    metadata: "Account deactivated upon administrative request",
    status: "Success"
  },
  {
    id: "aud-105",
    actorUserId: "ADM-001",
    actorName: "System Administrator",
    action: "PASSWORD_RESET_REQUESTED",
    targetUserId: "1AB20CS002",
    targetUserName: "Jane Doe",
    timestamp: "2026-07-28 09:10 AM",
    metadata: "Initiated administrative password reset email link",
    status: "Success"
  }
];
