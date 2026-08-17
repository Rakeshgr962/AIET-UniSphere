import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = "Failed to load information",
  message,
  onRetry
}) => {
  return (
    <div className="state-container" style={{ borderColor: 'rgba(239, 68, 68, 0.2)', backgroundColor: '#fff8f8' }}>
      <AlertTriangle size={48} className="file-uploader-icon" style={{ color: 'var(--color-error)' }} />
      <div>
        <h3 className="state-title" style={{ color: 'var(--brand-black)', marginBottom: '0.25rem' }}>{title}</h3>
        <p style={{ fontSize: '0.875rem', color: 'var(--brand-dark-grey)' }}>{message}</p>
      </div>
      {onRetry && (
        <button 
          onClick={onRetry} 
          className="btn btn-primary" 
          style={{ width: 'auto', padding: '0.5rem 1.5rem', backgroundColor: 'var(--brand-blue)' }}
        >
          Try Again
        </button>
      )}
    </div>
  );
};
