'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'

export default function ExitIntentPopup() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.innerWidth < 768) return
    if (sessionStorage.getItem('exitPopupShown')) return

    let timeout: ReturnType<typeof setTimeout>

    // Only activate after 10 seconds
    timeout = setTimeout(() => {
      const handleMouseLeave = (e: MouseEvent) => {
        if (e.clientY < 10) {
          setShow(true)
          sessionStorage.setItem('exitPopupShown', 'true')
          document.removeEventListener('mouseleave', handleMouseLeave)
        }
      }
      document.addEventListener('mouseleave', handleMouseLeave)
    }, 10000)

    return () => clearTimeout(timeout)
  }, [])

  if (!show) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.7)' }}
      onClick={() => setShow(false)}
    >
      <div
        className="relative w-full max-w-md rounded-2xl p-10 text-center animate-in"
        style={{
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.1)',
          backdropFilter: 'blur(40px)',
          animation: 'popupIn 0.3s ease-out',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setShow(false)}
          className="absolute top-4 right-4 text-white/75 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <h2 className="font-[family-name:var(--font-oswald)] text-[clamp(1.5rem,4vw,2rem)] font-700 uppercase leading-tight">
          <span className="text-white/85">Wait &mdash; </span>
          <span className="text-white">don&apos;t leave without your </span>
          <span className="text-[#E71840]">free audit.</span>
        </h2>

        <p className="mt-4 text-[16px] text-white/85">
          Discover exactly what&apos;s holding your business back online. Takes 30 seconds.
        </p>

        <Link
          href="/free-audit"
          className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-full bg-[#E71840] text-[16px] font-600 text-white transition-all hover:bg-[#C41535]"
          onClick={() => setShow(false)}
        >
          Get My Free Audit
        </Link>

        <button
          onClick={() => setShow(false)}
          className="mt-4 block w-full text-[16px] text-white/75 transition-colors hover:text-white/85"
        >
          No thanks, I&apos;ll figure it out myself
        </button>
      </div>

      <style jsx>{`
        @keyframes popupIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  )
}
