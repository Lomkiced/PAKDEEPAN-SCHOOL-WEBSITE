import { getPayload } from "@/lib/payload"
import AboutClient from "./AboutClient"
import type { Metadata } from "next"
import { cookies } from "next/headers"
import { getDictionary } from "@/lib/i18n"

export const metadata: Metadata = {
  title: "About Us | Pakdeepan Kindergarten School",
  description: "Learn about our history, mission, vision, and the passionate educators behind Pakdeepan Kindergarten.",
}

export default async function AboutPage() {
  const payload = await getPayload()
  
  const cookieStore = await cookies()
  const localeStr = cookieStore.get("NEXT_LOCALE")?.value || "en"
  const locale = (localeStr === "th" ? "th" : "en") as "en" | "th"
  const dict = await getDictionary(locale)

  // Fetch About Page Global Data
  let aboutData = null
  try {
    aboutData = await payload.findGlobal({
      slug: "about-page",
      locale,
    })
  } catch (error) {
    console.error("Error fetching AboutPage global:", error)
  }

  return (
    <AboutClient 
      aboutData={aboutData}
      dict={dict}
      locale={locale}
    />
  )
}
