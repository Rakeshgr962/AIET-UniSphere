import React from 'react';
import { X, BookOpen, ExternalLink, CheckSquare, TrendingUp, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { TopicGapItem } from '../data/learningGaps';
import { ProgressBar } from './ProgressBar';

interface TopicDetailModalProps {
  topic: TopicGapItem | null;
  onClose: () => void;
}

export const TopicDetailModal: React.FC<TopicDetailModalProps> = ({ topic, onClose }) => {
  const navigate = useNavigate();

  if (!topic) return null;

  const handleAskAI = () => {
    onClose();
    navigate(`/student/ai?prompt=Explain%20${encodeURIComponent(topic.topicName)}`);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" style={{ maxWidth: '650px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="badge badge-secondary font-mono">{topic.courseCode}</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--brand-dark-grey)' }}>{topic.courseName}</span>
            </div>
            <h2 className="modal-title font-display" style={{ marginTop: '0.25rem' }}>{topic.topicName}</h2>
          </div>

          <button className="modal-close-btn" onClick={onClose} title="Close">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {/* Performance Overview */}
          <div className="topic-perf-overview-box">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
              <span className="font-mono text-dark-grey" style={{ fontSize: '0.85rem' }}>Current Topic Mastery:</span>
              <span className="font-mono font-bold" style={{ fontSize: '0.9rem' }}>{topic.performancePercent}%</span>
            </div>
            <ProgressBar progress={topic.performancePercent} />

            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.75rem', fontSize: '0.825rem' }}>
              <div>
                <span className="text-dark-grey font-mono">Recent Trend: </span>
                <span className="font-bold text-orange">{topic.recentTrend}</span>
              </div>
              <div>
                <span className="text-dark-grey font-mono">Status: </span>
                <span className="font-bold">{topic.status}</span>
              </div>
            </div>
          </div>

          {/* Suggested Focus */}
          <div style={{ marginTop: '1rem' }}>
            <h4 className="section-title font-display" style={{ fontSize: '0.95rem' }}>Suggested Focus Area</h4>
            <p className="font-sans" style={{ fontSize: '0.875rem', color: 'var(--brand-dark-grey)', marginTop: '0.25rem' }}>
              {topic.suggestedFocus}
            </p>
          </div>

          {/* Recommended Actions */}
          <div style={{ marginTop: '1rem' }}>
            <h4 className="section-title font-display" style={{ fontSize: '0.95rem' }}>Recommended Practice Actions</h4>
            <ul style={{ listStyleType: 'none', padding: 0, marginTop: '0.35rem' }}>
              {topic.recommendedActions.map((act, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', marginBottom: '0.35rem', color: 'var(--brand-black)' }}>
                  <CheckSquare size={15} className="text-orange" />
                  <span>{act}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Related Learning Materials */}
          <div style={{ marginTop: '1.25rem' }}>
            <h4 className="section-title font-display" style={{ fontSize: '0.95rem' }}>Related Study Materials</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
              {topic.materials.map((mat) => (
                <div key={mat.id} className="material-item-row">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <BookOpen size={16} className="text-blue" />
                    <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>{mat.title}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className="badge badge-secondary font-mono" style={{ fontSize: '0.7rem' }}>{mat.type}</span>
                    <span className="font-mono text-dark-grey" style={{ fontSize: '0.75rem' }}>{mat.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="modal-footer" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button className="btn btn-secondary" onClick={handleAskAI}>
            <HelpCircle size={16} />
            <span>Ask AI Assistant about this topic</span>
          </button>
          
          <button className="btn btn-primary" onClick={onClose}>
            <span>Done</span>
          </button>
        </div>
      </div>
    </div>
  );
};
