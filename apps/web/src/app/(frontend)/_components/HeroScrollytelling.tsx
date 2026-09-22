"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Heart } from "@phosphor-icons/react"

export function HeroScrollytelling() {
  return (
    <div className="relative w-full overflow-hidden bg-white min-h-[calc(100vh-5rem)] sm:min-h-[600px] lg:min-h-[700px] flex items-center pt-10 pb-20 lg:pt-0 lg:pb-32">

      {/* Soft Ambient Background Glows (Moved to left side only to avoid video edge clipping) */}
      <div className="absolute top-0 left-0 w-full lg:w-1/2 h-full pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[80%] h-[80%] bg-[#e0f2fe]/40 rounded-full filter blur-[120px]" />
      </div>

      {/* --- RIGHT HALF: SEAMLESS FEATHERED VIDEO BACKGROUND --- */}
      <div className="absolute inset-0 lg:left-auto lg:right-0 w-full lg:w-[55%] h-full z-0 pointer-events-none flex justify-center items-center opacity-30 lg:opacity-100">
        {/* CSS Mask creates a soft, feathered vignette around the video, eliminating all hard box borders */}
        <div
          className="w-full h-full max-w-[900px] flex items-center justify-center transform -translate-y-10 lg:-translate-y-20"
          style={{
            maskImage: 'radial-gradient(circle at center, black 50%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(circle at center, black 50%, transparent 70%)'
          }}
        >
          <video
            src="/videos/logo-animation.mp4"
            playsInline
            muted
            autoPlay
            loop
            className="w-full h-[150%] object-contain scale-125 lg:scale-[1.35]"
          />
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-20 relative z-10 w-full">

        {/* --- LEFT HALF: NARRATIVE TEXT --- */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl flex flex-col justify-center relative z-20"
        >

          {/* Signature Sherlina Script Tagline */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-4 font-sherlina text-2xl sm:text-3xl lg:text-4xl text-secondary leading-normal drop-shadow-sm">
            <span className="font-bold">Learn</span>
            <Heart size={20} weight="fill" className="text-primary" />
            <span className="font-bold">Grow</span>
            <Heart size={20} weight="fill" className="text-primary" />
            <span className="font-bold">Build Your Future</span>
          </div>

          <h1 className="font-display-lg text-[42px] sm:text-[52px] md:text-[60px] lg:text-[72px] leading-[1.05] text-[#1e3a8a] mb-6 tracking-tight font-extrabold drop-shadow-sm">
            Welcome to <br />
            <span className="text-primary">Pakdeepan</span> School
          </h1>

          <p className="font-body-lg text-[16px] sm:text-[18px] lg:text-[20px] text-on-surface-variant mb-10 opacity-95 max-w-lg leading-relaxed">
            Every great journey begins by opening a book. We cultivate joyful curiosity, strong bilingual foundations, and creative inquiry in every young child.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/about"
              className="flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-white font-bold text-sm hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-1 transition-all active:scale-95"
            >
              Discover Our School <ArrowRight size={18} weight="bold" />
            </Link>

            <Link
              href="/admissions"
              className="flex items-center gap-2 px-8 py-4 rounded-full bg-white text-[#1e3a8a] font-bold text-sm border border-slate-200 hover:border-primary/40 hover:shadow-md hover:-translate-y-1 transition-all active:scale-95"
            >
              Admissions
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
