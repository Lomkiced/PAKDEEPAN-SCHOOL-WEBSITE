import type { GlobalConfig } from "payload"
import { revalidateTag } from "next/cache"

export const ProgramsPage: GlobalConfig = {
  slug: "programs-page",
  label: "Programs Page",
  admin: {
    description: "Manage content for the Academic Programs page (Header, Curriculum Highlights, and Daily Schedule).",
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [
      async () => {
        try {
          revalidateTag("programs-page-cache", "default")
          revalidateTag("programs-cache", "default")
        } catch (e) {
          console.error("[ProgramsPage afterChange] Revalidation error:", e)
        }
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
              name: "heroTitle",
              type: "text",
              localized: true,
              defaultValue: "Academic Programs",
              label: "Page Title",
            },
            {
              name: "heroDescription",
              type: "textarea",
              localized: true,
              defaultValue:
                "Nurturing curiosity and laying the foundation for a lifelong love of learning through our specialized early childhood curriculum.",
              label: "Page Subtitle",
            },
          ],
        },
        {
          label: "Curriculum Highlights",
          fields: [
            {
              name: "curriculumTitle",
              type: "text",
              localized: true,
              defaultValue: "Curriculum Highlights",
              label: "Section Title",
            },
            {
              name: "highlights",
              type: "array",
              label: "Highlights List",
              fields: [
                {
                  name: "iconName",
                  type: "select",
                  required: true,
                  defaultValue: "Brain",
                  options: [
                    { label: "Brain (Montessori / Cognitive)", value: "Brain" },
                    { label: "Translate (Bilingual / Language)", value: "Translate" },
                    { label: "Atom (STEM / Science)", value: "Atom" },
                    { label: "Book (Literacy / Reading)", value: "Book" },
                    { label: "Sparkle (Creative / Arts)", value: "Sparkle" },
                    { label: "Globe (Global / Culture)", value: "Globe" },
                  ],
                  label: "Icon Type",
                },
                {
                  name: "title",
                  type: "text",
                  localized: true,
                  required: true,
                  label: "Highlight Title",
                },
                {
                  name: "description",
                  type: "textarea",
                  localized: true,
                  required: true,
                  label: "Highlight Description",
                },
              ],
            },
          ],
        },
        {
          label: "Daily Schedule",
          fields: [
            {
              name: "scheduleTitle",
              type: "text",
              localized: true,
              defaultValue: "A Typical Day",
              label: "Section Title",
            },
            {
              name: "scheduleItems",
              type: "array",
              label: "Schedule Timeline Items",
              fields: [
                {
                  name: "time",
                  type: "text",
                  required: true,
                  defaultValue: "08:30 AM",
                  label: "Time Label",
                },
                {
                  name: "title",
                  type: "text",
                  localized: true,
                  required: true,
                  label: "Activity Title",
                },
                {
                  name: "description",
                  type: "textarea",
                  localized: true,
                  required: true,
                  label: "Activity Description",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

