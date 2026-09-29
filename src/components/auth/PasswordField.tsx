"use client";

import React, { InputHTMLAttributes, forwardRef, useId, useState } from "react";
import { Eye, EyeOff, AlertCircle } from "lucide-react";

interface PasswordFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  containerClassName?: string;
}

export const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  ({ label, error, id, className = "", containerClassName = "", ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const generatedId = useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;

    return (
      <div className={`w-full group ${containerClassName}`}>
        <label
          htmlFor={inputId}
          className="block text-sm font-semibold text-slate-800 mb-2 cursor-pointer select-none transition-colors group-focus-within:text-[#0F62FE]"
        >
          {label}
        </label>
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            type={showPassword ? "text" : "password"}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
            className={`w-full h-[52px] pl-4 pr-12 rounded-xl border bg-white text-slate-900 text-sm placeholder:text-slate-400 outline-none transition-all duration-200 ${
              error
                ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/15"
                : "border-slate-300 hover:border-slate-400 focus:border-[#0F62FE] focus:ring-4 focus:ring-[#0F62FE]/15 shadow-sm"
            } ${className}`}
            {...props}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-2 rounded-lg hover:bg-slate-100 active:scale-90 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#0F62FE]/30"
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4 transition-transform duration-200 rotate-0" />
            ) : (
              <Eye className="w-4 h-4 transition-transform duration-200" />
            )}
          </button>
        </div>
        {error && (
          <div
            id={errorId}
            className="text-xs text-red-600 mt-1.5 flex items-center gap-1.5 font-medium animate-fadeIn transition-all"
            role="alert"
          >
            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 text-red-500" />
            <span>{error}</span>
          </div>
        )}
      </div>
    );
  }
);

PasswordField.displayName = "PasswordField";
