import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  GitBranch, FolderGit2, Play, Share2, ArrowLeft,
  Sidebar, Sliders, CheckCircle2, AlertCircle, Save
} from 'lucide-react';
import { AppShell } from '../components/AppShell';
import { LoadingState } from '../components/LoadingState';
import { ErrorState } from '../components/ErrorState';
import { WorkspaceFileExplorer } from '../components/WorkspaceFileExplorer';
import type { FileTreeNode } from '../components/WorkspaceFileExplorer';
import { WorkspaceEditor } from '../components/WorkspaceEditor';
import { WorkspaceTerminal } from '../components/WorkspaceTerminal';
import { useAuth } from '../app/context/AuthContext';
import {
  ensureDefaultProject, getProjectFiles, createProjectFile,
  updateFileContent, renameProjectFile, deleteProjectFile, buildFileTree,
  type UserProject, type ProjectFileNode
} from '../services/projectPersistenceService';

interface OpenTab extends FileTreeNode {
  isDirty?: boolean;
  savedContent?: string;
}

export const ProjectWorkspace: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, profile: authProfile } = useAuth();

  const [project, setProject] = useState<UserProject | null>(null);
  const [flatFiles, setFlatFiles] = useState<ProjectFileNode[]>([]);
  const [treeFiles, setTreeFiles] = useState<FileTreeNode[]>([]);
  const [openTabs, setOpenTabs] = useState<OpenTab[]>([]);
  const [activeTab, setActiveTab] = useState<OpenTab | null>(null);

  const [isExplorerOpen, setIsExplorerOpen] = useState(true);
  const [isTerminalOpen] = useState(true);
  const [mobileTab, setMobileTab] = useState<'editor' | 'explorer' | 'terminal'>('editor');

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // Prompt modal state
  const [promptMode, setPromptMode] = useState<'create-file' | 'create-folder' | 'rename' | null>(null);
  const [promptValue, setPromptValue] = useState('');
  const [promptTarget, setPromptTarget] = useState<{ parentId: string | null; parentPath: string; file?: FileTreeNode } | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<FileTreeNode | null>(null);

  const loadWorkspace = useCallback(async () => {
    if (!user) return;
    setIsLoading(true);
    setError(null);
    try {
      const proj = await ensureDefaultProject(user.id);
      setProject(proj);

      const files = await getProjectFiles(proj.id);
      setFlatFiles(files);
      setTreeFiles(buildFileTree(files) as FileTreeNode[]);
    } catch (err: any) {
      setError(err.message || 'Unable to load project workspace.');
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadWorkspace();
  }, [loadWorkspace]);

  const refreshFiles = async () => {
    if (!project) return;
    const files = await getProjectFiles(project.id);
    setFlatFiles(files);
    setTreeFiles(buildFileTree(files) as FileTreeNode[]);
  };

  const handleSelectFile = (file: FileTreeNode) => {
    if (file.type === 'folder') return;
    const existing = openTabs.find(t => t.id === file.id);
    if (existing) {
      setActiveTab(existing);
    } else {
      const tab: OpenTab = { ...file, isDirty: false, savedContent: file.content || '' };
      setOpenTabs(prev => [...prev, tab]);
      setActiveTab(tab);
    }
    setMobileTab('editor');
  };

  const handleCloseTab = (file: OpenTab, e: React.MouseEvent) => {
    e.stopPropagation();
    const remaining = openTabs.filter(t => t.id !== file.id);
    setOpenTabs(remaining);
    if (activeTab?.id === file.id) {
      setActiveTab(remaining.length > 0 ? remaining[remaining.length - 1] : null);
    }
  };

  const handleContentChange = (newContent: string) => {
    if (!activeTab) return;
    const updatedTab: OpenTab = {
      ...activeTab,
      content: newContent,
      isDirty: newContent !== (activeTab.savedContent ?? '')
    };
    setActiveTab(updatedTab);
    setOpenTabs(prev => prev.map(t => t.id === activeTab.id ? updatedTab : t));
  };

  const handleSave = async () => {
    if (!activeTab || !activeTab.isDirty) return;
    try {
      await updateFileContent(activeTab.id, activeTab.content || '');
      const savedTab: OpenTab = { ...activeTab, isDirty: false, savedContent: activeTab.content || '' };
      setActiveTab(savedTab);
      setOpenTabs(prev => prev.map(t => t.id === activeTab.id ? savedTab : t));
      setSaveStatus('File saved successfully.');
      setTimeout(() => setSaveStatus(null), 2000);
    } catch (err: any) {
      setSaveStatus('Failed to save: ' + (err.message || 'Unknown error'));
      setTimeout(() => setSaveStatus(null), 4000);
    }
  };

  // File CRUD handlers
  const handleCreateFile = (parentId: string | null, parentPath: string, type: 'file' | 'folder') => {
    setPromptMode(type === 'file' ? 'create-file' : 'create-folder');
    setPromptTarget({ parentId, parentPath });
    setPromptValue('');
  };

  const handleRenameFile = (file: FileTreeNode) => {
    setPromptMode('rename');
    setPromptTarget({ parentId: null, parentPath: '', file });
    setPromptValue(file.name);
  };

  const handleDeleteFile = (file: FileTreeNode) => {
    setConfirmDelete(file);
  };

  const executePrompt = async () => {
    if (!promptValue.trim() || !project) return;
    try {
      if (promptMode === 'create-file' || promptMode === 'create-folder') {
        const type = promptMode === 'create-file' ? 'file' : 'folder';
        await createProjectFile(project.id, promptTarget?.parentId || null, promptValue.trim(), type, promptTarget?.parentPath || '');
      } else if (promptMode === 'rename' && promptTarget?.file) {
        await renameProjectFile(promptTarget.file.id, promptValue.trim());
        // Update open tabs if the renamed file is open
        setOpenTabs(prev => prev.map(t => t.id === promptTarget.file!.id ? { ...t, name: promptValue.trim() } : t));
        if (activeTab?.id === promptTarget.file.id) {
          setActiveTab(prev => prev ? { ...prev, name: promptValue.trim() } : null);
        }
      }
      await refreshFiles();
    } catch (err: any) {
      console.error('File operation error:', err);
    }
    setPromptMode(null);
    setPromptTarget(null);
  };

  const executeDelete = async () => {
    if (!confirmDelete || !project) return;
    try {
      await deleteProjectFile(confirmDelete.id, project.id);
      // Close tab if deleted file was open
      setOpenTabs(prev => prev.filter(t => t.id !== confirmDelete.id));
      if (activeTab?.id === confirmDelete.id) {
        const remaining = openTabs.filter(t => t.id !== confirmDelete.id);
        setActiveTab(remaining.length > 0 ? remaining[remaining.length - 1] : null);
      }
      await refreshFiles();
    } catch (err: any) {
      console.error('Delete error:', err);
    }
    setConfirmDelete(null);
  };

  const handleRunProject = () => {
    if (!project) return;
    // Find an index.html or main file and try to preview
    const htmlFile = flatFiles.find(f => f.name === 'index.html');
    if (htmlFile && htmlFile.content) {
      const blob = new Blob([htmlFile.content], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
      setSaveStatus('Preview opened in new tab.');
    } else {
      setSaveStatus('No index.html found for preview. Create an index.html file to enable Run/Preview.');
    }
    setTimeout(() => setSaveStatus(null), 4000);
  };

  if (isLoading) {
    return (
      <AppShell>
        <LoadingState message="Launching AIET-UniSphere Developer Workspace..." />
      </AppShell>
    );
  }

  if (error || !project) {
    return (
      <AppShell>
        <ErrorState message={error || 'Workspace error'} onRetry={loadWorkspace} />
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="ide-workspace-outer">
        {/* Top IDE Toolbar */}
        <div className="ide-top-toolbar">
          <div className="toolbar-left">
            <button className="ide-btn-icon" onClick={() => navigate(-1)} title="Back">
              <ArrowLeft size={16} />
            </button>
            <div className="toolbar-project-title">
              <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--brand-black)' }}>
                {project.name}
              </span>
              <span className="badge badge-active" style={{ fontSize: '0.65rem' }}>
                Workspace
              </span>
            </div>
          </div>

          <div className="toolbar-center font-mono">
            <div className="toolbar-branch-select">
              <GitBranch size={14} className="text-orange-icon" />
              <span>main</span>
            </div>
            {saveStatus && (
              <>
                <span className="toolbar-divider">|</span>
                <div className="toolbar-status-item">
                  <CheckCircle2 size={13} style={{ color: 'var(--color-success)' }} />
                  <span style={{ fontSize: '0.75rem' }}>{saveStatus}</span>
                </div>
              </>
            )}
          </div>

          <div className="toolbar-right">
            <button className="ide-btn ide-btn-secondary" onClick={() => navigate('/student/github')}>
              <FolderGit2 size={15} /> Git / GitHub
            </button>
            <button className="ide-btn ide-btn-primary" onClick={handleRunProject}>
              <Play size={15} /> Run / Preview
            </button>
            <div className="panel-toggles-group">
              <button 
                className={`ide-btn-icon ${isExplorerOpen ? 'active' : ''}`}
                onClick={() => setIsExplorerOpen(!isExplorerOpen)}
                title="Toggle Explorer"
              >
                <Sidebar size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile View Switcher Tabs */}
        <div className="ide-mobile-nav">
          <button className={mobileTab === 'explorer' ? 'active' : ''} onClick={() => setMobileTab('explorer')}>Explorer</button>
          <button className={mobileTab === 'editor' ? 'active' : ''} onClick={() => setMobileTab('editor')}>Editor</button>
          <button className={mobileTab === 'terminal' ? 'active' : ''} onClick={() => setMobileTab('terminal')}>Terminal</button>
        </div>

        {/* Main IDE Layout Body */}
        <div className="ide-layout-grid">
          {isExplorerOpen && (
            <div className={`ide-panel-left ${mobileTab === 'explorer' ? 'mobile-visible' : ''}`}>
              <WorkspaceFileExplorer
                files={treeFiles}
                activeFile={activeTab?.id || ''}
                onSelectFile={handleSelectFile}
                onCreateFile={handleCreateFile}
                onRenameFile={handleRenameFile}
                onDeleteFile={handleDeleteFile}
                onRefresh={refreshFiles}
              />
            </div>
          )}

          <div className={`ide-panel-center ${mobileTab === 'editor' || mobileTab === 'terminal' ? 'mobile-visible' : ''}`}>
            <div className="ide-editor-wrapper">
              <WorkspaceEditor
                openTabs={openTabs}
                activeTab={activeTab}
                onSelectTab={setActiveTab}
                onCloseTab={handleCloseTab}
                onContentChange={handleContentChange}
                onSave={handleSave}
              />
            </div>

            {isTerminalOpen && (
              <div className="ide-terminal-wrapper">
                <WorkspaceTerminal projectName={project.name} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Create / Rename Prompt Modal */}
      {promptMode && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '1rem' }}>
          <div className="dashboard-panel" style={{ width: '100%', maxWidth: '400px', padding: '1.5rem' }}>
            <h3 className="font-display" style={{ fontSize: '1.1rem', fontWeight: 700, marginTop: 0, marginBottom: '1rem' }}>
              {promptMode === 'create-file' ? 'Create New File' : promptMode === 'create-folder' ? 'Create New Folder' : 'Rename'}
            </h3>
            <input
              type="text"
              className="form-input font-sans"
              value={promptValue}
              onChange={(e) => setPromptValue(e.target.value)}
              placeholder={promptMode === 'rename' ? 'New name...' : promptMode === 'create-folder' ? 'Folder name...' : 'File name (e.g. App.tsx)...'}
              autoFocus
              onKeyDown={(e) => { if (e.key === 'Enter') executePrompt(); }}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1rem' }}>
              <button className="btn btn-secondary" onClick={() => setPromptMode(null)}>Cancel</button>
              <button className="btn btn-primary" onClick={executePrompt}>
                {promptMode === 'rename' ? 'Rename' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {confirmDelete && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '1rem' }}>
          <div className="dashboard-panel" style={{ width: '100%', maxWidth: '400px', padding: '1.5rem' }}>
            <h3 className="font-display" style={{ fontSize: '1.1rem', fontWeight: 700, marginTop: 0, color: '#DC2626' }}>
              Delete {confirmDelete.type === 'folder' ? 'Folder' : 'File'}
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--brand-dark-grey)' }}>
              Are you sure you want to delete <strong>{confirmDelete.name}</strong>?
              {confirmDelete.type === 'folder' && ' This will also delete all files inside it.'}
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1rem' }}>
              <button className="btn btn-secondary" onClick={() => setConfirmDelete(null)}>Cancel</button>
              <button className="btn" style={{ backgroundColor: '#DC2626', color: '#FFF', border: '1px solid #DC2626' }} onClick={executeDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
};

export default ProjectWorkspace;
