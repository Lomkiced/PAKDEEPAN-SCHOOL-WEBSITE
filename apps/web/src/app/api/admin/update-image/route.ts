import { NextRequest, NextResponse } from "next/server"
import { getPayload } from "@/lib/payload"
import { revalidateAllRoutes } from "@/lib/revalidate"

export const dynamic = "force-dynamic"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { targetType, targetSlug, id, fieldName, mediaId, imageUrl, clear, remove } = body
    const isClearing = clear === true || remove === true

    if (!targetType || !targetSlug || !fieldName) {
      return NextResponse.json(
        { success: false, error: "targetType, targetSlug, and fieldName are required" },
        { status: 400 }
      )
    }

    const payload = await getPayload()
    const valueToSet = isClearing ? null : (mediaId || imageUrl)

    if (!isClearing && !valueToSet) {
      return NextResponse.json(
        { success: false, error: "Either mediaId or imageUrl must be provided, or set clear: true" },
        { status: 400 }
      )
    }

    if (targetType === "global") {
      // Update global document
      await payload.updateGlobal({
        slug: targetSlug as any,
        data: {
          [fieldName]: valueToSet,
        },
      })
    } else if (targetType === "collection") {
      if (!id) {
        return NextResponse.json(
          { success: false, error: "Document ID is required for collection updates" },
          { status: 400 }
        )
      }

      await payload.update({
        collection: targetSlug as any,
        id,
        data: {
          [fieldName]: valueToSet,
        },
      })
    } else {
      return NextResponse.json(
        { success: false, error: "targetType must be 'global' or 'collection'" },
        { status: 400 }
      )
    }

    // Immediately trigger comprehensive real-time site revalidation
    revalidateAllRoutes()

    return NextResponse.json({
      success: true,
      targetType,
      targetSlug,
      id,
      fieldName,
      value: valueToSet,
      revalidated: true,
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    console.error("[API update-image] Error updating image in database:", error)
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to update image" },
      { status: 500 }
    )
  }
}

