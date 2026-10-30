import { createClient } from "@supabase/supabase-js"
import { put } from "@vercel/blob"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { getPayload } from "@/lib/payload"

// Detect Cloudflare R2 credentials (S3-compatible, ZERO egress fees, unlimited storage)
const r2AccountId = process.env.R2_ACCOUNT_ID || ""
const r2AccessKeyId = process.env.R2_ACCESS_KEY_ID || ""
const r2SecretAccessKey = process.env.R2_SECRET_ACCESS_KEY || ""
const r2BucketName = process.env.R2_BUCKET_NAME || ""
const r2PublicUrl = process.env.R2_PUBLIC_URL || ""
const r2Endpoint = process.env.R2_ENDPOINT || (r2AccountId ? `https://${r2AccountId}.r2.cloudflarestorage.com` : "")

const r2Client = (r2Endpoint && r2AccessKeyId && r2SecretAccessKey)
  ? new S3Client({
      region: "auto",
      endpoint: r2Endpoint,
      credentials: {
        accessKeyId: r2AccessKeyId,
        secretAccessKey: r2SecretAccessKey,
      },
    })
  : null

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
  source: "cloudflare-r2" | "vercel-blob" | "supabase" | "local" | "data-uri" | "external"
  error?: string
}

/**
 * Upload an image file (Buffer/Blob) or store external URL.
 * Multi-tier serverless storage pipeline:
 * 1. Cloudflare R2 (ZERO egress fees, S3-compatible unlimited storage) - PRIMARY
 * 2. Vercel Blob (via BLOB_READ_WRITE_TOKEN) - High performance edge CDN
 * 3. Supabase Storage (bucket: 'school-media' or 'media')
 * 4. Payload Media collection (local dev or persistent container)
 * 5. Safe Base64 Data URI fallback (persisted in PostgreSQL DB without touching read-only Vercel disk)
 */
export async function uploadImageFile(
  fileBuffer: Buffer,
  filename: string,
  mimeType: string,
  altText: string = "Uploaded image"
): Promise<UploadResult> {
  const cleanFilename = `${Date.now()}-${filename.replace(/[^a-zA-Z0-9.-]/g, "_")}`

  // --- 1. PRIMARY: Try Cloudflare R2 (Unlimited Storage & Zero Egress Fees) ---
  if (r2Client && r2BucketName) {
    try {
      await r2Client.send(
        new PutObjectCommand({
          Bucket: r2BucketName,
          Key: cleanFilename,
          Body: fileBuffer,
          ContentType: mimeType,
        })
      )

      const publicUrl = r2PublicUrl
        ? `${r2PublicUrl.replace(/\/$/, "")}/${cleanFilename}`
        : `${r2Endpoint.replace(/\/$/, "")}/${r2BucketName}/${cleanFilename}`

      return {
        success: true,
        url: publicUrl,
        filename: cleanFilename,
        alt: altText,
        source: "cloudflare-r2",
      }
    } catch (r2Err) {
      console.warn("[Storage] Cloudflare R2 upload failed, attempting next storage tier:", r2Err)
    }
  }

  // --- 2. Try Vercel Blob Storage if BLOB_READ_WRITE_TOKEN is configured ---
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const blob = await put(`pakdeepan/${cleanFilename}`, fileBuffer, {
        access: "public",
        contentType: mimeType,
        token: process.env.BLOB_READ_WRITE_TOKEN,
      })

      if (blob?.url) {
        return {
          success: true,
          url: blob.url,
          filename: cleanFilename,
          alt: altText,
          source: "vercel-blob",
        }
      }
    } catch (blobErr) {
      console.warn("[Storage] Vercel Blob upload failed, attempting next storage tier:", blobErr)
    }
  }

  // --- 3. Try Supabase Storage if credentials are configured ---
  if (supabase) {
    try {
      const bucketName = "school-media"

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
          return {
            success: true,
            url: publicUrlData.publicUrl,
            filename: cleanFilename,
            alt: altText,
            source: "supabase",
          }
        }
      }
    } catch (supabaseErr) {
      console.warn("[Storage] Supabase upload failed, attempting next storage tier:", supabaseErr)
    }
  }

  // --- 4. Try Local / Persistent Payload Media collection (if not in a read-only serverless environment) ---
  if (!process.env.VERCEL) {
    try {
      const payload = await getPayload()

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
      console.warn("[Storage] Local Payload media write failed:", localErr?.message)
    }
  }

  // --- 5. Serverless Zero-Downtime Fallback: Store as Data URI in Database ---
  // When running on Vercel without cloud bucket tokens, storing small-to-medium images
  // directly as Data URIs in the PostgreSQL database prevents EROFS errors and guarantees persistence.
  if (fileBuffer.length <= 4.5 * 1024 * 1024) {
    const dataUri = `data:${mimeType};base64,${fileBuffer.toString("base64")}`
    return {
      success: true,
      url: dataUri,
      filename: cleanFilename,
      alt: altText,
      source: "data-uri",
    }
  }

  return {
    success: false,
    url: "",
    source: "local",
    error: "File size exceeds 4.5MB serverless limit. Please configure Cloudflare R2 (R2_ACCESS_KEY_ID) or Vercel Blob (BLOB_READ_WRITE_TOKEN).",
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

  // If cloud storage (Cloudflare R2, Vercel Blob or Supabase) is available, attempt to mirror the image to cloud storage
  if ((r2Client && r2BucketName) || process.env.BLOB_READ_WRITE_TOKEN || supabase) {
    try {
      const response = await fetch(externalUrl, {
        headers: {
          "User-Agent": "Pakdeepan-CMS-Image-Sync/1.0",
        },
      })

      if (response.ok) {
        const contentType = response.headers.get("content-type") || "image/jpeg"
        const buffer = Buffer.from(await response.arrayBuffer())
        const urlParts = externalUrl.split("/")
        const rawName = urlParts[urlParts.length - 1]?.split("?")[0] || "external-image.jpg"
        const filename = rawName.includes(".") ? rawName : `${rawName}.jpg`

        return await uploadImageFile(buffer, filename, contentType, altText)
      }
    } catch {
      // If fetching fails, return the verified external URL directly
    }
  }

  // Return the verified external URL directly without disk writes
  return {
    success: true,
    url: externalUrl,
    alt: altText,
    source: "external",
  }
}

