import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserPlus, Edit3, ArrowLeft, Save, AlertCircle, CheckCircle2 } from 'lucide-react';
import { AdminAppShell } from '../components/AdminAppShell';
import { createUser, updateUser, getUserById } from '../../services/userService';
import { mockDepartmentsList } from '../data/departments';
import type { UserRole, AccountStatus } from '../../shared/types/user';

export const UserForm: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  // Form Field States
  const [role, setRole] = useState<UserRole>('STUDENT');
  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [departmentId, setDepartmentId] = useState('dept-ds');
  const [semester, setSemester] = useState<number>(6);
  const [section, setSection] = useState('Sec A');
  const [designation, setDesignation] = useState('Assistant Professor');
  const [status, setStatus] = useState<AccountStatus>('Active');

  // Error & Submission State
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(isEditMode);

  useEffect(() => {
    if (isEditMode && id) {
      const loadUser = async () => {
        const u = await getUserById(id);
        if (u) {
          setRole(u.role);
          setName(u.name);
          setUserId(u.userId);
          setEmail(u.email);
          setPhone(u.phone || '');
          setDepartmentId(u.departmentId);
          if (u.semester) setSemester(u.semester);
          if (u.section) setSection(u.section);
          if (u.designation) setDesignation(u.designation);
          setStatus(u.status);
        }
        setLoading(false);
      };
      loadUser();
    }
  }, [id, isEditMode]);

  const validate = (): boolean => {
    const errs: { [key: string]: string } = {};

    if (!name.trim()) errs.name = 'Full Name is required';
    if (!userId.trim()) errs.userId = 'User ID / USN / Employee ID is required';
    if (!email.trim()) errs.email = 'Email address is required';
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = 'Invalid email address format';

    if (role === 'STUDENT') {
      if (!semester || semester < 1 || semester > 8) errs.semester = 'Semester must be between 1 and 8';
      if (!section.trim()) errs.section = 'Section is required';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const selectedDept = mockDepartmentsList.find(d => d.id === departmentId);
      const departmentName = selectedDept ? selectedDept.name : (role === 'ADMIN' ? 'Central Academic Administration' : 'CSE — Data Science');

      if (isEditMode && id) {
        await updateUser(id, {
          role,
          name,
          userId,
          email,
          phone,
          departmentId: role === 'ADMIN' ? 'dept-admin' : departmentId,
          departmentName,
          semester: role === 'STUDENT' ? semester : undefined,
          section: role === 'STUDENT' ? section : undefined,
          designation: role === 'FACULTY' || role === 'HOD' ? designation : (role === 'ADMIN' ? 'System Administrator' : undefined),
          status
        });
      } else {
        await createUser({
          role,
          name,
          userId,
          email,
          phone,
          departmentId: role === 'ADMIN' ? 'dept-admin' : departmentId,
          departmentName,
          semester: role === 'STUDENT' ? semester : undefined,
          section: role === 'STUDENT' ? section : undefined,
          designation: role === 'FACULTY' || role === 'HOD' ? designation : (role === 'ADMIN' ? 'System Administrator' : undefined),
          status,
          passwordStatus: 'Set'
        });
      }

      navigate('/admin/users');
    } catch (err) {
      console.error("Error submitting user form:", err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <AdminAppShell>
        <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--brand-dark-grey)' }}>
          Loading Form...
        </div>
      </AdminAppShell>
    );
  }

  return (
    <AdminAppShell>
      {/* Header Banner */}
      <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <button onClick={() => navigate('/admin/users')} className="btn btn-secondary" style={{ padding: '0.4rem 0.6rem' }}>
          <ArrowLeft size={16} />
        </button>
        <div>
          <span className="badge badge-active font-mono" style={{ backgroundColor: 'var(--brand-black)', color: '#FFF' }}>
            {isEditMode ? 'EDIT USER ACCOUNT' : 'CREATE USER ACCOUNT'}
          </span>
          <h1 className="font-display" style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--brand-black)', marginTop: '0.25rem', marginBottom: 0 }}>
            {isEditMode ? `Edit User: ${name}` : 'Provision New Application User'}
          </h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--brand-dark-grey)', marginTop: '0.1rem' }}>
            Assign role, department, section, and credentials status
          </p>
        </div>
      </div>

      {/* Main Form Container */}
      <div className="dashboard-panel" style={{ maxWidth: '800px' }}>
        <form onSubmit={handleSubmit}>
          
          {/* Role Selector Tabs */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label className="form-label font-sans" style={{ fontWeight: 700, marginBottom: '0.5rem', display: 'block' }}>
              SELECT APPLICATION ROLE *
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
              {(['STUDENT', 'FACULTY', 'HOD', 'ADMIN'] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => {
                    setRole(r);
                    if (r === 'HOD') setDesignation('Professor & HOD');
                  }}
                  className={`btn ${role === r ? 'btn-primary' : 'btn-secondary'}`}
                  style={{
                    padding: '0.65rem 0.5rem',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    justifyContent: 'center',
                    backgroundColor: role === r ? (r === 'ADMIN' ? 'var(--brand-black)' : r === 'HOD' ? '#4C1D95' : 'var(--brand-orange)') : undefined
                  }}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Form Fields Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
            
            {/* Name */}
            <div>
              <label className="form-label font-sans" style={{ fontWeight: 600 }}>Full Name *</label>
              <input 
                type="text"
                placeholder="e.g. John Smith"
                className="form-input font-sans"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && <span style={{ color: 'var(--color-error)', fontSize: '0.75rem', marginTop: '0.2rem', display: 'block' }}>{errors.name}</span>}
            </div>

            {/* User ID / USN / Employee ID */}
            <div>
              <label className="form-label font-sans" style={{ fontWeight: 600 }}>
                {role === 'STUDENT' ? 'USN / Student ID *' : role === 'FACULTY' || role === 'HOD' ? 'Employee ID *' : 'Admin ID *'}
              </label>
              <input 
                type="text"
                placeholder={role === 'STUDENT' ? 'e.g. 4AI21DS001' : role === 'FACULTY' ? 'e.g. EMP-DS-05' : 'e.g. ADM-005'}
                className="form-input font-sans font-mono"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
              {errors.userId && <span style={{ color: 'var(--color-error)', fontSize: '0.75rem', marginTop: '0.2rem', display: 'block' }}>{errors.userId}</span>}
            </div>

            {/* Email Address */}
            <div>
              <label className="form-label font-sans" style={{ fontWeight: 600 }}>Email Address *</label>
              <input 
                type="email"
                placeholder="user@example.test"
                className="form-input font-sans"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <span style={{ color: 'var(--color-error)', fontSize: '0.75rem', marginTop: '0.2rem', display: 'block' }}>{errors.email}</span>}
            </div>

            {/* Phone Number */}
            <div>
              <label className="form-label font-sans" style={{ fontWeight: 600 }}>Phone Number</label>
              <input 
                type="text"
                placeholder="+91 98765 00000"
                className="form-input font-sans"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            {/* Department (for Student, Faculty, HOD) */}
            {role !== 'ADMIN' && (
              <div>
                <label className="form-label font-sans" style={{ fontWeight: 600 }}>Department Assignment *</label>
                <select 
                  className="form-select font-sans"
                  value={departmentId}
                  onChange={(e) => setDepartmentId(e.target.value)}
                >
                  {mockDepartmentsList.map(d => (
                    <option key={d.id} value={d.id}>{d.name} ({d.code})</option>
                  ))}
                </select>
              </div>
            )}

            {/* Student Specific: Semester & Section */}
            {role === 'STUDENT' && (
              <>
                <div>
                  <label className="form-label font-sans" style={{ fontWeight: 600 }}>Semester *</label>
                  <select 
                    className="form-select font-sans"
                    value={semester}
                    onChange={(e) => setSemester(Number(e.target.value))}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
                      <option key={s} value={s}>Semester {s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="form-label font-sans" style={{ fontWeight: 600 }}>Section *</label>
                  <select 
                    className="form-select font-sans"
                    value={section}
                    onChange={(e) => setSection(e.target.value)}
                  >
                    <option value="Sec A">Section A</option>
                    <option value="Sec B">Section B</option>
                    <option value="Sec C">Section C</option>
                  </select>
                </div>
              </>
            )}

            {/* Faculty / HOD Specific: Designation */}
            {(role === 'FACULTY' || role === 'HOD') && (
              <div>
                <label className="form-label font-sans" style={{ fontWeight: 600 }}>Designation</label>
                <select 
                  className="form-select font-sans"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  disabled={role === 'HOD'}
                >
                  <option value="Professor & HOD">Professor & HOD</option>
                  <option value="Professor">Professor</option>
                  <option value="Associate Professor">Associate Professor</option>
                  <option value="Assistant Professor">Assistant Professor</option>
                </select>
              </div>
            )}

            {/* Account Status */}
            <div>
              <label className="form-label font-sans" style={{ fontWeight: 600 }}>Initial Account Status</label>
              <select 
                className="form-select font-sans"
                value={status}
                onChange={(e) => setStatus(e.target.value as AccountStatus)}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Locked">Locked</option>
                <option value="Pending">Pending</option>
              </select>
            </div>

          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', borderTop: '1px solid rgba(156, 163, 175, 0.2)', paddingTop: '1.25rem' }}>
            <button 
              type="button" 
              onClick={() => navigate('/admin/users')} 
              className="btn btn-secondary font-sans"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary font-sans"
              disabled={submitting}
            >
              <Save size={16} />
              <span>{isEditMode ? 'Save Changes' : 'Create User Account'}</span>
            </button>
          </div>

        </form>
      </div>
    </AdminAppShell>
  );
};

export default UserForm;
