import type { GlobalConfig } from "payload"
import { revalidateTag } from "next/cache"

export const PrivacyPage: GlobalConfig = {
  slug: "privacy-page",
  label: "Privacy Page",
  admin: {
    description: "Manage content for the Privacy Policy page (Title, Date, Intro, and Legal Sections).",
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [
      async () => {
        try {
          revalidateTag("privacy-page-cache", "default")
          revalidateTag("privacy-cache", "default")
        } catch (e) {
          console.error("[PrivacyPage afterChange] Revalidation error:", e)
        }
      },
    ],
  },
  fields: [
    {
      name: "title",
      type: "text",
      localized: true,
      defaultValue: "Privacy Policy",
      label: "Page Title",
    },
    {
      name: "lastUpdated",
      type: "text",
      localized: true,
      defaultValue: "October 24, 2024",
      label: "Last Updated Date String",
    },
    {
      name: "intro",
      type: "textarea",
      localized: true,
      defaultValue:
        "At Pakdeepan Kindergarten School, we are committed to protecting the privacy and security of our students, parents, staff, and broader community. This Privacy Policy outlines how we collect, use, and safeguard personal information in a manner that aligns with our core values of transparency and trust.",
      label: "Introductory Paragraph",
    },
    {
      name: "sections",
      type: "array",
      label: "Policy Sections",
      fields: [
        {
          name: "sectionId",
          type: "text",
          required: true,
          label: "Section Anchor ID (e.g. information-collection)",
        },
        {
          name: "title",
          type: "text",
          localized: true,
          required: true,
          label: "Section Title",
        },
        {
          name: "description",
          type: "textarea",
          localized: true,
          label: "Section Paragraph",
        },
        {
          name: "bullets",
          type: "array",
          label: "Bullet Points (Optional)",
          fields: [
            {
              name: "text",
              type: "text",
              localized: true,
              label: "Bullet Text",
            },
          ],
        },
      ],
    },
  ],
}

