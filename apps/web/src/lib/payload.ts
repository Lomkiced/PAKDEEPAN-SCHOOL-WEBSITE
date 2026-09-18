import { getPayload as getPayloadInstance } from "payload"
import config from "@/payload.config"

/**
 * Helper to get the Payload CMS instance for Local API access.
 * Use this in Server Components and Route Handlers to fetch data
 * directly from the database without HTTP overhead.
 */
export const getPayload = async () => {
  return await getPayloadInstance({ config })
}
