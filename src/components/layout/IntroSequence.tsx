"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import "./intro-sequence.css";

const SESSION_KEY = "nixar-intro-played";

export default function IntroSequence() {
  const [phase, setPhase] = useState<"init" | "video" | "tagline" | "exit" | "done">("init");
  const [postVideoActive, setPostVideoActive] = useState(false);
  const [taglineReveal, setTaglineReveal] = useState(false);
  const [shimmer, setShimmer] = useState(false);
  const [slideOut, setSlideOut] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
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

  const skipToTagline = useCallback(() => {
    clearAllTimers();
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setVideoEnded(true);
    setPostVideoActive(true);

    // Reveal tagline after brief pause
    addTimer(() => setTaglineReveal(true), 300);
    addTimer(() => setShimmer(true), 800);
    addTimer(() => setSlideOut(true), 2500);
    addTimer(() => {
      document.body.style.overflow = "auto";
      setPhase("done");
    }, 3100);
  }, [clearAllTimers, addTimer]);

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
    setPhase("video");

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // Video ended handler — transition to tagline phase
  useEffect(() => {
    if (phase !== "video") return;

    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      setVideoEnded(true);
      setPostVideoActive(true);

      // 10.3s — tagline appears (0.3s after video ends)
      addTimer(() => setTaglineReveal(true), 300);
      // 10.8s — shimmer on "YOUR"
      addTimer(() => setShimmer(true), 800);
      // 12.5s — slide out
      addTimer(() => setSlideOut(true), 2500);
      // 13.1s — unmount
      addTimer(() => {
        document.body.style.overflow = "auto";
        setPhase("done");
      }, 3100);
    };

    const handleError = () => {
      // Video failed to load — skip everything
      document.body.style.overflow = "auto";
      setPhase("done");
    };

    const handleWaiting = () => {
      // Start stall timer — if buffering > 3s, skip
      if (stallTimerRef.current) clearTimeout(stallTimerRef.current);
      stallTimerRef.current = setTimeout(() => {
        skipToTagline();
      }, 3000);
    };

    const handlePlaying = () => {
      // Clear stall timer when playback resumes
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
  }, [phase, addTimer, clearAllTimers, skipToTagline]);

  // Mobile tap to skip
  const handleTap = useCallback(() => {
    if (phase === "video") {
      skipToTagline();
    }
  }, [phase, videoEnded, skipToTagline]);

  if (phase === "done" || phase === "init") return null;

  return (
    <div
      className={`intro-overlay${slideOut ? " slide-out" : ""}`}
      aria-hidden="true"
      role="presentation"
      onClick={handleTap}
      onTouchEnd={handleTap}
    >
      {/* LAYER 1: Video */}
      {!videoEnded && (
        <video
          ref={videoRef}
          className="intro-video"
          autoPlay
          muted
          playsInline
          preload="auto"
          src="/videos/intro-video.mp4"
        />
      )}

      {/* LAYER 2: Scene text overlays (only during video) */}
      {!videoEnded && (
        <div className="intro-text-layer intro-shake">
          <span className="intro-scene-text intro-text-transform">
            We Transform
          </span>
          <span className="intro-scene-text intro-text-business">
            Your Business
          </span>
          <span className="intro-scene-text intro-text-online">
            Online.
          </span>
        </div>
      )}

      {/* POST-VIDEO: White screen + tagline */}
      <div className={`intro-post-video${postVideoActive ? " active" : ""}`}>
        <span className={`intro-tagline-text${taglineReveal ? " reveal" : ""}`}>
          <span className="intro-tagline-black">Know </span>
          <span className={`intro-tagline-red${shimmer ? " shimmer" : ""}`}>
            YOUR{" "}
          </span>
          <span className="intro-tagline-black">Potential.</span>
        </span>
      </div>
    </div>
  );
}
