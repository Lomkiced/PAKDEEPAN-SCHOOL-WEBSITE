import type { CollectionConfig } from "payload"
import { revalidateTag } from "next/cache"

export const News: CollectionConfig = {
  slug: "news",
  labels: {
    singular: "News Article",
    plural: "News",
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "publishDate", "isFeatured", "status"],
    description: "Manage news articles and announcements for the Campus Life page.",
  },
  access: {
    read: () => true, // Public read for frontend
  },
  hooks: {
    afterChange: [
      async () => {
        try {
          revalidateTag('campus-life-cache', 'default')
          revalidateTag('home-cache', 'default')
        } catch (e) {
          console.error('[News afterChange] Revalidation error:', e)
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
      label: "Headline",
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      label: "URL Slug",
      admin: {
        description: "Auto-generated from title. Used in the URL (e.g., /campus-life/new-playground).",
        position: "sidebar",
      },
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "draft",
      options: [
        { label: "Draft", value: "draft" },
        { label: "Published", value: "published" },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "category",
      type: "select",
      required: true,
      options: [
        { label: "Announcements", value: "announcements" },
        { label: "Academics", value: "academics" },
        { label: "Events", value: "events" },
        { label: "Community", value: "community" },
        { label: "Achievement", value: "achievement" },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "isFeatured",
      type: "checkbox",
      defaultValue: false,
      label: "Featured Article",
      admin: {
        description: "Featured articles appear in the hero banner on the Campus Life page.",
        position: "sidebar",
      },
    },
    {
      name: "excerpt",
      type: "textarea",
      required: true,
      localized: true,
      label: "Excerpt",
      maxLength: 280,
      admin: {
        description: "A brief summary shown on news cards (max 280 characters).",
      },
    },
    {
      name: "featuredImage",
      type: "upload",
      relationTo: "media",
      required: true,
      label: "Featured Image",
    },
    {
      name: "body",
      type: "richText",
      required: true,
      localized: true,
      label: "Article Body",
    },
    {
      name: "publishDate",
      type: "date",
      required: true,
      label: "Publish Date",
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
        },
        position: "sidebar",
      },
    },
  ],
}
