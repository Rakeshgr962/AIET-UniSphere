import React from 'react';
import { X, FileCode } from 'lucide-react';
import type { FileTreeNode } from './WorkspaceFileExplorer';

interface WorkspaceEditorProps {
  openTabs: FileTreeNode[];
  activeTab: FileTreeNode | null;
  onSelectTab: (file: FileTreeNode) => void;
  onCloseTab: (file: FileTreeNode, e: React.MouseEvent) => void;
  onContentChange: (newContent: string) => void;
}

export const WorkspaceEditor: React.FC<WorkspaceEditorProps> = ({
  openTabs,
  activeTab,
  onSelectTab,
  onCloseTab,
  onContentChange
}) => {
  if (!activeTab) {
    return (
      <div className="workspace-editor-empty">
        <FileCode size={48} style={{ color: 'var(--brand-grey)', opacity: 0.5 }} />
        <p style={{ marginTop: '0.75rem', fontWeight: 600, color: 'var(--brand-dark-grey)' }}>
          Select a file from the explorer to view or edit
        </p>
      </div>
    );
  }

  const lines = (activeTab.content || '').split('\n');

  return (
    <div className="workspace-editor-container">
      {/* Tabs Header */}
      <div className="editor-tabs-bar">
        {openTabs.map((tab) => {
          const isActive = activeTab.name === tab.name;
          return (
            <div
              key={tab.name}
              className={`editor-tab ${isActive ? 'active' : ''}`}
              onClick={() => onSelectTab(tab)}
            >
              <FileCode size={13} className="tab-icon" />
              <span>{tab.name}</span>
              <button 
                className="tab-close-btn" 
                onClick={(e) => onCloseTab(tab, e)}
                aria-label="Close tab"
              >
                <X size={12} />
              </button>
            </div>
          );
        })}
      </div>

      {/* Editor Content Area */}
      <div className="editor-body">
        <div className="editor-line-numbers font-mono">
          {lines.map((_, idx) => (
            <span key={idx} className="line-num">{idx + 1}</span>
          ))}
        </div>

        <div className="editor-code-area font-mono">
          <textarea
            className="editor-textarea font-mono"
            value={activeTab.content || ''}
            onChange={(e) => onContentChange(e.target.value)}
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
};
