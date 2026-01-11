// src/types/auth.ts
export type AuthStep =
  | 'login'
  | 'forgotEmail'
  | 'verifyCode'
  | 'setPassword'
  | 'success';

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

export interface SetPasswordFormData {
  newPassword: string;
  confirmPassword: string;
}