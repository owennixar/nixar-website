"use client";

import { useEffect, useState } from "react";

const ORBS = [
  {
    size: 500,
    bg: "radial-gradient(circle, rgba(231,24,64,0.12) 0%, transparent 70%)",
    top: "10%",
    left: "-10%",
    blur: 80,
    anim: "float1 20s ease-in-out infinite",
  },
  {
    size: 400,
    bg: "radial-gradient(circle, rgba(231,24,64,0.08) 0%, transparent 70%)",
    top: "30%",
    right: "-5%",
    blur: 100,
    anim: "float2 25s ease-in-out infinite",
  },
  {
    size: 600,
    bg: "radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)",
    top: "50%",
    left: "20%",
    blur: 120,
    anim: "float3 22s ease-in-out infinite",
  },
  {
    size: 350,
    bg: "radial-gradient(circle, rgba(231,24,64,0.10) 0%, transparent 70%)",
    top: "70%",
    right: "15%",
    blur: 90,
    anim: "float4 18s ease-in-out infinite",
  },
  {
    size: 700,
    bg: "radial-gradient(circle, rgba(231,24,64,0.06) 0%, transparent 70%)",
    top: "85%",
    left: "-15%",
    blur: 150,
    anim: "float5 28s ease-in-out infinite",
  },
  {
    size: 300,
    bg: "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)",
    top: "15%",
    left: "50%",
    blur: 100,
    anim: "float6 24s ease-in-out infinite",
  },
];

export default function AnimatedOrbs() {
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
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
        aria-hidden="true"
      >
        {ORBS.map((orb, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: orb.size,
              height: orb.size,
              background: orb.bg,
              top: orb.top,
              left: orb.left,
              right: orb.right,
              filter: `blur(${orb.blur}px)`,
              animation: orb.anim,
              willChange: "transform",
              borderRadius: "50%",
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes float1 {
          0% { transform: translate(0px, 0px) scale(1); }
          25% { transform: translate(80px, -60px) scale(1.05); }
          50% { transform: translate(40px, 80px) scale(0.95); }
          75% { transform: translate(-60px, 40px) scale(1.03); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes float2 {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(-70px, 50px) scale(1.04); }
          66% { transform: translate(50px, -80px) scale(0.96); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes float3 {
          0% { transform: translate(0px, 0px); }
          20% { transform: translate(100px, 30px); }
          40% { transform: translate(50px, -70px); }
          60% { transform: translate(-80px, -30px); }
          80% { transform: translate(-40px, 60px); }
          100% { transform: translate(0px, 0px); }
        }
        @keyframes float4 {
          0% { transform: translate(0px, 0px) rotate(0deg); }
          50% { transform: translate(-60px, -80px) rotate(5deg); }
          100% { transform: translate(0px, 0px) rotate(0deg); }
        }
        @keyframes float5 {
          0% { transform: translate(0px, 0px) scale(1); }
          30% { transform: translate(70px, -40px) scale(1.06); }
          70% { transform: translate(-50px, 60px) scale(0.94); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes float6 {
          0% { transform: translate(0px, 0px); }
          50% { transform: translate(-90px, 70px); }
          100% { transform: translate(0px, 0px); }
        }
      `}</style>
    </>
  );
}
