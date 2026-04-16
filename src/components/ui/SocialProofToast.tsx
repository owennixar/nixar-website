'use client'

import { useState, useEffect, useCallback } from 'react'
import { X } from 'lucide-react'

const MESSAGES = [
  { city: 'Plano, TX', action: 'just requested a free audit' },
  { city: 'Miami, FL', action: 'launched their new website' },
  { city: 'Frisco, TX', action: 'started a social media campaign' },
  { city: 'Sacramento, CA', action: 'signed up for AI SEO' },
  { city: 'Dallas, TX', action: 'started an SEO campaign' },
  { city: 'Bogotá, Colombia', action: 'just requested a free audit' },
  { city: 'McKinney, TX', action: 'launched their new website' },
  { city: 'College Station, TX', action: 'signed up for content marketing' },
  { city: 'São Paulo, Brazil', action: 'started a branding engagement' },
  { city: 'Fort Worth, TX', action: 'signed up for paid ads' },
  { city: 'Medellín, Colombia', action: 'booked a strategy call' },
  { city: 'Allen, TX', action: 'launched an AI agent' },
  { city: 'Rio de Janeiro, Brazil', action: 'started a website redesign' },
  { city: 'Cartagena, Colombia', action: 'just requested a free audit' },
  { city: 'Brasília, Brazil', action: 'signed up for AI automation' },
]

export default function SocialProofToast() {
  const [visible, setVisible] = useState(false)
  const [current, setCurrent] = useState(0)
  const [dismissed, setDismissed] = useState(false)

  const dismiss = useCallback(() => {
    setDismissed(true)
    setVisible(false)
    sessionStorage.setItem('toastDismissed', String(Date.now()))
  }, [])

  useEffect(() => {
    // Check if dismissed recently (30 min)
    const ts = sessionStorage.getItem('toastDismissed')
    if (ts && Date.now() - Number(ts) < 30 * 60 * 1000) {
      setDismissed(true)
      return
    }
    // Don't show on mobile
    if (window.innerWidth < 768) return

    // Start after 10 seconds
    const startTimer = setTimeout(() => {
      setVisible(true)
      // Hide after 4s
      setTimeout(() => setVisible(false), 4000)
    }, 10000)

    // Cycle every 2 minutes
    const interval = setInterval(() => {
      if (dismissed) return
      setCurrent((prev) => (prev + 1) % MESSAGES.length)
      setVisible(true)
      setTimeout(() => setVisible(false), 4000)
    }, 120000)

    return () => {
      clearTimeout(startTimer)
      clearInterval(interval)
    }
  }, [dismissed])

  if (dismissed) return null

  const msg = MESSAGES[current]

  return (
    <div
      className="fixed bottom-6 left-6 z-50 hidden md:block transition-all duration-500"
      style={{
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        maxWidth: 300,
      }}
    >
      <div
        className="rounded-xl p-4 backdrop-blur-xl"
        style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
      >
        <button
          onClick={dismiss}
          className="absolute top-2 right-2 text-white/75 hover:text-white/85 transition-colors"
          aria-label="Dismiss"
        >
          <X size={12} />
        </button>
        <div className="flex items-start gap-3">
          <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#E71840] animate-pulse" />
          <div>
            <p className="text-[16px] leading-relaxed">
              <span className="text-white/85">A business in </span>
              <span className="font-600 text-white">{msg.city}</span>
              <span className="text-white/85"> {msg.action}</span>
            </p>
            <p className="mt-1 text-[16px] text-white/75">Just now</p>
          </div>
        </div>
      </div>
    </div>
  )
}
