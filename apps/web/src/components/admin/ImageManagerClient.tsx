"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Layers,
  Sparkles,
  Search,
  Copy,
  Check,
  Trash2,
  ExternalLink,
  ArrowLeft,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  X,
  GraduationCap,
  Newspaper,
  Calendar,
  Eye,
  SlidersHorizontal,
  FolderOpen,
  HelpCircle,
  Maximize2,
  UploadCloud,
} from "lucide-react"
import { ImageUploader } from "@/components/admin/ImageUploader"

export interface ImageManagerClientProps {
  initialLocale?: "en" | "th"
  siteSettings: any
  homePage: any
  aboutPage: any
  programs: any[]
  news: any[]
  events: any[]
  gallery: any[]
}

interface MediaCardItem {
  id: string
  labelEn: string
  labelTh: string
  descriptionEn: string
  descriptionTh: string
  category: "site" | "director" | "programs" | "news" | "events" | "gallery"
  targetType: "global" | "collection"
  targetSlug: string
  docId?: string | number
  fieldName: string
  imageUrl?: string
  mediaId?: string | number
  aspectRatio: "landscape" | "portrait" | "square" | "video"
  badgeEn: string
  badgeTh: string
}

export function ImageManagerClient({
  initialLocale = "en",
  siteSettings,
  homePage,
  aboutPage,
  programs = [],
  news = [],
  events = [],
  gallery = [],
}: ImageManagerClientProps) {
  const router = useRouter()

  // Locale state
  const [locale, setLocale] = React.useState<"en" | "th">(() => {
    if (typeof window === "undefined") return initialLocale
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
    return initialLocale
  })

  const isTh = locale === "th"

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

  // Active Filter & Search State
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all")
  const [searchQuery, setSearchQuery] = React.useState<string>("")
  const [activeModalItem, setActiveModalItem] = React.useState<MediaCardItem | null>(null)
  const [copiedId, setCopiedId] = React.useState<string | null>(null)
  const [confirmDeleteId, setConfirmDeleteId] = React.useState<string | null>(null)
  const [toast, setToast] = React.useState<{ message: string; type: "success" | "error" } | null>(null)

  // Auto-dismiss toast
  React.useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3500)
      return () => clearTimeout(timer)
    }
  }, [toast])

  // Build Unified Media Catalog
  const mediaItems: MediaCardItem[] = React.useMemo(() => {
    const list: MediaCardItem[] = []

    // 1. SITE SETTINGS & HERO
    list.push({
      id: "site-logo",
      labelEn: "Official School Logo",
      labelTh: "ตราสัญลักษณ์และโลโก้ทางการ",
      descriptionEn: "Sticky navigation header and site-wide footer emblem.",
      descriptionTh: "แสดงในแถบเมนูด้านบนและส่วนท้ายของทุกหน้า",
      category: "site",
      targetType: "global",
      targetSlug: "site-settings",
      fieldName: "logo",
      imageUrl: siteSettings?.logo?.url || "/images/pakdeepan-logo.png",
      mediaId: siteSettings?.logo?.id,
      aspectRatio: "square",
      badgeEn: "Branding",
      badgeTh: "ตราสัญลักษณ์",
    })

    list.push({
      id: "hero-bg",
      labelEn: "Hero Ambient Background",
      labelTh: "ภาพพื้นหลัง Hero แบนเนอร์",
      descriptionEn: "High-resolution background atmosphere for scrollytelling.",
      descriptionTh: "ภาพบรรยากาศขนาดใหญ่ด้านหลังหัวข้อหลักหน้าแรก",
      category: "site",
      targetType: "global",
      targetSlug: "home-page",
      fieldName: "heroBackgroundImage",
      imageUrl: homePage?.heroBackgroundImage?.url,
      mediaId: homePage?.heroBackgroundImage?.id,
      aspectRatio: "video",
      badgeEn: "Hero Banner",
      badgeTh: "แบนเนอร์หน้าแรก",
    })

    list.push({
      id: "hero-video-poster",
      labelEn: "Hero Video Poster Fallback",
      labelTh: "ภาพปกวิดีโอแอนิเมชันตราโรงเรียน",
      descriptionEn: "Poster graphic displayed while logo video loads.",
      descriptionTh: "ภาพปกที่แสดงก่อนวิดีโอตราสัญลักษณ์จะเล่นสมบูรณ์",
      category: "site",
      targetType: "global",
      targetSlug: "home-page",
      fieldName: "heroVideoPoster",
      imageUrl: homePage?.heroVideoPoster?.url || "/videos/pakdeepan-logo-poster.webp",
      mediaId: homePage?.heroVideoPoster?.id,
      aspectRatio: "square",
      badgeEn: "Video Poster",
      badgeTh: "ภาพปกวิดีโอ",
    })

    list.push({
      id: "home-philosophy",
      labelEn: "Philosophy Feature Photo",
      labelTh: "ภาพประกอบปรัชญาโรงเรียน",
      descriptionEn: "Large photography card in 'More than a school' section.",
      descriptionTh: "ภาพประกอบในส่วน 'มากกว่าโรงเรียน คือรากฐานของชีวิต'",
      category: "site",
      targetType: "global",
      targetSlug: "home-page",
      fieldName: "philosophyImage",
      imageUrl:
        homePage?.philosophyImage?.url ||
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop",
      mediaId: homePage?.philosophyImage?.id,
      aspectRatio: "landscape",
      badgeEn: "Philosophy",
      badgeTh: "ปรัชญาโรงเรียน",
    })

    list.push({
      id: "home-cta-1",
      labelEn: "CTA Polaroid 1 (Left)",
      labelTh: "โพลารอยด์รับสมัคร 1 (ซ้าย)",
      descriptionEn: "Tilted polaroid card in home admissions banner.",
      descriptionTh: "ภาพโพลารอยด์เอียงซ้ายในแถบรับสมัครท้ายหน้าแรก",
      category: "site",
      targetType: "global",
      targetSlug: "home-page",
      fieldName: "ctaPolaroid1",
      imageUrl: homePage?.ctaPolaroid1?.url,
      mediaId: homePage?.ctaPolaroid1?.id,
      aspectRatio: "square",
      badgeEn: "Admissions CTA",
      badgeTh: "การรับสมัคร",
    })

    list.push({
      id: "home-cta-2",
      labelEn: "CTA Polaroid 2 (Center)",
      labelTh: "โพลารอยด์รับสมัคร 2 (กลาง)",
      descriptionEn: "Center straight polaroid in admissions banner.",
      descriptionTh: "ภาพโพลารอยด์ตรงกลางในแถบรับสมัครท้ายหน้าแรก",
      category: "site",
      targetType: "global",
      targetSlug: "home-page",
      fieldName: "ctaPolaroid2",
      imageUrl: homePage?.ctaPolaroid2?.url,
      mediaId: homePage?.ctaPolaroid2?.id,
      aspectRatio: "square",
      badgeEn: "Admissions CTA",
      badgeTh: "การรับสมัคร",
    })

    list.push({
      id: "home-cta-3",
      labelEn: "CTA Polaroid 3 (Right)",
      labelTh: "โพลารอยด์รับสมัคร 3 (ขวา)",
      descriptionEn: "Tilted polaroid card in admissions banner.",
      descriptionTh: "ภาพโพลารอยด์เอียงขวาในแถบรับสมัครท้ายหน้าแรก",
      category: "site",
      targetType: "global",
      targetSlug: "home-page",
      fieldName: "ctaPolaroid3",
      imageUrl: homePage?.ctaPolaroid3?.url,
      mediaId: homePage?.ctaPolaroid3?.id,
      aspectRatio: "square",
      badgeEn: "Admissions CTA",
      badgeTh: "การรับสมัคร",
    })

    // 2. SCHOOL DIRECTOR & ABOUT
    list.push({
      id: "director-portrait",
      labelEn: "School Director Portrait",
      labelTh: "ภาพถ่ายผู้อำนวยการโรงเรียน",
      descriptionEn: "Official formal portrait for Director's Message.",
      descriptionTh: "ภาพถ่ายทางการแสดงคู่กับสาส์นจากผู้อำนวยการโรงเรียน",
      category: "director",
      targetType: "global",
      targetSlug: "about-page",
      fieldName: "principalPhoto",
      imageUrl:
        aboutPage?.principalPhoto?.url ||
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
      mediaId: aboutPage?.principalPhoto?.id,
      aspectRatio: "portrait",
      badgeEn: "School Director",
      badgeTh: "ผู้อำนวยการโรงเรียน",
    })

    list.push({
      id: "about-hero-bg",
      labelEn: "About Page Hero Backdrop",
      labelTh: "ภาพพื้นหลังหน้าเกี่ยวกับเรา",
      descriptionEn: "Edge-to-edge photography behind 'Our Story' section.",
      descriptionTh: "ภาพบรรยากาศโรงเรียนด้านหลังหัวข้อ 'เรื่องราวของเรา'",
      category: "director",
      targetType: "global",
      targetSlug: "about-page",
      fieldName: "heroImage",
      imageUrl:
        aboutPage?.heroImage?.url ||
        "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1600&auto=format&fit=crop",
      mediaId: aboutPage?.heroImage?.id,
      aspectRatio: "landscape",
      badgeEn: "About Hero",
      badgeTh: "เกี่ยวกับเรา",
    })

    list.push({
      id: "about-history",
      labelEn: "Heritage & History Archive",
      labelTh: "ภาพถ่ายประวัติความเป็นมา",
      descriptionEn: "Heritage photo displayed with the school founding timeline.",
      descriptionTh: "ภาพถ่ายประวัติศาสตร์แสดงคู่กับเส้นทางความเป็นมาของโรงเรียน",
      category: "director",
      targetType: "global",
      targetSlug: "about-page",
      fieldName: "historyImage",
      imageUrl:
        aboutPage?.historyImage?.url ||
        "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop",
      mediaId: aboutPage?.historyImage?.id,
      aspectRatio: "landscape",
      badgeEn: "History",
      badgeTh: "ประวัติศาสตร์",
    })

    // 3. ACADEMIC PROGRAMS
    programs.forEach((prog) => {
      list.push({
        id: `program-${prog.id}`,
        labelEn: prog.title || "Academic Program",
        labelTh: prog.title_th || prog.title || "หลักสูตรการศึกษา",
        descriptionEn: `Curriculum card cover for ${prog.level || "Early Years"}`,
        descriptionTh: `ภาพหน้าปกหลักสูตรระดับชั้น ${prog.level || "ปฐมวัย"}`,
        category: "programs",
        targetType: "collection",
        targetSlug: "programs",
        docId: prog.id,
        fieldName: "featuredImage",
        imageUrl: prog.featuredImage?.url,
        mediaId: prog.featuredImage?.id,
        aspectRatio: "landscape",
        badgeEn: "Program",
        badgeTh: "หลักสูตร",
      })
    })

    // 4. NEWS ARTICLES
    news.forEach((item) => {
      list.push({
        id: `news-${item.id}`,
        labelEn: item.title || "News Article",
        labelTh: item.title_th || item.title || "ข่าวประชาสัมพันธ์",
        descriptionEn: item.category || "Campus Announcement",
        descriptionTh: item.category || "ข่าวสารและประกาศ",
        category: "news",
        targetType: "collection",
        targetSlug: "news",
        docId: item.id,
        fieldName: "featuredImage",
        imageUrl: item.featuredImage?.url,
        mediaId: item.featuredImage?.id,
        aspectRatio: "landscape",
        badgeEn: "News",
        badgeTh: "ข่าวสาร",
      })
    })

    // 5. EVENTS
    events.forEach((evt) => {
      list.push({
        id: `event-${evt.id}`,
        labelEn: evt.title || "Campus Event",
        labelTh: evt.title_th || evt.title || "กิจกรรมโรงเรียน",
        descriptionEn: evt.date || "Upcoming Calendar Highlight",
        descriptionTh: evt.date || "ปฏิทินกิจกรรมโรงเรียน",
        category: "events",
        targetType: "collection",
        targetSlug: "events",
        docId: evt.id,
        fieldName: "coverImage",
        imageUrl: evt.coverImage?.url,
        mediaId: evt.coverImage?.id,
        aspectRatio: "landscape",
        badgeEn: "Event",
        badgeTh: "กิจกรรม",
      })
    })

    // 6. GALLERY
    gallery.forEach((pic) => {
      list.push({
        id: `gallery-${pic.id}`,
        labelEn: pic.title || "Gallery Photo",
        labelTh: pic.title_th || pic.title || "ภาพถ่ายแกลเลอรี",
        descriptionEn: pic.category || "Campus Facilities",
        descriptionTh: pic.category || "สิ่งอำนวยความสะดวก",
        category: "gallery",
        targetType: "collection",
        targetSlug: "gallery-images",
        docId: pic.id,
        fieldName: "image",
        imageUrl: pic.image?.url,
        mediaId: pic.image?.id,
        aspectRatio: "square",
        badgeEn: "Gallery",
        badgeTh: "แกลเลอรี",
      })
    })

    return list
  }, [siteSettings, homePage, aboutPage, programs, news, events, gallery])

  // Filter items
  const filteredItems = React.useMemo(() => {
    return mediaItems.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" ||
        item.category === selectedCategory ||
        (selectedCategory === "news-events" && (item.category === "news" || item.category === "events"))

      const query = searchQuery.toLowerCase().trim()
      const matchesQuery =
        !query ||
        item.labelEn.toLowerCase().includes(query) ||
        item.labelTh.toLowerCase().includes(query) ||
        item.fieldName.toLowerCase().includes(query) ||
        item.targetSlug.toLowerCase().includes(query)

      return matchesCategory && matchesQuery
    })
  }, [mediaItems, selectedCategory, searchQuery])

  // Stats calculation
  const totalAssets = mediaItems.length
  const configuredAssets = mediaItems.filter((m) => !!m.imageUrl).length

  // Quick Copy URL
  const handleCopy = async (id: string, url?: string) => {
    if (!url) return
    try {
      await navigator.clipboard.writeText(url)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch {
      // Fallback
    }
  }

  // Quick Delete from Card
  const handleDeleteCard = async (item: MediaCardItem) => {
    if (confirmDeleteId !== item.id) {
      setConfirmDeleteId(item.id)
      return
    }

    try {
      const res = await fetch("/api/admin/update-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetType: item.targetType,
          targetSlug: item.targetSlug,
          id: item.docId,
          fieldName: item.fieldName,
          clear: true,
        }),
      })

      const data = await res.json()
      if (!data.success) {
        throw new Error(data.error || "Failed to remove image")
      }

      setConfirmDeleteId(null)
      router.refresh()
      setToast({
        message: isTh ? "ลบรูปภาพและอัปเดตเว็บไซต์เรียบร้อยแล้ว" : "Image removed from live site.",
        type: "success",
      })
    } catch (err: any) {
      setToast({
        message: err?.message || (isTh ? "ไม่สามารถลบรูปภาพได้" : "Failed to delete image."),
        type: "error",
      })
    }
  }

  // Badge Color Helper
  const getBadgeClass = (category: string) => {
    switch (category) {
      case "site":
        return "bg-blue-50 text-[#1e3a8a] border-blue-200"
      case "director":
        return "bg-sky-50 text-sky-700 border-sky-200"
      case "programs":
        return "bg-amber-50 text-amber-800 border-amber-200"
      case "news":
      case "events":
        return "bg-purple-50 text-purple-700 border-purple-200"
      case "gallery":
        return "bg-emerald-50 text-emerald-700 border-emerald-200"
      default:
        return "bg-slate-100 text-slate-700 border-slate-200"
    }
  }

  return (
    <div className="min-h-screen bg-slate-50/60 text-slate-900 pb-24 font-sans">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div
            className={`px-4 py-3 rounded-2xl text-xs font-bold shadow-lg flex items-center gap-3 border ${
              toast.type === "success"
                ? "bg-slate-900 text-white border-slate-800"
                : "bg-rose-600 text-white border-rose-700"
            }`}
          >
            {toast.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <AlertCircle className="w-4 h-4 text-white" />
            )}
            <span>{toast.message}</span>
            <button
              type="button"
              onClick={() => setToast(null)}
              className="p-1 hover:bg-white/20 rounded-lg transition-colors ml-2"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="text-xs font-bold text-slate-600 hover:text-slate-900 px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{isTh ? "แดชบอร์ดแอดมิน" : "Admin Dashboard"}</span>
            </Link>

            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  <span className="text-[#1e3a8a]">{isTh ? "ศูนย์จัดการรูปภาพและสื่อเว็บไซต์" : "Visual Assets & Image Manager"}</span>
                </h1>
                <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {isTh ? "ระบบซิงค์สดเปิดใช้งาน" : "Real-Time Sync Active"}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {isTh
                  ? "จัดการรูปภาพทุกส่วนของเว็บไซต์โรงเรียนภักดีพรรณ อัปโหลดใหม่หรือวางลิงก์ พร้อมอัปเดตหน้าเว็บจริงทันที"
                  : "Manage all visual assets across Pakdeepan School. Replace images via upload or public URL."}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <div
              className="inline-flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold shadow-2xs"
              role="group"
            >
              <button
                type="button"
                onClick={() => switchLocale("en")}
                className={`px-3 py-1.5 rounded-lg transition-all duration-200 flex items-center gap-1.5 ${
                  !isTh
                    ? "bg-[#1e3a8a] text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <span>🇬🇧</span>
                <span>EN</span>
              </button>
              <button
                type="button"
                onClick={() => switchLocale("th")}
                className={`px-3 py-1.5 rounded-lg transition-all duration-200 flex items-center gap-1.5 ${
                  isTh
                    ? "bg-[#1e3a8a] text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <span>🇹🇭</span>
                <span>ไทย</span>
              </button>
            </div>

            {/* View Live Site Button */}
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold px-4 py-2 bg-[#1e3a8a] hover:bg-[#172e6b] text-white rounded-xl transition-all shadow-xs flex items-center gap-1.5"
            >
              <span>{isTh ? "เปิดหน้าเว็บจริง" : "View Live Site"}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Category Navigation Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex gap-2 border-t border-slate-100 overflow-x-auto py-2.5">
          {[
            { id: "all", labelEn: "All Media", labelTh: "สื่อทั้งหมด", count: totalAssets, icon: Layers },
            { id: "site", labelEn: "Site & Hero", labelTh: "แบนเนอร์หน้าแรก", count: mediaItems.filter(m => m.category === 'site').length, icon: Sparkles },
            { id: "director", labelEn: "School Director & About", labelTh: "ผู้อำนวยการและประวัติ", count: mediaItems.filter(m => m.category === 'director').length, icon: CompassIcon },
            { id: "programs", labelEn: "Academic Programs", labelTh: "หลักสูตรการศึกษา", count: programs.length, icon: GraduationCap },
            { id: "news-events", labelEn: "News & Events", labelTh: "ข่าวสารและกิจกรรม", count: news.length + events.length, icon: Newspaper },
            { id: "gallery", labelEn: "School Gallery", labelTh: "แกลเลอรีภาพ", count: gallery.length, icon: ImageIcon },
          ].map((tab) => {
            const Icon = tab.icon
            const active = selectedCategory === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap flex items-center gap-2 ${
                  active
                    ? "bg-[#1e3a8a] text-white shadow-xs"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${active ? "text-white" : "text-slate-400"}`} />
                <span>{isTh ? tab.labelTh : tab.labelEn}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                    active ? "bg-white/20 text-white" : "bg-slate-200/60 text-slate-600"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            )
          })}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        
        {/* KPI & Status Overview Card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-4.5 shadow-2xs flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                {isTh ? "สื่อทั้งหมดในระบบ" : "Total Visual Assets"}
              </p>
              <h3 className="text-2xl font-black text-slate-900 mt-1">{totalAssets}</h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#1e3a8a]">
              <Layers className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-4.5 shadow-2xs flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                {isTh ? "กำหนดรูปภาพแล้ว" : "Images Configured"}
              </p>
              <h3 className="text-2xl font-black text-emerald-600 mt-1">
                {configuredAssets}{" "}
                <span className="text-xs font-semibold text-slate-400">/ {totalAssets}</span>
              </h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-4.5 shadow-2xs flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                {isTh ? "หมวดหมู่เว็บไซต์" : "Website Sections"}
              </p>
              <h3 className="text-2xl font-black text-slate-900 mt-1">6</h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600">
              <FolderOpen className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-4.5 shadow-2xs flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                {isTh ? "การซิงค์ข้อมูล" : "Sync Pipeline"}
              </p>
              <h3 className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 mt-2 inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                {isTh ? "อัปเดตแบบเรียลไทม์" : "Instant ISR Revalidate"}
              </h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Search & Action Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6 bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={
                isTh
                  ? "ค้นหารูปภาพตามชื่อ, ตำแหน่ง หรือหมวดหมู่..."
                  : "Search visual assets by title, field name, or slug..."
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a] transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 px-2">
            <span>
              {isTh
                ? `แสดง ${filteredItems.length} จาก ${mediaItems.length} รายการ`
                : `Showing ${filteredItems.length} of ${mediaItems.length} items`}
            </span>
          </div>
        </div>

        {/* Responsive Media Grid */}
        {filteredItems.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center flex flex-col items-center justify-center">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
              <ImageIcon className="w-7 h-7" />
            </div>
            <h4 className="text-sm font-bold text-slate-800">
              {isTh ? "ไม่พบรูปภาพที่ค้นหา" : "No matching visual assets found"}
            </h4>
            <p className="text-xs text-slate-400 mt-1 max-w-sm">
              {isTh
                ? "ลองเปลี่ยนคำค้นหา หรือเลือกหมวดหมู่อื่นเพื่อดูรายการรูปภาพทั้งหมด"
                : "Try adjusting your search query or switch categories to view other assets."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredItems.map((item) => {
              const label = isTh ? item.labelTh : item.labelEn
              const desc = isTh ? item.descriptionTh : item.descriptionEn
              const badge = isTh ? item.badgeTh : item.badgeEn
              const hasImage = !!item.imageUrl

              const aspectStyle =
                item.aspectRatio === "portrait"
                  ? "aspect-[3/4]"
                  : item.aspectRatio === "square"
                  ? "aspect-square"
                  : "aspect-video"

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-xs hover:shadow-md border border-slate-200/90 overflow-hidden group transition-all duration-300 flex flex-col"
                >
                  {/* Image Container with Zoom & Hover Overlay */}
                  <div className={`w-full ${aspectStyle} relative overflow-hidden bg-slate-100 flex items-center justify-center group/img`}>
                    {hasImage ? (
                      <img
                        src={item.imageUrl}
                        alt={label}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center p-4 text-center text-slate-400">
                        <ImageIcon className="w-8 h-8 text-slate-300 mb-1" />
                        <span className="text-[11px] font-semibold text-slate-400">
                          {isTh ? "ยังไม่มีรูปภาพ" : "No Image"}
                        </span>
                      </div>
                    )}

                    {/* Top Badges */}
                    <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none z-10">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-lg border shadow-2xs backdrop-blur-md ${getBadgeClass(
                          item.category
                        )}`}
                      >
                        {badge}
                      </span>
                      <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-black/50 text-white backdrop-blur-md">
                        {item.aspectRatio === "portrait"
                          ? "3:4"
                          : item.aspectRatio === "square"
                          ? "1:1"
                          : "16:9"}
                      </span>
                    </div>

                    {/* Hover Overlay with Action Pill */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 z-10">
                      <button
                        type="button"
                        onClick={() => setActiveModalItem(item)}
                        className="w-full py-2 bg-white hover:bg-slate-100 text-slate-900 rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5"
                      >
                        <UploadCloud className="w-3.5 h-3.5 text-[#1e3a8a]" />
                        <span>{isTh ? "เปลี่ยนรูปภาพนี้" : "Replace Image"}</span>
                      </button>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <h4 className="text-xs font-extrabold text-slate-900 truncate" title={label}>
                          {label}
                        </h4>
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed mb-3">
                        {desc}
                      </p>
                    </div>

                    {/* Field identifier badge */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                      <span className="font-mono truncate max-w-[150px]">
                        {item.targetSlug}.{item.fieldName}
                      </span>
                      {hasImage ? (
                        <span className="text-emerald-600 font-semibold flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          {isTh ? "พร้อมใช้งาน" : "Active"}
                        </span>
                      ) : (
                        <span className="text-amber-600 font-semibold">
                          {isTh ? "ยังไม่กำหนด" : "Missing"}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveModalItem(item)}
                      className="px-2.5 py-1.5 text-[11px] font-bold text-[#1e3a8a] hover:bg-blue-100/60 rounded-lg transition-colors flex items-center gap-1"
                    >
                      <UploadCloud className="w-3 h-3" />
                      <span>{isTh ? "เปลี่ยนภาพ" : "Replace"}</span>
                    </button>

                    <div className="flex items-center gap-1">
                      {hasImage && (
                        <button
                          type="button"
                          onClick={() => handleCopy(item.id, item.imageUrl)}
                          className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-200/60 rounded-lg transition-colors"
                          title={isTh ? "คัดลอกลิงก์รูปภาพ" : "Copy URL"}
                        >
                          {copiedId === item.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      )}

                      {hasImage && (
                        <>
                          {confirmDeleteId === item.id ? (
                            <div className="inline-flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() => handleDeleteCard(item)}
                                className="px-2 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded text-[10px] font-bold transition-colors"
                              >
                                {isTh ? "ยืนยัน" : "Confirm"}
                              </button>
                              <button
                                type="button"
                                onClick={() => setConfirmDeleteId(null)}
                                className="px-1.5 py-1 text-slate-500 hover:bg-slate-200 rounded text-[10px] transition-colors"
                              >
                                {isTh ? "ยกเลิก" : "Cancel"}
                              </button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setConfirmDeleteId(item.id)}
                              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                              title={isTh ? "ลบรูปภาพ" : "Delete Image"}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>

      {/* Modern Modal for Replacing Image */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-3xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-100/70 text-[#1e3a8a] flex items-center justify-center">
                  <UploadCloud className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {isTh ? activeModalItem.labelTh : activeModalItem.labelEn}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    {isTh ? activeModalItem.descriptionTh : activeModalItem.descriptionEn}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveModalItem(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body: Embedded ImageUploader */}
            <div className="p-6 overflow-y-auto">
              <ImageUploader
                label={isTh ? activeModalItem.labelTh : activeModalItem.labelEn}
                description={isTh ? activeModalItem.descriptionTh : activeModalItem.descriptionEn}
                targetType={activeModalItem.targetType}
                targetSlug={activeModalItem.targetSlug}
                docId={activeModalItem.docId}
                fieldName={activeModalItem.fieldName}
                initialImageUrl={activeModalItem.imageUrl}
                initialMediaId={activeModalItem.mediaId}
                aspectRatio={activeModalItem.aspectRatio}
                locale={locale}
                onImageUploaded={(res) => {
                  setToast({
                    message: isTh
                      ? "อัปเดตรูปภาพและบันทึกสู่เว็บไซต์จริงเรียบร้อยแล้ว!"
                      : "Image synchronized with live website successfully!",
                    type: "success",
                  })
                  router.refresh()
                  setActiveModalItem(null)
                }}
                onRemove={() => {
                  setToast({
                    message: isTh ? "ลบรูปภาพเรียบร้อยแล้ว" : "Image removed.",
                    type: "success",
                  })
                  router.refresh()
                  setActiveModalItem(null)
                }}
              />
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
              <span className="font-mono text-[10px]">
                {activeModalItem.targetSlug}.{activeModalItem.fieldName}
              </span>
              <button
                type="button"
                onClick={() => setActiveModalItem(null)}
                className="px-4 py-2 bg-slate-200/80 hover:bg-slate-300/80 text-slate-700 font-bold rounded-xl transition-colors"
              >
                {isTh ? "ปิดหน้าต่าง" : "Close"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function CompassIcon(props: any) {
  return <Sparkles {...props} />
}
