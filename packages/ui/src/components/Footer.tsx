"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Heart, MapPin, Phone, Envelope, FacebookLogo, InstagramLogo, YoutubeLogo, LinkedinLogo } from "@phosphor-icons/react"

const LINKS = [
  { href: "/about", label: "About" },
  { href: "/programs", label: "Academics" },
  { href: "/admissions", label: "Admissions" },
  { href: "/campus-life", label: "News & Events" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
]

const SOCIALS = [
  { icon: FacebookLogo, href: "#", label: "Facebook" },
  { icon: InstagramLogo, href: "#", label: "Instagram" },
  { icon: YoutubeLogo, href: "#", label: "YouTube" },
  { icon: LinkedinLogo, href: "#", label: "LinkedIn" },
]

export function Footer() {
  return (
    <footer className="w-full bg-[#0f1d3a] text-white mt-auto">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-20 py-10 md:py-12">

        {/* Single Row: Brand | Links | Contact | Socials */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 items-start">

          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-3 group">
              <Image 
                src="/images/pakdeepan-logo.png" 
                alt="Pakdeepan School Logo" 
                width={48} 
                height={48} 
                className="group-hover:scale-105 transition-transform duration-300 drop-shadow-md"
              />
              <div className="flex flex-col leading-none">
                <span className="text-primary font-bold text-base font-display-lg">Pakdeepan</span>
                <span className="text-[8px] tracking-[0.2em] font-label-caps text-white/40 uppercase">School</span>
              </div>
            </Link>
            <p className="font-sherlina text-lg text-primary/70 leading-tight transform rotate-[-2deg] inline-block">
              Together We Grow
              <Heart size={12} weight="fill" className="inline-block ml-1 text-primary/50 align-middle" />
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-[10px] uppercase tracking-widest text-white/30 mb-3">Quick Links</h4>
            <div className="grid grid-cols-2 gap-x-6 gap-y-1.5">
              {LINKS.map(({ href, label }) => (
                <Link key={label} href={href} className="text-[13px] text-white/50 hover:text-white transition-colors">
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-[10px] uppercase tracking-widest text-white/30 mb-3">Contact</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MapPin size={13} weight="fill" className="text-primary/70 shrink-0" />
                <span className="text-[13px] text-white/50">Chanthaburi, Thailand</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={13} weight="fill" className="text-primary/70 shrink-0" />
                <a href="tel:+66391234567" className="text-[13px] text-white/50 hover:text-white transition-colors">+66 39 123 4567</a>
              </div>
              <div className="flex items-center gap-2">
                <Envelope size={13} weight="fill" className="text-primary/70 shrink-0" />
                <a href="mailto:admissions@pakdeepan.ac.th" className="text-[13px] text-white/50 hover:text-white transition-colors">admissions@pakdeepan.ac.th</a>
              </div>
            </div>
          </div>

          {/* Socials */}
          <div className="flex flex-col items-start lg:items-end">
            <h4 className="font-bold text-[10px] uppercase tracking-widest text-white/30 mb-3">Follow Us</h4>
            <div className="flex items-center gap-1.5">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/6 flex items-center justify-center text-white/35 hover:text-primary hover:bg-primary/12 transition-all duration-200 active:scale-[0.95]"
                >
                  <Icon size={16} weight="fill" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="h-px bg-white/8 mt-8 mb-5" />
        <p className="text-[11px] text-white/25 text-center">
          &copy; {new Date().getFullYear()} Pakdeepan Kindergarten School. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
