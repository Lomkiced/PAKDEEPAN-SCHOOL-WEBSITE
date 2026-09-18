import type { CollectionConfig } from "payload"
import { revalidateTag } from "next/cache"

export const Events: CollectionConfig = {
  slug: "events",
  labels: {
    singular: "Event",
    plural: "Events",
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "eventDate", "location", "category"],
    description: "Manage school events displayed on the Campus Life events calendar.",
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [
      async () => {
        try {
          revalidateTag('campus-life-cache', 'default')
          revalidateTag('home-cache', 'default')
        } catch (e) {
          console.error('[Events afterChange] Revalidation error:', e)
        }
      },
    ],
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
      label: "Event Name",
    },
    {
      name: "eventDate",
      type: "date",
      required: true,
      label: "Event Date",
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
    },
    {
      name: "endDate",
      type: "date",
      label: "End Date",
      admin: {
        description: "Optional. For multi-day events.",
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
    },
    {
      name: "location",
      type: "text",
      required: true,
      localized: true,
      label: "Location",
      admin: {
        description: "e.g., Grand Auditorium, North Wing",
      },
    },
    {
      name: "category",
      type: "select",
      required: true,
      options: [
        { label: "Academic", value: "academic" },
        { label: "Arts & Culture", value: "arts_culture" },
        { label: "Sports", value: "sports" },
        { label: "Community", value: "community" },
        { label: "Holiday", value: "holiday" },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "description",
      type: "richText",
      localized: true,
      label: "Event Description",
    },
    {
      name: "coverImage",
      type: "upload",
      relationTo: "media",
      label: "Cover Image",
    },
  ],
}
