'use client'

import { useEffect, useState } from 'react'

interface SplitTextProps {
  text: string
  className?: string
  charClassName?: string
  stagger?: number
  delay?: number
}

export default function SplitText({
  text,
  className = '',
  charClassName = '',
  stagger = 0.03,
  delay = 0,
}: SplitTextProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setReducedMotion(prefersReduced)
    if (prefersReduced) {
      setIsLoaded(true)
      return
    }
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <span className={className} aria-label={text}>
      {text.split('').map((char, i) => (
        <span key={i} className="inline-block overflow-hidden" aria-hidden="true">
          <span
            className={`inline-block ${charClassName}`}
            style={
              reducedMotion
                ? {}
                : {
                    transform: isLoaded ? 'translateY(0)' : 'translateY(100%)',
                    opacity: isLoaded ? 1 : 0,
                    transition: `transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay + i * stagger}s, opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay + i * stagger}s`,
                  }
            }
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        </span>
      ))}
    </span>
  )
}
