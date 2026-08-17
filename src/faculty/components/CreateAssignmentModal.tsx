import React, { useState } from 'react';
import { X, Plus, Calendar, FileText, CheckCircle2 } from 'lucide-react';
import { createAssignment } from '../../services/assignmentService';
import { mockFacultyCoursesList } from '../../services/courseService';

interface CreateAssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  defaultCourseId?: string;
}

export const CreateAssignmentModal: React.FC<CreateAssignmentModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  defaultCourseId = 'cse-601'
}) => {
  const [courseId, setCourseId] = useState(defaultCourseId);
  const [title, setTitle] = useState('');
  const [instructions, setInstructions] = useState('');
  const [deadline, setDeadline] = useState('2026-08-25T23:59');
  const [totalMarks, setTotalMarks] = useState<number>(20);
  const [attachmentName, setAttachmentName] = useState('');
  
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!title.trim()) errs.title = "Assignment title is required.";
    if (!instructions.trim()) errs.instructions = "Instructions are required.";
    if (!deadline) errs.deadline = "Due date and time are required.";
    if (totalMarks <= 0) errs.totalMarks = "Total marks must be greater than 0.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    const selectedCourse = mockFacultyCoursesList.find(c => c.id === courseId) || mockFacultyCoursesList[0];

    try {
      await createAssignment({
        title: title.trim(),
        courseId: selectedCourse.id,
        courseName: selectedCourse.name,
        deadline: new Date(deadline).toISOString(),
        marks: Number(totalMarks),
        instructions: instructions.trim(),
        resources: attachmentName.trim() ? [attachmentName.trim()] : []
      });

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
      <div className="modal-container" style={{ maxWidth: '640px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span className="badge badge-active font-mono">NEW ASSIGNMENT</span>
            <h2 className="modal-title font-display" style={{ marginTop: '0.25rem' }}>Create Assignment</h2>
          </div>
          <button className="modal-close-btn" onClick={onClose} title="Close">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Select Course *</label>
              <select 
                className="form-select font-sans"
                value={courseId} 
                onChange={(e) => setCourseId(e.target.value)}
                disabled={isSubmitting}
              >
                {mockFacultyCoursesList.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.code} — {c.name} ({c.semester}th Sem)
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Assignment Title *</label>
              <input 
                type="text" 
                className={`form-input font-sans ${errors.title ? 'is-invalid' : ''}`}
                placeholder="e.g. DBMS Assignment 05 — Transaction Management & ACID"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={isSubmitting}
              />
              {errors.title && <span className="form-error-msg">{errors.title}</span>}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Due Date & Time *</label>
                <input 
                  type="datetime-local" 
                  className={`form-input font-sans ${errors.deadline ? 'is-invalid' : ''}`}
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  disabled={isSubmitting}
                />
                {errors.deadline && <span className="form-error-msg">{errors.deadline}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Total Marks *</label>
                <input 
                  type="number" 
                  className={`form-input font-sans ${errors.totalMarks ? 'is-invalid' : ''}`}
                  value={totalMarks}
                  onChange={(e) => setTotalMarks(Number(e.target.value))}
                  min={1}
                  max={100}
                  disabled={isSubmitting}
                />
                {errors.totalMarks && <span className="form-error-msg">{errors.totalMarks}</span>}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Detailed Instructions *</label>
              <textarea 
                className={`form-input font-sans ${errors.instructions ? 'is-invalid' : ''}`}
                rows={4}
                placeholder="Describe assignment problem statement, expectations, submission format, and rubric guidelines..."
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                disabled={isSubmitting}
              />
              {errors.instructions && <span className="form-error-msg">{errors.instructions}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Resource File Attachment (Optional)</label>
              <input 
                type="text" 
                className="form-input font-sans"
                placeholder="e.g. DBMS_Assignment5_Specs.pdf"
                value={attachmentName}
                onChange={(e) => setAttachmentName(e.target.value)}
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="modal-footer" style={{ justifyContent: 'flex-end', gap: '0.75rem' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              <Plus size={16} />
              <span>{isSubmitting ? 'Posting Assignment...' : 'Post Assignment'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
