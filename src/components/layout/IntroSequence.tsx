"use client";

import { useEffect, useState, useRef } from "react";
import "./intro-sequence.css";

const SESSION_KEY = "nixar-intro-played";
const TOTAL_DURATION = 6000; // ms — full sequence

export default function IntroSequence() {
  const [shouldPlay, setShouldPlay] = useState<boolean | null>(null);
  const [phase, setPhase] = useState<"rocket" | "tagline" | "done">("rocket");
  const containerRef = useRef<HTMLDivElement>(null);

  // ── Decide whether to play ──────────────────────────────────────────────
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

  // ── Body overflow lock ──────────────────────────────────────────────────
  useEffect(() => {
    if (!shouldPlay) return;
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      document.body.style.overflow = "";
      setPhase("done");
    }, TOTAL_DURATION);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [shouldPlay]);

  // ── Phase transitions ───────────────────────────────────────────────────
  useEffect(() => {
    if (!shouldPlay) return;
    const t1 = setTimeout(() => setPhase("tagline"), 3700);
    return () => clearTimeout(t1);
  }, [shouldPlay]);

  // ── Don't render if skipped or done ─────────────────────────────────────
  if (shouldPlay === null || shouldPlay === false || phase === "done") return null;

  return (
    <div
      ref={containerRef}
      className="intro-overlay"
      aria-hidden="true"
      role="presentation"
    >
      {/* ═══ ROCKET + TEXT ═══ */}
      <div className="intro-stage">
        {/* Exhaust glow — behind rocket */}
        <div className="intro-exhaust" />

        {/* Rocketship */}
        <img
          src="/images/rocketship.webp"
          alt=""
          loading="eager"
          decoding="sync"
          className="intro-rocket"
        />

        {/* Text overlays */}
        <span className="intro-text intro-text-transform">WE TRANSFORM</span>
        <span className="intro-text intro-text-brand">YOUR BRAND</span>
        <span className="intro-text intro-text-online">ONLINE.</span>
      </div>

      {/* ═══ Screen shake overlay ═══ */}
      <div className="intro-shake" />

      {/* ═══ TAGLINE ═══ */}
      <div className="intro-tagline">
        <span className="intro-tagline-text">Know YOUR Potential.</span>
        <div className="intro-shimmer" />
      </div>

      {/* ═══ Final fade ═══ */}
      <div className="intro-fadeout" />
    </div>
  );
}
