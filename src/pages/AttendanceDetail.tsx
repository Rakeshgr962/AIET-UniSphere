import React, { useState, useEffect } from 'react';
import { CalendarCheck, Users, HelpCircle, CheckSquare } from 'lucide-react';
import { getAttendanceSummary } from '../services/attendanceService';
import { AppShell } from '../components/AppShell';
import { StatCard } from '../components/StatCard';
import { LoadingState } from '../components/LoadingState';
import { ErrorState } from '../components/ErrorState';

export const AttendanceDetail: React.FC = () => {
  const [attendance, setAttendance] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAttendance = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getAttendanceSummary();
      setAttendance(data);
    } catch (err) {
      setError("Unable to load attendance details. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  if (isLoading) {
    return (
      <AppShell>
        <LoadingState message="Loading attendance history..." />
      </AppShell>
    );
  }

  if (error || !attendance) {
    return (
      <AppShell>
        <ErrorState message={error || "Failed to load attendance summary"} onRetry={fetchAttendance} />
      </AppShell>
    );
  }

  // Calculate sum of sessions held and attended across all subjects
  const totalHeld = attendance.subjects.reduce((sum: number, s: any) => sum + s.held, 0);
  const totalAttended = attendance.subjects.reduce((sum: number, s: any) => sum + s.attended, 0);

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Good': return 'badge-graded';
      case 'Monitor': return 'badge-pending';
      case 'Critical': return 'badge-overdue';
      default: return 'badge-upcoming';
    }
  };

  const getAttendanceBadgeClass = (status: string) => {
    switch (status) {
      case 'Present': return 'badge-graded';
      case 'Late': return 'badge-pending';
      case 'Absent': return 'badge-overdue';
      default: return 'badge-upcoming';
    }
  };

  return (
    <AppShell>
      {/* Header */}
      <div className="page-header-container">
        <div style={{ textAlign: 'left' }}>
          <div className="breadcrumbs">
            <span>Academics</span>
            <span className="breadcrumbs-separator">/</span>
            <span style={{ fontWeight: 600, color: 'var(--brand-black)' }}>Attendance</span>
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, fontFamily: 'var(--font-display)' }}>Attendance Logs</h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--brand-dark-grey)', marginTop: '0.125rem' }}>
            Monitor your subject attendance metrics and daily session check-ins.
          </p>
        </div>
      </div>

      {/* Stats row */}
      <div className="stat-cards-grid">
        <StatCard 
          title="Overall Attendance" 
          value={`${attendance.overallPercentage}%`} 
          icon={<CalendarCheck size={20} />} 
        />
        <StatCard 
          title="Sessions Attended" 
          value={totalAttended} 
          icon={<CheckSquare size={20} />} 
        />
        <StatCard 
          title="Total Classes Held" 
          value={totalHeld} 
          icon={<Users size={20} />} 
        />
        <StatCard 
          title="Minimum Required" 
          value="75%" 
          icon={<HelpCircle size={20} />} 
        />
      </div>

      {/* Layout Grid */}
      <div className="dashboard-grid-two-col">
        {/* Left Column: Subject Breakdown & Monthly Trend */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'left' }}>
          
          {/* Subject breakdown */}
          <div className="dashboard-panel">
            <h3 className="panel-title">Subject Wise Breakdown</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {attendance.subjects.map((sub: any) => (
                <div key={sub.code} style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <strong style={{ fontSize: '0.9rem', color: 'var(--brand-black)' }}>{sub.subject}</strong>
                      <span style={{ fontSize: '0.75rem', color: 'var(--brand-dark-grey)', marginLeft: '0.5rem' }}>({sub.code})</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--brand-dark-grey)' }}>
                        {sub.attended} / {sub.held} Lectures
                      </span>
                      <span className={`badge ${getStatusClass(sub.status)}`} style={{ fontSize: '0.7rem', padding: '0.15rem 0.45rem' }}>
                        {sub.status}
                      </span>
                    </div>
                  </div>
                  
                  {/* Progress bar with custom color boundary */}
                  <div className="progress-bar-bg">
                    <div 
                      className="progress-bar-fill" 
                      style={{ 
                        width: `${sub.percentage}%`,
                        backgroundColor: sub.percentage >= 85 ? 'var(--color-success)' : sub.percentage >= 75 ? 'var(--brand-orange)' : 'var(--color-error)'
                      }}
                    ></div>
                  </div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--brand-dark-grey)', textAlign: 'right' }}>
                    {sub.percentage}% Attended
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly Trend bar chart */}
          <div className="chart-container-card">
            <h3 className="panel-title">Attendance Monthly Trend</h3>
            <div className="bar-chart-visual">
              {attendance.trend.map((t: any, idx: number) => (
                <div key={idx} className="bar-chart-column">
                  <div className="bar-chart-bar-wrapper">
                    <div 
                      className="bar-chart-bar-fill" 
                      style={{ height: `${t.percentage}%` }}
                    >
                      <span className="bar-chart-value-hint">{t.percentage}%</span>
                    </div>
                  </div>
                  <span className="bar-chart-label">{t.month}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Log Calendar history */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'left' }}>
          
          <div className="dashboard-panel">
            <div className="panel-header-row">
              <h3 className="panel-title">Session History Logs</h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--brand-dark-grey)', fontWeight: 600 }}>August 2026</span>
            </div>

            <div className="attendance-history-list">
              {attendance.history.map((log: any, idx: number) => (
                <div key={idx} className="attendance-history-card">
                  <div className="attendance-history-left">
                    <span className="attendance-history-date">
                      {new Date(log.date).toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })}
                    </span>
                    <span className="attendance-history-subject">{log.subject}</span>
                    <span className="attendance-history-meta">
                      ⏱️ {log.session} · Instructor: {log.faculty}
                    </span>
                  </div>
                  
                  <div className="attendance-history-right">
                    <span className={`badge ${getAttendanceBadgeClass(log.status)}`} style={{ minWidth: '70px', justifyContent: 'center' }}>
                      {log.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </AppShell>
  );
};
export default AttendanceDetail;
