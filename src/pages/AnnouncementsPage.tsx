import React from 'react';
import { AppShell } from '../components/AppShell';
import { Megaphone, Calendar } from 'lucide-react';

export const AnnouncementsPage: React.FC = () => {
  const announcements = [
    { id: '1', title: 'AIET Hackathon 2026 Registration Open', date: '14 Aug 2026', sender: 'Innovation & Incubation Cell', content: 'Registrations are open for the annual AIET Hackathon. Cash prizes up to ₹1.5 Lakhs. Form teams of 4 members.' },
    { id: '2', title: 'Library Hours Extended for Mid-Sem Exams', date: '10 Aug 2026', sender: 'Central Library', content: 'The Central Digital Library will remain open until 10:00 PM starting next Monday for examination preparation.' },
    { id: '3', title: 'Submitting Project Proposals for Semester 6', date: '05 Aug 2026', sender: 'Department Project Coordinator', content: 'All 6th Semester students are requested to upload project abstracts and team rosters in the Project Portal by August 25.' }
  ];

  return (
    <AppShell>
      <div className="page-header-container">
        <div>
          <div className="breadcrumbs">
            <span>Communication</span>
            <span className="breadcrumbs-separator">/</span>
            <span style={{ fontWeight: 600, color: 'var(--brand-black)' }}>Announcements</span>
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700 }}>Campus Announcements</h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--brand-dark-grey)', marginTop: '0.125rem' }}>
            Official notices from college administration, departments, and event committees
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {announcements.map((anc) => (
          <div key={anc.id} className="card-box">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <Megaphone size={18} className="text-orange-icon" />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{anc.title}</h3>
            </div>
            <p style={{ fontSize: '0.95rem', color: 'var(--brand-black)', lineHeight: '1.5' }}>
              {anc.content}
            </p>
            <div style={{ marginTop: '1rem', display: 'flex', gap: '1.5rem', fontSize: '0.8rem', color: 'var(--brand-dark-grey)' }}>
              <span>From: <strong>{anc.sender}</strong></span>
              <span className="font-mono"><Calendar size={12} style={{ display: 'inline', marginRight: '0.2rem' }} />{anc.date}</span>
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
};
export default AnnouncementsPage;
