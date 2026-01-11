import React, { useState } from 'react';
import type { ForgotEmailFormData } from '../types/auth';

interface ForgotEmailProps {
  onBack: () => void;
  onSubmit: (data: ForgotEmailFormData) => void;
  email: string;
  setEmail: (email: string) => void;
}

const ForgotEmail: React.FC<ForgotEmailProps> = ({ onBack, onSubmit, email, setEmail }) => {
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setError('Email is required');
      return;
    }
    
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setError('');
    onSubmit({ email });
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    
    // Clear error when user starts typing
    if (error) {
      setError('');
    }
  };

  return (
    <div className="form-step">
      <button type="button" className="back-button" onClick={onBack}>
        ← Back
      </button>

      <header className="form-header">
        <h2>Forgot password?</h2>
        <p>Enter your email to reset your password.</p>
      </header>

      <form onSubmit={handleSubmit} className="form-content">
        <div className="input-field">
          <label htmlFor="reset-email">Email *</label>
          <input
            type="email"
            id="reset-email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email"
            className={error ? 'error' : ''}
          />
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
        </div>

        <button type="submit" className="btn-primary">
          Send Reset Code
        </button>
      </form>
    </div>
  );
};

export default ForgotEmail;