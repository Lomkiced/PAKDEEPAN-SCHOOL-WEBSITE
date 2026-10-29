import { createClient } from "@supabase/supabase-js"
import { getPayload } from "@/lib/payload"

// Detect Supabase storage credentials if provided in environment
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || ""
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null

export interface UploadResult {
  success: boolean
  id?: string | number
  url: string
  filename?: string
  alt?: string
  source: "supabase" | "local" | "external"
  error?: string
}

/**
 * Upload an image file (Buffer/Blob) or store external URL.
 * Supports Supabase Storage bucket ('school-media' or 'media') with fallback to Payload Media collection.
 */
export async function uploadImageFile(
  fileBuffer: Buffer,
  filename: string,
  mimeType: string,
  altText: string = "Uploaded image"
): Promise<UploadResult> {
  // --- 1. Try Supabase Storage if credentials are configured ---
  if (supabase) {
    try {
      const bucketName = "school-media"
      const cleanFilename = `${Date.now()}-${filename.replace(/[^a-zA-Z0-9.-]/g, "_")}`

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(cleanFilename, fileBuffer, {
          contentType: mimeType,
          upsert: true,
        })

      if (!uploadError && uploadData) {
        const { data: publicUrlData } = supabase.storage
          .from(bucketName)
          .getPublicUrl(cleanFilename)

        if (publicUrlData?.publicUrl) {
          // Also create a Payload Media doc referencing this URL if possible
          try {
            const payload = await getPayload()
            const mediaDoc = await payload.create({
              collection: "media",
              data: {
                alt: altText,
                caption: `Uploaded to Supabase: ${cleanFilename}`,
              },
              file: {
                data: fileBuffer,
                name: cleanFilename,
                mimetype: mimeType,
                size: fileBuffer.length,
              },
            })

            return {
              success: true,
              id: mediaDoc.id,
              url: publicUrlData.publicUrl,
              filename: cleanFilename,
              alt: altText,
              source: "supabase",
            }
          } catch {
            return {
              success: true,
              url: publicUrlData.publicUrl,
              filename: cleanFilename,
              alt: altText,
              source: "supabase",
            }
          }
        }
      }
    } catch (supabaseErr) {
      console.warn("[Storage] Supabase upload failed, falling back to local Payload media:", supabaseErr)
    }
  }

  // --- 2. Fallback to Local Payload Media collection ---
  try {
    const payload = await getPayload()
    const cleanFilename = `${Date.now()}-${filename.replace(/[^a-zA-Z0-9.-]/g, "_")}`

    const mediaDoc = await payload.create({
      collection: "media",
      data: {
        alt: altText,
        caption: `Uploaded image: ${cleanFilename}`,
      },
      file: {
        data: fileBuffer,
        name: cleanFilename,
        mimetype: mimeType,
        size: fileBuffer.length,
      },
    })

    return {
      success: true,
      id: mediaDoc.id,
      url: mediaDoc.url || `/media/${cleanFilename}`,
      filename: cleanFilename,
      alt: altText,
      source: "local",
    }
  } catch (localErr: any) {
    console.error("[Storage] Failed to save media locally:", localErr)
    return {
      success: false,
      url: "",
      source: "local",
      error: localErr?.message || "Failed to upload image file",
    }
  }
}

/**
 * Handle external image URL: download buffer and import into Media, or return verified URL.
 */
export async function handleExternalImageUrl(
  externalUrl: string,
  altText: string = "External image"
): Promise<UploadResult> {
  // Validate URL format
  try {
    const parsed = new URL(externalUrl)
    if (!["http:", "https:"].includes(parsed.protocol)) {
      throw new Error("Invalid URL protocol. Must be HTTP or HTTPS.")
    }
  } catch {
    return {
      success: false,
      url: "",
      source: "external",
      error: "Invalid image URL provided.",
    }
  }

  // Attempt to fetch the remote image to store it into Media collection for persistent offline/CDN reliability
  try {
    const response = await fetch(externalUrl, {
      headers: {
        "User-Agent": "Pakdeepan-CMS-Image-Sync/1.0",
      },
    })

    if (!response.ok) {
      // Remote image might block bots or return non-200, return direct URL
      return {
        success: true,
        url: externalUrl,
        alt: altText,
        source: "external",
      }
    }

    const contentType = response.headers.get("content-type") || "image/jpeg"
    const buffer = Buffer.from(await response.arrayBuffer())
    const urlParts = externalUrl.split("/")
    const rawName = urlParts[urlParts.length - 1]?.split("?")[0] || "external-image.jpg"
    const filename = rawName.includes(".") ? rawName : `${rawName}.jpg`

    return await uploadImageFile(buffer, filename, contentType, altText)
  } catch {
    // If fetching fails, return the verified external URL directly
    return {
      success: true,
      url: externalUrl,
      alt: altText,
      source: "external",
    }
  }
}

