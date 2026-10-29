import { revalidatePath, revalidateTag } from "next/cache"

/**
 * Trigger immediate real-time cache revalidation across the entire public website.
 * This purges the root layout cache, individual page routes, and Payload tag caches.
 */
export function revalidateAllRoutes(specificPath?: string, tags: string[] = []) {
  try {
    // 1. Purge the entire root layout tree
    revalidatePath("/", "layout")

    // 2. Explicitly revalidate all public routes
    const routes = [
      "/",
      "/about",
      "/programs",
      "/admissions",
      "/campus-life",
      "/contact",
      "/privacy",
    ]

    for (const route of routes) {
      try {
        revalidatePath(route)
      } catch {
        // Continue if path is not yet built
      }
    }

    if (specificPath && !routes.includes(specificPath)) {
      try {
        revalidatePath(specificPath)
      } catch {
        // Continue
      }
    }

    // 3. Purge specific cache tags
    for (const tag of tags) {
      try {
        revalidateTag(tag, "default")
      } catch {
        // Continue
      }
    }

    console.log(`[Revalidation] Real-time cache invalidated for / and all public routes.`)
  } catch (error) {
    console.error("[Revalidation] Failed to revalidate routes:", error)
  }
}

