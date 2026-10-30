"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ExternalLink,
  LogOut,
  AlertTriangle,
  Loader2,
  LayoutDashboard,
} from "lucide-react"

export interface AdminAppShellProps {
  children: React.ReactNode
  title?: string
  subtitle?: string
  activePath?: string
  counts?: {
    news?: number
    programs?: number
    events?: number
    gallery?: number
    media?: number
    users?: number
  }
  initialLocale?: "en" | "th"
}

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

export function formatBilingualDate(locale: "en" | "th"): string {
  const now = new Date()
  if (locale === "th") {
    const dayName = THAI_DAYS[now.getDay()]
    const dateNum = now.getDate()
    const monthName = THAI_MONTHS[now.getMonth()]
    const buddhistYear = now.getFullYear() + 543
    return `${dayName}ที่ ${dateNum} ${monthName} พ.ศ. ${buddhistYear}`
  }
  return now.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function AdminAppShell({
  children,
  title,
  subtitle,
  initialLocale = "th",
}: AdminAppShellProps) {
  const router = useRouter()

  // 1. Language state (SSR-Safe Initialization from Server Prop)
  const [locale, setLocale] = React.useState<"en" | "th">(initialLocale)
  const [fontSize, setFontSize] = React.useState<"normal" | "large" | "xlarge">("normal")

  React.useEffect(() => {
    try {
      const stored = localStorage.getItem("pakdeepan_locale") as "en" | "th" | null
      if ((stored === "th" || stored === "en") && stored !== locale) {
        setLocale(stored)
      }
    } catch {
      // Ignore
    }

    try {
      const stored = localStorage.getItem("pakdeepan_admin_font_size") as "normal" | "large" | "xlarge" | null
      if (stored === "normal" || stored === "large" || stored === "xlarge") {
        setFontSize(stored)
        document.documentElement.setAttribute("data-admin-font-scale", stored)
        document.documentElement.style.fontSize = stored === "large" ? "18px" : stored === "xlarge" ? "20px" : "16px"
      }
    } catch {
      // Ignore
    }

    const handleStorage = (e: StorageEvent) => {
      if (e.key === "pakdeepan_admin_font_size" && (e.newValue === "normal" || e.newValue === "large" || e.newValue === "xlarge")) {
        setFontSize(e.newValue)
        document.documentElement.setAttribute("data-admin-font-scale", e.newValue)
        document.documentElement.style.fontSize = e.newValue === "large" ? "18px" : e.newValue === "xlarge" ? "20px" : "16px"
      }
      if (e.key === "pakdeepan_locale" && (e.newValue === "th" || e.newValue === "en")) {
        setLocale(e.newValue)
      }
    }
    window.addEventListener("storage", handleStorage)
    return () => window.removeEventListener("storage", handleStorage)
  }, [locale])

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

  // Set font scale (Scales root HTML font-size so all rem units across the entire app scale dynamically)
  const handleSetFontSize = (scale: "normal" | "large" | "xlarge") => {
    setFontSize(scale)
    try {
      localStorage.setItem("pakdeepan_admin_font_size", scale)
      document.documentElement.setAttribute("data-admin-font-scale", scale)
      document.documentElement.style.fontSize = scale === "large" ? "18px" : scale === "xlarge" ? "20px" : "16px"
    } catch {
      // Ignore
    }
  }

  // 3. Current formatted date
  const currentDateFormatted = React.useMemo(() => formatBilingualDate(locale), [locale])

  // 4. Logout modal state
  const [logoutModalOpen, setLogoutModalOpen] = React.useState(false)
  const [isLoggingOut, setIsLoggingOut] = React.useState(false)

  // 5. Logout handler
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
    <div
      data-admin-font-scale={fontSize}
      className="admin-shell min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 antialiased selection:bg-blue-100 selection:text-blue-900"
      suppressHydrationWarning
    >
      {/* ─── CONSOLIDATED SINGLE STICKY TOPBAR (FULL-WIDTH, NO SIDEBAR) ─── */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-xs px-4 sm:px-6 lg:px-8 py-3.5" suppressHydrationWarning>
        <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-4 flex-wrap">
          
          {/* Left Side: School Badge + Title + Subtitle with Date & Sync Status */}
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-11 h-11 rounded-xl bg-[#1e3a8a] flex items-center justify-center text-white shrink-0 font-bold text-xl tracking-tight shadow-sm">
              ภ
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug truncate" suppressHydrationWarning>
                  {title || (isTh ? "ระบบจัดการรูปภาพและสื่อเว็บไซต์" : "Visual Assets & Media Manager")}
                </h1>
                <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200" suppressHydrationWarning>
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>{isTh ? "ซิงค์สด" : "Live Sync"}</span>
                </span>
              </div>

              <div className="flex items-center gap-2 mt-0.5 text-xs sm:text-sm font-medium text-slate-600 flex-wrap">
                <span className="text-slate-700 font-semibold truncate" suppressHydrationWarning>
                  {subtitle || (isTh ? "อัปโหลดและเปลี่ยนภาพหน้าเว็บแบบซิงค์สดทันที" : "Real-Time Visual Asset Replacement")}
                </span>
                <span className="text-slate-300 hidden md:inline">•</span>
                <span className="hidden md:inline-flex items-center text-slate-500 font-medium" suppressHydrationWarning>
                  <span>{currentDateFormatted}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Right Side Controls (In One Clean Row) */}
          <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
            
            {/* 1. Accessible Font Size Scaler */}
            <div
              className="inline-flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 shadow-2xs"
              role="group"
              aria-label="Font size scaler"
              suppressHydrationWarning
            >
              <button
                type="button"
                onClick={() => handleSetFontSize("normal")}
                title={isTh ? "ขนาดปกติ (100%)" : "Normal Size (100%)"}
                className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                  fontSize === "normal"
                    ? "bg-white text-slate-900 shadow-xs border border-slate-200"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
                }`}
              >
                <span suppressHydrationWarning>{isTh ? "ก ปกติ" : "A Normal"}</span>
              </button>

              <button
                type="button"
                onClick={() => handleSetFontSize("large")}
                title={isTh ? "ขนาดใหญ่ (112.5%)" : "Large Size (112.5%)"}
                className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                  fontSize === "large"
                    ? "bg-white text-slate-900 shadow-xs border border-slate-200"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
                }`}
              >
                <span suppressHydrationWarning>{isTh ? "ก+ ใหญ่" : "A+ Large"}</span>
              </button>

              <button
                type="button"
                onClick={() => handleSetFontSize("xlarge")}
                title={isTh ? "ขนาดใหญ่มาก (125%)" : "Extra Large Size (125%)"}
                className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                  fontSize === "xlarge"
                    ? "bg-white text-slate-900 shadow-xs border border-slate-200"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
                }`}
              >
                <span suppressHydrationWarning>{isTh ? "ก++ ใหญ่มาก" : "A++ XL"}</span>
              </button>
            </div>

            {/* 2. Clean Bilingual Language Switcher (ไทย | EN) */}
            <div
              className="inline-flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 shadow-2xs"
              role="group"
              aria-label="Admin Language Toggle"
              suppressHydrationWarning
            >
              <button
                type="button"
                onClick={() => switchLocale("th")}
                className={`px-2.5 py-1 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                  isTh
                    ? "bg-white text-slate-900 shadow-xs border border-slate-200"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                ไทย
              </button>
              <button
                type="button"
                onClick={() => switchLocale("en")}
                className={`px-2.5 py-1 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                  !isTh
                    ? "bg-white text-slate-900 shadow-xs border border-slate-200"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                EN
              </button>
            </div>

            {/* 3. View Live Site Button */}
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs sm:text-sm transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              <span>{isTh ? "ดูหน้าเว็บจริง" : "View Live Site"}</span>
            </Link>

            {/* 4. Link to Payload CMS Dashboard */}
            <a
              href="/admin"
              onClick={(e) => {
                e.preventDefault()
                window.location.assign("/admin")
              }}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs sm:text-sm transition-colors border border-slate-200 shadow-2xs"
              title={isTh ? "กลับสู่แผงควบคุมระบบหลัก" : "Return to Payload CMS"}
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-slate-500" />
              <span>{isTh ? "แผงควบคุม CMS" : "Payload CMS"}</span>
            </a>

            {/* 5. Log Out Button (Quiet Neutral Ghost) */}
            <button
              type="button"
              onClick={() => setLogoutModalOpen(true)}
              className="px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 shadow-2xs"
              title={isTh ? "ออกจากระบบ" : "Log Out"}
            >
              <LogOut className="w-3.5 h-3.5 text-slate-500" />
              <span>{isTh ? "ออกจากระบบ" : "Log Out"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* ─── FULL-WIDTH MAIN CONTENT AREA (NO SIDEBAR) ─── */}
      <main className="w-full flex-1 bg-slate-50">
        {children}
      </main>

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
              {isTh ? "ยืนยันการออกจากระบบ?" : "Confirm Log Out?"}
            </h3>

            <p className="text-base text-slate-600 leading-relaxed mb-6">
              {isTh
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
                {isTh ? "ยกเลิก" : "Cancel"}
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
                    <span>{isTh ? "กำลังออกจากระบบ..." : "Logging out..."}</span>
                  </>
                ) : (
                  <>
                    <LogOut className="w-5 h-5" />
                    <span>{isTh ? "ยืนยันออกจากระบบ" : "Yes, Log Out"}</span>
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

export default AdminAppShell
