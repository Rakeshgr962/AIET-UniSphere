import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../components/AuthLayout';
import { FormField } from '../components/FormField';
import { PasswordField } from '../components/PasswordField';
import { PrimaryButton } from '../components/PrimaryButton';
import { FormMessage } from '../components/FormMessage';

export const StudentLogin: React.FC = () => {
  const navigate = useNavigate();
  
  // Form states
  const [usn, setUsn] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  
  // Validation/feedback states
  const [errors, setErrors] = useState<{ usn?: string; password?: string }>({});
  const [status, setStatus] = useState<{ type: 'error' | 'success' | null; message: string | null }>({
    type: null,
    message: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const tempErrors: { usn?: string; password?: string } = {};
    let isValid = true;

    if (!usn.trim()) {
      tempErrors.usn = "Please enter your Student ID / USN.";
      isValid = false;
    } else if (usn.trim().length < 5) {
      tempErrors.usn = "Student ID / USN must be at least 5 characters.";
      isValid = false;
    }

    if (!password) {
      tempErrors.password = "Please enter your password.";
      isValid = false;
    } else if (password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters.";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: null, message: null });

    if (!validateForm()) {
      setStatus({ type: 'error', message: "Please resolve the errors highlighted below." });
      return;
    }

    setIsLoading(true);

    // Mock API authentication call
    setTimeout(() => {
      setIsLoading(false);
      // Hardcoded validation success example for testing
      if (usn.toLowerCase() === 'demousn' && password === 'Password123') {
        setStatus({ type: 'success', message: "Successfully signed in! Redirecting..." });
        // Simulating redirect
        setTimeout(() => {
          alert("Signed in successfully as Student (Demo mode). Redirecting to student area...");
        }, 1000);
      } else {
        setStatus({ type: 'error', message: "Invalid Student ID / USN or password. Please try again." });
      }
    }, 1500);
  };

  return (
    <AuthLayout 
      title="Student Portal" 
      subtitle="Welcome back" 
      theme="student"
    >
      <form onSubmit={handleSubmit} className="auth-form" noValidate>
        <FormMessage type={status.type} message={status.message} />

        <FormField
          label="Student ID / USN"
          id="student-usn"
          placeholder="e.g. 1AB20CS001"
          value={usn}
          onChange={(e) => setUsn(e.target.value)}
          error={errors.usn}
          disabled={isLoading}
          required
        />

        <PasswordField
          label="Password"
          id="student-password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          disabled={isLoading}
          required
        />

        <div className="form-actions-row">
          <label className="checkbox-label">
            <input
              type="checkbox"
              className="checkbox-input"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              disabled={isLoading}
              id="student-remember"
            />
            Remember me
          </label>
          <a href="#forgot" onClick={(e) => { e.preventDefault(); alert("Password reset link will be sent to your registered email."); }} className="forgot-password-link">
            Forgot password?
          </a>
        </div>

        <PrimaryButton 
          type="submit" 
          isLoading={isLoading}
          id="student-submit-btn"
        >
          Sign In
        </PrimaryButton>
      </form>

      <div style={{ textAlign: 'center', fontSize: '0.875rem', marginTop: '0.5rem', color: 'var(--brand-dark-grey)' }}>
        Don't have an account?{' '}
        <Link to="/signup/student" style={{ fontWeight: 600, color: 'var(--brand-orange)' }}>
          Create account
        </Link>
      </div>
    </AuthLayout>
  );
};
