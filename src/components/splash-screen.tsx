"use client";

import React, { useEffect, useState } from "react";
import { TextDots } from "@/components/ui/text-dots";

// Color constants & configuration
export const NAVY_COLOR = "#1E2A5A";
export const ORANGE_COLOR = "#F5A623";
export const SESSION_STORAGE_KEY = "talenta-splash-seen";
export const DISPLAY_DURATION_MS = 1800;
export const FADE_OUT_DURATION_MS = 500;

export function SplashScreen() {
  // Initial state is "in" so overlay is rendered server-side without content flash
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

    // Timer to start fading out (1800ms)
    const fadeTimer = setTimeout(() => {
      setPhase("out");
    }, DISPLAY_DURATION_MS);

    // Timer to completely unmount component and restore body scroll (1800ms + 500ms)
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
      className={`fixed inset-0 z-[99999] flex items-center justify-center bg-white transition-opacity duration-500 ease-out select-none ${
        phase === "out"
          ? "opacity-0 pointer-events-none"
          : "opacity-100 pointer-events-auto"
      }`}
    >
      <div className="flex flex-col items-center justify-center">
        <TextDots
          dots={3}
          style={{
            ["--duration" as string]: "1.4s",
            ["--delay" as string]: "0.2s",
          }}
          className="text-5xl sm:text-6xl font-extrabold tracking-tight text-[#1E2A5A] [&>span:last-child]:text-[#F5A623]"
        >
          Talenta
        </TextDots>
      </div>
    </div>
  );
}
