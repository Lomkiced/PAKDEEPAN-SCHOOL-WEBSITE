"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

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
}: ImageUploaderProps) {
  const router = useRouter()

  // State
  const [currentUrl, setCurrentUrl] = React.useState<string>(initialImageUrl)
  const [currentId, setCurrentId] = React.useState<string | number | undefined>(initialMediaId)
  const [inputUrl, setInputUrl] = React.useState<string>("")
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = React.useState<string>(initialImageUrl)
  const [activeTab, setActiveTab] = React.useState<"upload" | "url">("upload")
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [dragActive, setDragActive] = React.useState<boolean>(false)
  const [toast, setToast] = React.useState<{ message: string; type: "success" | "error" } | null>(null)

  const fileInputRef = React.useRef<HTMLInputElement>(null)

  // Auto-dismiss toast
  React.useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4000)
      return () => clearTimeout(timer)
    }
  }, [toast])

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
      setToast({ message: "Please select a valid image file (PNG, JPG, WebP, SVG)", type: "error" })
      return
    }

    setSelectedFile(file)
    const localUrl = URL.createObjectURL(file)
    setPreviewUrl(localUrl)
    setInputUrl("")
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
    if (url.trim()) {
      setPreviewUrl(url.trim())
    } else {
      setPreviewUrl(currentUrl)
    }
  }

  // Save / Upload Action
  const handleSave = async () => {
    if (!selectedFile && !inputUrl.trim()) {
      setToast({ message: "Please select an image file or paste a URL first", type: "error" })
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
        throw new Error(uploadResult.error || "Upload failed")
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
          throw new Error(updateData.error || "Failed to link image to document")
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

      // Trigger router refresh for instant Next.js data sync
      router.refresh()

      setToast({
        message: "Image published and synchronized with website in real-time!",
        type: "success",
      })
    } catch (err: any) {
      console.error("[ImageUploader] Error saving image:", err)
      setToast({
        message: err?.message || "Failed to upload image. Please try again.",
        type: "error",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Clear / Remove
  const handleClear = () => {
    setSelectedFile(null)
    setInputUrl("")
    setPreviewUrl("")
    setCurrentUrl("")
    setCurrentId(undefined)
    if (fileInputRef.current) fileInputRef.current.value = ""
    if (onRemove) onRemove()
  }

  // Aspect ratio classes for preview box
  const aspectClass =
    aspectRatio === "portrait"
      ? "aspect-[4/5]"
      : aspectRatio === "square"
      ? "aspect-square"
      : aspectRatio === "video"
      ? "aspect-video"
      : "aspect-[16/10]"

  return (
    <div className={`bg-white border border-slate-200 rounded-2xl p-5 shadow-sm ${className}`}>
      
      {/* Toast Notification */}
      {toast && (
        <div
          className={`mb-4 px-4 py-3 rounded-xl text-sm font-medium flex items-center justify-between transition-all animate-in fade-in slide-in-from-top-2 ${
            toast.type === "success"
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
              : "bg-rose-50 text-rose-800 border border-rose-200"
          }`}
        >
          <span>{toast.message}</span>
          <button
            type="button"
            onClick={() => setToast(null)}
            className="text-xs font-bold opacity-70 hover:opacity-100 ml-3"
          >
            ✕
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h4 className="text-[15px] font-bold text-slate-800">{label}</h4>
          {description && (
            <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{description}</p>
          )}
        </div>
        {previewUrl && (
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
            {selectedFile ? "New File Ready" : inputUrl ? "URL Ready" : "Live on Site"}
          </span>
        )}
      </div>

      {/* Mode Tabs */}
      <div className="flex gap-2 p-1 bg-slate-100 rounded-xl mb-4 w-fit text-xs font-bold">
        <button
          type="button"
          onClick={() => setActiveTab("upload")}
          className={`px-3 py-1.5 rounded-lg transition-all ${
            activeTab === "upload"
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          Upload Local File
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("url")}
          className={`px-3 py-1.5 rounded-lg transition-all ${
            activeTab === "url"
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          Paste External URL
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
              className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${
                dragActive
                  ? "border-primary bg-primary/5"
                  : "border-slate-200 hover:border-primary/50 hover:bg-slate-50/50"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileChange(e.target.files[0])
                  }
                }}
              />
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 mb-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <p className="text-xs font-semibold text-slate-700">
                {selectedFile ? (
                  <span className="text-primary font-bold">{selectedFile.name}</span>
                ) : (
                  <>
                    <span className="text-primary hover:underline">Click to upload</span> or drag and drop
                  </>
                )}
              </p>
              <p className="text-[11px] text-slate-400 mt-1">
                PNG, JPG, WebP, SVG, AVIF (Max 10MB)
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-slate-700">Image Source URL</label>
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/... or https://..."
                  value={inputUrl}
                  onChange={(e) => handleUrlChange(e.target.value)}
                  className="flex-1 px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
                {inputUrl && (
                  <button
                    type="button"
                    onClick={() => handleUrlChange("")}
                    className="px-2.5 py-2 text-xs font-bold text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
                  >
                    Clear
                  </button>
                )}
              </div>
              <p className="text-[11px] text-slate-400">
                Paste any high-resolution public URL. It will preview live immediately.
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              disabled={isLoading || (!selectedFile && !inputUrl)}
              onClick={handleSave}
              className={`px-4 py-2 text-xs font-bold rounded-xl text-white transition-all flex items-center gap-2 ${
                isLoading || (!selectedFile && !inputUrl)
                  ? "bg-slate-300 cursor-not-allowed"
                  : "bg-[#1e3a8a] hover:bg-primary shadow-sm hover:shadow"
              }`}
            >
              {isLoading && (
                <svg className="animate-spin -ml-1 mr-1 h-3 w-3 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              {isLoading ? "Saving..." : "Apply & Publish"}
            </button>

            {previewUrl && (
              <button
                type="button"
                onClick={handleClear}
                className="px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
              >
                Remove
              </button>
            )}
          </div>
        </div>

        {/* Right: Instant Live Preview Panel */}
        <div className="md:col-span-5 flex flex-col gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Live Preview
          </span>

          <div
            className={`w-full ${aspectClass} rounded-xl overflow-hidden bg-slate-50 border border-slate-200 relative flex items-center justify-center shadow-inner group`}
          >
            {previewUrl ? (
              <>
                <img
                  src={previewUrl}
                  alt={label}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={() => {
                    setToast({
                      message: "Failed to load image preview from this URL. Please check the link.",
                      type: "error",
                    })
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                  <span className="text-[10px] text-white font-medium truncate max-w-full">
                    {selectedFile ? selectedFile.name : previewUrl}
                  </span>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center p-4 text-center">
                <svg className="w-8 h-8 text-slate-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-xs font-semibold text-slate-400">No image assigned</span>
                <span className="text-[10px] text-slate-400">Upload or paste URL above</span>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}
