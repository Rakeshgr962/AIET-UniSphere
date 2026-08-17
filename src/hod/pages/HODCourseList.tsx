import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, BookOpen, Eye, Filter, Users, CalendarCheck, FileText } from 'lucide-react';
import { HODAppShell } from '../components/HODAppShell';
import { getFacultyCourses } from '../../services/courseService';
import type { FacultyCourseItem } from '../../services/courseService';

export const HODCourseList: React.FC = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<FacultyCourseItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [semesterFilter, setSemesterFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCourses = async () => {
      setLoading(true);
      try {
        const data = await getFacultyCourses();
        setCourses(data);
      } catch (err) {
        console.error("Error loading department courses:", err);
      } finally {
        setLoading(false);
      }
    };
    loadCourses();
  }, []);

  const filteredCourses = courses.filter((c) => {
    const matchesSearch = 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.faculty.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSemester = semesterFilter === 'All' || c.semester.toString() === semesterFilter;

    return matchesSearch && matchesSemester;
  });

  return (
    <HODAppShell>
      {/* Header Banner */}
      <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span className="badge badge-active font-mono">DEPARTMENT MANAGEMENT</span>
          <h1 className="font-display" style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--brand-black)', marginTop: '0.25rem', marginBottom: 0 }}>
            Department Course Catalog
          </h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--brand-dark-grey)', marginTop: '0.2rem' }}>
            Data Science Department Active Courses & Faculty Allocation
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ backgroundColor: 'var(--brand-white)', padding: '0.5rem 0.85rem', borderRadius: 'var(--border-radius)', border: '1px solid rgba(156, 163, 175, 0.2)', fontSize: '0.85rem', fontWeight: 600, color: 'var(--brand-black)' }}>
            Active Courses: <span style={{ color: 'var(--brand-orange)', fontWeight: 800 }}>{courses.length}</span>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="dashboard-panel" style={{ marginBottom: '1.5rem', padding: '1rem 1.25rem' }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Search Bar */}
          <div className="header-search" style={{ width: '320px', position: 'relative' }}>
            <Search size={16} className="header-search-icon" />
            <input 
              type="text" 
              placeholder="Search course name, code or faculty..."
              className="header-search-input font-sans"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filter */}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.825rem', color: 'var(--brand-dark-grey)', fontWeight: 600 }}>
              <Filter size={14} />
              <span>Semester:</span>
            </div>
            <select 
              className="form-select font-sans" 
              style={{ width: '150px', padding: '0.45rem 0.75rem', fontSize: '0.825rem' }}
              value={semesterFilter}
              onChange={(e) => setSemesterFilter(e.target.value)}
            >
              <option value="All">All Semesters</option>
              <option value="6">Semester 6</option>
              <option value="4">Semester 4</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Course List Table Container */}
      <div className="dashboard-panel" style={{ padding: 0, overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--brand-dark-grey)' }}>
            Loading Department Courses...
          </div>
        ) : filteredCourses.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--brand-dark-grey)' }}>
            <BookOpen size={36} style={{ margin: '0 auto 0.75rem', color: '#94A3B8' }} />
            <p style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--brand-black)' }}>No courses match your query</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--brand-light-grey)', borderBottom: '1px solid rgba(156, 163, 175, 0.2)', color: 'var(--brand-black)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.03em' }}>
                  <th style={{ padding: '1rem 1.25rem' }}>Course Code & Name</th>
                  <th style={{ padding: '1rem 1.25rem' }}>Semester</th>
                  <th style={{ padding: '1rem 1.25rem' }}>Assigned Faculty</th>
                  <th style={{ padding: '1rem 1.25rem' }}>Students</th>
                  <th style={{ padding: '1rem 1.25rem' }}>Attendance</th>
                  <th style={{ padding: '1rem 1.25rem' }}>Assignments</th>
                  <th style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCourses.map((c) => (
                  <tr key={c.id} style={{ borderBottom: '1px solid rgba(156, 163, 175, 0.15)' }}>
                    <td style={{ padding: '1rem 1.25rem' }}>
                      <div>
                        <div className="font-mono text-blue font-bold" style={{ fontSize: '0.825rem' }}>{c.code}</div>
                        <div style={{ fontWeight: 700, color: 'var(--brand-black)', fontSize: '0.9rem', marginTop: '0.1rem' }}>{c.name}</div>
                      </div>
                    </td>

                    <td style={{ padding: '1rem 1.25rem' }}>
                      <span style={{ fontWeight: 600 }}>Semester {c.semester}</span>
                    </td>

                    <td style={{ padding: '1rem 1.25rem' }}>
                      <span style={{ fontWeight: 600, color: 'var(--brand-black)' }}>{c.faculty}</span>
                    </td>

                    <td style={{ padding: '1rem 1.25rem' }}>
                      <span style={{ fontWeight: 600 }}>{c.studentCount} Students</span>
                    </td>

                    <td style={{ padding: '1rem 1.25rem' }}>
                      <span className="font-mono" style={{ fontWeight: 700, color: c.averageAttendancePercent >= 80 ? 'var(--color-success)' : 'var(--brand-orange)' }}>
                        {c.averageAttendancePercent}%
                      </span>
                    </td>

                    <td style={{ padding: '1rem 1.25rem' }}>
                      <span style={{ fontWeight: 600 }}>{c.activeAssignmentsCount} Active</span>
                    </td>

                    <td style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>
                      <button 
                        onClick={() => navigate(`/hod/courses/${c.id}`)}
                        className="btn btn-secondary"
                        style={{ fontSize: '0.8rem', padding: '0.4rem 0.75rem' }}
                      >
                        <Eye size={14} />
                        <span>View Details</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </HODAppShell>
  );
};

export default HODCourseList;
