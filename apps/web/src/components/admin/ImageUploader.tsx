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
  Sparkles,
  RefreshCw,
  FileCheck,
  Eye,
} from "lucide-react"

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

const getClientLocale = (defaultLoc: "en" | "th" = "en"): "en" | "th" => {
  if (typeof window === "undefined") return defaultLoc
  try {
    const stored = localStorage.getItem("pakdeepan_locale")
    if (stored === "th" || stored === "en") return stored
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
  const [activeLocale] = React.useState<"en" | "th">(() => propLocale || getClientLocale("en"))
  const isTh = activeLocale === "th"

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
  const [confirmDelete, setConfirmDelete] = React.useState<boolean>(false)
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
    if (!selectedFile && !inputUrl) {
      setCurrentUrl(initialImageUrl)
      setPreviewUrl(initialImageUrl)
    }
  }

  // Handle local file selection with instant preview
  const handleFileChange = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setToast({
        message: isTh
          ? "กรุณาเลือกไฟล์รูปภาพที่ถูกต้อง (PNG, JPG, WebP, SVG, AVIF)"
          : "Please select a valid image file (PNG, JPG, WebP, SVG, AVIF)",
        type: "error",
      })
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      setToast({
        message: isTh
          ? "ขนาดไฟล์รูปภาพเกินกำหนด (ไม่เกิน 10MB)"
          : "File size exceeds the 10MB limit.",
        type: "error",
      })
      return
    }

    setSelectedFile(file)
    const localUrl = URL.createObjectURL(file)
    setPreviewUrl(localUrl)
    setInputUrl("")
    setConfirmDelete(false)
  }

  // Handle Drag events
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
    setConfirmDelete(false)
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
        formData.append("alt", label)

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
          body: JSON.stringify({ url: inputUrl.trim(), alt: label }),
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

      // Notify parent if callback provided
      if (onImageUploaded) {
        onImageUploaded({ url: uploadResult.url, id: uploadResult.id })
      }

      // Trigger router refresh for instant Next.js real-time data sync
      router.refresh()

      setToast({
        message: isTh
          ? "บันทึกและซิงค์รูปภาพขึ้นเว็บไซต์ทันทีสำเร็จ!"
          : "Image published and synchronized with website in real-time!",
        type: "success",
      })
    } catch (err: any) {
      console.error("[ImageUploader] Error saving image:", err)
      setToast({
        message:
          err?.message ||
          (isTh ? "อัปโหลดรูปภาพไม่สำเร็จ กรุณาลองใหม่อีกครั้ง" : "Failed to upload image. Please try again."),
        type: "error",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Handle Copy URL
  const handleCopyUrl = async () => {
    const urlToCopy = previewUrl || currentUrl
    if (!urlToCopy) return
    try {
      await navigator.clipboard.writeText(urlToCopy)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback
    }
  }

  // Delete / Remove Action with Confirmation State
  const handleDelete = async () => {
    if (!confirmDelete) {
      setConfirmDelete(true)
      return
    }

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
            clear: true,
          }),
        })
        const updateData = await updateRes.json()
        if (!updateData.success) {
          throw new Error(updateData.error || (isTh ? "ไม่สามารถลบรูปภาพได้" : "Failed to remove image"))
        }
      }

      setSelectedFile(null)
      setInputUrl("")
      setPreviewUrl("")
      setCurrentUrl("")
      setCurrentId(undefined)
      setConfirmDelete(false)
      if (fileInputRef.current) fileInputRef.current.value = ""

      if (onRemove) onRemove()

      router.refresh()
      setToast({
        message: isTh ? "ลบรูปภาพและอัปเดตเว็บไซต์เรียบร้อยแล้ว" : "Image removed and updated on live site.",
        type: "success",
      })
    } catch (err: any) {
      setToast({
        message: err?.message || (isTh ? "เกิดข้อผิดพลาดในการลบรูปภาพ" : "Failed to remove image."),
        type: "error",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  // Aspect ratio classes for preview box
  const aspectClass =
    aspectRatio === "portrait"
      ? "aspect-[3/4]"
      : aspectRatio === "square"
      ? "aspect-square"
      : aspectRatio === "video"
      ? "aspect-video"
      : "aspect-[16/10]"

  return (
    <div
      className={`bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300 ${className}`}
    >
      {/* Toast Notification */}
      {toast && (
        <div
          className={`mb-4 px-4 py-3 rounded-xl text-xs font-semibold flex items-center justify-between shadow-sm animate-in fade-in slide-in-from-top-2 duration-200 ${
            toast.type === "success"
              ? "bg-emerald-50 text-emerald-900 border border-emerald-200"
              : "bg-rose-50 text-rose-900 border border-rose-200"
          }`}
        >
          <div className="flex items-center gap-2">
            {toast.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
            )}
            <span>{toast.message}</span>
          </div>
          <button
            type="button"
            onClick={() => setToast(null)}
            className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-200/40 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            {label}
            {fieldName && (
              <span className="font-mono text-[10px] text-slate-400 font-normal bg-slate-100 px-1.5 py-0.5 rounded">
                {fieldName}
              </span>
            )}
          </h4>
          {description && (
            <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{description}</p>
          )}
        </div>
        {previewUrl && (
          <span
            className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border inline-flex items-center gap-1.5 ${
              selectedFile
                ? "bg-amber-50 text-amber-700 border-amber-200"
                : inputUrl
                ? "bg-sky-50 text-sky-700 border-sky-200"
                : "bg-emerald-50 text-emerald-700 border-emerald-200"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                selectedFile ? "bg-amber-500" : inputUrl ? "bg-sky-500" : "bg-emerald-500"
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
      <div className="flex gap-1 p-1 bg-slate-100 rounded-xl mb-4 w-fit text-xs font-semibold">
        <button
          type="button"
          onClick={() => {
            setActiveTab("upload")
            setConfirmDelete(false)
          }}
          className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
            activeTab === "upload"
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <UploadCloud className="w-3.5 h-3.5 text-slate-500" />
          <span>{isTh ? "อัปโหลดไฟล์จากเครื่อง" : "Upload Local File"}</span>
        </button>
        <button
          type="button"
          onClick={() => {
            setActiveTab("url")
            setConfirmDelete(false)
          }}
          className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
            activeTab === "url"
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Link2 className="w-3.5 h-3.5 text-slate-500" />
          <span>{isTh ? "วางลิงก์รูปภาพภายนอก" : "Paste Image URL"}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
        {/* Left: Input / Dropzone Area */}
        <div className="md:col-span-7 flex flex-col gap-3">
          {activeTab === "upload" ? (
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-8 bg-slate-50/50 hover:bg-slate-100/50 transition-all flex flex-col items-center justify-center text-center cursor-pointer group ${
                dragActive
                  ? "border-[#1e3a8a] bg-blue-50/40 ring-4 ring-blue-50"
                  : "border-slate-300 hover:border-[#1e3a8a]"
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
                className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110 shadow-sm ${
                  dragActive
                    ? "bg-[#1e3a8a] text-white"
                    : "bg-white text-slate-600 border border-slate-200"
                }`}
              >
                <UploadCloud className="w-6 h-6 text-[#1e3a8a]" />
              </div>

              <p className="text-xs font-semibold text-slate-700">
                {selectedFile ? (
                  <span className="text-[#1e3a8a] font-bold inline-flex items-center gap-1">
                    <FileCheck className="w-3.5 h-3.5" />
                    {selectedFile.name}
                  </span>
                ) : (
                  <>
                    <span className="text-[#1e3a8a] font-bold hover:underline">
                      {isTh ? "เลือกไฟล์จากเครื่อง" : "Browse Files"}
                    </span>{" "}
                    {isTh ? "หรือลากไฟล์มาวางที่นี่" : "or drag and drop"}
                  </>
                )}
              </p>

              <p className="text-[11px] text-slate-400 mt-1.5">
                PNG, JPG, WebP, SVG, AVIF ({isTh ? "ขนาดไม่เกิน 10MB" : "Max 10MB"})
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-2.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Link2 className="w-3.5 h-3.5 text-slate-400" />
                {isTh ? "ที่อยู่ลิงก์รูปภาพ (Public URL)" : "Image Source URL"}
              </label>

              <div className="relative flex items-center">
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/... or https://..."
                  value={inputUrl}
                  onChange={(e) => handleUrlChange(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50/60 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a] transition-all pr-16"
                />
                {inputUrl && (
                  <button
                    type="button"
                    onClick={() => handleUrlChange("")}
                    className="absolute right-2 px-2 py-1 text-[11px] font-bold text-slate-400 hover:text-slate-700 rounded-md hover:bg-slate-200/50 transition-colors"
                  >
                    {isTh ? "ล้าง" : "Clear"}
                  </button>
                )}
              </div>

              <p className="text-[11px] text-slate-400 leading-relaxed">
                {isTh
                  ? "วางลิงก์รูปภาพความละเอียดสูงจาก CDN, Supabase Storage หรือเว็บสาธารณะ ดูตัวอย่างได้ทันที"
                  : "Paste any high-resolution public URL. It will preview live immediately."}
              </p>
            </div>
          )}

          {/* Action Buttons Row */}
          <div className="flex items-center gap-2 pt-2 flex-wrap">
            <button
              type="button"
              disabled={isLoading || isDeleting || (!selectedFile && !inputUrl)}
              onClick={handleSave}
              className={`px-4 py-2 text-xs font-bold rounded-xl text-white transition-all flex items-center gap-2 shadow-sm ${
                isLoading || isDeleting || (!selectedFile && !inputUrl)
                  ? "bg-slate-300 text-slate-500 cursor-not-allowed shadow-none"
                  : "bg-[#1e3a8a] hover:bg-[#172e6b] active:scale-[0.98] hover:shadow"
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>{isTh ? "กำลังบันทึกและซิงค์..." : "Saving & Syncing..."}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isTh ? "บันทึกและเผยแพร่" : "Apply & Publish"}</span>
                </>
              )}
            </button>

            {/* Copy URL Button */}
            {previewUrl && (
              <button
                type="button"
                onClick={handleCopyUrl}
                className="px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/70 rounded-xl transition-all flex items-center gap-1.5"
                title={isTh ? "คัดลอกลิงก์รูปภาพ" : "Copy Image URL"}
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">{isTh ? "คัดลอกแล้ว!" : "Copied!"}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>{isTh ? "คัดลอกลิงก์" : "Copy URL"}</span>
                  </>
                )}
              </button>
            )}

            {/* Delete / Remove with Confirmation State */}
            {previewUrl && (
              <div className="inline-flex items-center">
                {confirmDelete ? (
                  <div className="inline-flex items-center gap-1 bg-rose-50 border border-rose-200 rounded-xl p-1 animate-in fade-in duration-150">
                    <span className="text-[11px] font-bold text-rose-700 px-2">
                      {isTh ? "ยืนยันการลบ?" : "Confirm Delete?"}
                    </span>
                    <button
                      type="button"
                      disabled={isDeleting}
                      onClick={handleDelete}
                      className="px-2.5 py-1 text-[11px] font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors flex items-center gap-1"
                    >
                      {isDeleting ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : (
                        <Trash2 className="w-3 h-3" />
                      )}
                      <span>{isTh ? "ใช่, ลบเลย" : "Yes, Delete"}</span>
                    </button>
                    <button
                      type="button"
                      disabled={isDeleting}
                      onClick={() => setConfirmDelete(false)}
                      className="px-2 py-1 text-[11px] font-semibold text-slate-600 hover:text-slate-900 rounded-lg hover:bg-rose-100 transition-colors"
                    >
                      {isTh ? "ยกเลิก" : "Cancel"}
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setConfirmDelete(true)}
                    className="px-3 py-2 text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition-colors flex items-center gap-1.5"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>{isTh ? "ลบรูปภาพ" : "Delete"}</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right: Instant Live Preview Panel */}
        <div className="md:col-span-5 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Eye className="w-3 h-3" />
              {isTh ? "ตัวอย่างรูปภาพสด" : "Live Preview"}
            </span>
            {previewUrl && (
              <a
                href={previewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-slate-400 hover:text-[#1e3a8a] flex items-center gap-1 transition-colors"
              >
                <span>{isTh ? "เปิดภาพเต็ม" : "Open full"}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>

          <div
            className={`w-full ${aspectClass} rounded-xl overflow-hidden bg-slate-100/70 border border-slate-200 relative flex items-center justify-center shadow-inner group transition-all`}
          >
            {/* Loading skeleton during upload */}
            {isLoading && (
              <div className="absolute inset-0 bg-slate-900/60 z-20 backdrop-blur-sm flex flex-col items-center justify-center text-white gap-2 animate-in fade-in">
                <Loader2 className="w-7 h-7 animate-spin text-white" />
                <span className="text-xs font-bold">
                  {isTh ? "กำลังประมวลผลรูปภาพ..." : "Processing image..."}
                </span>
              </div>
            )}

            {previewUrl ? (
              <>
                <img
                  src={previewUrl}
                  alt={label}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={() => {
                    setToast({
                      message: isTh
                        ? "ไม่สามารถโหลดรูปภาพจากลิงก์นี้ได้ กรุณาตรวจสอบลิงก์"
                        : "Failed to load image preview from this URL. Please check the link.",
                      type: "error",
                    })
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                  <span className="text-[11px] text-white font-medium truncate max-w-full drop-shadow">
                    {selectedFile ? selectedFile.name : previewUrl}
                  </span>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center p-6 text-center text-slate-400">
                <div className="w-10 h-10 rounded-full bg-white/80 border border-slate-200 flex items-center justify-center mb-2 shadow-xs">
                  <ImageIcon className="w-5 h-5 text-slate-300" />
                </div>
                <span className="text-xs font-bold text-slate-500">
                  {isTh ? "ยังไม่ได้กำหนดรูปภาพ" : "No image assigned"}
                </span>
                <span className="text-[11px] text-slate-400 mt-0.5">
                  {isTh ? "อัปโหลดหรือวางลิงก์ด้านซ้ายเพื่อดูตัวอย่าง" : "Upload or paste URL to preview"}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
