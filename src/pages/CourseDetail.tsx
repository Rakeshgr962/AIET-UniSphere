import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  FolderDown, 
  Megaphone
} from 'lucide-react';
import { getCourseById } from '../services/courseService';
import { getAssignments } from '../services/assignmentService';
import { getAssessments } from '../services/assessmentService';
import { AppShell } from '../components/AppShell';
import { ProgressBar } from '../components/ProgressBar';
import { LoadingState } from '../components/LoadingState';
import { ErrorState } from '../components/ErrorState';

export const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [course, setCourse] = useState<any>(null);
  const [courseAssignments, setCourseAssignments] = useState<any[]>([]);
  const [courseAssessments, setCourseAssessments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Selected tab state
  const [activeTab, setActiveTab] = useState<'overview' | 'modules' | 'materials' | 'assignments' | 'assessments' | 'announcements' | 'progress'>('overview');

  const fetchCourseDetails = async () => {
    if (!id) return;
    setIsLoading(true);
    setError(null);
    try {
      const courseData = await getCourseById(id);
      if (!courseData) {
        setError("Course not found.");
        return;
      }
      setCourse(courseData);

      // Fetch related assignments & assessments
      const [allAssignments, allAssessments] = await Promise.all([
        getAssignments(),
        getAssessments()
      ]);

      setCourseAssignments(allAssignments.filter(a => a.courseId === id));
      setCourseAssessments(allAssessments.filter(a => a.courseId === id));
    } catch (err) {
      setError("Unable to load course details. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCourseDetails();
  }, [id]);

  if (isLoading) {
    return (
      <AppShell>
        <LoadingState message="Loading course modules and details..." />
      </AppShell>
    );
  }

  if (error || !course) {
    return (
      <AppShell>
        <ErrorState message={error || "Failed to load course details"} onRetry={fetchCourseDetails} />
      </AppShell>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'modules', label: 'Modules' },
    { id: 'materials', label: 'Materials' },
    { id: 'assignments', label: `Assignments (${courseAssignments.length})` },
    { id: 'assessments', label: `Assessments (${courseAssessments.length})` },
    { id: 'announcements', label: 'Announcements' },
    { id: 'progress', label: 'Progress' }
  ];

  return (
    <AppShell>
      {/* Back Link */}
      <div style={{ textAlign: 'left', marginBottom: '1.25rem' }}>
        <button 
          onClick={() => navigate('/student/courses')}
          className="btn btn-secondary"
          style={{ width: 'auto', padding: '0.4rem 0.85rem', fontSize: '0.825rem', gap: '0.35rem' }}
        >
          <ArrowLeft size={14} />
          Back to Courses
        </button>
      </div>

      {/* Course Heading Header */}
      <div className="dashboard-panel" style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span className="course-code-badge">{course.code}</span>
            <h1 style={{ fontSize: '1.85rem', fontWeight: 700, fontFamily: 'var(--font-display)', marginTop: '0.5rem' }}>
              {course.name}
            </h1>
            <p style={{ fontSize: '0.9rem', color: 'var(--brand-dark-grey)', marginTop: '0.25rem', fontWeight: 500 }}>
              Instructor: <strong style={{ color: 'var(--brand-black)' }}>{course.faculty}</strong> · Semester {course.semester}
            </p>
          </div>
          
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'center' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--brand-dark-grey)', textTransform: 'uppercase' }}>Attendance</span>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: course.attendance < 80 ? 'var(--color-error)' : 'var(--brand-blue)' }}>
                {course.attendance}%
              </h2>
            </div>
            <div style={{ textAlign: 'center' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--brand-dark-grey)', textTransform: 'uppercase' }}>Syllabus Complete</span>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--brand-orange)' }}>
                {course.progress}%
              </h2>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '0.5rem', borderTop: '1px solid rgba(156, 163, 175, 0.1)', paddingTop: '0.75rem' }}>
          <p style={{ fontSize: '0.85rem' }}>
            <strong>Next Class Session:</strong> {course.nextActivity}
          </p>
        </div>
      </div>

      {/* Course Tabs Navigation */}
      <div className="tabs-navigation">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div style={{ textAlign: 'left' }}>
        
        {/* OVERVIEW PANEL */}
        {activeTab === 'overview' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="dashboard-panel">
              <h3 className="panel-title">Course Description</h3>
              <p style={{ fontSize: '0.925rem', lineHeight: '1.6' }}>{course.description}</p>
            </div>

            <div className="dashboard-grid-two-col">
              <div className="dashboard-panel">
                <h3 className="panel-title">Faculty / Instructor Details</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.25rem' }}>
                  <div className="profile-avatar" style={{ width: '48px', height: '48px', fontSize: '1.25rem' }}>
                    {course.faculty.split(' ').slice(-2).map((n: string) => n[0]).join('')}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 600 }}>{course.faculty}</h4>
                    <p style={{ fontSize: '0.825rem', color: 'var(--brand-dark-grey)' }}>Department of Computer Science & Engineering</p>
                    <p style={{ fontSize: '0.825rem', color: 'var(--brand-blue)' }}>office.hours@aiet.edu</p>
                  </div>
                </div>
              </div>

              <div className="dashboard-panel">
                <h3 className="panel-title">Upcoming Activity</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.25rem' }}>
                  <p style={{ fontSize: '0.875rem' }}>
                    <strong>Next Lecture:</strong> {course.nextActivity}
                  </p>
                  <p style={{ fontSize: '0.875rem' }}>
                    <strong>Course Code:</strong> {course.code}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MODULES PANEL */}
        {activeTab === 'modules' && (
          <div className="dashboard-panel">
            <h3 className="panel-title" style={{ marginBottom: '0.5rem' }}>Syllabus Modules</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {course.modules.map((mod: any) => (
                <div 
                  key={mod.id} 
                  style={{ 
                    padding: '1rem', 
                    border: '1px solid rgba(156, 163, 175, 0.2)', 
                    borderRadius: 'var(--border-radius)',
                    backgroundColor: 'var(--brand-light-grey)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 600 }}>
                      Module {mod.id}: {mod.title}
                    </h4>
                    <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.8rem', color: 'var(--brand-dark-grey)' }}>
                      <span>📚 {mod.materialsCount} Readings</span>
                      <span>📝 {mod.assignmentsCount} Assignments</span>
                    </div>
                  </div>
                  <ProgressBar progress={mod.completion} label="Module Completion" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MATERIALS PANEL */}
        {activeTab === 'materials' && (
          <div className="dashboard-panel">
            <h3 className="panel-title" style={{ marginBottom: '0.75rem' }}>Reference Materials</h3>
            <div className="data-table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Material Title</th>
                    <th>Module</th>
                    <th>Type</th>
                    <th style={{ textAlign: 'right' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Syllabus and Recommended Textbooks</strong></td>
                    <td>General</td>
                    <td>PDF File</td>
                    <td style={{ textAlign: 'right' }}>
                      <button className="btn btn-secondary" style={{ width: 'auto', padding: '0.35rem 0.65rem', fontSize: '0.8rem' }} onClick={() => alert("Downloading: Syllabus_DBMS.pdf")}>
                        <FolderDown size={14} /> Download
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Module 1: E-R Models and Diagrams Slides</strong></td>
                    <td>Module 1</td>
                    <td>PPT Slide</td>
                    <td style={{ textAlign: 'right' }}>
                      <button className="btn btn-secondary" style={{ width: 'auto', padding: '0.35rem 0.65rem', fontSize: '0.8rem' }} onClick={() => alert("Downloading: ER_Slides_M1.pptx")}>
                        <FolderDown size={14} /> Download
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Module 3: Advanced SQL Joins Exercises</strong></td>
                    <td>Module 3</td>
                    <td>PDF File</td>
                    <td style={{ textAlign: 'right' }}>
                      <button className="btn btn-secondary" style={{ width: 'auto', padding: '0.35rem 0.65rem', fontSize: '0.8rem' }} onClick={() => alert("Downloading: SQL_Joins_Exercises.pdf")}>
                        <FolderDown size={14} /> Download
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ASSIGNMENTS PANEL */}
        {activeTab === 'assignments' && (
          <div className="dashboard-panel">
            <h3 className="panel-title" style={{ marginBottom: '0.75rem' }}>Course Assignments</h3>
            {courseAssignments.length === 0 ? (
              <p style={{ fontSize: '0.9rem', color: 'var(--brand-dark-grey)' }}>No assignments recorded for this course.</p>
            ) : (
              <div className="data-table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Deadline</th>
                      <th>Marks</th>
                      <th>Status</th>
                      <th style={{ textAlign: 'right' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courseAssignments.map((a) => (
                      <tr key={a.id}>
                        <td>
                          <strong>{a.title.split(' — ')[1] || a.title}</strong>
                        </td>
                        <td>{new Date(a.deadline).toLocaleDateString()} at {new Date(a.deadline).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                        <td>{a.marks} Marks</td>
                        <td>
                          <span className={`badge badge-${a.status.toLowerCase()}`}>
                            {a.status}
                          </span>
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <Link 
                            to={`/student/assignments/${a.id}`} 
                            className="btn btn-secondary"
                            style={{ display: 'inline-flex', width: 'auto', padding: '0.35rem 0.65rem', fontSize: '0.8rem' }}
                          >
                            Open
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ASSESSMENTS PANEL */}
        {activeTab === 'assessments' && (
          <div className="dashboard-panel">
            <h3 className="panel-title" style={{ marginBottom: '0.75rem' }}>Course Assessments</h3>
            {courseAssessments.length === 0 ? (
              <p style={{ fontSize: '0.9rem', color: 'var(--brand-dark-grey)' }}>No assessments recorded for this course.</p>
            ) : (
              <div className="data-table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Date / Time</th>
                      <th>Duration</th>
                      <th>Status</th>
                      <th style={{ textAlign: 'right' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courseAssessments.map((a) => (
                      <tr key={a.id}>
                        <td><strong>{a.title}</strong></td>
                        <td>{a.date} at {a.time}</td>
                        <td>{a.duration} mins</td>
                        <td>
                          <span className={`badge badge-${a.status.toLowerCase()}`}>
                            {a.status}
                          </span>
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <Link 
                            to={`/student/assessments/${a.id}`} 
                            className="btn btn-secondary"
                            style={{ display: 'inline-flex', width: 'auto', padding: '0.35rem 0.65rem', fontSize: '0.8rem' }}
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ANNOUNCEMENTS PANEL */}
        {activeTab === 'announcements' && (
          <div className="dashboard-panel">
            <h3 className="panel-title" style={{ marginBottom: '0.75rem' }}>Announcements</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ border: '1px solid rgba(156, 163, 175, 0.2)', padding: '1rem', borderRadius: 'var(--border-radius)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--brand-orange)', marginBottom: '0.25rem' }}>
                  <Megaphone size={16} />
                  <strong style={{ fontSize: '0.875rem' }}>Clarification on DBMS Assignment 04</strong>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--brand-black)' }}>
                  "For Question 3, please verify your normalization tables satisfy BCNF criteria and do not lose dependency mappings."
                </p>
                <span style={{ fontSize: '0.75rem', color: 'var(--brand-dark-grey)' }}>Posted 2 hours ago by Dr. Rajesh Kumar</span>
              </div>
            </div>
          </div>
        )}

        {/* PROGRESS PANEL */}
        {activeTab === 'progress' && (
          <div className="dashboard-panel">
            <h3 className="panel-title" style={{ marginBottom: '0.5rem' }}>Academic Performance Summary</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--brand-dark-grey)', marginBottom: '1rem' }}>
              Grade summaries for course work, quizzes, and internal tests.
            </p>
            <div className="data-table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Item Type</th>
                    <th>Name</th>
                    <th>Grade / Score</th>
                    <th>Weight</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Assignment</td>
                    <td>UML System Designs</td>
                    <td>13 / 15 (86%)</td>
                    <td>10%</td>
                  </tr>
                  <tr>
                    <td>Assessment</td>
                    <td>Database Systems — Unit Test 1</td>
                    <td>16 / 20 (80%)</td>
                    <td>20%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </AppShell>
  );
};
export default CourseDetail;
