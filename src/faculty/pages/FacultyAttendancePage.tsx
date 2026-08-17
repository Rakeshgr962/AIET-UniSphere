import React, { useState, useEffect } from 'react';
import { CalendarCheck, CheckCircle2, XCircle, Clock, AlertTriangle, Save, RefreshCw } from 'lucide-react';
import { FacultyAppShell } from '../components/FacultyAppShell';
import { mockFacultyCoursesList } from '../../services/courseService';
import { getAllStudents } from '../../services/studentService';
import type { ExtendedStudent } from '../../data/students';
import { markAttendanceSession, getFacultyAttendanceLogs } from '../../services/attendanceService';
import type { AttendanceSessionLog } from '../../services/attendanceService';

export const FacultyAttendancePage: React.FC = () => {
  const [selectedCourseId, setSelectedCourseId] = useState<string>('cse-601');
  const [sessionDate, setSessionDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [sessionTime, setSessionTime] = useState<string>('09:00 AM - 10:00 AM');
  const [section, setSection] = useState<string>('Section A');

  const [students, setStudents] = useState<ExtendedStudent[]>([]);
  const [attendanceMap, setAttendanceMap] = useState<{ [studentId: string]: 'Present' | 'Absent' | 'Late' }>({});
  const [historyLogs, setHistoryLogs] = useState<AttendanceSessionLog[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'mark' | 'history' | 'alerts'>('mark');

  useEffect(() => {
    Promise.all([
      getAllStudents(),
      getFacultyAttendanceLogs()
    ]).then(([stds, logs]) => {
      setStudents(stds);
      setHistoryLogs(logs);

      // Initialize default attendance to 'Present' for all students
      const initialMap: { [studentId: string]: 'Present' | 'Absent' | 'Late' } = {};
      stds.forEach(s => { initialMap[s.id] = 'Present'; });
      setAttendanceMap(initialMap);

      setIsLoading(false);
    });
  }, []);

  const defaultCourse = {
    id: 'cse-601',
    code: 'CSE-601',
    name: 'Database Management Systems',
    semester: 6,
    department: 'CSE — Data Science'
  };

  const coursesList = mockFacultyCoursesList.length > 0 ? mockFacultyCoursesList : [defaultCourse];
  const selectedCourse = coursesList.find(c => c.id === selectedCourseId) || coursesList[0];

  const handleMarkAllPresent = () => {
    const updated: typeof attendanceMap = {};
    students.forEach(s => { updated[s.id] = 'Present'; });
    setAttendanceMap(updated);
  };

  const handleStatusToggle = (studentId: string, status: 'Present' | 'Absent' | 'Late') => {
    setAttendanceMap(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const handleSaveAttendance = async () => {
    setIsSaving(true);
    const records = students.map(s => ({
      studentId: s.id,
      studentName: s.name,
      usn: s.usn,
      status: attendanceMap[s.id] || 'Present',
      currentAttendancePercent: s.attendancePercent ?? null
    }));

    try {
      await markAttendanceSession(
        selectedCourse.code,
        selectedCourse.name,
        sessionDate,
        sessionTime,
        records
      );

      setIsSaving(false);
      alert(`Attendance saved successfully for ${selectedCourse.code}! Shared student state updated.`);
      
      // Refresh session logs
      const updatedLogs = await getFacultyAttendanceLogs();
      setHistoryLogs(updatedLogs);
    } catch (err) {
      console.error(err);
      setIsSaving(false);
    }
  };

  const lowAttendanceStudents = students.filter(s => (s.attendancePercent ?? 100) < 75);

  return (
    <FacultyAppShell>
      {/* Page Title Header */}
      <div style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '0.25rem', textAlign: 'left' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, fontFamily: 'var(--font-display)', color: 'var(--brand-black)' }}>
          Attendance Management
        </h1>
        <p style={{ fontSize: '0.9rem', color: 'var(--brand-dark-grey)', fontWeight: 500 }}>
          Record class attendance sessions, view attendance logs, and monitor students below the 75% threshold.
        </p>
      </div>

      {/* Course & Session Selector Bar */}
      <div className="dashboard-panel" style={{ marginBottom: '1.5rem', padding: '1.25rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', alignItems: 'flex-end' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--brand-dark-grey)', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
              Course
            </label>
            <select 
              className="header-search-input"
              style={{ width: '100%', borderRadius: 'var(--border-radius)', cursor: 'pointer' }}
              value={selectedCourseId}
              onChange={(e) => setSelectedCourseId(e.target.value)}
            >
              {coursesList.map(c => (
                <option key={c.id} value={c.id}>
                  {c.code} — {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--brand-dark-grey)', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
              Date
            </label>
            <input 
              type="date" 
              className="header-search-input"
              style={{ width: '100%', borderRadius: 'var(--border-radius)' }}
              value={sessionDate}
              onChange={(e) => setSessionDate(e.target.value)}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--brand-dark-grey)', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
              Session Slot
            </label>
            <select 
              className="header-search-input"
              style={{ width: '100%', borderRadius: 'var(--border-radius)', cursor: 'pointer' }}
              value={sessionTime}
              onChange={(e) => setSessionTime(e.target.value)}
            >
              <option value="09:00 AM - 10:00 AM">09:00 AM - 10:00 AM</option>
              <option value="10:15 AM - 11:15 AM">10:15 AM - 11:15 AM</option>
              <option value="11:30 AM - 12:30 PM">11:30 AM - 12:30 PM</option>
              <option value="02:00 PM - 03:00 PM">02:00 PM - 03:00 PM</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--brand-dark-grey)', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
              Section
            </label>
            <select 
              className="header-search-input"
              style={{ width: '100%', borderRadius: 'var(--border-radius)', cursor: 'pointer' }}
              value={section}
              onChange={(e) => setSection(e.target.value)}
            >
              <option value="Section A">Section A (CSE DS)</option>
              <option value="Section B">Section B (CSE DS)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="dashboard-panel" style={{ padding: '0.5rem 0.75rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button 
            className={`btn ${activeTab === 'mark' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('mark')}
            style={{ width: 'auto', fontSize: '0.85rem' }}
          >
            <CalendarCheck size={16} />
            <span>Mark Attendance Grid</span>
          </button>

          <button 
            className={`btn ${activeTab === 'history' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('history')}
            style={{ width: 'auto', fontSize: '0.85rem' }}
          >
            <Clock size={16} />
            <span>Session Logs ({historyLogs.length})</span>
          </button>

          <button 
            className={`btn ${activeTab === 'alerts' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('alerts')}
            style={{ width: 'auto', fontSize: '0.85rem' }}
          >
            <AlertTriangle size={16} />
            <span>Low Attendance Alerts ({lowAttendanceStudents.length})</span>
          </button>
        </div>
      </div>

      {/* TAB 1: MARK ATTENDANCE GRID */}
      {activeTab === 'mark' && (
        <div className="dashboard-panel">
          <div className="panel-header-row" style={{ marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <h3 className="panel-title" style={{ fontSize: '1.1rem' }}>
                Attendance Grid — {selectedCourse.code} ({students.length} Students)
              </h3>
              <p style={{ fontSize: '0.825rem', color: 'var(--brand-dark-grey)', marginTop: '0.1rem' }}>
                Mark students as Present, Absent, or Late for session on {sessionDate}.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.65rem' }}>
              <button className="btn btn-secondary" onClick={handleMarkAllPresent} style={{ width: 'auto', fontSize: '0.825rem' }}>
                <CheckCircle2 size={15} />
                <span>Mark All Present</span>
              </button>

              <button className="btn btn-primary" onClick={handleSaveAttendance} disabled={isSaving} style={{ width: 'auto', fontSize: '0.825rem' }}>
                <Save size={15} />
                <span>{isSaving ? 'Saving Session...' : 'Save Attendance Session'}</span>
              </button>
            </div>
          </div>

          {students.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3.5rem 1.5rem', color: 'var(--brand-dark-grey)' }}>
              <CalendarCheck size={44} style={{ margin: '0 auto 0.75rem', opacity: 0.4, color: 'var(--brand-black)' }} />
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--brand-black)' }}>No Enrolled Students Registered</h4>
              <p style={{ fontSize: '0.85rem', marginTop: '0.25rem', maxWidth: '420px', marginInline: 'auto' }}>
                Students enrolled in {selectedCourse.code} ({selectedCourse.name}) will populate in this attendance grid upon database sync.
              </p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table font-sans">
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>USN</th>
                    <th>Current Attendance %</th>
                    <th>Status Selector</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((std) => {
                    const currentStatus = attendanceMap[std.id] || 'Present';
                    return (
                      <tr key={std.id}>
                        <td style={{ fontWeight: 600, color: 'var(--brand-black)' }}>{std.name}</td>
                        <td style={{ fontSize: '0.85rem', fontFamily: 'monospace' }}>{std.usn}</td>
                        <td>
                          <span style={{ fontWeight: 700, color: std.attendancePercent && std.attendancePercent < 75 ? 'var(--color-error)' : 'var(--brand-blue)' }}>
                            {std.attendancePercent != null ? `${std.attendancePercent}%` : 'Not provided'}
                          </span>
                        </td>
                        <td>
                          <div style={{ display: 'inline-flex', backgroundColor: 'var(--brand-light-grey)', padding: '3px', borderRadius: 'var(--border-radius)', border: '1px solid rgba(156, 163, 175, 0.3)' }}>
                            <button
                              type="button"
                              onClick={() => handleStatusToggle(std.id, 'Present')}
                              style={{
                                padding: '4px 12px',
                                fontSize: '0.775rem',
                                fontWeight: currentStatus === 'Present' ? 700 : 500,
                                borderRadius: '4px',
                                border: 'none',
                                backgroundColor: currentStatus === 'Present' ? 'var(--brand-blue)' : 'transparent',
                                color: currentStatus === 'Present' ? 'var(--brand-white)' : 'var(--brand-dark-grey)',
                                cursor: 'pointer',
                                transition: 'var(--transition-smooth)'
                              }}
                            >
                              Present
                            </button>
                            <button
                              type="button"
                              onClick={() => handleStatusToggle(std.id, 'Absent')}
                              style={{
                                padding: '4px 12px',
                                fontSize: '0.775rem',
                                fontWeight: currentStatus === 'Absent' ? 700 : 500,
                                borderRadius: '4px',
                                border: 'none',
                                backgroundColor: currentStatus === 'Absent' ? 'var(--brand-orange)' : 'transparent',
                                color: currentStatus === 'Absent' ? 'var(--brand-white)' : 'var(--brand-dark-grey)',
                                cursor: 'pointer',
                                transition: 'var(--transition-smooth)'
                              }}
                            >
                              Absent
                            </button>
                            <button
                              type="button"
                              onClick={() => handleStatusToggle(std.id, 'Late')}
                              style={{
                                padding: '4px 12px',
                                fontSize: '0.775rem',
                                fontWeight: currentStatus === 'Late' ? 700 : 500,
                                borderRadius: '4px',
                                border: 'none',
                                backgroundColor: currentStatus === 'Late' ? '#f59e0b' : 'transparent',
                                color: currentStatus === 'Late' ? 'var(--brand-white)' : 'var(--brand-dark-grey)',
                                cursor: 'pointer',
                                transition: 'var(--transition-smooth)'
                              }}
                            >
                              Late
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: SESSION HISTORY */}
      {activeTab === 'history' && (
        <div className="dashboard-panel">
          <h3 className="panel-title" style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Past Attendance Sessions</h3>
          <div className="table-responsive">
            <table className="table font-sans">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Course</th>
                  <th>Present</th>
                  <th>Absent</th>
                  <th>Late</th>
                  <th>Total Enrolled</th>
                  <th>Marked By</th>
                </tr>
              </thead>
              <tbody>
                {historyLogs.map((log) => (
                  <tr key={log.id}>
                    <td style={{ fontFamily: 'monospace' }}>{log.date}</td>
                    <td style={{ fontWeight: 600, color: 'var(--brand-black)' }}>{log.courseCode} — {log.courseName}</td>
                    <td style={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--brand-blue)' }}>{log.presentCount}</td>
                    <td style={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--brand-orange)' }}>{log.absentCount}</td>
                    <td style={{ fontFamily: 'monospace', fontWeight: 700 }}>{log.lateCount}</td>
                    <td style={{ fontFamily: 'monospace' }}>{log.totalStudents}</td>
                    <td style={{ fontSize: '0.85rem', color: 'var(--brand-dark-grey)' }}>{log.markedBy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: ATTENDANCE ALERTS */}
      {activeTab === 'alerts' && (
        <div className="dashboard-panel">
          <h3 className="panel-title" style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
            Students Below 75% Attendance Threshold
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {lowAttendanceStudents.map((std) => (
              <div key={std.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.85rem 1rem', borderRadius: 'var(--border-radius)', backgroundColor: 'var(--brand-light-grey)', border: '1px solid rgba(156, 163, 175, 0.2)' }}>
                <div>
                  <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--brand-black)' }}>{std.name}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--brand-dark-grey)', marginLeft: '0.5rem', fontFamily: 'monospace' }}>({std.usn})</span>
                  <p style={{ fontSize: '0.8rem', color: 'var(--brand-dark-grey)', marginTop: '0.15rem' }}>{std.department} • Semester {std.semester}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span className="badge badge-overdue" style={{ fontSize: '0.85rem' }}>
                    {std.attendancePercent}% Attendance
                  </span>
                  <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-error)', marginTop: '0.2rem', fontWeight: 500 }}>
                    Requires Attendance Warning Notice
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </FacultyAppShell>
  );
};

export default FacultyAttendancePage;
