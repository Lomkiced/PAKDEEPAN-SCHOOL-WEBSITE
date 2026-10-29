import type { GlobalConfig } from "payload"
import { revalidateAllRoutes } from "@/lib/revalidate"

export const AdmissionsPage: GlobalConfig = {
  slug: "admissions-page",
  label: "Admissions Page",
  admin: {
    description: "Manage content for the Admissions & Enrollment page (Hero, Stepper, Form Messages, and Tour CTA).",
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [
      async () => {
        revalidateAllRoutes("/admissions", ["admissions-page-cache", "admissions-cache"])
      },
    ],
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Hero Section",
          fields: [
            {
              name: "heroBadge",
              type: "text",
              localized: true,
              defaultValue: "Join Our Community",
              label: "Hero Eyebrow Badge",
            },
            {
              name: "heroTitle",
              type: "text",
              localized: true,
              defaultValue: "Admissions & Enrollment",
              label: "Hero Title",
            },
            {
              name: "heroDescription",
              type: "textarea",
              localized: true,
              defaultValue:
                "Join a community dedicated to excellence, inquiry, and holistic growth. Begin your journey with Pakdeepan Kindergarten School today.",
              label: "Hero Description",
            },
          ],
        },
        {
          label: "Enrollment Steps",
          fields: [
            {
              name: "steps",
              type: "array",
              label: "Stepper Steps (4 Steps)",
              fields: [
                {
                  name: "stepNumber",
                  type: "number",
                  required: true,
                  defaultValue: 1,
                  label: "Step Number",
                },
                {
                  name: "title",
                  type: "text",
                  localized: true,
                  required: true,
                  label: "Step Title",
                },
                {
                  name: "desc",
                  type: "textarea",
                  localized: true,
                  required: true,
                  label: "Step Description",
                },
              ],
            },
          ],
        },
        {
          label: "Inquiry Form & Tour CTA",
          fields: [
            {
              name: "formTitle",
              type: "text",
              localized: true,
              defaultValue: "Inquiry Form",
              label: "Form Title",
            },
            {
              name: "formSubtitle",
              type: "textarea",
              localized: true,
              defaultValue:
                "Please provide your details below, and our admissions team will contact you shortly to guide you through the next steps.",
              label: "Form Subtitle",
            },
            {
              name: "consentLabel",
              type: "textarea",
              localized: true,
              defaultValue:
                "I consent to Pakdeepan Kindergarten School collecting and processing my data for admissions purposes in accordance with the Privacy Policy.",
              label: "Consent Checkbox Label",
            },
            {
              name: "submitButtonLabel",
              type: "text",
              localized: true,
              defaultValue: "Submit Inquiry",
              label: "Submit Button Text",
            },
            {
              name: "successTitle",
              type: "text",
              localized: true,
              defaultValue: "Inquiry Received",
              label: "Success Screen Title",
            },
            {
              name: "successMessage",
              type: "textarea",
              localized: true,
              defaultValue:
                "Thank you for your interest in Pakdeepan Kindergarten School. Our admissions team will review your details and contact you shortly.",
              label: "Success Screen Message",
            },
            {
              name: "floatingTourLabel",
              type: "text",
              localized: true,
              defaultValue: "Schedule a Tour",
              label: "Floating Tour CTA Button Text",
            },
          ],
        },
      ],
    },
  ],
}

