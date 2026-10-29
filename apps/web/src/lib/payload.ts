import { getPayload as getPayloadInstance } from "payload"
import configPromise from "@/payload.config"

/**
 * Helper to get the Payload CMS instance for Local API access.
 * Use this in Server Components and Route Handlers to fetch data
 * directly from the database without HTTP overhead.
 */
export const getPayload = async () => {
  return await getPayloadInstance({ config: configPromise })
}

/**
 * Direct fetcher for globals with error handling and fallback
 */
export const getCachedGlobal = async (slug: any, locale: "en" | "th", _tags?: string[]) => {
  try {
    const payload = await getPayload()
    return await payload.findGlobal({ slug, locale })
  } catch (error) {
    console.error(`Error fetching global ${slug}:`, error)
    return null
  }
}

/**
 * Direct fetcher for collections with error handling and fallback
 */
export const getCachedCollection = async (collection: any, locale: "en" | "th", _tags?: string[], queryArgs: any = {}) => {
  try {
    const payload = await getPayload()
    return await payload.find({ collection, locale, ...queryArgs })
  } catch (error) {
    console.error(`Error fetching collection ${collection}:`, error)
    return { docs: [] }
  }
}
