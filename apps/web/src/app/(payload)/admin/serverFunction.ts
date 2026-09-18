"use server"

import { handleServerFunctions } from "@payloadcms/next/layouts"
import config from "@/payload.config"
import { importMap } from "./importMap"

/**
 * Next.js requires server functions passed to client components to be
 * explicitly marked with "use server". We wrap Payload's handler here
 * and inject the server-only config which cannot be serialized from the client.
 */
export const serverFunction = async (args: any) => {
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  })
}
