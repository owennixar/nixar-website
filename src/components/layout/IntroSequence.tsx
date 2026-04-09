"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import "./intro-sequence.css";

const SESSION_KEY = "nixar-intro-played";

type Scene = null | "scene1" | "scene2" | "scene3";

export default function IntroSequence() {
  const [active, setActive] = useState(false);
  const [scene, setScene] = useState<Scene>(null);
  const [showPost, setShowPost] = useState(false);
  const [whiteBg, setWhiteBg] = useState(false);
  const [taglineVisible, setTaglineVisible] = useState(false);
  const [videoHidden, setVideoHidden] = useState(false);

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
    // 200ms: transition to white
    addTimer(() => setWhiteBg(true), 200);
    // 500ms: tagline blur-in
    addTimer(() => setTaglineVisible(true), 500);
    // 2000ms: hard cut — unmount everything
    addTimer(() => finish(), 2000);
  }, [clearAllTimers, addTimer, finish]);

  // Init
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (sessionStorage.getItem(SESSION_KEY)) return;

    sessionStorage.setItem(SESSION_KEY, "1");
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
      if (t >= 0.3 && t < 3.2) {
        setScene("scene1");
      } else if (t >= 3.5 && t < 6.4) {
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

  // Tap/click anywhere → skip straight to homepage
  const handleSkip = useCallback(() => {
    if (active) finish();
  }, [active, finish]);

  if (!active) return null;

  return (
    <div
      className="intro-overlay"
      aria-hidden="true"
      role="presentation"
      onClick={handleSkip}
      onTouchEnd={handleSkip}
    >
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
            src="/videos/intro-video.mp4"
          />
          <div className="intro-vignette" />
          <div className="intro-grain" />

          {/* Text — hard cut visibility via scene state */}
          <div className="intro-text-layer">
            {scene === "scene1" && (
              <span className="intro-scene-text intro-scene-text--white">
                We Transform
              </span>
            )}
            {scene === "scene2" && (
              <span className="intro-scene-text intro-scene-text--white">
                Your Business
              </span>
            )}
            {scene === "scene3" && (
              <span className="intro-scene-text intro-scene-text--red">
                Online.
              </span>
            )}
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
