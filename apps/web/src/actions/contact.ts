"use server"

import { getPayload } from "@/lib/payload"
import { z } from "zod"

const contactSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Please enter a valid email"),
  interest: z.string().min(1, "Please select an area of interest"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must consent to the privacy policy",
  }),
})

export async function submitInquiry(data: z.infer<typeof contactSchema>) {
  try {
    // 1. Validate data on the server
    const parsedData = contactSchema.parse(data)

    // 2. Get Payload CMS instance
    const payload = await getPayload()

    // 3. Create a new record in the Inquiries collection
    await payload.create({
      collection: "inquiries",
      data: {
        firstName: parsedData.firstName,
        lastName: parsedData.lastName,
        email: parsedData.email,
        interest: parsedData.interest as any, // Typed correctly when types are generated
        message: parsedData.message,
        status: "new",
      },
    })

    return { success: true }
  } catch (error) {
    console.error("Failed to submit inquiry:", error)
    return { success: false, error: "Failed to submit inquiry. Please try again later." }
  }
}
