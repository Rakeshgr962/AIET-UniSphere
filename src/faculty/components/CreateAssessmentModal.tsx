import React, { useState } from 'react';
import { X, Plus, Award } from 'lucide-react';
import { createAssessment } from '../../services/assessmentService';
import { mockFacultyCoursesList } from '../../services/courseService';

interface CreateAssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  defaultCourseId?: string;
}

export const CreateAssessmentModal: React.FC<CreateAssessmentModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  defaultCourseId = 'cse-601'
}) => {
  const [courseId, setCourseId] = useState(defaultCourseId);
  const [title, setTitle] = useState('');
  const [instructions, setInstructions] = useState('');
  const [date, setDate] = useState('2026-08-25');
  const [time, setTime] = useState('10:00 AM');
  const [duration, setDuration] = useState<number>(60);
  const [totalMarks, setTotalMarks] = useState<number>(50);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!title.trim()) errs.title = "Assessment title is required.";
    if (!instructions.trim()) errs.instructions = "Instructions are required.";
    if (!date) errs.date = "Test date is required.";
    if (duration <= 0) errs.duration = "Duration must be greater than 0.";
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
      await createAssessment({
        title: title.trim(),
        courseId: selectedCourse.id,
        courseCode: selectedCourse.code,
        courseName: selectedCourse.name,
        semester: selectedCourse.semester,
        date: date,
        dueDate: date,
        time: time,
        duration: Number(duration),
        totalMarks: Number(totalMarks),
        instructions: instructions.trim()
      });

      setIsSubmitting(false);
      onSuccess();
      onClose();
    } catch (err) {
      console.error("Failed to create assessment", err);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" style={{ maxWidth: '640px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span className="badge badge-active font-mono">NEW TEST / ASSESSMENT</span>
            <h2 className="modal-title font-display" style={{ marginTop: '0.25rem' }}>Create Assessment</h2>
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
              <label className="form-label">Assessment Title *</label>
              <input 
                type="text" 
                className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                placeholder="e.g. DBMS Unit Test 01 — SQL & Relational Algebra"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={isSubmitting}
              />
              {errors.title && <span className="form-error-msg">{errors.title}</span>}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Test Date *</label>
                <input 
                  type="date" 
                  className={`form-control ${errors.date ? 'is-invalid' : ''}`}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  disabled={isSubmitting}
                />
                {errors.date && <span className="form-error-msg">{errors.date}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Start Time</label>
                <input 
                  type="text" 
                  className="form-control"
                  placeholder="e.g. 10:00 AM"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Duration (Minutes) *</label>
                <input 
                  type="number" 
                  className={`form-control ${errors.duration ? 'is-invalid' : ''}`}
                  placeholder="60"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  disabled={isSubmitting}
                />
                {errors.duration && <span className="form-error-msg">{errors.duration}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Total Marks *</label>
                <input 
                  type="number" 
                  className={`form-control ${errors.totalMarks ? 'is-invalid' : ''}`}
                  placeholder="50"
                  value={totalMarks}
                  onChange={(e) => setTotalMarks(Number(e.target.value))}
                  disabled={isSubmitting}
                />
                {errors.totalMarks && <span className="form-error-msg">{errors.totalMarks}</span>}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Detailed Instructions *</label>
              <textarea 
                className={`form-control ${errors.instructions ? 'is-invalid' : ''}`}
                rows={4}
                placeholder="Specify test guidelines, topics covered, allowed resources, and grading criteria..."
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                disabled={isSubmitting}
              />
              {errors.instructions && <span className="form-error-msg">{errors.instructions}</span>}
            </div>
          </div>

          <div className="modal-footer" style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              <Plus size={16} />
              <span>{isSubmitting ? 'Creating...' : 'Post Assessment'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
