import { NextRequest, NextResponse } from "next/server"
import { uploadImageFile, handleExternalImageUrl } from "@/lib/storage"
import { revalidateAllRoutes } from "@/lib/revalidate"

export const dynamic = "force-dynamic"

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || ""

    // 1. Handle JSON payload (e.g., external URL paste)
    if (contentType.includes("application/json")) {
      const body = await req.json()
      const { url, alt = "Website Image" } = body

      if (!url) {
        return NextResponse.json(
          { success: false, error: "Image URL is required" },
          { status: 400 }
        )
      }

      const result = await handleExternalImageUrl(url, alt)
      if (!result.success) {
        return NextResponse.json(result, { status: 400 })
      }

      // Revalidate real-time cache immediately
      revalidateAllRoutes()

      return NextResponse.json(result)
    }

    // 2. Handle multipart/form-data payload (file upload or URL in FormData)
    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData()
      const file = formData.get("file") as File | null
      const url = formData.get("url") as string | null
      const alt = (formData.get("alt") as string) || "Website Image"

      if (url) {
        const result = await handleExternalImageUrl(url, alt)
        if (!result.success) {
          return NextResponse.json(result, { status: 400 })
        }
        revalidateAllRoutes()
        return NextResponse.json(result)
      }

      if (!file) {
        return NextResponse.json(
          { success: false, error: "No image file or URL provided in form data" },
          { status: 400 }
        )
      }

      const arrayBuffer = await file.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      const filename = file.name || "uploaded-image.jpg"
      const mimeType = file.type || "image/jpeg"

      const result = await uploadImageFile(buffer, filename, mimeType, alt)
      if (!result.success) {
        return NextResponse.json(result, { status: 500 })
      }

      // Revalidate real-time cache immediately
      revalidateAllRoutes()

      return NextResponse.json(result)
    }

    return NextResponse.json(
      { success: false, error: "Unsupported Content-Type" },
      { status: 415 }
    )
  } catch (error: any) {
    console.error("[API upload-image] Internal error:", error)
    return NextResponse.json(
      { success: false, error: error?.message || "Internal server error" },
      { status: 500 }
    )
  }
}

