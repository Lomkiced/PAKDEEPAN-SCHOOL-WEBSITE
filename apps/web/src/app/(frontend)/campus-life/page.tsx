import { getPayload } from "payload"
import configPromise from "@/payload.config"
import CampusLifeClient from "./CampusLifeClient"
import type { Metadata } from "next"
import { cookies } from "next/headers"
import { getCachedGlobal } from "@/lib/payload"

export const metadata: Metadata = {
  title: "Campus Life | Pakdeepan Kindergarten",
  description: "Stay updated with the latest happenings, academic achievements, and community events at Pakdeepan Kindergarten School.",
}

export const dynamic = 'force-dynamic'

export default async function CampusLifePage() {
  const payload = await getPayload({ config: configPromise })

  const cookieStore = await cookies()
  const localeStr = cookieStore.get("NEXT_LOCALE")?.value || "en"
  const locale = (localeStr === "th" ? "th" : "en") as "en" | "th"

  // Fetch Campus Life Page CMS Global (Headers, Subtitles, Fallbacks)
  let campusLifePageData: any = null
  try {
    campusLifePageData = await getCachedGlobal("campus-life-page", locale, ["campus-life-page-cache", "campus-life-cache"])
  } catch (e) {
    console.error("Failed to load campus-life-page global:", e)
  }

  // Fetch News
  const newsRes = await payload.find({
    collection: "news",
    depth: 1,
    limit: 10,
    locale,
    where: {
      status: {
        equals: "published",
      },
    },
    sort: "-publishDate",
  })

  // Fetch Events
  const eventsRes = await payload.find({
    collection: "events",
    depth: 1,
    limit: 10,
    locale,
    sort: "eventDate",
  })

  // Fetch Gallery Images
  const galleryRes = await payload.find({
    collection: "gallery-images",
    depth: 1,
    limit: 20,
    locale,
    sort: "-createdAt",
  })

  return (
    <CampusLifeClient 
      initialNews={newsRes.docs} 
      initialEvents={eventsRes.docs}
      initialGallery={galleryRes.docs}
      campusLifePageData={campusLifePageData}
      locale={locale}
    />
  )
}
