import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Search, Filter, ArrowRight, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { FacultyAppShell } from '../components/FacultyAppShell';
import { getAllStudents } from '../../services/studentService';
import type { ExtendedStudent } from '../../data/students';

export const FacultyStudentList: React.FC = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState<ExtendedStudent[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [attendanceFilter, setAttendanceFilter] = useState<string>('All');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAllStudents().then((res) => {
      setStudents(res);
      setIsLoading(false);
    });
  }, []);

  const filteredStudents = students.filter(std => {
    const matchesSearch = std.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          std.usn.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || std.academicStatus === statusFilter;
    const matchesAttendance = attendanceFilter === 'All' || 
      (attendanceFilter === '<75' && std.attendancePercent < 75) ||
      (attendanceFilter === '>=75' && std.attendancePercent >= 75);

    return matchesSearch && matchesStatus && matchesAttendance;
  });

  return (
    <FacultyAppShell>
      {/* Page Title Header */}
      <div style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '0.25rem', textAlign: 'left' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, fontFamily: 'var(--font-display)', color: 'var(--brand-black)' }}>
          Student Academic Roster
        </h1>
        <p style={{ fontSize: '0.9rem', color: 'var(--brand-dark-grey)', fontWeight: 500 }}>
          Monitor academic progress, attendance records, assignment completion, and performance status across enrolled courses.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="dashboard-panel" style={{ marginBottom: '1.5rem', padding: '1rem 1.25rem' }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div className="header-search" style={{ flexGrow: 1, minWidth: '260px', width: 'auto' }}>
            <Search size={16} className="header-search-icon" />
            <input 
              type="text" 
              placeholder="Search student by name or USN..."
              className="header-search-input"
              style={{ width: '100%' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Filter size={16} style={{ color: 'var(--brand-dark-grey)' }} />
            <span style={{ fontSize: '0.85rem', color: 'var(--brand-dark-grey)', fontWeight: 600 }}>Status:</span>
            <select 
              className="header-search-input"
              style={{ width: 'auto', padding: '0.4rem 1rem', fontSize: '0.85rem', cursor: 'pointer' }}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Good Standing">Good Standing</option>
              <option value="Warning">Warning</option>
              <option value="At Risk">At Risk</option>
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--brand-dark-grey)', fontWeight: 600 }}>Attendance:</span>
            <select 
              className="header-search-input"
              style={{ width: 'auto', padding: '0.4rem 1rem', fontSize: '0.85rem', cursor: 'pointer' }}
              value={attendanceFilter}
              onChange={(e) => setAttendanceFilter(e.target.value)}
            >
              <option value="All">All Levels</option>
              <option value="<75">Below 75% (&lt;75%)</option>
              <option value=">=75">75% &amp; Above (&ge;75%)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Roster Table */}
      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--brand-dark-grey)', fontWeight: 500 }}>
          Loading student roster...
        </div>
      ) : (
        <div className="dashboard-panel" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="table-responsive">
            <table className="table font-sans">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>USN</th>
                  <th>Department &amp; Sem</th>
                  <th>Attendance</th>
                  <th>CGPA</th>
                  <th>Assignments</th>
                  <th>Academic Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((std) => (
                  <tr key={std.id}>
                    <td>
                      <div style={{ fontWeight: 600, color: 'var(--brand-black)' }}>{std.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--brand-dark-grey)' }}>{std.email}</div>
                    </td>
                    <td style={{ fontSize: '0.85rem', fontFamily: 'monospace' }}>{std.usn}</td>
                    <td style={{ fontSize: '0.85rem' }}>
                      {std.department}<br />
                      <span style={{ fontSize: '0.75rem', color: 'var(--brand-dark-grey)' }}>Sem {std.semester}</span>
                    </td>
                    <td>
                      <span style={{ fontWeight: 700, color: std.attendancePercent < 75 ? 'var(--color-error)' : 'var(--brand-blue)' }}>
                        {std.attendancePercent}%
                      </span>
                    </td>
                    <td style={{ fontSize: '0.9rem', fontWeight: 700, fontFamily: 'monospace' }}>{std.cgpa}</td>
                    <td style={{ fontSize: '0.85rem' }}>
                      {std.assignmentsCompleted} / {std.assignmentsTotal}
                    </td>
                    <td>
                      <span className={`badge ${
                        std.academicStatus === 'Good Standing' ? 'badge-graded' :
                        std.academicStatus === 'Warning' ? 'badge-overdue' : 'badge-pending'
                      }`} style={{ fontSize: '0.75rem' }}>
                        {std.academicStatus}
                      </span>
                    </td>
                    <td>
                      <button 
                        className="btn btn-secondary"
                        style={{ width: 'auto', padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}
                        onClick={() => navigate(`/faculty/students/${std.id}`)}
                      >
                        <span>View Profile</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </FacultyAppShell>
  );
};

export default FacultyStudentList;
