import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, BookOpen } from 'lucide-react';
import { getCourses } from '../services/courseService';
import { getStudentProfile } from '../services/studentService';
import { AppShell } from '../components/AppShell';
import { ProgressBar } from '../components/ProgressBar';
import { LoadingState } from '../components/LoadingState';
import { EmptyState } from '../components/EmptyState';
import { ErrorState } from '../components/ErrorState';

export const CoursesList: React.FC = () => {
  const navigate = useNavigate();

  const [courses, setCourses] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSemester, setSelectedSemester] = useState<string>('all');

  const fetchCoursesData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [coursesData, profileData] = await Promise.all([
        getCourses(),
        getStudentProfile()
      ]);
      setCourses(coursesData);
      setProfile(profileData);
    } catch (err) {
      setError("Unable to load your courses. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCoursesData();
  }, []);

  if (isLoading) {
    return (
      <AppShell>
        <LoadingState message="Loading your courses..." />
      </AppShell>
    );
  }

  if (error) {
    return (
      <AppShell>
        <ErrorState message={error} onRetry={fetchCoursesData} />
      </AppShell>
    );
  }

  // Filter courses by search query and semester selection
  const filteredCourses = courses.filter((course) => {
    const matchesSearch = 
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      course.code.toLowerCase().includes(searchQuery.toLowerCase()) || 
      course.faculty.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesSemester = 
      selectedSemester === 'all' || 
      course.semester.toString() === selectedSemester;

    return matchesSearch && matchesSemester;
  });

  return (
    <AppShell>
      {/* Page Header */}
      <div className="page-header-container">
        <div style={{ textAlign: 'left' }}>
          <div className="breadcrumbs">
            <span>Academics</span>
            <span className="breadcrumbs-separator">/</span>
            <span style={{ fontWeight: 600, color: 'var(--brand-black)' }}>Courses</span>
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, fontFamily: 'var(--font-display)' }}>My Courses</h1>
          {profile && (
            <p style={{ fontSize: '0.85rem', color: 'var(--brand-dark-grey)', marginTop: '0.125rem' }}>
              {profile.department} · Current Semester: {profile.semester}
            </p>
          )}
        </div>
      </div>

      {/* Filter and Search controls */}
      <div className="filter-bar">
        <div className="header-search" style={{ display: 'flex', width: '320px', maxWidth: '100%' }}>
          <Search size={16} className="header-search-icon" />
          <input 
            type="text" 
            className="header-search-input" 
            placeholder="Search by course name, code, faculty..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search courses"
            style={{ display: 'block' }}
          />
        </div>

        <div className="filter-controls-group">
          <label htmlFor="semester-filter" style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--brand-black)' }}>
            Semester:
          </label>
          <select 
            id="semester-filter"
            className="filter-select"
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
          >
            <option value="all">All Semesters</option>
            <option value="6">Semester 6</option>
            <option value="5">Semester 5 (Completed)</option>
          </select>
        </div>
      </div>

      {/* Main Course Grid or Empty State */}
      {filteredCourses.length === 0 ? (
        <EmptyState 
          title="No courses found" 
          message={searchQuery ? `We couldn't find any courses matching "${searchQuery}".` : "No courses are enrolled in this semester."}
          actionLabel="Clear Filters"
          onAction={() => { setSearchQuery(''); setSelectedSemester('all'); }}
        />
      ) : (
        <div className="courses-grid">
          {filteredCourses.map((course) => (
            <div key={course.id} className="course-card">
              <div className="course-card-header">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="course-code-badge">{course.code}</span>
                  <span 
                    className={`badge ${course.attendance < 80 ? 'badge-overdue' : 'badge-graded'}`}
                    style={{ fontSize: '0.75rem', padding: '0.15rem 0.5rem' }}
                  >
                    Attendance: {course.attendance}%
                  </span>
                </div>
                <h3 className="course-card-title" style={{ marginTop: '0.5rem' }}>{course.name}</h3>
                <span className="course-card-faculty">Instructor: {course.faculty}</span>
              </div>

              <div className="course-card-metrics">
                <ProgressBar progress={course.progress} label="Syllabus Completion" />
              </div>

              <div className="course-card-next">
                <span style={{ fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--brand-dark-grey)' }}>
                  Next Activity:
                </span>
                <p style={{ fontSize: '0.85rem', color: 'var(--brand-black)', marginTop: '0.15rem', fontWeight: 500 }}>
                  {course.nextActivity}
                </p>
              </div>

              <button 
                onClick={() => navigate(`/student/courses/${course.id}`)}
                className="btn btn-primary"
                style={{ marginTop: '0.5rem' }}
              >
                <BookOpen size={16} />
                Open Course
              </button>
            </div>
          ))}
        </div>
      )}
    </AppShell>
  );
};
export default CoursesList;
