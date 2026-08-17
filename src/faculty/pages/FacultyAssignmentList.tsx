import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipboardList, Plus, Search, Filter, ArrowRight, FileText, CheckCircle2, Clock } from 'lucide-react';
import { FacultyAppShell } from '../components/FacultyAppShell';
import { getFacultyAssignments } from '../../services/assignmentService';
import type { Assignment } from '../../data/assignments';
import { CreateAssignmentModal } from '../components/CreateAssignmentModal';

export const FacultyAssignmentList: React.FC = () => {
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [activeTab, setActiveTab] = useState<'Active' | 'Draft' | 'Closed' | 'Pending'>('Active');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    getFacultyAssignments().then((res) => {
      setAssignments(res);
      setIsLoading(false);
    });
  }, []);

  const filteredAssignments = assignments.filter(assg => {
    const matchesSearch = assg.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          assg.courseName.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'Active') return matchesSearch && (assg.status === 'Pending' || assg.status === 'Submitted');
    if (activeTab === 'Closed') return matchesSearch && (assg.status === 'Graded' || assg.status === 'Overdue');
    if (activeTab === 'Pending') return matchesSearch && assg.status === 'Submitted';
    return matchesSearch;
  });

  return (
    <FacultyAppShell>
      {/* Page Title Header */}
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, fontFamily: 'var(--font-display)', color: 'var(--brand-black)' }}>
            Assignment Management
          </h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--brand-dark-grey)', fontWeight: 500, marginTop: '0.2rem' }}>
            Create coursework, review student submissions, evaluate deliverables, and record grades.
          </p>
        </div>

        <button className="btn btn-primary" onClick={() => setIsCreateModalOpen(true)}>
          <Plus size={16} />
          <span>Create Assignment</span>
        </button>
      </div>

      {/* Tabs & Search Bar */}
      <div className="dashboard-panel" style={{ marginBottom: '1.5rem', padding: '1rem 1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {(['Active', 'Pending', 'Closed', 'Draft'] as const).map(tab => (
              <button
                key={tab}
                className={`btn ${activeTab === tab ? 'btn-primary' : 'btn-secondary'}`}
                style={{ width: 'auto', padding: '0.4rem 0.85rem', fontSize: '0.85rem' }}
                onClick={() => setActiveTab(tab)}
              >
                {tab === 'Active' && <Clock size={15} />}
                {tab === 'Pending' && <ClipboardList size={15} />}
                {tab === 'Closed' && <CheckCircle2 size={15} />}
                <span>{tab}</span>
              </button>
            ))}
          </div>

          <div className="header-search" style={{ minWidth: '240px', width: 'auto' }}>
            <Search size={16} className="header-search-icon" />
            <input 
              type="text" 
              placeholder="Search assignments..."
              className="header-search-input"
              style={{ width: '100%' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Assignments Table / List */}
      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--brand-dark-grey)', fontWeight: 500 }}>
          Loading assignments...
        </div>
      ) : filteredAssignments.length === 0 ? (
        <div className="dashboard-panel" style={{ textAlign: 'center', padding: '3rem 1.5rem' }}>
          <ClipboardList size={40} style={{ color: 'var(--brand-dark-grey)', margin: '0 auto 0.75rem auto' }} />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>No Assignments in "{activeTab}"</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--brand-dark-grey)', marginTop: '0.25rem' }}>
            Try selecting a different tab filter or create a new assignment.
          </p>
        </div>
      ) : (
        <div className="dashboard-panel" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="table-responsive">
            <table className="table font-sans">
              <thead>
                <tr>
                  <th>Assignment Title</th>
                  <th>Course</th>
                  <th>Deadline</th>
                  <th>Total Marks</th>
                  <th>Submissions</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredAssignments.map((assg) => (
                  <tr key={assg.id}>
                    <td>
                      <div style={{ fontWeight: 600, color: 'var(--brand-black)' }}>{assg.title}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--brand-dark-grey)' }}>{assg.instructions.slice(0, 50)}...</div>
                    </td>
                    <td>
                      <span className="badge badge-secondary" style={{ fontSize: '0.75rem' }}>{assg.courseId.toUpperCase()}</span>
                      <div style={{ fontSize: '0.8rem', fontWeight: 600, marginTop: '0.15rem', color: 'var(--brand-black)' }}>{assg.courseName}</div>
                    </td>
                    <td style={{ fontSize: '0.825rem', fontFamily: 'monospace' }}>
                      {new Date(assg.deadline).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                    </td>
                    <td style={{ fontSize: '0.9rem', fontWeight: 700, fontFamily: 'monospace' }}>{assg.marks}</td>
                    <td style={{ fontSize: '0.85rem', fontFamily: 'monospace' }}>
                      {assg.status === 'Submitted' || assg.status === 'Graded' ? '18 / 62' : '3 / 62'}
                    </td>
                    <td>
                      <span className={`badge ${
                        assg.status === 'Graded' ? 'badge-graded' :
                        assg.status === 'Submitted' ? 'badge-overdue' : 'badge-pending'
                      }`} style={{ fontSize: '0.75rem' }}>
                        {assg.status === 'Submitted' ? 'Evaluation Pending' : assg.status}
                      </span>
                    </td>
                    <td>
                      <button 
                        className="btn btn-primary"
                        style={{ width: 'auto', padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}
                        onClick={() => navigate(`/faculty/assignments/${assg.id}`)}
                      >
                        <span>Open &amp; Grade</span>
                        <ArrowRight size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create Assignment Modal */}
      <CreateAssignmentModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={() => {
          alert("Assignment posted! State synchronized.");
          getFacultyAssignments().then(setAssignments);
        }}
      />
    </FacultyAppShell>
  );
};

export default FacultyAssignmentList;
