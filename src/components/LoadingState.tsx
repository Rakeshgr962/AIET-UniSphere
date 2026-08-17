import React from 'react';

interface LoadingStateProps {
  message?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ 
  message = "Loading information..." 
}) => {
  return (
    <div className="state-container" style={{ padding: '6rem 2rem' }}>
      <div 
        className="spinner" 
        style={{ 
          width: '32px', 
          height: '32px', 
          borderWidth: '3px',
          borderColor: 'rgba(156, 163, 175, 0.2)',
          borderTopColor: 'var(--brand-orange)'
        }}
      ></div>
      <p style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--brand-dark-grey)' }}>
        {message}
      </p>
    </div>
  );
};
