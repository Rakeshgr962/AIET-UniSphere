import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  ClipboardList, 
  Users, 
  CheckCircle2, 
  Clock, 
  Award, 
  FileText, 
  Download,
  AlertCircle
} from 'lucide-react';
import { FacultyAppShell } from '../components/FacultyAppShell';
import { StatCard } from '../../components/StatCard';
import { 
  getAssignmentById, 
  getSubmissionsForAssignment
} from '../../services/assignmentService';
import type { FacultyAssignmentSubmission } from '../../services/assignmentService';
import type { Assignment } from '../../data/assignments';
import { GradeSubmissionModal } from '../components/GradeSubmissionModal';

export const FacultyAssignmentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [submissions, setSubmissions] = useState<FacultyAssignmentSubmission[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<FacultyAssignmentSubmission | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = () => {
    Promise.all([
      getAssignmentById(id || 'assign-dbms-04'),
      getSubmissionsForAssignment(id || 'assign-dbms-04')
    ]).then(([assg, subs]) => {
      setAssignment(assg || null);
      setSubmissions(subs);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    loadData();
  }, [id]);

  if (isLoading || !assignment) {
    return (
      <FacultyAppShell>
        <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--brand-dark-grey)', fontWeight: 500 }}>
          Loading assignment details...
        </div>
      </FacultyAppShell>
    );
  }

  const evaluatedCount = submissions.filter(s => s.status === 'Graded').length;
  const pendingEvaluationCount = submissions.filter(s => s.status === 'Submitted').length;

  return (
    <FacultyAppShell>
      {/* Back Button & Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <button 
          className="btn btn-secondary" 
          style={{ width: 'auto', padding: '0.35rem 0.75rem', fontSize: '0.8rem', marginBottom: '1rem' }}
          onClick={() => navigate('/faculty/assignments')}
        >
          <ArrowLeft size={14} />
          <span>Back to Assignments</span>
        </button>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <span className="badge badge-graded">{assignment.courseId.toUpperCase()}</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--brand-dark-grey)', fontWeight: 500 }}>{assignment.courseName}</span>
            </div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 700, fontFamily: 'var(--font-display)', color: 'var(--brand-black)' }}>{assignment.title}</h1>
            <p style={{ fontSize: '0.875rem', color: 'var(--brand-dark-grey)', fontWeight: 500, marginTop: '0.1rem' }}>
              Deadline: <span style={{ fontFamily: 'monospace' }}>{new Date(assignment.deadline).toLocaleString()}</span> · Max Marks: {assignment.marks}
            </p>
          </div>
        </div>
      </div>

      {/* Submission Statistics Cards */}
      <div className="stat-cards-grid">
        <StatCard 
          title="Total Enrolled" 
          value="62" 
          icon={<Users size={20} />}
        />
        <StatCard 
          title="Submissions Received" 
          value={submissions.length.toString()} 
          icon={<FileText size={20} />}
        />
        <StatCard 
          title="Pending Evaluation" 
          value={pendingEvaluationCount.toString()} 
          icon={<Clock size={20} />}
        />
        <StatCard 
          title="Evaluated & Graded" 
          value={evaluatedCount.toString()} 
          icon={<Award size={20} />}
        />
      </div>

      {/* Overview & Instructions Card */}
      <div className="dashboard-panel" style={{ marginBottom: '1.5rem', padding: '1.25rem' }}>
        <h3 className="panel-title" style={{ fontSize: '1.05rem', marginBottom: '0.5rem' }}>Instructions & Rubric</h3>
        <p style={{ lineHeight: '1.6', fontSize: '0.875rem', color: 'var(--brand-dark-grey)', marginBottom: '1rem' }}>
          {assignment.instructions}
        </p>

        {assignment.resources && assignment.resources.length > 0 && (
          <div style={{ backgroundColor: 'var(--brand-light-grey)', padding: '0.75rem 1rem', borderRadius: 'var(--border-radius)', border: '1px solid rgba(156, 163, 175, 0.2)' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--brand-dark-grey)', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>RESOURCES</span>
            {assignment.resources.map((res, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.825rem', color: 'var(--brand-blue)', fontWeight: 500 }}>
                <Download size={14} />
                <span>{res}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Submissions Review Table */}
      <div className="dashboard-panel" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '1.25rem 1.25rem 0.5rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 className="panel-title" style={{ fontSize: '1.1rem' }}>Student Submissions</h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--brand-dark-grey)', fontWeight: 600 }}>{submissions.length} Submissions</span>
        </div>

        {submissions.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2.5rem 0', color: 'var(--brand-dark-grey)' }}>
            No submissions turned in by students yet.
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table font-sans">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>USN</th>
                  <th>Submission Date</th>
                  <th>Submitted File</th>
                  <th>Status</th>
                  <th>Score / Marks</th>
                  <th>Feedback</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((sub) => (
                  <tr key={sub.id}>
                    <td>
                      <div style={{ fontWeight: 600, color: 'var(--brand-black)' }}>{sub.studentName}</div>
                    </td>
                    <td style={{ fontSize: '0.85rem', fontFamily: 'monospace' }}>{sub.usn}</td>
                    <td style={{ fontSize: '0.8rem', fontFamily: 'monospace' }}>
                      {new Date(sub.submittedAt).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                    </td>
                    <td>
                      <a 
                        href="#download" 
                        onClick={(e) => { e.preventDefault(); alert(`Simulated download for ${sub.fileName}`); }} 
                        style={{ color: 'var(--brand-blue)', fontSize: '0.825rem', display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 500 }}
                      >
                        <FileText size={14} />
                        <span>{sub.fileName}</span>
                      </a>
                    </td>
                    <td>
                      <span className={`badge ${sub.status === 'Graded' ? 'badge-graded' : 'badge-overdue'}`} style={{ fontSize: '0.75rem' }}>
                        {sub.status}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.9rem', fontWeight: 700, fontFamily: 'monospace' }}>
                      {sub.marks !== undefined ? `${sub.marks} / ${assignment.marks}` : '—'}
                    </td>
                    <td style={{ fontSize: '0.8rem', color: 'var(--brand-dark-grey)', maxWidth: '220px' }}>
                      {sub.feedback ? (sub.feedback.length > 50 ? sub.feedback.slice(0, 50) + '...' : sub.feedback) : 'No feedback yet'}
                    </td>
                    <td>
                      <button 
                        className="btn btn-primary"
                        style={{ width: 'auto', padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}
                        onClick={() => setSelectedSubmission(sub)}
                      >
                        <Award size={14} />
                        <span>{sub.status === 'Graded' ? 'Edit Grade' : 'Grade'}</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Grade Submission Modal */}
      <GradeSubmissionModal 
        submission={selectedSubmission}
        totalMarks={assignment.marks}
        onClose={() => setSelectedSubmission(null)}
        onSuccess={() => {
          alert("Submission evaluation saved! Cross-portal student grade updated.");
          loadData();
        }}
      />
    </FacultyAppShell>
  );
};

export default FacultyAssignmentDetail;
