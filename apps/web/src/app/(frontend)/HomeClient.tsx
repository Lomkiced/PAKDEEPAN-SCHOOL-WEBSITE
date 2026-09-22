"use client"

import * as React from "react"
import Link from "next/link"
import { PlayCircle, BookOpen, Users, Star, Leaf, GlobeHemisphereWest, GraduationCap, FileText, CalendarBlank, UserList, ArrowRight, Heart } from "@phosphor-icons/react"
import { FadeIn, StaggerContainer, StaggerItem, WaveDivider } from "@pakdeepan/ui"
import { HeroScrollytelling } from "./_components/HeroScrollytelling"

interface HomeClientProps {
  news: any[];
  events: any[];
  gallery: any[];
  programs?: any[];
  dict: any;
  locale: string;
}

export default function HomeClient({ news, events, gallery, programs = [], dict, locale }: HomeClientProps) {
  
  const FEATURES = [
    { icon: BookOpen, title: "Quality Education", desc: "Building strong academic foundations for life." },
    { icon: Users, title: "Caring Teachers", desc: "Dedicated, supportive, and passionate." },
    { icon: Star, title: "Safe Environment", desc: "A secure and positive place to learn and grow." },
    { icon: Leaf, title: "Holistic Development", desc: "Academic, social, emotional and creative growth." },
    { icon: GlobeHemisphereWest, title: "Global Mindset", desc: "Preparing students for a brighter tomorrow." },
  ]

  const EDITORIAL_PATHWAYS = [
    {
      icon: GraduationCap,
      title: "Academic Programs",
      desc: "Early years, kindergarten, and primary bilingual curricula.",
      href: "/programs",
    },
    {
      icon: FileText,
      title: "Admissions & Enrollment",
      desc: "Transparent tuition fees, requirements, and guided enrollment.",
      href: "/admissions",
    },
    {
      icon: CalendarBlank,
      title: "Campus Life & Calendar",
      desc: "Milestones, student events, celebrations, and photo albums.",
      href: "/campus-life",
    },
  ]

  return (
    <div className="flex flex-col bg-background font-sans overflow-x-hidden">
      <main className="flex-grow pt-20">

        {/* --- VIDEO-DRIVEN SCROLLYTELLING HERO SECTION --- */}
        <HeroScrollytelling />

        {/* --- UNIFIED FLOATING FEATURE DOCK (Overlapping Hero) --- */}
        <section className="relative z-40 -mt-20 sm:-mt-24 md:-mt-32 pb-8 md:pb-12">
          <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-20">
            <FadeIn delay={0.3}>
              <div className="bg-white rounded-3xl md:rounded-[32px] shadow-2xl shadow-slate-200/80 border border-slate-100/90 overflow-hidden">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
                  {FEATURES.map((feat, idx) => (
                    <div 
                      key={idx} 
                      className="py-6 px-5 lg:py-7 lg:px-6 flex flex-col items-center text-center group hover:bg-slate-50/70 transition-all duration-300"
                    >
                      {/* Refined Icon Badge (Single-Color Uniformity Rule) */}
                      <div className="w-11 h-11 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm shadow-primary/10">
                        <feat.icon size={22} weight="fill" />
                      </div>
                      
                      {/* Pillar Title */}
                      <h3 className="font-bold text-[#1e3a8a] text-sm lg:text-[15px] mb-1.5 leading-snug tracking-tight group-hover:text-primary transition-colors">
                        {feat.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-xs text-on-surface-variant leading-relaxed max-w-[200px]">
                        {feat.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* --- ABOUT SECTION --- */}
        <section className="relative overflow-hidden bg-white pt-24 pb-20 md:pt-32 md:pb-28">
          <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            
            {/* Left Column: Seamless Faded Image */}
            <div className="relative w-full h-[400px] md:h-[500px] lg:h-[700px]">
              <FadeIn direction="right" className="absolute inset-0 w-full h-full">
                <div 
                  className="w-full h-full"
                  style={{
                    maskImage: 'radial-gradient(circle at center left, black 30%, transparent 80%)',
                    WebkitMaskImage: 'radial-gradient(circle at center left, black 30%, transparent 80%)'
                  }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop" 
                    alt="Students learning at Pakdeepan School" 
                    className="w-full h-full object-cover object-[center_35%]"
                  />
                </div>
              </FadeIn>
            </div>
            
            {/* Right Column: Content */}
            <FadeIn direction="left" className="px-5 md:px-10 lg:pr-20">
              
              {/* Signature Sherlina Script Quote */}
              <div className="mb-4 transform rotate-[-3deg] inline-block">
                <p className="font-sherlina text-[28px] md:text-4xl text-primary leading-tight drop-shadow-sm">
                  Small steps today, big dreams tomorrow
                  <Heart size={24} weight="fill" className="inline-block ml-2 text-primary align-middle" />
                </p>
              </div>

              <h2 className="font-display-lg text-[40px] md:text-[48px] lg:text-[56px] text-[#1e3a8a] font-extrabold mb-6 leading-tight tracking-tight drop-shadow-sm">
                About <span className="text-primary">Pakdeepan School</span>
              </h2>
              <p className="font-body-lg text-[17px] md:text-[18px] text-on-surface-variant mb-10 leading-relaxed max-w-xl">
                Pakdeepan School is committed to providing high-quality education that empowers every learner to reach their full potential. We believe that education is not just about academics, but also about character, creativity, and kindness.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10 border-t border-b border-slate-100 py-8">
                <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <Users size={20} weight="fill" />
                    </div>
                    <span className="font-display-lg text-3xl font-extrabold text-[#1e3a8a]">500+</span>
                  </div>
                  <p className="text-xs text-on-surface-variant font-bold uppercase tracking-wider">Happy Students</p>
                </div>
                <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <UserList size={20} weight="fill" />
                    </div>
                    <span className="font-display-lg text-3xl font-extrabold text-[#1e3a8a]">50+</span>
                  </div>
                  <p className="text-xs text-on-surface-variant font-bold uppercase tracking-wider">Dedicated Teachers</p>
                </div>
                <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <Star size={20} weight="fill" />
                    </div>
                    <span className="font-display-lg text-3xl font-extrabold text-[#1e3a8a]">15+</span>
                  </div>
                  <p className="text-xs text-on-surface-variant font-bold uppercase tracking-wider">Years of Excellence</p>
                </div>
              </div>

              <Link href="/about" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-white font-bold hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-1 transition-all active:scale-95">
                Learn More About Us <ArrowRight size={18} weight="bold" />
              </Link>
            </FadeIn>
            
          </div>
        </section>

        {/* --- EDUCATIONAL PATHWAYS SECTION --- */}
        <section className="py-12 md:py-16 bg-white relative">
          <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-20">
            
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-10 gap-4">
              <FadeIn direction="right" className="max-w-xl">
                <span className="text-xs font-bold tracking-widest text-primary uppercase mb-2 block">Educational Pathways</span>
                <h2 className="font-display-lg text-[28px] md:text-[34px] text-[#1e3a8a] font-extrabold leading-tight tracking-tight">
                  Explore <span className="text-primary">Pakdeepan</span>
                </h2>
                <p className="font-body-md text-sm md:text-base text-on-surface-variant mt-2 leading-relaxed">
                  Quick access to our academic curricula, admissions guide, and campus community.
                </p>
              </FadeIn>
              
              <FadeIn direction="left">
                <Link 
                  href="/contact" 
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-primary text-primary font-bold hover:bg-primary hover:text-white hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 transition-all text-sm"
                >
                  Book a Campus Tour <ArrowRight size={16} weight="bold" />
                </Link>
              </FadeIn>
            </div>

            {/* 3 Sleek, Compact Navigational Link Tiles */}
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {EDITORIAL_PATHWAYS.map((item, idx) => (
                <StaggerItem key={idx}>
                  <Link 
                    href={item.href}
                    className="group flex flex-col justify-between h-full bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-lg hover:border-primary/40 hover:-translate-y-1 transition-all duration-300"
                  >
                    <div>
                      {/* Top Bar: Single-Color Icon Badge + Circular Arrow */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-105 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm shadow-primary/10">
                          <item.icon size={22} weight="fill" />
                        </div>
                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white flex items-center justify-center transition-all duration-300">
                          <ArrowRight size={14} weight="bold" className="group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="font-bold text-[#1e3a8a] text-lg mb-1.5 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* --- LATEST NEWS & EVENTS --- */}
        <section className="py-24">
          <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-20">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <FadeIn direction="right">
                <span className="text-xs font-bold tracking-widest text-outline-variant uppercase mb-2 block">Latest News & Events</span>
                <h2 className="font-display-lg text-[36px] text-[#1e3a8a] font-extrabold leading-tight">
                  Stay <span className="text-primary">Informed</span>
                </h2>
                <p className="text-on-surface-variant mt-2 max-w-sm">Get the latest updates, announcements, and upcoming events at Pakdeepan School.</p>
              </FadeIn>
              <FadeIn direction="left">
                <Link href="/campus-life" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-[#1e3a8a] text-[#1e3a8a] font-bold hover:bg-[#1e3a8a] hover:text-white transition-colors">
                  View All News & Events <ArrowRight size={16} weight="bold" />
                </Link>
              </FadeIn>
            </div>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {(news.length > 0 ? news.slice(0, 3) : [
                { id: "mock-1", title: "Annual Sports Day 2026 Brings Community Together", category: "Sports", publishDate: new Date().toISOString() },
                { id: "mock-2", title: "Creative Arts Festival Showcases Student Talent", category: "Events", publishDate: new Date().toISOString() },
                { id: "mock-3", title: "New Interactive Reading Curriculum Launched", category: "Academics", publishDate: new Date().toISOString() }
              ]).map((item: any, idx: number) => {
                // Hardcoded high-res Unsplash images for a premium mock experience
                const mockImages = [
                  "https://images.unsplash.com/photo-1546410531-ea4cea477149?q=80&w=2070&auto=format&fit=crop", // Sports/Activity
                  "https://images.unsplash.com/photo-1511629091441-ee46146481b6?q=80&w=2070&auto=format&fit=crop", // Arts/Events
                  "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070&auto=format&fit=crop"  // Academics/Reading
                ]
                const imageUrl = item.featuredImage?.url || mockImages[idx % mockImages.length]

                return (
                  <StaggerItem key={item.id} className="h-full">
                    <Link href={`/campus-life#news`} className="block w-full h-full">
                      <div className="relative w-full h-[400px] md:h-[450px] rounded-[2rem] overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-primary/30 transition-all duration-500">
                        
                        {/* Full-bleed Background Image */}
                        <div className="absolute inset-0 w-full h-full z-0">
                          <img 
                            src={imageUrl} 
                            alt={item.title} 
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out" 
                          />
                        </div>

                        {/* Glassmorphic Dark Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1e3a8a]/95 via-[#1e3a8a]/40 to-transparent z-10 group-hover:from-[#1e3a8a] group-hover:via-[#1e3a8a]/60 transition-all duration-500" />

                        {/* Content Container (Pinned to Bottom) */}
                        <div className="absolute inset-0 z-20 flex flex-col justify-end p-8">
                          
                          {/* Top Meta (Date & Category) */}
                          <div className="flex justify-between items-center mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            <span className="px-3 py-1 bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm">
                              {item.category}
                            </span>
                            <span className="text-xs text-white/90 font-bold drop-shadow-sm">
                              {new Date(item.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </span>
                          </div>

                          {/* Title */}
                          <h4 className="font-display-lg text-2xl font-bold text-white mb-2 line-clamp-2 drop-shadow-md transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            {item.title}
                          </h4>

                          {/* Hidden Read More Button (Revealed on Hover) */}
                          <div className="h-0 overflow-hidden group-hover:h-[40px] opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out mt-1">
                            <span className="inline-flex items-center gap-2 text-blue-200 font-bold text-sm hover:text-white">
                              Read More <ArrowRight size={14} weight="bold" />
                            </span>
                          </div>
                          
                        </div>
                      </div>
                    </Link>
                  </StaggerItem>
                )
              })}
            </StaggerContainer>
          </div>
        </section>

        {/* --- CTA ACTION BANNER --- */}
        <section className="pb-24">
          <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-20">
            <FadeIn direction="up">
              <div className="bg-gradient-to-r from-primary-container to-secondary-container rounded-[3rem] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between relative overflow-hidden shadow-sm">
                
                {/* Polaroid Images (Left) */}
                <div className="relative w-full md:w-1/3 h-64 hidden md:block">
                  
                  {/* Polaroid 1 */}
                  <div className="absolute top-0 left-0 bg-white p-3 pb-10 rounded-sm shadow-xl transform -rotate-6 z-10 w-44 hover:rotate-0 transition-transform cursor-pointer">
                    {/* Tape */}
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-12 h-4 bg-white/50 backdrop-blur-md rotate-3 z-10 shadow-sm border border-black/5"></div>
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCyKNAH0uMIHB7BsuRGJl2DIkH4CU_BioL8fq6YoUQPZuiOd9shQSfDZzyBqhWqMQ37j1yfDkdPBXFw7y1ud5RN-NW0BNnmrvVlUvfEsQj6a1vwKdw-9o87sgsUQt6_2teQA7YxPJo_j8nG8acwXjoFkKzdc1I5XeU_WvW410L_321eFLeY4d5j1T3slxA8opAH6iJOq7ehTB8BtS9Xp0v7a8YkqGH07bIEbRACICN-EtkHUeKphJI1YQ" alt="Students" className="w-full h-32 object-cover rounded-sm" />
                  </div>
                  
                  {/* Polaroid 2 */}
                  <div className="absolute top-8 left-28 bg-white p-3 pb-10 rounded-sm shadow-2xl transform rotate-6 z-20 w-48 hover:-rotate-3 transition-transform cursor-pointer">
                    {/* Tape */}
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-14 h-5 bg-[#fefce8]/80 backdrop-blur-md -rotate-6 z-10 shadow-sm border border-black/5"></div>
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4pFr4Rtg57zWkhknWtnKwDkVjjIQMY3ysqyC8fxM0_5yC5d6ftiv2JkfKscMoRrrTy_HNC0xwSiadwgdyXb_bV80CCTVPqalaNTdM2wmZHvf6Npf0381Or3KQY7LwH2SIFQVpj055Q22JPLzO8rONPxje913WGxb2yseMLLDZV5wxO8F9Tsd6fe-kfTpQQ7cCFTjzSBsFOxq6QcA7LA9PNpocYeDwhJBMZogAfK1v3Z02zY2hdn7Vtw" alt="School" className="w-full h-32 object-cover rounded-sm" />
                  </div>
                  
                  {/* Polaroid 3 */}
                  <div className="absolute top-32 left-10 bg-white p-3 pb-10 rounded-sm shadow-xl transform -rotate-12 z-15 w-40 hover:rotate-0 transition-transform cursor-pointer">
                    {/* Tape */}
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-12 h-4 bg-white/50 backdrop-blur-md rotate-2 z-10 shadow-sm border border-black/5"></div>
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPgYckw1dd3Rry3bG4OVMWG9EO2Z8QewT9Gv6eDvgWUpQs8vOCrsrJd-zA85ba7AMqoZ8cmangR_PjyB-bv0TJ3ezyE8b0d-N98Tun5CDGuldil3lzxrDeTc8A-2wI9cykizTD_xfbuoW37PW05YheFlvRe_t3yuL56MOmsKwaI4Ylx6aRj0xo4HD_qpmvlEGvKcyQ9e-dSK2NmgMETjAJ9mrmZSJYygd81GdtJKVbEFCocmE6_icWSA" alt="Event" className="w-full h-24 object-cover rounded-sm" />
                  </div>

                  {/* Decorative Hearts */}
                  <Heart size={32} weight="fill" className="absolute top-0 right-10 text-primary opacity-60 animate-pulse" />
                  <Heart size={24} weight="duotone" className="absolute bottom-10 -left-4 text-secondary opacity-60 animate-bounce" />
                </div>

                {/* Text Content */}
                <div className="text-center md:text-left z-30 max-w-lg">
                  <h2 className="font-display-lg text-[32px] md:text-[40px] text-[#1e3a8a] font-extrabold mb-4 leading-tight">
                    See Our School in Action
                  </h2>
                  <p className="text-on-surface-variant mb-8">
                    Take a glimpse of our vibrant community, classrooms, and school life.
                  </p>
                  <Link href="/campus-life" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-white font-bold hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-1 transition-all">
                    View Gallery <ArrowRight size={18} weight="bold" />
                  </Link>
                </div>

                {/* Sherlina Calligraphy Text (Right) */}
                <div className="hidden lg:flex items-center gap-3 transform -rotate-6 ml-10 select-none">
                  {/* Accent rays */}
                  <div className="flex flex-col gap-1.5 text-secondary opacity-80">
                    <span className="w-5 h-[2.5px] bg-secondary rounded-full transform -rotate-12"></span>
                    <span className="w-4 h-[2.5px] bg-secondary rounded-full"></span>
                  </div>
                  <div className="font-sherlina text-5xl xl:text-6xl text-secondary leading-tight text-center drop-shadow-sm">
                    Together <br/> We Grow
                  </div>
                  <Heart size={28} weight="regular" className="text-primary self-center ml-1" />
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

      </main>
    </div>
  )
}
