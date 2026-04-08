"use client";

import { useEffect, useState, useRef } from "react";
import "./intro-sequence.css";

const SESSION_KEY = "nixar-intro-played";
const TOTAL_DURATION = 7700; // ms — full sequence

export default function IntroSequence() {
  const [shouldPlay, setShouldPlay] = useState<boolean | null>(null);
  const [rows, setRows] = useState<number[]>([]);
  const [phase, setPhase] = useState<"wall" | "rocket" | "tagline" | "done">("wall");
  const containerRef = useRef<HTMLDivElement>(null);

  // ── Decide whether to play ──────────────────────────────────────────────
  useEffect(() => {
    // Reduced motion: skip entirely
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShouldPlay(false);
      return;
    }
    // Session check: play once per session
    if (sessionStorage.getItem(SESSION_KEY)) {
      setShouldPlay(false);
      return;
    }
    sessionStorage.setItem(SESSION_KEY, "1");
    setShouldPlay(true);
  }, []);

  // ── Generate text wall rows ─────────────────────────────────────────────
  useEffect(() => {
    if (!shouldPlay) return;
    const rowHeight = Math.max(48, window.innerWidth * 0.06);
    const count = Math.ceil(window.innerHeight / rowHeight) + 4;
    setRows(Array.from({ length: count }, (_, i) => i));
  }, [shouldPlay]);

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
    const t1 = setTimeout(() => setPhase("rocket"), 1800);
    const t2 = setTimeout(() => setPhase("tagline"), 5200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [shouldPlay]);

  // ── Don't render if skipped or done ─────────────────────────────────────
  if (shouldPlay === null || shouldPlay === false || phase === "done") return null;

  const centerRow = Math.floor(rows.length / 2);

  return (
    <div
      ref={containerRef}
      className="intro-overlay"
      aria-hidden="true"
      role="presentation"
    >
      {/* ═══ ACT 1: NIXAR TEXT WALL ═══ */}
      <div className="intro-wall">
        {rows.map((i) => {
          const isOdd = i % 2 === 0;
          const distFromCenter = Math.abs(i - centerRow);
          const splitDelay = distFromCenter * 0.04;
          return (
            <div
              key={i}
              className={`intro-row ${isOdd ? "intro-row-odd" : "intro-row-even"}`}
              style={{
                animationDelay: `${1.8 + splitDelay}s`,
                // Drift: odd rows drift left, even drift right
                "--drift-dir": isOdd ? "-1" : "1",
              } as React.CSSProperties}
            >
              <div className="intro-row-inner">
                {"NIXAR ".repeat(30)}
              </div>
            </div>
          );
        })}
      </div>

      {/* ═══ ACT 2: ROCKET + TEXT ═══ */}
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

      {/* ═══ ACT 3: TAGLINE ═══ */}
      <div className="intro-tagline">
        <span className="intro-tagline-text">Know YOUR Potential.</span>
        <div className="intro-shimmer" />
      </div>

      {/* ═══ Final fade ═══ */}
      <div className="intro-fadeout" />
    </div>
  );
}
