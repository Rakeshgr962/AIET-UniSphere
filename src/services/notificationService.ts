import type { NotificationItem } from '../data/notifications';
import { mockNotifications } from '../data/notifications';

let localNotifications: NotificationItem[] = [...mockNotifications];

export const getNotifications = async (): Promise<NotificationItem[]> => {
  // Simulate network delay for frontend feel
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...localNotifications]);
    }, 150);
  });
};

export const getUnreadNotificationsCount = async (): Promise<number> => {
  return new Promise((resolve) => {
    const unread = localNotifications.filter(n => !n.isRead).length;
    resolve(unread);
  });
};

export const markNotificationAsRead = async (id: string): Promise<NotificationItem[]> => {
  localNotifications = localNotifications.map(n => 
    n.id === id ? { ...n, isRead: true } : n
  );
  return getNotifications();
};

export const markAllNotificationsAsRead = async (): Promise<NotificationItem[]> => {
  localNotifications = localNotifications.map(n => ({ ...n, isRead: true }));
  return getNotifications();
};

export const deleteNotification = async (id: string): Promise<NotificationItem[]> => {
  localNotifications = localNotifications.filter(n => n.id !== id);
  return getNotifications();
};
