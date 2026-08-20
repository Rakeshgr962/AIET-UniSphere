import React, { useEffect, useState } from 'react';
import { AppShell } from '../components/AppShell';
import { Clock, CalendarCheck, MapPin, AlertCircle } from 'lucide-react';
import { LoadingState } from '../components/LoadingState';
import { useAuth } from '../app/context/AuthContext';
import { supabase } from '../lib/supabase';
import { getStudentProfile } from '../services/studentService';

interface TimetableEntry {
  id: string;
  course_code: string;
  course_name: string;
  faculty_name: string;
  day: string;
  start_time: string;
  end_time: string;
  room: string;
  semester: number;
  section?: string;
}

export const TimetablePage: React.FC = () => {
  const { profile: authProfile } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [schedule, setSchedule] = useState<TimetableEntry[]>([]);
  const [studentSemester, setStudentSemester] = useState<number | null>(null);

  useEffect(() => {
    const loadTimetable = async () => {
      setLoading(true);
      setError(null);
      try {
        // Get student profile to know their semester
        const profData = await getStudentProfile();
        const sem = profData?.semester;
        setStudentSemester(sem ?? null);

        if (!authProfile?.department_id) {
          setSchedule([]);
          setLoading(false);
          return;
        }

        // Query timetable from Supabase if table exists
        const { data, error: dbErr } = await (supabase as any)
          .from('timetable')
          .select('*')
          .eq('department_id', authProfile.department_id)
          .order('day', { ascending: true })
          .order('start_time', { ascending: true });

        if (dbErr) {
          // Table may not exist yet — show empty state, not error
          console.warn('Timetable query:', dbErr.message);
          setSchedule([]);
        } else {
          // Optionally filter by student's semester
          let filtered = data || [];
          if (sem) {
            filtered = filtered.filter((t: any) => t.semester === sem);
          }
          setSchedule(filtered);
        }
      } catch (err: any) {
        setError('Unable to load timetable. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadTimetable();
  }, [authProfile?.department_id]);

  return (
    <AppShell>
      <div className="page-header-container">
        <div>
          <div className="breadcrumbs">
            <span>Academics</span>
            <span className="breadcrumbs-separator">/</span>
            <span style={{ fontWeight: 600, color: 'var(--brand-black)' }}>Timetable</span>
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700 }}>
            {studentSemester ? `Semester ${studentSemester} Timetable` : 'Timetable'}
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--brand-dark-grey)', marginTop: '0.125rem' }}>
            Daily lecture schedules, lab locations, and faculty allocations
          </p>
        </div>
      </div>

      {loading ? (
        <LoadingState message="Loading timetable..." />
      ) : error ? (
        <div className="dashboard-panel" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
          <AlertCircle size={36} style={{ margin: '0 auto 0.75rem', color: '#EF4444' }} />
          <p style={{ fontWeight: 600, fontSize: '1rem', color: '#991B1B' }}>{error}</p>
        </div>
      ) : schedule.length === 0 ? (
        <div className="dashboard-panel" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
          <CalendarCheck size={48} style={{ margin: '0 auto 1rem', color: '#94A3B8' }} />
          <h2 className="font-display" style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--brand-black)' }}>
            No timetable has been configured for your semester yet.
          </h2>
          <p style={{ color: 'var(--brand-dark-grey)', marginTop: '0.5rem', fontSize: '0.9rem' }}>
            Please check with your department administration for schedule updates.
          </p>
        </div>
      ) : (
        <div className="card-box">
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CalendarCheck size={18} className="text-orange-icon" />
            Schedule
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {schedule.map((item) => (
              <div key={item.id} className="timetable-row-card">
                <div className="time-badge font-mono">
                  <Clock size={14} style={{ display: 'inline', marginRight: '0.25rem' }} />
                  {item.start_time} - {item.end_time}
                </div>
                <div style={{ flexGrow: 1 }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--brand-black)' }}>
                    {item.course_code} {item.course_name}
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--brand-dark-grey)' }}>
                    Instructor: {item.faculty_name} · {item.day}
                  </p>
                </div>
                <div className="room-badge">
                  <MapPin size={13} /> {item.room}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </AppShell>
  );
};
export default TimetablePage;
