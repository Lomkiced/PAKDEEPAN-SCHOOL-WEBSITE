"use client"

import * as React from "react"
import Link from "next/link"
import { ImageUploader } from "@/components/admin/ImageUploader"

interface ImageManagerClientProps {
  siteSettings: any
  homePage: any
  aboutPage: any
  programs: any[]
  news: any[]
  events: any[]
  gallery: any[]
}

export function ImageManagerClient({
  siteSettings,
  homePage,
  aboutPage,
  programs,
  news,
  events,
  gallery,
}: ImageManagerClientProps) {
  const [activeTab, setActiveTab] = React.useState<
    "hero" | "director" | "programs" | "news" | "gallery"
  >("hero")

  const [locale, setLocale] = React.useState<"en" | "th">(() => {
    if (typeof window === "undefined") return "en"
    try {
      const stored = localStorage.getItem("pakdeepan_locale") as "en" | "th" | null
      if (stored === "th" || stored === "en") return stored
      const cookieMatch = document.cookie.match(/(?:^|;\s*)NEXT_LOCALE=([^;]+)/)
      if (cookieMatch && (cookieMatch[1] === "th" || cookieMatch[1] === "en")) {
        return cookieMatch[1] as "en" | "th"
      }
    } catch {
      // Ignore
    }
    return "en"
  })

  const switchLocale = (newLocale: "en" | "th") => {
    setLocale(newLocale)
    try {
      localStorage.setItem("pakdeepan_locale", newLocale)
      document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`
    } catch {
      // Ignore
    }
    window.location.reload()
  }

  const isTh = locale === "th"

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      
      {/* Top Banner Navigation */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="text-xs font-bold text-slate-500 hover:text-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors flex items-center gap-1.5"
            >
              ← {isTh ? "กลับสู่หน้าแอดมิน" : "Back to Admin"}
            </Link>
            <div>
              <h1 className="text-xl font-extrabold text-[#1e3a8a] flex items-center gap-2">
                {isTh ? "ศูนย์จัดการรูปภาพและสื่อเว็บไซต์" : "Visual Assets & Image Manager"}
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                  ● {isTh ? "ระบบซิงค์สดเปิดใช้งาน" : "Real-Time Sync Active"}
                </span>
              </h1>
              <p className="text-xs text-slate-500">
                {isTh
                  ? "เปลี่ยนรูปภาพทุกส่วนของเว็บไซต์ผ่านการอัปโหลดไฟล์ หรือวางลิงก์ URL พร้อมซิงค์ทันที"
                  : "Replace any image across all public sections via local file upload or external URL."}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Prominent Language Switcher */}
            <div
              className="inline-flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold"
              role="group"
              aria-label="Language Selector"
            >
              <button
                type="button"
                onClick={() => switchLocale("en")}
                className={`px-3 py-1.5 rounded-lg transition-all duration-200 flex items-center gap-1.5 ${
                  !isTh ? "bg-[#1e3a8a] text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <span>🇬🇧</span>
                <span>EN</span>
              </button>
              <button
                type="button"
                onClick={() => switchLocale("th")}
                className={`px-3 py-1.5 rounded-lg transition-all duration-200 flex items-center gap-1.5 ${
                  isTh ? "bg-[#1e3a8a] text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <span>🇹🇭</span>
                <span>ไทย</span>
              </button>
            </div>

            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold px-4 py-2 bg-[#1e3a8a] text-white rounded-xl hover:bg-primary transition-all shadow-sm flex items-center gap-1.5"
            >
              {isTh ? "เปิดดูหน้าเว็บไซต์จริง ↗" : "View Public Website ↗"}
            </Link>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-6 flex gap-2 border-t border-slate-100 overflow-x-auto py-2">
          <button
            type="button"
            onClick={() => setActiveTab("hero")}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
              activeTab === "hero"
                ? "bg-[#1e3a8a] text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            {isTh ? "การตั้งค่าเว็บไซต์และ Hero" : "Site Settings & Hero"}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("director")}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
              activeTab === "director"
                ? "bg-[#1e3a8a] text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            {isTh ? "ผู้อำนวยการโรงเรียนและประวัติ" : "School Director & About"}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("programs")}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
              activeTab === "programs"
                ? "bg-[#1e3a8a] text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            {isTh ? `หลักสูตรการศึกษา (${programs.length})` : `Academic Programs (${programs.length})`}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("news")}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
              activeTab === "news"
                ? "bg-[#1e3a8a] text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            {isTh ? `ข่าวสารและกิจกรรม (${news.length + events.length})` : `News & Events (${news.length + events.length})`}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("gallery")}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
              activeTab === "gallery"
                ? "bg-[#1e3a8a] text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            {isTh ? `แกลเลอรีภาพโรงเรียน (${gallery.length})` : `School Gallery (${gallery.length})`}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 pt-8">

        {/* Fallback & Bilingual Notice */}
        <div className="mb-6 p-4 rounded-xl bg-blue-50/70 border border-blue-100 flex items-center justify-between text-xs text-blue-900">
          <span>
            💡 <strong>{isTh ? "ระบบสองภาษาและ Fallback:" : "Bilingual & Fallback Mechanism:"}</strong>{" "}
            {isTh
              ? "หากเว้นว่างช่องภาษาไทย ระบบจะดึงข้อความภาษาอังกฤษมาแสดงผลแทนโดยอัตโนมัติ เพื่อป้องกันหน้าเว็บว่างเปล่า"
              : "If a Thai field is left empty, the English content will automatically be served as a fallback, ensuring the public UI never renders blank text."}
          </span>
        </div>
        
        {/* --- TAB 1: SITE SETTINGS & HERO --- */}
        {activeTab === "hero" && (
          <div className="flex flex-col gap-8 animate-in fade-in duration-300">
            <div className="border-b border-slate-200 pb-4">
              <h2 className="text-lg font-bold text-slate-800">
                {isTh ? "การตั้งค่าเว็บไซต์และสื่อแบนเนอร์หน้าแรก" : "Site Settings & Hero Visual Assets"}
              </h2>
              <p className="text-xs text-slate-500">
                {isTh
                  ? "โลโก้ทางการ, ภาพพื้นหลัง Hero, ภาพวิดีโอตัวอย่าง, ภาพปรัชญาโรงเรียน และภาพโพลารอยด์ CTA"
                  : "Official branding, hero background, video poster, philosophy image, and home CTA polaroids."}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* School Logo */}
              <ImageUploader
                label={isTh ? "โลโก้ทางการของโรงเรียน" : "Official School Logo"}
                description={
                  isTh
                    ? "แสดงในแถบนำทางด้านบนและส่วนท้ายของทุกหน้า"
                    : "Displayed in the sticky navigation header and footer across all pages."
                }
                targetType="global"
                targetSlug="site-settings"
                fieldName="logo"
                initialImageUrl={siteSettings?.logo?.url || "/images/pakdeepan-logo.png"}
                initialMediaId={siteSettings?.logo?.id}
                aspectRatio="square"
              />

              {/* Hero Ambient Background */}
              <ImageUploader
                label={isTh ? "ภาพพื้นหลังส่วน Hero แบนเนอร์" : "Hero Ambient / Background Image"}
                description={
                  isTh
                    ? "ภาพบรรยากาศที่แสดงด้านหลังหัวข้อหลักในหน้าแรก"
                    : "Ambient textured background displayed in the hero scrollytelling section."
                }
                targetType="global"
                targetSlug="home-page"
                fieldName="heroBackgroundImage"
                initialImageUrl={homePage?.heroBackgroundImage?.url}
                initialMediaId={homePage?.heroBackgroundImage?.id}
                aspectRatio="video"
              />

              {/* Hero Video Poster */}
              <ImageUploader
                label={isTh ? "ภาพปกวิดีโอแอนิเมชัน (Fallback)" : "Hero Animated Video Poster (Fallback)"}
                description={
                  isTh
                    ? "ภาพที่แสดงก่อนวิดีโอแอนิเมชันตราสัญลักษณ์จะโหลดสมบูรณ์"
                    : "Image shown before the hero animated video emblem loads."
                }
                targetType="global"
                targetSlug="home-page"
                fieldName="heroVideoPoster"
                initialImageUrl={homePage?.heroVideoPoster?.url || "/videos/pakdeepan-logo-poster.webp"}
                initialMediaId={homePage?.heroVideoPoster?.id}
                aspectRatio="square"
              />

              {/* Philosophy Editorial Photo */}
              <ImageUploader
                label={isTh ? "ภาพประกอบปรัชญาโรงเรียน" : "Philosophy Feature Image"}
                description={
                  isTh
                    ? "ภาพขนาดใหญ่ในส่วน 'มากกว่าโรงเรียน คือรากฐานของชีวิต'"
                    : "Large photography card in the 'More than a school' philosophy section."
                }
                targetType="global"
                targetSlug="home-page"
                fieldName="philosophyImage"
                initialImageUrl={
                  homePage?.philosophyImage?.url ||
                  "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop"
                }
                initialMediaId={homePage?.philosophyImage?.id}
                aspectRatio="landscape"
              />
            </div>

            {/* CTA Banner Polaroids */}
            <div className="border-t border-slate-200 pt-6">
              <h3 className="text-sm font-bold text-slate-800 mb-4">
                {isTh ? "ภาพโพลารอยด์แถบรับสมัครท้ายหน้าแรก" : "Home CTA Banner Polaroids"}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ImageUploader
                  label={isTh ? "โพลารอยด์ 1 (เอียงซ้าย)" : "Polaroid 1 (Left Tilt)"}
                  targetType="global"
                  targetSlug="home-page"
                  fieldName="ctaPolaroid1"
                  initialImageUrl={homePage?.ctaPolaroid1?.url}
                  initialMediaId={homePage?.ctaPolaroid1?.id}
                  aspectRatio="square"
                />
                <ImageUploader
                  label={isTh ? "โพลารอยด์ 2 (ตรงกลาง)" : "Polaroid 2 (Center Straight)"}
                  targetType="global"
                  targetSlug="home-page"
                  fieldName="ctaPolaroid2"
                  initialImageUrl={homePage?.ctaPolaroid2?.url}
                  initialMediaId={homePage?.ctaPolaroid2?.id}
                  aspectRatio="square"
                />
                <ImageUploader
                  label={isTh ? "โพลารอยด์ 3 (เอียงขวา)" : "Polaroid 3 (Right Tilt)"}
                  targetType="global"
                  targetSlug="home-page"
                  fieldName="ctaPolaroid3"
                  initialImageUrl={homePage?.ctaPolaroid3?.url}
                  initialMediaId={homePage?.ctaPolaroid3?.id}
                  aspectRatio="square"
                />
              </div>
            </div>
          </div>
        )}

        {/* --- TAB 2: SCHOOL DIRECTOR & ABOUT --- */}
        {activeTab === "director" && (
          <div className="flex flex-col gap-8 animate-in fade-in duration-300">
            <div className="border-b border-slate-200 pb-4">
              <h2 className="text-lg font-bold text-slate-800">
                {isTh ? "ภาพสาส์นผู้อำนวยการและหน้าเกี่ยวกับเรา" : "School Director & About Page Imagery"}
              </h2>
              <p className="text-xs text-slate-500">
                {isTh
                  ? "ภาพถ่ายทางการของผู้อำนวยการโรงเรียน, ภาพปกหน้าประวัติ, และภาพคลังประวัติศาสตร์"
                  : "Official portrait of the School Director, hero backdrop, and heritage campus archive."}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* School Director Portrait */}
              <ImageUploader
                label={isTh ? "ภาพถ่ายผู้อำนวยการโรงเรียน" : "School Director Portrait"}
                description={
                  isTh
                    ? "ภาพถ่ายทางการที่แสดงคู่กับสาส์นจากผู้อำนวยการโรงเรียน"
                    : "Prominent portrait shown alongside the School Director's Message."
                }
                targetType="global"
                targetSlug="about-page"
                fieldName="principalPhoto"
                initialImageUrl={
                  aboutPage?.principalPhoto?.url ||
                  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop"
                }
                initialMediaId={aboutPage?.principalPhoto?.id}
                aspectRatio="portrait"
              />

              {/* About Us Hero Banner */}
              <ImageUploader
                label={isTh ? "ภาพพื้นหลังหน้าเกี่ยวกับเรา" : "About Page Hero Background"}
                description={
                  isTh
                    ? "ภาพถ่ายบรรยากาศโรงเรียนด้านหลังหัวข้อ 'เรื่องราวของเรา'"
                    : "Cinematic edge-to-edge photography behind the 'Our Story' title."
                }
                targetType="global"
                targetSlug="about-page"
                fieldName="heroImage"
                initialImageUrl={
                  aboutPage?.heroImage?.url ||
                  "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1600&auto=format&fit=crop"
                }
                initialMediaId={aboutPage?.heroImage?.id}
                aspectRatio="landscape"
              />

              {/* History & Heritage Image */}
              <ImageUploader
                label={isTh ? "ภาพถ่ายประวัติและความเป็นมา" : "History & Heritage Archive Photo"}
                description={
                  isTh
                    ? "ภาพถ่ายในอดีตที่แสดงเคียงคู่กับเรื่องราวการก่อตั้งโรงเรียน"
                    : "Historical photograph shown next to the school's heritage narrative."
                }
                targetType="global"
                targetSlug="about-page"
                fieldName="historyImage"
                initialImageUrl={
                  aboutPage?.historyImage?.url ||
                  "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop"
                }
                initialMediaId={aboutPage?.historyImage?.id}
                aspectRatio="landscape"
              />
            </div>
          </div>
        )}

        {/* --- TAB 3: ACADEMIC PROGRAMS --- */}
        {activeTab === "programs" && (
          <div className="flex flex-col gap-8 animate-in fade-in duration-300">
            <div className="border-b border-slate-200 pb-4">
              <h2 className="text-lg font-bold text-slate-800">
                {isTh ? "ภาพการ์ดหลักสูตรการศึกษา" : "Academic Program Curriculum Cards"}
              </h2>
              <p className="text-xs text-slate-500">
                {isTh
                  ? "ภาพประจำแต่ละระดับชั้นการศึกษาที่แสดงในหน้าหลักสูตร"
                  : "Featured imagery for each educational level displayed on the Academics page."}
              </p>
            </div>

            {programs.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 text-sm">
                {isTh
                  ? "ไม่พบข้อมูลหลักสูตรในระบบ CMS กรุณาสร้างหลักสูตรเพื่อกำหนดรูปภาพ"
                  : "No programs found in CMS. Create a program in the Admin CMS to assign its card image."}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {programs.map((program) => (
                  <div key={program.id} className="flex flex-col gap-2">
                    <span className="text-xs font-bold text-primary">
                      {program.title || "Academic Program"} ({program.level || "Early Years"})
                    </span>
                    <ImageUploader
                      label={program.title || (isTh ? "ภาพหลักสูตร" : "Program Image")}
                      description={isTh ? `ภาพการ์ดสำหรับ ${program.title}` : `Card image for ${program.title}`}
                      targetType="collection"
                      targetSlug="programs"
                      docId={program.id}
                      fieldName="featuredImage"
                      initialImageUrl={program.featuredImage?.url}
                      initialMediaId={program.featuredImage?.id}
                      aspectRatio="landscape"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* --- TAB 4: NEWS & EVENTS --- */}
        {activeTab === "news" && (
          <div className="flex flex-col gap-8 animate-in fade-in duration-300">
            <div className="border-b border-slate-200 pb-4">
              <h2 className="text-lg font-bold text-slate-800">
                {isTh ? "ภาพประกอบข่าวสารและกิจกรรม" : "News Articles & Upcoming Events"}
              </h2>
              <p className="text-xs text-slate-500">
                {isTh
                  ? "เปลี่ยนภาพหน้าปกสำหรับข่าวสารประชาสัมพันธ์และปฏิทินกิจกรรมโรงเรียน"
                  : "Replace cover photos for news announcements and calendar events on the Campus Life page."}
              </p>
            </div>

            {/* News Articles */}
            <div>
              <h3 className="text-sm font-bold text-slate-800 mb-4">
                {isTh ? "ข่าวสารและบทความ" : "News Articles"}
              </h3>
              {news.length === 0 ? (
                <div className="p-6 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 text-xs">
                  {isTh ? "ไม่พบข่าวสารในระบบ เพิ่มข่าวสารได้ที่เมนู News" : "No news articles found. Add articles in the News collection."}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {news.map((article) => (
                    <div key={article.id} className="flex flex-col gap-2">
                      <span className="text-xs font-bold text-slate-800 truncate">
                        {article.title}
                      </span>
                      <ImageUploader
                        label={article.title}
                        targetType="collection"
                        targetSlug="news"
                        docId={article.id}
                        fieldName="featuredImage"
                        initialImageUrl={article.featuredImage?.url}
                        initialMediaId={article.featuredImage?.id}
                        aspectRatio="landscape"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Events */}
            <div className="border-t border-slate-200 pt-6">
              <h3 className="text-sm font-bold text-slate-800 mb-4">
                {isTh ? "ปฏิทินกิจกรรมโรงเรียน" : "Events Calendar Imagery"}
              </h3>
              {events.length === 0 ? (
                <div className="p-6 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 text-xs">
                  {isTh ? "ไม่พบกิจกรรมในระบบ เพิ่มกิจกรรมได้ที่เมนู Events" : "No events found. Add events in the Events collection."}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {events.map((event) => (
                    <div key={event.id} className="flex flex-col gap-2">
                      <span className="text-xs font-bold text-slate-800 truncate">
                        {event.title}
                      </span>
                      <ImageUploader
                        label={event.title}
                        targetType="collection"
                        targetSlug="events"
                        docId={event.id}
                        fieldName="coverImage"
                        initialImageUrl={event.coverImage?.url}
                        initialMediaId={event.coverImage?.id}
                        aspectRatio="landscape"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* --- TAB 5: SCHOOL GALLERY --- */}
        {activeTab === "gallery" && (
          <div className="flex flex-col gap-8 animate-in fade-in duration-300">
            <div className="border-b border-slate-200 pb-4">
              <h2 className="text-lg font-bold text-slate-800">
                {isTh ? "ภาพบรรยากาศและสิ่งอำนวยความสะดวก" : "School Gallery & Facilities"}
              </h2>
              <p className="text-xs text-slate-500">
                {isTh
                  ? "จัดการภาพถ่ายกิจกรรมและสิ่งอำนวยความสะดวกที่แสดงในแกลเลอรี"
                  : "Replace gallery photos displayed on the Campus Life interactive gallery."}
              </p>
            </div>

            {gallery.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 text-sm">
                {isTh
                  ? "ไม่พบภาพถ่ายในระบบ เพิ่มภาพได้ที่เมนู Gallery"
                  : "No gallery photos found. Add photos in the Gallery collection to manage them here."}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {gallery.map((item) => (
                  <div key={item.id} className="flex flex-col gap-2">
                    <span className="text-xs font-bold text-slate-800 truncate">
                      {item.title} ({item.category || "Campus"})
                    </span>
                    <ImageUploader
                      label={item.title}
                      targetType="collection"
                      targetSlug="gallery-images"
                      docId={item.id}
                      fieldName="image"
                      initialImageUrl={item.image?.url}
                      initialMediaId={item.image?.id}
                      aspectRatio="square"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </main>
    </div>
  )
}
