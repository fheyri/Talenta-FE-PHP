"use client";

import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export const BackgroundGradient: React.FC = () => {
  // Mouse parallax motion values for interactive cursor reactivity
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for fluid responsiveness
  const springX = useSpring(mouseX, { stiffness: 45, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 45, damping: 25 });

  // Subtle parallax translation transforms
  const leftBlobX = useTransform(springX, [-0.5, 0.5], [-20, 20]);
  const leftBlobY = useTransform(springY, [-0.5, 0.5], [-15, 15]);

  const rightBlobX = useTransform(springX, [-0.5, 0.5], [25, -25]);
  const rightBlobY = useTransform(springY, [-0.5, 0.5], [20, -20]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = e.clientX / innerWidth - 0.5;
      const y = e.clientY / innerHeight - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#FDFDFD]"
    >
      {/* 
        TOP-LEFT BLOB:
        Matches the exact organic cloud/wave contour from the user reference.
        Multi-lobed curved wave shape with soft periwinkle ice-blue hue (#DCE6FD).
      */}
      <motion.div
        style={{ x: leftBlobX, y: leftBlobY }}
        animate={{
          scale: [1, 1.05, 0.98, 1],
          rotate: [0, 1.5, -1, 0],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-[10%] -left-[6%] w-[700px] lg:w-[860px] h-[480px] lg:h-[560px] origin-top-left"
      >
        <svg
          viewBox="0 0 860 560"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full filter blur-[75px] opacity-90"
        >
          {/* Organic wave path matching image 1 */}
          <path
            d="M -100 -50 
               L 860 -50 
               C 800 120, 680 180, 540 190 
               C 420 200, 380 340, 260 380 
               C 140 420, 40 490, -100 450 
               Z"
            fill="url(#leftGradient)"
          />
          <defs>
            <radialGradient
              id="leftGradient"
              cx="25%"
              cy="20%"
              r="75%"
              fx="20%"
              fy="15%"
            >
              <stop offset="0%" stopColor="#D8E5FD" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#E5EEFE" stopOpacity="0.75" />
              <stop offset="85%" stopColor="#F2F6FE" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#FDFDFD" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </motion.div>

      {/* 
        TOP-RIGHT BLOB:
        Matches the vibrant royal blue gradient from the user reference (#5085F6 -> #7AA6F8 -> #9EC0FC).
        Spans the top-right and extends behind the top portion of the form card.
      */}
      <motion.div
        style={{ x: rightBlobX, y: rightBlobY }}
        animate={{
          scale: [1.02, 0.97, 1.04, 1.02],
          rotate: [0, -2, 1.5, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-[14%] right-[-5%] w-[820px] lg:w-[980px] h-[580px] lg:h-[680px] origin-top-right"
      >
        <svg
          viewBox="0 0 980 680"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full filter blur-[85px] opacity-95"
        >
          {/* Diagonal radiant gradient path */}
          <path
            d="M 980 -50 
               L 180 -50 
               C 280 80, 390 140, 520 220 
               C 660 310, 750 430, 980 520 
               Z"
            fill="url(#rightGradient)"
          />
          <defs>
            <radialGradient
              id="rightGradient"
              cx="90%"
              cy="10%"
              r="85%"
              fx="95%"
              fy="5%"
            >
              <stop offset="0%" stopColor="#4A82F4" stopOpacity="0.9" />
              <stop offset="35%" stopColor="#6C97F3" stopOpacity="0.8" />
              <stop offset="65%" stopColor="#91B3F7" stopOpacity="0.55" />
              <stop offset="88%" stopColor="#D5E4FD" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#FDFDFD" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Center Subtle Fade to Crisp Off-White Base (#FDFDFD) */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FDFDFD]/30 to-[#FDFDFD] pointer-events-none" />
    </div>
  );
};
