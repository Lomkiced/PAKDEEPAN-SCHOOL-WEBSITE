import { getPayload } from "payload"
import configPromise from "@/payload.config"
import HomeClient from "./HomeClient"
import type { Metadata } from "next"
import { cookies } from "next/headers"
import { getDictionary } from "@/lib/i18n"

export const metadata: Metadata = {
  title: "Pakdeepan Kindergarten School | A Foundation for a Beautiful Future",
  description: "Premium early childhood education nurturing creativity, curiosity, and character.",
}

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })
  
  const cookieStore = await cookies()
  const localeStr = cookieStore.get("NEXT_LOCALE")?.value || "en"
  const locale = (localeStr === "th" ? "th" : "en") as "en" | "th"
  const dict = await getDictionary(locale)

  // Fetch top 3 latest published news
  const newsRes = await payload.find({
    collection: "news",
    depth: 1,
    limit: 3,
    locale,
    sort: "-publishDate",
    where: {
      status: {
        equals: "published"
      }
    }
  })

  // Fetch the next upcoming event (date >= today)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  const eventsRes = await payload.find({
    collection: "events",
    depth: 1,
    limit: 1,
    locale,
    sort: "eventDate", // Ascending to get the closest one
    where: {
      eventDate: {
        greater_than_equal: today.toISOString()
      }
    }
  })

  // Fetch 5 latest gallery images
  const galleryRes = await payload.find({
    collection: "gallery-images",
    depth: 1,
    limit: 5,
    locale,
    sort: "-createdAt"
  })

  // Fetch Published Programs
  const programsRes = await payload.find({
    collection: "programs",
    depth: 1,
    locale,
    where: {
      status: {
        equals: "published"
      }
    },
    sort: "tuitionFee"
  })

  // Order programs consistently by level
  const levelOrder = { 'kindergarten': 1, 'primary': 2, 'secondary': 3, 'english-program': 4 }
  const sortedPrograms = programsRes.docs.sort((a, b) => {
    return (levelOrder[a.level as keyof typeof levelOrder] || 99) - (levelOrder[b.level as keyof typeof levelOrder] || 99)
  })

  return (
    <HomeClient 
      news={newsRes.docs} 
      events={eventsRes.docs} 
      gallery={galleryRes.docs}
      programs={sortedPrograms}
      dict={dict}
      locale={locale}
    />
  )
}
