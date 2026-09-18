"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "../utils/cn"
import { MagnifyingGlass, List, X, FlowerLotus } from "@phosphor-icons/react"
import { motion, AnimatePresence } from "framer-motion"

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
  const pathname = usePathname()

  return (
    <header className="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-md shadow-sm border-b border-primary/10">
      <div className="flex justify-between items-center w-full px-5 md:px-10 lg:px-20 mx-auto h-20 max-w-[1440px]">
        
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 font-display-lg text-[20px] md:text-2xl text-on-background tracking-tight leading-tight group">
          <FlowerLotus weight="duotone" size={32} className="text-primary group-hover:rotate-12 transition-transform" />
          <div className="flex flex-col leading-none">
            <span className="text-primary font-bold">Pakdeepan</span>
            <span className="text-xs tracking-[0.2em] font-label-caps text-outline">SCHOOL</span>
          </div>
        </Link>
        
        {/* Nav Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 font-label-caps text-sm font-semibold">
          {NAV_LINKS.map(({ href, label }) => {
            const isActive = href === "/" ? pathname === "/" : (pathname === href || pathname.startsWith(href + "/"))
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "pb-1 transition-all duration-300 cursor-pointer active:scale-95",
                  isActive
                    ? "text-primary border-b-[3px] border-primary"
                    : "text-on-surface-variant hover:text-primary border-b-[3px] border-transparent"
                )}
              >
                {label}
              </Link>
            )
          })}
        </nav>
        
        {/* Actions */}
        <div className="flex items-center gap-4">
          <button className="hidden lg:flex items-center justify-center p-2 rounded-full bg-surface-variant text-on-surface hover:bg-primary-container hover:text-primary transition-all duration-300">
            <MagnifyingGlass size={20} weight="bold" />
          </button>
          
          {/* Language Switcher */}
          <div className="hidden md:flex items-center gap-1 font-label-caps text-[10px] bg-surface-container-lowest border border-outline-variant/30 rounded-full p-1">
            <button 
              onClick={() => { document.cookie = "NEXT_LOCALE=en; path=/; max-age=31536000"; window.location.reload(); }}
              className="px-2 py-1 rounded-full hover:bg-primary-container transition-colors"
            >
              EN
            </button>
            <span className="text-outline-variant">|</span>
            <button 
              onClick={() => { document.cookie = "NEXT_LOCALE=th; path=/; max-age=31536000"; window.location.reload(); }}
              className="px-2 py-1 rounded-full hover:bg-primary-container transition-colors"
            >
              TH
            </button>
          </div>

          <Link href="/admissions" className="hidden md:inline-flex items-center justify-center px-6 py-2.5 bg-primary text-on-primary font-label-caps text-sm font-bold rounded-full hover:shadow-md hover:-translate-y-0.5 transition-all active:scale-95">
            Enroll Now
          </Link>
          <button className="md:hidden text-primary p-2 bg-primary-container rounded-full" onClick={() => setIsOpen(!isOpen)}>
             {isOpen ? <X size={20} weight="bold" /> : <List size={20} weight="bold" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t border-primary/10 bg-surface overflow-hidden"
          >
            <div className="flex flex-col px-5 py-6 gap-4 font-label-caps font-bold">
              {NAV_LINKS.map(({ href, label }) => {
                const isActive = href === "/" ? pathname === "/" : (pathname === href || pathname.startsWith(href + "/"))
                return (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      "py-2 px-4 rounded-xl transition-colors",
                      isActive ? "bg-primary-container text-primary" : "text-on-surface-variant hover:bg-surface-variant"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {label}
                  </Link>
                )
              })}
              <div className="h-px bg-primary/10 my-2" />
              <Link href="/admissions" className="bg-primary text-on-primary text-center px-6 py-3 rounded-full shadow-sm mt-2 font-bold" onClick={() => setIsOpen(false)}>
                Enroll Now
              </Link>
              <div className="flex justify-center gap-4 mt-4">
                <button onClick={() => { document.cookie = "NEXT_LOCALE=en; path=/; max-age=31536000"; window.location.reload(); }} className="text-sm">English</button>
                <span className="text-outline-variant">|</span>
                <button onClick={() => { document.cookie = "NEXT_LOCALE=th; path=/; max-age=31536000"; window.location.reload(); }} className="text-sm">ภาษาไทย</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
