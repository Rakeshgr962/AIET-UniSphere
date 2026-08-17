import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Users, 
  Terminal
} from 'lucide-react';
import type { ProjectItem } from '../data/projects';
import { ProgressBar } from './ProgressBar';

interface ProjectCardProps {
  project: ProjectItem;
  showWorkspaceButton?: boolean;
}

export const getStatusBadgeClass = (status: ProjectItem['status']) => {
  switch (status) {
    case 'Active':
      return 'badge-active';
    case 'Completed':
      return 'badge-graded';
    case 'Pending Review':
      return 'badge-pending';
    case 'Upcoming':
      return 'badge-upcoming';
    default:
      return 'badge-secondary';
  }
};

export const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project,
  showWorkspaceButton = true 
}) => {
  const navigate = useNavigate();

  return (
    <div className="project-card-item">
      <div className="project-card-top-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span className={`badge ${getStatusBadgeClass(project.status)}`}>
            {project.status}
          </span>
          <span className="project-type-tag">{project.projectType}</span>
        </div>
        <span className="project-deadline-badge">
          <Calendar size={13} />
          Due: {project.deadline}
        </span>
      </div>

      <h3 className="project-card-title">{project.name}</h3>
      <p className="project-card-description">{project.description}</p>

      <div className="project-card-meta-list">
        <div className="project-meta-item">
          <span className="meta-label">Course:</span>
          <span className="meta-val">{project.course}</span>
        </div>
        <div className="project-meta-item">
          <span className="meta-label">Mentor:</span>
          <span className="meta-val">{project.faculty}</span>
        </div>
        <div className="project-meta-item">
          <span className="meta-label">Current Milestone:</span>
          <span className="meta-val milestone-highlight">{project.currentMilestone}</span>
        </div>
      </div>

      <div className="project-card-progress-wrapper">
        <ProgressBar progress={project.progress} label={`Progress: ${project.progress}%`} />
      </div>

      {project.technology && project.technology.length > 0 && (
        <div className="project-tech-tags font-mono">
          {project.technology.map((tech) => (
            <span key={tech} className="tech-chip">
              {tech}
            </span>
          ))}
        </div>
      )}

      <div className="project-card-footer">
        <div className="project-team-avatars">
          <Users size={14} className="text-dark-grey" />
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--brand-dark-grey)' }}>
            {project.team.length} member{project.team.length > 1 ? 's' : ''}
          </span>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button 
            className="btn btn-secondary" 
            style={{ width: 'auto', padding: '0.5rem 0.85rem', fontSize: '0.85rem' }}
            onClick={() => navigate(`/student/projects/${project.id}`)}
          >
            Details
          </button>
          
          {showWorkspaceButton && (
            <button 
              className="btn btn-primary" 
              style={{ width: 'auto', padding: '0.5rem 0.85rem', fontSize: '0.85rem' }}
              onClick={() => navigate(`/student/projects/${project.id}/workspace`)}
            >
              <Terminal size={15} />
              Open Workspace
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
