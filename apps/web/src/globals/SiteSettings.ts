import type { GlobalConfig } from "payload"
import { revalidateTag } from "next/cache"

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Site Settings",
  admin: {
    description:
      "Global settings for the school website. Changes here update the header, navigation, footer, contact page, social links, and metadata across all pages.",
  },
  access: {
    read: () => true, // Public — needed for footer/nav/contact data
  },
  hooks: {
    afterChange: [
      async () => {
        try {
          revalidateTag("site-settings-cache", "default")
          revalidateTag("contact-cache", "default")
          revalidateTag("home-cache", "default")
        } catch (e) {
          console.error("[SiteSettings afterChange] Revalidation error:", e)
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
      name: "navigation",
      label: "Navigation Bar Settings",
      fields: [
        {
          name: "ctaLabel",
          type: "text",
          defaultValue: "Enroll Now",
          label: "Header CTA Button Label (Desktop)",
        },
        {
          name: "ctaMobileLabel",
          type: "text",
          defaultValue: "Enroll",
          label: "Header CTA Button Label (Mobile)",
        },
        {
          name: "ctaLink",
          type: "text",
          defaultValue: "/admissions",
          label: "Header CTA Target Link",
        },
      ],
    },
    {
      type: "group",
      name: "footer",
      label: "Footer Settings",
      fields: [
        {
          name: "tagline",
          type: "text",
          defaultValue: "Small steps today,\nbig dreams tomorrow.",
          label: "Footer Headline / Tagline",
        },
        {
          name: "philosophy",
          type: "textarea",
          defaultValue:
            "Cultivating a foundation of curiosity, empathy, and academic rigor in a warm, international setting.",
          label: "Footer Philosophy Narrative",
        },
        {
          name: "location",
          type: "text",
          defaultValue: "Chanthaburi, Thailand",
          label: "Footer Location Label",
        },
        {
          name: "copyrightName",
          type: "text",
          defaultValue: "Pakdeepan Kindergarten School",
          label: "Footer Copyright Name",
        },
      ],
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
          defaultValue: "+66 39 123 4567",
        },
        {
          name: "email",
          type: "email",
          label: "Email Address",
          defaultValue: "admissions@pakdeepan.ac.th",
        },
        {
          name: "address",
          type: "textarea",
          label: "Physical Address",
          defaultValue: "Chanthaburi, Thailand",
        },
        {
          name: "mapsUrl",
          type: "text",
          label: "Google Maps URL",
          defaultValue: "https://maps.google.com",
          admin: {
            description: "The link that opens when users click 'View on Maps'",
          },
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
          defaultValue: "https://facebook.com/pakdeepanschool",
        },
        {
          name: "instagram",
          type: "text",
          label: "Instagram URL",
          defaultValue: "https://instagram.com/pakdeepanschool",
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
          defaultValue: "8:00 AM – 4:00 PM (Local Time)",
          label: "Hours",
        },
      ],
    },
    {
      type: "group",
      name: "seo",
      label: "Default SEO & Metadata",
      fields: [
        {
          name: "defaultMetaTitle",
          type: "text",
          defaultValue: "Pakdeepan Kindergarten School | A Foundation for a Beautiful Future",
          label: "Default Meta Title",
        },
        {
          name: "defaultMetaDescription",
          type: "textarea",
          defaultValue:
            "Premium early childhood education nurturing creativity, curiosity, and character in a warm, international setting.",
          label: "Default Meta Description",
        },
      ],
    },
  ],
}
