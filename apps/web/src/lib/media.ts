import * as React from "react"

/**
 * Centralized Media & Image Resolution Helper
 * Hardened for Vercel Serverless & Cloudflare R2
 */

export interface MediaDoc {
  url?: string | null
  filename?: string | null
  alt?: string | null
  id?: string | number | null
  [key: string]: any
}

export const FALLBACK_IMAGES = {
  general: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop",
  philosophy: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop",
  hero: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1920&auto=format&fit=crop",
  polaroid1: "https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=600&auto=format&fit=crop",
  polaroid2: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=600&auto=format&fit=crop",
  polaroid3: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=600&auto=format&fit=crop",
  campus: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1200&auto=format&fit=crop",
  classroom: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop",
  news: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200&auto=format&fit=crop",
  logo: "/logo.png",
}

/**
 * Resolves any image URL or Payload Media document to a guaranteed valid path.
 * - Strips http://localhost:3000 or http://127.0.0.1:3000
 * - Resolves to NEXT_PUBLIC_R2_PUBLIC_URL if Cloudflare R2 is configured
 * - Normalizes /media/ paths to /images/school/ or proxy /media/
 * - Returns clean fallback if empty or invalid
 */
export function resolveMediaUrl(
  input: string | MediaDoc | null | undefined,
  fallback: string = FALLBACK_IMAGES.general
): string {
  if (!input) return fallback

  let rawUrl = ""
  let filename = ""

  if (typeof input === "string") {
    rawUrl = input.trim()
  } else if (typeof input === "object") {
    filename = input.filename || ""
    rawUrl = input.url || ""
  }

  if (!rawUrl && !filename) return fallback

  // If Cloudflare R2 CDN URL is configured and we have a filename
  const r2PublicUrl = process.env.NEXT_PUBLIC_R2_PUBLIC_URL || process.env.R2_PUBLIC_URL
  if (r2PublicUrl && filename) {
    const cleanBase = r2PublicUrl.replace(/\/$/, "")
    return `${cleanBase}/${filename}`
  }

  // Strip localhost / 127.0.0.1 references
  if (rawUrl.startsWith("http://localhost:3000")) {
    rawUrl = rawUrl.replace("http://localhost:3000", "")
  } else if (rawUrl.startsWith("http://127.0.0.1:3000")) {
    rawUrl = rawUrl.replace("http://127.0.0.1:3000", "")
  }

  // If Cloudflare R2 is configured and rawUrl was a relative /media/ or /api/media/ path
  if (r2PublicUrl && (rawUrl.startsWith("/media/") || rawUrl.startsWith("/api/media/file/"))) {
    const extractedFilename = rawUrl.split("/").pop()
    if (extractedFilename) {
      return `${r2PublicUrl.replace(/\/$/, "")}/${extractedFilename}`
    }
  }

  // If it's a relative /media/ path, map to /images/school/ which is deployed with public assets
  if (rawUrl.startsWith("/media/")) {
    const fn = rawUrl.replace("/media/", "")
    return `/images/school/${fn}`
  }

  // If it's an external https:// URL or data URI, return as-is
  if (rawUrl.startsWith("https://") || rawUrl.startsWith("http://") || rawUrl.startsWith("data:image/")) {
    return rawUrl
  }

  // If relative path
  if (rawUrl.startsWith("/")) {
    return rawUrl
  }

  return rawUrl || fallback
}

/**
 * Guaranteed onError handler for <img> and <Image> elements.
 * Prevents infinite loop by using a data attribute guard.
 */
export function handleImageError(
  event: React.SyntheticEvent<HTMLImageElement, Event>,
  fallbackSrc: string = FALLBACK_IMAGES.general
) {
  const img = event.currentTarget
  if (!img || img.dataset.hasFailed === "true") return
  img.dataset.hasFailed = "true"
  img.src = fallbackSrc
}

