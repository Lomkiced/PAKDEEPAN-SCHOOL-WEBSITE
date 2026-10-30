import { NextRequest, NextResponse } from "next/server"
import { getPayload } from "@/lib/payload"
import { revalidateAllRoutes } from "@/lib/revalidate"

export const dynamic = "force-dynamic"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      id,
      title,
      title_th,
      slug,
      category = "campus-life",
      category_th,
      excerpt,
      excerpt_th,
      content,
      content_th,
      imageUrl,
      mediaId,
      status = "published",
      publishDate,
    } = body

    if (!title) {
      return NextResponse.json(
        { success: false, error: "Headline (title) is required" },
        { status: 400 }
      )
    }

    const payload = await getPayload()

    const generatedSlug =
      slug ||
      title
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-") ||
      `news-${Date.now()}`

    const updateData: Record<string, any> = {
      title,
      title_th: title_th || title,
      slug: generatedSlug,
      category,
      category_th: category_th || category,
      status,
      excerpt: excerpt || title,
      excerpt_th: excerpt_th || excerpt || title,
      content: content || excerpt || title,
      content_th: content_th || content || excerpt_th || excerpt || title,
      publishDate: publishDate || new Date().toISOString(),
    }

    if (imageUrl) {
      updateData.imageUrl = imageUrl
    }
    if (mediaId) {
      updateData.featuredImage = mediaId
    }

    let resultDoc: any
    if (id) {
      // Update existing
      resultDoc = await payload.update({
        collection: "news",
        id,
        data: updateData,
      })
    } else {
      // Create new
      resultDoc = await payload.create({
        collection: "news",
        data: updateData as any,
      })
    }

    // Comprehensive real-time ISR revalidation
    revalidateAllRoutes("/campus-life", ["campus-life-cache", "home-cache", "news-cache"])
    if (resultDoc?.id) {
      revalidateAllRoutes(`/news/${resultDoc.id}`)
    }
    if (resultDoc?.slug) {
      revalidateAllRoutes(`/news/${resultDoc.slug}`)
    }

    return NextResponse.json({
      success: true,
      doc: resultDoc,
    })
  } catch (err: any) {
    console.error("[API Admin News] Error:", err)
    return NextResponse.json(
      { success: false, error: err?.message || "Failed to save news article" },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const payload = await getPayload()
    const res = await payload.find({
      collection: "news",
      limit: 100,
      sort: "-publishDate",
      depth: 1,
    })
    return NextResponse.json({
      success: true,
      docs: res.docs || [],
      totalDocs: res.totalDocs || 0,
    })
  } catch (err: any) {
    console.error("[API Admin News GET] Error:", err)
    return NextResponse.json(
      { success: false, error: err?.message || "Failed to fetch news", docs: [] },
      { status: 500 }
    )
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Article ID is required for deletion" },
        { status: 400 }
      )
    }

    const payload = await getPayload()
    await payload.delete({
      collection: "news",
      id,
    })

    revalidateAllRoutes("/campus-life", ["campus-life-cache", "home-cache", "news-cache"])
    revalidateAllRoutes(`/news/${id}`)

    return NextResponse.json({
      success: true,
      message: "Article deleted successfully",
    })
  } catch (err: any) {
    console.error("[API Admin News DELETE] Error:", err)
    return NextResponse.json(
      { success: false, error: err?.message || "Failed to delete news article" },
      { status: 500 }
    )
  }
}

