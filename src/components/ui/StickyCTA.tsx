'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'

export default function StickyCTA() {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('stickyCTADismissed')) {
      setDismissed(true)
      return
    }
    const onScroll = () => {
      const threshold = window.innerWidth >= 768 ? window.innerHeight : window.innerHeight * 0.5
      setVisible(window.scrollY > threshold)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const dismiss = () => {
    setDismissed(true)
    sessionStorage.setItem('stickyCTADismissed', 'true')
  }

  if (dismissed) return null

  return (
    <>
      {/* Desktop: floating pill */}
      <div
        className="fixed bottom-6 right-6 z-50 hidden md:flex items-center gap-2 transition-all duration-500"
        style={{
          transform: visible ? 'translateY(0)' : 'translateY(100px)',
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? 'auto' : 'none',
        }}
      >
        <Link
          href="/free-audit"
          className="inline-flex items-center rounded-full bg-[#E71840] px-7 py-3.5 text-[14px] font-600 text-white transition-all hover:bg-[#C41535]"
          style={{ boxShadow: '0 4px 20px rgba(231,24,64,0.4)' }}
        >
          Get Your Free Audit &rarr;
        </Link>
        <button
          onClick={dismiss}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/50 transition-colors hover:bg-white/20 hover:text-white"
          aria-label="Dismiss"
        >
          <X size={14} />
        </button>
      </div>

      {/* Mobile: full-width bar */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden transition-all duration-500"
        style={{
          transform: visible ? 'translateY(0)' : 'translateY(100%)',
          opacity: visible ? 1 : 0,
          background: 'rgba(10,10,10,0.95)',
          backdropFilter: 'blur(10px)',
          borderTop: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <div className="flex items-center gap-3 px-4 py-3">
          <a
            href="tel:+14697593638"
            className="flex-1 inline-flex h-11 items-center justify-center rounded-full border border-white/20 text-[13px] font-600 text-white transition-colors hover:bg-white/10"
          >
            Call Now
          </a>
          <Link
            href="/free-audit"
            className="flex-1 inline-flex h-11 items-center justify-center rounded-full bg-[#E71840] text-[13px] font-600 text-white transition-colors hover:bg-[#C41535]"
          >
            Free Audit
          </Link>
        </div>
      </div>
    </>
  )
}
