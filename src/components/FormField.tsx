import React from 'react';

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  id: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  id,
  type = "text",
  className = "",
  ...props
}) => {
  return (
    <div className="form-group">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <div className="form-input-container">
        <input
          id={id}
          type={type}
          className={`form-input ${error ? 'has-error' : ''} ${className}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          {...props}
        />
      </div>
      {error && (
        <span 
          id={`${id}-error`} 
          style={{ 
            fontSize: '0.75rem', 
            color: 'var(--color-error)', 
            marginTop: '0.125rem',
            textAlign: 'left',
            display: 'block'
          }}
        >
          {error}
        </span>
      )}
    </div>
  );
};
