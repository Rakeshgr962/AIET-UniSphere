import React, { useState } from 'react';
import { X, Award, FileText, CheckCircle2 } from 'lucide-react';
import { gradeSubmission } from '../../services/assignmentService';
import type { FacultyAssignmentSubmission } from '../../services/assignmentService';

interface GradeSubmissionModalProps {
  submission: FacultyAssignmentSubmission | null;
  totalMarks: number;
  onClose: () => void;
  onSuccess: () => void;
}

export const GradeSubmissionModal: React.FC<GradeSubmissionModalProps> = ({
  submission,
  totalMarks,
  onClose,
  onSuccess
}) => {
  if (!submission) return null;

  const [marks, setMarks] = useState<number>(submission.marks !== undefined ? submission.marks : Math.floor(totalMarks * 0.85));
  const [feedback, setFeedback] = useState<string>(
    submission.feedback || "Good structure and technical clarity. All core query execution requirements were satisfied."
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (marks < 0 || marks > totalMarks) {
      setError(`Marks must be between 0 and ${totalMarks}.`);
      return;
    }

    setIsSubmitting(true);
    try {
      await gradeSubmission(submission.assignmentId, submission.id, Number(marks), feedback.trim());
      setIsSubmitting(false);
      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" style={{ maxWidth: '580px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span className="badge badge-active font-mono">SUBMISSION EVALUATION</span>
            <h2 className="modal-title font-display" style={{ marginTop: '0.25rem' }}>Grade Submission</h2>
          </div>
          <button className="modal-close-btn" onClick={onClose} title="Close">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ backgroundColor: 'var(--brand-light-grey)', padding: '0.85rem 1rem', borderRadius: 'var(--border-radius)', border: '1px solid var(--brand-border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--brand-black)' }}>{submission.studentName}</span>
                <span className="font-mono text-dark-grey" style={{ fontSize: '0.8rem' }}>{submission.usn}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--brand-dark-grey)' }}>
                <FileText size={14} className="text-blue" />
                <span>Submitted File: <strong>{submission.fileName}</strong></span>
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--brand-dark-grey)', marginTop: '0.25rem' }}>
                Submitted on: {new Date(submission.submittedAt).toLocaleString()}
              </p>
            </div>

            <div className="form-group">
              <label className="form-label">Award Marks (Max: {totalMarks}) *</label>
              <input 
                type="number" 
                className={`form-input font-sans ${error ? 'is-invalid' : ''}`}
                value={marks}
                onChange={(e) => setMarks(Number(e.target.value))}
                min={0}
                max={totalMarks}
                disabled={isSubmitting}
                required
              />
              {error && <span className="form-error-msg">{error}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Faculty Feedback & Comments</label>
              <textarea 
                className="form-input font-sans"
                rows={4}
                placeholder="Provide constructive feedback for the student..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="modal-footer" style={{ justifyContent: 'flex-end', gap: '0.75rem' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              <Award size={16} />
              <span>{isSubmitting ? 'Saving Grade...' : 'Save Grade & Feedback'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
