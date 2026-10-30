import { buildConfig } from "payload"
import { postgresAdapter } from "@payloadcms/db-postgres"
import { lexicalEditor } from "@payloadcms/richtext-lexical"
import { s3Storage } from "@payloadcms/storage-s3"
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
import { HomePage } from "@/globals/HomePage"
import { ProgramsPage } from "@/globals/ProgramsPage"
import { AdmissionsPage } from "@/globals/AdmissionsPage"
import { CampusLifePage } from "@/globals/CampusLifePage"
import { PrivacyPage } from "@/globals/PrivacyPage"

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: " | Pakdeepan Admin",
      description: "Pakdeepan Kindergarten School — Content Management System",
    },
    components: {
      beforeDashboard: [
        "@/components/admin/AdminNavBanner#AdminNavBanner",
      ],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },

  localization: {
    locales: [
      {
        label: "English (EN)",
        code: "en",
      },
      {
        label: "ภาษาไทย (TH)",
        code: "th",
      },
    ],
    defaultLocale: "en",
    fallback: true,
  },

  editor: lexicalEditor(),

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || process.env.DATABASE_URI || "",
    },
    push: true,
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

  globals: [
    HomePage,
    AboutPage,
    ProgramsPage,
    AdmissionsPage,
    CampusLifePage,
    PrivacyPage,
    SiteSettings,
  ],

  plugins: [
    s3Storage({
      collections: {
        media: {
          generateFileURL: ({ filename, prefix }) => {
            if (process.env.R2_PUBLIC_URL) {
              const base = process.env.R2_PUBLIC_URL.replace(/\/$/, "")
              return `${base}/${prefix ? `${prefix}/` : ""}${filename}`
            }
            if (process.env.R2_ACCOUNT_ID && process.env.R2_BUCKET_NAME) {
              return `https://${process.env.R2_BUCKET_NAME}.${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com/${prefix ? `${prefix}/` : ""}${filename}`
            }
            return `/media/${filename}`
          },
        },
      },
      bucket: process.env.R2_BUCKET_NAME || "pakdeepan-media",
      config: {
        endpoint: process.env.R2_ENDPOINT || (process.env.R2_ACCOUNT_ID ? `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com` : ""),
        credentials: {
          accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
          secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
        },
        region: "auto",
      },
      enabled: Boolean(
        (process.env.R2_ACCOUNT_ID || process.env.R2_ENDPOINT) &&
        process.env.R2_ACCESS_KEY_ID &&
        process.env.R2_SECRET_ACCESS_KEY &&
        process.env.R2_BUCKET_NAME
      ),
    }),
  ],

  secret: process.env.PAYLOAD_SECRET || "default-dev-secret-change-me",

  sharp,

  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
})
