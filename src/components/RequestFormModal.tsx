import React, { useState } from 'react';
import { X, Send, Paperclip } from 'lucide-react';
import type { ServiceTypeItem } from '../data/studentServices';
import type { CreateServiceRequestPayload } from '../services/studentService';
import { FormField } from './FormField';

interface RequestFormModalProps {
  service: ServiceTypeItem | null;
  services: ServiceTypeItem[];
  onClose: () => void;
  onSubmitRequest: (payload: CreateServiceRequestPayload) => void;
}

export const RequestFormModal: React.FC<RequestFormModalProps> = ({
  service,
  services,
  onClose,
  onSubmitRequest
}) => {
  const [selectedServiceId, setSelectedServiceId] = useState(service ? service.id : (services[0]?.id || 'srv-1'));
  const [subject, setSubject] = useState(service ? `${service.title} Request` : '');
  const [description, setDescription] = useState('');
  const [attachmentName, setAttachmentName] = useState('');
  const [errors, setErrors] = useState<{ subject?: string; description?: string }>({});

  const handleServiceChange = (id: string) => {
    setSelectedServiceId(id);
    const selected = services.find(s => s.id === id);
    if (selected) {
      setSubject(`${selected.title} Request`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { subject?: string; description?: string } = {};
    
    if (!subject.trim()) {
      newErrors.subject = 'Subject line is required.';
    }
    if (!description.trim()) {
      newErrors.description = 'Please provide detailed reason/description for your request.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const currentService = services.find(s => s.id === selectedServiceId);
    onSubmitRequest({
      serviceTypeId: selectedServiceId,
      requestType: currentService ? currentService.title : 'General Request',
      subject: subject.trim(),
      description: description.trim(),
      attachmentName: attachmentName.trim() || undefined
    });
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" style={{ maxWidth: '600px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span className="badge badge-active font-mono">New Request Form</span>
            <h2 className="modal-title font-display" style={{ marginTop: '0.25rem' }}>
              Submit Student Service Request
            </h2>
          </div>

          <button className="modal-close-btn" onClick={onClose} title="Close">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {/* Service Selection */}
            <div className="form-group">
              <label className="form-label">Service Type</label>
              <select
                className="form-control font-sans"
                value={selectedServiceId}
                onChange={(e) => handleServiceChange(e.target.value)}
              >
                {services.map((srv) => (
                  <option key={srv.id} value={srv.id}>
                    {srv.title} ({srv.category})
                  </option>
                ))}
              </select>
            </div>

            {/* Subject */}
            <FormField
              label="Subject / Topic"
              name="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Brief summary of your request"
              errorMessage={errors.subject}
              required
            />

            {/* Description */}
            <div className="form-group">
              <label className="form-label">
                Detailed Description <span className="text-orange">*</span>
              </label>
              <textarea
                className={`form-control font-sans ${errors.description ? 'is-invalid' : ''}`}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Provide clear reasons, course/academic details, or specific instructions for processing."
                rows={4}
              />
              {errors.description && (
                <span className="form-error-msg">{errors.description}</span>
              )}
            </div>

            {/* Supporting Document / Attachment */}
            <div className="form-group">
              <label className="form-label">Supporting Document (Optional)</label>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <input
                  type="text"
                  className="form-control font-mono"
                  value={attachmentName}
                  onChange={(e) => setAttachmentName(e.target.value)}
                  placeholder="e.g. sem6_fee_receipt.pdf or grade_card.pdf"
                />
                <button
                  type="button"
                  className="btn btn-secondary"
                  style={{ width: 'auto', padding: '0.65rem 0.85rem' }}
                  onClick={() => setAttachmentName('receipt_sample_doc.pdf')}
                  title="Simulate attachment file upload"
                >
                  <Paperclip size={16} />
                  <span>Attach</span>
                </button>
              </div>
              <span className="font-mono text-dark-grey" style={{ fontSize: '0.75rem', marginTop: '0.2rem', display: 'block' }}>
                PDF, JPG or PNG up to 5MB supported for verification.
              </span>
            </div>
          </div>

          <div className="modal-footer" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>

            <button type="submit" className="btn btn-primary">
              <Send size={16} />
              <span>Submit Request</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
