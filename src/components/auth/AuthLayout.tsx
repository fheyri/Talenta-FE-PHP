"use client";

import React from "react";
import { motion } from "framer-motion";
import { BackgroundGradient } from "./BackgroundGradient";
import { AuthFooter } from "./AuthFooter";

interface AuthLayoutProps {
  heroHeading: string;
  heroDescription: React.ReactNode;
  badgeText?: string;
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  heroHeading,
  heroDescription,
  badgeText = "Portal Khusus Pengelola BKK Sekolah",
  children,
}) => {
  return (
    <div className="min-h-screen flex flex-col justify-between relative bg-[#FDFDFD] overflow-x-hidden selection:bg-[#0F62FE] selection:text-white font-sans">
      {/* Dynamic Ambient Gradient Blobs with Organic Wave SVG & Cursor Parallax */}
      <BackgroundGradient />

      {/* Main Two-Column Content Area */}
      <main className="w-full flex-1 flex items-center justify-center relative z-10 py-10 lg:py-16">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Hero Text (Vertically Centered & Left-Aligned) */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 flex flex-col justify-center"
            >
              {/* Official Status Radar Badge */}
              {badgeText && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50/90 border border-blue-100/90 text-[#0F62FE] text-xs font-semibold tracking-wide w-fit mb-4 backdrop-blur-sm shadow-sm"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0F62FE] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0F62FE]" />
                  </span>
                  <span>{badgeText}</span>
                </motion.div>
              )}

              {/* Bold Hero Heading */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold text-slate-900 tracking-tight leading-[1.14] text-balance">
                {heroHeading}
              </h1>

              {/* Hero Paragraph with Typewriter Effect Support */}
              <div className="mt-5 sm:mt-6 text-base sm:text-lg text-[#6B7280] font-normal leading-relaxed max-w-xl min-h-[5rem]">
                {heroDescription}
              </div>
            </motion.div>

            {/* Right Column: Card Form (Positioned on the Right) */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              {children}
            </div>
          </div>
        </div>
      </main>

      {/* Responsive 3-Section Footer */}
      <AuthFooter />
    </div>
  );
};
