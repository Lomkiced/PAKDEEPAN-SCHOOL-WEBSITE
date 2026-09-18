import { getPayload } from "@/lib/payload"
import ContactClient from "./ContactClient"
import type { Metadata } from "next"
import { cookies } from "next/headers"
import { getDictionary } from "@/lib/i18n"

export const metadata: Metadata = {
  title: "Contact Us | Pakdeepan Kindergarten",
  description: "Get in touch with Pakdeepan Kindergarten School. We welcome your inquiries.",
}

export default async function ContactPage() {
  const payload = await getPayload()
  
  const cookieStore = await cookies()
  const localeStr = cookieStore.get("NEXT_LOCALE")?.value || "en"
  const locale = (localeStr === "th" ? "th" : "en") as "en" | "th"
  const dict = await getDictionary(locale)

  // Fetch SiteSettings Global Data for Contact info
  let siteSettings = null
  try {
    siteSettings = await payload.findGlobal({
      slug: "site-settings",
      locale,
    })
  } catch (error) {
    console.error("Error fetching SiteSettings global:", error)
  }

  return (
    <ContactClient 
      siteSettings={siteSettings}
      dict={dict}
      locale={locale}
    />
  )
}
