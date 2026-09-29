import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email / Username wajib diisi" })
    .refine(
      (val) => {
        // Can be valid email OR valid alphanumeric username (min 3 characters)
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
        const isUsername = /^[a-zA-Z0-9._-]{3,}$/.test(val);
        return isEmail || isUsername;
      },
      { message: "Format email atau username tidak valid" }
    ),
  password: z
    .string()
    .min(1, { message: "Password wajib diisi" })
    .min(6, { message: "Password minimal 6 karakter" }),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email / Username Akun Admin wajib diisi" })
    .refine(
      (val) => {
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
        const isUsername = /^[a-zA-Z0-9._-]{3,}$/.test(val);
        return isEmail || isUsername;
      },
      { message: "Format email atau username akun admin tidak valid" }
    ),
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export const verifyOtpSchema = z.object({
  email: z.string().min(1, { message: "Email wajib diisi" }),
  otp: z
    .string()
    .length(6, { message: "Kode OTP harus terdiri dari 6 digit angka" })
    .regex(/^\d+$/, { message: "Kode OTP hanya boleh berisi angka" }),
});

export type VerifyOtpFormValues = z.infer<typeof verifyOtpSchema>;

export const resetPasswordSchema = z
  .object({
    email: z.string().min(1, { message: "Email wajib diisi" }),
    otp: z.string().length(6, { message: "Kode OTP tidak valid" }),
    password: z
      .string()
      .min(1, { message: "Kata sandi baru wajib diisi" })
      .min(6, { message: "Kata sandi minimal 6 karakter" }),
    password_confirmation: z
      .string()
      .min(1, { message: "Konfirmasi kata sandi wajib diisi" }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Konfirmasi kata sandi tidak cocok dengan kata sandi baru",
    path: ["password_confirmation"],
  });

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
