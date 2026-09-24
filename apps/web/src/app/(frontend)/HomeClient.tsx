"use client"

import * as React from "react"
import Link from "next/link"
import { PlayCircle, Users, Star, GraduationCap, FileText, CalendarBlank, UserList, ArrowRight, Heart } from "@phosphor-icons/react"
import { motion } from "framer-motion"
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
      <main className="flex-grow pt-16">

        {/* --- VIDEO-DRIVEN SCROLLYTELLING HERO SECTION --- */}
        <HeroScrollytelling />

        {/* --- INFINITE SCROLLING MARQUEE --- */}
        <section className="relative z-40 bg-[#1e3a8a] py-6 overflow-hidden border-y border-white/10 shadow-xl">
          <div className="flex w-fit">
            <motion.div
              className="flex whitespace-nowrap gap-12 px-6 items-center"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
            >
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex gap-12 items-center">
                  <span className="text-white font-display-lg text-[15px] lg:text-[18px] uppercase tracking-widest font-bold">Bilingual Excellence</span>
                  <span className="text-primary/60 text-xl">✦</span>
                  <span className="text-white font-display-lg text-[15px] lg:text-[18px] uppercase tracking-widest font-bold">Global Mindset</span>
                  <span className="text-primary/60 text-xl">✦</span>
                  <span className="text-white font-display-lg text-[15px] lg:text-[18px] uppercase tracking-widest font-bold">Nurturing Empathy</span>
                  <span className="text-primary/60 text-xl">✦</span>
                  <span className="text-white font-display-lg text-[15px] lg:text-[18px] uppercase tracking-widest font-bold">Creative Inquiry</span>
                  <span className="text-primary/60 text-xl">✦</span>
                  <span className="text-white font-display-lg text-[15px] lg:text-[18px] uppercase tracking-widest font-bold">Joyful Curiosity</span>
                  <span className="text-primary/60 text-xl">✦</span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* --- PHILOSOPHY TEASER (Impeccable Overlap Layout) --- */}
        <section className="relative bg-white pt-12 pb-16 md:pt-16 md:pb-24 px-5 md:px-10 lg:px-20">
          <div className="max-w-[1440px] mx-auto relative">
            <FadeIn direction="up">
              {/* Massive Editorial Image */}
              <div className="w-full h-[500px] md:h-[650px] lg:h-[750px] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl shadow-slate-200/50">
                <img 
                  src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop" 
                  alt="Students learning at Pakdeepan School" 
                  className="w-full h-full object-cover object-[center_35%] transform hover:scale-105 transition-transform duration-[1.5s] ease-out"
                />
              </div>

              {/* Overlapping Glassmorphic Typography Block */}
              <div className="relative md:absolute md:bottom-12 md:left-12 lg:bottom-16 lg:left-16 bg-white/95 backdrop-blur-xl p-8 md:p-12 lg:p-16 rounded-[2rem] shadow-2xl border border-white/50 max-w-xl -mt-20 md:mt-0 mx-auto md:mx-0 z-10">
                
                {/* Signature Sherlina Script */}
                <div className="mb-4 transform rotate-[-3deg] inline-block">
                  <p className="font-sherlina text-[28px] md:text-[36px] text-primary leading-tight drop-shadow-sm">
                    Small steps today, big dreams tomorrow
                  </p>
                </div>
                
                <h2 className="font-display-lg text-[36px] md:text-[44px] lg:text-[52px] text-[#1e3a8a] font-extrabold mb-6 leading-[1.1] tracking-tight drop-shadow-sm">
                  More than a school.<br/>
                  <span className="text-on-surface-variant font-body-lg text-[22px] md:text-[28px] font-medium tracking-normal block mt-2">
                    A foundation for life.
                  </span>
                </h2>
                
                <p className="font-body-md text-[16px] md:text-[18px] text-on-surface-variant mb-10 leading-relaxed">
                  We believe that education is not just about academics, but about character, creativity, and cultivating joyful curiosity in an international setting.
                </p>
                
                <Link href="/about" className="inline-flex items-center gap-3 text-[#1e3a8a] font-bold text-lg hover:text-primary transition-colors group">
                  <span className="border-b-2 border-transparent group-hover:border-primary transition-colors pb-0.5">Read our story</span>
                  <ArrowRight size={20} weight="bold" className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* --- EDUCATIONAL PATHWAYS SECTION (Interactive Editorial Index) --- */}
        <section className="pt-12 pb-6 md:pt-20 md:pb-10 bg-white relative">
          <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-20">
            
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6 border-b border-slate-100 pb-8">
              <FadeIn direction="right" className="max-w-xl">
                <span className="text-xs font-bold tracking-widest text-primary uppercase mb-3 block">Educational Pathways</span>
                <h2 className="font-display-lg text-[36px] md:text-[48px] text-[#1e3a8a] font-extrabold leading-tight tracking-tight">
                  Explore <span className="text-primary">Pakdeepan</span>
                </h2>
              </FadeIn>
              
              <FadeIn direction="left">
                <Link 
                  href="/contact" 
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#1e3a8a] text-white font-bold hover:bg-primary hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 transition-all text-sm"
                >
                  Book a Campus Tour <ArrowRight size={16} weight="bold" />
                </Link>
              </FadeIn>
            </div>

            {/* Editorial Typographic Index */}
            <div className="flex flex-col">
              {EDITORIAL_PATHWAYS.map((item, idx) => (
                <Link 
                  key={idx}
                  href={item.href}
                  className="group flex flex-col md:flex-row md:items-center justify-between py-10 md:py-14 border-b border-slate-100 hover:border-primary/30 transition-colors duration-500"
                >
                  <div className="flex items-start md:items-center gap-6 md:gap-12 w-full">
                    {/* Index Number */}
                    <span className="font-display-lg text-2xl md:text-3xl font-bold text-slate-300 group-hover:text-primary transition-colors duration-500 w-12 shrink-0">
                      0{idx + 1}
                    </span>
                    
                    {/* Title & Description */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between w-full gap-4 md:gap-8 pr-4">
                      <h3 className="font-display-lg text-[32px] md:text-[48px] lg:text-[64px] font-extrabold text-[#1e3a8a] group-hover:text-primary transition-colors duration-500 leading-none tracking-tight">
                        {item.title}
                      </h3>
                      <p className="font-body-md text-base md:text-lg text-on-surface-variant max-w-sm group-hover:text-on-surface transition-colors duration-500 hidden lg:block text-right">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                  
                  {/* Hover Arrow */}
                  <div className="hidden md:flex shrink-0 w-16 h-16 rounded-full border border-slate-200 items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-white text-[#1e3a8a] transition-all duration-500 transform group-hover:rotate-45">
                    <ArrowRight size={24} weight="bold" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* --- LATEST NEWS & EVENTS --- */}
        <section className="py-12 md:py-16">
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
        <section className="pb-16 md:pb-24">
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
