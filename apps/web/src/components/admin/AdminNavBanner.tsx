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
  Languages,
  Search,
  Edit3,
  Trash2,
  Eye,
  CheckCircle2,
  X,
  Phone,
  Mail,
  MapPin,
  Clock,
  Layers,
  Save,
  BookOpen,
} from "lucide-react"
import { NewsArticleEditorModal } from "@/components/admin/NewsArticleEditorModal"
import { extractPlainText } from "@/lib/richText"
import { DEFAULT_NEWS_ITEMS } from "@/lib/newsData"

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

type AdminTab = "overview" | "news" | "programs" | "media" | "director"

export function AdminNavBanner() {
  const router = useRouter()

  // ─── 1. LANGUAGE STATE (Single Source of Truth) ───
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

  // ─── 2. FONT SIZE SCALER ───
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

  // ─── 4. ACTIVE WORKSPACE TAB STATE ───
  const [activeTab, setActiveTab] = React.useState<AdminTab>("overview")

  const scrollToWorkspace = (tab: AdminTab) => {
    setActiveTab(tab)
    setTimeout(() => {
      const el = document.getElementById("admin-editor-workspace")
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }, 40)
  }

  // ─── 5. DYNAMIC DATA & STATS ───
  const [newsList, setNewsList] = React.useState<any[]>(DEFAULT_NEWS_ITEMS)
  const [counts, setCounts] = React.useState({ news: 3, programs: 4, media: 24 })
  const [newsCategoryFilter, setNewsCategoryFilter] = React.useState<string>("ALL")
  const [newsSearchQuery, setNewsSearchQuery] = React.useState<string>("")

  // Modals & Forms State
  const [editingNewsArticle, setEditingNewsArticle] = React.useState<any | null>(null)
  const [newsEditorOpen, setNewsEditorOpen] = React.useState(false)
  const [deletingNewsId, setDeletingNewsId] = React.useState<string | number | null>(null)
  const [isDeletingNews, setIsDeletingNews] = React.useState(false)
  const [logoutModalOpen, setLogoutModalOpen] = React.useState(false)
  const [isLoggingOut, setIsLoggingOut] = React.useState(false)
  const [toast, setToast] = React.useState<{ message: string; type: "success" | "error" } | null>(null)

  // Director Form State
  const [directorTab, setDirectorTab] = React.useState<"th" | "en">(isThai ? "th" : "en")
  const [isSavingDirector, setIsSavingDirector] = React.useState(false)
  const [directorForm, setDirectorForm] = React.useState({
    directorName: "Dr. Elena Rostova",
    directorNameTh: "ดร. เอเลน่า รอสโตวา",
    directorTitle: "School Director (Ph.D. in Early Education)",
    directorTitleTh: "ผู้อำนวยการโรงเรียน (ปริญญาเอก สาขาการศึกษาปฐมวัย)",
    directorMessage:
      '"Welcome to a community where every child is seen, heard, and valued. Our dedicated team of international educators is committed to providing an exceptional start to your child\'s lifelong learning journey."',
    directorMessageTh:
      '"ยินดีต้อนรับสู่โรงเรียนอนุบาลภักดีพรรณ เรามุ่งมั่นพัฒนาเด็กๆ ให้เติบโตอย่างมีความสุข มีความอยากรู้อยากเห็น และมีทักษะรอบด้านเพื่อพร้อมสำหรับอนาคต"',
    schoolPhone: "+66 39 123 4567",
    schoolEmail: "admissions@pakdeepan.ac.th",
    schoolAddress: "Chanthaburi, Thailand",
    schoolOfficeHours: "8:00 AM – 4:00 PM (Local Time)",
    directorPortraitUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
  })

  // Load live data from API on mount
  React.useEffect(() => {
    let isMounted = true
    async function loadAdminData() {
      try {
        const res = await fetch("/api/admin/settings")
        if (!res.ok) return
        const json = await res.json()
        if (json.success && isMounted) {
          if (json.news && json.news.length > 0) {
            setNewsList(json.news)
          }
          if (json.counts) {
            setCounts({
              news: json.counts.news || json.news?.length || 3,
              programs: json.counts.programs || 4,
              media: json.counts.media || 24,
            })
          }
          if (json.aboutPage || json.siteSettings) {
            const ab = json.aboutPage || {}
            const st = json.siteSettings || {}
            setDirectorForm((prev) => ({
              ...prev,
              directorName: ab.principalName || prev.directorName,
              directorNameTh: ab.principalName_th || prev.directorNameTh,
              directorTitle: extractPlainText(ab.principalTitle, "en") || prev.directorTitle,
              directorTitleTh: extractPlainText(ab.principalTitle_th || ab.principalTitle, "th") || prev.directorTitleTh,
              directorMessage: extractPlainText(ab.principalMessage, "en") || prev.directorMessage,
              directorMessageTh: extractPlainText(ab.principalMessage_th || ab.principalMessage, "th") || prev.directorMessageTh,
              schoolPhone: st.contact?.phone || prev.schoolPhone,
              schoolEmail: st.contact?.email || prev.schoolEmail,
              schoolAddress: st.contact?.address || prev.schoolAddress,
              schoolOfficeHours: st.officeHours?.hours || prev.schoolOfficeHours,
              directorPortraitUrl:
                ab.principalPhoto?.url || st.director?.portrait?.url || prev.directorPortraitUrl,
            }))
          }
        }
      } catch {
        // Fallback gracefully to seed state
      }
    }
    loadAdminData()
    return () => {
      isMounted = false
    }
  }, [])

  // Auto-dismiss toast
  React.useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4000)
      return () => clearTimeout(timer)
    }
  }, [toast])

  // Logout handler
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

  // Delete News Article handler
  const handleDeleteNews = async (id: string | number) => {
    setIsDeletingNews(true)
    try {
      const res = await fetch(`/api/admin/news?id=${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Delete failed")
      setNewsList((prev) => prev.filter((item) => String(item.id) !== String(id)))
      setCounts((prev) => ({ ...prev, news: Math.max(0, prev.news - 1) }))
      setToast({
        message: isThai ? "ลบข่าวสารและซิงค์หน้าเว็บเรียบร้อยแล้ว!" : "News article deleted and site synced!",
        type: "success",
      })
      setDeletingNewsId(null)
    } catch {
      setToast({
        message: isThai ? "เกิดข้อผิดพลาดในการลบข่าวสาร" : "Failed to delete article",
        type: "error",
      })
    } finally {
      setIsDeletingNews(false)
    }
  }

  // Save Director & Settings Form
  const handleSaveDirectorSettings = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSavingDirector(true)
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          directorName: directorForm.directorName,
          directorNameTh: directorForm.directorNameTh,
          directorTitle: directorForm.directorTitle,
          directorTitleTh: directorForm.directorTitleTh,
          directorMessage: directorForm.directorMessage,
          directorMessageTh: directorForm.directorMessageTh,
          phone: directorForm.schoolPhone,
          email: directorForm.schoolEmail,
          address: directorForm.schoolAddress,
          officeHours: directorForm.schoolOfficeHours,
        }),
      })
      const data = await res.json()
      if (!res.ok || !data.success) throw new Error(data.error || "Save failed")
      setToast({
        message: isThai
          ? "บันทึกข้อมูลสาส์น ผอ. และการตั้งค่าเว็บไซต์เรียบร้อยแล้ว!"
          : "Director message and site settings saved successfully!",
        type: "success",
      })
    } catch (err: any) {
      setToast({
        message: err.message || (isThai ? "เกิดข้อผิดพลาดในการบันทึก" : "Failed to save settings"),
        type: "error",
      })
    } finally {
      setIsSavingDirector(false)
    }
  }

  // Filtered news items
  const filteredNews = newsList.filter((item) => {
    const matchesCat =
      newsCategoryFilter === "ALL" ||
      (item.category && item.category.toLowerCase().includes(newsCategoryFilter.toLowerCase()))
    const title = extractPlainText(isThai ? item.title_th : item.title_en, isThai ? "th" : "en") || item.title || ""
    const query = newsSearchQuery.toLowerCase().trim()
    const matchesSearch = !query || title.toLowerCase().includes(query)
    return matchesCat && matchesSearch
  })

  return (
    <div className="admin-shell" style={{ marginBottom: "2.5rem" }}>
      
      {/* Toast Notification Bar */}
      {toast && (
        <div
          role="status"
          style={{
            position: "fixed",
            bottom: "2rem",
            right: "2rem",
            zIndex: 9999,
            padding: "1rem 1.5rem",
            borderRadius: "1rem",
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)",
            background: toast.type === "success" ? "#065f46" : "#991b1b",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            fontSize: "0.95rem",
            fontWeight: 700,
          }}
        >
          <CheckCircle2 style={{ width: "20px", height: "20px" }} />
          <span>{toast.message}</span>
          <button
            type="button"
            onClick={() => setToast(null)}
            style={{ background: "transparent", border: "none", color: "#ffffff", cursor: "pointer", marginLeft: "0.5rem" }}
          >
            <X style={{ width: "16px", height: "16px" }} />
          </button>
        </div>
      )}

      {/* ─── 1. STICKY EXECUTIVE TOPBAR / BANNER ─── */}
      <header
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
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.35rem", flexWrap: "wrap" }}>
            <h1 style={{ margin: 0, fontSize: "1.35rem", fontWeight: 800, color: "#ffffff", letterSpacing: "-0.01em" }}>
              {isThai ? "ระบบจัดการเว็บไซต์ โรงเรียนภักดีพรรณ" : "Pakdeepan School CMS Dashboard"}
            </h1>
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
          
          {/* Font Scaler (A Normal / A+ Large / A++ XL vs ก ปกติ / ก+ ใหญ่ / ก++ ใหญ่มาก) */}
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
              {isThai ? "ก ปกติ" : "A Normal"}
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
              {isThai ? "ก+ ใหญ่" : "A+ Large"}
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
              {isThai ? "ก++ ใหญ่มาก" : "A++ XL"}
            </button>
          </div>

          {/* Clean Language Switcher (No raw "TH" / "GB" prefixes, uses Languages icon) */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "0.25rem 0.4rem",
              borderRadius: "0.75rem",
              background: "rgba(255, 255, 255, 0.12)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              gap: "0.25rem",
            }}
            role="group"
            aria-label="CMS Language Switcher"
          >
            <Languages style={{ width: "16px", height: "16px", color: "rgba(255, 255, 255, 0.7)", marginLeft: "0.25rem" }} />
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
              ไทย
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
              EN
            </button>
          </div>

          {/* View Live Website Button (opens in new tab) */}
          <a
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
          </a>

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
      </header>

      {/* ─── 2. EXECUTIVE SUMMARY CARDS (Wired to Active Tabs & Smooth-Scroll) ─── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "1rem",
          marginTop: "1.25rem",
        }}
      >
        {/* Card 1: News & Events -> switches to news editor tab */}
        <button
          type="button"
          onClick={() => scrollToWorkspace("news")}
          style={{
            padding: "1.25rem",
            borderRadius: "1rem",
            background: "#ffffff",
            border: activeTab === "news" ? "2px solid #2563eb" : "1px solid #e2e8f0",
            cursor: "pointer",
            textAlign: "left",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            transition: "all 0.2s",
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
              {counts.news}+
            </div>
            <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "#2563eb", marginTop: "0.25rem", display: "flex", alignItems: "center", gap: "0.25rem" }}>
              <span>{isThai ? "จัดการเนื้อหาข่าวสาร →" : "Manage Articles →"}</span>
            </div>
          </div>
        </button>

        {/* Card 2: Academic Programs -> switches to programs editor tab */}
        <button
          type="button"
          onClick={() => scrollToWorkspace("programs")}
          style={{
            padding: "1.25rem",
            borderRadius: "1rem",
            background: "#ffffff",
            border: activeTab === "programs" ? "2px solid #4f46e5" : "1px solid #e2e8f0",
            cursor: "pointer",
            textAlign: "left",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            transition: "all 0.2s",
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
              {isThai ? `${counts.programs} ระดับ` : `${counts.programs} Levels`}
            </div>
            <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "#4f46e5", marginTop: "0.25rem" }}>
              <span>{isThai ? "เตรียมอนุบาล & อนุบาล 1-3 →" : "Toddlers & K1-K3 →"}</span>
            </div>
          </div>
        </button>

        {/* Card 3: Media & Images -> switches to media tab */}
        <button
          type="button"
          onClick={() => scrollToWorkspace("media")}
          style={{
            padding: "1.25rem",
            borderRadius: "1rem",
            background: "#ffffff",
            border: activeTab === "media" ? "2px solid #db2777" : "1px solid #e2e8f0",
            cursor: "pointer",
            textAlign: "left",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            transition: "all 0.2s",
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
              {isThai ? `${counts.media}+ ภาพ` : `${counts.media}+ Images`}
            </div>
            <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "#db2777", marginTop: "0.25rem" }}>
              <span>{isThai ? "เปิดศูนย์จัดการรูปภาพ →" : "Open Image Manager →"}</span>
            </div>
          </div>
        </button>

        {/* Card 4: Site Live Status -> Visit public website */}
        <a
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
        </a>
      </div>

      {/* ─── 3. QUICK ACTIONS HUB ─── */}
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
          
          {/* Action 1: Write Story (switches to news tab & opens create modal) */}
          <button
            type="button"
            onClick={() => {
              setEditingNewsArticle(null)
              setNewsEditorOpen(true)
              scrollToWorkspace("news")
            }}
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
            <span>{isThai ? "+ เขียนข่าวใหม่" : "+ Write Story"}</span>
          </button>

          {/* Action 2: Visual Media Hub */}
          <button
            type="button"
            onClick={() => scrollToWorkspace("media")}
            style={{
              padding: "0.55rem 1rem",
              borderRadius: "0.75rem",
              background: "#ec4899",
              color: "#ffffff",
              fontWeight: 700,
              fontSize: "0.85rem",
              border: "none",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              boxShadow: "0 2px 6px rgba(236, 72, 153, 0.3)",
            }}
          >
            <ImageIcon style={{ width: "15px", height: "15px" }} />
            <span>{isThai ? "ศูนย์จัดการรูปภาพ" : "Visual Media"}</span>
          </button>

          {/* Action 3: Academic Programs */}
          <button
            type="button"
            onClick={() => scrollToWorkspace("programs")}
            style={{
              padding: "0.55rem 1rem",
              borderRadius: "0.75rem",
              background: "#4f46e5",
              color: "#ffffff",
              fontWeight: 700,
              fontSize: "0.85rem",
              border: "none",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              boxShadow: "0 2px 6px rgba(79, 70, 229, 0.3)",
            }}
          >
            <GraduationCap style={{ width: "15px", height: "15px" }} />
            <span>{isThai ? "หลักสูตรการศึกษา" : "Academic Programs"}</span>
          </button>

          {/* Action 4: Director & Settings */}
          <button
            type="button"
            onClick={() => scrollToWorkspace("director")}
            style={{
              padding: "0.55rem 1rem",
              borderRadius: "0.75rem",
              background: "#f8fafc",
              color: "#334155",
              fontWeight: 700,
              fontSize: "0.85rem",
              border: "1px solid #cbd5e1",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
            }}
          >
            <Settings style={{ width: "15px", height: "15px", color: "#64748b" }} />
            <span>{isThai ? "สาส์น ผอ. & ตั้งค่าเว็บ" : "Director & Settings"}</span>
          </button>
        </div>
      </div>

      {/* ─── 4. INTERACTIVE WORKSPACE SECTION TABS ─── */}
      <div
        id="admin-editor-workspace"
        style={{
          marginTop: "1.5rem",
          padding: "0.5rem",
          background: "#ffffff",
          borderRadius: "1rem",
          border: "1px solid #e2e8f0",
          display: "flex",
          gap: "0.5rem",
          overflowX: "auto",
        }}
      >
        {[
          { id: "overview" as AdminTab, labelTh: "ภาพรวมระบบ", labelEn: "Overview", icon: Layers },
          { id: "news" as AdminTab, labelTh: "ข่าวสาร & กิจกรรม", labelEn: "News & Campus Life", icon: Newspaper },
          { id: "programs" as AdminTab, labelTh: "หลักสูตรการศึกษา", labelEn: "Academic Programs", icon: GraduationCap },
          { id: "media" as AdminTab, labelTh: "ศูนย์จัดการรูปภาพ", labelEn: "Visual Media", icon: ImageIcon },
          { id: "director" as AdminTab, labelTh: "สาส์น ผอ. & ตั้งค่า", labelEn: "Director & Settings", icon: Settings },
        ].map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: "0.65rem 1.15rem",
                borderRadius: "0.75rem",
                fontSize: "0.9rem",
                fontWeight: 700,
                border: "none",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                transition: "all 0.2s",
                whiteSpace: "nowrap",
                background: isActive ? "#2563eb" : "transparent",
                color: isActive ? "#ffffff" : "#475569",
                boxShadow: isActive ? "0 4px 10px rgba(37, 99, 235, 0.25)" : "none",
              }}
            >
              <Icon style={{ width: "16px", height: "16px" }} />
              <span>{isThai ? tab.labelTh : tab.labelEn}</span>
            </button>
          )
        })}
      </div>

      {/* ─── 5. ACTIVE WORKSPACE CONTENT ─── */}
      <div style={{ marginTop: "1rem" }}>
        
        {/* TAB 1: OVERVIEW */}
        {activeTab === "overview" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.25rem" }}>
            
            {/* Recent News Preview Card */}
            <div
              style={{
                background: "#ffffff",
                padding: "1.5rem",
                borderRadius: "1.25rem",
                border: "1px solid #e2e8f0",
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: "1.15rem", fontWeight: 800, color: "#0f172a" }}>
                    {isThai ? "ข่าวสารล่าสุดในระบบ" : "Latest News Stories"}
                  </h3>
                  <p style={{ margin: "0.25rem 0 0", fontSize: "0.85rem", color: "#64748b" }}>
                    {isThai ? "คลิกเพื่อแก้ไขหรือเขียนข่าวใหม่" : "Click to edit or create new story"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => scrollToWorkspace("news")}
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    color: "#2563eb",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.25rem",
                  }}
                >
                  <span>{isThai ? "ดูทั้งหมด" : "View All"}</span>
                  <ChevronRight style={{ width: "16px", height: "16px" }} />
                </button>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {newsList.slice(0, 3).map((item) => {
                  const title = extractPlainText(isThai ? item.title_th : item.title_en, isThai ? "th" : "en") || item.title || "Untitled"
                  const excerpt = extractPlainText(isThai ? item.excerpt_th : item.excerpt_en, isThai ? "th" : "en") || item.excerpt || ""
                  return (
                    <div
                      key={item.id}
                      onClick={() => {
                        setEditingNewsArticle(item)
                        setNewsEditorOpen(true)
                      }}
                      style={{
                        padding: "0.85rem 1rem",
                        borderRadius: "0.75rem",
                        background: "#f8fafc",
                        border: "1px solid #f1f5f9",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "1rem",
                      }}
                    >
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#2563eb", textTransform: "uppercase" }}>
                          {item.category || "Campus Life"}
                        </div>
                        <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#0f172a", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {title}
                        </div>
                        <div style={{ fontSize: "0.8rem", color: "#64748b", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {excerpt}
                        </div>
                      </div>
                      <Edit3 style={{ width: "16px", height: "16px", color: "#64748b", flexShrink: 0 }} />
                    </div>
                  )
                })}
              </div>
            </div>

            {/* School Director's Message Preview Card */}
            <div
              style={{
                background: "#ffffff",
                padding: "1.5rem",
                borderRadius: "1.25rem",
                border: "1px solid #e2e8f0",
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                  <span style={{ fontSize: "0.75rem", fontWeight: 800, padding: "0.25rem 0.65rem", borderRadius: "9999px", background: "#eef2ff", color: "#4f46e5", textTransform: "uppercase" }}>
                    {isThai ? "สารจากผู้อำนวยการ" : "Director's Message"}
                  </span>
                  <button
                    type="button"
                    onClick={() => scrollToWorkspace("director")}
                    style={{ fontSize: "0.85rem", fontWeight: 700, color: "#4f46e5", background: "none", border: "none", cursor: "pointer" }}
                  >
                    {isThai ? "แก้ไขสาร ผอ. →" : "Edit Message →"}
                  </button>
                </div>

                <div style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0f172a", marginBottom: "0.25rem" }}>
                  {isThai ? directorForm.directorNameTh : directorForm.directorName}
                </div>
                <div style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: "0.75rem" }}>
                  {isThai ? directorForm.directorTitleTh : directorForm.directorTitle}
                </div>
                <p style={{ fontSize: "0.9rem", color: "#334155", lineHeight: 1.6, fontStyle: "italic", margin: 0 }}>
                  {isThai ? directorForm.directorMessageTh : directorForm.directorMessage}
                </p>
              </div>

              <div style={{ marginTop: "1.25rem", paddingTop: "0.75rem", borderTop: "1px solid #f1f5f9", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "0.85rem" }}>
                <span style={{ color: "#64748b" }}>{isThai ? "โทร:" : "Phone:"} {directorForm.schoolPhone}</span>
                <span style={{ color: "#64748b" }}>{directorForm.schoolEmail}</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: NEWS & CAMPUS LIFE EDITOR */}
        {activeTab === "news" && (
          <div
            style={{
              background: "#ffffff",
              padding: "1.75rem",
              borderRadius: "1.25rem",
              border: "1px solid #e2e8f0",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            }}
          >
            {/* Header with Title and Create Button */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "1.25rem" }}>
              <div>
                <h2 style={{ margin: 0, fontSize: "1.35rem", fontWeight: 800, color: "#0f172a" }}>
                  {isThai ? "ศูนย์จัดการบทความ ข่าวสาร & กิจกรรม" : "News & Campus Life Story Editor"}
                </h2>
                <p style={{ margin: "0.25rem 0 0", fontSize: "0.9rem", color: "#64748b" }}>
                  {isThai ? "เผยแพร่ข่าวสารโรงเรียนสองภาษา (ไทย-อังกฤษ) ซิงค์สู่หน้าเว็บทันที" : "Manage bilingual campus life articles with instant real-time synchronization."}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setEditingNewsArticle(null)
                  setNewsEditorOpen(true)
                }}
                style={{
                  padding: "0.65rem 1.25rem",
                  borderRadius: "0.75rem",
                  background: "#2563eb",
                  color: "#ffffff",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  border: "none",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  boxShadow: "0 4px 12px rgba(37, 99, 235, 0.3)",
                }}
              >
                <Plus style={{ width: "16px", height: "16px" }} />
                <span>{isThai ? "เขียนข่าวใหม่" : "Create New Story"}</span>
              </button>
            </div>

            {/* Category Filter Pills & Search */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "1.25rem" }}>
              <div style={{ display: "flex", gap: "0.4rem", overflowX: "auto" }}>
                {[
                  { id: "ALL", labelTh: "ทั้งหมด", labelEn: "All" },
                  { id: "campus-life", labelTh: "ชีวิตในโรงเรียน", labelEn: "Campus Life" },
                  { id: "announcements", labelTh: "ประกาศสำคัญ", labelEn: "Announcements" },
                  { id: "academics", labelTh: "วิชาการ", labelEn: "Academics" },
                  { id: "events", labelTh: "กิจกรรม", labelEn: "Events" },
                ].map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setNewsCategoryFilter(c.id)}
                    style={{
                      padding: "0.4rem 0.85rem",
                      borderRadius: "0.5rem",
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      border: "none",
                      cursor: "pointer",
                      background: newsCategoryFilter === c.id ? "#0f172a" : "#f1f5f9",
                      color: newsCategoryFilter === c.id ? "#ffffff" : "#475569",
                    }}
                  >
                    {isThai ? c.labelTh : c.labelEn}
                  </button>
                ))}
              </div>

              <div style={{ position: "relative", minWidth: "240px" }}>
                <Search style={{ width: "16px", height: "16px", color: "#94a3b8", position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)" }} />
                <input
                  type="text"
                  placeholder={isThai ? "ค้นหาข่าวสาร..." : "Search stories..."}
                  value={newsSearchQuery}
                  onChange={(e) => setNewsSearchQuery(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.45rem 0.75rem 0.45rem 2.25rem",
                    borderRadius: "0.5rem",
                    border: "1px solid #cbd5e1",
                    fontSize: "0.85rem",
                    outline: "none",
                  }}
                />
              </div>
            </div>

            {/* News Articles List */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {filteredNews.map((item) => {
                const title = extractPlainText(isThai ? item.title_th : item.title_en, isThai ? "th" : "en") || item.title || "Untitled"
                const excerpt = extractPlainText(isThai ? item.excerpt_th : item.excerpt_en, isThai ? "th" : "en") || item.excerpt || ""
                const img = item.imageUrl || item.featuredImage?.url || "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=600&q=80"
                const articleId = item.id || item.slug

                return (
                  <div
                    key={item.id}
                    style={{
                      padding: "1rem 1.25rem",
                      borderRadius: "1rem",
                      background: "#f8fafc",
                      border: "1px solid #e2e8f0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: "1rem",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", minWidth: 0, flex: 1 }}>
                      <img
                        src={img}
                        alt={title}
                        style={{ width: "64px", height: "64px", borderRadius: "0.75rem", objectFit: "cover", flexShrink: 0 }}
                      />
                      <div style={{ minWidth: 0 }}>
                        <span style={{ fontSize: "0.75rem", fontWeight: 700, padding: "0.15rem 0.5rem", borderRadius: "0.35rem", background: "#dbeafe", color: "#1e40af", textTransform: "uppercase" }}>
                          {item.category || "Campus Life"}
                        </span>
                        <h4 style={{ margin: "0.25rem 0 0", fontSize: "1rem", fontWeight: 800, color: "#0f172a", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {title}
                        </h4>
                        <p style={{ margin: "0.15rem 0 0", fontSize: "0.85rem", color: "#64748b", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {excerpt}
                        </p>
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <a
                        href={`/news/${articleId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          padding: "0.45rem 0.85rem",
                          borderRadius: "0.5rem",
                          background: "#ffffff",
                          border: "1px solid #cbd5e1",
                          color: "#334155",
                          fontSize: "0.85rem",
                          fontWeight: 700,
                          textDecoration: "none",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.35rem",
                        }}
                      >
                        <Eye style={{ width: "14px", height: "14px" }} />
                        <span>{isThai ? "ดูหน้าเว็บ" : "View"}</span>
                      </a>

                      <button
                        type="button"
                        onClick={() => {
                          setEditingNewsArticle(item)
                          setNewsEditorOpen(true)
                        }}
                        style={{
                          padding: "0.45rem 0.85rem",
                          borderRadius: "0.5rem",
                          background: "#eff6ff",
                          border: "1px solid #bfdbfe",
                          color: "#1d4ed8",
                          fontSize: "0.85rem",
                          fontWeight: 700,
                          cursor: "pointer",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.35rem",
                        }}
                      >
                        <Edit3 style={{ width: "14px", height: "14px" }} />
                        <span>{isThai ? "แก้ไข" : "Edit"}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setDeletingNewsId(item.id)}
                        style={{
                          padding: "0.45rem 0.65rem",
                          borderRadius: "0.5rem",
                          background: "#fff1f2",
                          border: "1px solid #fecdd3",
                          color: "#e11d48",
                          fontSize: "0.85rem",
                          fontWeight: 700,
                          cursor: "pointer",
                        }}
                        title={isThai ? "ลบข่าวสาร" : "Delete Story"}
                      >
                        <Trash2 style={{ width: "14px", height: "14px" }} />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* TAB 3: ACADEMIC PROGRAMS & TUITION FEES */}
        {activeTab === "programs" && (
          <div
            style={{
              background: "#ffffff",
              padding: "1.75rem",
              borderRadius: "1.25rem",
              border: "1px solid #e2e8f0",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "1.5rem" }}>
              <div>
                <h2 style={{ margin: 0, fontSize: "1.35rem", fontWeight: 800, color: "#0f172a" }}>
                  {isThai ? "หลักสูตรการศึกษาและตารางค่าธรรมเนียม (บาท - THB ฿)" : "Academic Programs & Tuition Fee Schedules (THB ฿)"}
                </h2>
                <p style={{ margin: "0.25rem 0 0", fontSize: "0.9rem", color: "#64748b" }}>
                  {isThai ? "บริหารจัดการระดับชั้นการเรียน อัตราค่าเล่าเรียน และอัตราส่วนครูต่อเด็กนักเรียน" : "Manage curriculum levels, tuition fee structures in Thai Baht, and student-teacher ratios."}
                </p>
              </div>

              <Link
                href="/admin/image-manager"
                style={{
                  padding: "0.65rem 1.25rem",
                  borderRadius: "0.75rem",
                  background: "#4f46e5",
                  color: "#ffffff",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                }}
              >
                <ImageIcon style={{ width: "16px", height: "16px" }} />
                <span>{isThai ? "เปลี่ยนรูปภาพหลักสูตร" : "Change Program Images"}</span>
              </Link>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
              {[
                {
                  tier: "Toddlers",
                  nameTh: "เตรียมอนุบาล (Toddlers)",
                  nameEn: "Toddlers Program",
                  age: isThai ? "อายุ 1–3 ขวบ" : "Ages 1–3",
                  ratio: "1:4 Teacher Ratio",
                  tuition: "25,000 ฿",
                  cycle: isThai ? "ต่อภาคเรียน" : "per term",
                  descTh: "เน้นการพัฒนาประสาทสัมผัส กล้ามเนื้อมัดเล็ก และการสื่อสารผ่านการเล่นที่อบอุ่นและปลอดภัย",
                  descEn: "Sensory exploration, fine motor skills, and early bilingual language in a nurturing environment.",
                  image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80",
                },
                {
                  tier: "Pre-K",
                  nameTh: "อนุบาล 1 (Pre-K)",
                  nameEn: "Kindergarten 1 / Pre-K",
                  age: isThai ? "อายุ 3–4 ขวบ" : "Ages 3–4",
                  ratio: "1:6 Teacher Ratio",
                  tuition: "28,000 ฿",
                  cycle: isThai ? "ต่อภาคเรียน" : "per term",
                  descTh: "เริ่มฝึกวินัยกิจวัตรประจำวัน การเข้าสังคม ทักษะการฟัง-พูดสองภาษา และแนวคิดคณิตศาสตร์พื้นฐาน",
                  descEn: "Structured daily routines, collaborative play, phonics foundations, and early mathematical concepts.",
                  image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80",
                },
                {
                  tier: "K1",
                  nameTh: "อนุบาล 2 (K1)",
                  nameEn: "Kindergarten 2 (K1)",
                  age: isThai ? "อายุ 4–5 ขวบ" : "Ages 4–5",
                  ratio: "1:8 Teacher Ratio",
                  tuition: "30,000 ฿",
                  cycle: isThai ? "ต่อภาคเรียน" : "per term",
                  descTh: "ต่อยอดทักษะการอ่านเขียนสองภาษา กิจกรรมทดลองวิทยาศาสตร์ STEAM และการคิดเชิงวิพากษ์",
                  descEn: "Bilingual reading and writing, STEAM science discovery, creative arts, and critical inquiry.",
                  image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80",
                },
                {
                  tier: "K2",
                  nameTh: "อนุบาล 3 (K2)",
                  nameEn: "Kindergarten 3 (K2)",
                  age: isThai ? "อายุ 5–6 ขวบ" : "Ages 5–6",
                  ratio: "1:8 Teacher Ratio",
                  tuition: "32,000 ฿",
                  cycle: isThai ? "ต่อภาคเรียน" : "per term",
                  descTh: "เตรียมความพร้อมสู่ชั้นประถมศึกษาอย่างมั่นใจ ทักษะความเป็นผู้นำ อารมณ์สังคม และภาษาอังกฤษเข้มข้น",
                  descEn: "Advanced primary school readiness, emotional agility, collaborative leadership, and bilingual literacy.",
                  image: "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=600&q=80",
                },
              ].map((prog, i) => (
                <div
                  key={prog.tier}
                  style={{
                    borderRadius: "1rem",
                    border: "1px solid #e2e8f0",
                    background: "#f8fafc",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ position: "relative", height: "140px" }}>
                    <img src={prog.image} alt={prog.nameEn} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <span style={{ position: "absolute", top: "0.75rem", left: "0.75rem", background: "rgba(15, 23, 42, 0.8)", color: "#ffffff", padding: "0.2rem 0.6rem", borderRadius: "9999px", fontSize: "0.75rem", fontWeight: 700 }}>
                      {prog.age}
                    </span>
                  </div>

                  <div style={{ padding: "1.25rem", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <h3 style={{ margin: "0 0 0.25rem", fontSize: "1.1rem", fontWeight: 800, color: "#0f172a" }}>
                        {isThai ? prog.nameTh : prog.nameEn}
                      </h3>
                      <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#4f46e5", marginBottom: "0.5rem" }}>
                        {prog.ratio}
                      </div>
                      <p style={{ margin: "0 0 1rem", fontSize: "0.85rem", color: "#64748b", lineHeight: 1.5 }}>
                        {isThai ? prog.descTh : prog.descEn}
                      </p>
                    </div>

                    <div style={{ paddingTop: "0.75rem", borderTop: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div>
                        <span style={{ fontSize: "1.2rem", fontWeight: 900, color: "#0f172a" }}>{prog.tuition}</span>
                        <span style={{ fontSize: "0.75rem", color: "#64748b", marginLeft: "0.25rem" }}>{prog.cycle}</span>
                      </div>

                      <Link
                        href="/admin/image-manager"
                        style={{
                          fontSize: "0.8rem",
                          fontWeight: 700,
                          color: "#2563eb",
                          textDecoration: "none",
                        }}
                      >
                        {isThai ? "เปลี่ยนภาพ →" : "Image →"}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: VISUAL MEDIA & IMAGE MANAGER HUB */}
        {activeTab === "media" && (
          <div
            style={{
              background: "#ffffff",
              padding: "1.75rem",
              borderRadius: "1.25rem",
              border: "1px solid #e2e8f0",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "1.5rem" }}>
              <div>
                <h2 style={{ margin: 0, fontSize: "1.35rem", fontWeight: 800, color: "#0f172a" }}>
                  {isThai ? "ศูนย์จัดการรูปภาพและสื่อเว็บไซต์ (ซิงค์สด)" : "Visual Media & Image Manager Studio"}
                </h2>
                <p style={{ margin: "0.25rem 0 0", fontSize: "0.9rem", color: "#64748b" }}>
                  {isThai ? "เปลี่ยนภาพแบนเนอร์ Hero โลโก้ สาส์น ผอ. และแกลเลอรีด้วยพรีวิวสดทันที" : "Replace hero banners, logo, director portrait, and galleries with real-time live preview."}
                </p>
              </div>

              <Link
                href="/admin/image-manager"
                style={{
                  padding: "0.65rem 1.25rem",
                  borderRadius: "0.75rem",
                  background: "#db2777",
                  color: "#ffffff",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  boxShadow: "0 4px 12px rgba(219, 39, 119, 0.3)",
                }}
              >
                <ImageIcon style={{ width: "16px", height: "16px" }} />
                <span>{isThai ? "เปิดสตูดิโอจัดการภาพเต็มรูปแบบ ↗" : "Open Full Image Studio ↗"}</span>
              </Link>
            </div>

            {/* Quick Media Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.25rem" }}>
              {[
                { titleTh: "ตราสัญลักษณ์ทางการ (Logo)", titleEn: "Official School Logo", subTh: "เมนูบาร์ด้านบนและส่วนท้ายของทุกหน้า", subEn: "Header navigation and footer emblem", img: "/images/pakdeepan-logo.png" },
                { titleTh: "ภาพพื้นหลัง Hero แบนเนอร์", titleEn: "Hero Ambient Background", subTh: "ภาพบรรยากาศขนาดใหญ่หน้าแรก", subEn: "Scrollytelling backdrop visual", img: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1200&auto=format&fit=crop" },
                { titleTh: "ภาพถ่ายผู้อำนวยการโรงเรียน", titleEn: "School Director Portrait", subTh: "ภาพเคียงคู่สารจากผู้อำนวยการ", subEn: "Executive portrait for Director's message", img: directorForm.directorPortraitUrl },
                { titleTh: "ภาพประกอบปรัชญาโรงเรียน", titleEn: "School Philosophy Photo", subTh: "ส่วน 'มากกว่าโรงเรียน คือรากฐานชีวิต'", subEn: "'More than a school' feature image", img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop" },
              ].map((m) => (
                <div
                  key={m.titleEn}
                  style={{
                    padding: "1rem",
                    borderRadius: "1rem",
                    background: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ height: "150px", borderRadius: "0.75rem", overflow: "hidden", marginBottom: "0.75rem", background: "#e2e8f0" }}>
                    <img src={m.img} alt={m.titleEn} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div>
                    <h4 style={{ margin: "0 0 0.25rem", fontSize: "0.95rem", fontWeight: 800, color: "#0f172a" }}>
                      {isThai ? m.titleTh : m.titleEn}
                    </h4>
                    <p style={{ margin: "0 0 0.75rem", fontSize: "0.8rem", color: "#64748b" }}>
                      {isThai ? m.subTh : m.subEn}
                    </p>
                  </div>
                  <Link
                    href="/admin/image-manager"
                    style={{
                      padding: "0.45rem",
                      borderRadius: "0.5rem",
                      background: "#ffffff",
                      border: "1px solid #cbd5e1",
                      color: "#db2777",
                      fontWeight: 700,
                      fontSize: "0.85rem",
                      textAlign: "center",
                      textDecoration: "none",
                    }}
                  >
                    {isThai ? "เปลี่ยนภาพนี้ ↗" : "Replace Asset ↗"}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: SCHOOL DIRECTOR & GENERAL SETTINGS EDITOR */}
        {activeTab === "director" && (
          <form
            onSubmit={handleSaveDirectorSettings}
            style={{
              background: "#ffffff",
              padding: "1.75rem",
              borderRadius: "1.25rem",
              border: "1px solid #e2e8f0",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "1.5rem" }}>
              <div>
                <h2 style={{ margin: 0, fontSize: "1.35rem", fontWeight: 800, color: "#0f172a" }}>
                  {isThai ? "สาส์นจากผู้อำนวยการโรงเรียน & ข้อมูลติดต่อ" : "School Director Message & General Settings"}
                </h2>
                <p style={{ margin: "0.25rem 0 0", fontSize: "0.9rem", color: "#64748b" }}>
                  {isThai ? "แก้ไขสาร ผอ. ข้อมูลการติดต่อ และเวลาทำการ ซิงค์สู่หน้าแรกและหน้าติดต่อทันที" : "Edit official Director's message, contact info, and hours with real-time website synchronization."}
                </p>
              </div>

              {/* Language Tabs for Form */}
              <div style={{ display: "inline-flex", padding: "0.25rem", borderRadius: "0.5rem", background: "#f1f5f9" }}>
                <button
                  type="button"
                  onClick={() => setDirectorTab("th")}
                  style={{
                    padding: "0.35rem 0.85rem",
                    borderRadius: "0.35rem",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    border: "none",
                    cursor: "pointer",
                    background: directorTab === "th" ? "#ffffff" : "transparent",
                    color: directorTab === "th" ? "#2563eb" : "#64748b",
                    boxShadow: directorTab === "th" ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                  }}
                >
                  ภาษาไทย (TH)
                </button>
                <button
                  type="button"
                  onClick={() => setDirectorTab("en")}
                  style={{
                    padding: "0.35rem 0.85rem",
                    borderRadius: "0.35rem",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    border: "none",
                    cursor: "pointer",
                    background: directorTab === "en" ? "#ffffff" : "transparent",
                    color: directorTab === "en" ? "#2563eb" : "#64748b",
                    boxShadow: directorTab === "en" ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                  }}
                >
                  English (EN)
                </button>
              </div>
            </div>

            {/* Form Fields Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.25rem", marginBottom: "1.5rem" }}>
              
              {/* Director Information */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div style={{ fontSize: "1rem", fontWeight: 800, color: "#1e293b", borderBottom: "1px solid #f1f5f9", paddingBottom: "0.5rem" }}>
                  {isThai ? "ข้อมูลผู้อำนวยการโรงเรียน" : "School Director Profile"}
                </div>

                {directorTab === "th" ? (
                  <>
                    <div>
                      <label style={{ display: "block", fontSize: "0.9rem", fontWeight: 700, color: "#334155", marginBottom: "0.35rem" }}>
                        ชื่อผู้อำนวยการ (ภาษาไทย)
                      </label>
                      <input
                        type="text"
                        value={directorForm.directorNameTh}
                        onChange={(e) => setDirectorForm({ ...directorForm, directorNameTh: e.target.value })}
                        style={{ width: "100%", padding: "0.65rem 0.85rem", borderRadius: "0.5rem", border: "1px solid #cbd5e1", fontSize: "0.95rem" }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "0.9rem", fontWeight: 700, color: "#334155", marginBottom: "0.35rem" }}>
                        ตำแหน่งผู้อำนวยการ (ภาษาไทย)
                      </label>
                      <input
                        type="text"
                        value={directorForm.directorTitleTh}
                        onChange={(e) => setDirectorForm({ ...directorForm, directorTitleTh: e.target.value })}
                        style={{ width: "100%", padding: "0.65rem 0.85rem", borderRadius: "0.5rem", border: "1px solid #cbd5e1", fontSize: "0.95rem" }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "0.9rem", fontWeight: 700, color: "#334155", marginBottom: "0.35rem" }}>
                        สารจากผู้อำนวยการ (ภาษาไทย)
                      </label>
                      <textarea
                        rows={4}
                        value={directorForm.directorMessageTh}
                        onChange={(e) => setDirectorForm({ ...directorForm, directorMessageTh: e.target.value })}
                        style={{ width: "100%", padding: "0.65rem 0.85rem", borderRadius: "0.5rem", border: "1px solid #cbd5e1", fontSize: "0.95rem", lineHeight: 1.5 }}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label style={{ display: "block", fontSize: "0.9rem", fontWeight: 700, color: "#334155", marginBottom: "0.35rem" }}>
                        Director Name (English)
                      </label>
                      <input
                        type="text"
                        value={directorForm.directorName}
                        onChange={(e) => setDirectorForm({ ...directorForm, directorName: e.target.value })}
                        style={{ width: "100%", padding: "0.65rem 0.85rem", borderRadius: "0.5rem", border: "1px solid #cbd5e1", fontSize: "0.95rem" }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "0.9rem", fontWeight: 700, color: "#334155", marginBottom: "0.35rem" }}>
                        Director Title (English)
                      </label>
                      <input
                        type="text"
                        value={directorForm.directorTitle}
                        onChange={(e) => setDirectorForm({ ...directorForm, directorTitle: e.target.value })}
                        style={{ width: "100%", padding: "0.65rem 0.85rem", borderRadius: "0.5rem", border: "1px solid #cbd5e1", fontSize: "0.95rem" }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "0.9rem", fontWeight: 700, color: "#334155", marginBottom: "0.35rem" }}>
                        Director Message (English)
                      </label>
                      <textarea
                        rows={4}
                        value={directorForm.directorMessage}
                        onChange={(e) => setDirectorForm({ ...directorForm, directorMessage: e.target.value })}
                        style={{ width: "100%", padding: "0.65rem 0.85rem", borderRadius: "0.5rem", border: "1px solid #cbd5e1", fontSize: "0.95rem", lineHeight: 1.5 }}
                      />
                    </div>
                  </>
                )}
              </div>

              {/* General Contact Details */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div style={{ fontSize: "1rem", fontWeight: 800, color: "#1e293b", borderBottom: "1px solid #f1f5f9", paddingBottom: "0.5rem" }}>
                  {isThai ? "ข้อมูลติดต่อโรงเรียน" : "School Contact Details"}
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.9rem", fontWeight: 700, color: "#334155", marginBottom: "0.35rem" }}>
                    {isThai ? "เบอร์โทรศัพท์" : "Phone Number"}
                  </label>
                  <input
                    type="text"
                    value={directorForm.schoolPhone}
                    onChange={(e) => setDirectorForm({ ...directorForm, schoolPhone: e.target.value })}
                    style={{ width: "100%", padding: "0.65rem 0.85rem", borderRadius: "0.5rem", border: "1px solid #cbd5e1", fontSize: "0.95rem" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.9rem", fontWeight: 700, color: "#334155", marginBottom: "0.35rem" }}>
                    {isThai ? "อีเมลติดต่อ" : "Email Address"}
                  </label>
                  <input
                    type="email"
                    value={directorForm.schoolEmail}
                    onChange={(e) => setDirectorForm({ ...directorForm, schoolEmail: e.target.value })}
                    style={{ width: "100%", padding: "0.65rem 0.85rem", borderRadius: "0.5rem", border: "1px solid #cbd5e1", fontSize: "0.95rem" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.9rem", fontWeight: 700, color: "#334155", marginBottom: "0.35rem" }}>
                    {isThai ? "สถานที่ตั้ง" : "Physical Address"}
                  </label>
                  <input
                    type="text"
                    value={directorForm.schoolAddress}
                    onChange={(e) => setDirectorForm({ ...directorForm, schoolAddress: e.target.value })}
                    style={{ width: "100%", padding: "0.65rem 0.85rem", borderRadius: "0.5rem", border: "1px solid #cbd5e1", fontSize: "0.95rem" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.9rem", fontWeight: 700, color: "#334155", marginBottom: "0.35rem" }}>
                    {isThai ? "เวลาทำการ" : "Office Hours"}
                  </label>
                  <input
                    type="text"
                    value={directorForm.schoolOfficeHours}
                    onChange={(e) => setDirectorForm({ ...directorForm, schoolOfficeHours: e.target.value })}
                    style={{ width: "100%", padding: "0.65rem 0.85rem", borderRadius: "0.5rem", border: "1px solid #cbd5e1", fontSize: "0.95rem" }}
                  />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button
                type="submit"
                disabled={isSavingDirector}
                style={{
                  padding: "0.75rem 1.75rem",
                  borderRadius: "0.75rem",
                  background: "#2563eb",
                  color: "#ffffff",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  border: "none",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  boxShadow: "0 4px 12px rgba(37, 99, 235, 0.3)",
                }}
              >
                {isSavingDirector ? (
                  <>
                    <Loader2 style={{ width: "16px", height: "16px", animation: "spin 1s linear infinite" }} />
                    <span>{isThai ? "กำลังบันทึก..." : "Saving..."}</span>
                  </>
                ) : (
                  <>
                    <Save style={{ width: "16px", height: "16px" }} />
                    <span>{isThai ? "บันทึกการเปลี่ยนแปลง" : "Save Changes"}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* ─── 6. LOGOUT CONFIRMATION MODAL ─── */}
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

      {/* ─── 7. DELETE NEWS CONFIRMATION MODAL ─── */}
      {deletingNewsId && (
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
              {isThai ? "ยืนยันการลบข่าวสารนี้?" : "Confirm Delete Story?"}
            </h3>

            <p style={{ margin: "0 0 1.5rem", fontSize: "0.95rem", color: "#475569", lineHeight: 1.6 }}>
              {isThai
                ? "การกระทำนี้จะลบบทความออกจากระบบและเว็บไซต์จริงทันทีโดยไม่สามารถกู้คืนได้ คุณแน่ใจหรือไม่?"
                : "This action will immediately remove this article from the database and public site. Are you sure?"}
            </p>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem" }}>
              <button
                type="button"
                onClick={() => setDeletingNewsId(null)}
                disabled={isDeletingNews}
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
                onClick={() => handleDeleteNews(deletingNewsId)}
                disabled={isDeletingNews}
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
                {isDeletingNews ? (
                  <>
                    <Loader2 style={{ width: "16px", height: "16px", animation: "spin 1s linear infinite" }} />
                    <span>{isThai ? "กำลังลบ..." : "Deleting..."}</span>
                  </>
                ) : (
                  <>
                    <Trash2 style={{ width: "16px", height: "16px" }} />
                    <span>{isThai ? "ยืนยันการลบ" : "Yes, Delete"}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── 8. EMBEDDED NEWS ARTICLE MODAL ─── */}
      <NewsArticleEditorModal
        article={editingNewsArticle}
        isOpen={newsEditorOpen}
        onClose={() => {
          setNewsEditorOpen(false)
          setEditingNewsArticle(null)
        }}
        locale={currentLocale}
        onSaved={async () => {
          setNewsEditorOpen(false)
          setEditingNewsArticle(null)
          // Refetch news list
          try {
            const res = await fetch("/api/admin/news")
            if (res.ok) {
              const data = await res.json()
              if (data.docs) setNewsList(data.docs)
            }
          } catch {
            // Ignore
          }
          setToast({
            message: isThai ? "บันทึกบทความและซิงค์เว็บไซต์เรียบร้อยแล้ว!" : "Article saved and live site synced!",
            type: "success",
          })
        }}
      />
    </div>
  )
}

export default AdminNavBanner
