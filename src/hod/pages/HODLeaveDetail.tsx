import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, XCircle, FileText, User, GraduationCap, Calendar, Clock, MessageSquare, ExternalLink } from 'lucide-react';
import { HODAppShell } from '../components/HODAppShell';
import { getLeaveRequestById, approveLeaveRequest, rejectLeaveRequest } from '../../services/leaveService';
import type { LeaveRequest } from '../../data/leaveRequests';

export const HODLeaveDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [leave, setLeave] = useState<LeaveRequest | null>(null);
  const [remark, setRemark] = useState('');
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  useEffect(() => {
    const loadLeaveDetail = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const item = await getLeaveRequestById(id);
        setLeave(item);
        if (item?.remark) setRemark(item.remark);
      } catch (err) {
        console.error("Error loading leave detail:", err);
      } finally {
        setLoading(false);
      }
    };
    loadLeaveDetail();
  }, [id]);

  const handleApprove = async () => {
    if (!id || !leave) return;
    setActionLoading(true);
    try {
      const updated = await approveLeaveRequest(id, 'Dr. Sneha Reddy (HOD)', remark || 'Approved by Department Head.');
      if (updated) {
        setLeave(updated);
        setActionSuccess('Leave Request Approved successfully. Shared Leave records updated for Student/Faculty.');
      }
    } catch (err) {
      console.error("Approval error:", err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async () => {
    if (!id || !leave) return;
    if (!remark.trim()) {
      alert("Please provide an HOD remark detailing the reason for rejection.");
      return;
    }
    setActionLoading(true);
    try {
      const updated = await rejectLeaveRequest(id, 'Dr. Sneha Reddy (HOD)', remark);
      if (updated) {
        setLeave(updated);
        setActionSuccess('Leave Request Rejected. Status updated across all portals.');
      }
    } catch (err) {
      console.error("Rejection error:", err);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <HODAppShell>
        <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--brand-dark-grey)' }}>
          Loading Leave Application Details...
        </div>
      </HODAppShell>
    );
  }

  if (!leave) {
    return (
      <HODAppShell>
        <div className="dashboard-panel" style={{ textAlign: 'center', padding: '3rem' }}>
          <h2>Leave Record Not Found</h2>
          <button onClick={() => navigate('/hod/leave')} className="btn btn-primary" style={{ marginTop: '1rem' }}>
            Back to Leave Management
          </button>
        </div>
      </HODAppShell>
    );
  }

  return (
    <HODAppShell>
      {/* Back Link & Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <button 
          onClick={() => navigate('/hod/leave')}
          className="btn-link font-sans"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', marginBottom: '0.75rem', cursor: 'pointer', border: 'none', background: 'none', color: 'var(--brand-blue)' }}
        >
          <ArrowLeft size={16} />
          <span>Back to Leave Management</span>
        </button>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <span className="badge badge-active font-mono">{leave.id}</span>
              <span className={`badge ${leave.status === 'Approved' ? 'badge-active' : leave.status === 'Pending' ? 'badge-pending' : 'badge-overdue'}`}>
                {leave.status}
              </span>
            </div>
            <h1 className="font-display" style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--brand-black)', margin: 0 }}>
              {leave.leaveType} Application
            </h1>
            <p style={{ fontSize: '0.9rem', color: 'var(--brand-dark-grey)', marginTop: '0.2rem' }}>
              Submitted on {leave.submittedAt}
            </p>
          </div>
        </div>
      </div>

      {actionSuccess && (
        <div className="dashboard-panel" style={{ backgroundColor: '#F0FDF4', border: '1px solid #86EFAC', padding: '1rem 1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <CheckCircle2 size={20} style={{ color: '#16A34A' }} />
          <div style={{ color: '#15803D', fontWeight: 600, fontSize: '0.9rem' }}>{actionSuccess}</div>
        </div>
      )}

      {/* Main Grid: Details + Approval Actions */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', marginBottom: '1.75rem' }}>
        
        {/* Left Column: Requester & Application Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Requester Header Card */}
          <div className="dashboard-panel">
            <h2 className="panel-title font-display" style={{ marginBottom: '1rem' }}>Requester Information</h2>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(156, 163, 175, 0.2)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: leave.requesterRole === 'FACULTY' ? 'var(--brand-blue)' : 'var(--brand-orange)', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '1.1rem' }}>
                {leave.requesterRole === 'FACULTY' ? <User size={24} /> : <GraduationCap size={24} />}
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--brand-black)', margin: 0 }}>
                  {leave.requesterName}
                </h3>
                <div style={{ fontSize: '0.85rem', color: 'var(--brand-dark-grey)', marginTop: '0.15rem' }}>
                  <span className="font-mono">{leave.requesterUsnOrEmpId}</span> · Role: <strong>{leave.requesterRole}</strong>
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem', fontSize: '0.875rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--brand-dark-grey)', textTransform: 'uppercase' }}>DEPARTMENT</span>
                <div style={{ fontWeight: 600, color: 'var(--brand-black)', marginTop: '0.2rem' }}>CSE — Data Science</div>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--brand-dark-grey)', textTransform: 'uppercase' }}>LEAVE TYPE</span>
                <div style={{ fontWeight: 600, color: 'var(--brand-blue)', marginTop: '0.2rem' }}>{leave.leaveType}</div>
              </div>
            </div>
          </div>

          {/* Leave Application Details Card */}
          <div className="dashboard-panel">
            <h2 className="panel-title font-display" style={{ marginBottom: '1rem' }}>Application Details</h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1.25rem', backgroundColor: 'var(--brand-light-grey)', padding: '1rem', borderRadius: 'var(--border-radius)' }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--brand-dark-grey)', textTransform: 'uppercase' }}>START DATE</span>
                <div style={{ fontWeight: 700, color: 'var(--brand-black)', marginTop: '0.2rem' }} className="font-mono">{leave.startDate}</div>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--brand-dark-grey)', textTransform: 'uppercase' }}>END DATE</span>
                <div style={{ fontWeight: 700, color: 'var(--brand-black)', marginTop: '0.2rem' }} className="font-mono">{leave.endDate}</div>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--brand-dark-grey)', textTransform: 'uppercase' }}>DURATION</span>
                <div style={{ fontWeight: 800, color: 'var(--brand-orange)', marginTop: '0.2rem' }}>{leave.days} Days</div>
              </div>
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--brand-dark-grey)', textTransform: 'uppercase', display: 'block', marginBottom: '0.35rem' }}>REASON FOR LEAVE</span>
              <div style={{ padding: '0.85rem', backgroundColor: '#F8FAFC', borderRadius: 'var(--border-radius)', border: '1px solid rgba(156, 163, 175, 0.2)', fontSize: '0.9rem', color: 'var(--brand-black)', lineHeight: 1.5 }}>
                {leave.reason}
              </div>
            </div>

            {leave.supportingDocument && (
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--brand-dark-grey)', textTransform: 'uppercase', display: 'block', marginBottom: '0.35rem' }}>ATTACHED DOCUMENT</span>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 0.85rem', backgroundColor: 'var(--brand-light-grey)', borderRadius: 'var(--border-radius)', fontSize: '0.85rem', color: 'var(--brand-blue)', fontWeight: 600 }}>
                  <FileText size={16} />
                  <span>{leave.supportingDocument}</span>
                  <ExternalLink size={14} style={{ cursor: 'pointer' }} onClick={() => alert(`Opening attachment ${leave.supportingDocument}`)} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Approval Timeline & HOD Decision Box */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Approval Timeline Card */}
          <div className="dashboard-panel">
            <h2 className="panel-title font-display" style={{ marginBottom: '1rem' }}>Approval Workflow</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', position: 'relative' }}>
              
              {/* Timeline Step 1: Submission */}
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'var(--color-success)', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem' }}>
                  <CheckCircle2 size={16} />
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--brand-black)' }}>Application Submitted</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--brand-dark-grey)' }}>{leave.submittedAt}</div>
                </div>
              </div>

              {/* Timeline Step 2: Faculty Advisor Review */}
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'var(--color-success)', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem' }}>
                  <CheckCircle2 size={16} />
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--brand-black)' }}>Faculty Advisor Review</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--brand-dark-grey)' }}>Verified & Forwarded</div>
                </div>
              </div>

              {/* Timeline Step 3: HOD Governance */}
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: leave.status === 'Approved' ? 'var(--color-success)' : leave.status === 'Rejected' ? 'var(--color-error)' : 'var(--brand-orange)', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem' }}>
                  {leave.status === 'Approved' ? <CheckCircle2 size={16} /> : leave.status === 'Rejected' ? <XCircle size={16} /> : <Clock size={16} />}
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--brand-black)' }}>HOD Final Review</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--brand-dark-grey)' }}>
                    {leave.status === 'Pending' ? 'Action Required' : `${leave.status} by ${leave.reviewedBy || 'HOD'}`}
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* HOD Action Card */}
          <div className="dashboard-panel" style={{ borderTop: leave.status === 'Pending' ? '3px solid var(--brand-orange)' : '1px solid rgba(156, 163, 175, 0.2)' }}>
            <h2 className="panel-title font-display" style={{ marginBottom: '0.75rem' }}>HOD Governance Action</h2>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--brand-dark-grey)', display: 'block', marginBottom: '0.35rem' }}>
                HOD REMARKS / APPROVAL REASON
              </label>
              <textarea 
                className="form-input font-sans"
                style={{ width: '100%', height: '80px', padding: '0.55rem', fontSize: '0.85rem', resize: 'vertical' }}
                placeholder="Enter remarks or approval reason..."
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
                disabled={actionLoading}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <button 
                onClick={handleApprove}
                disabled={actionLoading}
                className="btn btn-primary font-sans"
                style={{ width: '100%', backgroundColor: 'var(--color-success)', borderColor: 'var(--color-success)', justifyContent: 'center' }}
              >
                <CheckCircle2 size={16} />
                <span>{actionLoading ? 'Processing...' : 'Approve Leave Request'}</span>
              </button>

              <button 
                onClick={handleReject}
                disabled={actionLoading}
                className="btn btn-secondary font-sans text-error"
                style={{ width: '100%', borderColor: 'var(--color-error)', justifyContent: 'center' }}
              >
                <XCircle size={16} />
                <span>Reject Leave Request</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </HODAppShell>
  );
};

export default HODLeaveDetail;
