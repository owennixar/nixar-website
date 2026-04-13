'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function ScrollProgressBar() {
  const [progress, setProgress] = useState(0)
  const pathname = usePathname()

  // Only show on blog posts and service detail pages
  const shouldShow = pathname.startsWith('/blog/') || (pathname.startsWith('/services/') && pathname !== '/services')

  useEffect(() => {
    if (!shouldShow) return
    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [shouldShow])

  if (!shouldShow) return null

  return (
    <div
      className="fixed top-0 left-0 z-[60] h-[3px] bg-[#E71840] transition-[width] duration-75"
      style={{ width: `${progress}%`, willChange: 'width' }}
    />
  )
}
