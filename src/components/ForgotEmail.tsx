import React from 'react';
import type { ForgotEmailFormData } from '../types/auth';

interface ForgotEmailProps {
  onBack: () => void;
  onSubmit: (data: ForgotEmailFormData) => void;
  email: string;
  setEmail: (email: string) => void;
}

const ForgotEmail: React.FC<ForgotEmailProps> = ({
  onBack,
  onSubmit,
  email,
  setEmail,
}) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) return;

    onSubmit({ email });
  };

  return (
    <div className="form-step">
      <button type="button" className="back-button" onClick={onBack}>
        ← Back
      </button>

      <div className="progress-indicator">
        <div className="progress-step">
          <div className="step-number completed">1</div>
          <div className="step-line completed" />
        </div>

        <div className="progress-step">
          <div className="step-number active">2</div>
          <div className="step-line" />
        </div>

        <div className="progress-step">
          <div className="step-number">3</div>
        </div>
      </div>

      <header className="form-header">
        <h2>Forgot password?</h2>
        <p>No worries, we&apos;ll send you reset instructions.</p>
      </header>

      <form onSubmit={handleSubmit} className="form-content">
        <div className="input-field">
          <label htmlFor="reset-email">Email</label>
          <input
            id="reset-email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn-primary">
          Reset password
        </button>
      </form>
    </div>
  );
};

export default ForgotEmail;