import PrivacyClient from "./PrivacyClient"
import type { Metadata } from "next"
import { cookies } from "next/headers"
import { getDictionary } from "@/lib/i18n"

export const metadata: Metadata = {
  title: "Privacy Policy | Pakdeepan Kindergarten School",
  description: "Learn how Pakdeepan Kindergarten School collects, uses, and safeguards your personal information.",
}

export default async function PrivacyPolicyPage() {
  const cookieStore = await cookies()
  const localeStr = cookieStore.get("NEXT_LOCALE")?.value || "en"
  const locale = (localeStr === "th" ? "th" : "en") as "en" | "th"
  const dict = await getDictionary(locale)

  return (
    <PrivacyClient dict={dict} locale={locale} />
  )
}
