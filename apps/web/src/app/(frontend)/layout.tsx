import type { Metadata } from "next"
import { Outfit, Plus_Jakarta_Sans, Satisfy, Mali } from "next/font/google"
import localFont from "next/font/local"
import { cookies } from "next/headers"
import { NavBar, Footer } from "@pakdeepan/ui"
import { CookieConsentProvider } from "@/components/CookieConsentProvider"
import { getCachedGlobal } from "@/lib/payload"
import "../globals.css"

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
})

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
})

const sherlina = localFont({
  src: "../../fonts/Sherlina.ttf",
  variable: "--font-sherlina",
  display: "swap",
})

const satisfy = Satisfy({
  variable: "--font-satisfy",
  weight: "400",
  subsets: ["latin"],
})

const mali = Mali({
  variable: "--font-mali",
  weight: ["400", "600"],
  subsets: ["latin", "thai"],
})

export const metadata: Metadata = {
  title: "Pakdeepan Kindergarten School | A Foundation for a Beautiful Future",
  description: "Premium early childhood education nurturing creativity, curiosity, and character.",
}

export default async function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const localeStr = cookieStore.get("NEXT_LOCALE")?.value || "en"
  const locale = (localeStr === "th" ? "th" : "en") as "en" | "th"

  // Fetch site-wide configurable settings from CMS
  let siteSettings: any = null
  try {
    siteSettings = await getCachedGlobal("site-settings", locale, ["site-settings-cache"])
  } catch (error) {
    console.error("Failed to load site settings in layout:", error)
  }

  return (
    <html lang={locale}>
      <body className={`${outfit.variable} ${plusJakartaSans.variable} ${sherlina.variable} ${satisfy.variable} ${mali.variable} bg-background text-on-background font-body-md antialiased selection:bg-primary-container selection:text-on-primary-container min-h-screen flex flex-col`}>
        <NavBar 
          ctaLabel={siteSettings?.navigation?.ctaLabel}
          ctaMobileLabel={siteSettings?.navigation?.ctaMobileLabel}
          ctaLink={siteSettings?.navigation?.ctaLink}
          schoolName={siteSettings?.schoolName}
        />
        <main className="flex-1">
          {children}
        </main>
        <Footer 
          tagline={siteSettings?.footer?.tagline}
          philosophy={siteSettings?.footer?.philosophy}
          email={siteSettings?.contact?.email}
          phone={siteSettings?.contact?.phone}
          location={siteSettings?.footer?.location}
          copyrightName={siteSettings?.footer?.copyrightName || siteSettings?.schoolName}
          facebookUrl={siteSettings?.social?.facebook}
          instagramUrl={siteSettings?.social?.instagram}
          linkedinUrl={siteSettings?.social?.linkedin}
          youtubeUrl={siteSettings?.social?.youtube}
        />
        <CookieConsentProvider />
      </body>
    </html>
  )
}
