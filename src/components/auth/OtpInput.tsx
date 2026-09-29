"use client";

import React, { useRef, useEffect } from "react";

interface OtpInputProps {
  value: string;
  onChange: (val: string) => void;
  length?: number;
  disabled?: boolean;
  error?: boolean;
}

export const OtpInput: React.FC<OtpInputProps> = ({
  value,
  onChange,
  length = 6,
  disabled = false,
  error = false,
}) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Split value into array of single chars
  const otpArray = Array.from({ length }, (_, i) => value[i] || "");

  useEffect(() => {
    // Focus first input on mount
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value.replace(/\D/g, ""); // numbers only

    if (!val) {
      // Clear current digit
      const newOtp = otpArray.map((d, i) => (i === index ? "" : d)).join("");
      onChange(newOtp);
      return;
    }

    // If pasted or typed multiple digits
    if (val.length > 1) {
      const pastedDigits = val.slice(0, length);
      onChange(pastedDigits);
      const nextIndex = Math.min(pastedDigits.length, length - 1);
      inputRefs.current[nextIndex]?.focus();
      return;
    }

    // Single digit
    const newOtp = otpArray.map((d, i) => (i === index ? val : d)).join("");
    onChange(newOtp);

    // Auto-advance to next box
    if (index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      if (!otpArray[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text/plain")
      .replace(/\D/g, "")
      .slice(0, length);

    if (pastedData) {
      onChange(pastedData);
      const focusIndex = Math.min(pastedData.length, length - 1);
      inputRefs.current[focusIndex]?.focus();
    }
  };

  return (
    <div className="flex items-center justify-between gap-2 sm:gap-2.5 my-2">
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          disabled={disabled}
          value={otpArray[index]}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          aria-label={`Digit ${index + 1}`}
          className={`w-12 h-14 sm:w-14 sm:h-14 text-center text-xl sm:text-2xl font-bold rounded-xl border bg-white outline-none transition-all duration-200 select-none ${
            error
              ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/15 text-red-700"
              : otpArray[index]
              ? "border-[#0F62FE] ring-2 ring-[#0F62FE]/15 text-[#0F62FE]"
              : "border-slate-300 hover:border-slate-400 focus:border-[#0F62FE] focus:ring-4 focus:ring-[#0F62FE]/20 text-slate-900"
          }`}
        />
      ))}
    </div>
  );
};
