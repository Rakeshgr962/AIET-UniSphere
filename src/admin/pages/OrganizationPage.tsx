import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Layers, Users, ShieldCheck, Eye, Plus, CheckCircle2, ArrowRight } from 'lucide-react';
import { AdminAppShell } from '../components/AdminAppShell';
import { mockDepartmentsList } from '../data/departments';
import type { DepartmentItem } from '../../shared/types/department';

export const OrganizationPage: React.FC = () => {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState<DepartmentItem[]>(mockDepartmentsList);
  const [activeTab, setActiveTab] = useState<'departments' | 'sections'>('departments');

  return (
    <AdminAppShell>
      {/* Header Banner */}
      <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span className="badge badge-active font-mono" style={{ backgroundColor: 'var(--brand-black)', color: '#FFF' }}>ORGANIZATION MANAGEMENT</span>
          <h1 className="font-display" style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--brand-black)', marginTop: '0.25rem', marginBottom: 0 }}>
            Departments, HOD & Section Governance
          </h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--brand-dark-grey)', marginTop: '0.2rem' }}>
            Institutional Structure, Department Heads & Section Allocation Matrix
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', backgroundColor: 'var(--brand-light-grey)', padding: '0.25rem', borderRadius: 'var(--border-radius)', border: '1px solid rgba(156, 163, 175, 0.2)' }}>
          <button 
            onClick={() => setActiveTab('departments')}
            className={`btn ${activeTab === 'departments' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ fontSize: '0.8rem', padding: '0.35rem 0.85rem' }}
          >
            Departments ({departments.length})
          </button>
          <button 
            onClick={() => setActiveTab('sections')}
            className={`btn ${activeTab === 'sections' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ fontSize: '0.8rem', padding: '0.35rem 0.85rem' }}
          >
            Sections Matrix
          </button>
        </div>
      </div>

      {activeTab === 'departments' ? (
        /* Departments List Grid */
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {departments.map((dept) => (
            <div key={dept.id} className="dashboard-panel" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.85rem' }}>
                  <div>
                    <span className="badge badge-active font-mono font-bold" style={{ fontSize: '0.8rem' }}>{dept.code}</span>
                    <h3 className="font-display" style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--brand-black)', marginTop: '0.25rem', marginBottom: 0 }}>
                      {dept.name}
                    </h3>
                  </div>
                  <span className="badge badge-active">{dept.status}</span>
                </div>

                <div style={{ backgroundColor: 'var(--brand-light-grey)', padding: '0.85rem', borderRadius: 'var(--border-radius)', marginBottom: '1rem', fontSize: '0.85rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--brand-dark-grey)', textTransform: 'uppercase' }}>DEPARTMENT HEAD (HOD)</span>
                  <div style={{ fontWeight: 700, color: 'var(--brand-black)', marginTop: '0.15rem' }}>{dept.hodName}</div>
                  <div style={{ fontSize: '0.775rem', color: 'var(--brand-dark-grey)' }}>{dept.hodEmail}</div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', marginBottom: '1.25rem' }}>
                  <div style={{ border: '1px solid rgba(156, 163, 175, 0.2)', padding: '0.75rem', borderRadius: 'var(--border-radius)' }}>
                    <span style={{ fontSize: '0.725rem', fontWeight: 700, color: 'var(--brand-dark-grey)', textTransform: 'uppercase' }}>FACULTY ROSTER</span>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--brand-orange)' }} className="font-mono">{dept.facultyCount}</div>
                  </div>

                  <div style={{ border: '1px solid rgba(156, 163, 175, 0.2)', padding: '0.75rem', borderRadius: 'var(--border-radius)' }}>
                    <span style={{ fontSize: '0.725rem', fontWeight: 700, color: 'var(--brand-dark-grey)', textTransform: 'uppercase' }}>ENROLLED STUDENTS</span>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--brand-blue)' }} className="font-mono">{dept.studentCount}</div>
                  </div>
                </div>
              </div>

              <div style={{ borderTop: '1px solid rgba(156, 163, 175, 0.2)', paddingTop: '0.85rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--brand-dark-grey)' }}>{dept.sections.length} Active Sections</span>
                <button 
                  onClick={() => navigate(`/admin/organization/departments/${dept.id}`)}
                  className="btn btn-secondary font-sans"
                  style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem' }}
                >
                  <Eye size={14} />
                  <span>View Details</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Sections Breakdown Table */
        <div className="dashboard-panel" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid rgba(156, 163, 175, 0.2)' }}>
            <h2 className="panel-title font-display" style={{ margin: 0 }}>Institution Section Roster Matrix</h2>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--brand-light-grey)', borderBottom: '1px solid rgba(156, 163, 175, 0.2)', color: 'var(--brand-black)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.75rem' }}>
                  <th style={{ padding: '0.85rem 1.25rem' }}>Department Code & Name</th>
                  <th style={{ padding: '0.85rem 1.25rem' }}>Semester</th>
                  <th style={{ padding: '0.85rem 1.25rem' }}>Section</th>
                  <th style={{ padding: '0.85rem 1.25rem' }}>Enrolled Students</th>
                  <th style={{ padding: '0.85rem 1.25rem' }}>Capacity Status</th>
                </tr>
              </thead>
              <tbody>
                {departments.flatMap(d => d.sections.map(s => ({ ...s, deptCode: d.code, deptName: d.name }))).map((sec, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid rgba(156, 163, 175, 0.15)' }}>
                    <td style={{ padding: '0.85rem 1.25rem' }}>
                      <span className="font-mono text-blue font-bold">{sec.deptCode}</span>
                      <div style={{ fontWeight: 700, color: 'var(--brand-black)' }}>{sec.deptName}</div>
                    </td>
                    <td style={{ padding: '0.85rem 1.25rem' }} className="font-mono font-bold">
                      Semester {sec.semester}
                    </td>
                    <td style={{ padding: '0.85rem 1.25rem' }}>
                      <span className="badge badge-active font-mono font-bold">{sec.section}</span>
                    </td>
                    <td style={{ padding: '0.85rem 1.25rem' }} className="font-mono font-bold text-blue">
                      {sec.studentCount} Students
                    </td>
                    <td style={{ padding: '0.85rem 1.25rem' }}>
                      <span className="badge badge-active">Normal (Max 65)</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </AdminAppShell>
  );
};

export default OrganizationPage;
