import { buildConfig } from "payload"
import { postgresAdapter } from "@payloadcms/db-postgres"
import { lexicalEditor } from "@payloadcms/richtext-lexical"
import sharp from "sharp"
import path from "path"
import { fileURLToPath } from "url"

// Collections
import { Users } from "@/collections/Users"
import { Media } from "@/collections/Media"
import { News } from "@/collections/News"
import { Events } from "@/collections/Events"
import { GalleryImages } from "@/collections/GalleryImages"
import { Inquiries } from "@/collections/Inquiries"
import { Programs } from "@/collections/Programs"

// Globals
import { SiteSettings } from "@/globals/SiteSettings"
import { AboutPage } from "@/globals/AboutPage"

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: " | Pakdeepan Admin",
      description: "Pakdeepan Kindergarten School — Content Management System",
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },

  localization: {
    locales: ['en', 'th'],
    defaultLocale: 'en',
    fallback: true,
  },

  editor: lexicalEditor(),

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || "",
    },
  }),

  collections: [
    Users,
    Media,
    Programs,
    News,
    Events,
    GalleryImages,
    Inquiries,
  ],

  globals: [SiteSettings, AboutPage],

  secret: process.env.PAYLOAD_SECRET || "default-dev-secret-change-me",

  sharp,

  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
})
