import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  FileText, 
  CheckCircle2, 
  XCircle
} from 'lucide-react';
import { getAssessmentById } from '../services/assessmentService';
import { AppShell } from '../components/AppShell';
import { LoadingState } from '../components/LoadingState';
import { ErrorState } from '../components/ErrorState';

export const AssessmentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [assessment, setAssessment] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAssessmentData = async () => {
    if (!id) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await getAssessmentById(id);
      if (!data) {
        setError("Assessment not found.");
        return;
      }
      setAssessment(data);
    } catch (err) {
      setError("Unable to load assessment details. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAssessmentData();
  }, [id]);

  if (isLoading) {
    return (
      <AppShell>
        <LoadingState message="Loading assessment data..." />
      </AppShell>
    );
  }

  if (error || !assessment) {
    return (
      <AppShell>
        <ErrorState message={error || "Failed to load assessment details"} onRetry={fetchAssessmentData} />
      </AppShell>
    );
  }

  const isCompleted = assessment.status === 'Completed';

  return (
    <AppShell>
      {/* Back button */}
      <div style={{ textAlign: 'left', marginBottom: '1.25rem' }}>
        <button 
          onClick={() => navigate('/student/assessments')}
          className="btn btn-secondary"
          style={{ width: 'auto', padding: '0.4rem 0.85rem', fontSize: '0.825rem', gap: '0.35rem' }}
        >
          <ArrowLeft size={14} />
          Back to Assessments
        </button>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'left' }}>
        
        {/* COMPLETED ASSESSMENT RESULT VIEW */}
        {isCompleted && assessment.result ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Header */}
            <div className="dashboard-panel">
              <span className="course-code-badge">{assessment.courseName}</span>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 700, fontFamily: 'var(--font-display)', marginTop: '0.5rem' }}>
                {assessment.title} — Performance Report
              </h1>
              <p style={{ fontSize: '0.85rem', color: 'var(--brand-dark-grey)', marginTop: '0.25rem' }}>
                Completed on {new Date(assessment.date).toLocaleDateString()}
              </p>
            </div>

            {/* Scores summary */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.25rem' }}>
              
              <div className="stat-card" style={{ textAlign: 'center', justifyContent: 'center' }}>
                <span className="stat-card-title" style={{ display: 'block', margin: '0 auto' }}>Score Awarded</span>
                <span className="stat-card-value" style={{ color: 'var(--brand-blue)', fontSize: '2.25rem' }}>
                  {assessment.result.score} <span style={{ fontSize: '1rem', color: 'var(--brand-dark-grey)' }}>/ {assessment.questionsCount}</span>
                </span>
              </div>

              <div className="stat-card" style={{ textAlign: 'center', justifyContent: 'center' }}>
                <span className="stat-card-title" style={{ display: 'block', margin: '0 auto' }}>Percentage</span>
                <span className="stat-card-value" style={{ color: 'var(--brand-orange)', fontSize: '2.25rem' }}>
                  {assessment.result.percentage}%
                </span>
              </div>

              <div className="stat-card" style={{ textAlign: 'center', justifyContent: 'center' }}>
                <span className="stat-card-title" style={{ display: 'block', margin: '0 auto' }}>Breakdown</span>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '0.25rem' }}>
                  <span style={{ fontSize: '0.85rem', color: '#047857', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                    <CheckCircle2 size={14} /> {assessment.result.correctCount} Correct
                  </span>
                  <span style={{ fontSize: '0.85rem', color: '#b91c1c', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                    <XCircle size={14} /> {assessment.result.incorrectCount} Incorrect
                  </span>
                </div>
              </div>

            </div>

            {/* Topic breakdowns */}
            <div className="dashboard-panel">
              <h3 className="panel-title">Performance by Syllabus Topic</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {assessment.result.topicPerformance.map((topic: any, idx: number) => (
                  <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                      <span style={{ fontWeight: 600 }}>{topic.topic}</span>
                      <span style={{ color: 'var(--brand-blue)', fontWeight: 700 }}>{topic.score}% Mastery</span>
                    </div>
                    <div className="progress-bar-bg">
                      <div 
                        className="progress-bar-fill" 
                        style={{ 
                          width: `${topic.score}%`, 
                          backgroundColor: topic.score >= 80 ? 'var(--color-success)' : 'var(--brand-orange)' 
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button 
              onClick={() => navigate('/student/assessments')}
              className="btn btn-secondary"
            >
              Return to Assessments
            </button>
          </div>
        ) : (
          
          /* UPCOMING ASSESSMENT DETAILS VIEW */
          <div className="dashboard-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <span className="course-code-badge">{assessment.courseName}</span>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 700, fontFamily: 'var(--font-display)', marginTop: '0.5rem' }}>
                {assessment.title}
              </h1>
            </div>

            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', borderTop: '1px solid rgba(156, 163, 175, 0.1)', borderBottom: '1px solid rgba(156, 163, 175, 0.1)', padding: '1.25rem 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Calendar size={20} style={{ color: 'var(--brand-blue)' }} />
                <div>
                  <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--brand-dark-grey)' }}>Date & Time</span>
                  <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{assessment.date} at {assessment.time}</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Clock size={20} style={{ color: 'var(--brand-blue)' }} />
                <div>
                  <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--brand-dark-grey)' }}>Duration</span>
                  <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{assessment.duration} Minutes</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FileText size={20} style={{ color: 'var(--brand-blue)' }} />
                <div>
                  <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--brand-dark-grey)' }}>Questions</span>
                  <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{assessment.questionsCount} MCQs</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="panel-title" style={{ marginBottom: '0.5rem' }}>Instructions</h3>
              <p style={{ fontSize: '0.9rem', lineHeight: '1.6', color: 'var(--brand-dark-grey)' }}>
                {assessment.instructions}
              </p>
            </div>

            <div 
              style={{ 
                backgroundColor: 'rgba(255, 79, 24, 0.02)', 
                border: '1px solid rgba(255, 79, 24, 0.15)', 
                padding: '1rem', 
                borderRadius: 'var(--border-radius)',
                fontSize: '0.85rem',
                color: 'var(--brand-black)'
              }}
            >
              ⚠️ <strong>Important Note:</strong> Once you click "Start Assessment", the timer will begin. Closing the tab or navigating away will not pause the timer. Make sure you are in a quiet environment.
            </div>

            <button 
              onClick={() => navigate(`/student/assessments/${assessment.id}/attempt`)}
              className="btn btn-primary"
              style={{ backgroundColor: 'var(--brand-orange)', marginTop: '0.5rem' }}
            >
              Start Assessment
            </button>
          </div>
        )}

      </div>
    </AppShell>
  );
};
export default AssessmentDetail;
