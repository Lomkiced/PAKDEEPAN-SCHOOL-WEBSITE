"use client"

import React from "react"
import { useRouter } from "next/navigation"
import {
  ExternalLink,
  LogOut,
  AlertTriangle,
  Loader2,
  ArrowUpRight,
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

  // Sync client-side preferences after mount to prevent hydration mismatch
  React.useEffect(() => {
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
        document.documentElement.style.fontSize = storedFont === "large" ? "18px" : storedFont === "xlarge" ? "20px" : "16px"
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
    }
    window.addEventListener("storage", handleStorage)
    return () => window.removeEventListener("storage", handleStorage)
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
      document.documentElement.style.fontSize = scale === "large" ? "18px" : scale === "xlarge" ? "20px" : "16px"
    } catch {
      // Ignore
    }
  }

  // ─── 2. BILINGUAL DATE FORMATTING ───
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

  // ─── 3. LOGOUT MODAL STATE ───
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
    <div className="pk-banner-wrapper" suppressHydrationWarning>
      {/* ─── EXECUTIVE TOP BANNER ─── */}
      <div className="pk-banner-top" suppressHydrationWarning>
        
        {/* Left: Branding & Subtitle */}
        <div className="pk-banner-left">
          <div className="pk-banner-logo" title="Pakdeepan School">
            ภ
          </div>

          <div className="pk-banner-titles">
            <div className="pk-banner-title-row">
              <h2 className="pk-banner-title" suppressHydrationWarning>
                {isThai ? "ระบบจัดการเนื้อหา โรงเรียนภักดีพรรณ" : "Pakdeepan School Content Management"}
              </h2>
              <span className="pk-status-badge" suppressHydrationWarning>
                <span className="pk-status-dot" />
                <span>{isThai ? "ระบบออนไลน์" : "System Active"}</span>
              </span>
            </div>

            <div className="pk-banner-sub">
              <span className="pk-banner-sub-label" suppressHydrationWarning>
                {isThai ? "ศูนย์ควบคุมและสื่อเว็บไซต์" : "Executive Dashboard & Visual Studio"}
              </span>
              <span className="pk-banner-sub-sep">•</span>
              <span className="pk-banner-sub-date" suppressHydrationWarning>
                {dateStr}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Controls & Primary Visual Assets Studio CTA */}
        <div className="pk-banner-controls">
          
          {/* Accessible Font Scaler (Segmented Control) */}
          <div
            className="pk-scaler-group"
            role="group"
            aria-label="Font size scaler"
            suppressHydrationWarning
          >
            <button
              type="button"
              onClick={() => setScale("normal")}
              title={isThai ? "ขนาดปกติ (100%)" : "Normal Size (100%)"}
              className={`pk-scaler-btn ${fontSize === "normal" ? "active" : ""}`}
            >
              <span suppressHydrationWarning>{isThai ? "ก ปกติ" : "A Normal"}</span>
            </button>
            <button
              type="button"
              onClick={() => setScale("large")}
              title={isThai ? "ขนาดใหญ่ (112%)" : "Large Size (112%)"}
              className={`pk-scaler-btn ${fontSize === "large" ? "active" : ""}`}
            >
              <span suppressHydrationWarning>{isThai ? "ก+ ใหญ่" : "A+ Large"}</span>
            </button>
            <button
              type="button"
              onClick={() => setScale("xlarge")}
              title={isThai ? "ขนาดใหญ่มาก (125%)" : "Extra Large Size (125%)"}
              className={`pk-scaler-btn ${fontSize === "xlarge" ? "active" : ""}`}
            >
              <span suppressHydrationWarning>{isThai ? "ก++ ใหญ่มาก" : "A++ XL"}</span>
            </button>
          </div>

          {/* Bilingual Language Switcher (Segmented Control) */}
          <div
            className="pk-lang-group"
            role="group"
            aria-label="Language switch"
            suppressHydrationWarning
          >
            <button
              type="button"
              onClick={() => switchLocale("th")}
              className={`pk-lang-btn ${isThai ? "active" : ""}`}
            >
              ไทย
            </button>
            <button
              type="button"
              onClick={() => switchLocale("en")}
              className={`pk-lang-btn ${!isThai ? "active" : ""}`}
            >
              EN
            </button>
          </div>

          {/* View Live Site */}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="pk-btn-link"
            suppressHydrationWarning
          >
            <span suppressHydrationWarning>{isThai ? "ดูหน้าเว็บจริง" : "View Live Site"}</span>
            <ExternalLink className="w-3.5 h-3.5" style={{ width: 14, height: 14 }} />
          </a>

          {/* PRIMARY CTA: Visual Assets Studio */}
          <a
            href="/admin/image-manager"
            className="pk-btn-primary"
            suppressHydrationWarning
          >
            <span suppressHydrationWarning>{isThai ? "ศูนย์จัดการรูปภาพ (Studio)" : "Visual Assets Studio"}</span>
            <ArrowUpRight className="w-4 h-4" style={{ width: 15, height: 15 }} />
          </a>

          {/* Logout Button */}
          <button
            type="button"
            onClick={() => setLogoutModalOpen(true)}
            className="pk-btn-logout"
            title={isThai ? "ออกจากระบบ" : "Log Out"}
            suppressHydrationWarning
          >
            <LogOut className="w-4 h-4" style={{ width: 15, height: 15 }} />
          </button>
        </div>
      </div>

      {/* ─── QUICK KPI SHORTCUT STRIP (UNIFIED, RESTRAINED PALETTE) ─── */}
      <div className="pk-kpi-grid" suppressHydrationWarning>
        
        {/* Card 1: Visual Assets */}
        <a
          href="/admin/image-manager"
          className="pk-kpi-card"
          suppressHydrationWarning
        >
          <div className="pk-kpi-info">
            <span className="pk-kpi-label" suppressHydrationWarning>
              {isThai ? "รูปภาพและสื่อทั้งหมด" : "Visual Assets"}
            </span>
            <span className="pk-kpi-val" suppressHydrationWarning>
              {isThai ? "24+ ภาพ" : "24+ Images"}
            </span>
            <span className="pk-kpi-sub" suppressHydrationWarning>
              <span>{isThai ? "เปิดศูนย์สื่อและภาพถ่าย" : "Open Visual Studio"}</span>
              <ArrowUpRight className="w-3 h-3" style={{ width: 12, height: 12 }} />
            </span>
          </div>
        </a>

        {/* Card 2: Academic Programs */}
        <a
          href="/admin/collections/programs"
          className="pk-kpi-card"
          suppressHydrationWarning
        >
          <div className="pk-kpi-info">
            <span className="pk-kpi-label" suppressHydrationWarning>
              {isThai ? "หลักสูตรการศึกษา" : "Academic Programs"}
            </span>
            <span className="pk-kpi-val" suppressHydrationWarning>
              {isThai ? "4 ระดับชั้น" : "4 Levels"}
            </span>
            <span className="pk-kpi-sub" suppressHydrationWarning>
              <span>{isThai ? "เตรียมอนุบาล – อนุบาล 3" : "Nursery to K3"}</span>
              <ArrowUpRight className="w-3 h-3" style={{ width: 12, height: 12 }} />
            </span>
          </div>
        </a>

        {/* Card 3: News & Stories */}
        <a
          href="/admin/collections/news"
          className="pk-kpi-card"
          suppressHydrationWarning
        >
          <div className="pk-kpi-info">
            <span className="pk-kpi-label" suppressHydrationWarning>
              {isThai ? "ข่าวสารและกิจกรรม" : "News & Campus Life"}
            </span>
            <span className="pk-kpi-val" suppressHydrationWarning>
              {isThai ? "ข่าวประชาสัมพันธ์" : "Published Stories"}
            </span>
            <span className="pk-kpi-sub" suppressHydrationWarning>
              <span>{isThai ? "จัดการเนื้อหาข่าวสาร" : "Manage Articles"}</span>
              <ArrowUpRight className="w-3 h-3" style={{ width: 12, height: 12 }} />
            </span>
          </div>
        </a>

        {/* Card 4: Site Settings */}
        <a
          href="/admin/globals/site-settings"
          className="pk-kpi-card"
          suppressHydrationWarning
        >
          <div className="pk-kpi-info">
            <span className="pk-kpi-label" suppressHydrationWarning>
              {isThai ? "ตั้งค่าระบบและโรงเรียน" : "Site & School Settings"}
            </span>
            <span className="pk-kpi-val" suppressHydrationWarning>
              {isThai ? "ข้อมูลทั่วไป" : "General Config"}
            </span>
            <span className="pk-kpi-sub" suppressHydrationWarning>
              <span>{isThai ? "ข้อมูลติดต่อ & สาส์น ผอ." : "Contact & Director"}</span>
              <ArrowUpRight className="w-3 h-3" style={{ width: 12, height: 12 }} />
            </span>
          </div>
        </a>

      </div>

      {/* ─── LOGOUT CONFIRMATION MODAL ─── */}
      {logoutModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="pk-modal-backdrop"
        >
          <div className="pk-modal-box">
            
            <div className="pk-modal-icon">
              <AlertTriangle className="w-6 h-6" style={{ width: 28, height: 28 }} />
            </div>

            <h3 className="pk-modal-title">
              {isThai ? "ยืนยันการออกจากระบบ?" : "Confirm Log Out?"}
            </h3>

            <p className="pk-modal-desc">
              {isThai
                ? "คุณต้องการออกจากระบบจัดการเว็บไซต์ โรงเรียนภักดีพรรณ หรือไม่? ข้อมูลที่ยังไม่ได้บันทึกอาจสูญหาย"
                : "Are you sure you want to log out of the Pakdeepan School CMS? Any unsaved changes may be lost."}
            </p>

            <div className="pk-modal-actions">
              <button
                type="button"
                onClick={() => setLogoutModalOpen(false)}
                disabled={isLoggingOut}
                className="pk-modal-btn-cancel"
              >
                {isThai ? "ยกเลิก" : "Cancel"}
              </button>

              <button
                type="button"
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="pk-modal-btn-confirm"
              >
                {isLoggingOut ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" style={{ width: 16, height: 16 }} />
                    <span>{isThai ? "กำลังออกจากระบบ..." : "Logging out..."}</span>
                  </>
                ) : (
                  <>
                    <LogOut className="w-4 h-4" style={{ width: 16, height: 16 }} />
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
