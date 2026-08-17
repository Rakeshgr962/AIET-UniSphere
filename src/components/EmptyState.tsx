import React from 'react';
import { Inbox } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No information found",
  message,
  actionLabel,
  onAction
}) => {
  return (
    <div className="state-container">
      <Inbox size={48} className="file-uploader-icon" style={{ opacity: 0.5 }} />
      <div>
        <h3 className="state-title" style={{ marginBottom: '0.25rem' }}>{title}</h3>
        <p style={{ fontSize: '0.875rem' }}>{message}</p>
      </div>
      {actionLabel && onAction && (
        <button 
          onClick={onAction} 
          className="btn btn-secondary" 
          style={{ width: 'auto', padding: '0.5rem 1.25rem' }}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};
