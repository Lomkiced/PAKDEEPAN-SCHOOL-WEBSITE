import PrivacyClient from "./PrivacyClient"
import type { Metadata } from "next"
import { cookies } from "next/headers"
import { getDictionary } from "@/lib/i18n"
import { getCachedGlobal } from "@/lib/payload"

export const metadata: Metadata = {
  title: "Privacy Policy | Pakdeepan Kindergarten School",
  description: "Learn how Pakdeepan Kindergarten School collects, uses, and safeguards your personal information.",
}

export default async function PrivacyPolicyPage() {
  const cookieStore = await cookies()
  const localeStr = cookieStore.get("NEXT_LOCALE")?.value || "en"
  const locale = (localeStr === "th" ? "th" : "en") as "en" | "th"
  const dict = await getDictionary(locale)

  // Fetch Privacy Policy content from CMS Global
  let privacyPageData: any = null
  try {
    privacyPageData = await getCachedGlobal("privacy-page", locale, ["privacy-page-cache", "privacy-cache"])
  } catch (e) {
    console.error("Failed to load privacy-page global:", e)
  }

  return (
    <PrivacyClient 
      privacyPageData={privacyPageData} 
      dict={dict} 
      locale={locale} 
    />
  )
}
