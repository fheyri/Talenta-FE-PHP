"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthCard } from "@/components/auth/AuthCard";
import { TextField } from "@/components/auth/TextField";
import { PasswordField } from "@/components/auth/PasswordField";
import { PrimaryButton } from "@/components/auth/PrimaryButton";
import { TypewriterText } from "@/components/auth/TypewriterText";
import { ErrorModal } from "@/components/auth/ErrorModal";
import { OtpInput } from "@/components/auth/OtpInput";
import {
  forgotPasswordSchema,
  ForgotPasswordFormValues,
  resetPasswordSchema,
  ResetPasswordFormValues,
} from "@/lib/validations/auth";
import { requestPasswordReset, verifyOtp, resetPassword } from "@/lib/api";
import {
  AlertCircle,
  CheckCircle2,
  ArrowLeft,
  RotateCcw,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Step = "EMAIL" | "OTP" | "RESET_PASSWORD" | "SUCCESS";

export default function ForgotPasswordPage() {
  const router = useRouter();

  // Multi-step state
  const [step, setStep] = useState<Step>("EMAIL");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  // UI state
  const [apiError, setApiError] = useState<string | null>(null);
  const [apiSuccess, setApiSuccess] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  // OTP resend timer
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [isSubmittingOtp, setIsSubmittingOtp] = useState(false);

  // Form Step 1: Email
  const {
    register: registerEmail,
    handleSubmit: handleSubmitEmail,
    formState: { errors: emailErrors, isSubmitting: isSubmittingEmail },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  // Form Step 3: Reset Password
  const {
    register: registerReset,
    handleSubmit: handleSubmitReset,
    formState: { errors: resetErrors, isSubmitting: isSubmittingReset },
    setValue: setResetValue,
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
      otp: "",
      password: "",
      password_confirmation: "",
    },
  });

  // Countdown timer for OTP
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === "OTP" && countdown > 0) {
      timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
    } else if (countdown === 0) {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [step, countdown]);

  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 450);
  };

  const showError = (msg: string) => {
    triggerShake();
    setApiError(msg);
    setModalMessage(msg);
    setIsModalOpen(true);
  };

  // STEP 1 SUBMIT: Send Email for OTP
  const onSubmitEmail = async (values: ForgotPasswordFormValues) => {
    setApiError(null);
    setApiSuccess(null);

    try {
      const response = await requestPasswordReset(values);

      if (response.success) {
        setEmail(values.email);
        setResetValue("email", values.email);
        setStep("OTP");
        setCountdown(60);
        setCanResend(false);
        setApiSuccess(
          response.message ||
            `Kode verifikasi telah dikirimkan ke ${values.email}.`
        );
      } else {
        showError(response.message || "Gagal mengirimkan kode pemulihan.");
      }
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat memproses permintaan.";
      showError(errorMsg);
    }
  };

  // Resend OTP handler
  const handleResendOtp = async () => {
    if (!canResend) return;
    setApiError(null);
    setApiSuccess(null);

    try {
      const response = await requestPasswordReset({ email });
      if (response.success) {
        setCountdown(60);
        setCanResend(false);
        setApiSuccess("Kode verifikasi OTP baru telah dikirimkan!");
      }
    } catch {
      showError("Gagal mengirim ulang kode OTP. Coba beberapa saat lagi.");
    }
  };

  // STEP 2 SUBMIT: Verify OTP
  const onSubmitOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);
    setApiSuccess(null);

    if (otp.length !== 6) {
      showError("Masukkan 6 digit kode OTP verifikasi dengan lengkap.");
      return;
    }

    setIsSubmittingOtp(true);
    try {
      const response = await verifyOtp({ email, otp });

      if (response.success) {
        setResetValue("otp", otp);
        setStep("RESET_PASSWORD");
        setApiSuccess("Kode OTP terverifikasi! Silakan buat kata sandi baru.");
      } else {
        showError(response.message || "Kode OTP salah. Silakan coba lagi.");
      }
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error
          ? err.message
          : "Kode OTP salah. Coba kode demo: 123456.";
      showError(errorMsg);
    } finally {
      setIsSubmittingOtp(false);
    }
  };

  // STEP 3 SUBMIT: Reset Password
  const onSubmitReset = async (values: ResetPasswordFormValues) => {
    setApiError(null);
    setApiSuccess(null);

    try {
      const response = await resetPassword(values);

      if (response.success) {
        setStep("SUCCESS");
        setApiSuccess(response.message || "Kata sandi Anda berhasil diperbarui!");
      } else {
        showError(response.message || "Gagal memperbarui kata sandi.");
      }
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat menyimpan kata sandi baru.";
      showError(errorMsg);
    }
  };

  return (
    <>
      <AuthLayout
        heroHeading="Pemulihan akses aman & terverifikasi untuk pengelola BKK."
        heroDescription={
          <TypewriterText
            text="Sistem pengamanan kredensial terpadu memastikan hanya staf dan koordinator BKK resmi yang dapat mengatur ulang akses portal."
            speed={24}
            startDelay={500}
          />
        }
        badgeText="Alur Pemulihan Akun BKK"
      >
        <AuthCard
          title={
            step === "EMAIL"
              ? "Lupa Password?"
              : step === "OTP"
              ? "Verifikasi Kode OTP"
              : step === "RESET_PASSWORD"
              ? "Buat Kata Sandi Baru"
              : "Kata Sandi Berhasil Direset"
          }
          subtitle={
            step === "EMAIL"
              ? "Masukkan email akun Anda untuk mendapatkan instruksi pemulihan akses."
              : step === "OTP"
              ? `Masukkan 6 digit kode verifikasi yang dikirim ke ${email}.`
              : step === "RESET_PASSWORD"
              ? "Kata sandi baru harus minimal 6 karakter dan mudah diingat oleh Anda."
              : "Akun pengelola BKK Anda telah diamankan dengan kata sandi baru."
          }
          isErrorShaking={isShaking}
        >
          {/* Step Progress Indicators */}
          {step !== "SUCCESS" && (
            <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-100">
              <div
                className={`flex items-center gap-1.5 text-xs font-semibold transition-colors ${
                  step === "EMAIL"
                    ? "text-[#0F62FE]"
                    : "text-emerald-600"
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] text-white ${
                    step === "EMAIL"
                      ? "bg-[#0F62FE]"
                      : "bg-emerald-600"
                  }`}
                >
                  {step !== "EMAIL" ? "✓" : "1"}
                </span>
                <span>Email</span>
              </div>

              <div
                className={`h-0.5 flex-1 mx-2 transition-colors ${
                  step === "OTP" || step === "RESET_PASSWORD"
                    ? "bg-[#0F62FE]"
                    : "bg-slate-200"
                }`}
              />

              <div
                className={`flex items-center gap-1.5 text-xs font-semibold transition-colors ${
                  step === "OTP"
                    ? "text-[#0F62FE]"
                    : step === "RESET_PASSWORD"
                    ? "text-emerald-600"
                    : "text-slate-400"
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${
                    step === "OTP"
                      ? "bg-[#0F62FE] text-white"
                      : step === "RESET_PASSWORD"
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-200 text-slate-500"
                  }`}
                >
                  {step === "RESET_PASSWORD" ? "✓" : "2"}
                </span>
                <span>Kode OTP</span>
              </div>

              <div
                className={`h-0.5 flex-1 mx-2 transition-colors ${
                  step === "RESET_PASSWORD" ? "bg-[#0F62FE]" : "bg-slate-200"
                }`}
              />

              <div
                className={`flex items-center gap-1.5 text-xs font-semibold transition-colors ${
                  step === "RESET_PASSWORD"
                    ? "text-[#0F62FE]"
                    : "text-slate-400"
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${
                    step === "RESET_PASSWORD"
                      ? "bg-[#0F62FE] text-white"
                      : "bg-slate-200 text-slate-500"
                  }`}
                >
                  3
                </span>
                <span>Reset</span>
              </div>
            </div>
          )}

          {/* Animated Feedback Alerts */}
          <AnimatePresence mode="wait">
            {apiError && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -6 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200/90 text-red-700 text-xs sm:text-sm flex items-start gap-2.5 overflow-hidden"
                role="alert"
              >
                <AlertCircle className="w-4 h-4 mt-0.5 text-red-500 flex-shrink-0" />
                <span className="leading-tight font-medium">{apiError}</span>
              </motion.div>
            )}

            {apiSuccess && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -6 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="mb-5 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200/90 text-emerald-800 text-xs sm:text-sm flex items-start gap-2.5 overflow-hidden"
                role="alert"
              >
                <CheckCircle2 className="w-4 h-4 mt-0.5 text-emerald-600 flex-shrink-0" />
                <span className="leading-tight font-medium">{apiSuccess}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ================= STEP 1: MASUKKAN EMAIL ================= */}
          {step === "EMAIL" && (
            <motion.form
              key="step-email"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              onSubmit={handleSubmitEmail(onSubmitEmail, () => triggerShake())}
              className="space-y-4"
              noValidate
            >
              <TextField
                label="Email / Username Akun Admin"
                placeholder="admin@gmail.com"
                autoComplete="email"
                error={emailErrors.email?.message}
                {...registerEmail("email")}
              />

              <div className="pt-2">
                <PrimaryButton
                  type="submit"
                  isLoading={isSubmittingEmail}
                  loadingText="Mengirimkan Kode..."
                >
                  Kirim Code Email
                </PrimaryButton>
              </div>

              <div className="pt-3 text-center">
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center gap-1.5 text-xs sm:text-sm font-semibold text-[#0F62FE] hover:text-[#0050E6] hover:underline transition-colors focus:outline-none focus:ring-2 focus:ring-[#0F62FE]/30 rounded px-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Kembali ke Halaman Login</span>
                </Link>
              </div>
            </motion.form>
          )}

          {/* ================= STEP 2: MASUKKAN KODE OTP ================= */}
          {step === "OTP" && (
            <motion.form
              key="step-otp"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              onSubmit={onSubmitOtp}
              className="space-y-4"
            >
              <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-100 text-xs text-[#0F62FE] flex items-center justify-between">
                <span>💡 Kode Demo OTP: <strong>123456</strong></span>
                <button
                  type="button"
                  onClick={() => setOtp("123456")}
                  className="underline hover:text-blue-800 font-semibold"
                >
                  Tempel Cepat
                </button>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                  Kode Verifikasi OTP (6 Digit)
                </label>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  length={6}
                  disabled={isSubmittingOtp}
                  error={!!apiError}
                />
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-slate-500">Tidak menerima kode?</span>
                {canResend ? (
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    className="font-semibold text-[#0F62FE] hover:underline flex items-center gap-1"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Kirim Ulang Kode
                  </button>
                ) : (
                  <span className="text-slate-400">
                    Kirim ulang dalam ({countdown}s)
                  </span>
                )}
              </div>

              <div className="pt-2">
                <PrimaryButton
                  type="submit"
                  isLoading={isSubmittingOtp}
                  loadingText="Memverifikasi OTP..."
                >
                  Verifikasi OTP
                </PrimaryButton>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs sm:text-sm">
                <button
                  type="button"
                  onClick={() => {
                    setStep("EMAIL");
                    setApiError(null);
                    setApiSuccess(null);
                  }}
                  className="font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Ganti Email
                </button>

                <Link
                  href="/login"
                  className="font-semibold text-[#0F62FE] hover:underline"
                >
                  Kembali ke Login
                </Link>
              </div>
            </motion.form>
          )}

          {/* ================= STEP 3: RESET PASSWORD ================= */}
          {step === "RESET_PASSWORD" && (
            <motion.form
              key="step-reset"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              onSubmit={handleSubmitReset(onSubmitReset, () => triggerShake())}
              className="space-y-4"
              noValidate
            >
              <input type="hidden" {...registerReset("email")} value={email} />
              <input type="hidden" {...registerReset("otp")} value={otp} />

              <PasswordField
                label="Kata Sandi Baru"
                placeholder="Minimal 6 karakter"
                autoComplete="new-password"
                error={resetErrors.password?.message}
                {...registerReset("password")}
              />

              <PasswordField
                label="Konfirmasi Kata Sandi Baru"
                placeholder="Ulangi kata sandi baru"
                autoComplete="new-password"
                error={resetErrors.password_confirmation?.message}
                {...registerReset("password_confirmation")}
              />

              <div className="pt-2">
                <PrimaryButton
                  type="submit"
                  isLoading={isSubmittingReset}
                  loadingText="Menyimpan Kata Sandi..."
                >
                  Simpan Kata Sandi Baru
                </PrimaryButton>
              </div>

              <div className="pt-2 text-center">
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center gap-1.5 text-xs sm:text-sm font-semibold text-[#0F62FE] hover:text-[#0050E6] hover:underline transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Batalkan dan Kembali ke Login</span>
                </Link>
              </div>
            </motion.form>
          )}

          {/* ================= STEP 4: SUCCESS ================= */}
          {step === "SUCCESS" && (
            <motion.div
              key="step-success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-4 space-y-5"
            >
              <div className="mx-auto w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center relative">
                <span className="animate-ping absolute inline-flex h-12 w-12 rounded-full bg-emerald-400 opacity-20" />
                <CheckCircle2 className="w-10 h-10 text-emerald-600 relative z-10" />
              </div>

              <div className="space-y-1.5">
                <h4 className="text-lg font-bold text-slate-900">
                  Akses Berhasil Dipulihkan!
                </h4>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-sm mx-auto">
                  Kata sandi akun <strong>{email}</strong> telah diperbarui.
                  Sekarang Anda dapat masuk kembali ke dashboard BKK OS.
                </p>
              </div>

              <div className="pt-2">
                <PrimaryButton
                  type="button"
                  onClick={() => router.push("/login")}
                >
                  Masuk ke Portal Sekarang
                </PrimaryButton>
              </div>
            </motion.div>
          )}
        </AuthCard>
      </AuthLayout>

      {/* Pop-up Error Modal */}
      <ErrorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Pemulihan Akses Gagal"
        message={modalMessage}
      />
    </>
  );
}
