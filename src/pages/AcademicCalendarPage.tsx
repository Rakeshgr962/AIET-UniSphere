import React from 'react';
import { AppShell } from '../components/AppShell';

export const AcademicCalendarPage: React.FC = () => {
  const events = [
    { date: '15 Aug 2026', title: 'Independence Day Celebration', category: 'Holiday' },
    { date: '22 Aug 2026', title: 'Phase 2 Engineering Project Review', category: 'Academic' },
    { date: '01 Sep 2026', title: 'Mid-Semester Examinations Commence', category: 'Exam' },
    { date: '15 Sep 2026', title: 'AIET Hackathon 2026 Submissions', category: 'Event' },
    { date: '10 Oct 2026', title: 'Capstone Project Final Presentation', category: 'Academic' }
  ];

  return (
    <AppShell>
      <div className="page-header-container">
        <div>
          <div className="breadcrumbs">
            <span>Academics</span>
            <span className="breadcrumbs-separator">/</span>
            <span style={{ fontWeight: 600, color: 'var(--brand-black)' }}>Academic Calendar</span>
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700 }}>Academic Calendar 2026–27</h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--brand-dark-grey)', marginTop: '0.125rem' }}>
            Institutional schedule, examination dates, project deadlines, and holidays
          </p>
        </div>
      </div>

      <div className="card-box">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {events.map((ev, idx) => (
            <div key={idx} className="timeline-item-card">
              <div className="event-date font-mono">{ev.date}</div>
              <div style={{ flexGrow: 1 }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--brand-black)' }}>{ev.title}</h4>
                <span className="badge badge-secondary" style={{ marginTop: '0.25rem', fontSize: '0.7rem' }}>
                  {ev.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
};
export default AcademicCalendarPage;
