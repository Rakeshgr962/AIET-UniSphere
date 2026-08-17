import type { StudentSkillProfile } from '../data/skills';
import { mockSkillPassport } from '../data/skills';
import type { AchievementItem } from '../data/achievements';
import { mockAchievements } from '../data/achievements';

export const getSkillPassport = async (): Promise<StudentSkillProfile> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ ...mockSkillPassport });
    }, 100);
  });
};

export const getAchievements = async (categoryFilter: string = 'All'): Promise<AchievementItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (categoryFilter === 'All') {
        resolve([...mockAchievements]);
      } else {
        const filtered = mockAchievements.filter(a => a.category.toLowerCase() === categoryFilter.toLowerCase());
        resolve(filtered);
      }
    }, 100);
  });
};
