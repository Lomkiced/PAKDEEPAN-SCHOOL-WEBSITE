"use client"

import React from "react"
import Link from "next/link"

export function AdminNavBanner() {
  const [currentLocale, setCurrentLocale] = React.useState<"en" | "th">(() => {
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

  return (
    <div
      style={{
        margin: "1.5rem 0",
        padding: "1.25rem 1.75rem",
        borderRadius: "1rem",
        background: "linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%)",
        color: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "1.25rem",
        boxShadow: "0 4px 16px rgba(30, 58, 138, 0.15)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
          <h3 style={{ margin: 0, fontSize: "1.15rem", fontWeight: 800, color: "#ffffff" }}>
            {isThai ? "ศูนย์จัดการรูปภาพและสื่อเว็บไซต์" : "Visual Assets & Image Manager"}
          </h3>
          <span
            style={{
              fontSize: "0.7rem",
              fontWeight: 700,
              padding: "0.15rem 0.5rem",
              borderRadius: "9999px",
              background: "rgba(16, 185, 129, 0.2)",
              color: "#34d399",
              border: "1px solid rgba(52, 211, 153, 0.3)",
            }}
          >
            ● {isThai ? "ระบบซิงค์สดเปิดใช้งาน" : "Real-Time Sync Active"}
          </span>
        </div>
        <p style={{ margin: 0, fontSize: "0.85rem", color: "rgba(255, 255, 255, 0.75)" }}>
          {isThai
            ? "อัปโหลดและเปลี่ยนรูปภาพ Hero, สาส์นผู้อำนวยการ, หลักสูตร, ข่าวสาร และแกลเลอรี พร้อมตัวอย่างสดทันที"
            : "Replace any image across Hero Banner, School Director, Academic Programs, News, and Gallery with live preview."}
        </p>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
        
        {/* Prominent Admin Language Switcher */}
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
            onClick={() => switchLocale("en")}
            style={{
              padding: "0.35rem 0.75rem",
              borderRadius: "0.5rem",
              fontSize: "0.75rem",
              fontWeight: 700,
              border: "none",
              cursor: "pointer",
              transition: "all 0.2s",
              background: !isThai ? "#ffffff" : "transparent",
              color: !isThai ? "#1e3a8a" : "rgba(255, 255, 255, 0.8)",
              boxShadow: !isThai ? "0 2px 4px rgba(0,0,0,0.1)" : "none",
            }}
          >
            🇬🇧 EN
          </button>
          <button
            type="button"
            onClick={() => switchLocale("th")}
            style={{
              padding: "0.35rem 0.75rem",
              borderRadius: "0.5rem",
              fontSize: "0.75rem",
              fontWeight: 700,
              border: "none",
              cursor: "pointer",
              transition: "all 0.2s",
              background: isThai ? "#ffffff" : "transparent",
              color: isThai ? "#1e3a8a" : "rgba(255, 255, 255, 0.8)",
              boxShadow: isThai ? "0 2px 4px rgba(0,0,0,0.1)" : "none",
            }}
          >
            🇹🇭 ภาษาไทย
          </button>
        </div>

        <Link
          href="/admin/image-manager"
          style={{
            padding: "0.65rem 1.25rem",
            borderRadius: "0.75rem",
            background: "#ec4899",
            color: "#ffffff",
            fontWeight: 700,
            fontSize: "0.85rem",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            boxShadow: "0 2px 8px rgba(236, 72, 153, 0.3)",
          }}
        >
          {isThai ? "เปิดศูนย์จัดการรูปภาพ →" : "Open Image Manager →"}
        </Link>
      </div>
    </div>
  )
}

export default AdminNavBanner
