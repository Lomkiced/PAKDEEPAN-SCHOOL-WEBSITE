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
  Sparkles,
} from "lucide-react"
import { extractPlainText } from "@/lib/richText"

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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/75 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
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
  locale = "th",
}: NewsArticleEditorModalProps) {
  const router = useRouter()
  const isTh = locale === "th"

  const [activeTab, setActiveTab] = React.useState<"en" | "th">(isTh ? "th" : "en")
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [toast, setToast] = React.useState<{ message: string; type: "success" | "error" } | null>(null)

  // Initialize form fields directly from article with safe plain text extraction
  const [titleEn, setTitleEn] = React.useState(
    () => extractPlainText(article?.title_en || article?.title?.en || (typeof article?.title === "string" ? article?.title : ""), "en")
  )
  const [titleTh, setTitleTh] = React.useState(
    () => extractPlainText(article?.title_th || article?.title?.th || (typeof article?.title === "string" && !article?.title_en ? article?.title : ""), "th")
  )
  const [slug, setSlug] = React.useState(() => (typeof article?.slug === "string" ? article.slug : ""))
  const [category, setCategory] = React.useState(() => (typeof article?.category === "string" ? article.category : "campus-life"))
  const [categoryTh, setCategoryTh] = React.useState(() => (typeof article?.category_th === "string" ? article.category_th : ""))
  const [excerptEn, setExcerptEn] = React.useState(
    () => extractPlainText(article?.excerpt_en || article?.excerpt?.en || (typeof article?.excerpt === "string" ? article?.excerpt : ""), "en")
  )
  const [excerptTh, setExcerptTh] = React.useState(
    () => extractPlainText(article?.excerpt_th || article?.excerpt?.th || (typeof article?.excerpt === "string" && !article?.excerpt_en ? article?.excerpt : ""), "th")
  )
  const [contentEn, setContentEn] = React.useState(
    () => extractPlainText(article?.content_en || article?.content?.en || (typeof article?.content === "string" ? article?.content : "") || article?.body || article?.excerpt_en || "", "en")
  )
  const [contentTh, setContentTh] = React.useState(
    () => extractPlainText(article?.content_th || article?.content?.th || (typeof article?.content === "string" && !article?.content_en ? article?.content : "") || article?.body || article?.excerpt_th || "", "th")
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
          category_th: categoryTh || category,
          excerpt: excerptEn || excerptTh,
          excerpt_th: excerptTh || excerptEn,
          content: contentEn || contentTh,
          content_th: contentTh || contentEn,
          imageUrl: imageUrl.trim(),
        }),
      })

      const data = await res.json()
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Save failed")
      }

      setToast({
        message: isTh ? "บันทึกข้อมูลเรียบร้อยแล้ว!" : "Saved successfully!",
        type: "success",
      })

      router.refresh()

      setTimeout(() => {
        if (onSaved) onSaved()
      }, 700)
    } catch (err: any) {
      setToast({
        message: err.message || (isTh ? "เกิดข้อผิดพลาดในการบันทึก" : "Failed to save article."),
        type: "error",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-4xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[92vh]">
      
      {/* Modal Header */}
      <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-slate-900">
              {article
                ? isTh
                  ? "แก้ไขเนื้อหาข่าวสาร & กิจกรรม"
                  : "Edit Campus News Article"
                : isTh
                ? "สร้างข่าวสารหรือกิจกรรมใหม่"
                : "Create New Campus Story"}
            </h3>
            <p className="text-sm text-slate-500 mt-0.5">
              {isTh
                ? "แก้ไขเนื้อหาสองภาษา (ไทย-อังกฤษ) พร้อมพารากราฟฉบับเต็มและซิงค์สดทันที"
                : "Bilingual content editor with full story paragraphs and instant real-time sync."}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Form Body */}
      <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
        
        {/* Toast Notification */}
        {toast && (
          <div
            className={`p-4 rounded-2xl text-base font-bold flex items-center justify-between border ${
              toast.type === "success"
                ? "bg-emerald-50 text-emerald-900 border-emerald-300"
                : "bg-rose-50 text-rose-900 border-rose-300"
            }`}
          >
            <div className="flex items-center gap-3">
              {toast.type === "success" ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
              )}
              <span>{toast.message}</span>
            </div>
            <button type="button" onClick={() => setToast(null)}>
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Bilingual Language Tabs with Clear Badges */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <Languages className="w-5 h-5 text-blue-600" />
            <span className="text-base font-bold text-slate-800">
              {isTh ? "เลือกภาษาที่ต้องการแก้ไข:" : "Active Language Tab:"}
            </span>
          </div>

          <div className="flex gap-1.5 p-1.5 bg-slate-100 rounded-2xl text-sm font-bold">
            <button
              type="button"
              onClick={() => setActiveTab("th")}
              className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
                activeTab === "th"
                  ? "bg-blue-600 text-white shadow-xs font-extrabold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <span>🇹🇭</span>
              <span>ข้อมูลภาษาไทย (หลัก)</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("en")}
              className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
                activeTab === "en"
                  ? "bg-blue-600 text-white shadow-xs font-extrabold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <span>🇬🇧</span>
              <span>English (EN)</span>
            </button>
          </div>
        </div>

        {/* Meta Fields: Category & Cover Image */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="text-base font-semibold text-slate-800 block mb-2">
              {isTh ? "หมวดหมู่บทความ" : "Article Category"}
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 text-base bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-600 shadow-sm transition-all font-medium"
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
            <label className="text-base font-semibold text-slate-800 block mb-2">
              {isTh ? "ลิงก์รูปภาพหน้าปก (Cover Image URL)" : "Cover Image URL"}
            </label>
            <input
              type="url"
              placeholder="https://images.unsplash.com/... or /images/..."
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-4 py-3 text-base bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-600 shadow-sm transition-all font-medium"
            />
          </div>
        </div>

        {/* Thai Fields */}
        {activeTab === "th" && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-base font-semibold text-slate-800">
                  หัวข้อข่าว (ภาษาไทย) <span className="text-rose-500">*</span>
                </label>
                <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
                  🇹🇭 ข้อมูลภาษาไทย (หลัก)
                </span>
              </div>
              <input
                type="text"
                placeholder="เช่น เปิดรับสมัครนักเรียนใหม่ ประจำปีการศึกษา 2568"
                value={titleTh}
                onChange={(e) => setTitleTh(e.target.value)}
                className="w-full px-4 py-3 text-base bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-600 shadow-sm font-semibold text-slate-900"
              />
            </div>

            <div>
              <label className="text-base font-semibold text-slate-800 block mb-2">
                สรุปย่อบทความ (Excerpt ภาษาไทย - แสดงในการ์ดและ Modal)
              </label>
              <textarea
                rows={3}
                placeholder="เช่น โรงเรียนภักดีพรรณเปิดรับสมัครนักเรียนระดับชั้นเตรียมอนุบาลและอนุบาล 1-3 ประจำปีการศึกษาใหม่ พร้อมมอบส่วนลดพิเศษ..."
                value={excerptTh}
                onChange={(e) => setExcerptTh(e.target.value)}
                className="w-full px-4 py-3 text-base bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-600 shadow-sm leading-relaxed"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-base font-semibold text-slate-800">
                  เนื้อหาข่าวฉบับเต็ม (Full Story Content ภาษาไทย) <span className="text-rose-500">*</span>
                </label>
                <span className="text-xs text-slate-500 font-medium">
                  เว้น 1 บรรทัดว่างเพื่อขึ้นย่อหน้าใหม่
                </span>
              </div>
              <textarea
                rows={8}
                placeholder="กรอกเนื้อหาข่าวฉบับเต็มแบบหลายย่อหน้า เพื่อให้ผู้อ่านสามารถอ่านบทความฉบับสมบูรณ์ได้ทั้งในหน้าอ่านและโมดอล..."
                value={contentTh}
                onChange={(e) => setContentTh(e.target.value)}
                className="w-full px-4 py-3 text-base bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-600 shadow-sm leading-relaxed font-normal"
              />
            </div>
          </div>
        )}

        {/* English Fields */}
        {activeTab === "en" && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-base font-semibold text-slate-800">
                  Headline (English) <span className="text-rose-500">*</span>
                </label>
                <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
                  🇬🇧 ข้อมูลภาษาอังกฤษ
                </span>
              </div>
              <input
                type="text"
                placeholder="e.g. Admissions Open for Academic Year 2025–2026"
                value={titleEn}
                onChange={(e) => setTitleEn(e.target.value)}
                className="w-full px-4 py-3 text-base bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-600 shadow-sm font-semibold text-slate-900"
              />
            </div>

            <div>
              <label className="text-base font-semibold text-slate-800 block mb-2">
                Article Excerpt (English - Shown on cards and preview modal)
              </label>
              <textarea
                rows={3}
                placeholder="A concise summary of the news story..."
                value={excerptEn}
                onChange={(e) => setExcerptEn(e.target.value)}
                className="w-full px-4 py-3 text-base bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-600 shadow-sm leading-relaxed"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-base font-semibold text-slate-800">
                  Full Story Content (English) <span className="text-rose-500">*</span>
                </label>
                <span className="text-xs text-slate-500 font-medium">
                  Leave a blank line between paragraphs
                </span>
              </div>
              <textarea
                rows={8}
                placeholder="Enter detailed multi-paragraph story content for reader modal and dedicated /news/[id] page..."
                value={contentEn}
                onChange={(e) => setContentEn(e.target.value)}
                className="w-full px-4 py-3 text-base bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-600 shadow-sm leading-relaxed font-normal"
              />
            </div>
          </div>
        )}

        {/* URL Slug */}
        <div>
          <label className="text-base font-semibold text-slate-800 block mb-2">
            {isTh ? "URL Slug (ที่อยู่หน้าบทความ)" : "URL Slug"}
          </label>
          <div className="flex items-center text-base text-slate-500 bg-slate-50 px-4 py-3 rounded-xl border border-slate-300">
            <span className="text-slate-400 font-mono">/news/</span>
            <input
              type="text"
              placeholder="admissions-open-2025"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="bg-transparent flex-1 font-mono text-slate-800 focus:outline-none pl-1 text-base font-medium"
            />
          </div>
        </div>

        {/* Modal Footer with Sticky/Floating Save Button */}
        <div className="pt-6 border-t border-slate-100 flex items-center justify-between gap-4 flex-wrap">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-3 rounded-xl text-base font-bold text-slate-600 hover:bg-slate-100 transition-colors"
          >
            {isTh ? "ยกเลิก" : "Cancel"}
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-base font-bold shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2.5 disabled:bg-slate-300 disabled:shadow-none"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>{isTh ? "กำลังบันทึกข้อมูล..." : "Saving..."}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>{isTh ? "บันทึกข้อมูล" : "Save Changes"}</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default NewsArticleEditorModal
