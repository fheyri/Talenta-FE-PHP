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
