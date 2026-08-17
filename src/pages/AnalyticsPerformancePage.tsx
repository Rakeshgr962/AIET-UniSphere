import React, { useState, useEffect } from 'react';
import { Award, BookOpen, CalendarCheck, ClipboardList, TrendingUp } from 'lucide-react';
import { AppShell } from '../components/AppShell';
import { LoadingState } from '../components/LoadingState';
import { StatCard } from '../components/StatCard';
import { PerformanceChart } from '../components/PerformanceChart';
import { SubjectPerformance } from '../components/SubjectPerformance';
import { InsightCard } from '../components/InsightCard';
import type { 
  AcademicOverviewStats, 
  SemesterTrendItem, 
  SubjectPerformanceItem, 
  AssessmentBreakdownItem, 
  AssignmentCompletionData, 
  PerformanceInsights 
} from '../data/analytics';
import { 
  getAcademicOverview, 
  getSemesterTrends, 
  getSubjectPerformances, 
  getAssessmentBreakdown, 
  getAssignmentStats, 
  getPerformanceInsights 
} from '../services/analyticsService';

export const AnalyticsPerformancePage: React.FC = () => {
  const [overview, setOverview] = useState<AcademicOverviewStats | null>(null);
  const [trends, setTrends] = useState<SemesterTrendItem[]>([]);
  const [subjects, setSubjects] = useState<SubjectPerformanceItem[]>([]);
  const [assessments, setAssessments] = useState<AssessmentBreakdownItem[]>([]);
  const [assignments, setAssignments] = useState<AssignmentCompletionData | null>(null);
  const [insights, setInsights] = useState<PerformanceInsights | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const [ov, tr, sub, ass, asg, ins] = await Promise.all([
        getAcademicOverview(),
        getSemesterTrends(),
        getSubjectPerformances(),
        getAssessmentBreakdown(),
        getAssignmentStats(),
        getPerformanceInsights()
      ]);
      setOverview(ov);
      setTrends(tr);
      setSubjects(sub);
      setAssessments(ass);
      setAssignments(asg);
      setInsights(ins);
      setIsLoading(false);
    };
    loadData();
  }, []);

  return (
    <AppShell>
      {/* Page Header */}
      <div className="page-header-container">
        <div>
          <div className="breadcrumbs">
            <span>Intelligence</span>
            <span className="breadcrumbs-separator">/</span>
            <span style={{ fontWeight: 600, color: 'var(--brand-black)' }}>Analytics & Performance</span>
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700 }}>Student Academic Analytics</h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--brand-dark-grey)', marginTop: '0.125rem' }}>
            Answering "How am I performing academically?" across CGPA trends, subjects, assessments, and attendance.
          </p>
        </div>
      </div>

      {isLoading || !overview || !insights || !assignments ? (
        <LoadingState message="Loading academic performance metrics..." />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Performance Stat Cards Row */}
          <div className="stats-grid">
            <StatCard
              title="Overall CGPA"
              value={`${overview.cgpa.toFixed(2)}`}
              icon={<Award size={20} className="text-orange" />}
              accentColor="orange"
            />
            <StatCard
              title="Current Semester GPA"
              value={`${overview.sgpa.toFixed(2)}`}
              icon={<TrendingUp size={20} className="text-blue" />}
              accentColor="blue"
            />
            <StatCard
              title="Overall Attendance"
              value={`${overview.attendancePercent}%`}
              icon={<CalendarCheck size={20} className="text-orange" />}
              accentColor="orange"
            />
            <StatCard
              title="Assignment Completion"
              value={`${overview.assignmentCompletionPercent}%`}
              icon={<ClipboardList size={20} className="text-blue" />}
              accentColor="blue"
            />
            <StatCard
              title="Assessment Average"
              value={`${overview.assessmentAveragePercent}%`}
              icon={<BookOpen size={20} className="text-orange" />}
              accentColor="orange"
            />
          </div>

          {/* Performance Insights */}
          <InsightCard insights={insights} />

          {/* Academic Performance Trend Chart */}
          <PerformanceChart trends={trends} />

          {/* Subject Level Performance */}
          <SubjectPerformance subjects={subjects} />

          {/* Assessment & Assignment Performance Split Grid */}
          <div className="analytics-split-grid">
            {/* Assessment Performance Breakdown */}
            <div className="card-box">
              <div className="card-header-bar mb-3">
                <h3 className="card-title font-display">Assessment Performance Breakdown</h3>
                <span className="font-mono text-dark-grey" style={{ fontSize: '0.8rem' }}>Sem 6 Tests</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {assessments.map((ass, idx) => (
                  <div key={idx} className="assessment-stat-item">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                      <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>{ass.name}</span>
                      <span className="font-mono font-bold text-orange" style={{ fontSize: '0.85rem' }}>
                        {ass.score} / {ass.total} ({ass.percentage}%)
                      </span>
                    </div>
                    <div className="progress-bar-bg" style={{ height: '6px' }}>
                      <div className="progress-bar-fill orange-bg" style={{ width: `${ass.percentage}%` }} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.2rem', fontSize: '0.75rem' }} className="font-mono text-dark-grey">
                      <span>Date: {ass.date}</span>
                      <span className="text-success font-bold">Trend: +{((ass.percentage - 75) * 0.2).toFixed(1)}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Assignment Performance */}
            <div className="card-box">
              <div className="card-header-bar mb-3">
                <h3 className="card-title font-display">Assignment Status Overview</h3>
                <span className="font-mono text-dark-grey" style={{ fontSize: '0.8rem' }}>Rate: {assignments.completionPercentage}%</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                <div style={{ padding: '0.85rem', background: 'var(--brand-light-grey)', borderRadius: 'var(--border-radius)', textAlign: 'center' }}>
                  <span className="font-mono text-dark-grey" style={{ fontSize: '0.75rem' }}>Submitted</span>
                  <div className="font-mono font-bold text-blue" style={{ fontSize: '1.5rem', marginTop: '0.2rem' }}>
                    {assignments.submitted}
                  </div>
                </div>

                <div style={{ padding: '0.85rem', background: 'var(--brand-light-grey)', borderRadius: 'var(--border-radius)', textAlign: 'center' }}>
                  <span className="font-mono text-dark-grey" style={{ fontSize: '0.75rem' }}>Graded</span>
                  <div className="font-mono font-bold text-success" style={{ fontSize: '1.5rem', marginTop: '0.2rem' }}>
                    {assignments.graded}
                  </div>
                </div>

                <div style={{ padding: '0.85rem', background: 'var(--brand-light-grey)', borderRadius: 'var(--border-radius)', textAlign: 'center' }}>
                  <span className="font-mono text-dark-grey" style={{ fontSize: '0.75rem' }}>Pending</span>
                  <div className="font-mono font-bold text-orange" style={{ fontSize: '1.5rem', marginTop: '0.2rem' }}>
                    {assignments.pending}
                  </div>
                </div>

                <div style={{ padding: '0.85rem', background: 'var(--brand-light-grey)', borderRadius: 'var(--border-radius)', textAlign: 'center' }}>
                  <span className="font-mono text-dark-grey" style={{ fontSize: '0.75rem' }}>Late</span>
                  <div className="font-mono font-bold text-error" style={{ fontSize: '1.5rem', marginTop: '0.2rem' }}>
                    {assignments.late}
                  </div>
                </div>
              </div>

              <div className="font-mono text-dark-grey" style={{ fontSize: '0.8rem', borderTop: '1px border var(--brand-border)', paddingTop: '0.75rem' }}>
                Overall 15 out of 16 assignments graded with an average score of 88.2%.
              </div>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
};

export default AnalyticsPerformancePage;
