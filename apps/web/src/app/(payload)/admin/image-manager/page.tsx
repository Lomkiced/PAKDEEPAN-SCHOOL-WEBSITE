import "@/app/globals.css"
import { getPayload } from "@/lib/payload"
import { ImageManagerClient } from "@/components/admin/ImageManagerClient"
import { AdminAppShell } from "@/components/admin/AdminAppShell"
import { cookies } from "next/headers"

export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function ImageManagerPage() {
  const cookieStore = await cookies()
  const localeStr = cookieStore.get("NEXT_LOCALE")?.value || "th"
  const initialLocale = (localeStr === "en" ? "en" : "th") as "en" | "th"

  const payload = await getPayload()

  // Fetch all site globals concurrently
  const [siteSettings, homePage, aboutPage] = await Promise.all([
    payload.findGlobal({ slug: "site-settings", depth: 1 }).catch(() => null),
    payload.findGlobal({ slug: "home-page", depth: 1 }).catch(() => null),
    payload.findGlobal({ slug: "about-page", depth: 1 }).catch(() => null),
  ])

  // Fetch collections concurrently
  const [programsRes, newsRes, eventsRes, galleryRes] = await Promise.all([
    payload.find({ collection: "programs", depth: 1, limit: 100 }).catch(() => ({ docs: [] })),
    payload.find({ collection: "news", depth: 1, limit: 100 }).catch(() => ({ docs: [] })),
    payload.find({ collection: "events", depth: 1, limit: 100 }).catch(() => ({ docs: [] })),
    payload.find({ collection: "gallery-images", depth: 1, limit: 100 }).catch(() => ({ docs: [] })),
  ])

  const counts = {
    news: newsRes.docs?.length || 0,
    programs: programsRes.docs?.length || 4,
    events: eventsRes.docs?.length || 0,
    gallery: galleryRes.docs?.length || 0,
    media: 24,
  }

  return (
    <AdminAppShell
      title={initialLocale === "th" ? "ศูนย์จัดการรูปภาพและสื่อเว็บไซต์" : "Visual Assets & Media Manager"}
      subtitle={initialLocale === "th" ? "อัปโหลดและเปลี่ยนภาพหน้าเว็บแบบซิงค์สด" : "Real-Time Visual Asset Replacement"}
      activePath="/admin/image-manager"
      counts={counts}
      initialLocale={initialLocale}
    >
      <ImageManagerClient
        key={initialLocale}
        initialLocale={initialLocale}
        siteSettings={siteSettings}
        homePage={homePage}
        aboutPage={aboutPage}
        programs={programsRes.docs}
        news={newsRes.docs}
        events={eventsRes.docs}
        gallery={galleryRes.docs}
      />
    </AdminAppShell>
  )
}
