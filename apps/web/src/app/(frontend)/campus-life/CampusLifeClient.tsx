"use client"

import * as React from "react"
import { FadeIn, StaggerContainer, StaggerItem } from "@pakdeepan/ui"
import { ArrowRight, CaretDown, X, Play, CaretLeft, CaretRight, CalendarBlank, MapPin, Clock } from "@phosphor-icons/react"
import { cn } from "@pakdeepan/ui/src/utils/cn"

export default function CampusLifeClient({ initialNews, initialEvents, initialGallery }: any) {
  // Use CMS data exclusively (no fallbacks to mock data)
  const newsItems = (initialNews || []).map((n: any, idx: number) => ({
    id: n.id,
    title: n.title,
    date: new Date(n.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    category: n.category,
    color: "bg-primary-container/90 text-on-primary-container", // Default color for now
    excerpt: n.excerpt,
    image: n.featuredImage?.url,
  }));

  const galleryItems = (initialGallery || []).map((g: any, idx: number) => ({
    id: g.id,
    title: g.title,
    desc: g.description || "",
    category: g.category || "General",
    image: g.image?.url,
    hasVideo: false,
  }));

  const eventItems = (initialEvents || []).map((e: any) => ({
    id: e.id,
    title: e.title,
    rawDate: e.eventDate,
    date: new Date(e.eventDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    shortMonth: new Date(e.eventDate).toLocaleDateString('en-US', { month: 'short' }),
    day: new Date(e.eventDate).toLocaleDateString('en-US', { day: '2-digit' }),
    time: new Date(e.eventDate).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
    location: e.location,
    category: e.category,
    isToday: new Date(e.eventDate).toDateString() === new Date().toDateString()
  }));


  const [activeFilter, setActiveFilter] = React.useState("All News")
  const [lightboxOpen, setLightboxOpen] = React.useState(false)
  const [selectedEvent, setSelectedEvent] = React.useState<any>(null)
  const [currentGalleryIndex, setCurrentGalleryIndex] = React.useState(0)
  const [activeGalleryFilter, setActiveGalleryFilter] = React.useState("All")

  const [currentDate, setCurrentDate] = React.useState(new Date())

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const daysInPrevMonth = new Date(year, month, 0).getDate()
    
    const days = []
    
    // Previous month padding
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({ day: daysInPrevMonth - i, isCurrentMonth: false, date: new Date(year, month - 1, daysInPrevMonth - i) })
    }
    
    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ day: i, isCurrentMonth: true, date: new Date(year, month, i) })
    }
    
    // Next month padding
    const remainingSlots = 42 - days.length
    for (let i = 1; i <= remainingSlots; i++) {
      days.push({ day: i, isCurrentMonth: false, date: new Date(year, month + 1, i) })
    }
    
    return days
  }

  const calendarDays = getDaysInMonth(currentDate)

  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))

  const currentMonthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' }).toUpperCase()

  const filteredGallery = galleryItems.filter((item: any) => 
    activeGalleryFilter === "All" || item.category === activeGalleryFilter
  )

  const openLightbox = (index: number) => {
    setCurrentGalleryIndex(index)
    setLightboxOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    document.body.style.overflow = ''
  }

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentGalleryIndex((prev) => (prev + 1) % filteredGallery.length)
  }

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentGalleryIndex((prev) => (prev - 1 + filteredGallery.length) % filteredGallery.length)
  }

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return
      if (e.key === "Escape") closeLightbox()
      if (e.key === "ArrowRight") setCurrentGalleryIndex((prev) => (prev + 1) % filteredGallery.length)
      if (e.key === "ArrowLeft") setCurrentGalleryIndex((prev) => (prev - 1 + filteredGallery.length) % filteredGallery.length)
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [lightboxOpen, filteredGallery.length])

  return (
    <div className="flex flex-col relative min-h-screen">
      <main className="flex-grow pt-[120px] pb-20 space-y-24">
        
        {/* --- NEWS SECTION --- */}
        <section className="max-w-[1120px] mx-auto px-5 md:px-20">
          <FadeIn direction="up">
            <header className="mb-12 text-center md:text-left">
              <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-4">
                Campus Life & News
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
                Stay updated with the latest happenings, academic achievements, and community events at Pakdeepan Kindergarten School.
              </p>
            </header>
          </FadeIn>

          <FadeIn direction="up" delay={0.1}>
            {/* Featured News Banner */}
            <div className="mb-12 rounded-xl overflow-hidden relative shadow-[0_10px_30px_rgba(0,0,0,0.04)] group cursor-pointer">
              <div 
                className="bg-cover bg-center w-full h-[400px] md:h-[500px] transition-transform duration-700 group-hover:scale-105" 
                style={{ backgroundImage: `url('${newsItems[0]?.image}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 md:p-12 w-full md:w-2/3">
                <span className="inline-block bg-primary-container/30 backdrop-blur-sm text-on-primary font-label-caps text-label-caps px-3 py-1 rounded-full mb-4 border border-primary-container/50">
                  {newsItems[0]?.category}
                </span>
                <h2 className="font-headline-md text-headline-sm md:text-headline-md text-white mb-4">
                  {newsItems[0]?.title}
                </h2>
                <p className="font-body-md text-body-md text-white/80 mb-4 hidden md:block">
                  {newsItems[0]?.excerpt}
                </p>
                <div className="flex items-center text-white/60 font-label-caps text-label-caps">
                  <span>{newsItems[0]?.date}</span>
                  <span className="mx-2">•</span>
                  <span className="flex items-center hover:text-white transition-colors group-hover:translate-x-1 duration-300">
                    Read Full Story <ArrowRight className="ml-1" size={16} />
                  </span>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.2}>
            {/* News Filters */}
            <div className="flex flex-wrap gap-3 mb-10 border-b border-surface-variant pb-4">
              {["All News", "Events", "Academic", "Admissions"].map((filter) => (
                <button 
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={cn(
                    "px-4 py-2 rounded-full font-label-caps text-label-caps transition-colors active:scale-95",
                    activeFilter === filter 
                      ? "bg-primary text-on-primary" 
                      : "bg-surface text-on-surface-variant border border-outline-variant hover:bg-surface-container-high"
                  )}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* News Grid */}
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {newsItems.slice(1, 4).map((news: any) => (
                <StaggerItem key={news.id}>
                  <article className="bg-surface-container-lowest rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col h-full group cursor-pointer hover:-translate-y-1 transition-transform duration-300 border border-outline-variant/30">
                    <div className="h-48 overflow-hidden relative">
                      <img 
                        src={news.image} 
                        alt={news.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                      />
                      <div className={cn("absolute top-4 left-4 backdrop-blur-sm font-label-caps text-label-caps px-3 py-1 rounded-full", news.color)}>
                        {news.category}
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="text-on-surface-variant font-label-caps text-label-caps mb-2">{news.date}</div>
                      <h3 className="font-headline-sm text-headline-sm text-primary mb-3 group-hover:text-secondary transition-colors">
                        {news.title}
                      </h3>
                      <p className="font-body-md text-body-md text-on-surface-variant mb-6 flex-grow line-clamp-3">
                        {news.excerpt}
                      </p>
                      <div className="flex items-center text-primary font-label-caps text-label-caps group-hover:translate-x-1 transition-transform duration-300">
                        Read More <ArrowRight className="ml-1" size={16} />
                      </div>
                    </div>
                  </article>
                </StaggerItem>
              ))}
            </StaggerContainer>

            {/* Load More Button */}
            <div className="flex justify-center">
              <button className="bg-transparent border-2 border-primary text-primary px-8 py-3 rounded-full font-label-caps text-label-caps hover:bg-primary hover:text-on-primary transition-all duration-300 active:scale-95 flex items-center gap-2 group">
                Load More News
                <CaretDown size={18} className="group-hover:animate-bounce" />
              </button>
            </div>
          </FadeIn>
        </section>

        {/* --- EVENTS CALENDAR SECTION --- */}
        <section className="bg-surface-container-low py-20 px-5 md:px-20 border-t border-outline-variant/20">
          <div className="max-w-[1120px] mx-auto flex flex-col xl:flex-row gap-12">
            
            {/* Calendar Main */}
            <div className="flex-1 w-full">
              <FadeIn direction="up">
                <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                  <div>
                    <h2 className="font-display-lg text-[32px] md:text-[48px] text-primary mb-2 tracking-tight">Events Calendar</h2>
                    <p className="font-body-lg text-body-lg text-on-surface-variant">Stay connected with our community events, academic schedules, and cultural celebrations.</p>
                  </div>
                  <div className="flex items-center gap-3 bg-surface p-2 rounded-full border border-outline-variant/30">
                    <button onClick={prevMonth} className="p-2 hover:bg-surface-container-high rounded-full transition-colors text-on-surface-variant">
                      <CaretLeft size={20} />
                    </button>
                    <span className="font-label-caps text-label-caps text-primary px-4 min-w-[160px] text-center">{currentMonthName}</span>
                    <button onClick={nextMonth} className="p-2 hover:bg-surface-container-high rounded-full transition-colors text-on-surface-variant">
                      <CaretRight size={20} />
                    </button>
                  </div>
                </header>
              </FadeIn>

              <FadeIn direction="up" delay={0.1}>
                {/* Calendar Grid */}
                <div className="bg-surface-container-lowest rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-outline-variant/30 overflow-hidden">
                  {/* Days Header */}
                  <div className="grid grid-cols-7 border-b border-outline-variant/30 bg-surface">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                      <div key={day} className="p-4 text-center font-label-caps text-label-caps text-on-surface-variant">{day}</div>
                    ))}
                  </div>
                  {/* Calendar Days Grid */}
                  <div className="grid grid-cols-7 auto-rows-[120px] bg-outline-variant/20 gap-[1px]">
                    {calendarDays.map((dayObj, idx) => {
                      const dayEvents = eventItems.filter((e: any) => new Date(e.rawDate || e.date).toDateString() === dayObj.date.toDateString() || (e.isToday && dayObj.date.toDateString() === new Date().toDateString()))
                      
                      const isToday = dayObj.date.toDateString() === new Date().toDateString()

                      return (
                        <div 
                          key={idx} 
                          className={cn(
                            "bg-surface p-2 transition-colors relative flex flex-col group",
                            dayObj.isCurrentMonth ? "hover:bg-surface-container-low cursor-pointer" : "opacity-50",
                            isToday && "bg-secondary/5"
                          )}
                          onClick={() => {
                            if (dayEvents.length > 0) setSelectedEvent(dayEvents[0])
                          }}
                        >
                          {isToday && <div className="absolute inset-0 border-2 border-secondary rounded-lg pointer-events-none"></div>}
                          
                          <span className={cn(
                            "font-body-md text-body-md mb-1 self-end relative z-10",
                            isToday ? "font-bold bg-secondary text-white w-6 h-6 rounded-full flex items-center justify-center" : (dayObj.isCurrentMonth ? "text-on-surface" : "text-on-surface-variant")
                          )}>
                            {dayObj.day}
                          </span>
                          
                          <div className="flex flex-col gap-1 overflow-y-auto hide-scrollbar">
                            {dayEvents.map((event: any) => (
                              <div key={event.id} className={cn(
                                "border-l-2 px-2 py-1 rounded-sm text-[10px] font-label-caps truncate mb-1",
                                isToday ? "bg-secondary/10 border-secondary text-secondary" : "bg-primary/10 border-primary text-primary"
                              )}>
                                {event.title}
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Sidebar (Upcoming Events) */}
            <aside className="hidden xl:flex flex-col w-80 shrink-0 gap-6 pt-4">
              <FadeIn direction="left" delay={0.2}>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">Upcoming Highlights</h3>
                
                <div className="flex flex-col gap-4">
                  {eventItems.slice(0, 3).map((event: any, idx: number) => (
                    <div 
                      key={event.id}
                      className={cn(
                        "rounded-xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)] cursor-pointer relative overflow-hidden transition-colors group",
                        event.isToday 
                          ? "bg-secondary/5 border-2 border-secondary" 
                          : "bg-surface-container-lowest border border-outline-variant/30 hover:border-primary/50"
                      )} 
                      onClick={() => setSelectedEvent(event)}
                    >
                      {event.isToday && (
                        <div className="absolute top-0 right-0 bg-secondary text-white font-label-caps text-[10px] px-3 py-1 rounded-bl-lg">TODAY</div>
                      )}
                      <div className={cn("flex items-start gap-4 mb-4", event.isToday && "mt-2")}>
                        <div className={cn(
                          "p-3 rounded-lg flex flex-col items-center justify-center min-w-[60px]",
                          event.isToday ? "bg-secondary-container text-on-secondary-container" : "bg-primary-container/30 text-primary"
                        )}>
                          <span className="font-label-caps text-[10px] uppercase tracking-wider">{event.shortMonth}</span>
                          <span className="font-headline-md text-headline-md leading-none mt-1">{event.day}</span>
                        </div>
                        <div>
                          <h4 className={cn(
                            "font-body-lg text-body-lg font-semibold transition-colors",
                            event.isToday ? "text-on-surface" : "text-on-surface group-hover:text-primary"
                          )}>{event.title}</h4>
                          <div className="flex items-center gap-1 text-on-surface-variant mt-1">
                            {event.isToday ? <MapPin size={16} /> : <Clock size={16} />}
                            <span className="text-sm">{event.isToday ? event.location : event.time}</span>
                          </div>
                        </div>
                      </div>
                      {event.isToday && (
                        <button className="w-full py-2 border border-secondary text-secondary rounded-lg font-label-caps text-label-caps hover:bg-secondary hover:text-white transition-colors">
                          View Details
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </FadeIn>
            </aside>

          </div>
        </section>

        {/* --- GALLERY SECTION --- */}
        <section className="py-20 px-5 md:px-20 border-t border-outline-variant/20">
          <div className="max-w-[1120px] mx-auto">
            <FadeIn direction="up">
              <header className="mb-12 text-center md:text-left">
                <h2 className="font-display-lg text-[32px] md:text-[48px] text-primary mb-4 tracking-tight">
                  Gallery
                </h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto md:mx-0">
                  Explore the vibrant daily experiences, modern learning environments, and joyous moments that define our campus.
                </p>
              </header>
            </FadeIn>

            <FadeIn direction="up" delay={0.1}>
              {/* Gallery Filters */}
              <div className="mb-10 overflow-x-auto hide-scrollbar">
                <div className="flex items-center gap-3 min-w-max pb-2 md:pb-0">
                  {["All", "Classroom", "Events", "Facilities"].map((filter) => (
                    <button 
                      key={filter}
                      onClick={() => setActiveGalleryFilter(filter)}
                      className={cn(
                        "px-6 py-2 rounded-full font-label-caps text-label-caps transition-all active:scale-95",
                        activeGalleryFilter === filter 
                          ? "bg-secondary text-on-primary" 
                          : "border border-outline-variant text-on-surface-variant hover:border-secondary hover:text-secondary bg-surface"
                      )}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              {/* Masonry Grid Simulation via CSS Columns */}
              <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                {filteredGallery.map((item: any, idx: number) => (
                  <div 
                    key={item.id} 
                    className="break-inside-avoid group relative rounded-xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.04)] bg-surface cursor-pointer"
                    onClick={() => openLightbox(idx)}
                  >
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm text-white font-label-caps text-[10px] rounded-full mb-2 w-max">
                        {item.category}
                      </span>
                      <h3 className="font-headline-sm text-headline-sm text-white">{item.title}</h3>
                      <p className="font-body-md text-body-md text-white/80 truncate">{item.desc}</p>
                    </div>
                    {item.hasVideo && (
                      <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-md rounded-full p-2 text-white flex items-center justify-center">
                        <Play size={20} weight="fill" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

      </main>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300"
          onClick={() => setSelectedEvent(null)}
        >
          <div 
            className="bg-surface-container-lowest w-full max-w-2xl rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col md:flex-row animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full md:w-2/5 h-48 md:h-auto relative">
              <div 
                className="bg-cover bg-center w-full h-full absolute inset-0"
                style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBGH2WKnBz_xxfq5VaoJRftGErndJ87u8Kz7sXYRC8bWL1G8QNFK7zNwcmKA7BTxONfpDc5O_bJYsEcmz2bykWsGvOXFTDn0ud6NBRUlchBCNij6Lz2zLNoDLsgHLcoEOEWNCKfKRRDziAoTMewI_U7YRFGpV5no0yeudwR4mmqCl1LnFx0LiASGQjomeJU3SpVnjbTfiDdulf_zpgVduMIaUXK3NlE3Yos2h0R8Tzd0mHSrs1sjLKhZA')` }}
              />
            </div>
            <div className="w-full md:w-3/5 p-8 flex flex-col bg-surface">
              <div className="flex justify-between items-start mb-4">
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-label-caps text-[10px]">{selectedEvent.category}</span>
                <button 
                  className="text-on-surface-variant hover:text-on-surface p-1 rounded-full hover:bg-surface-container-high transition-colors"
                  onClick={() => setSelectedEvent(null)}
                >
                  <X size={20} />
                </button>
              </div>
              
              <h3 className="font-display-lg-mobile text-[24px] text-on-surface mb-2 tracking-tight">{selectedEvent.title}</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-6">Join us for this wonderful event at Pakdeepan Kindergarten.</p>
              
              <div className="flex flex-col gap-3 mb-8">
                <div className="flex items-center gap-3 text-on-surface">
                  <CalendarBlank size={20} className="text-primary" />
                  <span className="font-body-md text-body-md">{selectedEvent.date}</span>
                </div>
                <div className="flex items-center gap-3 text-on-surface">
                  <Clock size={20} className="text-primary" />
                  <span className="font-body-md text-body-md">{selectedEvent.time}</span>
                </div>
                <div className="flex items-center gap-3 text-on-surface">
                  <MapPin size={20} className="text-primary" />
                  <span className="font-body-md text-body-md">{selectedEvent.location}</span>
                </div>
              </div>
              
              <div className="mt-auto flex gap-4 pt-6 border-t border-outline-variant/30">
                <button className="flex-1 py-3 bg-primary text-on-primary rounded-lg font-label-caps text-label-caps hover:opacity-90 transition-opacity active:scale-95">
                  RSVP Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Overlay */}
      {lightboxOpen && filteredGallery.length > 0 && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center animate-in fade-in duration-300"
          onClick={closeLightbox}
        >
          {/* Controls */}
          <div className="absolute top-0 w-full p-6 flex justify-between items-center z-10">
            <div className="text-white font-body-lg">
              {filteredGallery[currentGalleryIndex].title}
            </div>
            <button 
              className="text-white hover:text-primary-container p-2 rounded-full bg-white/10 backdrop-blur-md transition-colors"
              onClick={closeLightbox}
            >
              <X size={24} />
            </button>
          </div>

          {/* Image Container */}
          <div className="relative w-full max-w-6xl h-[85vh] flex items-center justify-center p-5">
            <button 
              className="absolute left-4 md:left-8 text-white hover:text-primary-container p-3 rounded-full bg-white/10 backdrop-blur-md transition-colors z-10"
              onClick={prevImage}
            >
              <CaretLeft size={32} />
            </button>
            
            <img 
              src={filteredGallery[currentGalleryIndex].image} 
              alt={filteredGallery[currentGalleryIndex].title}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-300"
              onClick={(e) => e.stopPropagation()}
            />
            
            <button 
              className="absolute right-4 md:right-8 text-white hover:text-primary-container p-3 rounded-full bg-white/10 backdrop-blur-md transition-colors z-10"
              onClick={nextImage}
            >
              <CaretRight size={32} />
            </button>
          </div>
          
          <div className="absolute bottom-6 text-white/60 font-body-md">
            {currentGalleryIndex + 1} / {filteredGallery.length}
          </div>
        </div>
      )}
      
    </div>
  )
}
