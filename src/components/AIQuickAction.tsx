import React from 'react';
import { BookOpen, FileText, HelpCircle, Award } from 'lucide-react';
import type { QuickActionItem } from '../data/aiConversations';

interface AIQuickActionProps {
  quickActions: QuickActionItem[];
  onSelectAction: (prompt: string) => void;
}

export const AIQuickAction: React.FC<AIQuickActionProps> = ({ quickActions, onSelectAction }) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'BookOpen':
        return <BookOpen size={16} className="text-orange" />;
      case 'FileText':
        return <FileText size={16} className="text-blue" />;
      case 'HelpCircle':
        return <HelpCircle size={16} className="text-orange" />;
      case 'Award':
      default:
        return <Award size={16} className="text-blue" />;
    }
  };

  return (
    <div className="ai-quick-actions-section">
      <h4 className="ai-quick-actions-title font-display">Quick Actions</h4>
      <div className="ai-quick-actions-grid">
        {quickActions.map((qa) => (
          <button
            key={qa.id}
            className="ai-quick-action-card"
            onClick={() => onSelectAction(qa.prompt)}
          >
            <div className="qa-icon-wrapper">
              {getIcon(qa.iconName)}
            </div>
            <div className="qa-content">
              <span className="qa-label">{qa.label}</span>
              <p className="qa-prompt-preview">{qa.prompt}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
