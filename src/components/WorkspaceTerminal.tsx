import React, { useState } from 'react';
import { Terminal, Play, RefreshCw } from 'lucide-react';

interface WorkspaceTerminalProps {
  onRunProject?: () => void;
}

export const WorkspaceTerminal: React.FC<WorkspaceTerminalProps> = ({ onRunProject }) => {
  const [activeTab, setActiveTab] = useState<'terminal' | 'output' | 'problems' | 'git' | 'reviews' | 'activity'>('terminal');
  
  const [logs, setLogs] = useState<string[]>([
    'AIET-UniSphere Developer Terminal v4.2 [Mock Environment]',
    'Type "help" or run standard commands like npm run dev, git status, etc.',
    '',
    '$ npm run dev',
    '> ai-campus-analytics@1.0.0 dev',
    '> vite --host 0.0.0.0 --port 5173',
    '',
    '  VITE v8.2.0  ready in 240 ms',
    '',
    '  ➜  Local:   http://localhost:5173/',
    '  ➜  Network: http://192.168.1.104:5173/',
    '  ➜  press h + enter to show help',
    '',
    '[AIET-UniSphere] Live WebSocket connected: telemetry feed active'
  ]);

  const [inputCmd, setInputCmd] = useState('');

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCmd.trim()) return;

    const cmd = inputCmd.trim();
    const newLogs = [...logs, `$ ${cmd}`];

    if (cmd === 'npm run dev' || cmd === 'npm start') {
      newLogs.push('> project started successfully on http://localhost:5173');
    } else if (cmd === 'npm test') {
      newLogs.push('PASS src/__tests__/App.test.tsx (0.42s)');
      newLogs.push('Test Suites: 1 passed, 1 total');
      newLogs.push('Tests:       5 passed, 5 total');
    } else if (cmd === 'git status') {
      newLogs.push('On branch main');
      newLogs.push('Your branch is up to date with "origin/main".');
      newLogs.push('nothing to commit, working tree clean');
    } else if (cmd === 'help') {
      newLogs.push('Available commands: npm run dev, npm test, git status, clear, help');
    } else if (cmd === 'clear') {
      setLogs([]);
      setInputCmd('');
      return;
    } else {
      newLogs.push(`command not found: ${cmd}. Try "npm run dev" or "help".`);
    }

    setLogs(newLogs);
    setInputCmd('');
  };

  return (
    <div className="workspace-bottom-terminal">
      {/* Bottom Panel Navigation */}
      <div className="terminal-header-tabs">
        <div style={{ display: 'flex', gap: '0.25rem' }}>
          <button 
            className={`terminal-tab-btn ${activeTab === 'terminal' ? 'active' : ''}`}
            onClick={() => setActiveTab('terminal')}
          >
            <Terminal size={14} /> Terminal
          </button>
          <button 
            className={`terminal-tab-btn ${activeTab === 'output' ? 'active' : ''}`}
            onClick={() => setActiveTab('output')}
          >
            Output
          </button>
          <button 
            className={`terminal-tab-btn ${activeTab === 'problems' ? 'active' : ''}`}
            onClick={() => setActiveTab('problems')}
          >
            Problems <span className="tab-badge-zero">0</span>
          </button>
          <button 
            className={`terminal-tab-btn ${activeTab === 'git' ? 'active' : ''}`}
            onClick={() => setActiveTab('git')}
          >
            Git
          </button>
          <button 
            className={`terminal-tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews
          </button>
          <button 
            className={`terminal-tab-btn ${activeTab === 'activity' ? 'active' : ''}`}
            onClick={() => setActiveTab('activity')}
          >
            Activity
          </button>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <button 
            className="terminal-action-btn"
            onClick={onRunProject}
            title="Run Project Dev Server"
          >
            <Play size={13} style={{ color: 'var(--color-success)' }} />
            Run
          </button>
          <button 
            className="terminal-action-btn"
            onClick={() => setLogs(['Terminal cleared.'])}
            title="Clear Console"
          >
            <RefreshCw size={13} />
          </button>
        </div>
      </div>

      {/* Terminal View Content */}
      {activeTab === 'terminal' && (
        <div className="terminal-body font-mono">
          <div className="terminal-logs">
            {logs.map((log, index) => (
              <div key={index} className="log-line">
                {log}
              </div>
            ))}
          </div>

          <form onSubmit={handleCommandSubmit} className="terminal-input-form">
            <span className="prompt-symbol">$</span>
            <input 
              type="text" 
              className="terminal-input font-mono"
              value={inputCmd}
              onChange={(e) => setInputCmd(e.target.value)}
              placeholder="type a command..."
              aria-label="Terminal prompt input"
            />
          </form>
        </div>
      )}

      {activeTab === 'output' && (
        <div className="terminal-body font-mono" style={{ color: '#9ca3af' }}>
          [Vite Build Engine] Bundled 42 modules in 180ms.<br/>
          [FastAPI Ingestion Engine] Listener port 8000 operational.<br/>
          [Sensor Stream] 24 telemetry nodes emitting data.
        </div>
      )}

      {activeTab === 'problems' && (
        <div className="terminal-body font-mono" style={{ color: 'var(--color-success)' }}>
          ✓ No diagnostic problems or lint errors found in workspace.
        </div>
      )}

      {activeTab === 'git' && (
        <div className="terminal-body font-mono" style={{ color: '#d1d5db' }}>
          On branch main<br/>
          Your branch is up to date with 'origin/main'.<br/>
          Latest commit: a82f91c - feat: improve dashboard and chart responsiveness
        </div>
      )}

      {activeTab === 'reviews' && (
        <div className="terminal-body font-mono" style={{ color: '#d1d5db' }}>
          Faculty Review Status: Approved (Score: 92/100)<br/>
          Reviewer Notes: "Excellent code modularity and clean TypeScript interface definitions."
        </div>
      )}

      {activeTab === 'activity' && (
        <div className="terminal-body font-mono" style={{ color: '#d1d5db' }}>
          [11:15 AM] Auto-saved Project Workspace files.<br/>
          [10:45 AM] Git branch synchronized with origin/main.
        </div>
      )}
    </div>
  );
};
