import React, { useState, useRef, useEffect } from 'react';
import type { VerifyCodeFormData } from '../types/auth';

interface VerifyCodeProps {
  onBack: () => void;
  onSubmit: (data: VerifyCodeFormData) => void;
  email: string;
}

const VerifyCode: React.FC<VerifyCodeProps> = ({ onBack, onSubmit, email }) => {
  const [code, setCode] = useState<string[]>(Array(6).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Initialize refs array
    inputRefs.current = inputRefs.current.slice(0, 6);
  }, []);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    // Allow only numbers
    const numericValue = value.replace(/\D/g, '');
    
    if (!numericValue) {
      // Clear the field if empty
      const newCode = [...code];
      newCode[index] = '';
      setCode(newCode);
      return;
    }

    // Handle paste or multiple digits
    if (numericValue.length > 1) {
      const digits = numericValue.split('').slice(0, 6);
      const newCode = [...code];
      
      digits.forEach((digit, idx) => {
        if (index + idx < 6) {
          newCode[index + idx] = digit;
        }
      });
      
      setCode(newCode);
      
      // Focus the next empty field or the last one
      const nextIndex = Math.min(index + digits.length, 5);
      setTimeout(() => {
        inputRefs.current[nextIndex]?.focus();
      }, 0);
      return;
    }

    // Single digit input
    const newCode = [...code];
    newCode[index] = numericValue;
    setCode(newCode);

    
    if (numericValue && index < 5) {
      setTimeout(() => {
        inputRefs.current[index + 1]?.focus();
      }, 0);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!code[index] && index > 0) {
   
        inputRefs.current[index - 1]?.focus();
        

        const newCode = [...code];
        newCode[index - 1] = '';
        setCode(newCode);
      } else if (code[index]) {
    
        const newCode = [...code];
        newCode[index] = '';
        setCode(newCode);
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const codeString = code.join('');
    if (codeString.length === 6) {
      onSubmit({ code });
    } else {
      alert('Please enter all 6 digits of the verification code');
    }
  };

  const handleResend = () => {
    setCode(Array(6).fill(''));
    inputRefs.current[0]?.focus();
    alert(`New verification code sent to ${email}`);
  };

  return (
    <div className="form-step">
      <button type="button" className="back-button" onClick={onBack}>
        ← Back
      </button>

      <header className="form-header">
        <h2>Check your email</h2>
        <p>We have sent a code to {email}</p>
      </header>

      <form onSubmit={handleSubmit} className="form-content">
        <div className="otp-container">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              className="otp-input"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onFocus={(e) => e.target.select()}
            />
          ))}
        </div>

        <button type="submit" className="btn-primary">
          Verify Code
        </button>

        <div className="resend-link">
          Didn&apos;t get a code?{' '}
          <button 
            type="button" 
            onClick={handleResend}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--brand-blue)',
              cursor: 'pointer',
              fontWeight: '600',
              padding: 0,
              fontSize: '0.9rem'
            }}
          >
            Click to resend
          </button>
        </div>
      </form>
    </div>
  );
};

export default VerifyCode;