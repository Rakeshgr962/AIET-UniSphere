import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FolderGit2, 
  GitBranch, 
  GitCommit, 
  GitPullRequest, 
  RefreshCw,
  Terminal
} from 'lucide-react';
import { AppShell } from '../components/AppShell';
import { LoadingState } from '../components/LoadingState';
import { ErrorState } from '../components/ErrorState';
import { RepositoryCard } from '../components/RepositoryCard';
import { BranchList } from '../components/BranchList';
import { CommitList } from '../components/CommitList';
import { ChangeList } from '../components/ChangeList';
import type { 
  RepositoryInfo, 
  GitBranchItem, 
  GitCommitItem, 
  GitFileChange 
} from '../data/repositories';
import { 
  getRepositoryInfo, 
  getBranches, 
  getCommits, 
  getGitChanges, 
  addCommit, 
  switchBranch, 
  toggleGitHubConnection 
} from '../services/githubService';

type GitTab = 'overview' | 'branches' | 'commits' | 'changes';

export const GitGithubPage: React.FC = () => {
  const navigate = useNavigate();

  const [repo, setRepo] = useState<RepositoryInfo | null>(null);
  const [branches, setBranches] = useState<GitBranchItem[]>([]);
  const [commits, setCommits] = useState<GitCommitItem[]>([]);
  const [changes, setChanges] = useState<GitFileChange | null>(null);
  
  const [activeTab, setActiveTab] = useState<GitTab>('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGitData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [repoData, branchData, commitData, changeData] = await Promise.all([
        getRepositoryInfo(),
        getBranches(),
        getCommits(),
        getGitChanges()
      ]);
      setRepo(repoData);
      setBranches(branchData);
      setCommits(commitData);
      setChanges(changeData);
    } catch (err) {
      setError("Unable to load Git repository data.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGitData();
  }, []);

  const handleSelectBranch = async (branchName: string) => {
    const updatedRepo = await switchBranch(branchName);
    setRepo(updatedRepo);
  };

  const handleCommit = async (message: string) => {
    await addCommit(message);
    await fetchGitData();
  };

  const handleToggleConnection = async () => {
    if (!repo) return;
    const nextState = !repo.githubConnected;
    const updated = await toggleGitHubConnection(nextState);
    setRepo(updated);
  };

  if (isLoading) {
    return (
      <AppShell>
        <LoadingState message="Connecting to Git repository..." />
      </AppShell>
    );
  }

  if (error || !repo || !changes) {
    return (
      <AppShell>
        <ErrorState message={error || "Repository error"} onRetry={fetchGitData} />
      </AppShell>
    );
  }

  return (
    <AppShell>
      {/* Header */}
      <div className="page-header-container">
        <div>
          <div className="breadcrumbs">
            <span>Development</span>
            <span className="breadcrumbs-separator">/</span>
            <span style={{ fontWeight: 600, color: 'var(--brand-black)' }}>Git / GitHub</span>
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700 }}>Git & GitHub Integration</h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--brand-dark-grey)', marginTop: '0.125rem' }}>
            Version control, branches, commit history, file diffs, and GitHub connection
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button 
            className="btn btn-secondary"
            style={{ width: 'auto' }}
            onClick={fetchGitData}
          >
            <RefreshCw size={15} />
            Fetch / Sync
          </button>
          
          <button 
            className="btn btn-primary"
            style={{ width: 'auto' }}
            onClick={() => navigate('/student/project-workspace')}
          >
            <Terminal size={15} />
            Open IDE Workspace
          </button>
        </div>
      </div>

      {/* Repository Main Info Card */}
      <RepositoryCard 
        repository={repo}
        onToggleConnect={handleToggleConnection}
      />

      {/* Tabs */}
      <div className="tab-filters-container" style={{ margin: '1.5rem 0' }}>
        <button
          className={`tab-filter-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <FolderGit2 size={15} /> Overview
        </button>
        
        <button
          className={`tab-filter-btn ${activeTab === 'branches' ? 'active' : ''}`}
          onClick={() => setActiveTab('branches')}
        >
          <GitBranch size={15} /> Branches ({branches.length})
        </button>

        <button
          className={`tab-filter-btn ${activeTab === 'commits' ? 'active' : ''}`}
          onClick={() => setActiveTab('commits')}
        >
          <GitCommit size={15} /> Commits ({commits.length})
        </button>

        <button
          className={`tab-filter-btn ${activeTab === 'changes' ? 'active' : ''}`}
          onClick={() => setActiveTab('changes')}
        >
          <GitPullRequest size={15} /> Uncommitted Changes
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <ChangeList changes={changes} onCommit={handleCommit} />
          <CommitList commits={commits.slice(0, 3)} />
          <BranchList 
            branches={branches} 
            currentBranch={repo.currentBranch} 
            onSelectBranch={handleSelectBranch} 
          />
        </div>
      )}

      {activeTab === 'branches' && (
        <BranchList 
          branches={branches} 
          currentBranch={repo.currentBranch} 
          onSelectBranch={handleSelectBranch} 
        />
      )}

      {activeTab === 'commits' && (
        <CommitList commits={commits} />
      )}

      {activeTab === 'changes' && (
        <ChangeList changes={changes} onCommit={handleCommit} />
      )}
    </AppShell>
  );
};

export default GitGithubPage;
