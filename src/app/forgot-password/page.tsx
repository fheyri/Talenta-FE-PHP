"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthCard } from "@/components/auth/AuthCard";
import { TextField } from "@/components/auth/TextField";
import { PrimaryButton } from "@/components/auth/PrimaryButton";
import {
  forgotPasswordSchema,
  ForgotPasswordFormValues,
} from "@/lib/validations/auth";
import { requestPasswordReset } from "@/lib/api";
import { AlertCircle, CheckCircle2, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ForgotPasswordPage() {
  const [apiError, setApiError] = useState<string | null>(null);
  const [apiSuccess, setApiSuccess] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 450);
  };

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    setApiError(null);
    setApiSuccess(null);

    try {
      const response = await requestPasswordReset(values);

      if (response.success) {
        setApiSuccess(
          response.message ||
            "Instruksi dan kode pemulihan akses telah dikirimkan ke email Anda."
        );
        reset();
      } else {
        triggerShake();
        setApiError(
          response.message || "Gagal memproses pemulihan. Periksa email Anda."
        );
      }
    } catch (err: unknown) {
      triggerShake();
      const errorMsg =
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat memproses permintaan.";
      setApiError(errorMsg);
    }
  };

  const onError = () => {
    triggerShake();
  };

  return (
    <AuthLayout
      heroHeading="Pemulihan akses aman & terverifikasi untuk pengelola BKK."
      heroDescription="Sistem pengamanan kredensial terpadu memastikan hanya staf dan koordinator BKK resmi yang dapat mengatur ulang akses portal."
      badgeText="Pemulihan Akun BKK"
    >
      <AuthCard
        title="Lupa Password?"
        subtitle="Masukkan email akun Anda untuk mendapatkan instruksi pemulihan akses."
        isErrorShaking={isShaking}
      >
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
              <span className="leading-tight">{apiError}</span>
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
              <span className="leading-tight">{apiSuccess}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-4" noValidate>
          {/* Email / Username Akun Admin Input */}
          <TextField
            label="Email / Username Akun Admin"
            placeholder="admin@gmail.com"
            autoComplete="email"
            error={errors.email?.message}
            {...register("email")}
          />

          {/* Submit Button (Kirim Code Email) */}
          <div className="pt-2">
            <PrimaryButton
              type="submit"
              isLoading={isSubmitting}
              loadingText="Mengirimkan Kode..."
            >
              Kirim Code Email
            </PrimaryButton>
          </div>

          {/* Back to Login Link (Centered) */}
          <div className="pt-3 text-center">
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-1.5 text-xs sm:text-sm font-semibold text-[#0F62FE] hover:text-[#0050E6] hover:underline transition-colors focus:outline-none focus:ring-2 focus:ring-[#0F62FE]/30 rounded px-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali ke Halaman Login</span>
            </Link>
          </div>
        </form>
      </AuthCard>
    </AuthLayout>
  );
}
