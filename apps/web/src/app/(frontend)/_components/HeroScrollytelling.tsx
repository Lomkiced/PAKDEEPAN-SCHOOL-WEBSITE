"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "@phosphor-icons/react"

export function HeroScrollytelling() {
  return (
    <div className="relative w-full overflow-hidden bg-white min-h-[calc(100vh-5rem)] flex items-center py-10 md:py-16">

      {/* --- HALF-HALF BACKGROUND VIDEO (PAKDEEPAN LOGO EMBLEM ANIMATION) --- */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex justify-end">
        {/* On mobile/tablet, the video acts as an elegant ambient watermark behind the text;
            On desktop (lg+), it commands the right half with 100% clarity and zero clipping. */}
        <div 
          className="relative w-full lg:w-[52%] xl:w-[50%] h-full flex items-center justify-center opacity-25 sm:opacity-35 lg:opacity-100 transition-opacity duration-700 mix-blend-multiply"
          style={{
            // Feathered left edge to blend seamlessly into the white text half without visible bounding box
            maskImage: 'linear-gradient(to right, transparent 0%, black 20%, black 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 20%, black 100%)'
          }}
        >
          <video 
            playsInline 
            muted 
            autoPlay 
            loop 
            preload="auto"
            poster="/videos/pakdeepan-logo-poster.webp"
            className="w-full max-w-[840px] xl:max-w-[920px] max-h-[82vh] object-contain scale-[1.0] lg:scale-[1.12] xl:scale-[1.18] brightness-[1.02] contrast-[1.05] will-change-transform"
            aria-label="Pakdeepan School Animated Logo Emblem"
          >
            <source src="/videos/pakdeepan-logo.webm" type="video/webm" />
            <source src="/videos/pakdeepan-logo.mp4" type="video/mp4" />
          </video>
        </div>
      </div>

      {/* Ambient Glows to enhance the premium feel */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-[400px] h-[400px] bg-[#38bdf8]/10 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-20 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center w-full">
          
          {/* --- LEFT HALF: NARRATIVE TEXT --- */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-start relative z-20 w-full"
          >
            
            {/* Signature Sherlina Script Tagline */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4 font-sherlina text-[20px] sm:text-[24px] lg:text-[32px] text-secondary leading-normal drop-shadow-sm">
              <span className="font-bold">Learn</span>
              <span className="text-primary/60 text-lg">·</span>
              <span className="font-bold">Grow</span>
              <span className="text-primary/60 text-lg">·</span>
              <span className="font-bold">Build Your Future</span>
            </div>
            
            <h1 className="font-display-lg text-[40px] sm:text-[56px] lg:text-[76px] leading-[1.05] text-[#1e3a8a] mb-6 tracking-tight font-extrabold drop-shadow-sm">
              Welcome to <br />
              <span className="text-primary relative inline-block">
                Pakdeepan 
                {/* Subtle underline flourish */}
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-primary/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </span><br/> School
            </h1>
            
            <p className="font-body-lg text-[16px] sm:text-[18px] lg:text-[20px] text-on-surface-variant mb-8 max-w-xl leading-relaxed font-medium">
              Every great journey begins by opening a book. We cultivate joyful curiosity, strong bilingual foundations, and creative inquiry in every young child.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Link 
                href="/about" 
                className="flex items-center justify-center gap-2 px-8 py-3.5 w-full sm:w-auto rounded-full bg-primary text-white font-bold text-[15px] hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-1 transition-all active:scale-95"
              >
                Discover Our School <ArrowRight size={18} weight="bold" />
              </Link>
              
              <Link 
                href="/admissions" 
                className="flex items-center justify-center gap-2 px-8 py-3.5 w-full sm:w-auto rounded-full bg-white text-[#1e3a8a] font-bold text-[15px] border border-slate-200 hover:border-[#1e3a8a]/30 hover:shadow-md hover:-translate-y-1 transition-all active:scale-95"
              >
                Admissions
              </Link>
            </div>
          </motion.div>

          {/* --- RIGHT HALF: EMPTY SPACE FOR BACKGROUND TO SHOW --- */}
          <div className="hidden lg:block w-full h-full pointer-events-none" />

        </div>
      </div>
    </div>
  )
}
