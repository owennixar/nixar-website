"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const SYMBOLS = "!@#$%&*01{}<>?/\\|~^";
const TARGET = "Decoded.";

export default function DecodedText() {
  const [chars, setChars] = useState(() =>
    Array.from({ length: TARGET.length }, () =>
      SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
    )
  );
  const [resolved, setResolved] = useState(0);
  const [showCursor, setShowCursor] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [cursorDone, setCursorDone] = useState(false);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  /* ── trigger on scroll into view ────────────────────────────── */
  const reset = useCallback(() => {
    setResolved(0);
    setShowCursor(false);
    setCursorDone(false);
    setCursorVisible(true);
    setChars(
      Array.from({ length: TARGET.length }, () =>
        SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
      )
    );
    setStarted(true);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) reset();
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [reset]);

  /* ── scramble unresolved chars every 50ms ────────────────────── */
  useEffect(() => {
    if (!started || resolved >= TARGET.length) return;
    const id = setInterval(() => {
      setChars((prev) =>
        prev.map((ch, i) =>
          i < resolved
            ? TARGET[i]
            : SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
        )
      );
    }, 50);
    return () => clearInterval(id);
  }, [started, resolved]);

  /* ── resolve one character every 250ms ──────────────────────── */
  useEffect(() => {
    if (!started || resolved >= TARGET.length) return;
    const id = setTimeout(() => {
      setResolved((r) => r + 1);
    }, 250);
    return () => clearTimeout(id);
  }, [started, resolved]);

  /* ── cursor blink after decode completes ────────────────────── */
  useEffect(() => {
    if (resolved < TARGET.length) return;
    setShowCursor(true);
    let blinks = 0;
    const id = setInterval(() => {
      setCursorVisible((v) => !v);
      blinks++;
      if (blinks >= 6) {
        clearInterval(id);
        setCursorDone(true);
      }
    }, 400);
    return () => clearInterval(id);
  }, [resolved]);

  const display = chars
    .map((ch, i) => (i < resolved ? TARGET[i] : ch))
    .join("");

  return (
    <span ref={ref} className="relative inline">
      <span
        className={resolved >= TARGET.length ? "underline decoration-2 underline-offset-8" : ""}
        style={{ color: "#E71840" }}
      >
        {display}
      </span>
      {showCursor && !cursorDone && (
        <span
          style={{
            color: "#E71840",
            opacity: cursorVisible ? 1 : 0,
            transition: "opacity 0.1s",
          }}
        >
          |
        </span>
      )}
    </span>
  );
}
