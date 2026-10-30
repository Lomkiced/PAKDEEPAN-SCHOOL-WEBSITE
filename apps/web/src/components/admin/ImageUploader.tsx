"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  UploadCloud,
  Link2,
  Image as ImageIcon,
  Check,
  Copy,
  Trash2,
  X,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  FileCheck,
  AlertTriangle,
} from "lucide-react"
import { extractPlainText } from "@/lib/richText"

export interface ImageUploaderProps {
  initialImageUrl?: string
  initialMediaId?: string | number
  label?: string
  description?: string
  targetType?: "global" | "collection"
  targetSlug?: string
  docId?: string | number
  fieldName?: string
  onImageUploaded?: (result: { url: string; id?: string | number }) => void
  onRemove?: () => void
  aspectRatio?: "landscape" | "portrait" | "square" | "video"
  className?: string
  locale?: "en" | "th"
  compact?: boolean
}

const getClientLocale = (defaultLoc: "en" | "th" = "th"): "en" | "th" => {
  if (typeof window === "undefined") return defaultLoc
  try {
    const stored = localStorage.getItem("pakdeepan_locale")
    if (stored === "th" || stored === "en") return stored as "en" | "th"
    const cookieMatch = document.cookie.match(/(?:^|;\s*)NEXT_LOCALE=([^;]+)/)
    if (cookieMatch && (cookieMatch[1] === "th" || cookieMatch[1] === "en")) {
      return cookieMatch[1] as "en" | "th"
    }
  } catch {
    // Ignore
  }
  return defaultLoc
}

export function ImageUploader({
  initialImageUrl = "",
  initialMediaId,
  label = "Image Asset",
  description = "Upload a local image file or paste an external image URL. Changes sync in real-time.",
  targetType,
  targetSlug,
  docId,
  fieldName,
  onImageUploaded,
  onRemove,
  aspectRatio = "landscape",
  className = "",
  locale: propLocale,
  compact = false,
}: ImageUploaderProps) {
  const router = useRouter()
  const [activeLocale] = React.useState<"en" | "th">(() => propLocale || getClientLocale("th"))
  const isTh = activeLocale === "th"

  // Ensure safe string rendering against any Lexical richText objects or nested dictionaries
  const safeLabel = extractPlainText(label, isTh ? "th" : "en") || (isTh ? "รูปภาพ" : "Image Asset")
  const safeDescription = extractPlainText(description, isTh ? "th" : "en")

  // State
  const [currentUrl, setCurrentUrl] = React.useState<string>(initialImageUrl)
  const [currentId, setCurrentId] = React.useState<string | number | undefined>(initialMediaId)
  const [inputUrl, setInputUrl] = React.useState<string>("")
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = React.useState<string>(initialImageUrl)
  const [activeTab, setActiveTab] = React.useState<"upload" | "url">("upload")
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [isDeleting, setIsDeleting] = React.useState<boolean>(false)
  const [dragActive, setDragActive] = React.useState<boolean>(false)
  const [copied, setCopied] = React.useState<boolean>(false)
  
  // Safe delete dialog state
  const [deleteModalOpen, setDeleteModalOpen] = React.useState<boolean>(false)
  const [toast, setToast] = React.useState<{ message: string; type: "success" | "error" } | null>(null)

  const fileInputRef = React.useRef<HTMLInputElement>(null)

  // Auto-dismiss toast
  React.useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4000)
      return () => clearTimeout(timer)
    }
  }, [toast])

  // Sync external changes
  const [prevInitial, setPrevInitial] = React.useState<string>(initialImageUrl)
  if (initialImageUrl !== prevInitial) {
    setPrevInitial(initialImageUrl)
    setCurrentUrl(initialImageUrl)
    setPreviewUrl(initialImageUrl)
    setCurrentId(initialMediaId)
  }

  // Handle local file selection
  const handleFileChange = (file: File) => {
    if (!file) return
    if (!file.type.startsWith("image/")) {
      setToast({
        message: isTh ? "กรุณาเลือกไฟล์ที่เป็นรูปภาพเท่านั้น (PNG, JPG, WebP, SVG)" : "Please select an image file",
        type: "error",
      })
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      setToast({
        message: isTh ? "ขนาดไฟล์ต้องไม่เกิน 10MB" : "File size must be under 10MB",
        type: "error",
      })
      return
    }

    setSelectedFile(file)
    setInputUrl("")
    const localBlob = URL.createObjectURL(file)
    setPreviewUrl(localBlob)
  }

  // Drag and drop handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0])
    }
  }

  // Handle URL change with instant preview
  const handleUrlChange = (url: string) => {
    setInputUrl(url)
    setSelectedFile(null)
    if (url.trim()) {
      setPreviewUrl(url.trim())
    } else {
      setPreviewUrl(currentUrl)
    }
  }

  // Save / Upload Action
  const handleSave = async () => {
    if (!selectedFile && !inputUrl.trim()) {
      setToast({
        message: isTh
          ? "กรุณาเลือกไฟล์รูปภาพหรือวางลิงก์ก่อนบันทึก"
          : "Please select an image file or paste a URL first",
        type: "error",
      })
      return
    }

    setIsLoading(true)

    try {
      let uploadResult: { success: boolean; url: string; id?: string | number; error?: string }

      if (selectedFile) {
        // Upload File via FormData
        const formData = new FormData()
        formData.append("file", selectedFile)
        formData.append("alt", safeLabel)

        const res = await fetch("/api/admin/upload-image", {
          method: "POST",
          body: formData,
        })
        uploadResult = await res.json()
      } else {
        // Upload external URL via JSON
        const res = await fetch("/api/admin/upload-image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: inputUrl.trim(), alt: safeLabel }),
        })
        uploadResult = await res.json()
      }

      if (!uploadResult.success || !uploadResult.url) {
        throw new Error(uploadResult.error || (isTh ? "อัปโหลดไม่สำเร็จ" : "Upload failed"))
      }

      // If target database field is provided, update it automatically
      if (targetType && targetSlug && fieldName) {
        const updateRes = await fetch("/api/admin/update-image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            targetType,
            targetSlug,
            id: docId,
            fieldName,
            mediaId: uploadResult.id,
            imageUrl: uploadResult.url,
          }),
        })

        const updateData = await updateRes.json()
        if (!updateData.success) {
          throw new Error(
            updateData.error ||
              (isTh ? "ไม่สามารถเชื่อมโยงรูปภาพกับเนื้อหาได้" : "Failed to link image to document")
          )
        }
      }

      // Update state immediately
      setCurrentUrl(uploadResult.url)
      setCurrentId(uploadResult.id)
      setPreviewUrl(uploadResult.url)
      setSelectedFile(null)
      setInputUrl("")

      if (onImageUploaded) {
        onImageUploaded({ url: uploadResult.url, id: uploadResult.id })
      }

      router.refresh()

      setToast({
        message: isTh
          ? "บันทึกข้อมูลเรียบร้อยแล้ว! รูปภาพซิงค์สู่เว็บไซต์จริงทันที"
          : "Saved successfully! Image synced to the live site instantaneously.",
        type: "success",
      })
    } catch (err: any) {
      setToast({
        message: err.message || (isTh ? "เกิดข้อผิดพลาดในการบันทึก" : "Error saving image"),
        type: "error",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Delete Action
  const handleDelete = async () => {
    setIsDeleting(true)

    try {
      if (targetType && targetSlug && fieldName) {
        const updateRes = await fetch("/api/admin/update-image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            targetType,
            targetSlug,
            id: docId,
            fieldName,
            mediaId: null,
            imageUrl: "",
          }),
        })
        const updateData = await updateRes.json()
        if (!updateData.success) {
          throw new Error(updateData.error || (isTh ? "ลบรูปภาพไม่สำเร็จ" : "Failed to remove image"))
        }
      }

      setCurrentUrl("")
      setCurrentId(undefined)
      setPreviewUrl("")
      setSelectedFile(null)
      setInputUrl("")
      setDeleteModalOpen(false)

      if (onRemove) {
        onRemove()
      }

      router.refresh()

      setToast({
        message: isTh ? "ลบรูปภาพและอัปเดตหน้าเว็บจริงเรียบร้อยแล้ว" : "Image removed from site.",
        type: "success",
      })
    } catch (err: any) {
      setToast({
        message: err.message || (isTh ? "เกิดข้อผิดพลาดในการลบ" : "Error removing image"),
        type: "error",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  // Copy URL to clipboard
  const handleCopyUrl = () => {
    if (!previewUrl) return
    navigator.clipboard.writeText(previewUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    setToast({
      message: isTh ? "คัดลอกลิงก์รูปภาพแล้ว" : "URL copied to clipboard",
      type: "success",
    })
  }

  // Aspect ratio styling for preview container
  const aspectClasses = {
    landscape: "aspect-16/10",
    portrait: "aspect-3/4",
    square: "aspect-square",
    video: "aspect-video",
  }[aspectRatio]

  return (
    <div className={`bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-sm transition-all ${className}`}>
      
      {/* Toast Feedback */}
      {toast && (
        <div
          role="status"
          className={`mb-5 p-4 rounded-2xl text-base font-bold flex items-center justify-between border ${
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
          <button
            type="button"
            onClick={() => setToast(null)}
            className="p-1 rounded-lg hover:bg-black/5"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-5">
        <div>
          <h4 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2.5 flex-wrap">
            <span>{safeLabel}</span>
            {fieldName && (
              <span className="font-mono text-xs sm:text-sm text-slate-600 font-semibold bg-slate-100 px-2.5 py-0.5 rounded-lg border border-slate-200">
                {fieldName}
              </span>
            )}
          </h4>
          {safeDescription && (
            <p className="text-sm sm:text-base text-slate-600 mt-1.5 leading-relaxed">{safeDescription}</p>
          )}
        </div>

        {previewUrl && (
          <span
            className={`text-xs sm:text-sm font-bold px-3 py-1 rounded-full border inline-flex items-center gap-1.5 shrink-0 ${
              selectedFile
                ? "bg-amber-50 text-amber-800 border-amber-300"
                : inputUrl
                ? "bg-blue-50 text-blue-800 border-blue-300"
                : "bg-emerald-50 text-emerald-800 border-emerald-300"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                selectedFile ? "bg-amber-500" : inputUrl ? "bg-blue-500" : "bg-emerald-500"
              }`}
            />
            {selectedFile
              ? isTh
                ? "ไฟล์ใหม่พร้อมบันทึก"
                : "New File Ready"
              : inputUrl
              ? isTh
                ? "ลิงก์พร้อมบันทึก"
                : "URL Ready"
              : isTh
              ? "แสดงบนเว็บไซต์จริง"
              : "Live on Site"}
          </span>
        )}
      </div>

      {/* Mode Tabs */}
      <div className="flex gap-1.5 p-1.5 bg-slate-100 rounded-xl mb-5 w-fit text-sm font-semibold border border-slate-200 shadow-2xs">
        <button
          type="button"
          onClick={() => setActiveTab("upload")}
          className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
            activeTab === "upload"
              ? "bg-white text-slate-900 shadow-2xs border border-slate-200"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <UploadCloud className="w-4 h-4 text-[#1e3a8a]" />
          <span>{isTh ? "อัปโหลดไฟล์จากเครื่อง" : "Upload Local File"}</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("url")}
          className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
            activeTab === "url"
              ? "bg-white text-slate-900 shadow-2xs border border-slate-200"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Link2 className="w-4 h-4 text-[#1e3a8a]" />
          <span>{isTh ? "วางลิงก์รูปภาพ (URL)" : "Paste Image URL"}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Input / Dropzone Area */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {activeTab === "upload" ? (
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-8 sm:p-10 bg-slate-50/60 hover:bg-slate-100/60 transition-all flex flex-col items-center justify-center text-center cursor-pointer group ${
                dragActive
                  ? "border-[#1e3a8a] bg-[#1e3a8a]/5 ring-4 ring-[#1e3a8a]/10"
                  : "border-slate-300 hover:border-slate-400"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp,image/svg+xml,image/avif"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileChange(e.target.files[0])
                  }
                }}
              />

              <div
                className={`w-16 h-16 rounded-xl flex items-center justify-center mb-3.5 transition-transform duration-200 group-hover:scale-105 shadow-2xs ${
                  dragActive
                    ? "bg-[#1e3a8a] text-white"
                    : "bg-white text-[#1e3a8a] border border-slate-200"
                }`}
              >
                <UploadCloud className="w-8 h-8 text-[#1e3a8a]" />
              </div>

              <p className="text-base sm:text-lg font-bold text-slate-800">
                {selectedFile ? (
                  <span className="text-[#1e3a8a] font-extrabold inline-flex items-center gap-2">
                    <FileCheck className="w-5 h-5 text-emerald-600" />
                    {selectedFile.name}
                  </span>
                ) : (
                  <>
                    <span className="text-[#1e3a8a] underline font-extrabold">
                      {isTh ? "คลิกเลือกไฟล์ภาพ" : "Browse Files"}
                    </span>{" "}
                    {isTh ? "หรือลากไฟล์มาวางที่นี่" : "or drag and drop here"}
                  </>
                )}
              </p>

              <p className="text-xs sm:text-sm text-slate-500 mt-1.5 font-medium">
                PNG, JPG, WebP, SVG, AVIF ({isTh ? "ขนาดสูงสุดไม่เกิน 10MB" : "Max size 10MB"})
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-2.5">
              <label className="text-base font-semibold text-slate-800 flex items-center gap-2">
                <Link2 className="w-4 h-4 text-slate-500" />
                <span>{isTh ? "ที่อยู่ลิงก์รูปภาพ (Public URL)" : "Image Source URL"}</span>
              </label>

              <div className="relative flex items-center">
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/... or /images/..."
                  value={inputUrl}
                  onChange={(e) => handleUrlChange(e.target.value)}
                  className="w-full px-4 py-3 text-base bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a] shadow-2xs transition-all pr-16"
                />
                {inputUrl && (
                  <button
                    type="button"
                    onClick={() => handleUrlChange("")}
                    className="absolute right-3 px-2.5 py-1 text-xs font-semibold text-slate-500 hover:text-slate-800 rounded-md hover:bg-slate-100 transition-colors"
                  >
                    {isTh ? "ล้าง" : "Clear"}
                  </button>
                )}
              </div>

              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">
                {isTh
                  ? "วางลิงก์รูปภาพความละเอียดสูงจาก Supabase Storage, CDN หรือ Unsplash ระบบจะแสดงตัวอย่างสดทันที"
                  : "Paste any high-resolution public URL. It will preview live immediately."}
              </p>
            </div>
          )}

          {/* Action Buttons Row */}
          <div className="flex items-center gap-3 pt-2 flex-wrap">
            <button
              type="button"
              disabled={isLoading || isDeleting || (!selectedFile && !inputUrl)}
              onClick={handleSave}
              className={`px-6 py-3 text-base font-bold rounded-xl text-white transition-all flex items-center gap-2 shadow-sm ${
                isLoading || isDeleting || (!selectedFile && !inputUrl)
                  ? "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
                  : "bg-[#1e3a8a] hover:bg-[#1e40af] active:scale-[0.99]"
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>{isTh ? "กำลังบันทึกและซิงค์..." : "Saving & Syncing..."}</span>
                </>
              ) : (
                <>
                  <Check className="w-5 h-5" />
                  <span>{isTh ? "บันทึกและเผยแพร่" : "Save Changes"}</span>
                </>
              )}
            </button>

            {/* Copy URL Button */}
            {previewUrl && (
              <button
                type="button"
                onClick={handleCopyUrl}
                className="px-4 py-3 text-base font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 rounded-xl transition-all flex items-center gap-2 border border-slate-200 shadow-2xs"
                title={isTh ? "คัดลอกลิงก์รูปภาพ" : "Copy Image URL"}
              >
                {copied ? (
                  <>
                    <Check className="w-5 h-5 text-emerald-600" />
                    <span className="text-emerald-700">{isTh ? "คัดลอกแล้ว!" : "Copied!"}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5 text-slate-500" />
                    <span>{isTh ? "คัดลอกลิงก์" : "Copy URL"}</span>
                  </>
                )}
              </button>
            )}

            {/* Delete / Remove Button */}
            {previewUrl && (
              <button
                type="button"
                onClick={() => setDeleteModalOpen(true)}
                className="px-4 py-3 text-base font-semibold text-slate-600 hover:text-rose-600 bg-white hover:bg-rose-50 rounded-xl transition-colors flex items-center gap-2 border border-slate-200 hover:border-rose-200 shadow-2xs"
              >
                <Trash2 className="w-5 h-5" />
                <span>{isTh ? "ลบรูปภาพ" : "Delete"}</span>
              </button>
            )}
          </div>
        </div>

        {/* Right: Instant Live Preview Panel */}
        <div className="lg:col-span-5 flex flex-col gap-2.5">
          <label className="text-base font-semibold text-slate-800 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <ImageIcon className="w-4.5 h-4.5 text-slate-500" />
              <span>{isTh ? "ตัวอย่างการแสดงผลจริง" : "Live Visual Preview"}</span>
            </span>
            {previewUrl && (
              <span className="text-xs font-mono text-slate-500 font-normal">
                {aspectRatio}
              </span>
            )}
          </label>

          <div
            className={`relative ${aspectClasses} rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-inner flex items-center justify-center`}
          >
            {previewUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={previewUrl}
                alt={safeLabel}
                className="w-full h-full object-cover transition-all"
              />
            ) : (
              <div className="flex flex-col items-center justify-center p-6 text-slate-400 text-center">
                <ImageIcon className="w-12 h-12 mb-2 text-slate-300" />
                <p className="text-base font-bold text-slate-600">
                  {isTh ? "ยังไม่มีรูปภาพที่กำหนด" : "No image configured"}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  {isTh ? "อัปโหลดไฟล์หรือวางลิงก์ด้านซ้ายเพื่อดูตัวอย่าง" : "Upload a file or paste URL to preview"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal for ImageUploader */}
      {deleteModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200"
        >
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-md p-6 sm:p-8 text-center animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-2xl bg-rose-50 border border-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4 shadow-inner">
              <AlertTriangle className="w-8 h-8 text-rose-600" />
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-2">
              {isTh ? "ยืนยันการลบรูปภาพนี้?" : "Confirm Delete Image?"}
            </h3>

            <p className="text-base text-slate-600 leading-relaxed mb-6">
              {isTh
                ? `คุณต้องการลบรูปภาพ "${safeLabel}" ออกจากระบบและเว็บไซต์จริงหรือไม่? การกระทำนี้ไม่สามารถย้อนกลับได้`
                : `Are you sure you want to delete the image for "${safeLabel}"? This action cannot be undone.`}
            </p>

            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setDeleteModalOpen(false)}
                disabled={isDeleting}
                className="px-5 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-bold text-base transition-colors"
              >
                {isTh ? "ยกเลิก" : "Cancel"}
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-base shadow-md shadow-rose-600/30 transition-all flex items-center gap-2"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>{isTh ? "กำลังลบ..." : "Deleting..."}</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-5 h-5" />
                    <span>{isTh ? "ยืนยันการลบ" : "Yes, Delete"}</span>
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

export default ImageUploader
