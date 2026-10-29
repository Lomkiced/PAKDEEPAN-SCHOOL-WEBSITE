import type { CollectionConfig } from "payload"
import { revalidateAllRoutes } from "@/lib/revalidate"

export const News: CollectionConfig = {
  slug: "news",
  labels: {
    singular: "News Article",
    plural: "News",
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "publishDate", "isFeatured", "status"],
    description: "Manage news articles, announcements, and stories for the Campus Life page.",
  },
  access: {
    read: () => true, // Public read for frontend
  },
  hooks: {
    afterChange: [
      async ({ doc }) => {
        revalidateAllRoutes("/campus-life", ["campus-life-cache", "home-cache", "news-cache"])
        if (doc?.id) {
          revalidateAllRoutes(`/news/${doc.id}`)
        }
        if (doc?.slug) {
          revalidateAllRoutes(`/news/${doc.slug}`)
        }
      },
    ],
    afterDelete: [
      async () => {
        revalidateAllRoutes("/campus-life", ["campus-life-cache", "home-cache", "news-cache"])
      },
    ],
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
      label: "Headline (English)",
      admin: {
        description: "Main headline in English.",
      },
    },
    {
      name: "title_th",
      type: "text",
      label: "Headline (Thai - หัวข้อข่าวภาษาไทย)",
      admin: {
        description: "หัวข้อข่าวภาษาไทย หากเว้นว่างไว้จะใช้หัวข้อภาษาอังกฤษ",
      },
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      label: "URL Slug",
      admin: {
        description: "Used in the article URL (e.g., /news/junior-science-week).",
        position: "sidebar",
      },
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "published",
      options: [
        { label: "Published", value: "published" },
        { label: "Draft", value: "draft" },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "category",
      type: "select",
      required: true,
      defaultValue: "campus-life",
      options: [
        { label: "Campus Life / ชีวิตในรั้วโรงเรียน", value: "campus-life" },
        { label: "Announcements / ประกาศสำคัญ", value: "announcements" },
        { label: "Academics / วิชาการ", value: "academics" },
        { label: "Events / กิจกรรม", value: "events" },
        { label: "Community / ชุมชนภักดีพรรณ", value: "community" },
        { label: "Achievement / ความสำเร็จ", value: "achievement" },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "category_th",
      type: "text",
      label: "Category (Thai - หมวดหมู่ภาษาไทย)",
      admin: {
        position: "sidebar",
        description: "ชื่อหมวดหมู่ภาษาไทย (เช่น กิจกรรม, วิชาการ)",
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
      label: "Excerpt (English)",
      maxLength: 350,
      admin: {
        rows: 3,
        description: "A brief summary shown on news cards (max 350 characters).",
      },
    },
    {
      name: "excerpt_th",
      type: "textarea",
      label: "Excerpt (Thai - สรุปย่อภาษาไทย)",
      maxLength: 350,
      admin: {
        rows: 3,
        description: "บทสรุปย่อแสดงในการ์ดข่าวสารภาษาไทย",
      },
    },
    {
      name: "content",
      type: "textarea",
      label: "Full Story Content (English)",
      admin: {
        rows: 8,
        description: "Full multi-paragraph story content in English. Use blank lines between paragraphs.",
      },
    },
    {
      name: "content_th",
      type: "textarea",
      label: "Full Story Content (Thai - เนื้อหาข่าวฉบับเต็ม)",
      admin: {
        rows: 8,
        description: "เนื้อหาข่าวฉบับเต็มภาษาไทยแบบหลายย่อหน้า เว้นบรรทัดระหว่างย่อหน้า",
      },
    },
    {
      name: "imageUrl",
      type: "text",
      label: "Direct Image URL",
      admin: {
        description: "Paste a direct public image URL, or upload below.",
      },
    },
    {
      name: "featuredImage",
      type: "upload",
      relationTo: "media",
      label: "Featured Image",
    },
    {
      name: "body",
      type: "richText",
      localized: true,
      label: "Rich Text Body (Optional Lexical Editor)",
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
