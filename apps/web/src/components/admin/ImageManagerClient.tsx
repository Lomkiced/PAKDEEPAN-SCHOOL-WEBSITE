"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Search,
  Copy,
  Check,
  Trash2,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  X,
  UploadCloud,
  Plus,
  AlertTriangle,
  Loader2,
} from "lucide-react"
import { ImageUploader } from "@/components/admin/ImageUploader"
import { extractPlainText } from "@/lib/richText"

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
  initialLocale = "th",
  siteSettings,
  homePage,
  aboutPage,
  programs = [],
  news = [],
  events = [],
  gallery = [],
}: ImageManagerClientProps) {
  const router = useRouter()

  // Locale state initialized with server initialLocale to guarantee hydration match
  const [locale, setLocale] = React.useState<"en" | "th">(initialLocale)

  React.useEffect(() => {
    try {
      const stored = localStorage.getItem("pakdeepan_locale") as "en" | "th" | null
      if ((stored === "th" || stored === "en") && stored !== initialLocale) {
        setLocale(stored)
      }
    } catch {
      // Ignore
    }

    const handleStorage = (e: StorageEvent) => {
      if (e.key === "pakdeepan_locale" && (e.newValue === "th" || e.newValue === "en")) {
        setLocale(e.newValue as "en" | "th")
      }
    }
    window.addEventListener("storage", handleStorage)
    return () => window.removeEventListener("storage", handleStorage)
  }, [initialLocale])

  const isTh = locale === "th"

  // Active Filter & Search State
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all")
  const [searchQuery, setSearchQuery] = React.useState<string>("")
  const [activeModalItem, setActiveModalItem] = React.useState<MediaCardItem | null>(null)
  const [copiedId, setCopiedId] = React.useState<string | null>(null)
  
  // Safe Delete Modal State
  const [deletingItem, setDeletingItem] = React.useState<MediaCardItem | null>(null)
  const [isDeleting, setIsDeleting] = React.useState(false)

  // Toast State
  const [toast, setToast] = React.useState<{ message: string; type: "success" | "error" } | null>(null)

  // Auto-dismiss toast
  React.useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4000)
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
      descriptionEn: "Admissions banner floating photo left side.",
      descriptionTh: "ภาพถ่ายลอยตัวด้านซ้ายในส่วนเปิดรับสมัคร",
      category: "site",
      targetType: "global",
      targetSlug: "home-page",
      fieldName: "ctaPolaroid1",
      imageUrl:
        homePage?.ctaPolaroid1?.url ||
        "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=600&auto=format&fit=crop",
      mediaId: homePage?.ctaPolaroid1?.id,
      aspectRatio: "square",
      badgeEn: "Admissions CTA",
      badgeTh: "ส่วนรับสมัคร",
    })

    list.push({
      id: "home-cta-2",
      labelEn: "CTA Polaroid 2 (Center)",
      labelTh: "โพลารอยด์รับสมัคร 2 (กลาง)",
      descriptionEn: "Admissions banner floating photo center.",
      descriptionTh: "ภาพถ่ายลอยตัวตรงกลางในส่วนเปิดรับสมัคร",
      category: "site",
      targetType: "global",
      targetSlug: "home-page",
      fieldName: "ctaPolaroid2",
      imageUrl:
        homePage?.ctaPolaroid2?.url ||
        "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=600&auto=format&fit=crop",
      mediaId: homePage?.ctaPolaroid2?.id,
      aspectRatio: "square",
      badgeEn: "Admissions CTA",
      badgeTh: "ส่วนรับสมัคร",
    })

    list.push({
      id: "home-cta-3",
      labelEn: "CTA Polaroid 3 (Right)",
      labelTh: "โพลารอยด์รับสมัคร 3 (ขวา)",
      descriptionEn: "Admissions banner floating photo right side.",
      descriptionTh: "ภาพถ่ายลอยตัวด้านขวาในส่วนเปิดรับสมัคร",
      category: "site",
      targetType: "global",
      targetSlug: "home-page",
      fieldName: "ctaPolaroid3",
      imageUrl:
        homePage?.ctaPolaroid3?.url ||
        "https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=600&auto=format&fit=crop",
      mediaId: homePage?.ctaPolaroid3?.id,
      aspectRatio: "square",
      badgeEn: "Admissions CTA",
      badgeTh: "ส่วนรับสมัคร",
    })

    // 2. SCHOOL DIRECTOR & ABOUT US
    list.push({
      id: "director-portrait",
      labelEn: "School Director Portrait",
      labelTh: "ภาพถ่ายผู้อำนวยการโรงเรียน",
      descriptionEn: "Official executive portrait accompanying the Director's message.",
      descriptionTh: "ภาพถ่ายทางการเคียงคู่สาส์นจากผู้อำนวยการโรงเรียน",
      category: "director",
      targetType: "global",
      targetSlug: "site-settings",
      fieldName: "director.portrait",
      imageUrl:
        siteSettings?.director?.portrait?.url ||
        siteSettings?.director?.portraitUrl ||
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
      mediaId: siteSettings?.director?.portrait?.id,
      aspectRatio: "portrait",
      badgeEn: "School Director",
      badgeTh: "ผู้อำนวยการ",
    })

    list.push({
      id: "about-hero",
      labelEn: "About Page Hero Backdrop",
      labelTh: "ภาพพื้นหลังหน้าเกี่ยวกับเรา",
      descriptionEn: "Edge-to-edge header photograph on 'Our Story'.",
      descriptionTh: "ภาพถ่ายบรรยากาศโรงเรียนด้านหลังหัวข้อ 'เรื่องราวของเรา'",
      category: "director",
      targetType: "global",
      targetSlug: "about-page",
      fieldName: "heroImage",
      imageUrl:
        aboutPage?.heroImage?.url ||
        "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=2000&auto=format&fit=crop",
      mediaId: aboutPage?.heroImage?.id,
      aspectRatio: "video",
      badgeEn: "About Us",
      badgeTh: "เกี่ยวกับเรา",
    })

    list.push({
      id: "about-history",
      labelEn: "School History & Heritage Photo",
      labelTh: "ภาพถ่ายประวัติความเป็นมา",
      descriptionEn: "Archival imagery in the heritage timeline.",
      descriptionTh: "ภาพถ่ายในอดีตแสดงคู่กับเรื่องราวการก่อตั้งโรงเรียน",
      category: "director",
      targetType: "global",
      targetSlug: "about-page",
      fieldName: "historyImage",
      imageUrl:
        aboutPage?.historyImage?.url ||
        "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop",
      mediaId: aboutPage?.historyImage?.id,
      aspectRatio: "landscape",
      badgeEn: "Heritage",
      badgeTh: "ประวัติศาสตร์",
    })

    // 3. ACADEMIC PROGRAMS
    if (programs && programs.length > 0) {
      programs.forEach((prog: any) => {
        const titleEn = extractPlainText(prog.title_en || prog.title, "en") || "Academic Program"
        const titleTh = extractPlainText(prog.title_th || prog.title, "th") || "หลักสูตรการศึกษา"
        const descEn = extractPlainText(prog.description_en || prog.summary || prog.description, "en") || "Curriculum tier preview card."
        const descTh = extractPlainText(prog.description_th || prog.summary || prog.description, "th") || "ภาพตัวอย่างประจำระดับชั้นการศึกษา"

        list.push({
          id: `prog-${prog.id}`,
          labelEn: titleEn,
          labelTh: titleTh,
          descriptionEn: descEn,
          descriptionTh: descTh,
          category: "programs",
          targetType: "collection",
          targetSlug: "programs",
          docId: prog.id,
          fieldName: prog.featuredImage ? "featuredImage" : "image",
          imageUrl: prog.image?.url || prog.imageUrl || prog.featuredImage?.url,
          mediaId: prog.image?.id || prog.featuredImage?.id,
          aspectRatio: "landscape",
          badgeEn: "Curriculum",
          badgeTh: "หลักสูตร",
        })
      })
    } else {
      const defaultPrograms = [
        { key: "toddlers", th: "เตรียมอนุบาล (Toddlers)", en: "Toddlers Program (1-3 yrs)" },
        { key: "pre-k", th: "อนุบาล 1 (Pre-K)", en: "Kindergarten 1 / Pre-K" },
        { key: "k1", th: "อนุบาล 2 (K1)", en: "Kindergarten 2 (K1)" },
        { key: "k2", th: "อนุบาล 3 (K2)", en: "Kindergarten 3 (K2)" },
      ]
      defaultPrograms.forEach((dp, i) => {
        list.push({
          id: `default-prog-${dp.key}`,
          labelEn: dp.en,
          labelTh: dp.th,
          descriptionEn: "Curriculum tier preview image.",
          descriptionTh: "ภาพประจำระดับชั้นการเรียน",
          category: "programs",
          targetType: "collection",
          targetSlug: "programs",
          docId: i + 1,
          fieldName: "featuredImage",
          imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80",
          aspectRatio: "landscape",
          badgeEn: "Curriculum",
          badgeTh: "หลักสูตร",
        })
      })
    }

    // 4. NEWS & ANNOUNCEMENTS
    if (news && news.length > 0) {
      news.forEach((item: any) => {
        const titleEn = extractPlainText(item.title_en || item.title, "en") || "News Article"
        const titleTh = extractPlainText(item.title_th || item.title, "th") || "ข่าวสารประชาสัมพันธ์"
        const descEn = extractPlainText(item.excerpt_en || item.excerpt || item.content || item.body, "en") || "Campus news cover photography."
        const descTh = extractPlainText(item.excerpt_th || item.excerpt || item.content || item.body, "th") || "ภาพหน้าปกข่าวสารและกิจกรรมในโรงเรียน"

        list.push({
          id: `news-${item.id}`,
          labelEn: titleEn,
          labelTh: titleTh,
          descriptionEn: descEn,
          descriptionTh: descTh,
          category: "news",
          targetType: "collection",
          targetSlug: "news",
          docId: item.id,
          fieldName: "featuredImage",
          imageUrl: item.imageUrl || item.featuredImage?.url,
          mediaId: item.featuredImage?.id,
          aspectRatio: "landscape",
          badgeEn: "News & Campus",
          badgeTh: "ข่าวสาร",
        })
      })
    }

    // 5. EVENTS (Ensuring richText Lexical description is safely converted to plain text)
    if (events && events.length > 0) {
      events.forEach((ev: any) => {
        const titleEn = extractPlainText(ev.title_en || ev.title, "en") || "School Event"
        const titleTh = extractPlainText(ev.title_th || ev.title, "th") || "กิจกรรมโรงเรียน"
        const descEn = extractPlainText(ev.description_en || ev.description, "en") || "Upcoming calendar event poster."
        const descTh = extractPlainText(ev.description_th || ev.description, "th") || "ภาพโปสเตอร์กิจกรรมตามปฏิทินโรงเรียน"

        list.push({
          id: `event-${ev.id}`,
          labelEn: titleEn,
          labelTh: titleTh,
          descriptionEn: descEn,
          descriptionTh: descTh,
          category: "events",
          targetType: "collection",
          targetSlug: "events",
          docId: ev.id,
          fieldName: ev.coverImage ? "coverImage" : "image",
          imageUrl: ev.imageUrl || ev.coverImage?.url || ev.image?.url,
          mediaId: ev.coverImage?.id || ev.image?.id,
          aspectRatio: "landscape",
          badgeEn: "Event",
          badgeTh: "กิจกรรม",
        })
      })
    }

    // 6. GALLERY & FACILITIES
    if (gallery && gallery.length > 0) {
      gallery.forEach((g: any, i: number) => {
        const labelEn = extractPlainText(g.title_en || g.title || g.caption_en || g.caption, "en") || `Campus Facility ${i + 1}`
        const labelTh = extractPlainText(g.title_th || g.title || g.caption_th || g.caption, "th") || `บรรยากาศและสิ่งอำนวยความสะดวก ${i + 1}`
        const descEn = extractPlainText(g.description_en || g.description, "en") || "Campus life photo displayed in the interactive grid."
        const descTh = extractPlainText(g.description_th || g.description, "th") || "ภาพถ่ายชีวิตในรั้วโรงเรียนที่แสดงในแกลเลอรี"

        list.push({
          id: `gallery-${g.id || i}`,
          labelEn: labelEn,
          labelTh: labelTh,
          descriptionEn: descEn,
          descriptionTh: descTh,
          category: "gallery",
          targetType: "collection",
          targetSlug: "gallery-images",
          docId: g.id,
          fieldName: "image",
          imageUrl: g.image?.url || g.imageUrl,
          mediaId: g.image?.id,
          aspectRatio: "landscape",
          badgeEn: "Gallery",
          badgeTh: "แกลเลอรี",
        })
      })
    }

    return list
  }, [siteSettings, homePage, aboutPage, programs, news, events, gallery])

  // Filter items based on category and search query
  const filteredItems = React.useMemo(() => {
    return mediaItems.filter((item) => {
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
      const query = searchQuery.toLowerCase().trim()
      if (!query) return matchesCategory

      const matchesSearch =
        item.labelEn.toLowerCase().includes(query) ||
        item.labelTh.toLowerCase().includes(query) ||
        item.descriptionEn.toLowerCase().includes(query) ||
        item.descriptionTh.toLowerCase().includes(query) ||
        item.targetSlug.toLowerCase().includes(query) ||
        item.fieldName.toLowerCase().includes(query)

      return matchesCategory && matchesSearch
    })
  }, [mediaItems, selectedCategory, searchQuery])

  // Quick URL Copy handler
  const handleCopy = (id: string, url?: string) => {
    if (!url) return
    navigator.clipboard.writeText(url)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2500)
    setToast({
      message: isTh ? "คัดลอกลิงก์รูปภาพเรียบร้อยแล้ว!" : "Image URL copied to clipboard!",
      type: "success",
    })
  }

  // Safe Permanent Delete Handler
  const executeDelete = async () => {
    if (!deletingItem) return
    setIsDeleting(true)

    try {
      const res = await fetch("/api/admin/update-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetType: deletingItem.targetType,
          targetSlug: deletingItem.targetSlug,
          docId: deletingItem.docId,
          fieldName: deletingItem.fieldName,
          imageUrl: "",
          mediaId: null,
        }),
      })

      if (!res.ok) throw new Error("Delete failed")

      setToast({
        message: isTh ? "ลบรูปภาพและซิงค์เว็บไซต์เรียบร้อยแล้ว!" : "Image deleted and site synchronized!",
        type: "success",
      })

      setDeletingItem(null)
      router.refresh()
    } catch {
      setToast({
        message: isTh ? "เกิดข้อผิดพลาดในการลบรูปภาพ" : "Failed to delete image.",
        type: "error",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  // Statistics
  const totalAssets = mediaItems.length
  const configuredAssets = mediaItems.filter((m) => !!m.imageUrl).length

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6" suppressHydrationWarning>
      
      {/* Toast Notification Bar */}
      {toast && (
        <div
          role="status"
          className={`p-4 rounded-2xl shadow-lg border flex items-center justify-between text-base font-bold transition-all ${
            toast.type === "success"
              ? "bg-emerald-50 text-emerald-900 border-emerald-300"
              : "bg-rose-50 text-rose-900 border-rose-300"
          }`}
        >
          <div className="flex items-center gap-3">
            {toast.type === "success" ? (
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-6 h-6 text-rose-600 shrink-0" />
            )}
            <span>{toast.message}</span>
          </div>
          <button
            type="button"
            onClick={() => setToast(null)}
            className="p-1 rounded-lg hover:bg-black/5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* KPI & Status Overview Cards (Unified Restrained Palette, Distilled Icons) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Total Assets */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs flex flex-col justify-between">
          <p className="text-xs sm:text-sm font-bold text-slate-600 uppercase tracking-wider">
            {isTh ? "รูปภาพทั้งหมดในระบบ" : "Total Visual Assets"}
          </p>
          <div className="mt-2.5">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">{totalAssets}</h3>
            <p className="text-sm sm:text-base text-slate-600 mt-1.5 font-medium">
              {isTh ? "ครอบคลุมทุกส่วนของเว็บไซต์" : "Across all school sections"}
            </p>
          </div>
        </div>

        {/* Card 2: Configured Assets */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs flex flex-col justify-between">
          <p className="text-xs sm:text-sm font-bold text-slate-600 uppercase tracking-wider">
            {isTh ? "กำหนดภาพเรียบร้อย" : "Configured Assets"}
          </p>
          <div className="mt-2.5">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {configuredAssets} <span className="text-lg sm:text-xl font-medium text-slate-400">/ {totalAssets}</span>
            </h3>
            <p className="text-sm sm:text-base text-slate-600 mt-1.5 font-medium">
              {isTh ? "พร้อมแสดงผลสู่สาธารณะ" : "Live & published to visitors"}
            </p>
          </div>
        </div>

        {/* Card 3: Website Sections */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs flex flex-col justify-between">
          <p className="text-xs sm:text-sm font-bold text-slate-600 uppercase tracking-wider">
            {isTh ? "หมวดหมู่เว็บไซต์" : "Website Sections"}
          </p>
          <div className="mt-2.5">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">6</h3>
            <p className="text-sm sm:text-base text-slate-600 mt-1.5 font-medium">
              {isTh ? "หน้าหลัก, หลักสูตร, ข่าวสาร ฯลฯ" : "Hero, Programs, News, Events..."}
            </p>
          </div>
        </div>

        {/* Card 4: Real-Time Pipeline */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs flex flex-col justify-between">
          <p className="text-xs sm:text-sm font-bold text-slate-600 uppercase tracking-wider">
            {isTh ? "ระบบซิงค์สด" : "Real-Time Pipeline"}
          </p>
          <div className="mt-2.5">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-800 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-full">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>{isTh ? "ทำงานปกติ (ซิงค์สด)" : "Active & Live"}</span>
            </div>
            <p className="text-sm sm:text-base text-slate-600 mt-1.5 font-medium">
              {isTh ? "อัปโหลดแล้วอัปเดตหน้าเว็บทันที" : "Instant updates to live website"}
            </p>
          </div>
        </div>
      </div>

      {/* Category Tabs (Clean Text Pills with Badge Counts, Zero Icon Spam) */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: "all", labelTh: "ทั้งหมด", labelEn: "All Media", count: totalAssets },
          { id: "site", labelTh: "หน้าแรก & โลโก้", labelEn: "Hero & Branding", count: mediaItems.filter((i) => i.category === "site").length },
          { id: "director", labelTh: "สาส์น ผอ. & ประวัติ", labelEn: "Director & Story", count: mediaItems.filter((i) => i.category === "director").length },
          { id: "programs", labelTh: "หลักสูตรการศึกษา", labelEn: "Academic Programs", count: mediaItems.filter((i) => i.category === "programs").length },
          { id: "news", labelTh: "ข่าวสารประชาสัมพันธ์", labelEn: "News & Campus", count: mediaItems.filter((i) => i.category === "news").length },
          { id: "events", labelTh: "กิจกรรมโรงเรียน", labelEn: "School Events", count: mediaItems.filter((i) => i.category === "events").length },
          { id: "gallery", labelTh: "แกลเลอรีภาพ", labelEn: "Photo Gallery", count: mediaItems.filter((i) => i.category === "gallery").length },
        ].map((tab) => {
          const active = selectedCategory === tab.id
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSelectedCategory(tab.id)}
              className={`px-4 sm:px-5 py-2.5 text-sm sm:text-base font-bold rounded-xl transition-all whitespace-nowrap flex items-center gap-2.5 shadow-2xs ${
                active
                  ? "bg-[#1e3a8a] text-white shadow-xs"
                  : "bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-50 border border-slate-200"
              }`}
            >
              <span>{isTh ? tab.labelTh : tab.labelEn}</span>
              <span
                className={`text-xs sm:text-sm px-2.5 py-0.5 rounded-full font-bold ${
                  active ? "bg-white/20 text-white" : "bg-slate-100 text-slate-700"
                }`}
              >
                {tab.count}
              </span>
            </button>
          )
        })}
      </div>

      {/* Search Bar */}
      <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={
              isTh
                ? "ค้นหารูปภาพตามชื่อ, ตำแหน่ง หรือหมวดหมู่..."
                : "Search visual assets by title, field name, or slug..."
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-10 py-3 text-base sm:text-lg bg-slate-50/80 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a] transition-all font-medium text-slate-800 placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 text-sm sm:text-base font-semibold text-slate-600 px-3">
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
          <div className="w-16 h-16 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
            <ImageIcon className="w-8 h-8" />
          </div>
          <h4 className="text-lg sm:text-xl font-bold text-slate-900">
            {isTh ? "ไม่พบรูปภาพที่ค้นหา" : "No matching visual assets found"}
          </h4>
          <p className="text-base text-slate-600 mt-1.5 max-w-sm">
            {isTh
              ? "ลองเปลี่ยนคำค้นหา หรือเลือกหมวดหมู่อื่นเพื่อดูรายการรูปภาพทั้งหมด"
              : "Try adjusting your search query or switch categories to view other assets."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => {
            const label = isTh ? item.labelTh : item.labelEn
            const desc = isTh ? item.descriptionTh : item.descriptionEn
            const badge = isTh ? item.badgeTh : item.badgeEn
            const hasImage = !!item.imageUrl

            const aspectStyle =
              item.aspectRatio === "portrait"
                ? "aspect-3/4"
                : item.aspectRatio === "square"
                ? "aspect-square"
                : item.aspectRatio === "video"
                ? "aspect-video"
                : "aspect-16/10"

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-2xs hover:shadow-xs hover:border-slate-300 transition-all overflow-hidden flex flex-col justify-between group"
              >
                {/* Image Container with hover overlay */}
                <div className={`relative ${aspectStyle} bg-slate-100 overflow-hidden`}>
                  {hasImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.imageUrl}
                      alt={label}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-4 text-slate-400 bg-slate-50/80">
                      <ImageIcon className="w-10 h-10 mb-2 opacity-40 text-slate-400" />
                      <span className="text-sm font-bold text-slate-600">{isTh ? "ยังไม่มีภาพ" : "No Image"}</span>
                      <button
                        type="button"
                        onClick={() => setActiveModalItem(item)}
                        className="mt-3 px-4 py-2 rounded-xl bg-[#1e3a8a] hover:bg-[#1e40af] text-white text-sm font-bold transition-all shadow-2xs flex items-center gap-1.5"
                      >
                        <Plus className="w-4 h-4" />
                        <span>{isTh ? "+ กำหนดรูปภาพ" : "+ Set Image"}</span>
                      </button>
                    </div>
                  )}

                  {/* Floating Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-lg text-xs sm:text-sm font-bold bg-slate-900/80 text-white backdrop-blur-xs shadow-2xs">
                      {badge}
                    </span>
                  </div>

                  {/* Quick Replace Overlay Button */}
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                    <button
                      type="button"
                      onClick={() => setActiveModalItem(item)}
                      className="w-full py-3 bg-white hover:bg-slate-50 text-slate-900 rounded-xl text-base font-bold transition-all shadow-md flex items-center justify-center gap-2"
                    >
                      <UploadCloud className="w-5 h-5 text-[#1e3a8a]" />
                      <span>{isTh ? "เปลี่ยนรูปภาพนี้" : "Replace Image"}</span>
                    </button>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h4 className="text-lg sm:text-xl font-bold text-slate-900 line-clamp-1 leading-snug" title={label}>
                      {label}
                    </h4>
                    <p className="text-sm sm:text-base text-slate-600 line-clamp-2 leading-relaxed mt-1.5">
                      {desc}
                    </p>
                  </div>

                  {/* Field identifier badge */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm text-slate-500 font-medium">
                    <span className="font-mono text-xs sm:text-sm text-slate-500 font-semibold truncate max-w-[150px]">
                      {item.targetSlug}.{item.fieldName}
                    </span>
                    {hasImage ? (
                      <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full text-xs sm:text-sm font-bold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" />
                        {isTh ? "พร้อมใช้งาน" : "Active"}
                      </span>
                    ) : (
                      <span className="text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full text-xs sm:text-sm font-bold">
                        {isTh ? "ยังไม่กำหนด" : "Missing"}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="px-5 py-3.5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {hasImage ? (
                      <button
                        type="button"
                        onClick={() => setActiveModalItem(item)}
                        className="px-4 py-2 text-sm sm:text-base font-bold text-[#1e3a8a] bg-slate-100 hover:bg-slate-200/80 rounded-xl transition-colors flex items-center gap-2 border border-slate-200 shadow-2xs"
                      >
                        <UploadCloud className="w-4 h-4" />
                        <span>{isTh ? "เปลี่ยนภาพ" : "Replace"}</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setActiveModalItem(item)}
                        className="px-4 py-2 text-sm sm:text-base font-bold text-white bg-[#1e3a8a] hover:bg-[#1e40af] rounded-xl transition-colors flex items-center gap-2 shadow-2xs"
                      >
                        <Plus className="w-4 h-4" />
                        <span>{isTh ? "+ กำหนดภาพ" : "+ Set Image"}</span>
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5">
                    {hasImage && (
                      <button
                        type="button"
                        onClick={() => handleCopy(item.id, item.imageUrl)}
                        className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-200/70 rounded-xl transition-colors"
                        title={isTh ? "คัดลอกลิงก์รูปภาพ" : "Copy URL"}
                      >
                        {copiedId === item.id ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    )}

                    {hasImage && (
                      <button
                        type="button"
                        onClick={() => setDeletingItem(item)}
                        className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                        title={isTh ? "ลบรูปภาพนี้" : "Delete Image"}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* ─── MODERN MODAL FOR REPLACING IMAGE ─── */}
      {activeModalItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200"
        >
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="px-6 py-4.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#1e3a8a]/10 text-[#1e3a8a] flex items-center justify-center shrink-0">
                  <UploadCloud className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                    {isTh ? activeModalItem.labelTh : activeModalItem.labelEn}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 mt-0.5">
                    {isTh ? activeModalItem.descriptionTh : activeModalItem.descriptionEn}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveModalItem(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 transition-colors"
              >
                <X className="w-5 h-5" />
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
                    message: isTh ? "อัปโหลดและซิงค์รูปภาพเรียบร้อยแล้ว!" : "Image uploaded and synced successfully!",
                    type: "success",
                  })
                  setActiveModalItem(null)
                  router.refresh()
                }}
                onRemove={() => {
                  setToast({
                    message: isTh ? "ลบรูปภาพเรียบร้อยแล้ว!" : "Image removed successfully!",
                    type: "success",
                  })
                  setActiveModalItem(null)
                  router.refresh()
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* ─── SAFE DELETE CONFIRMATION MODAL ─── */}
      {deletingItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200"
        >
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-md p-6 sm:p-8 animate-in zoom-in-95 duration-200 text-center">
            
            <div className="w-16 h-16 rounded-2xl bg-rose-50 border border-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-5 shadow-inner">
              <AlertTriangle className="w-8 h-8 text-rose-600" />
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-2">
              {isTh ? "ยืนยันการลบรูปภาพ?" : "Confirm Delete Image?"}
            </h3>

            <p className="text-base text-slate-700 font-bold mb-1">
              {isTh ? deletingItem.labelTh : deletingItem.labelEn}
            </p>

            <p className="text-sm text-slate-500 leading-relaxed mb-6">
              {isTh
                ? "การกระทำนี้จะลบรูปภาพนี้ออกจากระบบและหน้าเว็บไซต์จริงทันทีโดยไม่สามารถกู้คืนได้ คุณแน่ใจหรือไม่ว่าต้องการดำเนินการต่อ?"
                : "This action will immediately remove this image from the database and public site. Are you sure you want to proceed?"}
            </p>

            <div className="flex items-center justify-center gap-3 flex-wrap">
              <button
                type="button"
                onClick={() => setDeletingItem(null)}
                disabled={isDeleting}
                className="px-5 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-bold text-base transition-colors"
              >
                {isTh ? "ยกเลิก" : "Cancel"}
              </button>

              <button
                type="button"
                onClick={executeDelete}
                disabled={isDeleting}
                className="px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-base shadow-md shadow-rose-600/30 transition-all flex items-center gap-2"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>{isTh ? "กำลังลบ..." : "Deleting..."}</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-5 h-5" />
                    <span>{isTh ? "ยืนยันการลบรูปภาพ" : "Delete Permanently"}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default ImageManagerClient
