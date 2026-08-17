import React from 'react';
import { AppShell } from '../components/AppShell';
import { Clock, CalendarCheck, MapPin } from 'lucide-react';

export const TimetablePage: React.FC = () => {
  const schedule = [
    { time: '09:00 AM - 10:00 AM', subject: 'CS-601 Data Analytics', room: 'LH-302', faculty: 'Dr. Faculty Name' },
    { time: '10:00 AM - 11:00 AM', subject: 'CS-603 Artificial Intelligence', room: 'LH-302', faculty: 'Prof. AI Instructor' },
    { time: '11:15 AM - 01:15 PM', subject: 'CS-607 Web Tech Lab', room: 'Computer Lab 4', faculty: 'Prof. Tech Instructor' },
    { time: '02:00 PM - 03:00 PM', subject: 'CS-604 Distributed Systems', room: 'LH-201', faculty: 'Dr. Blockchain Specialist' }
  ];

  return (
    <AppShell>
      <div className="page-header-container">
        <div>
          <div className="breadcrumbs">
            <span>Academics</span>
            <span className="breadcrumbs-separator">/</span>
            <span style={{ fontWeight: 600, color: 'var(--brand-black)' }}>Timetable</span>
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700 }}>Semester 6 Timetable</h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--brand-dark-grey)', marginTop: '0.125rem' }}>
            Daily lecture schedules, lab locations, and faculty allocations
          </p>
        </div>
      </div>

      <div className="card-box">
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CalendarCheck size={18} className="text-orange-icon" />
          Today's Schedule (Monday)
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {schedule.map((item, idx) => (
            <div key={idx} className="timetable-row-card">
              <div className="time-badge font-mono">
                <Clock size={14} style={{ display: 'inline', marginRight: '0.25rem' }} />
                {item.time}
              </div>
              <div style={{ flexGrow: 1 }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--brand-black)' }}>{item.subject}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--brand-dark-grey)' }}>Instructor: {item.faculty}</p>
              </div>
              <div className="room-badge">
                <MapPin size={13} /> {item.room}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
};
export default TimetablePage;
