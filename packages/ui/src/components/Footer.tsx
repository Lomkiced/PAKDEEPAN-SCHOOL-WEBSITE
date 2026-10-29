"use client"

import * as React from "react"
import Link from "next/link"

const DEFAULT_LINKS_EN = [
  { href: "/about", label: "About" },
  { href: "/programs", label: "Academics" },
  { href: "/admissions", label: "Admissions" },
  { href: "/campus-life", label: "News & Events" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
]

const DEFAULT_LINKS_TH = [
  { href: "/about", label: "เกี่ยวกับเรา" },
  { href: "/programs", label: "หลักสูตร" },
  { href: "/admissions", label: "การรับสมัคร" },
  { href: "/campus-life", label: "ข่าวสารและกิจกรรม" },
  { href: "/contact", label: "ติดต่อเรา" },
  { href: "/privacy", label: "นโยบายความเป็นส่วนตัว" },
]

export interface FooterProps {
  currentLocale?: "en" | "th"
  tagline?: string
  philosophy?: string
  email?: string
  phone?: string
  location?: string
  copyrightName?: string
  facebookUrl?: string
  instagramUrl?: string
  linkedinUrl?: string
  youtubeUrl?: string
  links?: { href: string; label: string }[]
  logoUrl?: string
}

export function Footer({
  currentLocale = "en",
  tagline,
  philosophy,
  email = "admissions@pakdeepan.ac.th",
  phone = "+66 39 123 4567",
  location,
  copyrightName,
  facebookUrl = "https://facebook.com/pakdeepanschool",
  instagramUrl = "https://instagram.com/pakdeepanschool",
  links,
  logoUrl,
}: FooterProps = {}) {
  const isTh = currentLocale === "th"

  const resolvedTagline =
    tagline || (isTh ? "ก้าวเล็กๆ ในวันนี้\nสู่อนาคตที่ยิ่งใหญ่ในวันพรุ่งนี้" : "Small steps today,\nbig dreams tomorrow.")
  const resolvedPhilosophy =
    philosophy ||
    (isTh
      ? "บ่มเพาะรากฐานแห่งความอยากรู้อยากเห็น ความเห็นอกเห็นใจ และความเป็นเลิศทางวิชาการในบรรยากาศนานาชาติอันอบอุ่น"
      : "Cultivating a foundation of curiosity, empathy, and academic rigor in a warm, international setting.")
  const resolvedCopyrightName =
    copyrightName || (isTh ? "โรงเรียนอนุบาลภักดีพรรณ" : "Pakdeepan Kindergarten School")
  const resolvedLocation = location || (isTh ? "จันทบุรี, ประเทศไทย" : "Chanthaburi, Thailand")
  const resolvedLinks = links || (isTh ? DEFAULT_LINKS_TH : DEFAULT_LINKS_EN)

  // Format tagline to render highlighted line
  const taglineLines = resolvedTagline.split("\n")
  const firstLine = taglineLines[0]
  const secondLine = taglineLines.slice(1).join(" ")

  return (
    <footer className="w-full bg-[#1e3a8a] text-white pt-16 md:pt-20 rounded-t-[2rem] md:rounded-t-[3rem] mt-auto relative overflow-hidden flex flex-col justify-between">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-20 relative z-10 w-full flex-grow">
        
        {/* Top: Utility Grid (Typographic & Architectural) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16 md:mb-20">
          
          {/* Brand Philosophy */}
          <div className="lg:col-span-5 pr-4 md:pr-10">
            {logoUrl && (
              <div className="mb-6">
                <img 
                  src={logoUrl} 
                  alt={resolvedCopyrightName} 
                  className="h-10 w-auto object-contain brightness-0 invert opacity-90" 
                />
              </div>
            )}
            <h3 className="font-display-lg text-[28px] md:text-[36px] font-extrabold mb-6 leading-[1.15]">
              {firstLine}
              {secondLine && (
                <>
                  <br />
                  <span className="text-primary">{secondLine}</span>
                </>
              )}
            </h3>
            <p className="font-body-md text-white/60 max-w-sm text-base md:text-lg leading-relaxed">
              {resolvedPhilosophy}
            </p>
          </div>

          {/* Links */}
          <div className="lg:col-span-3">
            <h4 className="font-bold text-[11px] uppercase tracking-[0.2em] text-white/30 mb-6">
              {isTh ? "สำรวจ" : "Explore"}
            </h4>
            <div className="flex flex-col gap-4">
              {resolvedLinks.map(({ href, label }) => (
                <Link key={label} href={href} className="text-white/70 hover:text-primary hover:translate-x-1 transition-all duration-300 font-bold text-sm md:text-base w-fit">
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4">
            <h4 className="font-bold text-[11px] uppercase tracking-[0.2em] text-white/30 mb-6">
              {isTh ? "ติดต่อเรา" : "Get in Touch"}
            </h4>
            <div className="flex flex-col gap-4">
              {email && (
                <a href={`mailto:${email}`} className="text-white/70 hover:text-white transition-colors font-medium text-sm md:text-base">
                  {email}
                </a>
              )}
              {phone && (
                <a href={`tel:${phone.replace(/\s+/g, "")}`} className="text-white/70 hover:text-white transition-colors font-medium text-sm md:text-base">
                  {phone}
                </a>
              )}
              {resolvedLocation && (
                <p className="text-white/40 font-medium text-sm md:text-base mt-2">
                  {resolvedLocation}
                </p>
              )}
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="flex flex-col md:flex-row justify-between items-center py-6 border-t border-white/10 text-[12px] text-white/40 font-medium tracking-wide">
          <p>
            &copy; {new Date().getFullYear()} {resolvedCopyrightName}. {isTh ? "สงวนลิขสิทธิ์ทั้งหมด" : "All rights reserved."}
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            {facebookUrl && (
              <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                Facebook
              </a>
            )}
            {instagramUrl && (
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                Instagram
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
