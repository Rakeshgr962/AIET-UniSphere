import type { TopicGapItem } from '../data/learningGaps';
import { mockLearningGaps } from '../data/learningGaps';
import type { RecommendationItem } from '../data/recommendations';
import { mockRecommendations } from '../data/recommendations';

export const getLearningGaps = async (): Promise<TopicGapItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockLearningGaps]);
    }, 100);
  });
};

export const getTopicDetail = async (id: string): Promise<TopicGapItem | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const topic = mockLearningGaps.find(t => t.id === id) || null;
      resolve(topic);
    }, 100);
  });
};

export const getRecommendations = async (categoryFilter: string = 'All'): Promise<RecommendationItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (categoryFilter === 'All') {
        resolve([...mockRecommendations]);
      } else {
        const filtered = mockRecommendations.filter(r => r.category.toLowerCase() === categoryFilter.toLowerCase());
        resolve(filtered);
      }
    }, 100);
  });
};
