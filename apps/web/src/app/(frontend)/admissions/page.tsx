import { getPayload, getCachedGlobal } from "@/lib/payload"
import AdmissionsClient from "./AdmissionsClient"
import type { Metadata } from "next"
import { cookies } from "next/headers"
import { getDictionary } from "@/lib/i18n"

export const dynamic = "force-dynamic"
export const revalidate = 0

export const metadata: Metadata = {
  title: "Admissions | Pakdeepan Kindergarten",
  description: "Join our community dedicated to excellence, inquiry, and holistic growth.",
}

export default async function AdmissionsPage() {
  const payload = await getPayload()
  
  const cookieStore = await cookies()
  const localeStr = cookieStore.get("NEXT_LOCALE")?.value || "en"
  const locale = (localeStr === "th" ? "th" : "en") as "en" | "th"
  const dict = await getDictionary(locale)

  // Fetch Admissions Page CMS Global (Hero, Stepper, Form Messages)
  let admissionsPageData: any = null
  try {
    admissionsPageData = await getCachedGlobal("admissions-page", locale, ["admissions-page-cache", "admissions-cache"])
  } catch (e) {
    console.error("Failed to load admissions-page global:", e)
  }

  // Fetch Published Programs for the tuition table and form dropdown
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

  // To order programs consistently by age/level
  const levelOrder = { 'kindergarten': 1, 'primary': 2, 'secondary': 3, 'english-program': 4 }
  const sortedPrograms = programsRes.docs.sort((a, b) => {
    return (levelOrder[a.level as keyof typeof levelOrder] || 99) - (levelOrder[b.level as keyof typeof levelOrder] || 99)
  })

  return (
    <AdmissionsClient 
      programs={sortedPrograms}
      admissionsPageData={admissionsPageData}
      dict={dict}
      locale={locale}
    />
  )
}
