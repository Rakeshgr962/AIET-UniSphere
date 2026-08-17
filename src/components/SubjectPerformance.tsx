import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { SubjectPerformanceItem } from '../data/analytics';
import { ProgressBar } from './ProgressBar';

interface SubjectPerformanceProps {
  subjects: SubjectPerformanceItem[];
}

export const SubjectPerformance: React.FC<SubjectPerformanceProps> = ({ subjects }) => {
  const getTrendBadge = (trend: SubjectPerformanceItem['trend'], val: string) => {
    switch (trend) {
      case 'Improving':
        return (
          <span className="badge badge-active" style={{ fontSize: '0.75rem', gap: '0.2rem' }}>
            <TrendingUp size={13} />
            <span>Improving ({val})</span>
          </span>
        );
      case 'Needs Attention':
        return (
          <span className="badge badge-overdue" style={{ fontSize: '0.75rem', gap: '0.2rem' }}>
            <TrendingDown size={13} />
            <span>Needs Attention ({val})</span>
          </span>
        );
      case 'Stable':
      default:
        return (
          <span className="badge badge-secondary" style={{ fontSize: '0.75rem', gap: '0.2rem' }}>
            <Minus size={13} />
            <span>Stable ({val})</span>
          </span>
        );
    }
  };

  return (
    <div className="subject-performance-card">
      <div className="card-header-bar">
        <h3 className="card-title font-display">Subject Level Performance</h3>
        <span className="font-mono text-dark-grey" style={{ fontSize: '0.8rem' }}>Sem 6 Courses</span>
      </div>

      <div className="subject-table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Course</th>
              <th>Average Score</th>
              <th>Grade</th>
              <th>Trend</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((sub) => (
              <tr key={sub.id}>
                <td>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontWeight: 600, color: 'var(--brand-black)' }}>{sub.name}</span>
                    <span className="font-mono text-dark-grey" style={{ fontSize: '0.75rem' }}>{sub.code}</span>
                  </div>
                </td>

                <td style={{ width: '220px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                    <span className="font-mono font-bold" style={{ fontSize: '0.85rem' }}>{sub.average}%</span>
                    <ProgressBar progress={sub.average} showPercentage={false} />
                  </div>
                </td>

                <td>
                  <span className="badge badge-active font-mono" style={{ padding: '0.25rem 0.5rem' }}>
                    {sub.grade}
                  </span>
                </td>

                <td>
                  {getTrendBadge(sub.trend, sub.trendValue)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
