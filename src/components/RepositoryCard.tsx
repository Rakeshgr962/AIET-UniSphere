import React from 'react';
import { 
  FolderGit2, 
  GitBranch, 
  Clock, 
  Star, 
  GitFork, 
  ExternalLink,
  Lock,
  Globe,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import type { RepositoryInfo } from '../data/repositories';

interface RepositoryCardProps {
  repository: RepositoryInfo;
  onToggleConnect?: () => void;
}

export const RepositoryCard: React.FC<RepositoryCardProps> = ({
  repository,
  onToggleConnect
}) => {
  return (
    <div className="repo-card-container">
      <div className="repo-card-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div className="repo-icon-box">
            <FolderGit2 size={24} style={{ color: 'var(--brand-orange)' }} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--brand-black)' }}>
                {repository.name}
              </h3>
              <span className="badge badge-secondary" style={{ fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                {repository.visibility === 'Public' ? <Globe size={11} /> : <Lock size={11} />}
                {repository.visibility}
              </span>
            </div>
            <span style={{ fontSize: '0.85rem', color: 'var(--brand-dark-grey)' }}>
              Owner: <strong>{repository.owner}</strong>
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {repository.githubConnected ? (
            <span className="badge badge-graded" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <CheckCircle2 size={13} /> Connected
            </span>
          ) : (
            <span className="badge badge-overdue" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <XCircle size={13} /> Not Connected
            </span>
          )}

          {onToggleConnect && (
            <button 
              className={`btn ${repository.githubConnected ? 'btn-secondary' : 'btn-primary'}`}
              style={{ width: 'auto', padding: '0.45rem 1rem', fontSize: '0.85rem' }}
              onClick={onToggleConnect}
            >
              {repository.githubConnected ? 'Disconnect' : 'Connect GitHub'}
            </button>
          )}
        </div>
      </div>

      <div className="repo-card-meta-bar">
        <div className="meta-pill">
          <GitBranch size={14} className="meta-icon" />
          <span>Active Branch: <strong>{repository.currentBranch}</strong></span>
        </div>
        <div className="meta-pill">
          <Clock size={14} className="meta-icon" />
          <span>Last Commit: <strong>{repository.lastCommit}</strong></span>
        </div>
        <div className="meta-pill">
          <Star size={14} className="meta-icon" />
          <span>{repository.starsCount} stars</span>
        </div>
        <div className="meta-pill">
          <GitFork size={14} className="meta-icon" />
          <span>{repository.forksCount} forks</span>
        </div>
      </div>

      <div className="repo-card-actions font-mono">
        <span style={{ fontSize: '0.8rem', color: 'var(--brand-dark-grey)' }}>
          {repository.cloneUrl}
        </span>

        <a 
          href={`https://github.com/${repository.owner}/${repository.name}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary"
          style={{ width: 'auto', padding: '0.4rem 0.85rem', fontSize: '0.8rem' }}
        >
          <ExternalLink size={14} />
          View Repository
        </a>
      </div>
    </div>
  );
};
