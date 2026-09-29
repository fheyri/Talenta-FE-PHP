"use client";

import React, { useState, useEffect } from "react";

interface TypewriterTextProps {
  text: string;
  speed?: number; // average ms per char
  startDelay?: number; // delay before starting
  className?: string;
  cursorClassName?: string;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  speed = 22,
  startDelay = 400,
  className = "",
  cursorClassName = "",
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let charIndex = 0;

    const startTyping = () => {
      setIsTyping(true);

      const typeNextChar = () => {
        if (charIndex < text.length) {
          setDisplayedText(text.slice(0, charIndex + 1));
          charIndex++;
          // Add slight human-like randomness (15ms - 32ms)
          const randomSpeed = Math.floor(Math.random() * 16) + (speed - 8);
          timeoutId = setTimeout(typeNextChar, Math.max(12, randomSpeed));
        } else {
          setIsTyping(false);
          setIsCompleted(true);
        }
      };

      typeNextChar();
    };

    const initialTimer = setTimeout(startTyping, startDelay);

    return () => {
      clearTimeout(initialTimer);
      clearTimeout(timeoutId);
    };
  }, [text, speed, startDelay]);

  return (
    <span className={`inline ${className}`}>
      {displayedText}
      {(!isCompleted || isTyping) && (
        <span
          aria-hidden="true"
          className={`inline-block w-[2.5px] h-[1.15em] bg-[#0F62FE] ml-1 align-text-bottom rounded-full animate-caret ${cursorClassName}`}
        />
      )}
    </span>
  );
};
