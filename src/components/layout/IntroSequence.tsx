"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import "./intro-sequence.css";

const SESSION_KEY = "nixar-intro-played";

export default function IntroSequence() {
  const [phase, setPhase] = useState<
    "init" | "video" | "post" | "done"
  >("init");
  const [postVideoActive, setPostVideoActive] = useState(false);
  const [whiteBg, setWhiteBg] = useState(false);
  const [taglineReveal, setTaglineReveal] = useState(false);
  const [taglineFadeOut, setTaglineFadeOut] = useState(false);
  const [shimmer, setShimmer] = useState(false);
  const [wipeActive, setWipeActive] = useState(false);
  const [wipeExit, setWipeExit] = useState(false);
  const [videoHidden, setVideoHidden] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const stallTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearAllTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    if (stallTimerRef.current) {
      clearTimeout(stallTimerRef.current);
      stallTimerRef.current = null;
    }
  }, []);

  const addTimer = useCallback((fn: () => void, ms: number) => {
    const id = setTimeout(fn, ms);
    timersRef.current.push(id);
    return id;
  }, []);

  const runPostVideoSequence = useCallback(() => {
    // Hide video, show post-video overlay
    setVideoHidden(true);
    setPostVideoActive(true);

    // 0ms: dark bg shows
    // 200ms: transition to white
    addTimer(() => setWhiteBg(true), 200);

    // 500ms: tagline appears with blur-to-sharp
    addTimer(() => setTaglineReveal(true), 500);

    // 800ms: shimmer on "YOUR"
    addTimer(() => setShimmer(true), 800);

    // 2000ms: tagline fades out
    addTimer(() => setTaglineFadeOut(true), 2000);

    // 2500ms: red wipe begins
    addTimer(() => {
      setWipeActive(true);
      setWipeExit(true);
    }, 2500);

    // 3100ms: unmount, restore page
    addTimer(() => {
      // Restore theme color to brand red
      const themeMeta = document.querySelector('meta[name="theme-color"]');
      if (themeMeta) themeMeta.setAttribute("content", "#E71840");
      document.body.style.overflow = "auto";
      setPhase("done");
    }, 3100);
  }, [addTimer]);

  const skipToTagline = useCallback(() => {
    clearAllTimers();
    if (videoRef.current) {
      videoRef.current.pause();
    }
    runPostVideoSequence();
  }, [clearAllTimers, runPostVideoSequence]);

  // Init: check sessionStorage and prefers-reduced-motion
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("done");
      return;
    }
    if (sessionStorage.getItem(SESSION_KEY)) {
      setPhase("done");
      return;
    }
    sessionStorage.setItem(SESSION_KEY, "1");
    document.body.style.overflow = "hidden";

    // Set dark theme-color during cinematic intro
    const themeMeta = document.querySelector('meta[name="theme-color"]');
    if (themeMeta) themeMeta.setAttribute("content", "#0A0A0A");

    setPhase("video");

    return () => {
      document.body.style.overflow = "auto";
      if (themeMeta) themeMeta.setAttribute("content", "#E71840");
    };
  }, []);

  // Video event handlers
  useEffect(() => {
    if (phase !== "video") return;

    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      runPostVideoSequence();
    };

    const handleError = () => {
      document.body.style.overflow = "auto";
      const themeMeta = document.querySelector('meta[name="theme-color"]');
      if (themeMeta) themeMeta.setAttribute("content", "#E71840");
      setPhase("done");
    };

    const handleWaiting = () => {
      if (stallTimerRef.current) clearTimeout(stallTimerRef.current);
      stallTimerRef.current = setTimeout(() => {
        skipToTagline();
      }, 3000);
    };

    const handlePlaying = () => {
      if (stallTimerRef.current) {
        clearTimeout(stallTimerRef.current);
        stallTimerRef.current = null;
      }
    };

    video.addEventListener("ended", handleEnded);
    video.addEventListener("error", handleError);
    video.addEventListener("waiting", handleWaiting);
    video.addEventListener("playing", handlePlaying);

    return () => {
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("error", handleError);
      video.removeEventListener("waiting", handleWaiting);
      video.removeEventListener("playing", handlePlaying);
      clearAllTimers();
    };
  }, [phase, runPostVideoSequence, skipToTagline, clearAllTimers]);

  // Tap/click to skip
  const handleTap = useCallback(() => {
    if (phase === "video") {
      skipToTagline();
    }
  }, [phase, skipToTagline]);

  if (phase === "done" || phase === "init") return null;

  return (
    <div
      className={`intro-overlay${wipeExit ? " wipe-exit" : ""}`}
      aria-hidden="true"
      role="presentation"
      onClick={handleTap}
      onTouchEnd={handleTap}
    >
      {/* ═══ CINEMATIC VIDEO FRAME ═══ */}
      {!videoHidden && (
        <div className="intro-cinema-frame intro-shake-target">
          <video
            ref={videoRef}
            className="intro-video"
            autoPlay
            muted
            playsInline
            preload="auto"
            src="/videos/intro-video.mp4"
          />

          {/* Vignette */}
          <div className="intro-vignette" />

          {/* Film grain */}
          <div className="intro-grain" />

          {/* ═══ TEXT OVERLAYS — relative to cinema frame ═══ */}
          <div className="intro-text-layer">
            {/* Scene 1: lower-third left */}
            <div className="intro-lt-line1" />
            <span className="intro-lt intro-lt-text1">We Transform</span>

            {/* Scene 2: lower-third right */}
            <div className="intro-lt-line2" />
            <span className="intro-lt intro-lt-text2">Your Business</span>

            {/* Scene 3: center stamp */}
            <span className="intro-center-stamp">Online.</span>

            {/* Shockwave ring */}
            <div className="intro-shockwave" />
          </div>
        </div>
      )}

      {/* ═══ POST-VIDEO: TAGLINE REVEAL ═══ */}
      <div
        className={
          "intro-post-video" +
          (postVideoActive ? " active" : "") +
          (whiteBg ? " white-bg" : "")
        }
      >
        <span
          className={
            "intro-tagline-text" +
            (taglineReveal ? " reveal" : "") +
            (taglineFadeOut ? " fade-out" : "")
          }
        >
          <span className="intro-tagline-black">Know </span>
          <span className={`intro-tagline-red${shimmer ? " shimmer" : ""}`}>
            YOUR{" "}
          </span>
          <span className="intro-tagline-black">Potential.</span>
        </span>
      </div>

      {/* ═══ RED WIPE CURTAIN ═══ */}
      <div className={`intro-wipe${wipeActive ? " active" : ""}`} />
    </div>
  );
}
