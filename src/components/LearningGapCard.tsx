import React from 'react';
import { AlertCircle, AlertTriangle, CheckCircle2, TrendingUp, BookOpen, ArrowRight } from 'lucide-react';
import type { TopicGapItem } from '../data/learningGaps';
import { ProgressBar } from './ProgressBar';

interface LearningGapCardProps {
  gap: TopicGapItem;
  onOpenDetail: (gap: TopicGapItem) => void;
}

export const LearningGapCard: React.FC<LearningGapCardProps> = ({ gap, onOpenDetail }) => {
  const getStatusBadge = (status: TopicGapItem['status']) => {
    switch (status) {
      case 'Needs Practice':
        return (
          <span className="badge badge-overdue font-mono" style={{ gap: '0.2rem' }}>
            <AlertCircle size={13} />
            <span>Needs Practice</span>
          </span>
        );
      case 'Needs Review':
        return (
          <span className="badge badge-pending font-mono" style={{ gap: '0.2rem' }}>
            <AlertTriangle size={13} />
            <span>Needs Review</span>
          </span>
        );
      case 'Moderate':
        return (
          <span className="badge badge-secondary font-mono" style={{ gap: '0.2rem' }}>
            <TrendingUp size={13} />
            <span>Moderate</span>
          </span>
        );
      case 'Strong':
      default:
        return (
          <span className="badge badge-active font-mono" style={{ gap: '0.2rem' }}>
            <CheckCircle2 size={13} />
            <span>Strong</span>
          </span>
        );
    }
  };

  return (
    <div className="learning-gap-item-card">
      <div className="gap-card-top-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          {getStatusBadge(gap.status)}
          <span className="font-mono text-dark-grey" style={{ fontSize: '0.75rem' }}>
            {gap.courseCode} — {gap.courseName}
          </span>
        </div>

        <span className="font-mono font-bold" style={{ fontSize: '0.85rem', color: 'var(--brand-black)' }}>
          {gap.performancePercent}% avg
        </span>
      </div>

      <h3 className="gap-topic-title">{gap.topicName}</h3>
      
      <div className="gap-progress-wrapper" style={{ margin: '0.5rem 0' }}>
        <ProgressBar progress={gap.performancePercent} showPercentage={false} />
      </div>

      <p className="gap-suggested-focus font-sans">
        <strong>Suggested Focus:</strong> {gap.suggestedFocus}
      </p>

      <div className="gap-card-footer">
        <span className="gap-materials-count font-mono">
          <BookOpen size={13} style={{ display: 'inline', marginRight: '0.25rem' }} />
          {gap.materials.length} material{gap.materials.length > 1 ? 's' : ''} available
        </span>

        <button 
          className="btn btn-secondary" 
          style={{ width: 'auto', padding: '0.4rem 0.75rem', fontSize: '0.8rem' }}
          onClick={() => onOpenDetail(gap)}
        >
          <span>View Topic Details</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};
