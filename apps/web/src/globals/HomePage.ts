import type { GlobalConfig } from "payload"
import { revalidateAllRoutes } from "@/lib/revalidate"

export const HomePage: GlobalConfig = {
  slug: "home-page",
  label: "Home Page",
  admin: {
    description: "Manage content for the school website Home Page (Hero, Marquee, Philosophy, Pathways, News, and CTA banner).",
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [
      async () => {
        revalidateAllRoutes("/", ["home-page-cache", "home-cache"])
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
              name: "heroTagline",
              type: "text",
              localized: true,
              required: true,
              defaultValue: "Learn · Grow · Build Your Future",
              label: "Hero Script Tagline (Sherlina)",
              admin: {
                description: "Appears in handwritten script above the main headline.",
              },
            },
            {
              name: "heroTitlePrefix",
              type: "text",
              localized: true,
              defaultValue: "Welcome to",
              label: "Hero Title Prefix",
            },
            {
              name: "heroTitleHighlight",
              type: "text",
              localized: true,
              defaultValue: "Pakdeepan",
              label: "Hero Title Highlight (Pink + Underline)",
            },
            {
              name: "heroTitleSuffix",
              type: "text",
              localized: true,
              defaultValue: "School",
              label: "Hero Title Suffix",
            },
            {
              name: "heroBody",
              type: "textarea",
              localized: true,
              required: true,
              defaultValue:
                "Every great journey begins by opening a book. We cultivate joyful curiosity, strong bilingual foundations, and creative inquiry in every young child.",
              label: "Hero Description Paragraph",
            },
            {
              name: "heroPrimaryCTALabel",
              type: "text",
              localized: true,
              required: true,
              defaultValue: "Discover Our School",
              label: "Primary CTA Button Label",
            },
            {
              name: "heroPrimaryCTALink",
              type: "text",
              required: true,
              defaultValue: "/about",
              label: "Primary CTA Button Link",
            },
            {
              name: "heroSecondaryCTALabel",
              type: "text",
              localized: true,
              required: true,
              defaultValue: "Admissions",
              label: "Secondary CTA Button Label",
            },
            {
              name: "heroSecondaryCTALink",
              type: "text",
              required: true,
              defaultValue: "/admissions",
              label: "Secondary CTA Button Link",
            },
            {
              name: "heroBackgroundImage",
              type: "upload",
              relationTo: "media",
              label: "Hero Ambient / Background Image",
              admin: {
                description: "Optional background image behind hero content. Falls back to subtle brand ambient gradients.",
              },
            },
            {
              name: "heroVideoPoster",
              type: "upload",
              relationTo: "media",
              label: "Hero Video Poster (Fallback)",
              admin: {
                description: "Poster preview image displayed before the animated emblem loads.",
              },
            },
          ],
        },
        {
          label: "Marquee",
          fields: [
            {
              name: "marqueeItems",
              type: "array",
              label: "Marquee Core Values / Slogans",
              labels: {
                singular: "Slogan",
                plural: "Slogans",
              },
              admin: {
                description: "Continuous streaming core values below hero section.",
              },
              fields: [
                {
                  name: "text",
                  type: "text",
                  localized: true,
                  required: true,
                  label: "Slogan Text",
                },
              ],
            },
          ],
        },
        {
          label: "Philosophy Section",
          fields: [
            {
              name: "philosophyImage",
              type: "upload",
              relationTo: "media",
              label: "Philosophy Section Feature Image",
              admin: {
                description: "Large editorial photography block.",
              },
            },
            {
              name: "philosophyScriptTagline",
              type: "text",
              localized: true,
              defaultValue: "Small steps today, big dreams tomorrow",
              label: "Philosophy Calligraphy Accent (Sherlina)",
            },
            {
              name: "philosophyHeading",
              type: "text",
              localized: true,
              required: true,
              defaultValue: "More than a school.",
              label: "Philosophy Heading Line 1",
            },
            {
              name: "philosophySubheading",
              type: "text",
              localized: true,
              required: true,
              defaultValue: "A foundation for life.",
              label: "Philosophy Subheading Line 2",
            },
            {
              name: "philosophyBody",
              type: "textarea",
              localized: true,
              required: true,
              defaultValue:
                "We believe that education is not just about academics, but about character, creativity, and cultivating joyful curiosity in an international setting.",
              label: "Philosophy Narrative Body",
            },
            {
              name: "philosophyLinkLabel",
              type: "text",
              localized: true,
              defaultValue: "Read our story",
              label: "Philosophy Link Text",
            },
            {
              name: "philosophyLinkHref",
              type: "text",
              defaultValue: "/about",
              label: "Philosophy Link Target",
            },
          ],
        },
        {
          label: "Pathways Section",
          fields: [
            {
              name: "pathwaysBadge",
              type: "text",
              localized: true,
              defaultValue: "Educational Pathways",
              label: "Section Eyebrow Badge",
            },
            {
              name: "pathwaysTitlePrefix",
              type: "text",
              localized: true,
              defaultValue: "Explore",
              label: "Section Title Prefix",
            },
            {
              name: "pathwaysTitleHighlight",
              type: "text",
              localized: true,
              defaultValue: "Pakdeepan",
              label: "Section Title Highlight (Pink)",
            },
            {
              name: "pathwaysCTALabel",
              type: "text",
              localized: true,
              defaultValue: "Book a Campus Tour",
              label: "Action Button Label",
            },
            {
              name: "pathwaysCTALink",
              type: "text",
              defaultValue: "/contact",
              label: "Action Button Link",
            },
            {
              name: "pathways",
              type: "array",
              label: "Pathways List (Editorial Index)",
              fields: [
                {
                  name: "title",
                  type: "text",
                  localized: true,
                  required: true,
                  label: "Pathway Title",
                },
                {
                  name: "desc",
                  type: "textarea",
                  localized: true,
                  required: true,
                  label: "Short Description",
                },
                {
                  name: "href",
                  type: "text",
                  required: true,
                  label: "Target Link URL",
                },
              ],
            },
          ],
        },
        {
          label: "News Section",
          fields: [
            {
              name: "newsBadge",
              type: "text",
              localized: true,
              defaultValue: "Latest News & Events",
              label: "Eyebrow Badge",
            },
            {
              name: "newsTitlePrefix",
              type: "text",
              localized: true,
              defaultValue: "Stay",
              label: "Headline Prefix",
            },
            {
              name: "newsTitleHighlight",
              type: "text",
              localized: true,
              defaultValue: "Informed",
              label: "Headline Highlight (Pink)",
            },
            {
              name: "newsSubtitle",
              type: "textarea",
              localized: true,
              defaultValue: "Get the latest updates, announcements, and upcoming events at Pakdeepan School.",
              label: "Section Subtitle",
            },
            {
              name: "newsViewAllLabel",
              type: "text",
              localized: true,
              defaultValue: "View All News & Events",
              label: "View All Button Label",
            },
          ],
        },
        {
          label: "CTA Banner",
          fields: [
            {
              name: "ctaHeading",
              type: "text",
              localized: true,
              required: true,
              defaultValue: "See Our School in Action",
              label: "Banner Heading",
            },
            {
              name: "ctaBody",
              type: "textarea",
              localized: true,
              required: true,
              defaultValue: "Take a glimpse of our vibrant community, classrooms, and school life.",
              label: "Banner Subtitle",
            },
            {
              name: "ctaButtonLabel",
              type: "text",
              localized: true,
              defaultValue: "View Gallery",
              label: "Banner CTA Button Label",
            },
            {
              name: "ctaButtonLink",
              type: "text",
              defaultValue: "/campus-life",
              label: "Banner CTA Button Link",
            },
            {
              name: "ctaScriptText",
              type: "text",
              localized: true,
              defaultValue: "Together We Grow",
              label: "Script Calligraphy Text (Sherlina)",
            },
            {
              name: "ctaPolaroid1",
              type: "upload",
              relationTo: "media",
              label: "Polaroid Photo 1",
            },
            {
              name: "ctaPolaroid2",
              type: "upload",
              relationTo: "media",
              label: "Polaroid Photo 2",
            },
            {
              name: "ctaPolaroid3",
              type: "upload",
              relationTo: "media",
              label: "Polaroid Photo 3",
            },
          ],
        },
      ],
    },
  ],
}

