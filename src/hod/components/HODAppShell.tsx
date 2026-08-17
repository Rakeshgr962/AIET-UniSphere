import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  CalendarCheck, 
  Bell, 
  Menu, 
  Search, 
  LogOut, 
  UserCheck,
  GraduationCap,
  ChevronDown,
  FileCheck,
  Award,
  Clock,
  Megaphone,
  BarChart2
} from 'lucide-react';
import { AuthLogo } from '../../components/AuthLogo';

import { useAuth } from '../../app/context/AuthContext';

interface HODAppShellProps {
  children: React.ReactNode;
}

export const HODAppShell: React.FC<HODAppShellProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signOut, profile, user } = useAuth();
  const hodName = profile?.full_name || user?.email?.split('@')[0] || 'Head of Department';
  const deptDisplayName = profile?.department?.name || 'Department not assigned';
  const hodEmail = profile?.email || user?.email || 'N/A';
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(4);
  
  const profileRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    if (confirm("Are you sure you want to sign out from the HOD Portal?")) {
      await signOut();
      navigate('/login/faculty');
    }
  };

  const navDashboard = [
    { label: 'Dashboard', path: '/hod/dashboard', icon: <LayoutDashboard size={18} /> }
  ];

  const navDeptManagement = [
    { label: 'Faculty', path: '/hod/faculty', icon: <UserCheck size={18} /> },
    { label: 'Students', path: '/hod/students', icon: <GraduationCap size={18} /> },
    { label: 'Courses', path: '/hod/courses', icon: <BookOpen size={18} /> },
    { label: 'Attendance', path: '/hod/attendance', icon: <CalendarCheck size={18} /> }
  ];

  const navAcademicGovernance = [
    { label: 'Leave & Approvals', path: '/hod/leave', icon: <FileCheck size={18} /> },
    { label: 'Assessments', path: '/hod/assessments', icon: <Award size={18} /> },
    { label: 'Results', path: '/hod/results', icon: <Award size={18} /> },
    { label: 'Timetable', path: '/hod/timetable', icon: <Clock size={18} /> },
    { label: 'Announcements', path: '/hod/announcements', icon: <Megaphone size={18} /> },
    { label: 'Analytics & Reports', path: '/hod/analytics', icon: <BarChart2 size={18} /> }
  ];

  const renderNavList = (items: typeof navDashboard) => (
    <ul className="sidebar-nav-list" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      {items.map((item) => {
        const isActive = location.pathname === item.path || location.pathname.startsWith(`${item.path}/`);
        return (
          <li key={item.path} style={{ marginBottom: '0.35rem' }}>
            <NavLink
              to={item.path}
              className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setIsSidebarOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.65rem 1rem',
                borderRadius: 'var(--border-radius)',
                color: isActive ? 'var(--brand-white)' : '#94A3B8',
                backgroundColor: isActive ? 'var(--brand-orange)' : 'transparent',
                fontWeight: isActive ? 600 : 500,
                fontSize: '0.9rem',
                textDecoration: 'none',
                transition: 'var(--transition-smooth)'
              }}
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className="app-shell" style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--brand-light-grey)' }}>
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 40
          }}
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Unified Fixed Sidebar */}
      <aside 
        className={`app-sidebar ${isSidebarOpen ? 'open' : ''}`}
        style={{
          width: '260px',
          backgroundColor: '#0F172A',
          color: 'var(--brand-white)',
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          zIndex: 50,
          boxShadow: 'var(--box-shadow-md)',
          transition: 'transform 0.3s ease-in-out'
        }}
      >
        {/* Logo Container */}
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <AuthLogo subtext={`HOD PORTAL — ${profile?.department?.code || profile?.department?.name || ''}`} />
        </div>

        {/* Navigation Section Group */}
        <div style={{ padding: '1.25rem 1rem', flexGrow: 1, overflowY: 'auto' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748B', letterSpacing: '0.05em', textTransform: 'uppercase', display: 'block', padding: '0 0.5rem 0.5rem 0.5rem' }}>
              DASHBOARD
            </span>
            {renderNavList(navDashboard)}
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748B', letterSpacing: '0.05em', textTransform: 'uppercase', display: 'block', padding: '0 0.5rem 0.5rem 0.5rem' }}>
              DEPARTMENT MANAGEMENT
            </span>
            {renderNavList(navDeptManagement)}
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748B', letterSpacing: '0.05em', textTransform: 'uppercase', display: 'block', padding: '0 0.5rem 0.5rem 0.5rem' }}>
              ACADEMIC GOVERNANCE
            </span>
            {renderNavList(navAcademicGovernance)}
          </div>
        </div>

        {/* Sidebar Footer — Sign Out */}
        <div style={{ padding: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.6rem 1rem',
              backgroundColor: 'transparent',
              border: 'none',
              borderRadius: 'var(--border-radius)',
              color: '#94A3B8',
              fontSize: '0.875rem',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'var(--transition-smooth)'
            }}
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Layout Area */}
      <div style={{ flexGrow: 1, marginLeft: '260px', display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Sticky Header Topbar */}
        <header 
          style={{
            height: '64px',
            backgroundColor: 'var(--brand-white)',
            borderBottom: '1px solid rgba(156, 163, 175, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 1.5rem',
            position: 'sticky',
            top: 0,
            zIndex: 30
          }}
        >
          {/* Mobile Hamburger Toggle & Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              style={{
                display: 'none',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--brand-black)'
              }}
              className="mobile-menu-btn"
            >
              <Menu size={22} />
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <span className="badge badge-graded" style={{ fontSize: '0.75rem' }}>{profile?.department?.code || profile?.department?.name || 'DEPARTMENT'}</span>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--brand-black)', margin: 0, fontFamily: 'var(--font-display)' }}>
                Department Head Portal
              </h2>
            </div>
          </div>

          {/* Search Bar & User Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            {/* Global Search Bar */}
            <div className="header-search" style={{ position: 'relative', width: '280px' }}>
              <Search size={16} className="header-search-icon" />
              <input 
                type="text" 
                placeholder="Search faculty, students, courses..."
                className="header-search-input"
              />
            </div>

            {/* Notification Bell */}
            <button 
              onClick={() => navigate('/hod/attendance')}
              style={{
                position: 'relative',
                background: 'none',
                border: 'none',
                color: 'var(--brand-dark-grey)',
                cursor: 'pointer',
                padding: '0.4rem',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              title="Department Notifications"
            >
              <Bell size={20} />
              {unreadNotifications > 0 && (
                <span 
                  style={{
                    position: 'absolute',
                    top: '2px',
                    right: '2px',
                    width: '8px',
                    height: '8px',
                    backgroundColor: 'var(--brand-orange)',
                    borderRadius: '50%'
                  }}
                />
              )}
            </button>

            {/* Profile Dropdown */}
            <div style={{ position: 'relative' }} ref={profileRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0.35rem 0.6rem',
                  borderRadius: 'var(--border-radius)'
                }}
              >
                <div 
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--brand-orange)',
                    color: 'var(--brand-white)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.85rem'
                  }}
                >
                  {(hodName.split(' ').map((n: string) => n[0]).join('')).substring(0, 2)}
                </div>
                <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--brand-black)', lineHeight: 1.2 }}>
                    {hodName}
                  </span>
                  <span style={{ fontSize: '0.725rem', color: 'var(--brand-dark-grey)' }}>
                    HOD · {deptDisplayName}
                  </span>
                </div>
                <ChevronDown size={14} style={{ color: 'var(--brand-dark-grey)' }} />
              </button>

              {/* Profile Menu Dropdown */}
              {isProfileOpen && (
                <div 
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: 'calc(100% + 8px)',
                    width: '220px',
                    backgroundColor: 'var(--brand-white)',
                    borderRadius: 'var(--border-radius)',
                    boxShadow: 'var(--box-shadow-lg)',
                    border: '1px solid rgba(156, 163, 175, 0.2)',
                    padding: '0.5rem',
                    zIndex: 60
                  }}
                >
                  <div style={{ padding: '0.5rem', borderBottom: '1px solid rgba(156, 163, 175, 0.2)', marginBottom: '0.35rem' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--brand-black)' }}>{hodName}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--brand-dark-grey)' }}>{hodEmail}</div>
                  </div>

                  <button
                    onClick={handleLogout}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.5rem',
                      backgroundColor: 'transparent',
                      border: 'none',
                      borderRadius: '4px',
                      color: 'var(--color-error)',
                      fontSize: '0.825rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    <LogOut size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Main Content Area */}
        <main style={{ flexGrow: 1, padding: '1.75rem 2rem', overflowY: 'auto' }}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default HODAppShell;
