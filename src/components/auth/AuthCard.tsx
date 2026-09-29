"use client";

import React from "react";
import { motion } from "framer-motion";

interface AuthCardProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  className?: string;
  isErrorShaking?: boolean;
}

export const AuthCard: React.FC<AuthCardProps> = ({
  title,
  subtitle,
  children,
  className = "",
  isErrorShaking = false,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        x: isErrorShaking ? [0, -8, 8, -6, 6, 0] : 0,
      }}
      transition={{
        opacity: { duration: 0.5, ease: "easeOut" },
        y: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
        scale: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
        x: { duration: 0.4, ease: "easeInOut" },
      }}
      className={`w-full max-w-[460px] bg-white rounded-[28px] p-7 sm:p-9 md:p-10 shadow-[0_24px_50px_-12px_rgba(15,98,254,0.08),0_12px_24px_-8px_rgba(0,0,0,0.04)] border border-slate-100/90 relative z-10 transition-shadow duration-300 hover:shadow-[0_30px_60px_-15px_rgba(15,98,254,0.12),0_16px_30px_-10px_rgba(0,0,0,0.05)] ${className}`}
    >
      {/* Subtle Top Card Inner Sheen */}
      <div className="absolute top-0 left-8 right-8 h-[1.5px] bg-gradient-to-r from-transparent via-blue-200/50 to-transparent pointer-events-none" />

      {/* Card Header */}
      <div className="mb-6 sm:mb-7">
        <h2 className="text-[26px] sm:text-[28px] font-bold text-slate-900 tracking-tight leading-snug">
          {title}
        </h2>
        <p className="text-sm text-[#6B7280] mt-1.5 leading-relaxed font-normal">
          {subtitle}
        </p>
      </div>

      {/* Card Form Body */}
      {children}
    </motion.div>
  );
};
