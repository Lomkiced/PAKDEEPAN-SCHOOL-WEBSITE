import { NextResponse } from "next/server"
import { getPayload } from "@/lib/payload"

export const dynamic = "force-dynamic"

export async function GET() {
  const startTime = Date.now()
  let dbStatus: "connected" | "degraded" = "connected"
  let latencyMs = 0

  try {
    const payload = await getPayload()
    // Ping PostgreSQL by querying 1 record with depth 0
    await payload.find({
      collection: "users",
      limit: 1,
      depth: 0,
    })
    latencyMs = Date.now() - startTime
  } catch (err: any) {
    dbStatus = "degraded"
    console.warn("[Health Check] Database ping failed:", err?.message)
  }

  return NextResponse.json(
    {
      status: dbStatus === "connected" ? "healthy" : "degraded",
      system: "Pakdeepan School Platform",
      timestamp: new Date().toISOString(),
      latencyMs,
      services: {
        database: dbStatus,
        serverlessRuntime: process.env.VERCEL ? "vercel-edge/lambda" : "node",
        storage: {
          cloudflareR2: !!(
            process.env.R2_ACCESS_KEY_ID &&
            process.env.R2_SECRET_ACCESS_KEY &&
            (process.env.R2_ACCOUNT_ID || process.env.R2_ENDPOINT) &&
            (process.env.R2_BUCKET || process.env.R2_BUCKET_NAME)
          ),
          vercelBlob: !!process.env.BLOB_READ_WRITE_TOKEN,
          supabase: !!(process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL),
        },
      },
      environment: process.env.NODE_ENV || "production",
    },
    {
      status: dbStatus === "connected" ? 200 : 503,
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    }
  )
}

