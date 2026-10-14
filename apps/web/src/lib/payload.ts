import { getPayload as getPayloadInstance } from "payload"
import config from "@/payload.config"
import { unstable_cache } from "next/cache"

/**
 * Helper to get the Payload CMS instance for Local API access.
 * Use this in Server Components and Route Handlers to fetch data
 * directly from the database without HTTP overhead.
 */
export const getPayload = async () => {
  return await getPayloadInstance({ config })
}

/**
 * Cached fetcher for globals to enable ISR and revalidateTag
 */
export const getCachedGlobal = async (slug: any, locale: "en" | "th", tags: string[]) => {
  const payload = await getPayload()
  return unstable_cache(
    async () => {
      try {
        return await payload.findGlobal({ slug, locale })
      } catch (error) {
        console.error(`Error fetching global ${slug}:`, error)
        return null
      }
    },
    [slug, locale],
    { tags }
  )()
}

/**
 * Cached fetcher for collections to enable ISR and revalidateTag
 */
export const getCachedCollection = async (collection: any, locale: "en" | "th", tags: string[], queryArgs: any = {}) => {
  const payload = await getPayload()
  return unstable_cache(
    async () => {
      try {
        return await payload.find({ collection, locale, ...queryArgs })
      } catch (error) {
        console.error(`Error fetching collection ${collection}:`, error)
        return { docs: [] }
      }
    },
    [collection, locale, JSON.stringify(queryArgs)],
    { tags }
  )()
}
