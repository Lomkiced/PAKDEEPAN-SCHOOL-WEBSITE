"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "../utils/cn"
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

  // Track scroll position
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
          backgroundColor: scrolled && !isOpen ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0)",
          backdropFilter: scrolled && !isOpen ? "blur(20px) saturate(1.4)" : "blur(0px) saturate(1)",
          borderBottomColor: scrolled && !isOpen ? "rgba(226,232,240,0.5)" : "rgba(226,232,240,0)",
        }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className={cn("fixed top-0 w-full border-b transition-all duration-300", isOpen ? "z-[110]" : "z-50")}
        style={{ WebkitBackdropFilter: scrolled && !isOpen ? "blur(20px) saturate(1.4)" : "blur(0px) saturate(1)" }}
      >
        <div className="flex justify-between items-center w-full px-5 md:px-10 lg:px-20 mx-auto h-20 md:h-24 max-w-[1440px]">
          
          {/* Brand */}
          <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3 group relative z-[110]">
            <Image 
              src="/images/pakdeepan-logo.png" 
              alt="Pakdeepan School Logo" 
              width={48} 
              height={48} 
              className="group-hover:scale-105 transition-transform duration-500 drop-shadow-sm"
              priority
            />
            <div className="flex flex-col leading-none">
              <span className="font-display-lg font-extrabold text-[22px] text-[#1e3a8a] transition-colors duration-500">Pakdeepan</span>
            </div>
          </Link>
          
          {/* Actions */}
          <div className="flex items-center gap-6 relative z-[110]">
            
            <Link 
              href="/admissions" 
              onClick={() => setIsOpen(false)}
              className={cn(
                "hidden md:inline-flex items-center justify-center px-6 py-2.5 text-[14px] font-bold rounded-full transition-all duration-500 active:scale-[0.97]",
                "bg-[#1e3a8a] text-white hover:bg-primary hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-0.5"
              )}
            >
              Enroll Now
            </Link>

            {/* Menu Toggle (Magnetic/Architectural) */}
            <button 
              className="flex items-center gap-3 group transition-colors duration-500 text-[#1e3a8a] hover:text-primary"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle navigation menu"
            >
              <span className="font-bold text-[14px] uppercase tracking-widest hidden sm:block">
                {isOpen ? "Close" : "Menu"}
              </span>
              <div className="w-11 h-11 rounded-full flex flex-col items-center justify-center gap-[5px] bg-slate-100/80 group-hover:bg-slate-200/80 transition-colors shadow-sm">
                <span className={cn("w-5 h-[2px] rounded-full transition-all duration-300", isOpen ? "bg-current rotate-45 translate-y-[3.5px]" : "bg-current")} />
                <span className={cn("w-5 h-[2px] rounded-full transition-all duration-300", isOpen ? "bg-current -rotate-45 -translate-y-[3.5px]" : "bg-current")} />
              </div>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Z-Index Fix: Dark Backdrop Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sleek Right-Aligned Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%", opacity: 0.5 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0.5 }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed top-0 right-0 h-[100dvh] w-full max-w-[420px] z-[100] bg-white/95 backdrop-blur-2xl shadow-2xl border-l border-white flex flex-col"
          >
            {/* Sidebar Content Container */}
            <div className="flex flex-col h-full pt-32 px-10 pb-10 overflow-y-auto">
              
              {/* Navigation Links */}
              <div className="flex flex-col gap-6 w-full flex-grow">
                {NAV_LINKS.map(({ href, label }, idx) => {
                  const isActive = href === "/" ? pathname === "/" : (pathname === href || pathname.startsWith(href + "/"))
                  return (
                    <motion.div
                      key={href}
                      initial={{ x: 30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: 30, opacity: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 + idx * 0.05, ease: "easeOut" }}
                    >
                      <Link
                        href={href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "font-display-lg text-[32px] md:text-[36px] font-extrabold leading-[1.2] tracking-tight transition-all duration-300 block",
                          isActive ? "text-primary italic" : "text-[#1e3a8a] hover:text-primary hover:translate-x-2"
                        )}
                      >
                        {label}
                      </Link>
                    </motion.div>
                  )
                })}
              </div>
              
              {/* Bottom Info / Language Toggles */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="w-full flex justify-between items-end border-t border-slate-200 pt-8 mt-10"
              >
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-bold tracking-widest text-primary uppercase">Language</span>
                  <div className="flex gap-4">
                    <button onClick={() => { document.cookie = "NEXT_LOCALE=en; path=/; max-age=31536000"; window.location.reload(); }} className="text-[#1e3a8a] hover:text-primary font-bold text-sm transition-colors">
                      EN
                    </button>
                    <span className="text-slate-300">|</span>
                    <button onClick={() => { document.cookie = "NEXT_LOCALE=th; path=/; max-age=31536000"; window.location.reload(); }} className="text-[#1e3a8a] hover:text-primary font-bold text-sm transition-colors">
                      TH
                    </button>
                  </div>
                </div>
                
                <Link 
                  href="/admissions" 
                  onClick={() => setIsOpen(false)}
                  className="md:hidden px-8 py-3 bg-[#1e3a8a] text-white text-[13px] font-bold rounded-full shadow-lg shadow-primary/20"
                >
                  Enroll
                </Link>
              </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
