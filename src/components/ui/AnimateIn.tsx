"use client";

import { useRef, useEffect, useState, type ReactNode } from "react";

interface AnimateInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  duration?: number;
  once?: boolean;
  threshold?: number;
  as?: "div" | "span" | "section" | "p";
}

export default function AnimateIn({
  children,
  className = "",
  delay = 0,
  direction = "up",
  distance = 60,
  duration = 0.8,
  once = true,
  threshold = 0.15,
  as = "div",
}: AnimateInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once, threshold]);

  const translateMap = {
    up: `translateY(${distance}px)`,
    down: `translateY(-${distance}px)`,
    left: `translateX(${distance}px)`,
    right: `translateX(-${distance}px)`,
    none: "translate(0, 0)",
  };

  const style = {
    opacity: visible ? 1 : 0,
    transform: visible ? "translate(0, 0)" : translateMap[direction],
    transition: `opacity ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
    willChange: "opacity, transform" as const,
  };

  if (as === "span") {
    return (
      <span ref={ref as React.RefObject<HTMLSpanElement>} className={className} style={style}>
        {children}
      </span>
    );
  }

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
