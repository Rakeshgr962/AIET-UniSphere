import { mockAnnouncements } from '../data/announcements';
import type { Announcement } from '../data/announcements';

let announcementStore: Announcement[] = [...mockAnnouncements];

export const getDepartmentAnnouncements = async (departmentId: string = 'dept-ds'): Promise<Announcement[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...announcementStore]);
    }, 120);
  });
};

export const getAnnouncementById = async (id: string): Promise<Announcement | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(announcementStore.find(a => a.id.toLowerCase() === id.toLowerCase()) || null);
    }, 120);
  });
};

export const createDepartmentAnnouncement = async (data: Omit<Announcement, 'id' | 'publishedAt'>): Promise<Announcement> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newAnc: Announcement = {
        ...data,
        id: `anc-${Math.floor(200 + Math.random() * 800)}`,
        publishedAt: new Date().toLocaleString()
      };
      announcementStore.unshift(newAnc);
      resolve(newAnc);
    }, 150);
  });
};

export const publishAnnouncement = async (id: string): Promise<Announcement | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const idx = announcementStore.findIndex(a => a.id === id);
      if (idx !== -1) {
        announcementStore[idx] = {
          ...announcementStore[idx],
          status: 'Published',
          publishedAt: new Date().toLocaleString()
        };
        resolve(announcementStore[idx]);
      } else {
        resolve(null);
      }
    }, 150);
  });
};

export const deleteAnnouncement = async (id: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const initLen = announcementStore.length;
      announcementStore = announcementStore.filter(a => a.id !== id);
      resolve(announcementStore.length < initLen);
    }, 150);
  });
};
