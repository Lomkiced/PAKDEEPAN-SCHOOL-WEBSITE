import { NextRequest, NextResponse } from "next/server"
import { getPayload } from "@/lib/payload"
import { revalidateAllRoutes } from "@/lib/revalidate"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const payload = await getPayload()

    const [siteSettings, aboutPage, newsRes, programsRes, galleryRes] = await Promise.all([
      payload.findGlobal({ slug: "site-settings", depth: 1 }).catch(() => null),
      payload.findGlobal({ slug: "about-page", depth: 1 }).catch(() => null),
      payload.find({ collection: "news", limit: 20, sort: "-publishDate", depth: 1 }).catch(() => ({ docs: [] })),
      payload.find({ collection: "programs", limit: 10, depth: 1 }).catch(() => ({ docs: [] })),
      payload.find({ collection: "gallery-images", limit: 50, depth: 1 }).catch(() => ({ docs: [] })),
    ])

    return NextResponse.json({
      success: true,
      siteSettings,
      aboutPage,
      counts: {
        news: newsRes.docs?.length || 0,
        programs: programsRes.docs?.length || 4,
        media: galleryRes.docs?.length || 24,
      },
      news: newsRes.docs || [],
      programs: programsRes.docs || [],
    })
  } catch (err: any) {
    console.error("[API Admin Settings GET] Error:", err)
    return NextResponse.json(
      { success: false, error: err?.message || "Failed to fetch settings" },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      schoolName,
      tagline,
      phone,
      email,
      address,
      officeHours,
      directorName,
      directorTitle,
      directorMessage,
      directorMessageTh,
      directorNameTh,
      directorTitleTh,
    } = body

    const payload = await getPayload()

    // 1. Update site-settings global
    const siteSettingsUpdate: Record<string, any> = {}
    if (schoolName) siteSettingsUpdate.schoolName = schoolName
    if (tagline) siteSettingsUpdate.tagline = tagline
    if (phone || email || address) {
      siteSettingsUpdate.contact = {
        phone: phone || "+66 39 123 4567",
        email: email || "admissions@pakdeepan.ac.th",
        address: address || "Chanthaburi, Thailand",
      }
    }
    if (officeHours) {
      siteSettingsUpdate.officeHours = {
        days: "Monday – Friday",
        hours: officeHours,
      }
    }

    if (Object.keys(siteSettingsUpdate).length > 0) {
      await payload.updateGlobal({
        slug: "site-settings",
        data: siteSettingsUpdate,
      })
    }

    // 2. Update about-page global (Director info)
    const aboutPageUpdate: Record<string, any> = {}
    if (directorName) aboutPageUpdate.principalName = directorName
    if (directorTitle) aboutPageUpdate.principalTitle = directorTitle
    if (directorMessage) aboutPageUpdate.principalMessage = directorMessage
    if (directorNameTh) aboutPageUpdate.principalName_th = directorNameTh
    if (directorTitleTh) aboutPageUpdate.principalTitle_th = directorTitleTh
    if (directorMessageTh) aboutPageUpdate.principalMessage_th = directorMessageTh

    if (Object.keys(aboutPageUpdate).length > 0) {
      await payload.updateGlobal({
        slug: "about-page",
        data: aboutPageUpdate,
      })
    }

    // 3. Trigger full ISR cache revalidation
    revalidateAllRoutes("/", ["site-settings-cache", "home-cache", "contact-cache", "about-cache"])
    revalidateAllRoutes("/about")
    revalidateAllRoutes("/contact")

    return NextResponse.json({
      success: true,
      message: "Settings updated and site synchronized successfully!",
    })
  } catch (err: any) {
    console.error("[API Admin Settings POST] Error:", err)
    return NextResponse.json(
      { success: false, error: err?.message || "Failed to update settings" },
      { status: 500 }
    )
  }
}

