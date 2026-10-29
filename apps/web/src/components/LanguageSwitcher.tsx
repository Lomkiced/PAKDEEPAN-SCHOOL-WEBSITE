"use client"

import * as React from "react"
import { useLanguage, type Locale } from "@/context/LanguageContext"

interface LanguageSwitcherProps {
  variant?: "navbar" | "admin" | "minimal"
  className?: string
}

export function LanguageSwitcher({
  variant = "navbar",
  className = "",
}: LanguageSwitcherProps) {
  const { locale, setLocale } = useLanguage()

  const handleSelect = (newLocale: Locale) => {
    setLocale(newLocale)
  }

  if (variant === "admin") {
    return (
      <div
        className={`inline-flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold ${className}`}
        role="group"
        aria-label="Admin Language Selector"
      >
        <button
          type="button"
          onClick={() => handleSelect("en")}
          className={`px-3 py-1.5 rounded-lg transition-all duration-200 flex items-center gap-1.5 ${
            locale === "en"
              ? "bg-[#1e3a8a] text-white shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
          aria-pressed={locale === "en"}
        >
          <span>🇬🇧</span>
          <span>EN</span>
        </button>
        <button
          type="button"
          onClick={() => handleSelect("th")}
          className={`px-3 py-1.5 rounded-lg transition-all duration-200 flex items-center gap-1.5 ${
            locale === "th"
              ? "bg-[#1e3a8a] text-white shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
          aria-pressed={locale === "th"}
        >
          <span>🇹🇭</span>
          <span>ไทย</span>
        </button>
      </div>
    )
  }

  if (variant === "minimal") {
    return (
      <div className={`inline-flex items-center gap-2 text-xs font-bold ${className}`}>
        <button
          type="button"
          onClick={() => handleSelect("en")}
          className={`transition-colors ${
            locale === "en" ? "text-primary font-extrabold underline" : "text-slate-500 hover:text-slate-800"
          }`}
        >
          EN
        </button>
        <span className="text-slate-300">|</span>
        <button
          type="button"
          onClick={() => handleSelect("th")}
          className={`transition-colors ${
            locale === "th" ? "text-primary font-extrabold underline" : "text-slate-500 hover:text-slate-800"
          }`}
        >
          ไทย
        </button>
      </div>
    )
  }

  // Default Navbar variant (Modern architectural pill)
  return (
    <div
      className={`inline-flex items-center p-1 rounded-full bg-slate-100/90 border border-slate-200/80 shadow-sm backdrop-blur-sm text-xs font-bold ${className}`}
      role="group"
      aria-label="Language Selector"
    >
      <button
        type="button"
        onClick={() => handleSelect("en")}
        className={`px-3 py-1 rounded-full transition-all duration-300 ${
          locale === "en"
            ? "bg-[#1e3a8a] text-white shadow-sm scale-[1.02]"
            : "text-[#1e3a8a]/70 hover:text-[#1e3a8a]"
        }`}
        aria-pressed={locale === "en"}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => handleSelect("th")}
        className={`px-3 py-1 rounded-full transition-all duration-300 ${
          locale === "th"
            ? "bg-[#1e3a8a] text-white shadow-sm scale-[1.02]"
            : "text-[#1e3a8a]/70 hover:text-[#1e3a8a]"
        }`}
        aria-pressed={locale === "th"}
      >
        ไทย
      </button>
    </div>
  )
}

export default LanguageSwitcher

