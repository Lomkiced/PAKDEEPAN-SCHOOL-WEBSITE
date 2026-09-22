"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "../utils/cn"
import { MagnifyingGlass, List, X } from "@phosphor-icons/react"
import Image from "next/image"
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion"

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/programs", label: "Academics" },
  { href: "/admissions", label: "Admissions" },
  { href: "/campus-life", label: "News & Events" },
  { href: "/contact", label: "Contact" },
] as const

export function NavBar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)
  const pathname = usePathname()
  const { scrollY } = useScroll()

  // Track scroll position to toggle glassmorphic state
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20)
  })

  // Lock body scroll when mobile menu is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [isOpen])

  return (
    <>
      <motion.header
        initial={false}
        animate={{
          backgroundColor: scrolled ? "rgba(255,255,255,0.82)" : "rgba(255,255,255,0)",
          backdropFilter: scrolled ? "blur(20px) saturate(1.4)" : "blur(0px) saturate(1)",
          borderBottomColor: scrolled ? "rgba(226,232,240,0.7)" : "rgba(226,232,240,0)",
          boxShadow: scrolled ? "0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03)" : "0 0 0 rgba(0,0,0,0)",
        }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="fixed top-0 w-full z-50 border-b"
        style={{ WebkitBackdropFilter: scrolled ? "blur(20px) saturate(1.4)" : "blur(0px) saturate(1)" }}
      >
        <div className="flex justify-between items-center w-full px-5 md:px-10 lg:px-20 mx-auto h-16 max-w-[1440px]">
          
          {/* Brand */}
          <Link href="/" className="flex items-center gap-3 font-display-lg text-[20px] md:text-[22px] text-on-background tracking-tight leading-tight group">
            <Image 
              src="/images/pakdeepan-logo.png" 
              alt="Pakdeepan School Logo" 
              width={44} 
              height={44} 
              className="group-hover:scale-105 transition-transform duration-300 drop-shadow-sm"
              priority
            />
            <div className="flex flex-col leading-none">
              <span className="text-primary font-bold">Pakdeepan</span>
              <span className="text-[9px] tracking-[0.22em] font-label-caps text-outline uppercase">School</span>
            </div>
          </Link>
          
          {/* Nav Links (Desktop) — Pill-style active indicator */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-1.5">
            {NAV_LINKS.map(({ href, label }) => {
              const isActive = href === "/" ? pathname === "/" : (pathname === href || pathname.startsWith(href + "/"))
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "relative px-3.5 py-2 rounded-full text-[13px] font-semibold tracking-wide transition-all duration-300 active:scale-[0.97]",
                    isActive
                      ? "text-primary bg-primary/8"
                      : "text-on-surface-variant hover:text-primary hover:bg-slate-100/80"
                  )}
                >
                  {label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-active-pill"
                      className="absolute inset-0 rounded-full bg-primary/8 -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              )
            })}
          </nav>
          
          {/* Actions */}
          <div className="flex items-center gap-3">
            <button className="hidden lg:flex items-center justify-center w-9 h-9 rounded-full text-on-surface-variant hover:text-primary hover:bg-primary/8 transition-all duration-300 active:scale-[0.95]">
              <MagnifyingGlass size={18} weight="bold" />
            </button>
            
            {/* Language Switcher */}
            <div className="hidden md:flex items-center gap-0.5 text-[10px] font-bold tracking-wider bg-slate-100/70 rounded-full p-0.5">
              <button 
                onClick={() => { document.cookie = "NEXT_LOCALE=en; path=/; max-age=31536000"; window.location.reload(); }}
                className="px-2.5 py-1 rounded-full hover:bg-white hover:shadow-sm transition-all duration-200 text-on-surface-variant hover:text-primary"
              >
                EN
              </button>
              <button 
                onClick={() => { document.cookie = "NEXT_LOCALE=th; path=/; max-age=31536000"; window.location.reload(); }}
                className="px-2.5 py-1 rounded-full hover:bg-white hover:shadow-sm transition-all duration-200 text-on-surface-variant hover:text-primary"
              >
                TH
              </button>
            </div>

            <Link 
              href="/admissions" 
              className="hidden md:inline-flex items-center justify-center px-5 py-2 bg-primary text-white text-[13px] font-bold rounded-full hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-300"
            >
              Enroll Now
            </Link>

            <button 
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-full text-primary bg-primary/8 active:scale-[0.95] transition-transform" 
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle navigation menu"
            >
               {isOpen ? <X size={18} weight="bold" /> : <List size={18} weight="bold" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Full-Screen Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-2xl md:hidden"
            style={{ WebkitBackdropFilter: "blur(40px)" }}
          >
            <div className="flex flex-col justify-center items-center h-full gap-3 px-8">
              {NAV_LINKS.map(({ href, label }, idx) => {
                const isActive = href === "/" ? pathname === "/" : (pathname === href || pathname.startsWith(href + "/"))
                return (
                  <motion.div
                    key={href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ delay: idx * 0.06, duration: 0.3, ease: "easeOut" }}
                    className="w-full max-w-sm"
                  >
                    <Link
                      href={href}
                      className={cn(
                        "block w-full text-center py-3.5 px-6 rounded-2xl text-lg font-bold transition-all active:scale-[0.97]",
                        isActive 
                          ? "bg-primary/10 text-primary" 
                          : "text-[#1e3a8a] hover:bg-slate-50"
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      {label}
                    </Link>
                  </motion.div>
                )
              })}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: NAV_LINKS.length * 0.06, duration: 0.3 }}
                className="w-full max-w-sm mt-4 space-y-4"
              >
                <div className="h-px bg-slate-200/80" />
                <Link 
                  href="/admissions" 
                  className="block w-full bg-primary text-white text-center py-4 rounded-full font-bold text-lg shadow-lg shadow-primary/20 active:scale-[0.97] transition-transform" 
                  onClick={() => setIsOpen(false)}
                >
                  Enroll Now
                </Link>
                <div className="flex justify-center gap-6 pt-2">
                  <button 
                    onClick={() => { document.cookie = "NEXT_LOCALE=en; path=/; max-age=31536000"; window.location.reload(); }} 
                    className="text-sm font-bold text-on-surface-variant hover:text-primary transition-colors"
                  >
                    English
                  </button>
                  <span className="text-slate-300">|</span>
                  <button 
                    onClick={() => { document.cookie = "NEXT_LOCALE=th; path=/; max-age=31536000"; window.location.reload(); }} 
                    className="text-sm font-bold text-on-surface-variant hover:text-primary transition-colors"
                  >
                    ภาษาไทย
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
