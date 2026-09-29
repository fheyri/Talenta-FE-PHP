"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";

interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

export const ErrorModal: React.FC<ErrorModalProps> = ({
  isOpen,
  onClose,
  title = "Ups! Email atau Kata Sandi Salah",
  message = "Silahkan coba lagi. Pastikan email/username dan kata sandi akun admin pengelola BKK yang Anda masukkan sudah benar.",
}) => {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
            aria-hidden="true"
          />

          {/* Modal Card */}
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{
              duration: 0.3,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative w-full max-w-[420px] bg-white rounded-[24px] p-6 sm:p-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.25)] border border-red-100 z-10 overflow-hidden text-center"
          >
            {/* Top Red Accent Glow Line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-500 via-rose-500 to-amber-500" />

            {/* Close 'X' Button */}
            <button
              onClick={onClose}
              aria-label="Tutup pop-up"
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Warning Icon with Ambient Pulse */}
            <div className="mx-auto w-16 h-16 rounded-full bg-red-50 border border-red-100 flex items-center justify-center mb-4 relative">
              <span className="animate-ping absolute inline-flex h-12 w-12 rounded-full bg-red-400 opacity-20" />
              <AlertTriangle className="w-8 h-8 text-red-600 relative z-10" />
            </div>

            {/* Modal Heading */}
            <h3 className="text-xl sm:text-[22px] font-bold text-slate-900 tracking-tight leading-snug">
              {title}
            </h3>

            {/* Modal Description */}
            <p className="mt-2 text-sm text-[#6B7280] leading-relaxed">
              {message}
            </p>

            {/* Action Button */}
            <div className="mt-6">
              <button
                type="button"
                onClick={onClose}
                autoFocus
                className="w-full h-[48px] px-6 rounded-xl bg-[#0F62FE] hover:bg-[#0050E6] text-white font-semibold text-sm shadow-[0_8px_20px_rgba(15,98,254,0.25)] hover:shadow-[0_12px_24px_rgba(15,98,254,0.35)] active:scale-[0.98] transition-all duration-150 cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#0F62FE]/30"
              >
                Coba Lagi
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
