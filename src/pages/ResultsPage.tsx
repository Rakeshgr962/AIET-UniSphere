import React from 'react';
import { AppShell } from '../components/AppShell';
import { Award, TrendingUp } from 'lucide-react';

export const ResultsPage: React.FC = () => {
  const semesterResults = [
    { code: 'CS-501', name: 'Database Management Systems', grade: 'S', points: 10, marks: 92 },
    { code: 'CS-502', name: 'Software Engineering', grade: 'A', points: 9, marks: 84 },
    { code: 'CS-503', name: 'Operating Systems', grade: 'A', points: 9, marks: 81 },
    { code: 'CS-504', name: 'Computer Networks', grade: 'B', points: 8, marks: 74 },
    { code: 'CS-507', name: 'DBMS & OS Laboratory', grade: 'S', points: 10, marks: 95 }
  ];

  return (
    <AppShell>
      <div className="page-header-container">
        <div>
          <div className="breadcrumbs">
            <span>Academics</span>
            <span className="breadcrumbs-separator">/</span>
            <span style={{ fontWeight: 600, color: 'var(--brand-black)' }}>Results</span>
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700 }}>Academic Performance & Results</h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--brand-dark-grey)', marginTop: '0.125rem' }}>
            Semester wise grade cards, SGPA, and cumulative CGPA score breakdown
          </p>
        </div>
      </div>

      <div className="stat-cards-grid">
        <div className="stat-card">
          <div className="stat-label-row">
            <span className="stat-card-title">Cumulative CGPA</span>
            <Award size={18} className="stat-card-icon" />
          </div>
          <span className="stat-card-value">7.62</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--brand-dark-grey)' }}>Overall Academic Score</span>
        </div>

        <div className="stat-card">
          <div className="stat-label-row">
            <span className="stat-card-title">Semester 5 SGPA</span>
            <TrendingUp size={18} style={{ color: 'var(--color-success)' }} />
          </div>
          <span className="stat-card-value">8.40</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--brand-dark-grey)' }}>First Class with Distinction</span>
        </div>
      </div>

      <div className="card-box" style={{ padding: '0', marginTop: '1.5rem' }}>
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid rgba(156,163,175,0.2)', fontWeight: 700 }}>
          Semester 5 Detailed Grade Card
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'var(--brand-light-grey)', fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--brand-dark-grey)' }}>
              <th style={{ padding: '1rem' }}>Course Code</th>
              <th style={{ padding: '1rem' }}>Course Name</th>
              <th style={{ padding: '1rem' }}>Marks (%)</th>
              <th style={{ padding: '1rem' }}>Grade</th>
              <th style={{ padding: '1rem' }}>Grade Points</th>
            </tr>
          </thead>
          <tbody>
            {semesterResults.map((r) => (
              <tr key={r.code} style={{ borderBottom: '1px solid rgba(156,163,175,0.15)', fontSize: '0.9rem' }}>
                <td style={{ padding: '1rem', fontWeight: 600 }} className="font-mono">{r.code}</td>
                <td style={{ padding: '1rem' }}>{r.name}</td>
                <td style={{ padding: '1rem' }} className="font-mono">{r.marks}%</td>
                <td style={{ padding: '1rem' }}>
                  <span className="badge badge-graded" style={{ fontWeight: 700 }}>{r.grade}</span>
                </td>
                <td style={{ padding: '1rem', fontWeight: 600 }}>{r.points} / 10</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
};
export default ResultsPage;
