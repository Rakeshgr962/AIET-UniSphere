import React from 'react';

export interface ActivityEvent {
  id: string;
  timeGroup: string;
  title: string;
  description?: string;
  type?: 'commit' | 'milestone' | 'documentation' | 'branch';
}

export const mockProjectActivities: ActivityEvent[] = [
  {
    id: 'act-1',
    timeGroup: 'Today',
    title: 'Updated project documentation & API endpoints schema',
    description: 'Jane Doe added README endpoints table and TypeScript interface specs.',
    type: 'documentation'
  },
  {
    id: 'act-2',
    timeGroup: 'Yesterday',
    title: 'Created feature branch feature/authentication',
    description: 'Merged JWT token payload validation into development branch.',
    type: 'branch'
  },
  {
    id: 'act-3',
    timeGroup: '12 Aug',
    title: 'Submitted Phase 1 Milestone for Faculty Review',
    description: 'System Architecture & Database ER Model submitted for evaluation.',
    type: 'milestone'
  },
  {
    id: 'act-4',
    timeGroup: '08 Aug',
    title: 'Pushed 4 commits to main repository',
    description: 'Refactored state management and table rendering performance.',
    type: 'commit'
  }
];

export const ProjectTimeline: React.FC = () => {
  return (
    <div className="activity-timeline">
      {mockProjectActivities.map((event) => (
        <div key={event.id} className="timeline-item">
          <div className="timeline-badge font-mono">{event.timeGroup}</div>
          <div className="timeline-content-card">
            <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--brand-black)' }}>
              {event.title}
            </h4>
            {event.description && (
              <p style={{ fontSize: '0.85rem', color: 'var(--brand-dark-grey)', marginTop: '0.2rem' }}>
                {event.description}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
