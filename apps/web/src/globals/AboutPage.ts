import type { GlobalConfig } from 'payload'
import { revalidateTag } from 'next/cache'

export const AboutPage: GlobalConfig = {
  slug: 'about-page',
  label: 'About Page',
  admin: {
    description: 'Manage content for the About Us page.',
  },
  access: {
    read: () => true, // Public read for website
  },
  hooks: {
    afterChange: [
      async () => {
        try {
          revalidateTag('about-page-cache', 'default')
        } catch (e) {
          console.error('[AboutPage afterChange] Revalidation error:', e)
        }
      },
    ],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero Section',
          fields: [
            {
              name: 'heroBadge',
              type: 'text',
              localized: true,
              required: true,
              defaultValue: 'Our Story',
              label: 'Hero Badge',
            },
            {
              name: 'heroTitle',
              type: 'text',
              localized: true,
              required: true,
              defaultValue: 'Nurturing Excellence in Early Education',
              label: 'Hero Title',
            },
            {
              name: 'heroDescription',
              type: 'textarea',
              localized: true,
              required: true,
              defaultValue: 'At Pakdeepan Kindergarten School, we believe in cultivating a foundation of curiosity, empathy, and academic rigor in a warm, international setting.',
              label: 'Hero Description',
            },
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
              required: true,
              label: 'Hero Image',
            },
          ],
        },
        {
          label: 'Vision & Mission',
          fields: [
            {
              name: 'vision',
              type: 'textarea',
              localized: true,
              required: true,
              defaultValue: 'To be the premier international early years institution, recognized globally for fostering innovative thinkers and compassionate leaders from their very first steps in education.',
              label: 'Our Vision',
            },
            {
              name: 'mission',
              type: 'textarea',
              localized: true,
              required: true,
              defaultValue: 'We provide a holistic, child-centered curriculum within a safe, inspiring, and culturally diverse environment, empowering each child to reach their unique potential through inquiry and joyful discovery.',
              label: 'Our Mission',
            },
          ],
        },
        {
          label: 'Principal Message',
          fields: [
            {
              name: 'principalName',
              type: 'text',
              required: true,
              defaultValue: 'Dr. Elena Rostova',
              label: 'Principal Name',
            },
            {
              name: 'principalTitle',
              type: 'text',
              localized: true,
              required: true,
              defaultValue: 'Ph.D. in Early Education',
              label: 'Principal Title',
            },
            {
              name: 'principalMessage',
              type: 'textarea',
              localized: true,
              required: true,
              defaultValue: '"Welcome to a community where every child is seen, heard, and valued. Our dedicated team of international educators is committed to providing an exceptional start to your child\'s lifelong learning journey. We believe that true excellence is achieved when rigor meets warmth."',
              label: 'Principal Message',
            },
            {
              name: 'principalPhoto',
              type: 'upload',
              relationTo: 'media',
              required: true,
              label: 'Principal Photo',
            },
          ],
        },
      ],
    },
  ],
}
