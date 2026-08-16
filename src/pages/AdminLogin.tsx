import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from '../components/AuthLayout';
import { FormField } from '../components/FormField';
import { PasswordField } from '../components/PasswordField';
import { PrimaryButton } from '../components/PrimaryButton';
import { FormMessage } from '../components/FormMessage';

export const AdminLogin: React.FC = () => {
  const navigate = useNavigate();

  // Form states
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');

  // Validation/feedback states
  const [errors, setErrors] = useState<{ adminId?: string; password?: string }>({});
  const [status, setStatus] = useState<{ type: 'error' | 'success' | null; message: string | null }>({
    type: null,
    message: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const tempErrors: typeof errors = {};
    let isValid = true;

    if (!adminId.trim()) {
      tempErrors.adminId = "Please enter your Admin ID or Email.";
      isValid = false;
    } else if (adminId.trim().length < 4) {
      tempErrors.adminId = "Please enter a valid Admin ID or Email.";
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
      
      // Hardcoded validation success example
      if (adminId.toLowerCase() === 'demoadmin' && password === 'Password123') {
        setStatus({ type: 'success', message: "Successfully signed in as Administrator! Redirecting..." });
        setTimeout(() => {
          alert("Signed in successfully as Administrator (Demo mode).");
        }, 1000);
      } else {
        setStatus({ type: 'error', message: "Invalid Admin ID/Email or password. Please try again." });
      }
    }, 1500);
  };

  return (
    <AuthLayout 
      title="Administrator Portal" 
      subtitle="System Management & Operations" 
      theme="admin"
    >
      <form onSubmit={handleSubmit} className="auth-form" noValidate>
        <FormMessage type={status.type} message={status.message} />

        <FormField
          label="Admin ID / Email"
          id="admin-identifier"
          placeholder="e.g. adm1002 or admin@unisphere.com"
          value={adminId}
          onChange={(e) => setAdminId(e.target.value)}
          error={errors.adminId}
          disabled={isLoading}
          required
        />

        <PasswordField
          label="Password"
          id="admin-password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          disabled={isLoading}
          required
        />

        <div className="form-actions-row" style={{ justifyContent: 'flex-end' }}>
          <a href="#forgot" onClick={(e) => { e.preventDefault(); alert("Admin password reset requires contacting the master institutional administrator."); }} className="forgot-password-link">
            Forgot password?
          </a>
        </div>

        <PrimaryButton 
          type="submit" 
          isLoading={isLoading}
          id="admin-submit-btn"
        >
          Sign In
        </PrimaryButton>
      </form>

      <div style={{ textAlign: 'center', fontSize: '0.875rem', marginTop: '0.5rem' }}>
        <a 
          href="/" 
          onClick={(e) => { e.preventDefault(); navigate('/'); }} 
          style={{ color: 'var(--brand-dark-grey)', fontWeight: 500 }}
        >
          ← Back to role selection
        </a>
      </div>
    </AuthLayout>
  );
};
