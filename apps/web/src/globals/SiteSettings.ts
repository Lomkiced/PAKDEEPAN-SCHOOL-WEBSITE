import type { GlobalConfig } from "payload"
import { revalidateTag } from "next/cache"

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Site Settings",
  admin: {
    description:
      "Global settings for the school website. Changes here update the footer, contact page, and metadata across all pages.",
  },
  access: {
    read: () => true, // Public — needed for footer/contact data
  },
  hooks: {
    afterChange: [
      async () => {
        try {
          revalidateTag('site-settings-cache', 'default')
          revalidateTag('contact-cache', 'default')
        } catch (e) {
          console.error('[SiteSettings afterChange] Revalidation error:', e)
        }
      },
    ],
  },
  fields: [
    {
      name: "schoolName",
      type: "text",
      required: true,
      defaultValue: "Pakdeepan Kindergarten School",
      label: "School Name",
    },
    {
      name: "tagline",
      type: "text",
      defaultValue: "Excellence in Early Education",
      label: "Tagline",
    },
    {
      type: "group",
      name: "contact",
      label: "Contact Information",
      fields: [
        {
          name: "phone",
          type: "text",
          label: "Phone Number",
          defaultValue: "+1 (555) 123-4567",
        },
        {
          name: "email",
          type: "email",
          label: "Email Address",
          defaultValue: "admissions@pakdeepan.edu",
        },
        {
          name: "address",
          type: "textarea",
          label: "Physical Address",
          defaultValue: "1200 Education Drive\nInnovation District, 1201",
        },
        {
          name: "mapsUrl",
          type: "text",
          label: "Google Maps URL",
          admin: {
            description: "The link that opens when users click 'View on Maps'",
          }
        },
        {
          name: "mapsImage",
          type: "upload",
          relationTo: "media",
          label: "Map Preview Image",
        },
      ],
    },
    {
      type: "group",
      name: "social",
      label: "Social Media Links",
      fields: [
        {
          name: "facebook",
          type: "text",
          label: "Facebook URL",
        },
        {
          name: "instagram",
          type: "text",
          label: "Instagram URL",
        },
        {
          name: "linkedin",
          type: "text",
          label: "LinkedIn URL",
        },
        {
          name: "youtube",
          type: "text",
          label: "YouTube URL",
        },
      ],
    },
    {
      type: "group",
      name: "officeHours",
      label: "Office Hours",
      fields: [
        {
          name: "days",
          type: "text",
          defaultValue: "Monday – Friday",
          label: "Days",
        },
        {
          name: "hours",
          type: "text",
          defaultValue: "8:00 AM – 4:00 PM",
          label: "Hours",
        },
      ],
    },
  ],
}
