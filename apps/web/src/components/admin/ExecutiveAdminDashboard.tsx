"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Newspaper,
  GraduationCap,
  Image as ImageIcon,
  Activity,
  Plus,
  ExternalLink,
  Edit3,
  Settings,
  ChevronRight,
  ShieldCheck,
  Calendar,
  Sparkles,
  ArrowUpRight,
} from "lucide-react"
import { NewsArticleEditorModal } from "@/components/admin/NewsArticleEditorModal"
import { extractPlainText } from "@/lib/richText"

export interface ExecutiveDashboardData {
  news: any[]
  programs: any[]
  events: any[]
  gallery: any[]
  mediaCount: number
  usersCount: number
  siteSettings: any
}

export interface ExecutiveAdminDashboardProps {
  data: ExecutiveDashboardData
  initialLocale?: "en" | "th"
}

export function ExecutiveAdminDashboard({
  data,
  initialLocale = "th",
}: ExecutiveAdminDashboardProps) {
  // Locale state
  const [locale] = React.useState<"en" | "th">(() => {
    if (typeof window === "undefined") return initialLocale
    try {
      const stored = localStorage.getItem("pakdeepan_locale") as "en" | "th" | null
      if (stored === "th" || stored === "en") return stored
    } catch {
      // Ignore
    }
    return initialLocale
  })

  const isTh = locale === "th"

  // Quick News Editor modal state
  const [editingArticle, setEditingArticle] = React.useState<any | null>(null)
  const [isEditorOpen, setIsEditorOpen] = React.useState(false)

  const newsCount = data.news?.length || 0
  const eventsCount = data.events?.length || 0
  const programsCount = data.programs?.length || 4
  const mediaCount = data.mediaCount || data.gallery?.length || 24

  // Extract School Director data (safe string extraction)
  const rawDirectorName = (isTh ? data.siteSettings?.director?.name_th : data.siteSettings?.director?.name_en) ||
    data.siteSettings?.director?.name
  const directorName = extractPlainText(rawDirectorName, isTh ? "th" : "en") ||
    (isTh ? "ดร. เอเลน่า รอสโตวา" : "Dr. Elena Rostova")

  const rawDirectorTitle = (isTh ? data.siteSettings?.director?.title_th : data.siteSettings?.director?.title_en) ||
    data.siteSettings?.director?.title
  const directorTitle = extractPlainText(rawDirectorTitle, isTh ? "th" : "en") ||
    (isTh ? "ผู้อำนวยการโรงเรียน" : "School Director")

  const rawDirectorMessage = (isTh ? data.siteSettings?.director?.message_th : data.siteSettings?.director?.message_en) ||
    data.siteSettings?.director?.message
  const directorMessage = extractPlainText(rawDirectorMessage, isTh ? "th" : "en") ||
    (isTh
      ? "ยินดีต้อนรับสู่โรงเรียนภักดีพรรณ เรามุ่งมั่นส่งเสริมการเรียนรู้ของเด็กทุกคนด้วยความรักและความเอาใจใส่"
      : "Welcome to Pakdeepan School. We are dedicated to nurturing every child with warmth and care.")

  const directorPortraitUrl =
    data.siteSettings?.director?.portrait?.url ||
    data.siteSettings?.director?.portraitUrl ||
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* ─── WELCOME HERO BANNER ─── */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 p-6 sm:p-8 lg:p-10 text-white shadow-xl border border-blue-800/40">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 -mb-10 w-60 h-60 bg-pink-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs sm:text-sm font-semibold text-blue-200">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{isTh ? "ระบบจัดการเว็บไซต์ฉบับปรับปรุงใหม่ 2569" : "Pakdeepan CMS Modern Platform"}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {isTh ? "ยินดีต้อนรับสู่ระบบจัดการเว็บไซต์ โรงเรียนภักดีพรรณ" : "Welcome to Pakdeepan School CMS"}
            </h1>

            <p className="text-base sm:text-lg text-blue-100/90 leading-relaxed font-normal">
              {isTh
                ? "ศูนย์กลางการบริหารจัดการข้อมูลโรงเรียน เนื้อหาสองภาษา (ไทย-อังกฤษ) และภาพถ่ายหน้าเว็บแบบซิงค์สดทันที"
                : "Central hub for school management, bilingual content (Thai-English), and real-time visual assets."}
            </p>
          </div>

          {/* Quick Action in Hero */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/admin/image-manager"
              className="px-5 py-3.5 rounded-2xl bg-white text-blue-900 hover:bg-blue-50 font-bold text-base shadow-lg shadow-black/10 transition-all flex items-center gap-2 group"
            >
              <ImageIcon className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
              <span>{isTh ? "ศูนย์จัดการรูปภาพ" : "Visual Media"}</span>
            </Link>

            <button
              type="button"
              onClick={() => {
                setEditingArticle(null)
                setIsEditorOpen(true)
              }}
              className="px-5 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-base shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              <span>{isTh ? "เขียนข่าวใหม่" : "New Story"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ─── 4 HIGH-CONTRAST EXECUTIVE DASHBOARD CARDS ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* CARD 1: News & Events */}
        <Link
          href="/admin/collections/news"
          className="group p-6 bg-white hover:bg-blue-50/40 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
        >
          <div className="flex items-center justify-between gap-3 mb-4">
            <span className="text-base font-bold text-slate-700">
              {isTh ? "ข่าวสารและกิจกรรม" : "News & Events"}
            </span>
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Newspaper className="w-6 h-6" />
            </div>
          </div>

          <div>
            <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {newsCount + eventsCount}
            </div>
            <p className="text-sm font-semibold text-slate-500 mt-1 flex items-center gap-1.5">
              <span>{isTh ? `ข่าว ${newsCount} • กิจกรรม ${eventsCount}` : `${newsCount} News • ${eventsCount} Events`}</span>
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-sm font-bold text-blue-600">
            <span>{isTh ? "จัดการเนื้อหาข่าว" : "Manage Articles"}</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* CARD 2: Academic Programs */}
        <Link
          href="/admin/collections/programs"
          className="group p-6 bg-white hover:bg-indigo-50/40 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
        >
          <div className="flex items-center justify-between gap-3 mb-4">
            <span className="text-base font-bold text-slate-700">
              {isTh ? "หลักสูตรการศึกษา" : "Academic Programs"}
            </span>
            <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
          </div>

          <div>
            <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {programsCount}
            </div>
            <p className="text-sm font-semibold text-slate-500 mt-1">
              {isTh ? "เตรียมอนุบาล & อนุบาล 1-3" : "Toddlers & Pre-K to K3"}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-sm font-bold text-indigo-600">
            <span>{isTh ? "แก้ไขข้อมูลหลักสูตร" : "Manage Programs"}</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* CARD 3: Media & Images */}
        <Link
          href="/admin/image-manager"
          className="group p-6 bg-white hover:bg-pink-50/40 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
        >
          <div className="flex items-center justify-between gap-3 mb-4">
            <span className="text-base font-bold text-slate-700">
              {isTh ? "รูปภาพในระบบ" : "Media Assets"}
            </span>
            <div className="w-12 h-12 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <ImageIcon className="w-6 h-6" />
            </div>
          </div>

          <div>
            <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {mediaCount}+
            </div>
            <p className="text-sm font-semibold text-slate-500 mt-1">
              {isTh ? "Hero, สาส์น ผอ., แกลเลอรี" : "Hero, Director, Gallery"}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-sm font-bold text-pink-600">
            <span>{isTh ? "เปลี่ยนภาพแบบสด" : "Open Image Manager"}</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* CARD 4: Live Website Status */}
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="group p-6 bg-white hover:bg-emerald-50/40 rounded-2xl border border-emerald-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
        >
          <div className="flex items-center justify-between gap-3 mb-4">
            <span className="text-base font-bold text-slate-700">
              {isTh ? "สถานะเว็บไซต์ออนไลน์" : "Site Live Status"}
            </span>
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Activity className="w-6 h-6" />
            </div>
          </div>

          <div>
            <div className="text-xl sm:text-2xl font-extrabold text-emerald-700 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>{isTh ? "ออนไลน์ปกติ 100%" : "Live & Online"}</span>
            </div>
            <p className="text-sm font-semibold text-slate-500 mt-1">
              {isTh ? "ระบบซิงค์สดเปิดทำงาน" : "Instant real-time sync"}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-sm font-bold text-emerald-700">
            <span>{isTh ? "เปิดดูเว็บไซต์สด" : "Visit Public Website"}</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </Link>
      </div>

      {/* ─── QUICK ACTIONS HUB ─── */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            {isTh ? "เมนูดำเนินการด่วนสำหรับผู้ดูแลระบบ" : "Quick Actions Hub"}
          </h2>
          <p className="text-base text-slate-500 mt-1">
            {isTh
              ? "เข้าถึงโมดูลสำคัญและจัดการข้อมูลโรงเรียนได้อย่างรวดเร็วโดยตรง"
              : "Direct access to essential school modules and visual settings."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Action 1: News Story */}
          <button
            type="button"
            onClick={() => {
              setEditingArticle(null)
              setIsEditorOpen(true)
            }}
            className="p-5 rounded-2xl bg-blue-50/60 hover:bg-blue-100/70 border border-blue-200/80 text-left transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-3.5 shadow-md shadow-blue-600/20">
              <Plus className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-blue-900 group-hover:text-blue-950">
              {isTh ? "เขียนข่าวสาร/กิจกรรมใหม่" : "Create New Story"}
            </h3>
            <p className="text-sm text-blue-800/80 mt-1 leading-relaxed">
              {isTh ? "เผยแพร่บทความ ข่าวสาร หรือประกาศใหม่ลงเว็บไซต์" : "Publish new school announcements or events."}
            </p>
          </button>

          {/* Action 2: Image Manager */}
          <Link
            href="/admin/image-manager"
            className="p-5 rounded-2xl bg-pink-50/60 hover:bg-pink-100/70 border border-pink-200/80 text-left transition-all group block"
          >
            <div className="w-10 h-10 rounded-xl bg-pink-600 text-white flex items-center justify-center mb-3.5 shadow-md shadow-pink-600/20">
              <ImageIcon className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-pink-900 group-hover:text-pink-950">
              {isTh ? "ศูนย์จัดการรูปภาพหน้าเว็บ" : "Visual Image Manager"}
            </h3>
            <p className="text-sm text-pink-800/80 mt-1 leading-relaxed">
              {isTh ? "เปลี่ยนภาพแบนเนอร์ Hero สาส์น ผอ. และแกลเลอรี" : "Replace hero banners, director portrait & gallery."}
            </p>
          </Link>

          {/* Action 3: Academic Programs */}
          <Link
            href="/admin/collections/programs"
            className="p-5 rounded-2xl bg-indigo-50/60 hover:bg-indigo-100/70 border border-indigo-200/80 text-left transition-all group block"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center mb-3.5 shadow-md shadow-indigo-600/20">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-indigo-900 group-hover:text-indigo-950">
              {isTh ? "จัดการหลักสูตรการศึกษา" : "Manage Programs"}
            </h3>
            <p className="text-sm text-indigo-800/80 mt-1 leading-relaxed">
              {isTh ? "แก้ไขรายละเอียดหลักสูตร อัตราส่วนครู และเกณฑ์อายุ" : "Update curriculum details and age criteria."}
            </p>
          </Link>

          {/* Action 4: Site Settings & Director */}
          <Link
            href="/admin/globals/site-settings"
            className="p-5 rounded-2xl bg-amber-50/60 hover:bg-amber-100/70 border border-amber-200/80 text-left transition-all group block"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center mb-3.5 shadow-md shadow-amber-600/20">
              <Settings className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-amber-900 group-hover:text-amber-950">
              {isTh ? "ตั้งค่าเว็บไซต์และสาส์น ผอ." : "Site Settings & Director"}
            </h3>
            <p className="text-sm text-amber-800/80 mt-1 leading-relaxed">
              {isTh ? "แก้ไขข้อมูลติดต่อ ชื่อโรงเรียน และสารจากผู้อำนวยการ" : "Edit school contact, name, and Director's message."}
            </p>
          </Link>
        </div>
      </div>

      {/* ─── TWO-COLUMN CONTENT SECTION ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (2 Cols): Recent News & Campus Stories */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                {isTh ? "ข่าวสารและกิจกรรมในระบบ" : "News & Campus Life Stories"}
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                {isTh ? "รายการบทความล่าสุดที่แสดงบนเว็บไซต์จริง" : "Latest articles published on the live site"}
              </p>
            </div>

            <Link
              href="/admin/collections/news"
              className="text-sm font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              <span>{isTh ? "ดูข่าวทั้งหมด" : "View All"}</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-4">
            {data.news && data.news.length > 0 ? (
              data.news.slice(0, 4).map((item) => {
                const rawTitle = (isTh ? item.title_th : item.title_en) || item.title
                const title = extractPlainText(rawTitle, isTh ? "th" : "en") || "Untitled"
                const rawExcerpt = (isTh ? item.excerpt_th : item.excerpt_en) || item.excerpt || item.content || item.body
                const excerpt = extractPlainText(rawExcerpt, isTh ? "th" : "en") || ""
                const category = typeof item.category === "string" ? item.category : "campus-life"
                const img = item.imageUrl || item.featuredImage?.url || "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=600&q=80"

                return (
                  <div
                    key={item.id}
                    className="p-4 sm:p-5 rounded-2xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-slate-200 shrink-0">
                        <Image
                          src={img}
                          alt={title}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                      <div className="min-w-0">
                        <span className="inline-block px-2.5 py-0.5 rounded-md bg-blue-100 text-blue-800 font-bold text-xs uppercase tracking-wide mb-1">
                          {category}
                        </span>
                        <h4 className="text-base font-bold text-slate-900 truncate" title={title}>
                          {title}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-500 line-clamp-1 mt-0.5">
                          {excerpt}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingArticle(item)
                          setIsEditorOpen(true)
                        }}
                        className="px-3.5 py-2 bg-white hover:bg-slate-200/80 text-blue-700 border border-slate-200 rounded-xl text-sm font-bold transition-all flex items-center gap-1.5 shadow-2xs"
                      >
                        <Edit3 className="w-4 h-4 text-blue-600" />
                        <span>{isTh ? "แก้ไขเนื้อหา" : "Edit Story"}</span>
                      </button>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="p-8 text-center text-slate-400 font-medium">
                {isTh ? "ยังไม่มีข่าวสารในระบบ" : "No news stories available."}
              </div>
            )}
          </div>
        </div>

        {/* Right Column (1 Col): School Director's Message Live Preview */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{isTh ? "สาส์นผู้อำนวยการ" : "Director's Message"}</span>
              </span>

              <Link
                href="/admin/globals/site-settings"
                className="text-xs font-bold text-blue-600 hover:text-blue-800"
              >
                {isTh ? "แก้ไขข้อความ →" : "Edit →"}
              </Link>
            </div>

            <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-slate-100 shadow-inner">
              <Image
                src={directorPortraitUrl}
                alt={directorName}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 300px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
                <h4 className="text-base font-bold text-white">{directorName}</h4>
                <p className="text-xs text-blue-300 font-medium">{directorTitle}</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-sm text-slate-700 italic leading-relaxed line-clamp-4">
              “{directorMessage}”
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <Link
              href="/admin/image-manager"
              className="w-full py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm transition-colors flex items-center justify-center gap-2"
            >
              <ImageIcon className="w-4 h-4 text-slate-600" />
              <span>{isTh ? "เปลี่ยนรูปถ่ายผู้อำนวยการ" : "Replace Director Photo"}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Embedded News Editor Modal */}
      <NewsArticleEditorModal
        article={editingArticle}
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        locale={locale}
        onSaved={() => {
          setIsEditorOpen(false)
          window.location.reload()
        }}
      />
    </div>
  )
}

export default ExecutiveAdminDashboard

