"use client"

import * as React from "react"
import { Copy, Check } from "lucide-react"

export function ClientCopyButton({
  url,
  copiedLabel,
  shareLabel,
}: {
  url: string
  copiedLabel: string
  shareLabel: string
}) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = async () => {
    const fullUrl =
      typeof window !== "undefined"
        ? `${window.location.origin}${url}`
        : `https://pakdeepan.ac.th${url}`

    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(fullUrl)
        setCopied(true)
        setTimeout(() => setCopied(false), 2500)
      }
    } catch {
      // Fallback
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border shadow-2xs ${
        copied
          ? "bg-emerald-50 text-emerald-800 border-emerald-200"
          : "bg-white hover:bg-slate-100 text-slate-700 border-slate-200"
      }`}
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-emerald-600" />
          <span>{copiedLabel}</span>
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5 text-slate-400" />
          <span>{shareLabel}</span>
        </>
      )}
    </button>
  )
}

