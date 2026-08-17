import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Building2, ArrowLeft, Users, ShieldCheck, BookOpen, Layers, CheckCircle2, UserCheck } from 'lucide-react';
import { AdminAppShell } from '../components/AdminAppShell';
import { mockDepartmentsList } from '../data/departments';
import { mockFacultyRoster } from '../../data/faculty';

export const DepartmentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const dept = mockDepartmentsList.find(d => d.id === id || d.code.toLowerCase() === (id || '').toLowerCase()) || mockDepartmentsList[0];
  const facultyMembers = mockFacultyRoster.filter(f => f.departmentId === dept.id || dept.id === 'dept-ds');

  return (
    <AdminAppShell>
      {/* Header Banner */}
      <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <button onClick={() => navigate('/admin/organization')} className="btn btn-secondary" style={{ padding: '0.4rem 0.6rem' }}>
          <ArrowLeft size={16} />
        </button>
        <div>
          <span className="badge badge-active font-mono" style={{ backgroundColor: 'var(--brand-black)', color: '#FFF' }}>DEPARTMENT PROFILE</span>
          <h1 className="font-display" style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--brand-black)', marginTop: '0.25rem', marginBottom: 0 }}>
            {dept.name} ({dept.code})
          </h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--brand-dark-grey)', marginTop: '0.1rem' }}>
            HOD: <strong>{dept.hodName}</strong> · Total Students: <strong className="font-mono text-blue">{dept.studentCount}</strong>
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', marginBottom: '1.75rem' }}>
        
        {/* Faculty Roster in Department */}
        <div className="dashboard-panel" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid rgba(156, 163, 175, 0.2)' }}>
            <h2 className="panel-title font-display" style={{ margin: 0 }}>Assigned Faculty Roster ({facultyMembers.length})</h2>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--brand-light-grey)', borderBottom: '1px solid rgba(156, 163, 175, 0.2)', color: 'var(--brand-black)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.75rem' }}>
                  <th style={{ padding: '0.85rem 1.25rem' }}>Faculty Name</th>
                  <th style={{ padding: '0.85rem 1.25rem' }}>Designation</th>
                  <th style={{ padding: '0.85rem 1.25rem' }}>Assigned Courses</th>
                  <th style={{ padding: '0.85rem 1.25rem' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {facultyMembers.map((f) => (
                  <tr key={f.id} style={{ borderBottom: '1px solid rgba(156, 163, 175, 0.15)' }}>
                    <td style={{ padding: '0.85rem 1.25rem' }}>
                      <div style={{ fontWeight: 700, color: 'var(--brand-black)' }}>{f.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--brand-dark-grey)' }}>{f.email}</div>
                    </td>
                    <td style={{ padding: '0.85rem 1.25rem', fontWeight: 600 }}>{f.designation}</td>
                    <td style={{ padding: '0.85rem 1.25rem' }} className="font-mono font-bold">{f.assignedCourses.length} Courses</td>
                    <td style={{ padding: '0.85rem 1.25rem' }}>
                      <span className={`badge ${f.status === 'Active' ? 'badge-active' : 'badge-pending'}`}>{f.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sections Roster Panel */}
        <div className="dashboard-panel">
          <h2 className="panel-title font-display" style={{ marginBottom: '1rem' }}>Active Sections</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {dept.sections.map((s, idx) => (
              <div key={idx} style={{ padding: '0.85rem', backgroundColor: 'var(--brand-light-grey)', borderRadius: 'var(--border-radius)', border: '1px solid rgba(156, 163, 175, 0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--brand-black)' }}>Semester {s.semester}</div>
                  <span className="badge badge-active font-mono font-bold">{s.section}</span>
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--brand-blue)' }} className="font-mono">
                  {s.studentCount} Students
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </AdminAppShell>
  );
};

export default DepartmentDetail;
