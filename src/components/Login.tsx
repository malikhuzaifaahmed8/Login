import React, { useState } from 'react';
import type { LoginFormData } from '../types/auth';

interface LoginProps {
  onForgotPassword: () => void;
  onLogin: (data: LoginFormData) => void;
}

const Login: React.FC<LoginProps> = ({ onForgotPassword, onLogin }) => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onLogin(formData);
  };

  const handleInputChange =
    (field: keyof LoginFormData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value =
        field === 'rememberMe' ? e.target.checked : e.target.value;

      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    };

  return (
    <div className="form-step">
      <header className="form-header">
        <h2>Sign In</h2>
        <p>Welcome back! Please enter your details to log in your account.</p>
      </header>

      <form onSubmit={handleSubmit} className="form-content">
        <div className="input-field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange('email')}
            required
          />
        </div>

        <div className="input-field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleInputChange('password')}
            required
          />
        </div>

        <div className="form-row">
          <label className="remember">
            <input
              type="checkbox"
              checked={formData.rememberMe}
              onChange={handleInputChange('rememberMe')}
            />
            Remember for 30 days
          </label>

          <button
            type="button"
            className="forgot-link"
            onClick={onForgotPassword}
          >
            Forgot password?
          </button>
        </div>

        <button type="submit" className="btn-primary">
          Log in
        </button>

        <div className="divider">
          <span>or</span>
        </div>

        <div className="social-links">
          <button type="button" className="s-btn">
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
            />
          </button>

          <button type="button" className="s-btn">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg"
              alt="Facebook"
            />
          </button>

          <button type="button" className="s-btn">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
              alt="Apple"
            />
          </button>
        </div>

        <p className="signup-prompt">
          Don&apos;t have an account?{' '}
          <span style={{ color: 'var(--brand-blue)' }}>Sign up</span>
        </p>
      </form>
    </div>
  );
};

export default Login;