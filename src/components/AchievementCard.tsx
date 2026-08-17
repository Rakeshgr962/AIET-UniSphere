import React from 'react';
import { Award, Trophy, Code, GitMerge, CalendarCheck, FolderCheck, ArrowRight } from 'lucide-react';
import type { AchievementItem } from '../data/achievements';

interface AchievementCardProps {
  achievement: AchievementItem;
  onOpenDetail: (achievement: AchievementItem) => void;
}

export const AchievementCard: React.FC<AchievementCardProps> = ({ achievement, onOpenDetail }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Trophy':
        return <Trophy size={20} className="text-orange" />;
      case 'Code':
        return <Code size={20} className="text-blue" />;
      case 'GitMerge':
        return <GitMerge size={20} className="text-orange" />;
      case 'CalendarCheck':
        return <CalendarCheck size={20} className="text-blue" />;
      case 'FolderCheck':
        return <FolderCheck size={20} className="text-orange" />;
      case 'Award':
      default:
        return <Award size={20} className="text-orange" />;
    }
  };

  return (
    <div className="achievement-card-item">
      <div className="achievement-top-row">
        <div className="achievement-icon-box">
          {getIcon(achievement.iconName)}
        </div>

        <span className="badge badge-active font-mono" style={{ fontSize: '0.7rem' }}>
          {achievement.category}
        </span>
      </div>

      <h3 className="achievement-title">{achievement.title}</h3>
      <p className="achievement-desc font-sans">{achievement.description}</p>

      <div className="achievement-footer font-mono">
        <span className="text-dark-grey" style={{ fontSize: '0.75rem' }}>{achievement.date}</span>

        <button 
          className="btn btn-secondary" 
          style={{ width: 'auto', padding: '0.35rem 0.65rem', fontSize: '0.75rem' }}
          onClick={() => onOpenDetail(achievement)}
        >
          <span>Details</span>
          <ArrowRight size={13} />
        </button>
      </div>
    </div>
  );
};
