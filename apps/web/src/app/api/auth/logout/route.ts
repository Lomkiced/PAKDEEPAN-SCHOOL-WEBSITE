import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export const dynamic = "force-dynamic"

export async function POST() {
  const cookieStore = await cookies()
  
  // Clear Payload auth token
  cookieStore.set("payload-token", "", {
    path: "/",
    maxAge: 0,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  })

  // Also clear possible user session cookies
  cookieStore.delete("payload-token")

  const response = NextResponse.json({
    success: true,
    message: "Logged out successfully",
  })

  // Extra safety headers
  response.cookies.set("payload-token", "", {
    path: "/",
    maxAge: 0,
    httpOnly: true,
  })

  return response
}

export async function GET() {
  return POST()
}

