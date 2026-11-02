import { NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export const dynamic = "force-dynamic"

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ filename: string[] }> }
) {
  const { filename: segments } = await params
  const filename = segments.join("/")

  // 1. If Cloudflare R2 is configured, redirect directly to Cloudflare CDN
  const r2PublicUrl = process.env.NEXT_PUBLIC_R2_PUBLIC_URL || process.env.R2_PUBLIC_URL
  if (r2PublicUrl) {
    return NextResponse.redirect(`${r2PublicUrl.replace(/\/$/, "")}/${filename}`, 307)
  }

  // 2. Try to serve from public/images/school/
  try {
    const filePath = path.join(process.cwd(), "public", "images", "school", filename)
    if (fs.existsSync(filePath)) {
      const fileBuffer = fs.readFileSync(filePath)
      const ext = path.extname(filename).toLowerCase()
      const mimeTypes: Record<string, string> = {
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".png": "image/png",
        ".webp": "image/webp",
        ".gif": "image/gif",
        ".svg": "image/svg+xml",
      }
      return new NextResponse(fileBuffer, {
        headers: {
          "Content-Type": mimeTypes[ext] || "image/jpeg",
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      })
    }
  } catch {
    // Fall through
  }

  // 3. Fallback to reliable default image
  return NextResponse.redirect(
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop",
    307
  )
}

