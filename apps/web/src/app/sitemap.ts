import type { MetadataRoute } from "next"
import { getPayload } from "@/lib/payload"

export const dynamic = "force-dynamic"
export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = (
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_SERVER_URL ||
    "https://pakdeepan.ac.th"
  ).replace(/\/$/, "")

  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/programs`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/admissions`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/campus-life`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ]

  try {
    const payload = await getPayload()
    const newsRes = await payload.find({
      collection: "news",
      depth: 0,
      limit: 100,
      where: {
        status: { equals: "published" },
      },
    })

    const newsRoutes: MetadataRoute.Sitemap = (newsRes.docs || []).map((item: any) => ({
      url: `${baseUrl}/news/${item.slug || item.id}`,
      lastModified: item.updatedAt ? new Date(item.updatedAt) : now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }))

    return [...staticRoutes, ...newsRoutes]
  } catch {
    return staticRoutes
  }
}

