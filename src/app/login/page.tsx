"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthCard } from "@/components/auth/AuthCard";
import { TextField } from "@/components/auth/TextField";
import { PasswordField } from "@/components/auth/PasswordField";
import { PrimaryButton } from "@/components/auth/PrimaryButton";
import { loginSchema, LoginFormValues } from "@/lib/validations/auth";
import { loginAdmin } from "@/lib/api";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoginPage() {
  const [apiError, setApiError] = useState<string | null>(null);
  const [apiSuccess, setApiSuccess] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 450);
  };

  const onSubmit = async (values: LoginFormValues) => {
    setApiError(null);
    setApiSuccess(null);

    try {
      const response = await loginAdmin(values);

      if (response.success) {
        setApiSuccess(response.message || "Login berhasil!");
        if (response.token) {
          localStorage.setItem("talenta_bkk_token", response.token);
          if (response.user) {
            localStorage.setItem("talenta_bkk_user", JSON.stringify(response.user));
          }
        }
      } else {
        triggerShake();
        setApiError(response.message || "Gagal masuk. Periksa kembali akun Anda.");
      }
    } catch (err: unknown) {
      triggerShake();
      const errorMsg =
        err instanceof Error ? err.message : "Terjadi kesalahan saat masuk.";
      setApiError(errorMsg);
    }
  };

  const onError = () => {
    triggerShake();
  };

  return (
    <AuthLayout
      heroHeading="Akselerasi serapan alumni & kemitraan kerja vokasi."
      heroDescription="Platform tata kelola karir terpadu untuk monitoring tracer study, verifikasi lowongan kerja resmi, dan rekapitulasi data BKK sekolah secara akurat."
      badgeText="Portal Khusus Pengelola BKK Sekolah"
    >
      <AuthCard
        title="Selamat Datang Kembali"
        subtitle="Masuk ke Dashboard BKK untuk mengelola informasi dan data karier."
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
          {/* Email / Username Input */}
          <TextField
            label="Email / Username"
            placeholder="admin@gmail.com"
            autoComplete="username"
            error={errors.email?.message}
            {...register("email")}
          />

          {/* Password Input */}
          <PasswordField
            label="Password"
            placeholder="admin123"
            autoComplete="current-password"
            error={errors.password?.message}
            {...register("password")}
          />

          {/* Lupa Password Link (Right Aligned) */}
          <div className="flex justify-end pt-0.5">
            <Link
              href="/forgot-password"
              className="text-xs font-semibold text-[#0F62FE] hover:text-[#0050E6] hover:underline transition-colors duration-150 inline-block focus:outline-none focus:ring-2 focus:ring-[#0F62FE]/30 rounded"
            >
              Lupa password ?
            </Link>
          </div>

          {/* Submit Button (Sign In) */}
          <div className="pt-2">
            <PrimaryButton
              type="submit"
              isLoading={isSubmitting}
              loadingText="Memverifikasi Akun..."
            >
              Sign In
            </PrimaryButton>
          </div>

          {/* Sign Up Redirect Link */}
          <div className="pt-2 text-center text-xs sm:text-sm text-[#6B7280]">
            Don&apos;t have account?{" "}
            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault();
                alert(
                  "Pendaftaran akun Pengelola BKK Sekolah dilakukan melalui Dinas Pendidikan / Administrator Pusat TALENTA."
                );
              }}
              className="font-semibold text-[#0F62FE] hover:text-[#0050E6] hover:underline ml-0.5 transition-colors focus:outline-none focus:ring-2 focus:ring-[#0F62FE]/30 rounded"
            >
              Sign Up
            </Link>
          </div>
        </form>
      </AuthCard>
    </AuthLayout>
  );
}
