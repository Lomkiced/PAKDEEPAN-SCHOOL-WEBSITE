"use client"

import * as React from "react"
import Link from "next/link"
import { Eye, Flag, ArrowRight } from "@phosphor-icons/react"
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
    <div className="flex flex-col">
      <main className="flex-grow pt-[120px] pb-20">
        
        {/* Hero Section */}
        <section className="max-w-[1120px] mx-auto px-5 md:px-20 mb-20">
          <FadeIn direction="up" className="text-center max-w-3xl mx-auto space-y-6">
            <span className="inline-block px-4 py-2 bg-secondary-container/10 text-secondary font-label-caps text-label-caps rounded-full">
              {heroBadge}
            </span>
            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary">
              {heroTitle}
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              {heroDescription}
            </p>
          </FadeIn>
          
          <FadeIn delay={0.2} direction="up">
            <div className="mt-12 rounded-xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.04)] bg-surface border border-outline-variant/30 h-[60vh] relative">
              <img 
                className="w-full h-full object-cover" 
                alt="School environment" 
                src={heroImage}
              />
            </div>
          </FadeIn>
        </section>

        {/* Mission & Vision (Bento Grid) */}
        <section className="max-w-[1120px] mx-auto px-5 md:px-20 mb-20">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StaggerItem>
              <div className="bg-surface h-full rounded-xl p-12 shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-outline-variant/30 flex flex-col justify-center">
                <div className="w-12 h-12 bg-secondary-container rounded-full flex items-center justify-center text-on-secondary-container mb-6">
                  <Eye size={24} weight="fill" />
                </div>
                <h2 className="font-headline-md text-headline-md text-primary mb-3">{dict.about?.visionTitle || "Our Vision"}</h2>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  {vision}
                </p>
              </div>
            </StaggerItem>
            
            <StaggerItem>
              <div className="bg-primary h-full text-on-primary rounded-xl p-12 shadow-[0_10px_30px_rgba(0,0,0,0.04)] flex flex-col justify-center">
                <div className="w-12 h-12 bg-on-primary/20 rounded-full flex items-center justify-center text-on-primary mb-6">
                  <Flag size={24} weight="fill" />
                </div>
                <h2 className="font-headline-md text-headline-md mb-3">{dict.about?.missionTitle || "Our Mission"}</h2>
                <p className="font-body-md text-body-md text-on-primary/90">
                  {mission}
                </p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </section>

        {/* Leadership Teaser */}
        <section className="max-w-[1120px] mx-auto px-5 md:px-20 mb-20">
          <FadeIn direction="up">
            <div className="bg-surface-container-low rounded-xl p-12 md:p-20 flex flex-col md:flex-row items-center gap-12 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden shrink-0 border-4 border-surface shadow-sm">
                <img 
                  className="w-full h-full object-cover" 
                  alt={principalName} 
                  src={principalPhoto}
                />
              </div>
              <div className="text-center md:text-left">
                <h3 className="font-headline-md text-headline-md text-primary">{dict.about?.messageTitle || "A Message from the Principal"}</h3>
                <p className="font-label-caps text-label-caps text-secondary mb-6">{principalName}, {principalTitle}</p>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6 whitespace-pre-wrap">
                  {principalMessage}
                </p>
              </div>
            </div>
          </FadeIn>
        </section>

      </main>
    </div>
  )
}
