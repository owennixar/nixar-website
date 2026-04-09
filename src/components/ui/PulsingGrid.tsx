"use client";

import { useEffect, useState } from "react";

export default function PulsingGrid() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(false);
    }
  }, []);

  if (!visible) return null;

  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
        aria-hidden="true"
      >
        {/* Grid SVG */}
        <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path
                d="M 80 0 L 0 0 0 80"
                fill="none"
                stroke="#E71840"
                strokeWidth="0.5"
                opacity="0.04"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Pulse wave — radial gradient that expands */}
        <div className="pulse-wave" />
      </div>

      <style jsx>{`
        .pulse-wave {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 200px;
          height: 200px;
          margin-left: -100px;
          margin-top: -100px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(231, 24, 64, 0.12) 0%,
            rgba(231, 24, 64, 0.06) 40%,
            transparent 70%
          );
          animation: pulseExpand 4s ease-out infinite;
          mix-blend-mode: screen;
          will-change: transform, opacity;
        }

        @keyframes pulseExpand {
          0% {
            transform: scale(0);
            opacity: 0.8;
          }
          50% {
            opacity: 0.3;
          }
          100% {
            transform: scale(3);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}
