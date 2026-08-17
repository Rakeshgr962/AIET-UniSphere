import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  GitBranch, 
  FolderGit2, 
  Play, 
  Share2, 
  ArrowLeft,
  Sidebar,
  Sliders,
  CheckCircle2
} from 'lucide-react';
import { AppShell } from '../components/AppShell';
import { LoadingState } from '../components/LoadingState';
import { ErrorState } from '../components/ErrorState';
import { WorkspaceFileExplorer } from '../components/WorkspaceFileExplorer';
import type { FileTreeNode } from '../components/WorkspaceFileExplorer';
import { WorkspaceEditor } from '../components/WorkspaceEditor';
import { WorkspaceTerminal } from '../components/WorkspaceTerminal';
import { ProjectContextPanel } from '../components/ProjectContextPanel';
import type { ProjectItem } from '../data/projects';
import type { ProjectTaskItem } from '../data/projectTasks';
import type { ProjectMilestoneItem } from '../data/projectMilestones';
import { getProjectById } from '../services/projectService';
import { 
  getProjectWorkspaceFiles, 
  getProjectTasks, 
  getProjectMilestones, 
  toggleTaskStatus 
} from '../services/workspaceService';

export const ProjectWorkspace: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [project, setProject] = useState<ProjectItem | null>(null);
  const [files, setFiles] = useState<FileTreeNode[]>([]);
  const [tasks, setTasks] = useState<ProjectTaskItem[]>([]);
  const [milestones, setMilestones] = useState<ProjectMilestoneItem[]>([]);

  // Workspace active states
  const [openTabs, setOpenTabs] = useState<FileTreeNode[]>([]);
  const [activeTab, setActiveTab] = useState<FileTreeNode | null>(null);

  // Panel collapsible toggles
  const [isExplorerOpen, setIsExplorerOpen] = useState(true);
  const [isContextOpen, setIsContextOpen] = useState(true);
  const [isTerminalOpen] = useState(true);
  const [mobileTab, setMobileTab] = useState<'editor' | 'explorer' | 'terminal' | 'context'>('editor');

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWorkspace = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const projId = id || 'proj-1';
      const proj = await getProjectById(projId);
      if (!proj) {
        setError("Project not found.");
        return;
      }
      setProject(proj);

      const [filesData, taskData, msData] = await Promise.all([
        getProjectWorkspaceFiles(projId) as Promise<FileTreeNode[]>,
        getProjectTasks(projId),
        getProjectMilestones(projId)
      ]);

      setFiles(filesData);
      setTasks(taskData);
      setMilestones(msData);

      // Default initial open tab (e.g. ProjectCard.tsx or README.md)
      const defaultFile: FileTreeNode = {
        name: 'ProjectCard.tsx',
        type: 'file',
        language: 'typescript',
        content: `import React from 'react';\nimport { ProjectItem } from '../data/projects';\n\ninterface ProjectCardProps {\n  project: ProjectItem;\n}\n\nexport const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {\n  return (\n    <div className="project-card">\n      <h3>{project.name}</h3>\n      <p>{project.description}</p>\n      <div className="progress-bar">\n        <div style={{ width: \`\${project.progress}%\` }}></div>\n      </div>\n    </div>\n  );\n};`
      };
      setOpenTabs([defaultFile]);
      setActiveTab(defaultFile);
    } catch (err) {
      setError("Unable to load project workspace.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkspace();
  }, [id]);

  const handleSelectFile = (file: FileTreeNode) => {
    if (file.type === 'folder') return;
    if (!openTabs.some(t => t.name === file.name)) {
      setOpenTabs([...openTabs, file]);
    }
    setActiveTab(file);
    setMobileTab('editor');
  };

  const handleCloseTab = (file: FileTreeNode, e: React.MouseEvent) => {
    e.stopPropagation();
    const remaining = openTabs.filter(t => t.name !== file.name);
    setOpenTabs(remaining);
    if (activeTab?.name === file.name) {
      setActiveTab(remaining.length > 0 ? remaining[remaining.length - 1] : null);
    }
  };

  const handleEditorContentChange = (newContent: string) => {
    if (!activeTab) return;
    const updatedTab = { ...activeTab, content: newContent };
    setActiveTab(updatedTab);
    setOpenTabs(openTabs.map(t => t.name === activeTab.name ? updatedTab : t));
  };

  const handleToggleTask = async (taskId: string) => {
    const updated = await toggleTaskStatus(taskId);
    setTasks(updated.filter(t => t.projectId === (id || 'proj-1') || t.projectId === 'proj-1'));
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
        <ErrorState message={error || "Workspace error"} onRetry={fetchWorkspace} />
      </AppShell>
    );
  }

  return (
    <AppShell>
      {/* Workspace Container */}
      <div className="ide-workspace-outer">
        {/* Top IDE Toolbar */}
        <div className="ide-top-toolbar">
          <div className="toolbar-left">
            <button 
              className="ide-btn-icon" 
              onClick={() => navigate(`/student/projects/${project.id}`)}
              title="Back to Project Details"
            >
              <ArrowLeft size={16} />
            </button>
            <div className="toolbar-project-title">
              <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--brand-black)' }}>
                {project.name}
              </span>
              <span className="badge badge-active" style={{ fontSize: '0.65rem' }}>
                {project.projectType}
              </span>
            </div>
          </div>

          <div className="toolbar-center font-mono">
            <div className="toolbar-branch-select">
              <GitBranch size={14} className="text-orange-icon" />
              <span>main</span>
            </div>
            <span className="toolbar-divider">|</span>
            <div className="toolbar-status-item">
              <CheckCircle2 size={13} style={{ color: 'var(--color-success)' }} />
              <span>Workspace Synced</span>
            </div>
          </div>

          <div className="toolbar-right">
            <button 
              className="ide-btn ide-btn-secondary"
              onClick={() => navigate('/student/github')}
            >
              <FolderGit2 size={15} />
              Git / GitHub
            </button>

            <button 
              className="ide-btn ide-btn-primary"
              onClick={() => alert("Simulating local server dev build: Live reload running at http://localhost:5173")}
            >
              <Play size={15} />
              Run Project
            </button>

            <button 
              className="ide-btn ide-btn-secondary"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert("Workspace share link copied to clipboard!");
              }}
              title="Share Workspace Link"
            >
              <Share2 size={15} />
              Share
            </button>

            {/* Panel toggle shortcuts */}
            <div className="panel-toggles-group">
              <button 
                className={`ide-btn-icon ${isExplorerOpen ? 'active' : ''}`}
                onClick={() => setIsExplorerOpen(!isExplorerOpen)}
                title="Toggle Explorer"
              >
                <Sidebar size={16} />
              </button>
              <button 
                className={`ide-btn-icon ${isContextOpen ? 'active' : ''}`}
                onClick={() => setIsContextOpen(!isContextOpen)}
                title="Toggle Context Panel"
              >
                <Sliders size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile View Switcher Tabs */}
        <div className="ide-mobile-nav">
          <button className={mobileTab === 'explorer' ? 'active' : ''} onClick={() => setMobileTab('explorer')}>Explorer</button>
          <button className={mobileTab === 'editor' ? 'active' : ''} onClick={() => setMobileTab('editor')}>Editor</button>
          <button className={mobileTab === 'terminal' ? 'active' : ''} onClick={() => setMobileTab('terminal')}>Terminal</button>
          <button className={mobileTab === 'context' ? 'active' : ''} onClick={() => setMobileTab('context')}>Requirements</button>
        </div>

        {/* Main IDE Layout Body */}
        <div className="ide-layout-grid">
          {/* Left File Explorer Panel */}
          {isExplorerOpen && (
            <div className={`ide-panel-left ${mobileTab === 'explorer' ? 'mobile-visible' : ''}`}>
              <WorkspaceFileExplorer
                files={files}
                activeFile={activeTab?.name || ''}
                onSelectFile={handleSelectFile}
              />
            </div>
          )}

          {/* Center Editor + Bottom Terminal Panel */}
          <div className={`ide-panel-center ${mobileTab === 'editor' || mobileTab === 'terminal' ? 'mobile-visible' : ''}`}>
            {/* Editor Area */}
            <div className="ide-editor-wrapper">
              <WorkspaceEditor
                openTabs={openTabs}
                activeTab={activeTab}
                onSelectTab={setActiveTab}
                onCloseTab={handleCloseTab}
                onContentChange={handleEditorContentChange}
              />
            </div>

            {/* Bottom Terminal */}
            {isTerminalOpen && (
              <div className="ide-terminal-wrapper">
                <WorkspaceTerminal 
                  onRunProject={() => alert("Running 'npm run dev' on local port 5173...")} 
                />
              </div>
            )}
          </div>

          {/* Right Context Panel */}
          {isContextOpen && (
            <div className={`ide-panel-right ${mobileTab === 'context' ? 'mobile-visible' : ''}`}>
              <ProjectContextPanel
                project={project}
                tasks={tasks}
                milestones={milestones}
                onToggleTask={handleToggleTask}
              />
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
};

export default ProjectWorkspace;
