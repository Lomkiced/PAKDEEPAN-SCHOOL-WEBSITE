"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  LayoutDashboard,
  Image as ImageIcon,
  Newspaper,
  GraduationCap,
  Calendar,
  Camera,
  Settings,
  Users,
  ExternalLink,
  LogOut,
  Menu,
  X,
  ShieldCheck,
  AlertTriangle,
  Loader2,
  CalendarDays,
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
  activePath,
  counts = {},
}: AdminAppShellProps) {
  const router = useRouter()
  const pathname = usePathname()
  const currentPath = activePath || pathname || "/admin"

  // 1. Language state (defaults to Thai for primary school admin)
  const [locale, setLocale] = React.useState<"en" | "th">(() => {
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
    return "th" // Thai first default
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

  // 2. Accessibility Font Size Scaler: 'normal' (100%), 'large' (112%), 'xlarge' (125%)
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

  // Apply font scale to document element and container
  React.useEffect(() => {
    try {
      localStorage.setItem("pakdeepan_admin_font_size", fontSize)
      document.documentElement.setAttribute("data-admin-font-scale", fontSize)
    } catch {
      // Ignore
    }
  }, [fontSize])

  // 3. Current formatted date
  const currentDateFormatted = React.useMemo(() => formatBilingualDate(locale), [locale])

  // 4. UI States (Mobile drawer & Logout confirmation modal)
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
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
      // Clear token cookies manually as well
      document.cookie = "payload-token=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT"
      localStorage.removeItem("payload-token")
      sessionStorage.clear()
    } catch {
      // Ignore
    }
    router.push("/admin/login")
    window.location.href = "/admin/login"
  }

  // Navigation Items
  const navItems = [
    {
      id: "dashboard",
      href: "/admin",
      labelTh: "แผงควบคุมหลัก",
      labelEn: "Executive Dashboard",
      icon: LayoutDashboard,
      active: currentPath === "/admin" || currentPath === "/admin/",
    },
    {
      id: "images",
      href: "/admin/image-manager",
      labelTh: "ศูนย์จัดการรูปภาพและสื่อ",
      labelEn: "Visual Assets & Images",
      icon: ImageIcon,
      active: currentPath.startsWith("/admin/image-manager"),
      badge: counts.media,
    },
    {
      id: "news",
      href: "/admin/collections/news",
      labelTh: "ข่าวสารและกิจกรรม",
      labelEn: "News & Campus Life",
      icon: Newspaper,
      active: currentPath.includes("/collections/news"),
      badge: counts.news,
    },
    {
      id: "programs",
      href: "/admin/collections/programs",
      labelTh: "หลักสูตรการศึกษา",
      labelEn: "Academic Programs",
      icon: GraduationCap,
      active: currentPath.includes("/collections/programs"),
      badge: counts.programs,
    },
    {
      id: "events",
      href: "/admin/collections/events",
      labelTh: "ปฏิทินกิจกรรมโรงเรียน",
      labelEn: "School Calendar Events",
      icon: Calendar,
      active: currentPath.includes("/collections/events"),
      badge: counts.events,
    },
    {
      id: "gallery",
      href: "/admin/collections/gallery-images",
      labelTh: "แกลเลอรีภาพกิจกรรม",
      labelEn: "Photo Gallery",
      icon: Camera,
      active: currentPath.includes("/collections/gallery-images"),
      badge: counts.gallery,
    },
    {
      id: "site-settings",
      href: "/admin/globals/site-settings",
      labelTh: "ตั้งค่าเว็บไซต์และสาส์น ผอ.",
      labelEn: "Site Settings & Director",
      icon: Settings,
      active: currentPath.includes("/globals/site-settings"),
    },
    {
      id: "users",
      href: "/admin/collections/users",
      labelTh: "จัดการผู้ดูแลระบบ",
      labelEn: "Admin Users",
      icon: Users,
      active: currentPath.includes("/collections/users"),
      badge: counts.users,
    },
  ]

  const fontScaleStyles: Record<"normal" | "large" | "xlarge", React.CSSProperties> = {
    normal: { fontSize: "16px" },
    large: { fontSize: "18px" },
    xlarge: { fontSize: "20px" },
  }

  return (
    <div
      data-admin-font-scale={fontSize}
      style={fontScaleStyles[fontSize]}
      className="admin-shell min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800 antialiased selection:bg-blue-100 selection:text-blue-900"
    >
      {/* ─── SIDEBAR & MAIN CONTAINER ─── */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* DESKTOP SIDEBAR */}
        <aside className="hidden lg:flex lg:flex-col lg:w-72 xl:w-80 bg-slate-900 text-slate-100 border-r border-slate-800 shadow-xl shrink-0 z-30">
          
          {/* School Crest / Branding Header */}
          <div className="p-6 border-b border-slate-800/80 bg-slate-950/40">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-700 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 shrink-0 font-extrabold text-xl">
                ภ
              </div>
              <div>
                <h1 className="text-lg font-bold text-white tracking-tight leading-snug">
                  {isTh ? "โรงเรียนภักดีพรรณ" : "Pakdeepan School"}
                </h1>
                <p className="text-xs font-medium text-blue-400 flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>{isTh ? "ระบบจัดการเว็บไซต์ CMS" : "School Content System"}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-1.5">
            <div className="px-3 pb-2 pt-1 text-xs font-bold uppercase tracking-wider text-slate-400">
              {isTh ? "เมนูการจัดการหลัก" : "Main Navigation"}
            </div>

            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`flex items-center justify-between px-4 py-3.5 text-base font-semibold rounded-xl transition-all ${
                    item.active
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/30 font-bold"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/80"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <Icon
                      className={`w-5 h-5 shrink-0 ${
                        item.active ? "text-white" : "text-slate-400 group-hover:text-white"
                      }`}
                    />
                    <span className="truncate">{isTh ? item.labelTh : item.labelEn}</span>
                  </div>

                  {typeof item.badge === "number" && item.badge > 0 && (
                    <span
                      className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                        item.active
                          ? "bg-white/20 text-white"
                          : "bg-slate-800 text-slate-300 border border-slate-700"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Sidebar Bottom Actions */}
          <div className="p-4 border-t border-slate-800/80 bg-slate-950/30 space-y-2">
            {/* View Live Website Button */}
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between w-full px-4 py-3 text-base font-semibold text-slate-300 hover:text-white hover:bg-slate-800/90 rounded-xl transition-colors border border-slate-800"
            >
              <div className="flex items-center gap-3">
                <ExternalLink className="w-5 h-5 text-blue-400" />
                <span>{isTh ? "ดูหน้าเว็บไซต์จริง" : "View Live Website"}</span>
              </div>
              <span className="text-xs text-slate-400 font-mono">↗</span>
            </Link>

            {/* Log Out Button */}
            <button
              type="button"
              onClick={() => setLogoutModalOpen(true)}
              className="flex items-center gap-3 w-full px-4 py-3 text-base font-semibold text-rose-400 hover:text-white hover:bg-rose-600/90 rounded-xl transition-colors"
            >
              <LogOut className="w-5 h-5 text-rose-400" />
              <span>{isTh ? "ออกจากระบบ" : "Log Out"}</span>
            </button>
          </div>
        </aside>

        {/* MOBILE SIDEBAR DRAWER */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs transition-opacity"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Drawer */}
            <aside className="relative flex flex-col w-5/6 max-w-sm bg-slate-900 text-slate-100 shadow-2xl z-10">
              <div className="p-5 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
                    ภ
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-white leading-tight">
                      {isTh ? "โรงเรียนภักดีพรรณ" : "Pakdeepan School"}
                    </h2>
                    <span className="text-xs text-blue-400">{isTh ? "ผู้ดูแลระบบ" : "Admin CMS"}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto p-4 space-y-1.5">
                {navItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-4 py-3.5 text-base font-semibold rounded-xl ${
                        item.active
                          ? "bg-blue-600 text-white font-bold"
                          : "text-slate-300 hover:bg-slate-800"
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <Icon className="w-5 h-5" />
                        <span>{isTh ? item.labelTh : item.labelEn}</span>
                      </div>
                      {typeof item.badge === "number" && item.badge > 0 && (
                        <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-slate-800">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  )
                })}
              </nav>

              <div className="p-4 border-t border-slate-800 space-y-2">
                <Link
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 w-full px-4 py-3 text-base font-semibold text-slate-300 hover:bg-slate-800 rounded-xl"
                >
                  <ExternalLink className="w-5 h-5 text-blue-400" />
                  <span>{isTh ? "ดูหน้าเว็บไซต์จริง" : "View Live Website"}</span>
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false)
                    setLogoutModalOpen(true)
                  }}
                  className="flex items-center gap-3 w-full px-4 py-3 text-base font-semibold text-rose-400 hover:bg-rose-600 hover:text-white rounded-xl"
                >
                  <LogOut className="w-5 h-5" />
                  <span>{isTh ? "ออกจากระบบ" : "Log Out"}</span>
                </button>
              </div>
            </aside>
          </div>
        )}

        {/* ─── MAIN CONTENT AREA WITH STICKY TOPBAR ─── */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          
          {/* STICKY TOPBAR */}
          <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs px-4 sm:px-6 lg:px-8 py-3.5">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              
              {/* Left Side: Mobile Menu Button + Title + Date */}
              <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(true)}
                  className="lg:hidden p-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200"
                  aria-label="Open mobile menu"
                >
                  <Menu className="w-5 h-5" />
                </button>

                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight truncate">
                    {title || (isTh ? "ระบบจัดการเว็บไซต์ โรงเรียนภักดีพรรณ" : "Pakdeepan School CMS")}
                  </h2>
                  <div className="flex items-center gap-2 mt-0.5 text-xs sm:text-sm font-medium text-slate-500">
                    <CalendarDays className="w-4 h-4 text-blue-600 shrink-0" />
                    <span className="font-medium text-slate-700">
                      {currentDateFormatted || (isTh ? "กำลังโหลดวันที่..." : "Loading date...")}
                    </span>
                    {subtitle && (
                      <>
                        <span className="text-slate-300">•</span>
                        <span className="text-slate-500 hidden md:inline truncate">{subtitle}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Side Controls: Font Scaler + Language Toggle + Role Badge + Log Out */}
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                
                {/* 1. Accessible Font Size Scaler (ก ปกติ | ก+ ใหญ่ | ก++ ใหญ่มาก) */}
                <div
                  className="inline-flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 shadow-2xs"
                  role="group"
                  aria-label="Font size scaler"
                >
                  <span className="text-xs font-bold text-slate-500 px-2 hidden xl:inline">
                    {isTh ? "ขนาดอักษร:" : "Font Size:"}
                  </span>
                  
                  <button
                    type="button"
                    onClick={() => setFontSize("normal")}
                    title={isTh ? "ขนาดปกติ (100%)" : "Normal Size (100%)"}
                    className={`px-2.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                      fontSize === "normal"
                        ? "bg-white text-blue-700 shadow-xs border border-slate-200"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
                    }`}
                  >
                    ก <span className="hidden sm:inline">{isTh ? "ปกติ" : "100%"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFontSize("large")}
                    title={isTh ? "ขนาดใหญ่ (112%)" : "Large Size (112%)"}
                    className={`px-2.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                      fontSize === "large"
                        ? "bg-white text-blue-700 shadow-xs border border-slate-200"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
                    }`}
                  >
                    ก+ <span className="hidden sm:inline">{isTh ? "ใหญ่" : "112%"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFontSize("xlarge")}
                    title={isTh ? "ขนาดใหญ่มาก (125%)" : "Extra Large Size (125%)"}
                    className={`px-2.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                      fontSize === "xlarge"
                        ? "bg-white text-blue-700 shadow-xs border border-slate-200"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
                    }`}
                  >
                    ก++ <span className="hidden sm:inline">{isTh ? "ใหญ่มาก" : "125%"}</span>
                  </button>
                </div>

                {/* 2. Bilingual Language Switcher (🇹🇭 ไทย | 🇬🇧 EN) */}
                <div
                  className="inline-flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 shadow-2xs"
                  role="group"
                  aria-label="Admin Language Toggle"
                >
                  <button
                    type="button"
                    onClick={() => switchLocale("th")}
                    className={`px-2.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                      isTh
                        ? "bg-white text-blue-800 shadow-xs border border-slate-200"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <span>🇹🇭</span>
                    <span>ไทย</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => switchLocale("en")}
                    className={`px-2.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                      !isTh
                        ? "bg-white text-blue-800 shadow-xs border border-slate-200"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <span>🇬🇧</span>
                    <span>EN</span>
                  </button>
                </div>

                {/* 3. Role Badge */}
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs sm:text-sm font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>{isTh ? "ผู้ดูแลระบบ" : "Administrator"}</span>
                </div>

                {/* 4. Prominent Log Out Button */}
                <button
                  type="button"
                  onClick={() => setLogoutModalOpen(true)}
                  className="px-3.5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 hover:text-rose-800 border border-rose-200 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 shadow-2xs"
                >
                  <LogOut className="w-4 h-4 text-rose-600" />
                  <span className="hidden sm:inline">{isTh ? "ออกจากระบบ" : "Log Out"}</span>
                </button>
              </div>
            </div>
          </header>

          {/* MAIN WORKSPACE BODY */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-slate-50">
            {children}
          </main>
        </div>
      </div>

      {/* ─── LOGOUT CONFIRMATION MODAL ─── */}
      {logoutModalOpen && (
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
              {isTh ? "ยืนยันการออกจากระบบ?" : "Confirm Log Out?"}
            </h3>

            <p className="text-base text-slate-600 leading-relaxed mb-6">
              {isTh
                ? "คุณต้องการออกจากระบบจัดการเว็บไซต์ โรงเรียนภักดีพรรณ หรือไม่? ข้อมูลที่ยังไม่ได้บันทึกอาจสูญหาย"
                : "Are you sure you want to log out of the Pakdeepan School CMS? Any unsaved changes may be lost."}
            </p>

            <div className="flex items-center justify-center gap-3 flex-wrap">
              <button
                type="button"
                onClick={() => setLogoutModalOpen(false)}
                disabled={isLoggingOut}
                className="px-5 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-bold text-base transition-colors"
              >
                {isTh ? "ยกเลิก / อยู่ต่อ" : "Cancel"}
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
