import React from 'react';
import { User, Sparkles } from 'lucide-react';
import type { AIMessageItem } from '../data/aiConversations';

interface AIMessageProps {
  message: AIMessageItem;
}

export const AIMessage: React.FC<AIMessageProps> = ({ message }) => {
  const isAI = message.sender === 'ai';

  return (
    <div className={`ai-message-row ${isAI ? 'ai-sender' : 'user-sender'}`}>
      <div className={`ai-avatar-circle ${isAI ? 'ai-icon-bg' : 'user-icon-bg'}`}>
        {isAI ? <Sparkles size={16} className="text-orange" /> : <User size={16} className="text-navy" />}
      </div>

      <div className="ai-message-bubble-wrapper">
        <div className="ai-message-header">
          <span className="ai-sender-name font-display">{isAI ? 'AIET-UniSphere AI' : 'You'}</span>
          <span className="ai-message-time font-mono">{message.timestamp}</span>
        </div>

        <div className="ai-message-body">
          {message.text.split('\n').map((line, idx) => {
            if (line.startsWith('• ') || line.startsWith('- ')) {
              return (
                <li key={idx} style={{ marginLeft: '1rem', marginTop: '0.2rem' }}>
                  {line.substring(2)}
                </li>
              );
            }
            if (line.trim().length === 0) {
              return <div key={idx} style={{ height: '0.5rem' }} />;
            }
            return <p key={idx} style={{ margin: '0.2rem 0' }}>{line}</p>;
          })}
        </div>
      </div>
    </div>
  );
};
