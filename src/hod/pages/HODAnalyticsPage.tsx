import React, { useEffect, useState } from 'react';
import { BarChart2, TrendingUp, Users, CalendarCheck, Award, FileText, Printer, Filter, AlertTriangle, CheckCircle2, UserCheck } from 'lucide-react';
import { HODAppShell } from '../components/HODAppShell';
import { StatCard } from '../../components/StatCard';
import { getDepartmentOverview, getDepartmentAttendanceMetrics } from '../../services/departmentService';
import { getDepartmentResults } from '../../services/resultService';
import { getFacultyRoster } from '../../services/facultyService';
import type { FacultyMember } from '../../data/faculty';
import type { CourseResultSummary } from '../../data/results';

export const HODAnalyticsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'analytics' | 'reports'>('analytics');
  const [reportType, setReportType] = useState<'Overview' | 'Attendance' | 'Performance' | 'Course'>('Overview');
  const [semFilter, setSemFilter] = useState('All');
  const [facultyRoster, setFacultyRoster] = useState<FacultyMember[]>([]);
  const [courseResults, setCourseResults] = useState<CourseResultSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAnalyticsData = async () => {
      setLoading(true);
      try {
        const [facList, cResults] = await Promise.all([
          getFacultyRoster(),
          getDepartmentResults()
        ]);
        setFacultyRoster(facList);
        setCourseResults(cResults);
      } catch (err) {
        console.error("Error loading analytics data:", err);
      } finally {
        setLoading(false);
      }
    };
    loadAnalyticsData();
  }, []);

  const handlePrintReport = () => {
    window.print();
  };

  const filteredCourseResults = courseResults.filter(r => semFilter === 'All' || r.semester === Number(semFilter));

  return (
    <HODAppShell>
      {/* Header Banner */}
      <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span className="badge badge-active font-mono">ACADEMIC GOVERNANCE</span>
          <h1 className="font-display" style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--brand-black)', marginTop: '0.25rem', marginBottom: 0 }}>
            Department Analytics & Reports
          </h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--brand-dark-grey)', marginTop: '0.2rem' }}>
            Data Science Department Comprehensive Academic Performance & Compliance Intelligence
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '0.5rem', backgroundColor: 'var(--brand-light-grey)', padding: '0.25rem', borderRadius: 'var(--border-radius)', border: '1px solid rgba(156, 163, 175, 0.2)' }}>
            <button 
              onClick={() => setActiveTab('analytics')}
              className={`btn ${activeTab === 'analytics' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: '0.8rem', padding: '0.35rem 0.85rem' }}
            >
              Analytics Dashboard
            </button>
            <button 
              onClick={() => setActiveTab('reports')}
              className={`btn ${activeTab === 'reports' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: '0.8rem', padding: '0.35rem 0.85rem' }}
            >
              Generate Reports
            </button>
          </div>

          {activeTab === 'reports' && (
            <button onClick={handlePrintReport} className="btn btn-secondary font-sans">
              <Printer size={16} />
              <span>Print Report</span>
            </button>
          )}
        </div>
      </div>

      {activeTab === 'analytics' ? (
        <>
          {/* Department Performance Stat Cards */}
          <div className="stat-cards-grid" style={{ marginBottom: '1.75rem' }}>
            <StatCard
              title="AVERAGE CGPA"
              value="7.62"
              subtitle="Cumulative Dept Avg"
              icon={<Award size={22} />}
            />
            <StatCard
              title="ATTENDANCE RATE"
              value="84%"
              subtitle="Mandatory Target ≥80%"
              icon={<CalendarCheck size={22} />}
            />
            <StatCard
              title="ASSIGNMENT COMPLETION"
              value="88.5%"
              subtitle="Submission Rate"
              icon={<CheckCircle2 size={22} />}
            />
            <StatCard
              title="OVERALL PASS RATE"
              value="96.8%"
              subtitle="Department Exams"
              icon={<TrendingUp size={22} />}
            />
          </div>

          {/* Semester Performance Chart Bars & Alerts */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', marginBottom: '1.75rem' }}>
            
            {/* Student Performance per Semester */}
            <div className="dashboard-panel">
              <h2 className="panel-title font-display" style={{ marginBottom: '1rem' }}>Semester Academic Averages</h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {[
                  { sem: 3, avg: 78, label: 'Semester 3 (Data Science Core)' },
                  { sem: 4, avg: 81, label: 'Semester 4 (Algorithms & Systems)' },
                  { sem: 5, avg: 84, label: 'Semester 5 (Machine Learning & AI)' },
                  { sem: 6, avg: 79, label: 'Semester 6 (Advanced Analytics)' }
                ].map((item) => (
                  <div key={item.sem}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, color: 'var(--brand-black)', marginBottom: '0.35rem' }}>
                      <span>{item.label}</span>
                      <span className="font-mono text-blue">{item.avg}%</span>
                    </div>
                    <div style={{ height: '8px', backgroundColor: 'var(--brand-light-grey)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${item.avg}%`, backgroundColor: item.avg >= 80 ? 'var(--color-success)' : 'var(--brand-blue)', borderRadius: '4px' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Academic Alerts Box */}
            <div className="dashboard-panel">
              <h2 className="panel-title font-display text-error" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <AlertTriangle size={18} />
                <span>Academic Alerts</span>
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.85rem' }}>
                <div style={{ backgroundColor: '#FEF2F2', border: '1px solid #FCA5A5', padding: '0.75rem', borderRadius: 'var(--border-radius)' }}>
                  <div style={{ fontWeight: 700, color: '#991B1B' }}>Attendance Warning (&lt; 75%)</div>
                  <div style={{ color: '#B91C1C', fontSize: '0.775rem', marginTop: '0.15rem' }}>18 Students below mandatory threshold</div>
                </div>

                <div style={{ backgroundColor: '#FFFBEB', border: '1px solid #FDE68A', padding: '0.75rem', borderRadius: 'var(--border-radius)' }}>
                  <div style={{ fontWeight: 700, color: '#92400E' }}>Pending Assessment Evaluations</div>
                  <div style={{ color: '#B45309', fontSize: '0.775rem', marginTop: '0.15rem' }}>CSE-603 evaluation overdue by 2 days</div>
                </div>

                <div style={{ backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE', padding: '0.75rem', borderRadius: 'var(--border-radius)' }}>
                  <div style={{ fontWeight: 700, color: '#1E40AF' }}>At-Risk Academic Warning</div>
                  <div style={{ color: '#1D4ED8', fontSize: '0.775rem', marginTop: '0.15rem' }}>4 Students identified for HOD counselling</div>
                </div>
              </div>
            </div>

          </div>

          {/* Course Performance Table */}
          <div className="dashboard-panel" style={{ marginBottom: '1.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div>
                <h2 className="panel-title font-display">Course Analytics Matrix</h2>
                <p style={{ fontSize: '0.8rem', color: 'var(--brand-dark-grey)', marginTop: '0.1rem' }}>Attendance, Assignment & Assessment Metrics by Course</p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Filter size={14} style={{ color: 'var(--brand-dark-grey)' }} />
                <select 
                  className="form-select font-sans"
                  style={{ width: '140px', padding: '0.4rem 0.65rem', fontSize: '0.8rem' }}
                  value={semFilter}
                  onChange={(e) => setSemFilter(e.target.value)}
                >
                  <option value="All">All Semesters</option>
                  <option value="4">Semester 4</option>
                  <option value="6">Semester 6</option>
                </select>
              </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
                <thead>
                  <tr style={{ backgroundColor: 'var(--brand-light-grey)', borderBottom: '1px solid rgba(156, 163, 175, 0.2)', fontWeight: 700, color: 'var(--brand-black)', textTransform: 'uppercase', fontSize: '0.75rem' }}>
                    <th style={{ padding: '0.85rem 1rem' }}>Course Code & Name</th>
                    <th style={{ padding: '0.85rem 1rem' }}>Faculty In-Charge</th>
                    <th style={{ padding: '0.85rem 1rem' }}>Students</th>
                    <th style={{ padding: '0.85rem 1rem' }}>Attendance</th>
                    <th style={{ padding: '0.85rem 1rem' }}>Assignment %</th>
                    <th style={{ padding: '0.85rem 1rem' }}>Exam Average</th>
                    <th style={{ padding: '0.85rem 1rem' }}>Pass Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCourseResults.map((cr) => (
                    <tr key={cr.courseId} style={{ borderBottom: '1px solid rgba(156, 163, 175, 0.15)' }}>
                      <td style={{ padding: '0.85rem 1rem' }}>
                        <span className="font-mono text-blue font-bold">{cr.courseCode}</span>
                        <div style={{ fontWeight: 700, color: 'var(--brand-black)' }}>{cr.courseName}</div>
                      </td>
                      <td style={{ padding: '0.85rem 1rem', fontWeight: 600 }}>{cr.facultyName}</td>
                      <td style={{ padding: '0.85rem 1rem' }} className="font-mono">{cr.totalStudents}</td>
                      <td style={{ padding: '0.85rem 1rem' }} className="font-mono font-bold text-blue">84%</td>
                      <td style={{ padding: '0.85rem 1rem' }} className="font-mono font-bold">89%</td>
                      <td style={{ padding: '0.85rem 1rem' }} className="font-mono font-bold">{cr.averageMarksPercent}%</td>
                      <td style={{ padding: '0.85rem 1rem' }} className="font-mono text-success font-bold">{cr.passRatePercent}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Faculty Activity Monitoring Table */}
          <div className="dashboard-panel">
            <h2 className="panel-title font-display" style={{ marginBottom: '1rem' }}>Department Faculty Activity Overview</h2>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
                <thead>
                  <tr style={{ backgroundColor: 'var(--brand-light-grey)', borderBottom: '1px solid rgba(156, 163, 175, 0.2)', fontWeight: 700, color: 'var(--brand-black)', textTransform: 'uppercase', fontSize: '0.75rem' }}>
                    <th style={{ padding: '0.85rem 1rem' }}>Faculty Name</th>
                    <th style={{ padding: '0.85rem 1rem' }}>Designation</th>
                    <th style={{ padding: '0.85rem 1rem' }}>Assigned Courses</th>
                    <th style={{ padding: '0.85rem 1rem' }}>Students Taught</th>
                    <th style={{ padding: '0.85rem 1rem' }}>Attendance Sessions</th>
                    <th style={{ padding: '0.85rem 1rem' }}>Evaluations Completed</th>
                  </tr>
                </thead>
                <tbody>
                  {facultyRoster.map((fac) => (
                    <tr key={fac.id} style={{ borderBottom: '1px solid rgba(156, 163, 175, 0.15)' }}>
                      <td style={{ padding: '0.85rem 1rem', fontWeight: 700, color: 'var(--brand-black)' }}>{fac.name}</td>
                      <td style={{ padding: '0.85rem 1rem', color: 'var(--brand-dark-grey)' }}>{fac.designation}</td>
                      <td style={{ padding: '0.85rem 1rem' }} className="font-mono font-bold">{fac.allocatedCoursesCount} Courses</td>
                      <td style={{ padding: '0.85rem 1rem' }} className="font-mono">{fac.totalStudentsTaught} Students</td>
                      <td style={{ padding: '0.85rem 1rem' }} className="font-mono font-bold text-blue">{fac.attendanceLoggedCount} Logs</td>
                      <td style={{ padding: '0.85rem 1rem' }} className="font-mono text-success font-bold">100%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        /* Report Generation Mode */
        <div className="dashboard-panel">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(156, 163, 175, 0.2)' }}>
            <div>
              <h2 className="panel-title font-display">Printable Department Report View</h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--brand-dark-grey)', marginTop: '0.1rem' }}>Select report category and preview formal academic summary</p>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {(['Overview', 'Attendance', 'Performance', 'Course'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setReportType(r)}
                  className={`btn ${reportType === r ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem' }}
                >
                  {r} Report
                </button>
              ))}
            </div>
          </div>

          {/* Printable Report Page Box */}
          <div 
            id="printable-report"
            style={{
              backgroundColor: '#FFF',
              padding: '2rem',
              border: '1px solid rgba(156, 163, 175, 0.3)',
              borderRadius: 'var(--border-radius)',
              color: 'var(--brand-black)'
            }}
          >
            {/* Formal College Header */}
            <div style={{ textAlign: 'center', borderBottom: '2px solid var(--brand-black)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                ALVA'S INSTITUTE OF ENGINEERING & TECHNOLOGY
              </h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--brand-dark-grey)', margin: '0.25rem 0 0 0' }}>
                Department of Computer Science & Engineering (Data Science)
              </p>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--brand-blue)', marginTop: '0.5rem', margin: 0 }}>
                {reportType.toUpperCase()} ACADEMIC REPORT — AY 2026–27
              </h3>
            </div>

            {/* Report Metadata */}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--brand-dark-grey)', marginBottom: '1.5rem' }}>
              <div>Generated By: <strong>Dr. Sneha Reddy (HOD)</strong></div>
              <div>Date: <strong className="font-mono">{new Date().toLocaleDateString()}</strong></div>
              <div>Scope: <strong>CSE — Data Science</strong></div>
            </div>

            {/* Content summary based on type */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ backgroundColor: 'var(--brand-light-grey)', padding: '1rem', borderRadius: 'var(--border-radius)' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: '0 0 0.5rem 0' }}>Executive Summary</h4>
                <p style={{ fontSize: '0.875rem', lineHeight: 1.5, margin: 0 }}>
                  This report summarizes the academic standing, student performance metrics, and attendance compliance for the Data Science department. Overall department attendance stands at 84%, with a cumulative CGPA average of 7.62 across Semesters 3 through 6.
                </p>
              </div>

              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem', marginTop: '1rem' }}>
                <thead>
                  <tr style={{ backgroundColor: 'var(--brand-light-grey)', borderBottom: '1px solid var(--brand-black)', fontWeight: 700 }}>
                    <th style={{ padding: '0.75rem' }}>Indicator</th>
                    <th style={{ padding: '0.75rem' }}>Current Metric</th>
                    <th style={{ padding: '0.75rem' }}>Target Standard</th>
                    <th style={{ padding: '0.75rem' }}>Compliance Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid rgba(156, 163, 175, 0.2)' }}>
                    <td style={{ padding: '0.75rem', fontWeight: 600 }}>Overall Attendance</td>
                    <td style={{ padding: '0.75rem' }} className="font-mono font-bold">84%</td>
                    <td style={{ padding: '0.75rem' }} className="font-mono">≥ 80%</td>
                    <td style={{ padding: '0.75rem', color: 'var(--color-success)', fontWeight: 700 }}>Compliant</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(156, 163, 175, 0.2)' }}>
                    <td style={{ padding: '0.75rem', fontWeight: 600 }}>Assignment Submissions</td>
                    <td style={{ padding: '0.75rem' }} className="font-mono font-bold">88.5%</td>
                    <td style={{ padding: '0.75rem' }} className="font-mono">≥ 85%</td>
                    <td style={{ padding: '0.75rem', color: 'var(--color-success)', fontWeight: 700 }}>Compliant</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(156, 163, 175, 0.2)' }}>
                    <td style={{ padding: '0.75rem', fontWeight: 600 }}>Examination Pass Rate</td>
                    <td style={{ padding: '0.75rem' }} className="font-mono font-bold">96.8%</td>
                    <td style={{ padding: '0.75rem' }} className="font-mono">≥ 90%</td>
                    <td style={{ padding: '0.75rem', color: 'var(--color-success)', fontWeight: 700 }}>Compliant</td>
                  </tr>
                </tbody>
              </table>

              <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: '2rem' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ borderBottom: '1px solid var(--brand-black)', width: '180px', marginBottom: '0.25rem' }}></div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700 }}>Department Coordinator</div>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <div style={{ borderBottom: '1px solid var(--brand-black)', width: '180px', marginBottom: '0.25rem' }}></div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700 }}>Dr. Sneha Reddy (HOD)</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </HODAppShell>
  );
};

export default HODAnalyticsPage;
