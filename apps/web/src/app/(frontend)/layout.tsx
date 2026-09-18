import type { Metadata } from "next"
import { Outfit, Plus_Jakarta_Sans, Satisfy, Mali } from "next/font/google"
import localFont from "next/font/local"
import { NavBar, Footer } from "@pakdeepan/ui"
import { CookieConsentProvider } from "@/components/CookieConsentProvider"
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
  title: "Pakdeepan Kindergarten School",
  description: "Premium early childhood education nurturing creativity, curiosity, and character.",
}

export default function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${plusJakartaSans.variable} ${sherlina.variable} ${satisfy.variable} ${mali.variable} bg-background text-on-background font-body-md antialiased selection:bg-primary-container selection:text-on-primary-container min-h-screen flex flex-col`}>
        <NavBar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <CookieConsentProvider />
      </body>
    </html>
  )
}
