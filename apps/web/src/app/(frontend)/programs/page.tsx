import { getCachedCollection, getCachedGlobal } from "@/lib/payload"
import ProgramsClient from "./ProgramsClient"
import type { Metadata } from "next"
import { cookies } from "next/headers"
import { getDictionary } from "@/lib/i18n"

export const dynamic = "force-dynamic"
export const revalidate = 0

export const metadata: Metadata = {
  title: "Academic Programs | Pakdeepan Kindergarten",
  description: "Explore our specialized early childhood curriculum designed for holistic development.",
}

export default async function ProgramsPage() {
  const cookieStore = await cookies()
  const localeStr = cookieStore.get("NEXT_LOCALE")?.value || "en"
  const locale = (localeStr === "th" ? "th" : "en") as "en" | "th"
  const dict = await getDictionary(locale)

  // Fetch Programs Page CMS Global (Curriculum highlights & Daily schedule)
  let programsPageData: any = null
  try {
    programsPageData = await getCachedGlobal("programs-page", locale, ["programs-page-cache", "programs-cache"])
  } catch (e) {
    console.error("Failed to load programs-page global:", e)
  }

  // Fetch Published Programs
  const programsRes = await getCachedCollection("programs", locale, ["programs-cache"], {
    depth: 1,
    where: {
      status: {
        equals: "published"
      }
    },
    sort: "tuitionFee"
  })

  // To order programs consistently by age/level
  const levelOrder = { 'kindergarten': 1, 'primary': 2, 'secondary': 3, 'english-program': 4 }
  const sortedPrograms = programsRes.docs.sort((a, b) => {
    return (levelOrder[a.level as keyof typeof levelOrder] || 99) - (levelOrder[b.level as keyof typeof levelOrder] || 99)
  })

  return (
    <ProgramsClient 
      programs={sortedPrograms}
      programsPageData={programsPageData}
      dict={dict}
      locale={locale}
    />
  )
}
