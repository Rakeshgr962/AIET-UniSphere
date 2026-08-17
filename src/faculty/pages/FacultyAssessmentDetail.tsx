import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Award, Clock, Calendar, CheckCircle2, FileText, Users, AlertCircle } from 'lucide-react';
import { FacultyAppShell } from '../components/FacultyAppShell';
import { StatCard } from '../../components/StatCard';
import { getAssessmentById } from '../../services/assessmentService';
import type { Assessment } from '../../data/assessments';

export const FacultyAssessmentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getAssessmentById(id).then(res => {
        setAssessment(res || null);
        setIsLoading(false);
      });
    }
  }, [id]);

  if (isLoading) {
    return (
      <FacultyAppShell>
        <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--brand-dark-grey)' }}>
          Loading assessment details...
        </div>
      </FacultyAppShell>
    );
  }

  if (!assessment) {
    return (
      <FacultyAppShell>
        <div className="dashboard-panel" style={{ textAlign: 'center', padding: '3rem 1.5rem' }}>
          <AlertCircle size={40} style={{ color: 'var(--brand-orange)', margin: '0 auto 0.75rem auto' }} />
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Assessment Not Found</h3>
          <p style={{ color: 'var(--brand-dark-grey)', marginTop: '0.25rem', fontSize: '0.9rem' }}>
            The requested test assessment does not exist or has been moved.
          </p>
          <button 
            className="btn btn-secondary" 
            style={{ marginTop: '1.25rem', width: 'auto', marginInline: 'auto' }}
            onClick={() => navigate('/faculty/assessments')}
          >
            <ArrowLeft size={16} />
            <span>Back to Assessments</span>
          </button>
        </div>
      </FacultyAppShell>
    );
  }

  return (
    <FacultyAppShell>
      {/* Back Button & Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <button 
          onClick={() => navigate('/faculty/assessments')} 
          className="btn btn-secondary"
          style={{ width: 'auto', padding: '0.4rem 0.75rem', fontSize: '0.825rem', marginBottom: '1rem' }}
        >
          <ArrowLeft size={14} />
          <span>Back to Assessment List</span>
        </button>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span className="badge badge-active font-mono">{assessment.courseCode || assessment.courseId}</span>
            <h1 className="font-display" style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--brand-black)', marginTop: '0.25rem', marginBottom: 0 }}>
              {assessment.title}
            </h1>
            <p style={{ fontSize: '0.9rem', color: 'var(--brand-dark-grey)', marginTop: '0.2rem' }}>
              {assessment.courseName} • Semester {assessment.semester || 6}
            </p>
          </div>

          <span className={`badge ${assessment.status === 'Graded' || assessment.status === 'Completed' ? 'badge-active' : assessment.status === 'Active' ? 'badge-pending' : 'badge-overdue'}`} style={{ fontSize: '0.85rem', padding: '0.4rem 0.85rem' }}>
            {assessment.status}
          </span>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="stat-cards-grid" style={{ marginBottom: '1.75rem' }}>
        <StatCard
          title="TOTAL MARKS"
          value={`${assessment.totalMarks || 50} Marks`}
          subtitle="Maximum Test Score"
          icon={<Award size={22} />}
        />
        <StatCard
          title="DURATION"
          value={`${assessment.duration || assessment.durationMinutes} Mins`}
          subtitle="Allotted Time Limit"
          icon={<Clock size={22} />}
        />
        <StatCard
          title="TEST DATE"
          value={assessment.date || assessment.dueDate || 'N/A'}
          subtitle={`Scheduled Time: ${assessment.time}`}
          icon={<Calendar size={22} />}
        />
        <StatCard
          title="QUESTIONS"
          value={assessment.questionsCount || (assessment.questions ? assessment.questions.length : 0)}
          subtitle="Questions Formatted"
          icon={<FileText size={22} />}
        />
      </div>

      {/* Overview & Instructions */}
      <div className="dashboard-panel" style={{ marginBottom: '1.75rem' }}>
        <h2 className="panel-title font-display" style={{ marginBottom: '0.75rem' }}>Assessment Instructions & Guidelines</h2>
        <div style={{ backgroundColor: 'var(--brand-light-grey)', padding: '1.25rem', borderRadius: 'var(--border-radius)', fontSize: '0.9rem', color: 'var(--brand-black)', lineHeight: 1.6 }}>
          {assessment.instructions || "No specific instructions specified for this assessment."}
        </div>
      </div>

      {/* Question Preview Section */}
      <div className="dashboard-panel">
        <h2 className="panel-title font-display" style={{ marginBottom: '1rem' }}>Test Questions Preview</h2>
        
        {assessment.questions && assessment.questions.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {assessment.questions.map((q, idx) => (
              <div 
                key={q.id} 
                style={{ 
                  padding: '1.25rem', 
                  backgroundColor: 'var(--brand-light-grey)', 
                  borderRadius: 'var(--border-radius)',
                  border: '1px solid rgba(156, 163, 175, 0.2)' 
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontWeight: 700 }}>
                  <span>Q{idx + 1}. {q.text}</span>
                  <span className="badge badge-graded font-mono">{q.marks} Marks</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginTop: '0.75rem' }}>
                  {q.options.map((opt, oIdx) => (
                    <div 
                      key={oIdx} 
                      style={{ 
                        padding: '0.5rem 0.75rem', 
                        borderRadius: '4px',
                        backgroundColor: oIdx === q.correctOptionIndex ? 'rgba(34, 197, 94, 0.12)' : '#FFF',
                        border: oIdx === q.correctOptionIndex ? '1px solid var(--color-success)' : '1px solid rgba(156, 163, 175, 0.2)',
                        fontSize: '0.85rem',
                        fontWeight: oIdx === q.correctOptionIndex ? 600 : 400
                      }}
                    >
                      {String.fromCharCode(65 + oIdx)}. {opt} {oIdx === q.correctOptionIndex && '(Correct)'}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--brand-dark-grey)', backgroundColor: 'var(--brand-light-grey)', borderRadius: 'var(--border-radius)' }}>
            <FileText size={32} style={{ margin: '0 auto 0.5rem', color: '#94A3B8' }} />
            <p style={{ fontWeight: 600, margin: 0 }}>Multiple choice & objective questions can be formatted in online test module.</p>
          </div>
        )}
      </div>
    </FacultyAppShell>
  );
};

export default FacultyAssessmentDetail;
