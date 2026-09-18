import type { CollectionConfig } from "payload"
import { revalidateTag } from "next/cache"

export const GalleryImages: CollectionConfig = {
  slug: "gallery-images",
  labels: {
    singular: "Gallery Image",
    plural: "Gallery",
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "image"],
    description: "Manage the photo gallery on the Campus Life page.",
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
          console.error('[GalleryImages afterChange] Revalidation error:', e)
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
      label: "Title",
      admin: {
        description: "A short title for this gallery image.",
      },
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
      label: "Image",
    },
    {
      name: "category",
      type: "select",
      required: true,
      options: [
        { label: "Campus", value: "campus" },
        { label: "Events", value: "events" },
        { label: "Learning", value: "learning" },
        { label: "Arts", value: "arts" },
        { label: "Sports", value: "sports" },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "sortOrder",
      type: "number",
      defaultValue: 0,
      label: "Sort Order",
      admin: {
        description: "Lower numbers appear first in the gallery.",
        position: "sidebar",
      },
    },
  ],
}
