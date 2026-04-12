'use client'

import { useRef, useState, useCallback, useEffect } from 'react'

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  strength?: number
  radius?: number
}

export default function MagneticButton({
  children,
  className = '',
  strength = 10,
  radius = 100,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [enabled, setEnabled] = useState(true)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setEnabled(false)
    }
  }, [])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current || !enabled) return
      const rect = ref.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const distX = e.clientX - centerX
      const distY = e.clientY - centerY
      const dist = Math.sqrt(distX * distX + distY * distY)

      if (dist < radius) {
        const pull = (1 - dist / radius) * strength
        setOffset({
          x: dist > 0 ? (distX / dist) * pull : 0,
          y: dist > 0 ? (distY / dist) * pull : 0,
        })
      }
    },
    [radius, strength, enabled]
  )

  const handleMouseLeave = useCallback(() => {
    setOffset({ x: 0, y: 0 })
  }, [])

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        transition:
          offset.x === 0 && offset.y === 0
            ? 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
            : 'transform 0.15s ease-out',
        display: 'inline-block',
      }}
    >
      {children}
    </div>
  )
}
