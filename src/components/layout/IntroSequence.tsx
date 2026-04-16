"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import "./intro-sequence.css";

const STORAGE_KEY = "nixar-intro-last-played";
const REPLAY_AFTER_MS = 60 * 60 * 1000; // 1 hour

type Scene = null | "scene1" | "scene2" | "scene3";
type Ripple = { id: number; x: number; y: number };

export default function IntroSequence() {
  const [active, setActive] = useState(false);
  const [scene, setScene] = useState<Scene>(null);
  const [showPost, setShowPost] = useState(false);
  const [whiteBg, setWhiteBg] = useState(false);
  const [taglineVisible, setTaglineVisible] = useState(false);
  const [videoHidden, setVideoHidden] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const videoRef = useRef<HTMLVideoElement>(null);
  const stallTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const mountedRef = useRef(true);

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

  const finish = useCallback(() => {
    clearAllTimers();
    if (videoRef.current) videoRef.current.pause();
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", "#E71840");
    document.body.style.overflow = "auto";
    setActive(false);
  }, [clearAllTimers]);

  const runTaglineSequence = useCallback(() => {
    clearAllTimers();
    if (videoRef.current) videoRef.current.pause();
    setScene(null);
    setVideoHidden(true);
    setShowPost(true);

    // 0ms: dark bg visible
    // 100ms: transition to white
    addTimer(() => setWhiteBg(true), 100);
    // 300ms: tagline blur-in
    addTimer(() => setTaglineVisible(true), 300);
    // 1300ms: hard cut. unmount everything (1s on screen)
    addTimer(() => finish(), 1300);
  }, [clearAllTimers, addTimer, finish]);

  // Init
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    try {
      const last = localStorage.getItem(STORAGE_KEY);
      if (last && Date.now() - parseInt(last, 10) < REPLAY_AFTER_MS) return;
      localStorage.setItem(STORAGE_KEY, Date.now().toString());
    } catch {
      /* ignore — plays anyway */
    }

    document.body.style.overflow = "hidden";

    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", "#0A0A0A");

    mountedRef.current = true;
    setActive(true);

    return () => {
      mountedRef.current = false;
      document.body.style.overflow = "auto";
      if (meta) meta.setAttribute("content", "#E71840");
    };
  }, []);

  // Video timeupdate → hard-cut scene text
  useEffect(() => {
    if (!active) return;
    const video = videoRef.current;
    if (!video) return;

    const onTimeUpdate = () => {
      const t = video.currentTime;
      if (t >= 0.5 && t < 2.8) {
        setScene("scene1");
      } else if (t >= 3.35 && t < 6.4) {
        setScene("scene2");
      } else if (t >= 6.8 && t < 8.0) {
        setScene("scene3");
      } else {
        setScene(null);
      }
    };

    const onEnded = () => runTaglineSequence();

    const onError = () => finish();

    const onWaiting = () => {
      if (stallTimerRef.current) clearTimeout(stallTimerRef.current);
      stallTimerRef.current = setTimeout(() => finish(), 3000);
    };

    const onPlaying = () => {
      if (stallTimerRef.current) {
        clearTimeout(stallTimerRef.current);
        stallTimerRef.current = null;
      }
    };

    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("ended", onEnded);
    video.addEventListener("error", onError);
    video.addEventListener("waiting", onWaiting);
    video.addEventListener("playing", onPlaying);

    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("error", onError);
      video.removeEventListener("waiting", onWaiting);
      video.removeEventListener("playing", onPlaying);
      clearAllTimers();
    };
  }, [active, runTaglineSequence, finish, clearAllTimers]);

  // Tap/click anywhere → ripple feedback, then skip
  const handleSkip = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (!active) return;
      const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
      const point =
        "touches" in e && e.touches.length
          ? e.touches[0]
          : "changedTouches" in e && e.changedTouches.length
          ? e.changedTouches[0]
          : (e as React.MouseEvent);
      const x = (point as { clientX: number }).clientX - rect.left;
      const y = (point as { clientY: number }).clientY - rect.top;
      const id = Date.now();
      setRipples((r) => [...r, { id, x, y }]);
      // Let the ripple play briefly before unmounting
      addTimer(() => finish(), 260);
    },
    [active, finish, addTimer]
  );

  if (!active) return null;

  return (
    <div
      className="intro-overlay"
      aria-hidden="true"
      role="presentation"
      onClick={handleSkip}
      onTouchEnd={handleSkip}
    >
      {/* Click/tap ripples */}
      {ripples.map((r) => (
        <span
          key={r.id}
          className="intro-ripple"
          style={{ left: r.x, top: r.y }}
          onAnimationEnd={() =>
            setRipples((list) => list.filter((x) => x.id !== r.id))
          }
        />
      ))}

      {/* ═══ CINEMATIC VIDEO FRAME ═══ */}
      {!videoHidden && (
        <div className="intro-cinema-frame">
          <video
            ref={videoRef}
            className="intro-video"
            autoPlay
            muted
            playsInline
            preload="auto"
            src="/videos/intro-compressed.mp4"
          />
          <div className="intro-vignette" />
          <div className="intro-grain" />

          {/* Text. hard cut visibility via scene state */}
          <div className="intro-text-layer">
            {scene === "scene1" && (
              <span className="intro-scene-text">
                <span className="intro-scene-text--white">We </span>
                <span className="intro-scene-text--red">Transform</span>
                <span className="intro-scene-text--red">.</span>
              </span>
            )}
            {scene === "scene2" && (
              <span className="intro-scene-text">
                <span className="intro-scene-text--white">Your </span>
                <span className="intro-scene-text--red">Business.</span>
              </span>
            )}
            {scene === "scene3" && (
              <span className="intro-scene-text intro-scene-text--red-big intro-scene-text--playfair">
                Online.
              </span>
            )}
          </div>

          {/* Skip hint — pulsing like the scroll indicator on the homepage */}
          <div className="intro-skip-hint" aria-hidden="true">
            <span className="intro-skip-hint__label">Tap to skip</span>
            <span className="intro-skip-hint__dot">
              <span className="intro-skip-hint__pulse" />
            </span>
          </div>
        </div>
      )}

      {/* ═══ POST-VIDEO: TAGLINE ═══ */}
      <div
        className={
          "intro-post" +
          (showPost ? " active" : "") +
          (whiteBg ? " white" : "")
        }
      >
        <span className={"intro-tagline" + (taglineVisible ? " reveal" : "")}>
          <span className="intro-tagline-dark">Know </span>
          <span className="intro-tagline-red">YOUR </span>
          <span className="intro-tagline-dark">Potential.</span>
        </span>
      </div>
    </div>
  );
}
