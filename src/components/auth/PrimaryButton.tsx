"use client";

import React from "react";
import { Loader2 } from "lucide-react";
import { HTMLMotionProps, motion } from "framer-motion";

interface PrimaryButtonProps extends HTMLMotionProps<"button"> {
  isLoading?: boolean;
  loadingText?: string;
  children: React.ReactNode;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  isLoading = false,
  loadingText = "Memproses...",
  children,
  disabled,
  className = "",
  ...props
}) => {
  return (
    <motion.button
      whileHover={disabled || isLoading ? {} : { scale: 1.01, translateY: -1 }}
      whileTap={disabled || isLoading ? {} : { scale: 0.985 }}
      transition={{ duration: 0.15 }}
      disabled={disabled || isLoading}
      className={`relative overflow-hidden w-full h-[52px] px-6 rounded-xl bg-[#0F62FE] hover:bg-[#0050E6] text-white font-semibold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-[0_8px_20px_rgba(15,98,254,0.28)] hover:shadow-[0_12px_28px_rgba(15,98,254,0.38)] disabled:opacity-60 disabled:cursor-not-allowed disabled:shadow-none transition-all duration-200 cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#0F62FE]/25 ${className}`}
      {...props}
    >
      {/* Subtle Animated Shimmer Light Sweep */}
      {!isLoading && !disabled && (
        <span
          aria-hidden="true"
          className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-25 pointer-events-none animate-shimmer"
        />
      )}

      {isLoading ? (
        <div className="flex items-center gap-2">
          <Loader2 className="w-5 h-5 animate-spin text-white" />
          <span>{loadingText}</span>
        </div>
      ) : (
        <span className="relative z-10">{children}</span>
      )}
    </motion.button>
  );
};
