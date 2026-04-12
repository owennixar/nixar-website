'use client'

import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const pos = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })

  useEffect(() => {
    // Skip on touch devices or reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return

    setIsVisible(true)

    const handleMouseMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY }
    }

    const handleMouseOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      if (el.closest('a, button, [role="button"], input, textarea, select, label')) {
        setIsHovering(true)
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      if (el.closest('a, button, [role="button"], input, textarea, select, label')) {
        setIsHovering(false)
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseover', handleMouseOver, { passive: true })
    document.addEventListener('mouseout', handleMouseOut, { passive: true })

    let animId: number
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    function animate() {
      pos.current.x = lerp(pos.current.x, target.current.x, 0.15)
      pos.current.y = lerp(pos.current.y, target.current.y, 0.15)
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`
      }
      animId = requestAnimationFrame(animate)
    }
    animId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
      cancelAnimationFrame(animId)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-difference"
      style={{
        width: isHovering ? 40 : 8,
        height: isHovering ? 40 : 8,
        backgroundColor: isHovering ? 'rgba(231, 24, 64, 0.5)' : '#E71840',
        borderRadius: '50%',
        transition:
          'width 0.3s cubic-bezier(0.16, 1, 0.3, 1), height 0.3s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s',
        willChange: 'transform',
      }}
    />
  )
}
