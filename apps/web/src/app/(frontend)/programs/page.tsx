import { getPayload } from "@/lib/payload"
import ProgramsClient from "./ProgramsClient"
import type { Metadata } from "next"
import { cookies } from "next/headers"
import { getDictionary } from "@/lib/i18n"

export const metadata: Metadata = {
  title: "Academic Programs | Pakdeepan Kindergarten",
  description: "Explore our specialized early childhood curriculum designed for holistic development.",
}

export default async function ProgramsPage() {
  const payload = await getPayload()
  
  const cookieStore = await cookies()
  const localeStr = cookieStore.get("NEXT_LOCALE")?.value || "en"
  const locale = (localeStr === "th" ? "th" : "en") as "en" | "th"
  const dict = await getDictionary(locale)

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
    sort: "tuitionFee" // Just to have a consistent order
  })

  // To order programs consistently by age/level
  const levelOrder = { 'kindergarten': 1, 'primary': 2, 'secondary': 3, 'english-program': 4 }
  const sortedPrograms = programsRes.docs.sort((a, b) => {
    return (levelOrder[a.level as keyof typeof levelOrder] || 99) - (levelOrder[b.level as keyof typeof levelOrder] || 99)
  })

  return (
    <ProgramsClient 
      programs={sortedPrograms}
      dict={dict}
      locale={locale}
    />
  )
}
