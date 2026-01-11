import React, { useState } from 'react';
import type { LoginFormData } from '../types/auth';

interface LoginProps {
  onForgotPassword: () => void;
  onLogin: (data: LoginFormData) => void;
}

const Login: React.FC<LoginProps> = ({ onForgotPassword, onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(formData);
  };

  return (
    <div className="form-step">
      <header className="form-header">
        <h2>Sign In</h2>
        <p>Welcome back! Please enter your details to log in to your account.</p>
      </header>

      <form onSubmit={handleSubmit} className="form-content">
        <div className="input-field">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </div>

        <div className="input-field">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
        </div>

        <div className="form-row">
          <label className="remember">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
            />
            <span>Remember for 30 days</span>
          </label>
          <button 
            type="button" 
            className="forgot-link"
            onClick={onForgotPassword}
          >
            Forgot password
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
            <img src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png" alt="Google" />
          </button>
          <button type="button" className="s-btn">
            <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" />
          </button>
          <button type="button" className="s-btn">
            <img src="https://cdn-icons-png.flaticon.com/512/732/732221.png" alt="Apple" />
          </button>
        </div>

        <div className="signup-prompt">
          Don&apos;t have an account?{' '}
          <button 
            type="button" 
            className="forgot-link"
            style={{ marginLeft: '4px' }}
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;