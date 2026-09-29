"use client";

import React, { useEffect, useState } from "react";
import { TextDots } from "@/components/ui/text-dots";

// Color constants & configuration
export const NAVY_COLOR = "#1E2A5A";
export const ORANGE_COLOR = "#F5A623";
export const SESSION_STORAGE_KEY = "talenta-splash-seen";
export const DISPLAY_DURATION_MS = 1600;
export const FADE_OUT_DURATION_MS = 450;

export function SplashScreen() {
  // Initial state is "in" so overlay exists on mount without flash
  const [phase, setPhase] = useState<"in" | "out" | "gone">("in");

  useEffect(() => {
    // Check if splash screen was already viewed in this browser tab session
    const hasSeenSplash = sessionStorage.getItem(SESSION_STORAGE_KEY);

    if (hasSeenSplash) {
      setPhase("gone");
      return;
    }

    // Mark as seen for this session
    sessionStorage.setItem(SESSION_STORAGE_KEY, "true");

    // Lock body scroll during splash display
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Timer to start fading out
    const fadeTimer = setTimeout(() => {
      setPhase("out");
    }, DISPLAY_DURATION_MS);

    // Timer to completely unmount component and restore body scroll
    const unmountTimer = setTimeout(() => {
      setPhase("gone");
      document.body.style.overflow = originalOverflow;
    }, DISPLAY_DURATION_MS + FADE_OUT_DURATION_MS);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(unmountTimer);
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // When splash is completed, unmount completely
  if (phase === "gone") {
    return null;
  }

  return (
    <div
      aria-label="Memuat Talenta"
      className={`fixed inset-0 z-[99999] flex items-center justify-center bg-[#FDFDFD]/75 backdrop-blur-md transition-all duration-500 ease-out select-none ${
        phase === "out"
          ? "opacity-0 pointer-events-none scale-102"
          : "opacity-100 pointer-events-auto scale-100"
      }`}
    >
      {/* Floating Center Card over the Login Page */}
      <div className="flex flex-col items-center justify-center px-10 py-8 rounded-[28px] bg-white/90 backdrop-blur-xl shadow-[0_25px_60px_-15px_rgba(15,98,254,0.12),0_10px_25px_-5px_rgba(0,0,0,0.04)] border border-slate-100/90 transition-transform duration-300">
        <TextDots
          dots={3}
          style={{
            ["--duration" as string]: "1.4s",
            ["--delay" as string]: "0.2s",
          }}
          className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#1E2A5A] [&>span:last-child]:text-[#F5A623]"
        >
          Talenta
        </TextDots>

        <p className="text-xs text-slate-500 mt-2.5 font-medium tracking-wide">
          Memuat Portal BKK OS...
        </p>

        {/* Subtle Brand Loading Bar */}
        <div className="w-32 h-1 bg-slate-100 rounded-full mt-4 overflow-hidden relative">
          <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-[#1E2A5A] via-[#0F62FE] to-[#F5A623] rounded-full animate-shimmer" />
        </div>
      </div>
    </div>
  );
}
