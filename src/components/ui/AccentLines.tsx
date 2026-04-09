"use client";

import { useEffect, useState } from "react";

export default function AccentLines() {
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
        className="pointer-events-none fixed inset-0 z-[3] overflow-hidden"
        aria-hidden="true"
      >
        {/* Line 1: S-curve right side of hero area */}
        <svg
          className="absolute top-[5vh] right-[3vw] h-[40vh] w-[120px]"
          viewBox="0 0 120 400"
          fill="none"
        >
          <path
            d="M60 0 C120 80, 0 160, 60 240 C120 320, 0 400, 60 400"
            stroke="#E71840"
            strokeWidth="1.5"
            className="accent-line line-1"
          />
        </svg>

        {/* Line 2: diagonal flowing curve mid-page left side */}
        <svg
          className="absolute top-[55vh] left-[2vw] h-[30vh] w-[200px]"
          viewBox="0 0 200 300"
          fill="none"
        >
          <path
            d="M0 300 C50 200, 150 250, 100 150 C50 50, 200 0, 200 0"
            stroke="#E71840"
            strokeWidth="1"
            className="accent-line line-2"
          />
        </svg>

        {/* Line 3: vertical wavy left side, lower */}
        <svg
          className="absolute top-[130vh] left-[5vw] h-[25vh] w-[60px]"
          viewBox="0 0 60 300"
          fill="none"
        >
          <path
            d="M30 0 C50 50, 10 100, 30 150 C50 200, 10 250, 30 300"
            stroke="#E71840"
            strokeWidth="1.5"
            className="accent-line line-3"
          />
        </svg>

        {/* Line 4: circular/spiral near bottom */}
        <svg
          className="absolute bottom-[20vh] right-[8vw] h-[150px] w-[150px] accent-spin"
          viewBox="0 0 150 150"
          fill="none"
        >
          <path
            d="M75 10 A65 65 0 1 1 74 10 M75 25 A50 50 0 1 1 74 25 M75 40 A35 35 0 1 1 74 40"
            stroke="#E71840"
            strokeWidth="1"
            className="accent-line line-4"
          />
        </svg>
      </div>

      <style jsx>{`
        .accent-line {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          opacity: 0;
        }

        .line-1 {
          animation: drawLine 3s ease-out 1s forwards,
            linePulse 3s ease-in-out 4s infinite;
        }
        .line-2 {
          animation: drawLine 3s ease-out 2s forwards,
            linePulse 3s ease-in-out 5s infinite;
        }
        .line-3 {
          animation: drawLine 3s ease-out 3s forwards,
            linePulse 3s ease-in-out 6s infinite;
        }
        .line-4 {
          animation: drawLine 3s ease-out 2.5s forwards,
            linePulse 3s ease-in-out 5.5s infinite;
        }

        @keyframes drawLine {
          0% {
            stroke-dashoffset: 1000;
            opacity: 0;
          }
          10% {
            opacity: 0.15;
          }
          100% {
            stroke-dashoffset: 0;
            opacity: 0.1;
          }
        }

        @keyframes linePulse {
          0%,
          100% {
            opacity: 0.08;
          }
          50% {
            opacity: 0.15;
          }
        }

        .accent-spin {
          animation: slowSpin 30s linear infinite;
        }

        @keyframes slowSpin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
}
