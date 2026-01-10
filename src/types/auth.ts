export type AuthStep = 'login' | 'forgotEmail' | 'verifyCode';

export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface ForgotEmailFormData {
  email: string;
}

export interface VerifyCodeFormData {
  code: string[];
}

export interface AuthContextProps {
  currentStep: AuthStep;
  goToStep: (step: AuthStep) => void;
  email: string;
  setEmail: (email: string) => void;
}