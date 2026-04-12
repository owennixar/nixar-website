'use client'

import { useRef, useEffect, useState } from 'react'

export default function ParallaxImage({
  src,
  alt,
  speed = 0.3,
  className = '',
}: {
  src: string
  alt: string
  speed?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const handleScroll = () => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const scrollProgress = (windowHeight - rect.top) / (windowHeight + rect.height)
      setOffset((scrollProgress - 0.5) * speed * 200)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed])

  return (
    <div ref={ref} className={`overflow-hidden ${className}`} style={{ position: 'relative' }}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        style={{
          width: '100%',
          height: '120%',
          objectFit: 'cover',
          transform: `translateY(${offset}px)`,
          willChange: 'transform',
          position: 'absolute',
          top: '-10%',
          left: 0,
        }}
      />
    </div>
  )
}
