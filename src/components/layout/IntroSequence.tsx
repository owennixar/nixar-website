"use client";

import { useEffect, useState, useRef } from "react";
import "./intro-sequence.css";

const SESSION_KEY = "nixar-intro-played";
const TOTAL_DURATION = 6500;

export default function IntroSequence() {
  const [shouldPlay, setShouldPlay] = useState<boolean | null>(null);
  const [done, setDone] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShouldPlay(false);
      return;
    }
    if (sessionStorage.getItem(SESSION_KEY)) {
      setShouldPlay(false);
      return;
    }
    sessionStorage.setItem(SESSION_KEY, "1");
    setShouldPlay(true);
  }, []);

  useEffect(() => {
    if (!shouldPlay) return;
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => {
      document.body.style.overflow = "";
      setDone(true);
    }, TOTAL_DURATION);
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [shouldPlay]);

  if (shouldPlay === null || !shouldPlay || done) return null;

  return (
    <div ref={containerRef} className="intro-overlay" aria-hidden="true" role="presentation">
      {/* ═══ PHASE 1: ROCKET + TEXT SLAM ═══ */}
      <div className="intro-stage">
        {/* Engine glow — beneath rocket */}
        <div className="intro-glow" />

        {/* Rocketship */}
        <img
          src="/images/rocketship.webp"
          alt=""
          loading="eager"
          decoding="sync"
          className="intro-rocket"
        />

        {/* Text SLAMS */}
        <span className="intro-text intro-text-transform">We Transform</span>
        <span className="intro-text intro-text-brand">Your Brand</span>
        <span className="intro-text intro-text-online">Online.</span>
      </div>

      {/* ═══ Screen shake at liftoff ═══ */}
      <div className="intro-shake" />

      {/* ═══ PHASE 2: SMOKE ═══ */}
      <div className="intro-smoke-container" aria-hidden="true">
        {/* CSS fallback smoke (always present) */}
        <div className="intro-smoke-css intro-smoke-css-1" />
        <div className="intro-smoke-css intro-smoke-css-2" />
        <div className="intro-smoke-css intro-smoke-css-3" />
        <div className="intro-smoke-css intro-smoke-css-4" />
        <div className="intro-smoke-css intro-smoke-css-5" />
        <div className="intro-smoke-css intro-smoke-css-6" />

        {/* PNG smoke layers (enhance on top if available) */}
        <img src="/images/smoke-layer-3.png" alt="" className="intro-smoke-img intro-smoke-fire" />
        <img src="/images/smoke-layer-1.png" alt="" className="intro-smoke-img intro-smoke-dense" />
        <img src="/images/smoke-layer-2.png" alt="" className="intro-smoke-img intro-smoke-wispy" />
      </div>

      {/* ═══ PHASE 3: TAGLINE REVEAL ═══ */}
      <div className="intro-tagline">
        <span className="intro-tagline-text">
          <span className="intro-tagline-black">Know </span>
          <span className="intro-tagline-red">YOUR </span>
          <span className="intro-tagline-black">Potential.</span>
        </span>
      </div>

      {/* ═══ Final fade ═══ */}
      <div className="intro-fadeout" />
    </div>
  );
}
