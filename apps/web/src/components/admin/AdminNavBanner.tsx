"use client"

import React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Image as ImageIcon,
  CalendarDays,
  ShieldCheck,
  Newspaper,
  GraduationCap,
  Activity,
  Plus,
  ExternalLink,
  Settings,
  LogOut,
  Sparkles,
  AlertTriangle,
  Loader2,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react"
import { NewsArticleEditorModal } from "@/components/admin/NewsArticleEditorModal"

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

  const [currentLocale, setCurrentLocale] = React.useState<"en" | "th">(() => {
    if (typeof window === "undefined") return "th"
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
    return "th"
  })

  // Font Size Scaler
  const [fontSize, setFontSize] = React.useState<"normal" | "large" | "xlarge">(() => {
    if (typeof window === "undefined") return "normal"
    try {
      const stored = localStorage.getItem("pakdeepan_admin_font_size") as "normal" | "large" | "xlarge" | null
      if (stored === "normal" || stored === "large" || stored === "xlarge") return stored
    } catch {
      // Ignore
    }
    return "normal"
  })

  const setScale = (scale: "normal" | "large" | "xlarge") => {
    setFontSize(scale)
    try {
      localStorage.setItem("pakdeepan_admin_font_size", scale)
      document.documentElement.setAttribute("data-admin-font-scale", scale)
    } catch {
      // Ignore
    }
  }

  const switchLocale = (newLocale: "en" | "th") => {
    setCurrentLocale(newLocale)
    try {
      localStorage.setItem("pakdeepan_locale", newLocale)
      document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`
    } catch {
      // Ignore
    }
    window.location.reload()
  }

  const isThai = currentLocale === "th"

  // Current formatted date
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

  // Logout modal state
  const [logoutModalOpen, setLogoutModalOpen] = React.useState(false)
  const [isLoggingOut, setIsLoggingOut] = React.useState(false)

  // Quick News Editor modal
  const [newsEditorOpen, setNewsEditorOpen] = React.useState(false)

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
    <div style={{ marginBottom: "2rem" }}>
      
      {/* ─── STICKY EXECUTIVE TOPBAR / BANNER ─── */}
      <div
        style={{
          padding: "1.25rem 1.75rem",
          borderRadius: "1.25rem",
          background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)",
          color: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1.25rem",
          boxShadow: "0 10px 25px -5px rgba(15, 23, 42, 0.25)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.35rem" }}>
            <h3 style={{ margin: 0, fontSize: "1.35rem", fontWeight: 800, color: "#ffffff", letterSpacing: "-0.01em" }}>
              {isThai ? "ระบบจัดการเว็บไซต์ โรงเรียนภักดีพรรณ" : "Pakdeepan School CMS"}
            </h3>
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                padding: "0.2rem 0.6rem",
                borderRadius: "9999px",
                background: "rgba(16, 185, 129, 0.2)",
                color: "#34d399",
                border: "1px solid rgba(52, 211, 153, 0.4)",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
              }}
            >
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#34d399" }}></span>
              {isThai ? "ระบบซิงค์สดเปิดใช้งาน" : "Real-Time Sync Active"}
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", color: "rgba(255, 255, 255, 0.8)", fontSize: "0.875rem" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
              <CalendarDays style={{ width: "16px", height: "16px", color: "#60a5fa" }} />
              <span>{dateStr || (isThai ? "กำลังโหลดวันที่..." : "Loading date...")}</span>
            </span>
            <span style={{ color: "rgba(255, 255, 255, 0.4)" }}>•</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", color: "#93c5fd" }}>
              <ShieldCheck style={{ width: "16px", height: "16px" }} />
              <span>{isThai ? "ผู้ดูแลระบบโรงเรียน" : "School Administrator"}</span>
            </span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
          
          {/* Font Scaler: ก ปกติ | ก+ ใหญ่ | ก++ ใหญ่มาก */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "0.25rem",
              borderRadius: "0.75rem",
              background: "rgba(255, 255, 255, 0.12)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              gap: "0.2rem",
            }}
            role="group"
            aria-label="Font Size Scaler"
          >
            <button
              type="button"
              onClick={() => setScale("normal")}
              style={{
                padding: "0.35rem 0.65rem",
                borderRadius: "0.5rem",
                fontSize: "0.8rem",
                fontWeight: 700,
                border: "none",
                cursor: "pointer",
                transition: "all 0.2s",
                background: fontSize === "normal" ? "#ffffff" : "transparent",
                color: fontSize === "normal" ? "#1e3a8a" : "rgba(255, 255, 255, 0.85)",
              }}
            >
              ก ปกติ
            </button>
            <button
              type="button"
              onClick={() => setScale("large")}
              style={{
                padding: "0.35rem 0.65rem",
                borderRadius: "0.5rem",
                fontSize: "0.8rem",
                fontWeight: 700,
                border: "none",
                cursor: "pointer",
                transition: "all 0.2s",
                background: fontSize === "large" ? "#ffffff" : "transparent",
                color: fontSize === "large" ? "#1e3a8a" : "rgba(255, 255, 255, 0.85)",
              }}
            >
              ก+ ใหญ่
            </button>
            <button
              type="button"
              onClick={() => setScale("xlarge")}
              style={{
                padding: "0.35rem 0.65rem",
                borderRadius: "0.5rem",
                fontSize: "0.8rem",
                fontWeight: 700,
                border: "none",
                cursor: "pointer",
                transition: "all 0.2s",
                background: fontSize === "xlarge" ? "#ffffff" : "transparent",
                color: fontSize === "xlarge" ? "#1e3a8a" : "rgba(255, 255, 255, 0.85)",
              }}
            >
              ก++ ใหญ่มาก
            </button>
          </div>

          {/* Language Switcher */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "0.25rem",
              borderRadius: "0.75rem",
              background: "rgba(255, 255, 255, 0.12)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
            role="group"
            aria-label="CMS Language Switcher"
          >
            <button
              type="button"
              onClick={() => switchLocale("th")}
              style={{
                padding: "0.35rem 0.75rem",
                borderRadius: "0.5rem",
                fontSize: "0.8rem",
                fontWeight: 700,
                border: "none",
                cursor: "pointer",
                transition: "all 0.2s",
                background: isThai ? "#ffffff" : "transparent",
                color: isThai ? "#1e3a8a" : "rgba(255, 255, 255, 0.85)",
                boxShadow: isThai ? "0 2px 6px rgba(0,0,0,0.15)" : "none",
              }}
            >
              🇹🇭 ไทย
            </button>
            <button
              type="button"
              onClick={() => switchLocale("en")}
              style={{
                padding: "0.35rem 0.75rem",
                borderRadius: "0.5rem",
                fontSize: "0.8rem",
                fontWeight: 700,
                border: "none",
                cursor: "pointer",
                transition: "all 0.2s",
                background: !isThai ? "#ffffff" : "transparent",
                color: !isThai ? "#1e3a8a" : "rgba(255, 255, 255, 0.85)",
                boxShadow: !isThai ? "0 2px 6px rgba(0,0,0,0.15)" : "none",
              }}
            >
              🇬🇧 EN
            </button>
          </div>

          {/* View Live Website Button */}
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "0.75rem",
              background: "rgba(255, 255, 255, 0.12)",
              color: "#ffffff",
              fontWeight: 700,
              fontSize: "0.85rem",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.35rem",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <ExternalLink style={{ width: "15px", height: "15px", color: "#60a5fa" }} />
            <span>{isThai ? "ดูหน้าเว็บ" : "Live Site"}</span>
          </Link>

          {/* Log Out Button */}
          <button
            type="button"
            onClick={() => setLogoutModalOpen(true)}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "0.75rem",
              background: "rgba(244, 63, 94, 0.2)",
              color: "#fecdd3",
              fontWeight: 700,
              fontSize: "0.85rem",
              border: "1px solid rgba(244, 63, 94, 0.4)",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.35rem",
            }}
          >
            <LogOut style={{ width: "15px", height: "15px", color: "#fda4af" }} />
            <span>{isThai ? "ออกจากระบบ" : "Log Out"}</span>
          </button>
        </div>
      </div>

      {/* ─── 4 EXECUTIVE SUMMARY CARDS ─── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "1rem",
          marginTop: "1.25rem",
        }}
      >
        {/* Card 1: News & Events */}
        <Link
          href="/admin/collections/news"
          style={{
            padding: "1.25rem",
            borderRadius: "1rem",
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            textDecoration: "none",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
            <span style={{ fontSize: "1rem", fontWeight: 700, color: "#334155" }}>
              {isThai ? "ข่าวสารและกิจกรรม" : "News & Events"}
            </span>
            <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "#eff6ff", color: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Newspaper style={{ width: "22px", height: "22px" }} />
            </div>
          </div>
          <div>
            <div style={{ fontSize: "1.75rem", fontWeight: 900, color: "#0f172a" }}>
              3+
            </div>
            <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "#2563eb", marginTop: "0.25rem", display: "flex", alignItems: "center", gap: "0.25rem" }}>
              <span>{isThai ? "จัดการเนื้อหาข่าวสาร →" : "Manage Articles →"}</span>
            </div>
          </div>
        </Link>

        {/* Card 2: Academic Programs */}
        <Link
          href="/admin/collections/programs"
          style={{
            padding: "1.25rem",
            borderRadius: "1rem",
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            textDecoration: "none",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
            <span style={{ fontSize: "1rem", fontWeight: 700, color: "#334155" }}>
              {isThai ? "หลักสูตรการศึกษา" : "Academic Programs"}
            </span>
            <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "#eef2ff", color: "#4f46e5", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <GraduationCap style={{ width: "22px", height: "22px" }} />
            </div>
          </div>
          <div>
            <div style={{ fontSize: "1.75rem", fontWeight: 900, color: "#0f172a" }}>
              4 ระดับ
            </div>
            <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "#4f46e5", marginTop: "0.25rem" }}>
              <span>{isThai ? "เตรียมอนุบาล & อนุบาล 1-3 →" : "Toddlers & K1-K3 →"}</span>
            </div>
          </div>
        </Link>

        {/* Card 3: Media & Images */}
        <Link
          href="/admin/image-manager"
          style={{
            padding: "1.25rem",
            borderRadius: "1rem",
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            textDecoration: "none",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
            <span style={{ fontSize: "1rem", fontWeight: 700, color: "#334155" }}>
              {isThai ? "รูปภาพในระบบ" : "Media Assets"}
            </span>
            <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "#fdf2f8", color: "#db2777", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <ImageIcon style={{ width: "22px", height: "22px" }} />
            </div>
          </div>
          <div>
            <div style={{ fontSize: "1.75rem", fontWeight: 900, color: "#0f172a" }}>
              24+ ภาพ
            </div>
            <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "#db2777", marginTop: "0.25rem" }}>
              <span>{isThai ? "เปลี่ยนภาพแบบซิงค์สด →" : "Open Image Manager →"}</span>
            </div>
          </div>
        </Link>

        {/* Card 4: Site Live Status */}
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: "1.25rem",
            borderRadius: "1rem",
            background: "#ffffff",
            border: "1px solid #a7f3d0",
            textDecoration: "none",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
            <span style={{ fontSize: "1rem", fontWeight: 700, color: "#334155" }}>
              {isThai ? "สถานะเว็บไซต์ออนไลน์" : "Site Live Status"}
            </span>
            <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "#ecfdf5", color: "#059669", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Activity style={{ width: "22px", height: "22px" }} />
            </div>
          </div>
          <div>
            <div style={{ fontSize: "1.35rem", fontWeight: 900, color: "#065f46", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#10b981" }}></span>
              <span>{isThai ? "ออนไลน์ปกติ 100%" : "Live & Online"}</span>
            </div>
            <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "#059669", marginTop: "0.25rem" }}>
              <span>{isThai ? "ระบบซิงค์สดเปิดทำงาน ↗" : "Instant real-time sync ↗"}</span>
            </div>
          </div>
        </Link>
      </div>

      {/* ─── QUICK ACTIONS HUB ─── */}
      <div
        style={{
          marginTop: "1rem",
          padding: "1rem 1.25rem",
          borderRadius: "1rem",
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "0.75rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Sparkles style={{ width: "18px", height: "18px", color: "#3b82f6" }} />
          <span style={{ fontSize: "0.95rem", fontWeight: 700, color: "#1e293b" }}>
            {isThai ? "การดำเนินการด่วน:" : "Quick Actions:"}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
          {/* Action 1: Open Image Manager */}
          <Link
            href="/admin/image-manager"
            style={{
              padding: "0.55rem 1rem",
              borderRadius: "0.75rem",
              background: "#ec4899",
              color: "#ffffff",
              fontWeight: 700,
              fontSize: "0.85rem",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              boxShadow: "0 2px 6px rgba(236, 72, 153, 0.3)",
            }}
          >
            <ImageIcon style={{ width: "15px", height: "15px" }} />
            <span>{isThai ? "ศูนย์จัดการรูปภาพ" : "Visual Media"}</span>
          </Link>

          {/* Action 2: Write Story */}
          <button
            type="button"
            onClick={() => setNewsEditorOpen(true)}
            style={{
              padding: "0.55rem 1rem",
              borderRadius: "0.75rem",
              background: "#2563eb",
              color: "#ffffff",
              fontWeight: 700,
              fontSize: "0.85rem",
              border: "none",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              boxShadow: "0 2px 6px rgba(37, 99, 235, 0.3)",
            }}
          >
            <Plus style={{ width: "15px", height: "15px" }} />
            <span>{isThai ? "เขียนข่าวใหม่" : "Write Story"}</span>
          </button>

          {/* Action 3: Site Settings */}
          <Link
            href="/admin/globals/site-settings"
            style={{
              padding: "0.55rem 1rem",
              borderRadius: "0.75rem",
              background: "#f8fafc",
              color: "#334155",
              fontWeight: 700,
              fontSize: "0.85rem",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              border: "1px solid #cbd5e1",
            }}
          >
            <Settings style={{ width: "15px", height: "15px", color: "#64748b" }} />
            <span>{isThai ? "สาส์น ผอ. & ตั้งค่าเว็บ" : "Director & Settings"}</span>
          </Link>
        </div>
      </div>

      {/* ─── LOGOUT CONFIRMATION MODAL ─── */}
      {logoutModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
            backgroundColor: "rgba(15, 23, 42, 0.75)",
            backdropFilter: "blur(4px)",
          }}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: "1.5rem",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              border: "1px solid #e2e8f0",
              width: "100%",
              maxWidth: "420px",
              padding: "2rem",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "1rem",
                background: "#fef2f2",
                border: "1px solid #fee2e2",
                color: "#e11d48",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1.25rem",
              }}
            >
              <AlertTriangle style={{ width: "28px", height: "28px", color: "#e11d48" }} />
            </div>

            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.35rem", fontWeight: 800, color: "#0f172a" }}>
              {isThai ? "ยืนยันการออกจากระบบ?" : "Confirm Log Out?"}
            </h3>

            <p style={{ margin: "0 0 1.5rem", fontSize: "0.95rem", color: "#475569", lineHeight: 1.6 }}>
              {isThai
                ? "คุณต้องการออกจากระบบจัดการเว็บไซต์ โรงเรียนภักดีพรรณ หรือไม่? ข้อมูลที่ยังไม่ได้บันทึกอาจสูญหาย"
                : "Are you sure you want to log out of the Pakdeepan School CMS? Any unsaved changes may be lost."}
            </p>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem" }}>
              <button
                type="button"
                onClick={() => setLogoutModalOpen(false)}
                disabled={isLoggingOut}
                style={{
                  padding: "0.75rem 1.25rem",
                  borderRadius: "0.75rem",
                  border: "1px solid #cbd5e1",
                  background: "#ffffff",
                  color: "#334155",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  cursor: "pointer",
                }}
              >
                {isThai ? "ยกเลิก" : "Cancel"}
              </button>

              <button
                type="button"
                onClick={handleLogout}
                disabled={isLoggingOut}
                style={{
                  padding: "0.75rem 1.5rem",
                  borderRadius: "0.75rem",
                  border: "none",
                  background: "#e11d48",
                  color: "#ffffff",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  boxShadow: "0 4px 12px rgba(225, 29, 72, 0.3)",
                }}
              >
                {isLoggingOut ? (
                  <>
                    <Loader2 style={{ width: "16px", height: "16px", animation: "spin 1s linear infinite" }} />
                    <span>{isThai ? "กำลังออกจากระบบ..." : "Logging out..."}</span>
                  </>
                ) : (
                  <>
                    <LogOut style={{ width: "16px", height: "16px" }} />
                    <span>{isThai ? "ยืนยันออกจากระบบ" : "Yes, Log Out"}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Embedded News Editor Modal */}
      <NewsArticleEditorModal
        article={null}
        isOpen={newsEditorOpen}
        onClose={() => setNewsEditorOpen(false)}
        locale={currentLocale}
        onSaved={() => {
          setNewsEditorOpen(false)
          window.location.reload()
        }}
      />
    </div>
  )
}

export default AdminNavBanner
