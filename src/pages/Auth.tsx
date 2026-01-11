import React, { useState } from 'react';
import Login from '../components/Login';
import ForgotEmail from '../components/ForgotEmail';
import VerifyCode from '../components/VerifyCode';
import SetPassword from '../components/SetPassword';
import Success from '../components/Success';
import ProgressBar from '../components/ProgressBar';
import type {
  AuthStep,
  LoginFormData,
  ForgotEmailFormData,
  VerifyCodeFormData,
  SetPasswordFormData,
} from '../types/auth';

const Auth: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<AuthStep>('login');
  const [email, setEmail] = useState('');
  const [animationDirection, setAnimationDirection] = useState<'left' | 'right'>('right');
  const [transitioning, setTransitioning] = useState(false);

  const goToStep = (step: AuthStep, direction: 'left' | 'right' = 'right') => {
    setAnimationDirection(direction);
    setTransitioning(true);
    
    setTimeout(() => {
      setCurrentStep(step);
      setTimeout(() => {
        setTransitioning(false);
      }, 50);
    }, 300);
  };

  const handleLogin = (_data: LoginFormData) => {
    console.log('Login attempt:', _data);
    alert(`Mock login with email: ${_data.email}`);
  };

  const handleForgotPassword = () => {
    goToStep('forgotEmail', 'right');
  };

  const handleForgotEmailSubmit = (data: ForgotEmailFormData) => {
    console.log('Reset password for:', data.email);
    setEmail(data.email);
    goToStep('verifyCode', 'right');
  };

  const handleVerifyCodeSubmit = (data: VerifyCodeFormData) => {
    console.log('Verification code:', data.code.join(''));
    goToStep('setPassword', 'right');
  };

  const handleSetPasswordSubmit = (_data: SetPasswordFormData) => {
    console.log('New password set');
    goToStep('success', 'right');
  };

  const handleSuccessLogin = () => {
    alert('Logged in successfully!');
    goToStep('login', 'left');
  };

  const handleBackFromForgot = () => {
    goToStep('login', 'left');
  };

  const handleBackFromVerify = () => {
    goToStep('forgotEmail', 'left');
  };

  const handleBackFromSetPassword = () => {
    goToStep('verifyCode', 'left');
  };

  const handleBackFromSuccess = () => {
    goToStep('setPassword', 'left');
  };

  const collageImages = Array.from({ length: 9 }, (_, i) => ({
    id: i + 1,
    src: `/images/img (${i + 1}).jpg`,
    alt: `Student ${i + 1}`,
  }));

  const getAnimationClass = (step: AuthStep) => {
    if (step !== currentStep) return '';
    if (transitioning) {
      return animationDirection === 'right' ? 'exiting-left' : 'exiting-right';
    }
    return 'active';
  };

  const shouldShowProgressBar = currentStep === 'forgotEmail' || 
                               currentStep === 'verifyCode' || 
                               currentStep === 'setPassword' || 
                               currentStep === 'success';

  return (
    <main className="page-wrapper">
      {/* Left Branding Panel */}
      <section className="branding-panel">
        <div className="overlay-icons" />

        <div className="branding-container">
          <div className="logo-outer">
            <div className="logo-inner">
              <img src="/images/logo.png" alt="EduMake Logo" />
            </div>
          </div>

          <h1>
            Access your <span className="highlight">EduMake</span> Dashboard
          </h1>
          <p className="sub-heading">Access your EduMake dashboard</p>

          <div className="collage-grid">
            <div className="collage-row r1">
              {collageImages.slice(0, 4).map((img) => (
                <img key={img.id} src={img.src} alt={img.alt} />
              ))}
            </div>

            <div className="collage-row r2">
              {collageImages.slice(4, 7).map((img) => (
                <img key={img.id} src={img.src} alt={img.alt} />
              ))}
            </div>

            <div className="collage-row r3">
              {collageImages.slice(7).map((img) => (
                <img key={img.id} src={img.src} alt={img.alt} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Right Form Panel */}
      <section className="form-panel">
        <div className="form-card">
          {shouldShowProgressBar && <ProgressBar currentStep={currentStep} />}
          
          <div className="form-content">
            {/* Login Step */}
            <div className={`form-step-wrapper ${currentStep === 'login' ? getAnimationClass('login') : ''}`}>
              {currentStep === 'login' && (
                <Login
                  onForgotPassword={handleForgotPassword}
                  onLogin={handleLogin}
                />
              )}
            </div>
            
            {/* Forgot Email Step */}
            <div className={`form-step-wrapper ${currentStep === 'forgotEmail' ? getAnimationClass('forgotEmail') : ''}`}>
              {currentStep === 'forgotEmail' && (
                <ForgotEmail
                  onBack={handleBackFromForgot}
                  onSubmit={handleForgotEmailSubmit}
                  email={email}
                  setEmail={setEmail}
                />
              )}
            </div>
            
            {/* Verify Code Step */}
            <div className={`form-step-wrapper ${currentStep === 'verifyCode' ? getAnimationClass('verifyCode') : ''}`}>
              {currentStep === 'verifyCode' && (
                <VerifyCode
                  onBack={handleBackFromVerify}
                  onSubmit={handleVerifyCodeSubmit}
                  email={email}
                />
              )}
            </div>

            {/* Set Password Step */}
            <div className={`form-step-wrapper ${currentStep === 'setPassword' ? getAnimationClass('setPassword') : ''}`}>
              {currentStep === 'setPassword' && (
                <SetPassword
                  onBack={handleBackFromSetPassword}
                  onSubmit={handleSetPasswordSubmit}
                />
              )}
            </div>

            {/* Success Step */}
            <div className={`form-step-wrapper ${currentStep === 'success' ? getAnimationClass('success') : ''}`}>
              {currentStep === 'success' && (
                <Success
                  onLogin={handleSuccessLogin}
                  email={email}
                />
              )}
            </div>
          </div>

          <footer className="bottom-support">
            <img src="https://cdn-icons-png.flaticon.com/512/542/542689.png" width="14" alt="Mail" />
            support@edumake.com
          </footer>
        </div>
      </section>
    </main>
  );
};

export default Auth;
