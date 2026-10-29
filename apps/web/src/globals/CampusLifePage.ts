import type { GlobalConfig } from "payload"
import { revalidateTag } from "next/cache"

export const CampusLifePage: GlobalConfig = {
  slug: "campus-life-page",
  label: "Campus Life Page",
  admin: {
    description: "Manage content for the Campus Life page (Header text, Gallery intro, and Filter categories).",
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [
      async () => {
        try {
          revalidateTag("campus-life-page-cache", "default")
          revalidateTag("campus-life-cache", "default")
        } catch (e) {
          console.error("[CampusLifePage afterChange] Revalidation error:", e)
        }
      },
    ],
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Page Header",
          fields: [
            {
              name: "title",
              type: "text",
              localized: true,
              defaultValue: "Campus Life & News",
              label: "Page Headline",
            },
            {
              name: "subtitle",
              type: "textarea",
              localized: true,
              defaultValue:
                "Stay updated with the latest happenings, academic achievements, and community events at Pakdeepan Kindergarten School.",
              label: "Page Subtitle",
            },
          ],
        },
        {
          label: "Gallery Section",
          fields: [
            {
              name: "galleryTitle",
              type: "text",
              localized: true,
              defaultValue: "Gallery",
              label: "Gallery Section Title",
            },
            {
              name: "gallerySubtitle",
              type: "textarea",
              localized: true,
              defaultValue:
                "Explore the vibrant daily experiences, modern learning environments, and joyous moments that define our campus.",
              label: "Gallery Section Subtitle",
            },
          ],
        },
        {
          label: "Event Modal & RSVP",
          fields: [
            {
              name: "modalFallbackImage",
              type: "upload",
              relationTo: "media",
              label: "Event Detail Modal Fallback Image",
            },
            {
              name: "eventModalDefaultText",
              type: "textarea",
              localized: true,
              defaultValue: "Join us for this wonderful event at Pakdeepan Kindergarten School.",
              label: "Event Modal Description Fallback",
            },
            {
              name: "rsvpButtonLabel",
              type: "text",
              localized: true,
              defaultValue: "RSVP Now",
              label: "RSVP Button Label",
            },
          ],
        },
      ],
    },
  ],
}

