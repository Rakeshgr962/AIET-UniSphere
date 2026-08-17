import React, { useEffect, useState } from 'react';
import { Clock, CalendarCheck, MapPin, AlertTriangle, Filter, User, BookOpen } from 'lucide-react';
import { HODAppShell } from '../components/HODAppShell';
import { getDepartmentTimetable } from '../../services/timetableService';
import type { TimetableEntry } from '../../data/timetable';

export const HODTimetablePage: React.FC = () => {
  const [entries, setEntries] = useState<TimetableEntry[]>([]);
  const [selectedDay, setSelectedDay] = useState<'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday'>('Monday');
  const [semFilter, setSemFilter] = useState('All');
  const [facultyFilter, setFacultyFilter] = useState('All');
  const [roomFilter, setRoomFilter] = useState('All');
  const [viewMode, setViewMode] = useState<'Daily' | 'Weekly'>('Daily');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTimetable = async () => {
      setLoading(true);
      try {
        const data = await getDepartmentTimetable();
        setEntries(data);
      } catch (err) {
        console.error("Error loading department timetable:", err);
      } finally {
        setLoading(false);
      }
    };
    loadTimetable();
  }, []);

  const daysList: ('Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday')[] = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
  ];

  const filteredEntries = entries.filter((e) => {
    const matchesDay = viewMode === 'Weekly' || e.day === selectedDay;
    const matchesSem = semFilter === 'All' || e.semester === Number(semFilter);
    const matchesFaculty = facultyFilter === 'All' || e.facultyName.toLowerCase().includes(facultyFilter.toLowerCase());
    const matchesRoom = roomFilter === 'All' || e.room.toLowerCase() === roomFilter.toLowerCase();

    return matchesDay && matchesSem && matchesFaculty && matchesRoom;
  });

  const conflicts = entries.filter(e => e.hasConflict);

  return (
    <HODAppShell>
      {/* Header Banner */}
      <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span className="badge badge-active font-mono">ACADEMIC GOVERNANCE</span>
          <h1 className="font-display" style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--brand-black)', marginTop: '0.25rem', marginBottom: 0 }}>
            Department Timetable Management
          </h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--brand-dark-grey)', marginTop: '0.2rem' }}>
            Data Science Department Class Schedules, Faculty Allocations & Room Monitoring
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', backgroundColor: 'var(--brand-light-grey)', padding: '0.25rem', borderRadius: 'var(--border-radius)', border: '1px solid rgba(156, 163, 175, 0.2)' }}>
          <button 
            onClick={() => setViewMode('Daily')}
            className={`btn ${viewMode === 'Daily' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ fontSize: '0.8rem', padding: '0.35rem 0.85rem' }}
          >
            Daily View
          </button>
          <button 
            onClick={() => setViewMode('Weekly')}
            className={`btn ${viewMode === 'Weekly' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ fontSize: '0.8rem', padding: '0.35rem 0.85rem' }}
          >
            Weekly Overview
          </button>
        </div>
      </div>

      {/* Conflicts Alert Warning Banner (If Any) */}
      {conflicts.length > 0 && (
        <div className="dashboard-panel" style={{ backgroundColor: '#FEF2F2', border: '1px solid #FCA5A5', padding: '1rem 1.25rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
            <AlertTriangle size={20} style={{ color: '#991B1B', marginTop: '0.1rem' }} />
            <div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#991B1B', margin: 0 }}>
                ⚠ Scheduling Conflict Detected ({conflicts.length})
              </h3>
              {conflicts.map((c) => (
                <p key={c.id} style={{ fontSize: '0.85rem', color: '#B91C1C', marginTop: '0.25rem', margin: 0 }}>
                  {c.conflictReason}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Days Tabs (Only for Daily View) */}
      {viewMode === 'Daily' && (
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
          {daysList.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`btn ${selectedDay === day ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: '0.85rem', padding: '0.45rem 1rem', whiteSpace: 'nowrap' }}
            >
              {day}
            </button>
          ))}
        </div>
      )}

      {/* Filter Bar */}
      <div className="dashboard-panel" style={{ marginBottom: '1.5rem', padding: '1rem 1.25rem' }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.825rem', color: 'var(--brand-dark-grey)', fontWeight: 600 }}>
            <Filter size={14} />
            <span>Filter Timetable:</span>
          </div>

          <select 
            className="form-select font-sans"
            style={{ width: '140px', padding: '0.45rem 0.75rem', fontSize: '0.825rem' }}
            value={semFilter}
            onChange={(e) => setSemFilter(e.target.value)}
          >
            <option value="All">All Semesters</option>
            <option value="4">Semester 4</option>
            <option value="6">Semester 6</option>
          </select>

          <select 
            className="form-select font-sans"
            style={{ width: '170px', padding: '0.45rem 0.75rem', fontSize: '0.825rem' }}
            value={facultyFilter}
            onChange={(e) => setFacultyFilter(e.target.value)}
          >
            <option value="All">All Faculty</option>
            <option value="Sneha Reddy">Dr. Sneha Reddy</option>
            <option value="Rajesh Kumar">Dr. Rajesh Kumar</option>
            <option value="Sunita Sharma">Prof. Sunita Sharma</option>
          </select>

          <select 
            className="form-select font-sans"
            style={{ width: '150px', padding: '0.45rem 0.75rem', fontSize: '0.825rem' }}
            value={roomFilter}
            onChange={(e) => setRoomFilter(e.target.value)}
          >
            <option value="All">All Rooms / Labs</option>
            <option value="LH-302">LH-302</option>
            <option value="LH-201">LH-201</option>
            <option value="Computer Lab 4">Computer Lab 4</option>
          </select>
        </div>
      </div>

      {/* Timetable Rows View */}
      <div className="dashboard-panel">
        <h2 className="panel-title font-display" style={{ marginBottom: '1rem' }}>
          {viewMode === 'Daily' ? `${selectedDay}'s Class Schedule` : 'Weekly Master Timetable'}
        </h2>

        {loading ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--brand-dark-grey)' }}>
            Loading Timetable...
          </div>
        ) : filteredEntries.length === 0 ? (
          <div style={{ padding: '2.5rem', textAlign: 'center', color: 'var(--brand-dark-grey)' }}>
            <CalendarCheck size={32} style={{ margin: '0 auto 0.5rem', color: '#94A3B8' }} />
            <p style={{ fontWeight: 600, color: 'var(--brand-black)' }}>No timetable slots found for current filters</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {filteredEntries.map((item) => (
              <div 
                key={item.id} 
                className="timetable-row-card"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.25rem',
                  padding: '1rem 1.25rem',
                  backgroundColor: item.hasConflict ? '#FEF2F2' : 'var(--brand-light-grey)',
                  border: item.hasConflict ? '1px solid #FCA5A5' : '1px solid rgba(156, 163, 175, 0.2)',
                  borderRadius: 'var(--border-radius)',
                  flexWrap: 'wrap'
                }}
              >
                <div className="time-badge font-mono" style={{ backgroundColor: 'var(--brand-black)', color: '#FFF', padding: '0.4rem 0.75rem', borderRadius: 'var(--border-radius)', fontSize: '0.825rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Clock size={14} />
                  {item.startTime} – {item.endTime}
                </div>

                <div style={{ flexGrow: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                    <span className="badge badge-active font-mono text-blue">{item.courseCode}</span>
                    <span className="badge badge-graded font-mono">SEM {item.semester}</span>
                    {viewMode === 'Weekly' && <span className="badge font-mono" style={{ backgroundColor: '#E2E8F0', color: '#1E293B' }}>{item.day}</span>}
                  </div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--brand-black)', margin: 0 }}>{item.courseName}</h4>
                  <p style={{ fontSize: '0.825rem', color: 'var(--brand-dark-grey)', marginTop: '0.15rem', margin: 0 }}>
                    Instructor: <strong>{item.facultyName}</strong> ({item.section})
                  </p>
                </div>

                <div className="room-badge" style={{ backgroundColor: 'var(--brand-white)', padding: '0.4rem 0.75rem', borderRadius: 'var(--border-radius)', border: '1px solid rgba(156, 163, 175, 0.3)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--brand-black)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <MapPin size={14} style={{ color: 'var(--brand-orange)' }} />
                  {item.room}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </HODAppShell>
  );
};

export default HODTimetablePage;
