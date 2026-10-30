"use client"

import React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Image as ImageIcon,
  CalendarDays,
  ExternalLink,
  LogOut,
  Sparkles,
  AlertTriangle,
  Loader2,
  ArrowUpRight,
  Languages,
  Layers,
  GraduationCap,
  Newspaper,
  CheckCircle2,
} from "lucide-react"

// Thai Day and Month names for Buddhist Era formatting
const THAI_DAYS = ["วันอาทิตย์", "วันจันทร์", "วันอังคาร", "วันพุธ", "วันพฤหัสบดี", "วันศุกร์", "วันเสาร์"]
const THAI_MONTHS = [
  "มกราคม",
  "กุมภาพันธ์",
  "มีนาคม",
  "เมษายน",
  "พฤษภาคม",
  "มิถุนายน",
  "กรกฎาคม",
  "สิงหาคม",
  "กันยายน",
  "ตุลาคม",
  "พฤศจิกายน",
  "ธันวาคม",
]

export function AdminNavBanner() {
  const router = useRouter()

  // ─── 1. LANGUAGE STATE (SSR-Safe Initialization) ───
  const [currentLocale, setCurrentLocale] = React.useState<"en" | "th">("th")
  const [fontSize, setFontSize] = React.useState<"normal" | "large" | "xlarge">("normal")
  const [mounted, setMounted] = React.useState(false)

  // Sync client-side preferences after mount to prevent hydration mismatch
  React.useEffect(() => {
    setMounted(true)
    try {
      const storedLocale = localStorage.getItem("pakdeepan_locale") as "en" | "th" | null
      if (storedLocale === "th" || storedLocale === "en") {
        setCurrentLocale(storedLocale)
      } else {
        const cookieMatch = document.cookie.match(/(?:^|;\s*)NEXT_LOCALE=([^;]+)/)
        if (cookieMatch && (cookieMatch[1] === "th" || cookieMatch[1] === "en")) {
          setCurrentLocale(cookieMatch[1] as "en" | "th")
        }
      }
    } catch {
      // Ignore
    }

    try {
      const storedFont = localStorage.getItem("pakdeepan_admin_font_size") as "normal" | "large" | "xlarge" | null
      if (storedFont === "normal" || storedFont === "large" || storedFont === "xlarge") {
        setFontSize(storedFont)
        document.documentElement.setAttribute("data-admin-font-scale", storedFont)
      }
    } catch {
      // Ignore
    }
  }, [])

  const isThai = currentLocale === "th"

  const switchLocale = (newLocale: "en" | "th") => {
    setCurrentLocale(newLocale)
    try {
      localStorage.setItem("pakdeepan_locale", newLocale)
      document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`
      document.documentElement.lang = newLocale
    } catch {
      // Ignore
    }
    window.location.reload()
  }

  const setScale = (scale: "normal" | "large" | "xlarge") => {
    setFontSize(scale)
    try {
      localStorage.setItem("pakdeepan_admin_font_size", scale)
      document.documentElement.setAttribute("data-admin-font-scale", scale)
    } catch {
      // Ignore
    }
  }

  // ─── 3. BILINGUAL DATE FORMATTING ───
  const dateStr = React.useMemo(() => {
    const now = new Date()
    if (isThai) {
      const dName = THAI_DAYS[now.getDay()]
      const dNum = now.getDate()
      const mName = THAI_MONTHS[now.getMonth()]
      const bYear = now.getFullYear() + 543
      return `${dName}ที่ ${dNum} ${mName} พ.ศ. ${bYear}`
    }
    return now.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }, [isThai])

  // ─── 4. LOGOUT MODAL STATE ───
  const [logoutModalOpen, setLogoutModalOpen] = React.useState(false)
  const [isLoggingOut, setIsLoggingOut] = React.useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await fetch("/api/auth/logout", { method: "POST" })
    } catch {
      // Ignore
    }
    try {
      document.cookie = "payload-token=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT"
      localStorage.removeItem("payload-token")
      sessionStorage.clear()
    } catch {
      // Ignore
    }
    router.push("/admin/login")
    window.location.href = "/admin/login"
  }

  return (
    <div className="w-full mb-8 space-y-4" suppressHydrationWarning>
      {/* ─── EXECUTIVE TOP BANNER ─── */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 flex flex-col xl:flex-row xl:items-center justify-between gap-6">
        
        {/* Left: Branding & Subtitle */}
        <div className="flex items-start sm:items-center gap-4">
          <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-slate-900 flex items-center justify-center text-white shadow-md shadow-blue-600/25 shrink-0 font-black text-2xl tracking-tight">
            ภ
          </div>

          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight" suppressHydrationWarning>
                {isThai ? "ระบบจัดการเนื้อหา โรงเรียนภักดีพรรณ" : "Pakdeepan School Content Management"}
              </h2>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200" suppressHydrationWarning>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>{isThai ? "ระบบพร้อมใช้งาน" : "System Active"}</span>
              </span>
            </div>

            <div className="flex items-center gap-2 mt-1 text-sm font-medium text-slate-500 flex-wrap">
              <span className="text-slate-600 font-semibold" suppressHydrationWarning>
                {isThai ? "แผงควบคุมหลัก & ศูนย์สื่อเว็บไซต์" : "Executive Dashboard & Visual Assets"}
              </span>
              <span className="text-slate-300 hidden sm:inline">•</span>
              <span className="inline-flex items-center gap-1.5 text-slate-500" suppressHydrationWarning>
                <CalendarDays className="w-4 h-4 text-blue-600 shrink-0" />
                <span>{dateStr}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Right: Controls & Primary Visual Assets Studio CTA */}
        <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
          
          {/* Accessible Font Scaler */}
          <div
            className="inline-flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 shadow-2xs"
            role="group"
            aria-label="Font size scaler"
            suppressHydrationWarning
          >
            <button
              type="button"
              onClick={() => setScale("normal")}
              title={isThai ? "ขนาดปกติ (100%)" : "Normal Size (100%)"}
              className={`px-2.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                fontSize === "normal"
                  ? "bg-white text-blue-700 shadow-xs border border-slate-200"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
              }`}
            >
              <span suppressHydrationWarning>{isThai ? "ก ปกติ" : "A Normal"}</span>
            </button>
            <button
              type="button"
              onClick={() => setScale("large")}
              title={isThai ? "ขนาดใหญ่ (112%)" : "Large Size (112%)"}
              className={`px-2.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                fontSize === "large"
                  ? "bg-white text-blue-700 shadow-xs border border-slate-200"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
              }`}
            >
              <span suppressHydrationWarning>{isThai ? "ก+ ใหญ่" : "A+ Large"}</span>
            </button>
            <button
              type="button"
              onClick={() => setScale("xlarge")}
              title={isThai ? "ขนาดใหญ่มาก (125%)" : "Extra Large Size (125%)"}
              className={`px-2.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                fontSize === "xlarge"
                  ? "bg-white text-blue-700 shadow-xs border border-slate-200"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
              }`}
            >
              <span suppressHydrationWarning>{isThai ? "ก++ ใหญ่มาก" : "A++ XL"}</span>
            </button>
          </div>

          {/* Bilingual Language Switcher */}
          <div
            className="inline-flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 shadow-2xs gap-0.5"
            role="group"
            aria-label="Language switch"
            suppressHydrationWarning
          >
            <Languages className="w-4 h-4 text-slate-500 ml-1.5 mr-0.5 shrink-0" />
            <button
              type="button"
              onClick={() => switchLocale("th")}
              className={`px-2.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                isThai
                  ? "bg-white text-blue-800 shadow-xs border border-slate-200"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              ไทย
            </button>
            <button
              type="button"
              onClick={() => switchLocale("en")}
              className={`px-2.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                !isThai
                  ? "bg-white text-blue-800 shadow-xs border border-slate-200"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              EN
            </button>
          </div>

          {/* View Live Site */}
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-xs sm:text-sm transition-colors flex items-center gap-1.5 shadow-2xs"
            suppressHydrationWarning
          >
            <ExternalLink className="w-4 h-4 text-blue-600" />
            <span suppressHydrationWarning>{isThai ? "ดูหน้าเว็บจริง" : "View Live Site"}</span>
          </Link>

          {/* PRIMARY CTA: Visual Assets Studio */}
          <Link
            href="/admin/image-manager"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-600/25 flex items-center gap-2 transition-all hover:scale-[1.02]"
            suppressHydrationWarning
          >
            <ImageIcon className="w-4 h-4" />
            <span suppressHydrationWarning>{isThai ? "เปิดศูนย์จัดการรูปภาพ (Visual Assets Studio)" : "Open Visual Assets Studio"}</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>

          {/* Logout Button */}
          <button
            type="button"
            onClick={() => setLogoutModalOpen(true)}
            className="p-2 text-rose-600 hover:bg-rose-50 border border-rose-200 rounded-xl transition-colors"
            title={isThai ? "ออกจากระบบ" : "Log Out"}
            suppressHydrationWarning
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ─── QUICK KPI SHORTCUT CARDS ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" suppressHydrationWarning>
        
        {/* Card 1: Visual Assets */}
        <Link
          href="/admin/image-manager"
          className="bg-white rounded-2xl border border-slate-200/90 p-4.5 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all group flex items-center justify-between"
          suppressHydrationWarning
        >
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block" suppressHydrationWarning>
              {isThai ? "สื่อและรูปภาพทั้งหมด" : "Visual Assets Studio"}
            </span>
            <span className="text-2xl font-black text-slate-900 group-hover:text-blue-600 transition-colors mt-0.5 block" suppressHydrationWarning>
              {isThai ? "24+ ภาพ" : "24+ Images"}
            </span>
            <span className="text-xs text-blue-600 font-semibold mt-1 inline-flex items-center gap-1" suppressHydrationWarning>
              <span suppressHydrationWarning>{isThai ? "จัดการรูปภาพทุกจุด ↗" : "Manage all visual assets ↗"}</span>
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
            <ImageIcon className="w-6 h-6" />
          </div>
        </Link>

        {/* Card 2: Academic Programs */}
        <Link
          href="/admin/collections/programs"
          className="bg-white rounded-2xl border border-slate-200/90 p-4.5 shadow-2xs hover:shadow-md hover:border-emerald-300 transition-all group flex items-center justify-between"
          suppressHydrationWarning
        >
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block" suppressHydrationWarning>
              {isThai ? "หลักสูตรการศึกษา" : "Academic Programs"}
            </span>
            <span className="text-2xl font-black text-slate-900 group-hover:text-emerald-600 transition-colors mt-0.5 block" suppressHydrationWarning>
              {isThai ? "4 ระดับชั้น" : "4 Levels"}
            </span>
            <span className="text-xs text-emerald-600 font-semibold mt-1 inline-flex items-center gap-1" suppressHydrationWarning>
              <span suppressHydrationWarning>{isThai ? "เตรียมอนุบาล – อ.3" : "Nursery to K3"}</span>
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
            <GraduationCap className="w-6 h-6" />
          </div>
        </Link>

        {/* Card 3: News & Stories */}
        <Link
          href="/admin/collections/news"
          className="bg-white rounded-2xl border border-slate-200/90 p-4.5 shadow-2xs hover:shadow-md hover:border-amber-300 transition-all group flex items-center justify-between"
          suppressHydrationWarning
        >
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block" suppressHydrationWarning>
              {isThai ? "ข่าวสารและกิจกรรม" : "News & Campus Life"}
            </span>
            <span className="text-2xl font-black text-slate-900 group-hover:text-amber-600 transition-colors mt-0.5 block" suppressHydrationWarning>
              {isThai ? "ข่าวประชาสัมพันธ์" : "Published Stories"}
            </span>
            <span className="text-xs text-amber-600 font-semibold mt-1 inline-flex items-center gap-1" suppressHydrationWarning>
              <span suppressHydrationWarning>{isThai ? "เพิ่ม / แก้ไขบทความ" : "Add / Edit articles"}</span>
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 group-hover:scale-110 transition-transform">
            <Newspaper className="w-6 h-6" />
          </div>
        </Link>

        {/* Card 4: Site Settings */}
        <Link
          href="/admin/globals/site-settings"
          className="bg-white rounded-2xl border border-slate-200/90 p-4.5 shadow-2xs hover:shadow-md hover:border-purple-300 transition-all group flex items-center justify-between"
          suppressHydrationWarning
        >
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block" suppressHydrationWarning>
              {isThai ? "ตั้งค่าระบบและโรงเรียน" : "Site & School Settings"}
            </span>
            <span className="text-2xl font-black text-slate-900 group-hover:text-purple-600 transition-colors mt-0.5 block" suppressHydrationWarning>
              {isThai ? "ข้อมูลทั่วไป" : "General Config"}
            </span>
            <span className="text-xs text-purple-600 font-semibold mt-1 inline-flex items-center gap-1" suppressHydrationWarning>
              <span suppressHydrationWarning>{isThai ? "ข้อมูลติดต่อ & สาส์น ผอ." : "Contact & Director"}</span>
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform">
            <Sparkles className="w-6 h-6" />
          </div>
        </Link>

      </div>

      {/* ─── LOGOUT CONFIRMATION MODAL ─── */}
      {logoutModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200"
        >
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-md p-6 sm:p-8 animate-in zoom-in-95 duration-200 text-center">
            
            <div className="w-16 h-16 rounded-2xl bg-rose-50 border border-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4 shadow-inner">
              <AlertTriangle className="w-8 h-8 text-rose-600" />
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-2">
              {isThai ? "ยืนยันการออกจากระบบ?" : "Confirm Log Out?"}
            </h3>

            <p className="text-base text-slate-600 leading-relaxed mb-6">
              {isThai
                ? "คุณต้องการออกจากระบบจัดการเว็บไซต์ โรงเรียนภักดีพรรณ หรือไม่? ข้อมูลที่ยังไม่ได้บันทึกอาจสูญหาย"
                : "Are you sure you want to log out of the Pakdeepan School CMS? Any unsaved changes may be lost."}
            </p>

            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setLogoutModalOpen(false)}
                disabled={isLoggingOut}
                className="px-5 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-bold text-base transition-colors"
              >
                {isThai ? "ยกเลิก" : "Cancel"}
              </button>

              <button
                type="button"
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-base shadow-md shadow-rose-600/30 transition-all flex items-center gap-2"
              >
                {isLoggingOut ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>{isThai ? "กำลังออกจากระบบ..." : "Logging out..."}</span>
                  </>
                ) : (
                  <>
                    <LogOut className="w-5 h-5" />
                    <span>{isThai ? "ยืนยันออกจากระบบ" : "Yes, Log Out"}</span>
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

export default AdminNavBanner
