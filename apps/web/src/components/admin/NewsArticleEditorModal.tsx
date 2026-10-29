"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  X,
  Save,
  Loader2,
  FileText,
  Languages,
  CheckCircle2,
  AlertCircle,
} from "lucide-react"

export interface NewsArticleEditorModalProps {
  article: any | null
  isOpen: boolean
  onClose: () => void
  onSaved?: () => void
  locale?: "en" | "th"
}

export function NewsArticleEditorModal(props: NewsArticleEditorModalProps) {
  if (!props.isOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
    >
      <NewsArticleEditorForm
        key={props.article?.id || "new"}
        {...props}
      />
    </div>
  )
}

function NewsArticleEditorForm({
  article,
  onClose,
  onSaved,
  locale = "en",
}: NewsArticleEditorModalProps) {
  const router = useRouter()
  const isTh = locale === "th"

  const [activeTab, setActiveTab] = React.useState<"en" | "th">(isTh ? "th" : "en")
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [toast, setToast] = React.useState<{ message: string; type: "success" | "error" } | null>(null)

  // Initialize form fields directly from article
  const [titleEn, setTitleEn] = React.useState(
    () => article?.title_en || (typeof article?.title === "string" ? article?.title : article?.title?.en) || ""
  )
  const [titleTh, setTitleTh] = React.useState(
    () => article?.title_th || (typeof article?.title === "object" ? article?.title?.th : "") || ""
  )
  const [slug, setSlug] = React.useState(() => article?.slug || "")
  const [category, setCategory] = React.useState(() => article?.category || "campus-life")
  const [categoryTh, setCategoryTh] = React.useState(() => article?.category_th || "")
  const [excerptEn, setExcerptEn] = React.useState(
    () => article?.excerpt_en || (typeof article?.excerpt === "string" ? article?.excerpt : article?.excerpt?.en) || ""
  )
  const [excerptTh, setExcerptTh] = React.useState(
    () => article?.excerpt_th || (typeof article?.excerpt === "object" ? article?.excerpt?.th : "") || ""
  )
  const [contentEn, setContentEn] = React.useState(
    () => article?.content_en || (typeof article?.content === "string" ? article?.content : article?.content?.en) || article?.excerpt_en || ""
  )
  const [contentTh, setContentTh] = React.useState(
    () => article?.content_th || (typeof article?.content === "object" ? article?.content?.th : "") || article?.excerpt_th || ""
  )
  const [imageUrl, setImageUrl] = React.useState(
    () => article?.imageUrl || article?.featuredImage?.url || ""
  )

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!titleEn.trim() && !titleTh.trim()) {
      setToast({
        message: isTh ? "กรุณากรอกหัวข้อข่าวอย่างน้อยหนึ่งภาษา" : "Please enter a headline in at least one language.",
        type: "error",
      })
      return
    }

    setIsSubmitting(true)
    try {
      const res = await fetch("/api/admin/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: article?.id,
          title: titleEn || titleTh,
          title_th: titleTh || titleEn,
          slug: slug.trim(),
          category,
          category_th: categoryTh,
          excerpt: excerptEn || excerptTh,
          excerpt_th: excerptTh || excerptEn,
          content: contentEn || contentTh || excerptEn,
          content_th: contentTh || contentEn || excerptTh,
          imageUrl: imageUrl.trim(),
          publishDate: article?.publishDate || new Date().toISOString(),
        }),
      })

      const data = await res.json()
      if (!data.success) {
        throw new Error(data.error || "Failed to save article")
      }

      router.refresh()
      if (onSaved) onSaved()
      onClose()
    } catch (err: any) {
      setToast({
        message: err?.message || (isTh ? "บันทึกข่าวไม่สำเร็จ" : "Failed to save news article."),
        type: "error",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[92vh] overflow-hidden flex flex-col my-auto animate-in zoom-in-95 duration-200">
      {/* Modal Header */}
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#1e3a8a] text-white flex items-center justify-center shadow-xs">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
              {article
                ? isTh
                  ? "แก้ไขบทความและเนื้อหาข่าวสาร"
                  : "Edit Campus News Article"
                : isTh
                ? "เพิ่มบทความข่าวสารใหม่"
                : "Create New Campus News Article"}
            </h3>
            <p className="text-xs text-slate-500">
              {isTh
                ? "รองรับเนื้อหาฉบับเต็มทั้งภาษาไทยและอังกฤษ พร้อมระบบซิงค์สดสู่หน้าเว็บจริง"
                : "Bilingual content editor with full story paragraphs and instant real-time sync."}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Form Body */}
      <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Toast Notification */}
        {toast && (
          <div
            className={`p-3.5 rounded-2xl text-xs font-semibold flex items-center justify-between ${
              toast.type === "success"
                ? "bg-emerald-50 text-emerald-900 border border-emerald-200"
                : "bg-rose-50 text-rose-900 border border-rose-200"
            }`}
          >
            <div className="flex items-center gap-2">
              {toast.type === "success" ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-600" />
              )}
              <span>{toast.message}</span>
            </div>
            <button type="button" onClick={() => setToast(null)}>
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Bilingual Language Tabs */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Languages className="w-4 h-4 text-[#1e3a8a]" />
            {isTh ? "เลือกภาษาที่ต้องการแก้ไข" : "Active Language Tab"}
          </span>

          <div className="flex gap-1 p-1 bg-slate-100 rounded-xl text-xs font-bold">
            <button
              type="button"
              onClick={() => setActiveTab("th")}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === "th"
                  ? "bg-[#1e3a8a] text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <span>🇹🇭</span>
              <span>ภาษาไทย (TH)</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("en")}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === "en"
                  ? "bg-[#1e3a8a] text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <span>🇬🇧</span>
              <span>English (EN)</span>
            </button>
          </div>
        </div>

        {/* Meta Fields: Category & Cover Image */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              {isTh ? "หมวดหมู่บทความ" : "Article Category"}
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a]"
            >
              <option value="campus-life">Campus Life / ชีวิตในรั้วโรงเรียน</option>
              <option value="announcements">Announcements / ประกาศสำคัญ</option>
              <option value="academics">Academics / วิชาการ</option>
              <option value="events">Events / กิจกรรม</option>
              <option value="community">Community / ชุมชนภักดีพรรณ</option>
              <option value="achievement">Achievement / ความสำเร็จ</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              {isTh ? "ลิงก์รูปภาพหน้าปก (Cover Image URL)" : "Cover Image URL"}
            </label>
            <input
              type="url"
              placeholder="https://images.unsplash.com/... or /images/..."
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a]"
            />
          </div>
        </div>

        {/* Thai Fields */}
        {activeTab === "th" && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1.5">
                หัวข้อข่าว (ภาษาไทย) <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                placeholder="เช่น เปิดรับสมัครนักเรียนใหม่ ประจำปีการศึกษา 2568"
                value={titleTh}
                onChange={(e) => setTitleTh(e.target.value)}
                className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a] font-medium"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1.5">
                สรุปย่อบทความ (Excerpt ภาษาไทย - แสดงในการ์ดและ Modal)
              </label>
              <textarea
                rows={3}
                placeholder="สรุปประเด็นสำคัญของข่าวสารสั้นๆ 1-2 ประโยค..."
                value={excerptTh}
                onChange={(e) => setExcerptTh(e.target.value)}
                className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a] leading-relaxed"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-800">
                  เนื้อหาข่าวฉบับเต็ม (Full Story Content ภาษาไทย) <span className="text-rose-500">*</span>
                </label>
                <span className="text-[11px] text-slate-400">
                  เว้น 1 บรรทัดเพื่อขึ้นย่อหน้าใหม่
                </span>
              </div>
              <textarea
                rows={8}
                placeholder="กรอกเนื้อหาข่าวฉบับเต็มแบบหลายย่อหน้า เพื่อให้ผู้อ่านสามารถอ่านบทความฉบับสมบูรณ์ได้..."
                value={contentTh}
                onChange={(e) => setContentTh(e.target.value)}
                className="w-full px-4 py-3 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a] leading-relaxed font-normal"
              />
            </div>
          </div>
        )}

        {/* English Fields */}
        {activeTab === "en" && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1.5">
                Headline (English) <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Admissions Open for Academic Year 2025–2026"
                value={titleEn}
                onChange={(e) => setTitleEn(e.target.value)}
                className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a] font-medium"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1.5">
                Article Excerpt (English - Shown on cards and preview modal)
              </label>
              <textarea
                rows={3}
                placeholder="A concise summary of the news story..."
                value={excerptEn}
                onChange={(e) => setExcerptEn(e.target.value)}
                className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a] leading-relaxed"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-800">
                  Full Story Content (English) <span className="text-rose-500">*</span>
                </label>
                <span className="text-[11px] text-slate-400">
                  Leave blank lines between paragraphs
                </span>
              </div>
              <textarea
                rows={8}
                placeholder="Enter detailed multi-paragraph story content for reader modal and dedicated /news/[id] page..."
                value={contentEn}
                onChange={(e) => setContentEn(e.target.value)}
                className="w-full px-4 py-3 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a] leading-relaxed font-normal"
              />
            </div>
          </div>
        )}

        {/* URL Slug */}
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">
            {isTh ? "URL Slug (ที่อยู่หน้าบทความ)" : "URL Slug"}
          </label>
          <div className="flex items-center text-xs text-slate-500 bg-slate-100 px-3 py-2 rounded-xl border border-slate-200">
            <span className="text-slate-400">/news/</span>
            <input
              type="text"
              placeholder="admissions-open-2025"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="bg-transparent flex-1 font-mono text-slate-800 focus:outline-none pl-1"
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
          >
            {isTh ? "ยกเลิก" : "Cancel"}
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2.5 bg-[#1e3a8a] hover:bg-[#172e6b] text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{isTh ? "กำลังบันทึกและซิงค์..." : "Saving & Syncing..."}</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>{isTh ? "บันทึกและเผยแพร่ข่าว" : "Save & Publish Article"}</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
