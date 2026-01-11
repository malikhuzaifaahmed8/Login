import React, { useState, type ChangeEvent, type FormEvent } from 'react';
import type { SetPasswordFormData } from '../types/auth';

interface SetPasswordProps {
  onBack: () => void;
  onSubmit: (data: SetPasswordFormData) => void;
  email: string;
}

const SetPassword: React.FC<SetPasswordProps> = ({ onBack, onSubmit, email }) => {
  const [formData, setFormData] = useState<SetPasswordFormData>({
    newPassword: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<{newPassword?: string; confirmPassword?: string}>({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    setErrors(prev => ({
      ...prev,
      [name]: '',
    }));
  };

  const validateForm = () => {
    let valid = true;
    const newErrors: {newPassword?: string; confirmPassword?: string} = {};

    if (!formData.newPassword) {
      newErrors.newPassword = 'Password is required';
      valid = false;
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
      valid = false;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
      valid = false;
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="form-step">
      <button type="button" className="back-button" onClick={onBack}>
        ← Back
      </button>

      <header className="form-header">
        <h2>Set new password</h2>
        <p>Must be at least 8 characters.</p>
      </header>

      <form onSubmit={handleSubmit} className="form-content">
        <div className="input-field">
          <label htmlFor="newPassword">New password *</label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="newPassword"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            placeholder="Enter new password"
            className={errors.newPassword ? 'error' : ''}
          />
          {errors.newPassword && (
            <div className="error-message">
              {errors.newPassword}
            </div>
          )}
        </div>

        <div className="input-field">
          <label htmlFor="confirmPassword">Confirm password *</label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm new password"
            className={errors.confirmPassword ? 'error' : ''}
          />
          {errors.confirmPassword && (
            <div className="error-message">
              {errors.confirmPassword}
            </div>
          )}
        </div>

        <div className="form-row" style={{ justifyContent: 'flex-start', marginTop: '1rem' }}>
          <label className="remember">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={(e) => setShowPassword(e.target.checked)}
            />
            <span>Show password</span>
          </label>
        </div>

        <button type="submit" className="btn-primary">
          Reset password
        </button>
      </form>
    </div>
  );
};

export default SetPassword;