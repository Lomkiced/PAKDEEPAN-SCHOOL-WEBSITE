"use client"

import * as React from "react"
import { FadeIn, StaggerContainer, StaggerItem } from "@pakdeepan/ui"

interface AboutClientProps {
  aboutData: any;
  dict: any;
  locale: string;
}

export default function AboutClient({ aboutData, dict, locale }: AboutClientProps) {
  // Use CMS data or fallback to defaults if CMS is empty
  const heroBadge = aboutData?.heroBadge || dict.about?.heroBadge || "Our Story";
  const heroTitle = aboutData?.heroTitle || dict.about?.heroTitle || "Nurturing Excellence in Early Education";
  const heroDescription = aboutData?.heroDescription || dict.about?.heroDescription || "At Pakdeepan Kindergarten School, we believe in cultivating a foundation of curiosity, empathy, and academic rigor in a warm, international setting.";
  const heroImage = aboutData?.heroImage?.url || "https://lh3.googleusercontent.com/aida-public/AB6AXuDEBTwDrFrhfcbLdTJzFp9mgPWUjivefzKOy73OgQYPmWCU7LFU2rXiU9Y_jdUlBMZAZgXIWCBBkq-9m34Wvp0l1zKRue2FkfbWrxF8lzTPI6IRbrUvFm-ptZjNzOw-QIwCZolNOnBHaX55jt8tBzub-sJbS4W3a5XKLjkSXw1SxMt5DgDUoVTZl9cPotKxdKwv1zpUK-RHg8IuxmnQCZN3oYMEB_lorTaH7rVDWriPSjOOBrOzPF4_aQ";

  const vision = aboutData?.vision || dict.about?.vision || "To be the premier international early years institution, recognized globally for fostering innovative thinkers and compassionate leaders from their very first steps in education.";
  const mission = aboutData?.mission || dict.about?.mission || "We provide a holistic, child-centered curriculum within a safe, inspiring, and culturally diverse environment, empowering each child to reach their unique potential through inquiry and joyful discovery.";

  const principalName = aboutData?.principalName || "Dr. Elena Rostova";
  const principalTitle = aboutData?.principalTitle || dict.about?.principalTitle || "Ph.D. in Early Education";
  const principalMessage = aboutData?.principalMessage || dict.about?.principalMessage || "\"Welcome to a community where every child is seen, heard, and valued. Our dedicated team of international educators is committed to providing an exceptional start to your child's lifelong learning journey. We believe that true excellence is achieved when rigor meets warmth.\"";
  const principalPhoto = aboutData?.principalPhoto?.url || "https://lh3.googleusercontent.com/aida-public/AB6AXuCEqJr3sQ_LCIhsDqcrFiH1cRad-bKWjEL-Eq2YHlmUdPUO7EWSDNvnq-d9wV6_lsNa9zPgUcWLKOUC4Tu7u7hvtAYSBR3cxAd4yTe-jBIN0XgvXzU0bgQGw8lbmvMdT0V8jwzFfPiHo09YVTHjtaJWVB1_uoNO9cyxmnffkRp7hKoGMTVP6mu5LpW8JiJn2vBskdJsuSnV8AS2KVu0AasFp6kUiu27GkhZH7K3UQlHvbJS819seLzD5w";

  return (
    <div className="flex flex-col bg-white">
      <main className="flex-grow">
        
        {/* --- IMMERSIVE HERO SECTION --- */}
        <section className="relative w-full min-h-[85vh] flex items-center justify-center pt-24 pb-12 overflow-hidden">
          
          {/* Edge-to-Edge Cinematic Background */}
          <div className="absolute inset-0 w-full h-full z-0">
            <img 
              className="w-full h-full object-cover object-[center_30%]" 
              alt="School environment" 
              src={heroImage}
            />
            {/* Elegant Gradient Fade to White (bottom) and slight darkening (top) */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/60 to-white z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/50 to-transparent z-10" />
          </div>

          <div className="max-w-[1440px] w-full mx-auto px-5 md:px-10 lg:px-20 relative z-20 pt-20">
            <FadeIn direction="up" className="max-w-2xl">
              
              {/* Signature Tagline */}
              <div className="mb-6 transform rotate-[-2deg] inline-block">
                <span className="font-sherlina text-[32px] md:text-5xl text-primary leading-tight drop-shadow-sm">
                  {heroBadge}
                </span>
              </div>
              
              <h1 className="font-display-lg text-[48px] md:text-[64px] lg:text-[76px] leading-[1.05] text-[#1e3a8a] font-extrabold mb-8 tracking-tight drop-shadow-sm">
                {heroTitle}
              </h1>
              
              <p className="font-body-lg text-[18px] md:text-[22px] text-on-surface-variant max-w-xl leading-relaxed">
                {heroDescription}
              </p>
            </FadeIn>
          </div>
        </section>

        {/* --- EDITORIAL MISSION & VISION --- */}
        <section className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-20 py-24 md:py-32">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
            
            {/* Vision */}
            <StaggerItem>
              <div className="relative group">
                {/* Large Background Typography instead of an Icon */}
                <div className="absolute -top-12 -left-6 font-display-lg text-[140px] font-extrabold text-primary/5 select-none pointer-events-none group-hover:text-primary/10 transition-colors duration-500">
                  01
                </div>
                <div className="relative z-10">
                  <h2 className="font-display-lg text-[32px] md:text-[40px] text-[#1e3a8a] font-extrabold mb-6">
                    {dict.about?.visionTitle || "Our Vision"}
                  </h2>
                  <div className="w-12 h-1 bg-primary mb-8 rounded-full" />
                  <p className="font-body-md text-[17px] md:text-[19px] leading-loose text-on-surface-variant">
                    {vision}
                  </p>
                </div>
              </div>
            </StaggerItem>
            
            {/* Mission */}
            <StaggerItem>
              <div className="relative group">
                {/* Large Background Typography instead of an Icon */}
                <div className="absolute -top-12 -left-6 font-display-lg text-[140px] font-extrabold text-secondary/5 select-none pointer-events-none group-hover:text-secondary/10 transition-colors duration-500">
                  02
                </div>
                <div className="relative z-10">
                  <h2 className="font-display-lg text-[32px] md:text-[40px] text-[#1e3a8a] font-extrabold mb-6">
                    {dict.about?.missionTitle || "Our Mission"}
                  </h2>
                  <div className="w-12 h-1 bg-secondary mb-8 rounded-full" />
                  <p className="font-body-md text-[17px] md:text-[19px] leading-loose text-on-surface-variant">
                    {mission}
                  </p>
                </div>
              </div>
            </StaggerItem>

          </StaggerContainer>
        </section>

        {/* --- MAGAZINE-STYLE LEADERSHIP SPREAD --- */}
        <section className="bg-slate-50 border-t border-slate-100">
          <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-20 py-24 md:py-32">
            <FadeIn direction="up">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
                
                {/* Left: Edge-to-Edge Style Portrait */}
                <div className="lg:col-span-5 relative">
                  <div className="aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-2xl shadow-slate-200/60 relative group">
                    <img 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" 
                      alt={principalName} 
                      src={principalPhoto}
                    />
                    {/* Subtle inner shadow overlay */}
                    <div className="absolute inset-0 border border-white/20 rounded-2xl pointer-events-none z-10" />
                  </div>
                  {/* Decorative element */}
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-3xl z-[-1]" />
                </div>
                
                {/* Right: Editorial Typography Message */}
                <div className="lg:col-span-7 flex flex-col justify-center">
                  <span className="text-sm font-bold tracking-widest text-primary uppercase mb-4 block">
                    Leadership
                  </span>
                  
                  <h3 className="font-display-lg text-[36px] md:text-[48px] text-[#1e3a8a] font-extrabold leading-tight mb-10">
                    {dict.about?.messageTitle || "A Message from the Principal"}
                  </h3>
                  
                  {/* The Quote Block */}
                  <div className="relative pl-6 md:pl-10 border-l-2 border-secondary/40 mb-12">
                    {/* Giant quotation mark in background */}
                    <span className="absolute -top-12 -left-4 font-serif text-[120px] text-slate-200 opacity-50 select-none pointer-events-none leading-none">
                      "
                    </span>
                    <p className="font-body-md text-[18px] md:text-[20px] text-on-surface-variant leading-relaxed relative z-10 whitespace-pre-wrap">
                      {principalMessage.replace(/^"|"$/g, '')}
                    </p>
                  </div>
                  
                  {/* Sign-off */}
                  <div className="flex flex-col">
                    <span className="font-display-lg text-[24px] text-[#1e3a8a] font-bold">
                      {principalName}
                    </span>
                    <span className="text-on-surface-variant text-sm mt-1">
                      {principalTitle}
                    </span>
                  </div>
                  
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

      </main>
    </div>
  )
}
