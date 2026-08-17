import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock } from 'lucide-react';
import { getAssessments } from '../services/assessmentService';
import { AppShell } from '../components/AppShell';
import { LoadingState } from '../components/LoadingState';
import { EmptyState } from '../components/EmptyState';
import { ErrorState } from '../components/ErrorState';

export const AssessmentsList: React.FC = () => {
  const navigate = useNavigate();

  const [assessments, setAssessments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Active filter: 'upcoming' or 'completed'
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed'>('upcoming');

  const fetchAssessmentsList = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getAssessments();
      setAssessments(data);
    } catch (err) {
      setError("Unable to load assessments list. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAssessmentsList();
  }, []);

  if (isLoading) {
    return (
      <AppShell>
        <LoadingState message="Loading your assessments..." />
      </AppShell>
    );
  }

  if (error) {
    return (
      <AppShell>
        <ErrorState message={error} onRetry={fetchAssessmentsList} />
      </AppShell>
    );
  }

  const filteredAssessments = assessments.filter(
    a => a.status.toLowerCase() === activeTab
  );

  return (
    <AppShell>
      {/* Header */}
      <div className="page-header-container">
        <div style={{ textAlign: 'left' }}>
          <div className="breadcrumbs">
            <span>Academics</span>
            <span className="breadcrumbs-separator">/</span>
            <span style={{ fontWeight: 600, color: 'var(--brand-black)' }}>Assessments</span>
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, fontFamily: 'var(--font-display)' }}>Assessments</h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--brand-dark-grey)', marginTop: '0.125rem' }}>
            Take online quizzes, unit tests, and review performance reports.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs-navigation">
        <button 
          onClick={() => setActiveTab('upcoming')} 
          className={`tab-btn ${activeTab === 'upcoming' ? 'active' : ''}`}
        >
          Upcoming ({assessments.filter(a => a.status === 'Upcoming').length})
        </button>
        <button 
          onClick={() => setActiveTab('completed')} 
          className={`tab-btn ${activeTab === 'completed' ? 'active' : ''}`}
        >
          Completed ({assessments.filter(a => a.status === 'Completed').length})
        </button>
      </div>

      {/* Grid or Table list */}
      {filteredAssessments.length === 0 ? (
        <EmptyState 
          title="No assessments found" 
          message={`You do not have any assessments in the "${activeTab}" category.`}
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
          <div className="data-table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Test Title</th>
                  <th>Course</th>
                  <th>Date & Time</th>
                  <th>Duration</th>
                  <th>Questions</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredAssessments.map((a) => (
                  <tr key={a.id}>
                    <td style={{ textAlign: 'left' }}>
                      <strong style={{ fontSize: '0.925rem' }}>{a.title}</strong>
                    </td>
                    <td style={{ textAlign: 'left' }}>{a.courseName}</td>
                    <td style={{ textAlign: 'left' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.85rem' }}>
                        <Calendar size={14} className="form-message-icon" />
                        <span>
                          {new Date(a.date).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })} at {a.time}
                        </span>
                      </div>
                    </td>
                    <td style={{ textAlign: 'left' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.85rem' }}>
                        <Clock size={14} className="form-message-icon" />
                        <span>{a.duration} Minutes</span>
                      </div>
                    </td>
                    <td style={{ textAlign: 'left' }}>{a.questionsCount} Questions</td>
                    <td style={{ textAlign: 'left' }}>
                      <span className={`badge badge-${a.status.toLowerCase()}`}>
                        {a.status}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button
                        onClick={() => navigate(`/student/assessments/${a.id}`)}
                        className="btn btn-secondary"
                        style={{ width: 'auto', padding: '0.4rem 0.85rem', fontSize: '0.8rem' }}
                      >
                        {a.status === 'Completed' ? 'View Results' : 'View Details'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </AppShell>
  );
};
export default AssessmentsList;
