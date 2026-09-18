"use server"

import { getPayload } from "@/lib/payload"
import { z } from "zod"

const inquirySchema = z.object({
  parentName: z.string().min(2, "Parent/Guardian name is required"),
  email: z.string().email("Please enter a valid email address"),
  childName: z.string().min(2, "Child's name is required"),
  grade: z.string().min(1, "Please select a grade"),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must consent to the privacy policy"
  }),
})

export async function submitAdmissionInquiry(data: z.infer<typeof inquirySchema>) {
  try {
    // Validate the data on the server
    const validatedData = inquirySchema.parse(data)

    const payload = await getPayload()

    // Create the inquiry in Payload CMS
    await payload.create({
      collection: "inquiries",
      data: {
        firstName: validatedData.parentName.split(' ')[0] || validatedData.parentName,
        lastName: validatedData.parentName.split(' ').slice(1).join(' ') || "N/A",
        email: validatedData.email,
        phone: "N/A", // Not collected in this form currently
        interest: "admission", // Distinguish from general contact form
        message: `Admission Inquiry for ${validatedData.childName} (Grade: ${validatedData.grade})`,
        status: "new",
        source: "website",
      },
    })

    return { success: true }
  } catch (error) {
    console.error("Admission inquiry submission error:", error)
    if (error instanceof z.ZodError) {
      return { success: false, error: "Validation failed. Please check your inputs." }
    }
    return { success: false, error: "Failed to submit inquiry. Please try again later." }
  }
}
