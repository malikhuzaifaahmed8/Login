import React, { useState } from 'react';
import type { LoginFormData } from '../types/auth';

interface SuccessProps {
  onLogin: (data: LoginFormData) => void;
  email: string;
}

const Success: React.FC<SuccessProps> = ({ onLogin, email }) => {
  const [loginData, setLoginData] = useState<LoginFormData>({
    email,
    password: '',
    rememberMe: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(loginData);
  };

  return (
    <div className="form-step">
      <header className="form-header" style={{ textAlign: 'center' }}>
        <div className="success-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h2>Success 🎉</h2>
        <p>Your password has been reset successfully.</p>
        <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#6B7280' }}>
          Please log in with your new password
        </p>
      </header>

      <form onSubmit={handleSubmit} className="form-content">
        <div className="input-field">
          <label htmlFor="login-email">Email</label>
          <input
            type="email"
            id="login-email"
            name="email"
            value={loginData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </div>

        <div className="input-field">
          <label htmlFor="login-password">Password</label>
          <input
            type="password"
            id="login-password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
        </div>

        <div className="form-row" style={{ justifyContent: 'flex-start' }}>
          <label className="remember">
            <input
              type="checkbox"
              name="rememberMe"
              checked={loginData.rememberMe}
              onChange={handleChange}
            />
            <span>Remember me</span>
          </label>
        </div>

        <button type="submit" className="btn-primary">
          Log in
        </button>
      </form>
    </div>
  );
};

export default Success;