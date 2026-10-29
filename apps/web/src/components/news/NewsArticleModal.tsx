"use client"

import * as React from "react"
import Link from "next/link"
import {
  X,
  Calendar,
  Clock,
  Share2,
  Check,
  ExternalLink,
  BookOpen,
  Sparkles,
} from "lucide-react"
import type { NormalizedNewsItem } from "@/lib/newsData"

export interface NewsArticleModalProps {
  article: NormalizedNewsItem | null
  isOpen: boolean
  onClose: () => void
  locale?: "en" | "th"
}

export function NewsArticleModal({
  article,
  isOpen,
  onClose,
  locale = "en",
}: NewsArticleModalProps) {
  const isTh = locale === "th"
  const [copied, setCopied] = React.useState(false)

  // Close on ESC key & prevent body background scrolling when modal is open
  React.useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = originalOverflow
    }
  }, [isOpen, onClose])

  if (!isOpen || !article) return null

  const handleShare = async () => {
    const origin =
      typeof window !== "undefined" ? window.location.origin : "https://pakdeepan.ac.th"
    const shareUrl = `${origin}/news/${article.slug || article.id}`

    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl)
        setCopied(true)
        setTimeout(() => setCopied(false), 2500)
      }
    } catch {
      // Fallback
    }
  }

  // Parse multi-paragraph body text cleanly
  const paragraphs = (article.content || article.excerpt || "")
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean)

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="news-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-200/90 w-full max-w-2xl max-h-[92vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200 my-auto">
        
        {/* Top Hero Banner with Floating Category & Close Button */}
        <div className="relative w-full h-52 sm:h-72 overflow-hidden bg-slate-100 flex-shrink-0 group">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Subtle bottom gradient to blend image into content */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none" />

          {/* Floating Category Badge (Top Left) */}
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/90 text-[#1e3a8a] backdrop-blur-md shadow-md border border-white/50">
              <Sparkles className="w-3.5 h-3.5 text-[#1e3a8a]" />
              <span>{article.category}</span>
            </span>
          </div>

          {/* Close Button (Top Right) */}
          <button
            type="button"
            onClick={onClose}
            aria-label={isTh ? "ปิดหน้าต่าง" : "Close modal"}
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md flex items-center justify-center transition-all shadow-md hover:scale-105"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Headline overlaid slightly on bottom of hero */}
          <div className="absolute bottom-4 left-4 right-4 z-10 text-white">
            <div className="flex items-center gap-3 text-xs font-medium text-white/90 drop-shadow">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {article.formattedDate}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {article.readTime}
              </span>
            </div>
          </div>
        </div>

        {/* Scrollable Story Content Area */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-5 flex-1 text-slate-800">
          
          {/* Main Headline */}
          <h2
            id="news-modal-title"
            className="text-xl sm:text-2xl font-black text-slate-900 leading-snug tracking-tight"
          >
            {article.title}
          </h2>

          {/* Excerpt Lead Box */}
          {article.excerpt && (
            <div className="p-4 rounded-2xl bg-blue-50/70 border-l-4 border-[#1e3a8a] text-xs sm:text-sm font-semibold text-[#1e3a8a] leading-relaxed shadow-2xs">
              {article.excerpt}
            </div>
          )}

          {/* Full Story Paragraphs */}
          <div className="text-sm sm:text-[15px] leading-relaxed text-slate-700 space-y-4 pt-1 font-normal">
            {paragraphs.map((para, idx) => (
              <p key={idx} className="whitespace-pre-line">
                {para}
              </p>
            ))}
          </div>
        </div>

        {/* Footer Action Bar */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3 flex-wrap">
          {/* Share / Copy Link Button */}
          <button
            type="button"
            onClick={handleShare}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border shadow-2xs ${
              copied
                ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                : "bg-white hover:bg-slate-100 text-slate-700 border-slate-200"
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>{isTh ? "คัดลอกลิงก์แล้ว!" : "Link Copied!"}</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-slate-500" />
                <span>{isTh ? "คัดลอกลิงก์" : "Share Article"}</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-2">
            {/* Open Full Page Link */}
            <Link
              href={`/news/${article.slug || article.id}`}
              onClick={onClose}
              className="px-4 py-2 bg-[#1e3a8a] hover:bg-[#172e6b] text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 hover:shadow"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{isTh ? "เปิดหน้าบทความเต็ม" : "Open Full Page"}</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </Link>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-200/50 transition-colors"
            >
              {isTh ? "ปิด" : "Close"}
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

