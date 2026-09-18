import { getPayload } from "payload"
import configPromise from "@/payload.config"
import CampusLifeClient from "./CampusLifeClient"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Campus Life | Pakdeepan Kindergarten",
  description: "Stay updated with the latest happenings, academic achievements, and community events at Pakdeepan Kindergarten School.",
}

export const dynamic = 'force-dynamic'

export default async function CampusLifePage() {
  const payload = await getPayload({ config: configPromise })

  // Fetch News
  const newsRes = await payload.find({
    collection: "news",
    depth: 1,
    limit: 10,
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
    sort: "eventDate",
  })

  // Fetch Gallery Images
  const galleryRes = await payload.find({
    collection: "gallery-images",
    depth: 1,
    limit: 20,
    sort: "-createdAt",
  })

  return (
    <CampusLifeClient 
      initialNews={newsRes.docs} 
      initialEvents={eventsRes.docs}
      initialGallery={galleryRes.docs}
    />
  )
}
