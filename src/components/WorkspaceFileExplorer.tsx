import React, { useState } from 'react';
import { Folder, FolderOpen, FileCode, FileText, ChevronRight, ChevronDown } from 'lucide-react';

export interface FileTreeNode {
  name: string;
  type: 'folder' | 'file';
  language?: string;
  content?: string;
  children?: FileTreeNode[];
}

interface WorkspaceFileExplorerProps {
  files: FileTreeNode[];
  activeFile: string;
  onSelectFile: (file: FileTreeNode) => void;
}

const FileTreeItem: React.FC<{
  node: FileTreeNode;
  depth: number;
  activeFile: string;
  onSelectFile: (file: FileTreeNode) => void;
}> = ({ node, depth, activeFile, onSelectFile }) => {
  const [isOpen, setIsOpen] = useState(true);

  if (node.type === 'folder') {
    return (
      <div className="file-tree-folder">
        <div 
          className="file-tree-folder-title" 
          style={{ paddingLeft: `${depth * 12 + 8}px` }}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          {isOpen ? <FolderOpen size={15} className="folder-icon" /> : <Folder size={15} className="folder-icon" />}
          <span className="node-name">{node.name}</span>
        </div>
        {isOpen && node.children && (
          <div className="file-tree-children">
            {node.children.map((child, idx) => (
              <FileTreeItem
                key={`${child.name}-${idx}`}
                node={child}
                depth={depth + 1}
                activeFile={activeFile}
                onSelectFile={onSelectFile}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  const isSelected = activeFile === node.name;

  return (
    <div 
      className={`file-tree-file-item ${isSelected ? 'selected' : ''}`}
      style={{ paddingLeft: `${depth * 12 + 22}px` }}
      onClick={() => onSelectFile(node)}
    >
      {node.name.endsWith('.md') || node.name.endsWith('.json') ? (
        <FileText size={14} className="file-icon" />
      ) : (
        <FileCode size={14} className="file-icon code-icon" />
      )}
      <span className="node-name">{node.name}</span>
    </div>
  );
};

export const WorkspaceFileExplorer: React.FC<WorkspaceFileExplorerProps> = ({
  files,
  activeFile,
  onSelectFile
}) => {
  return (
    <div className="workspace-file-explorer">
      <div className="explorer-header">
        <span>PROJECT EXPLORER</span>
      </div>
      <div className="explorer-tree-container">
        {files.map((fileNode, idx) => (
          <FileTreeItem
            key={`${fileNode.name}-${idx}`}
            node={fileNode}
            depth={0}
            activeFile={activeFile}
            onSelectFile={onSelectFile}
          />
        ))}
      </div>
    </div>
  );
};
