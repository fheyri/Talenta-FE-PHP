import {
  LoginFormValues,
  ForgotPasswordFormValues,
  VerifyOtpFormValues,
  ResetPasswordFormValues,
} from "./validations/auth";

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  token?: string;
  otp?: string;
  user?: {
    id: number;
    name: string;
    email: string;
    role: string;
    is_profile_complete?: boolean;
    token_balance?: number;
  };
  data?: T;
  errors?: Record<string, string[]>;
}

export async function loginAdmin(data: LoginFormValues): Promise<ApiResponse> {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Gagal masuk ke dashboard BKK.");
  }

  return result;
}

export async function requestPasswordReset(
  data: ForgotPasswordFormValues
): Promise<ApiResponse> {
  const response = await fetch("/api/auth/forgot-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Gagal mengirimkan instruksi pemulihan akses."
    );
  }

  return result;
}

export async function verifyOtp(
  data: VerifyOtpFormValues
): Promise<ApiResponse> {
  const response = await fetch("/api/auth/verify-otp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Kode OTP tidak valid atau telah kedaluwarsa.");
  }

  return result;
}

export async function resetPassword(
  data: ResetPasswordFormValues
): Promise<ApiResponse> {
  const response = await fetch("/api/auth/reset-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Gagal mengatur ulang kata sandi.");
  }

  return result;
}
