'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { X, ArrowUp } from 'lucide-react'

const CONTROL_SIZE = 48 // px — shared height/width for pill + circle buttons

export default function StickyCTA() {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('stickyCTADismissed')) {
      setDismissed(true)
      return
    }
    const onScroll = () => {
      const threshold = window.innerWidth >= 768 ? window.innerHeight : window.innerHeight * 0.5
      setVisible(window.scrollY > threshold)
      setShowBackToTop(window.scrollY > 500)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const dismiss = () => {
    setDismissed(true)
    sessionStorage.setItem('stickyCTADismissed', 'true')
  }

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  if (dismissed) return null

  return (
    <>
      {/* Desktop: floating control group — CTA pill + back-to-top + dismiss, all same height, evenly spaced */}
      <div
        className="fixed bottom-6 right-6 z-50 hidden md:flex items-center gap-3 transition-all duration-500"
        style={{
          transform: visible ? 'translateY(0)' : 'translateY(100px)',
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? 'auto' : 'none',
        }}
      >
        <Link
          href="/free-audit"
          className="inline-flex items-center rounded-full bg-[#E71840] px-7 text-[16px] font-600 text-white transition-all hover:bg-[#C41535]"
          style={{
            height: CONTROL_SIZE,
            boxShadow: '0 4px 20px rgba(231,24,64,0.4)',
          }}
        >
          Get Your Free Audit &rarr;
        </Link>

        {showBackToTop && (
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="flex shrink-0 items-center justify-center rounded-full bg-white text-[#0A0A0A] transition-all hover:bg-[#0A0A0A] hover:text-white hover:ring-2 hover:ring-white"
            style={{
              height: CONTROL_SIZE,
              width: CONTROL_SIZE,
              boxShadow: '0 4px 20px rgba(0,0,0,0.35)',
            }}
          >
            <ArrowUp size={18} strokeWidth={2.5} />
          </button>
        )}

        <button
          onClick={dismiss}
          aria-label="Dismiss"
          className="flex shrink-0 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25"
          style={{
            height: CONTROL_SIZE,
            width: CONTROL_SIZE,
            backdropFilter: 'blur(8px)',
          }}
        >
          <X size={18} strokeWidth={2.5} />
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
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
      >
        <div className="flex items-center gap-3 px-4 py-3">
          <a
            href="tel:+14697593638"
            className="flex-1 inline-flex h-11 items-center justify-center rounded-full border border-white/20 text-[16px] font-600 text-white transition-colors hover:bg-white/10"
          >
            Call Now
          </a>
          <Link
            href="/free-audit"
            className="flex-1 inline-flex h-11 items-center justify-center rounded-full bg-[#E71840] text-[16px] font-600 text-white transition-colors hover:bg-[#C41535]"
          >
            Free Audit
          </Link>
          {showBackToTop && (
            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#0A0A0A]"
            >
              <ArrowUp size={18} strokeWidth={2.5} />
            </button>
          )}
        </div>
      </div>
    </>
  )
}
