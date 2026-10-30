import type { Metadata } from "next"
import { Outfit, Plus_Jakarta_Sans, Satisfy, Mali } from "next/font/google"
import localFont from "next/font/local"
import { cookies } from "next/headers"
import { NavBar, Footer } from "@pakdeepan/ui"
import { CookieConsentProvider } from "@/components/CookieConsentProvider"
import { LanguageProvider } from "@/context/LanguageContext"
import { getDictionary } from "@/lib/i18n"
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

export const dynamic = "force-dynamic"
export const revalidate = 0

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_SERVER_URL || "https://pakdeepan.ac.th"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "โรงเรียนภักดีพรรณ (Pakdeepan School) | ชลบุรี",
    template: "%s | โรงเรียนภักดีพรรณ (Pakdeepan School)",
  },
  description: "โรงเรียนภักดีพรรณ สถานศึกษาปฐมวัยคุณภาพสูง มุ่งพัฒนาศักยภาพเด็กอย่างรอบด้าน ปลูกฝังคุณธรรม จริยธรรม และความคิดสร้างสรรค์ ในบรรยากาศที่อบอุ่นและปลอดภัย ชลบุรี | Pakdeepan Kindergarten School, Chonburi",
  applicationName: "โรงเรียนภักดีพรรณ",
  keywords: [
    "โรงเรียนภักดีพรรณ",
    "ภักดีพรรณ",
    "Pakdeepan School",
    "Pakdeepan Kindergarten",
    "โรงเรียนอนุบาลชลบุรี",
    "อนุบาลชลบุรี",
    "เตรียมอนุบาล",
    "อนุบาล 1",
    "อนุบาล 2",
    "อนุบาล 3",
    "โรงเรียนปฐมวัย",
    "ชลบุรี",
  ],
  authors: [{ name: "โรงเรียนภักดีพรรณ (Pakdeepan School)" }],
  creator: "โรงเรียนภักดีพรรณ",
  publisher: "โรงเรียนภักดีพรรณ",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "th_TH",
    alternateLocale: ["en_US"],
    url: "/",
    siteName: "โรงเรียนภักดีพรรณ (Pakdeepan School)",
    title: "โรงเรียนภักดีพรรณ (Pakdeepan School) | ชลบุรี",
    description: "โรงเรียนภักดีพรรณ สถานศึกษาปฐมวัยคุณภาพสูง มุ่งพัฒนาศักยภาพเด็กอย่างรอบด้าน ปลูกฝังคุณธรรมและความคิดสร้างสรรค์ ชลบุรี",
    images: [
      {
        url: "/images/pakdeepan-logo.png",
        width: 1200,
        height: 630,
        alt: "ตราสัญลักษณ์โรงเรียนภักดีพรรณ Pakdeepan Kindergarten School",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "โรงเรียนภักดีพรรณ (Pakdeepan School) | ชลบุรี",
    description: "โรงเรียนภักดีพรรณ สถานศึกษาปฐมวัยคุณภาพสูง มุ่งพัฒนาศักยภาพเด็กอย่างรอบด้าน ชลบุรี",
    images: ["/images/pakdeepan-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
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

  // Fetch dictionary
  const dict = await getDictionary(locale)

  return (
    <html lang={locale}>
      <body className={`${outfit.variable} ${plusJakartaSans.variable} ${sherlina.variable} ${satisfy.variable} ${mali.variable} bg-background text-on-background font-body-md antialiased selection:bg-primary-container selection:text-on-primary-container min-h-screen flex flex-col`}>
        <LanguageProvider initialLocale={locale} initialDict={dict}>
          <NavBar 
            ctaLabel={siteSettings?.navigation?.ctaLabel}
            ctaMobileLabel={siteSettings?.navigation?.ctaMobileLabel}
            ctaLink={siteSettings?.navigation?.ctaLink}
            schoolName={siteSettings?.schoolName}
            logoUrl={siteSettings?.logo?.url}
            currentLocale={locale}
          />
          <main className="flex-1">
            {children}
          </main>
          <Footer 
            currentLocale={locale}
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
            logoUrl={siteSettings?.logo?.url}
          />
          <CookieConsentProvider />
        </LanguageProvider>
      </body>
    </html>
  )
}
