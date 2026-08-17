import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Users, 
  Clock, 
  ClipboardList, 
  AlertTriangle, 
  Plus, 
  CalendarCheck, 
  ArrowRight, 
  CheckCircle2, 
  FileText,
  AlertCircle
} from 'lucide-react';
import { FacultyAppShell } from '../components/FacultyAppShell';
import { StatCard } from '../../components/StatCard';
import { getFacultyDashboardData } from '../services/facultyService';
import type { FacultyDashboardData } from '../services/facultyService';
import { CreateAssignmentModal } from '../components/CreateAssignmentModal';

export const FacultyDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<FacultyDashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateAssignmentOpen, setIsCreateAssignmentOpen] = useState(false);

  useEffect(() => {
    getFacultyDashboardData().then((res) => {
      setData(res);
      setIsLoading(false);
    });
  }, []);

  if (isLoading || !data) {
    return (
      <FacultyAppShell>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
          <div style={{ fontSize: '0.9rem', color: 'var(--brand-dark-grey)', fontWeight: 500 }}>
            Loading Faculty Dashboard...
          </div>
        </div>
      </FacultyAppShell>
    );
  }

  const { profile, stats, todaysClasses, pendingWork, studentAlerts, recentActivities } = data;

  const getGreeting = () => {
    const hrs = new Date().getHours();
    if (hrs < 12) return 'Good Morning';
    if (hrs < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <FacultyAppShell>
      {/* Dashboard Greeting Header */}
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', textAlign: 'left' }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, fontFamily: 'var(--font-display)', color: 'var(--brand-black)' }}>
            {getGreeting()}, {profile.name} 👋
          </h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--brand-dark-grey)', fontWeight: 500 }}>
            {profile.department} · {profile.title} · {profile.office} · AY {profile.academicYear}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn btn-primary" onClick={() => setIsCreateAssignmentOpen(true)}>
            <Plus size={16} />
            <span>Create Assignment</span>
          </button>
          <button className="btn btn-secondary" onClick={() => navigate('/faculty/attendance')}>
            <CalendarCheck size={16} />
            <span>Mark Attendance</span>
          </button>
        </div>
      </div>

      {/* 6 Key StatCards */}
      <div className="stat-cards-grid">
        <StatCard 
          title="My Courses" 
          value={stats.myCoursesCount.toString()} 
          icon={<BookOpen size={20} />}
        />
        <StatCard 
          title="Total Students" 
          value={stats.studentsCount.toString()} 
          icon={<Users size={20} />}
        />
        <StatCard 
          title="Today's Classes" 
          value={stats.todaysClassesCount.toString()} 
          icon={<Clock size={20} />}
        />
        <StatCard 
          title="Pending Evaluations" 
          value={stats.pendingEvaluationsCount.toString()} 
          icon={<ClipboardList size={20} />}
        />
        <StatCard 
          title="Active Assignments" 
          value={stats.activeAssignmentsCount.toString()} 
          icon={<FileText size={20} />}
        />
        <StatCard 
          title="Attendance Alerts" 
          value={stats.attendanceAlertsCount.toString()} 
          icon={<AlertTriangle size={20} />}
        />
      </div>

      {/* Main 2-Column Dashboard Grid */}
      <div className="dashboard-grid-two-col">
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Today's Classes */}
          <div className="dashboard-panel">
            <div className="panel-header-row">
              <h3 className="panel-title">Today's Class Schedule</h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--brand-dark-grey)', fontWeight: 600 }}>
                {todaysClasses.length} Sessions
              </span>
            </div>

            <div className="priority-list">
              {todaysClasses.map((cls) => (
                <div 
                  key={cls.id} 
                  className={`priority-item ${cls.status === 'Current' ? 'high-priority' : ''}`}
                  style={{ padding: '0.85rem 1rem' }}
                >
                  <div className="priority-details">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                      <span className="badge badge-secondary" style={{ fontSize: '0.7rem', padding: '0.15rem 0.4rem' }}>{cls.courseCode}</span>
                      <span className="priority-title">{cls.courseName}</span>
                    </div>
                    <span className="priority-meta">
                      {cls.time} · {cls.room} · Semester {cls.semester}
                    </span>
                  </div>

                  <span className={`badge ${
                    cls.status === 'Completed' ? 'badge-graded' :
                    cls.status === 'Current' ? 'badge-overdue' : 'badge-pending'
                  }`} style={{ fontSize: '0.75rem' }}>
                    {cls.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Action Items */}
          <div className="dashboard-panel">
            <div className="panel-header-row">
              <h3 className="panel-title">Pending Action Items</h3>
              <span className="badge badge-overdue" style={{ fontSize: '0.7rem' }}>Attention Needed</span>
            </div>

            <div className="priority-list">
              {pendingWork.map((pw) => (
                <div key={pw.id} className="priority-item" style={{ padding: '0.85rem 1rem' }}>
                  <div className="priority-details">
                    <span className="priority-title">{pw.title}</span>
                    <span className="priority-meta">
                      {pw.type === 'assignment' ? `${pw.pendingCount} submissions pending evaluation` : 'Attendance submission pending'}
                    </span>
                  </div>

                  <button 
                    className="btn btn-secondary" 
                    style={{ width: 'auto', padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}
                    onClick={() => navigate(pw.link)}
                  >
                    <span>{pw.type === 'assignment' ? 'Review' : 'Mark'}</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Quick Actions Panel */}
          <div className="dashboard-panel">
            <div className="panel-header-row">
              <h3 className="panel-title">Quick Actions</h3>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <button className="btn btn-secondary" style={{ justifyContent: 'center', padding: '0.6rem' }} onClick={() => setIsCreateAssignmentOpen(true)}>
                <Plus size={16} />
                <span>Create Assignment</span>
              </button>
              <button className="btn btn-secondary" style={{ justifyContent: 'center', padding: '0.6rem' }} onClick={() => navigate('/faculty/attendance')}>
                <CalendarCheck size={16} />
                <span>Mark Attendance</span>
              </button>
              <button className="btn btn-secondary" style={{ justifyContent: 'center', padding: '0.6rem' }} onClick={() => navigate('/faculty/students')}>
                <Users size={16} />
                <span>View Students</span>
              </button>
              <button className="btn btn-secondary" style={{ justifyContent: 'center', padding: '0.6rem' }} onClick={() => navigate('/faculty/courses')}>
                <BookOpen size={16} />
                <span>My Courses</span>
              </button>
            </div>
          </div>

          {/* Student Academic Alerts */}
          <div className="dashboard-panel">
            <div className="panel-header-row">
              <h3 className="panel-title">Student Academic Alerts</h3>
              <button className="btn btn-secondary" style={{ fontSize: '0.75rem', padding: '0.25rem 0.6rem', width: 'auto' }} onClick={() => navigate('/faculty/students')}>
                View All
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {studentAlerts.map((alt) => (
                <div key={alt.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '0.75rem 0.85rem', borderRadius: 'var(--border-radius)', backgroundColor: 'var(--brand-light-grey)', border: '1px solid rgba(156, 163, 175, 0.2)' }}>
                  <AlertCircle size={18} style={{ color: alt.severity === 'high' ? 'var(--color-error)' : 'var(--brand-orange)', marginTop: '2px', flexShrink: 0 }} />
                  <div style={{ flexGrow: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--brand-black)' }}>{alt.studentName}</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--brand-dark-grey)', fontWeight: 600 }}>{alt.usn}</span>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--brand-dark-grey)', marginTop: '0.15rem' }}>{alt.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="dashboard-panel">
            <div className="panel-header-row">
              <h3 className="panel-title">Recent Activity</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {recentActivities.map((act) => (
                <div key={act.id} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div style={{ 
                    width: '28px', 
                    height: '28px', 
                    borderRadius: '50%', 
                    backgroundColor: 'rgba(11, 83, 160, 0.1)', 
                    color: 'var(--brand-blue)',
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    flexShrink: 0 
                  }}>
                    <CheckCircle2 size={15} />
                  </div>

                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--brand-dark-grey)', display: 'block' }}>
                      {act.day} · {act.timestamp}
                    </span>
                    <p style={{ fontSize: '0.85rem', color: 'var(--brand-black)', marginTop: '0.1rem' }}>
                      {act.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Create Assignment Modal */}
      <CreateAssignmentModal 
        isOpen={isCreateAssignmentOpen}
        onClose={() => setIsCreateAssignmentOpen(false)}
        onSuccess={() => {
          alert("Assignment created successfully! Shared state updated.");
          getFacultyDashboardData().then(setData);
        }}
      />
    </FacultyAppShell>
  );
};

export default FacultyDashboard;
