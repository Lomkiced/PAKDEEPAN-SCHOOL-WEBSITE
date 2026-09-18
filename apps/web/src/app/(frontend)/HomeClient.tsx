"use client"

import * as React from "react"
import Link from "next/link"
import { PlayCircle, BookOpen, Users, Star, Leaf, GlobeHemisphereWest, GraduationCap, FileText, CalendarBlank, UserList, Book, ArrowRight, Heart } from "@phosphor-icons/react"
import { FadeIn, StaggerContainer, StaggerItem, WaveDivider } from "@pakdeepan/ui"

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

  const QUICK_LINKS = [
    { icon: GraduationCap, title: "Academic Programs", href: "/programs" },
    { icon: FileText, title: "Admissions & Enrollment", href: "/admissions" },
    { icon: CalendarBlank, title: "School Calendar", href: "/campus-life" },
    { icon: UserList, title: "Parent Portal", href: "#" },
    { icon: Book, title: "Student Resources", href: "#" },
  ]

  return (
    <div className="flex flex-col bg-background font-sans overflow-x-hidden">
      <main className="flex-grow pt-20">

        {/* --- HERO SECTION --- */}
        <section className="relative w-full min-h-[85vh] lg:min-h-[90vh] flex items-center bg-gradient-to-b from-[#e0f2fe] to-[#bae6fd] pt-10 pb-32">
          <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-20 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            
            {/* Left Content */}
            <FadeIn delay={0.2} className="max-w-xl">
              <div className="flex items-center gap-2 sm:gap-2.5 mb-3 sm:mb-4 font-sherlina text-lg sm:text-xl md:text-2xl text-primary select-none leading-normal">
                <span>Learn</span>
                <Heart size={16} weight="regular" className="text-secondary" />
                <span>Grow</span>
                <Heart size={16} weight="regular" className="text-secondary" />
                <span className="text-secondary">Build Your Future</span>
              </div>
              
              <h1 className="font-display-lg text-[48px] md:text-[64px] lg:text-[72px] leading-[1.1] text-on-background mb-6 tracking-tight font-extrabold text-[#1e3a8a]">
                Welcome to <br />
                <span className="text-primary">Pakdeepan</span> School
              </h1>
              
              <p className="font-body-lg text-[18px] md:text-[22px] text-on-surface-variant mb-10 opacity-90 max-w-lg">
                A nurturing place where great minds grow, good hearts lead, and bright futures begin.
              </p>
              
              <div className="flex flex-wrap items-center gap-4">
                <Link href="/about" className="flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-white font-bold text-sm hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-1 transition-all active:scale-95">
                  Discover Our School <ArrowRight size={18} weight="bold" />
                </Link>
                <button className="flex items-center gap-2 px-8 py-4 rounded-full bg-white text-[#1e3a8a] font-bold text-sm border border-outline-variant/20 hover:shadow-md hover:-translate-y-1 transition-all active:scale-95">
                  <PlayCircle size={24} weight="fill" className="text-secondary" /> Watch Video
                </button>
              </div>
            </FadeIn>

            {/* Right Media */}
            <FadeIn direction="left" delay={0.4} className="relative hidden lg:block">
              {/* Decorative Dashed Path */}
              <svg className="absolute -top-16 -left-16 w-32 h-32 text-primary opacity-50 z-0" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6">
                <path d="M10 90 Q 50 10 90 90" />
              </svg>
              
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4pFr4Rtg57zWkhknWtnKwDkVjjIQMY3ysqyC8fxM0_5yC5d6ftiv2JkfKscMoRrrTy_HNC0xwSiadwgdyXb_bV80CCTVPqalaNTdM2wmZHvf6Npf0381Or3KQY7LwH2SIFQVpj055Q22JPLzO8rONPxje913WGxb2yseMLLDZV5wxO8F9Tsd6fe-kfTpQQ7cCFTjzSBsFOxq6QcA7LA9PNpocYeDwhJBMZogAfK1v3Z02zY2hdn7Vtw" 
                  alt="Pakdeepan School Building" 
                  className="w-full h-[500px] object-cover"
                />
              </div>
              
              {/* Elegant floating accent */}
              <div className="absolute top-1/2 -left-6 text-primary opacity-80 z-20 transform -translate-y-1/2 pointer-events-none">
                <Heart size={32} weight="regular" />
              </div>
            </FadeIn>
          </div>

          <WaveDivider className="text-white fill-white" />
        </section>

        {/* --- FEATURES GRID (Overlapping Hero) --- */}
        <section className="relative z-20 -mt-24 md:-mt-32 pb-8 md:pb-12">
          <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-20">
            <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {FEATURES.map((feat, idx) => (
                <StaggerItem key={idx}>
                  <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl shadow-slate-200/50 flex flex-col items-center text-center h-full transform transition-all hover:-translate-y-2 hover:shadow-2xl group">
                    <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-105 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      <feat.icon size={32} weight="fill" />
                    </div>
                    <h3 className="font-bold text-[#1e3a8a] mb-2">{feat.title}</h3>
                    <p className="text-sm text-on-surface-variant leading-relaxed">{feat.desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* --- ABOUT SECTION --- */}
        <section className="pt-4 md:pt-6 pb-20 md:pb-24 overflow-hidden relative">
          <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <FadeIn direction="right" className="relative flex justify-center items-center py-4">
              {/* Layered Architectural Backdrop Frame */}
              <div className="absolute w-full max-w-[360px] sm:max-w-[400px] md:max-w-[430px] aspect-[4/5] rounded-t-[180px] md:rounded-t-[210px] rounded-b-[2.5rem] bg-gradient-to-tr from-[#e0f2fe]/80 via-white to-[#fce7f3]/70 border-2 border-primary/20 transform -rotate-3 -translate-x-3 translate-y-3 -z-10 shadow-lg shadow-slate-200/40" />

              {/* Ambient Glows */}
              <div className="absolute -left-8 -bottom-8 w-64 h-64 bg-[#e0f2fe]/60 rounded-full filter blur-3xl -z-20 pointer-events-none" />
              <div className="absolute -right-8 -top-8 w-64 h-64 bg-[#fce7f3]/50 rounded-full filter blur-3xl -z-20 pointer-events-none" />

              {/* Primary Architectural Arch Frame */}
              <div className="relative w-full max-w-[360px] sm:max-w-[400px] md:max-w-[430px] aspect-[4/5] rounded-t-[170px] md:rounded-t-[200px] rounded-b-[2.25rem] overflow-hidden border-4 border-white shadow-2xl shadow-slate-300/50 bg-white group">
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCyKNAH0uMIHB7BsuRGJl2DIkH4CU_BioL8fq6YoUQPZuiOd9shQSfDZzyBqhWqMQ37j1yfDkdPBXFw7y1ud5RN-NW0BNnmrvVlUvfEsQj6a1vwKdw-9o87sgsUQt6_2teQA7YxPJo_j8nG8acwXjoFkKzdc1I5XeU_WvW410L_321eFLeY4d5j1T3slxA8opAH6iJOq7ehTB8BtS9Xp0v7a8YkqGH07bIEbRACICN-EtkHUeKphJI1YQ" 
                  alt="Pakdeepan students walking together" 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />

                {/* Subtle Inner Ring */}
                <div className="absolute inset-0 rounded-t-[166px] md:rounded-t-[196px] rounded-b-[2.1rem] ring-1 ring-inset ring-black/5 pointer-events-none" />
              </div>

              {/* Floating Trust Badge (Top-Right) */}
              <div className="absolute -top-3 right-0 sm:right-2 md:right-4 z-20 bg-white/95 backdrop-blur-md py-2 px-4 rounded-full shadow-lg shadow-slate-200/60 border border-slate-100 flex items-center gap-2.5 transform hover:scale-105 transition-transform cursor-default">
                <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <GraduationCap size={16} weight="fill" />
                </div>
                <span className="font-bold text-xs text-[#1e3a8a] tracking-wide">Holistic Early Education</span>
              </div>

              {/* Signature Sherlina Script Accent */}
              <div className="absolute -bottom-7 right-0 sm:right-4 transform rotate-[-6deg] z-20 pointer-events-none select-none">
                <p className="font-sherlina text-xl sm:text-2xl md:text-[28px] text-primary leading-tight text-right drop-shadow-sm">
                  Small steps today, <br className="hidden sm:inline" /> big dreams tomorrow
                  <Heart size={18} weight="regular" className="inline-block ml-1 text-primary align-middle" />
                </p>
              </div>
            </FadeIn>

            <FadeIn direction="left" className="pt-10 lg:pt-0">
              <h2 className="font-display-lg text-[40px] md:text-[48px] text-[#1e3a8a] font-extrabold mb-6 leading-tight tracking-tight">
                About <span className="text-primary">Pakdeepan School</span>
              </h2>
              <p className="font-body-lg text-[17px] md:text-[18px] text-on-surface-variant mb-10 leading-relaxed max-w-xl">
                Pakdeepan School is committed to providing high-quality education that empowers every learner to reach their full potential. We believe that education is not just about academics, but also about character, creativity, and kindness.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10 border-t border-b border-outline-variant/30 py-8">
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

              <Link href="/about" className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-primary text-primary font-bold hover:bg-primary hover:text-white hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 transition-all">
                Learn More About Us <ArrowRight size={18} weight="bold" />
              </Link>
            </FadeIn>
          </div>
        </section>

        {/* --- QUICK LINKS SECTION --- */}
        <section className="bg-primary/5 py-24 border-y border-primary/10">
          <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-20 grid grid-cols-1 lg:grid-cols-4 gap-12 items-center">
            
            <FadeIn direction="right" className="lg:col-span-1">
              <span className="text-xs font-bold tracking-widest text-outline-variant uppercase mb-2 block">Quick Links</span>
              <h2 className="font-display-lg text-[36px] text-[#1e3a8a] font-extrabold mb-4 leading-tight">
                Explore Our <span className="text-primary">School</span>
              </h2>
              <p className="text-on-surface-variant mb-8">
                Everything you need, all in one place.
              </p>
              <Link href="/campus-life" className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-primary text-white font-bold hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-1 transition-all">
                View All Links <ArrowRight size={18} weight="bold" />
              </Link>
            </FadeIn>

            <div className="lg:col-span-3">
              <StaggerContainer className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {QUICK_LINKS.map((link, idx) => (
                  <StaggerItem key={idx}>
                    <Link href={link.href} className="bg-white rounded-3xl p-6 aspect-square flex flex-col items-center justify-center text-center shadow-md hover:shadow-xl hover:-translate-y-2 transition-all group">
                      <div className="w-16 h-16 rounded-full bg-secondary-container flex items-center justify-center text-secondary mb-4 group-hover:scale-110 transition-transform">
                        <link.icon size={32} weight="duotone" />
                      </div>
                      <h3 className="font-bold text-[#1e3a8a] text-sm mb-4 leading-tight">{link.title}</h3>
                      <div className="w-8 h-8 rounded-full bg-surface-variant flex items-center justify-center text-on-surface-variant group-hover:bg-primary group-hover:text-white transition-colors">
                        <ArrowRight size={14} weight="bold" />
                      </div>
                    </Link>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
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
              {news.slice(0, 3).map((item, idx) => (
                <StaggerItem key={item.id}>
                  <div className="bg-white rounded-[2rem] border border-outline-variant/20 overflow-hidden group cursor-pointer hover:shadow-xl transition-all h-full flex flex-col">
                    <div className="h-56 overflow-hidden relative">
                      <img src={item.featuredImage?.url || 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPgYckw1dd3Rry3bG4OVMWG9EO2Z8QewT9Gv6eDvgWUpQs8vOCrsrJd-zA85ba7AMqoZ8cmangR_PjyB-bv0TJ3ezyE8b0d-N98Tun5CDGuldil3lzxrDeTc8A-2wI9cykizTD_xfbuoW37PW05YheFlvRe_t3yuL56MOmsKwaI4Ylx6aRj0xo4HD_qpmvlEGvKcyQ9e-dSK2NmgMETjAJ9mrmZSJYygd81GdtJKVbEFCocmE6_icWSA'} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-8 flex flex-col flex-grow">
                      <div className="flex justify-between items-center mb-4">
                        <span className="px-3 py-1 bg-primary text-white text-[10px] font-bold uppercase tracking-wider rounded-full">{item.category}</span>
                        <span className="text-xs text-on-surface-variant font-bold">{new Date(item.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      <h4 className="font-display-lg text-xl font-bold text-[#1e3a8a] mb-3 line-clamp-2 group-hover:text-primary transition-colors">{item.title}</h4>
                      <p className="font-body-md text-on-surface-variant line-clamp-2 text-sm mb-6 flex-grow">{item.excerpt}</p>
                      <Link href={`/campus-life#news`} className="text-primary font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all mt-auto">
                        Read More <ArrowRight size={14} weight="bold" />
                      </Link>
                    </div>
                  </div>
                </StaggerItem>
              ))}
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
