import React from 'react';
import { CheckCircle2, Circle, Clock, Calendar, CheckSquare, Flag, ListTodo } from 'lucide-react';
import type { ProjectItem } from '../data/projects';
import type { ProjectTaskItem } from '../data/projectTasks';
import type { ProjectMilestoneItem } from '../data/projectMilestones';
import { ProgressBar } from './ProgressBar';

interface ProjectContextPanelProps {
  project: ProjectItem;
  tasks: ProjectTaskItem[];
  milestones: ProjectMilestoneItem[];
  onToggleTask?: (taskId: string) => void;
}

export const ProjectContextPanel: React.FC<ProjectContextPanelProps> = ({
  project,
  tasks,
  milestones,
  onToggleTask
}) => {
  const requirements = [
    { label: 'Authentication Module', status: 'completed' },
    { label: 'Database Schema & ORM', status: 'completed' },
    { label: 'API Integration & State', status: 'in-progress' },
    { label: 'Unit & E2E Testing Suite', status: 'pending' },
    { label: 'Deployment & Field Demo', status: 'pending' }
  ];

  const todoTasks = tasks.filter(t => t.status === 'Todo');
  const inProgressTasks = tasks.filter(t => t.status === 'In Progress');
  const completedTasks = tasks.filter(t => t.status === 'Completed');

  return (
    <div className="workspace-context-panel">
      {/* Overview Card */}
      <div className="context-section">
        <h4 className="context-section-title">
          <Calendar size={15} /> Overview & Deadline
        </h4>
        <div className="context-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--brand-dark-grey)' }}>Deadline:</span>
            <span className="badge badge-active" style={{ fontSize: '0.75rem' }}>{project.deadline}</span>
          </div>
          <ProgressBar progress={project.progress} label={`Overall Progress: ${project.progress}%`} />
        </div>
      </div>

      {/* Requirements checklist */}
      <div className="context-section">
        <h4 className="context-section-title">
          <CheckSquare size={15} /> Project Requirements
        </h4>
        <div className="context-card requirements-list">
          {requirements.map((req, idx) => (
            <div key={idx} className="requirement-item">
              {req.status === 'completed' ? (
                <CheckCircle2 size={16} className="req-icon completed" />
              ) : req.status === 'in-progress' ? (
                <Clock size={16} className="req-icon in-progress" />
              ) : (
                <Circle size={16} className="req-icon pending" />
              )}
              <span className={`req-label ${req.status}`}>{req.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Milestones */}
      <div className="context-section">
        <h4 className="context-section-title">
          <Flag size={15} /> Key Milestones
        </h4>
        <div className="context-card milestones-context-list">
          {milestones.map((ms) => (
            <div key={ms.id} className="context-milestone-row">
              <div className="ms-status-dot-wrapper">
                <span className={`ms-dot ${ms.status.toLowerCase().replace(' ', '-')}`} />
              </div>
              <div style={{ flexGrow: 1 }}>
                <span style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--brand-black)' }}>
                  {ms.title}
                </span>
                <div style={{ fontSize: '0.75rem', color: 'var(--brand-dark-grey)' }}>
                  {ms.dueDate} · <span style={{ fontWeight: 600 }}>{ms.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tasks Summary */}
      <div className="context-section">
        <h4 className="context-section-title">
          <ListTodo size={15} /> Task Board
        </h4>
        <div className="context-card task-board-summary">
          <div className="task-group">
            <span className="task-group-title">In Progress ({inProgressTasks.length})</span>
            {inProgressTasks.map(t => (
              <div 
                key={t.id} 
                className="mini-task-item in-progress"
                onClick={() => onToggleTask && onToggleTask(t.id)}
              >
                ● {t.title}
              </div>
            ))}
          </div>

          <div className="task-group" style={{ marginTop: '0.75rem' }}>
            <span className="task-group-title">Todo ({todoTasks.length})</span>
            {todoTasks.map(t => (
              <div 
                key={t.id} 
                className="mini-task-item todo"
                onClick={() => onToggleTask && onToggleTask(t.id)}
              >
                ○ {t.title}
              </div>
            ))}
          </div>

          <div className="task-group" style={{ marginTop: '0.75rem' }}>
            <span className="task-group-title">Completed ({completedTasks.length})</span>
            {completedTasks.map(t => (
              <div 
                key={t.id} 
                className="mini-task-item completed"
                onClick={() => onToggleTask && onToggleTask(t.id)}
              >
                ✓ {t.title}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
