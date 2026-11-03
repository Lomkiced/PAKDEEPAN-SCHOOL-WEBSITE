"use client"

import * as React from "react"
import { usePathname, useSearchParams } from "next/navigation"

export function NavigationLoader() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isNavigating, setIsNavigating] = React.useState(false)

  // Turn off loader immediately when pathname or search parameters change
  React.useEffect(() => {
    setIsNavigating(false)
  }, [pathname, searchParams])

  // Click & popstate listener for instantaneous transition feedback
  React.useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const handleClick = (e: MouseEvent) => {
      // Ignore non-primary clicks or modifier keys (opening in new tab/window)
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      if (e.defaultPrevented) return

      const target = e.target as HTMLElement | null
      const anchor = target?.closest("a")
      if (!anchor) return

      const href = anchor.getAttribute("href")
      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("javascript:")
      ) {
        return
      }

      if (anchor.target === "_blank" || anchor.hasAttribute("download")) return

      try {
        const destUrl = new URL(anchor.href, window.location.href)
        const currentUrl = new URL(window.location.href)

        // Only trigger for same origin, different path or query
        if (destUrl.origin === currentUrl.origin) {
          if (destUrl.pathname !== currentUrl.pathname || destUrl.search !== currentUrl.search) {
            setIsNavigating(true)
            // Safety timeout (8 seconds) to prevent permanent loader if navigation is canceled
            clearTimeout(timeoutId)
            timeoutId = setTimeout(() => setIsNavigating(false), 8000)
          }
        }
      } catch {
        // Ignore parsing errors
      }
    }

    const handlePopState = () => {
      setIsNavigating(true)
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => setIsNavigating(false), 8000)
    }

    document.addEventListener("click", handleClick, { capture: true })
    window.addEventListener("popstate", handlePopState)

    return () => {
      document.removeEventListener("click", handleClick, { capture: true })
      window.removeEventListener("popstate", handlePopState)
      clearTimeout(timeoutId)
    }
  }, [])

  if (!isNavigating) return null

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-[9999] pointer-events-none transition-opacity duration-200"
    >
      {/* 1. Sleek 4px Top Animated Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-[10000] overflow-hidden bg-slate-200/40">
        <div className="h-full w-full bg-gradient-to-r from-blue-600 via-pink-300 to-blue-500 animate-[shimmer_1.4s_infinite] bg-[length:200%_100%] shadow-[0_0_12px_rgba(244,114,182,0.8)]" />
      </div>

      {/* 2. Frosted Floating Glass Card with Blue & Light Pink Orbital Spinner */}
      <div className="fixed bottom-6 right-6 z-[10000] pointer-events-auto flex items-center gap-3.5 px-5 py-3.5 rounded-2xl bg-white/90 backdrop-blur-xl border border-white/80 shadow-2xl shadow-blue-900/15 animate-in fade-in slide-in-from-bottom-3 duration-200">
        {/* Dual Orbital Royal Blue & Light Pink Spinner */}
        <div className="relative w-7 h-7 flex-shrink-0 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-blue-600 border-r-blue-500 animate-spin" />
          <div className="absolute inset-0.5 rounded-full border-2 border-transparent border-b-pink-400 border-l-pink-300 animate-[spin_1s_linear_infinite_reverse]" />
          <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-tr from-blue-600 to-pink-400 shadow-xs" />
        </div>

        {/* Bilingual Status Typography */}
        <div className="flex flex-col text-left">
          <span className="text-xs font-bold text-slate-800 leading-tight">
            กำลังเปลี่ยนหน้า...
          </span>
          <span className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase">
            Loading page...
          </span>
        </div>
      </div>
    </div>
  )
}

