"use client"

import * as React from "react"
import Link from "next/link"

const LINKS = [
  { href: "/about", label: "About" },
  { href: "/programs", label: "Academics" },
  { href: "/admissions", label: "Admissions" },
  { href: "/campus-life", label: "News & Events" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
]

export function Footer() {
  return (
    <footer className="w-full bg-[#1e3a8a] text-white pt-16 md:pt-20 rounded-t-[2rem] md:rounded-t-[3rem] mt-auto relative overflow-hidden flex flex-col justify-between">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-20 relative z-10 w-full flex-grow">
        
        {/* Top: Utility Grid (No generic icons, purely typographic) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16 md:mb-20">
          
          {/* Brand Philosophy */}
          <div className="lg:col-span-5 pr-4 md:pr-10">
            <h3 className="font-display-lg text-[28px] md:text-[36px] font-extrabold mb-6 leading-[1.15]">
              Small steps today,<br/>
              <span className="text-primary">big dreams tomorrow.</span>
            </h3>
            <p className="font-body-md text-white/60 max-w-sm text-base md:text-lg leading-relaxed">
              Cultivating a foundation of curiosity, empathy, and academic rigor in a warm, international setting.
            </p>
          </div>

          {/* Links */}
          <div className="lg:col-span-3">
            <h4 className="font-bold text-[11px] uppercase tracking-[0.2em] text-white/30 mb-6">Explore</h4>
            <div className="flex flex-col gap-4">
              {LINKS.map(({ href, label }) => (
                <Link key={label} href={href} className="text-white/70 hover:text-primary hover:translate-x-1 transition-all duration-300 font-bold text-sm md:text-base w-fit">
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4">
            <h4 className="font-bold text-[11px] uppercase tracking-[0.2em] text-white/30 mb-6">Get in Touch</h4>
            <div className="flex flex-col gap-4">
              <a href="mailto:admissions@pakdeepan.ac.th" className="text-white/70 hover:text-white transition-colors font-medium text-sm md:text-base">
                admissions@pakdeepan.ac.th
              </a>
              <a href="tel:+66391234567" className="text-white/70 hover:text-white transition-colors font-medium text-sm md:text-base">
                +66 39 123 4567
              </a>
              <p className="text-white/40 font-medium text-sm md:text-base mt-2">
                Chanthaburi, Thailand
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="flex flex-col md:flex-row justify-between items-center py-6 border-t border-white/10 text-[12px] text-white/40 font-medium tracking-wide">
          <p>&copy; {new Date().getFullYear()} Pakdeepan Kindergarten School. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Facebook</a>
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
