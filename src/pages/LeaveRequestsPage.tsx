import React from 'react';
import { AppShell } from '../components/AppShell';
import { Plus, CheckCircle2 } from 'lucide-react';

export const LeaveRequestsPage: React.FC = () => {
  const leaves = [
    { id: 'LV-089', type: 'Duty Leave', reason: 'Participation in AIET Campus Tech Fest', dates: '14 Aug 2026 – 16 Aug 2026', days: 3, status: 'Approved', approvedBy: 'Dr. Faculty HOD' },
    { id: 'LV-054', type: 'Medical Leave', reason: 'Viral Fever & Doctor Advice', dates: '02 Jul 2026 – 04 Jul 2026', days: 3, status: 'Approved', approvedBy: 'Academic Cell' }
  ];

  return (
    <AppShell>
      <div className="page-header-container">
        <div>
          <div className="breadcrumbs">
            <span>Academics</span>
            <span className="breadcrumbs-separator">/</span>
            <span style={{ fontWeight: 600, color: 'var(--brand-black)' }}>Leave Requests</span>
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700 }}>Leave Requests</h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--brand-dark-grey)', marginTop: '0.125rem' }}>
            Apply for academic duty leaves or medical leaves with faculty approval tracking
          </p>
        </div>

        <button className="btn btn-primary" style={{ width: 'auto' }} onClick={() => alert("Apply Leave Modal: Submitting leave application to HOD.")}>
          <Plus size={16} /> Apply for Leave
        </button>
      </div>

      <div className="card-box" style={{ padding: '0' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'var(--brand-light-grey)', borderBottom: '1px solid rgba(156,163,175,0.2)', fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--brand-dark-grey)' }}>
              <th style={{ padding: '1rem' }}>Ref ID</th>
              <th style={{ padding: '1rem' }}>Type</th>
              <th style={{ padding: '1rem' }}>Reason</th>
              <th style={{ padding: '1rem' }}>Dates</th>
              <th style={{ padding: '1rem' }}>Status</th>
              <th style={{ padding: '1rem' }}>Approved By</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map((l) => (
              <tr key={l.id} style={{ borderBottom: '1px solid rgba(156,163,175,0.15)', fontSize: '0.9rem' }}>
                <td style={{ padding: '1rem', fontWeight: 600 }} className="font-mono">{l.id}</td>
                <td style={{ padding: '1rem' }}>{l.type}</td>
                <td style={{ padding: '1rem' }}>{l.reason}</td>
                <td style={{ padding: '1rem' }} className="font-mono">{l.dates} ({l.days} days)</td>
                <td style={{ padding: '1rem' }}>
                  <span className="badge badge-graded" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}>
                    <CheckCircle2 size={12} /> {l.status}
                  </span>
                </td>
                <td style={{ padding: '1rem', color: 'var(--brand-dark-grey)' }}>{l.approvedBy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
};
export default LeaveRequestsPage;
