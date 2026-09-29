import React, { InputHTMLAttributes, forwardRef, useId } from "react";
import { AlertCircle } from "lucide-react";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  containerClassName?: string;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, error, id, className = "", containerClassName = "", ...props }, ref) => {
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
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
            className={`w-full h-[52px] px-4 rounded-xl border bg-white text-slate-900 text-sm placeholder:text-slate-400 outline-none transition-all duration-200 ${
              error
                ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/15"
                : "border-slate-300 hover:border-slate-400 focus:border-[#0F62FE] focus:ring-4 focus:ring-[#0F62FE]/15 shadow-sm"
            } ${className}`}
            {...props}
          />
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

TextField.displayName = "TextField";
