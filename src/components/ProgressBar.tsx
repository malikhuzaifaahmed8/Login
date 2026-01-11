import React from 'react';
import type { AuthStep } from '../types/auth';

interface ProgressBarProps {
  currentStep: AuthStep;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep }) => {
  const steps = [
    { id: 'forgotEmail' as const, label: 'Email', number: 1 },
    { id: 'verifyCode' as const, label: 'Code', number: 2 },
    { id: 'setPassword' as const, label: 'Password', number: 3 },
  ];

  const getStepIndex = (step: AuthStep): number => {
    switch(step) {
      case 'forgotEmail': return 0;
      case 'verifyCode': return 1;
      case 'setPassword': return 2;
      case 'success': return 3;
      default: return 0;
    }
  };

  const currentIndex = getStepIndex(currentStep);

  return (
    <div className="progress-indicator">
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          <div className="progress-step">
            <div className={`step-number ${
              index < currentIndex ? 'completed' : 
              index === currentIndex ? 'active' : ''
            }`}>
              {index < currentIndex ? '✓' : step.number}
            </div>
            {index < steps.length - 1 && (
              <div className={`step-line ${
                index < currentIndex ? 'completed' : ''
              }`} />
            )}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default ProgressBar;