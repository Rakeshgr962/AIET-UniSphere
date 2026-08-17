import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Search, Filter, Users, CalendarCheck, ClipboardList, ArrowRight, Plus } from 'lucide-react';
import { FacultyAppShell } from '../components/FacultyAppShell';
import { getFacultyCourses } from '../../services/courseService';
import type { FacultyCourseItem } from '../../services/courseService';
import { CreateAssignmentModal } from '../components/CreateAssignmentModal';

export const FacultyCoursesList: React.FC = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<FacultyCourseItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSemester, setSelectedSemester] = useState<string>('All');
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateAssignmentOpen, setIsCreateAssignmentOpen] = useState(false);

  useEffect(() => {
    getFacultyCourses().then((res) => {
      setCourses(res);
      setIsLoading(false);
    });
  }, []);

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSem = selectedSemester === 'All' || course.semester.toString() === selectedSemester;
    return matchesSearch && matchesSem;
  });

  return (
    <FacultyAppShell>
      {/* Page Title Header */}
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, fontFamily: 'var(--font-display)', color: 'var(--brand-black)' }}>
            My Assigned Courses
          </h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--brand-dark-grey)', fontWeight: 500, marginTop: '0.2rem' }}>
            Manage academic modules, view student rosters, monitor attendance, and review assignments.
          </p>
        </div>

        <button className="btn btn-primary" onClick={() => setIsCreateAssignmentOpen(true)}>
          <Plus size={16} />
          <span>Create Assignment</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="dashboard-panel" style={{ marginBottom: '1.5rem', padding: '1rem 1.25rem' }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div className="header-search" style={{ flexGrow: 1, minWidth: '260px', width: 'auto' }}>
            <Search size={16} className="header-search-icon" />
            <input 
              type="text" 
              placeholder="Search by course name or code..."
              className="header-search-input"
              style={{ width: '100%' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Filter size={16} style={{ color: 'var(--brand-dark-grey)' }} />
            <span style={{ fontSize: '0.85rem', color: 'var(--brand-dark-grey)', fontWeight: 600 }}>Semester:</span>
            <select 
              className="header-search-input" 
              style={{ width: 'auto', padding: '0.4rem 1rem', fontSize: '0.85rem', cursor: 'pointer' }}
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
            >
              <option value="All">All Semesters</option>
              <option value="6">Semester 6</option>
              <option value="4">Semester 4</option>
            </select>
          </div>
        </div>
      </div>

      {/* Course Cards Grid */}
      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--brand-dark-grey)', fontWeight: 500 }}>
          Loading courses...
        </div>
      ) : filteredCourses.length === 0 ? (
        <div className="dashboard-panel" style={{ textAlign: 'center', padding: '3rem 1.5rem' }}>
          <BookOpen size={40} style={{ color: 'var(--brand-dark-grey)', margin: '0 auto 0.75rem auto' }} />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>No Courses Found</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--brand-dark-grey)', marginTop: '0.25rem' }}>
            No course records matched your search query or semester filter.
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {filteredCourses.map((course) => (
            <div key={course.id} className="dashboard-panel" style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="badge badge-graded">{course.code}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--brand-dark-grey)', fontWeight: 600 }}>Sem {course.semester}</span>
              </div>

              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--brand-black)', marginBottom: '0.2rem' }}>
                  {course.name}
                </h3>
                <p style={{ fontSize: '0.825rem', color: 'var(--brand-dark-grey)', lineHeight: '1.4' }}>
                  {course.department}
                </p>
              </div>

              {/* Course Key Metrics */}
              <div style={{ backgroundColor: 'var(--brand-light-grey)', padding: '0.75rem', borderRadius: 'var(--border-radius)', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem', textAlign: 'center', border: '1px solid rgba(156, 163, 175, 0.2)' }}>
                <div>
                  <span style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--brand-black)', display: 'block' }}>{course.studentCount}</span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--brand-dark-grey)', fontWeight: 600 }}>Enrolled</span>
                </div>
                <div>
                  <span style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--brand-blue)', display: 'block' }}>{course.averageAttendancePercent}%</span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--brand-dark-grey)', fontWeight: 600 }}>Avg Attendance</span>
                </div>
                <div>
                  <span style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--brand-orange)', display: 'block' }}>{course.activeAssignmentsCount}</span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--brand-dark-grey)', fontWeight: 600 }}>Active Assign</span>
                </div>
              </div>

              <div style={{ marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid rgba(156, 163, 175, 0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--brand-dark-grey)', fontWeight: 500 }}>
                  Next: {course.nextActivity ? course.nextActivity.slice(0, 24) + '...' : 'Module 5'}
                </span>

                <button 
                  className="btn btn-primary" 
                  style={{ width: 'auto', padding: '0.4rem 0.85rem', fontSize: '0.825rem' }}
                  onClick={() => navigate(`/faculty/courses/${course.id}`)}
                >
                  <span>Open Course</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Assignment Modal */}
      <CreateAssignmentModal 
        isOpen={isCreateAssignmentOpen}
        onClose={() => setIsCreateAssignmentOpen(false)}
        onSuccess={() => alert("Assignment created! Shared state updated.")}
      />
    </FacultyAppShell>
  );
};

export default FacultyCoursesList;
