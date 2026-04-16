'use client'

import { useState, useEffect, useCallback } from 'react'
import { Accessibility, X, Plus, Minus, Contrast, Type, Pause, RotateCcw } from 'lucide-react'

const STORAGE_KEY = 'nixar-ada-prefs'
const MIN_SCALE = 1
const MAX_SCALE = 1.5
const STEP = 0.1

type Prefs = {
  fontScale: number
  highContrast: boolean
  underlineLinks: boolean
  reduceMotion: boolean
}

const DEFAULT: Prefs = {
  fontScale: 1,
  highContrast: false,
  underlineLinks: false,
  reduceMotion: false,
}

function applyPrefs(prefs: Prefs) {
  const root = document.documentElement
  // Only override the root font-size when the user has actively scaled up.
  // Otherwise leave it alone so the browser's own default (and any user-level
  // zoom/font-size preference) is preserved.
  if (prefs.fontScale === 1) {
    root.style.removeProperty('font-size')
  } else {
    root.style.fontSize = `${prefs.fontScale * 100}%`
  }
  root.classList.toggle('ada-high-contrast', prefs.highContrast)
  root.classList.toggle('ada-underline-links', prefs.underlineLinks)
  root.classList.toggle('ada-reduce-motion', prefs.reduceMotion)
}

export default function AdaWidget() {
  const [open, setOpen] = useState(false)
  const [prefs, setPrefs] = useState<Prefs>(DEFAULT)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = { ...DEFAULT, ...JSON.parse(saved) } as Prefs
        setPrefs(parsed)
        applyPrefs(parsed)
      }
    } catch {
      /* ignore */
    }
  }, [])

  const update = useCallback((next: Partial<Prefs>) => {
    setPrefs((prev) => {
      const merged = { ...prev, ...next }
      applyPrefs(merged)
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(merged))
      } catch {
        /* ignore */
      }
      return merged
    })
  }, [])

  const reset = useCallback(() => {
    applyPrefs(DEFAULT)
    setPrefs(DEFAULT)
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      /* ignore */
    }
  }, [])

  if (!mounted) return null

  return (
    <>
      {/* Launcher button — fixed bottom-left, shifts up when social proof toast is visible */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close accessibility menu' : 'Open accessibility menu'}
        aria-expanded={open}
        aria-controls="ada-panel"
        className="ada-launcher fixed left-6 z-[60] flex h-12 w-12 items-center justify-center rounded-full bg-[#0057B8] text-white shadow-[0_4px_20px_rgba(0,87,184,0.4)] transition-[bottom,transform] duration-300 hover:scale-110 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40"
      >
        <Accessibility size={22} strokeWidth={2.25} />
      </button>

      {/* Panel */}
      {open && (
        <div
          id="ada-panel"
          role="dialog"
          aria-label="Accessibility options"
          className="ada-panel fixed left-6 z-[60] w-[320px] rounded-2xl bg-[#0A0A0A] text-white shadow-[0_20px_60px_rgba(0,0,0,0.6)] ring-1 ring-white/10 transition-[bottom] duration-300"
        >
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
            <div className="flex items-center gap-2">
              <Accessibility size={18} className="text-[#0057B8]" />
              <h2 className="font-[family-name:var(--font-oswald)] text-[1.1rem] font-700 uppercase tracking-wide">
                Accessibility
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close accessibility menu"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <X size={16} />
            </button>
          </div>

          <div className="space-y-4 px-5 py-5">
            {/* Font size */}
            <div>
              <p className="mb-2 flex items-center gap-2 text-[1rem] font-600 text-white">
                <Type size={16} />
                Text Size — {Math.round(prefs.fontScale * 100)}%
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => update({ fontScale: Math.max(MIN_SCALE, prefs.fontScale - STEP) })}
                  disabled={prefs.fontScale <= MIN_SCALE}
                  aria-label="Decrease text size"
                  className="flex h-10 flex-1 items-center justify-center rounded-lg bg-white/10 text-white transition-colors hover:bg-white/20 disabled:opacity-40"
                >
                  <Minus size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => update({ fontScale: Math.min(MAX_SCALE, prefs.fontScale + STEP) })}
                  disabled={prefs.fontScale >= MAX_SCALE}
                  aria-label="Increase text size"
                  className="flex h-10 flex-1 items-center justify-center rounded-lg bg-white/10 text-white transition-colors hover:bg-white/20 disabled:opacity-40"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <Toggle
              icon={<Contrast size={16} />}
              label="High Contrast"
              checked={prefs.highContrast}
              onChange={(v) => update({ highContrast: v })}
            />
            <Toggle
              icon={<Type size={16} />}
              label="Underline Links"
              checked={prefs.underlineLinks}
              onChange={(v) => update({ underlineLinks: v })}
            />
            <Toggle
              icon={<Pause size={16} />}
              label="Reduce Motion"
              checked={prefs.reduceMotion}
              onChange={(v) => update({ reduceMotion: v })}
            />

            <button
              type="button"
              onClick={reset}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/15 py-2.5 text-[1rem] font-600 text-white transition-colors hover:bg-white/5"
            >
              <RotateCcw size={14} />
              Reset to Defaults
            </button>
          </div>
        </div>
      )}
    </>
  )
}

function Toggle({
  icon,
  label,
  checked,
  onChange,
}: {
  icon: React.ReactNode
  label: string
  checked: boolean
  onChange: (value: boolean) => void
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex w-full items-center justify-between rounded-lg bg-white/5 px-4 py-3 text-left transition-colors hover:bg-white/10"
    >
      <span className="flex items-center gap-2 text-[1rem] font-600 text-white">
        {icon}
        {label}
      </span>
      <span
        className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
          checked ? 'bg-[#0057B8]' : 'bg-white/20'
        }`}
      >
        <span
          className={`inline-block h-5 w-5 rounded-full bg-white transition-transform ${
            checked ? 'translate-x-[22px]' : 'translate-x-0.5'
          }`}
        />
      </span>
    </button>
  )
}
