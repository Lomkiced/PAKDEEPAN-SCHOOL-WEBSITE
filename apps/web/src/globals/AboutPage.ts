import type { GlobalConfig } from 'payload'
import { revalidateAllRoutes } from '@/lib/revalidate'

export const AboutPage: GlobalConfig = {
  slug: 'about-page',
  label: 'About Page',
  admin: {
    description: 'Manage content for the About Us page (Hero, Vision/Mission, School Director Message, History, and Faculty/Staff).',
  },
  access: {
    read: () => true, // Public read for website
  },
  hooks: {
    afterChange: [
      async () => {
        revalidateAllRoutes('/about', ['about-page-cache'])
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
              required: false,
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
          label: 'School Director Message',
          fields: [
            {
              name: 'principalName',
              type: 'text',
              required: true,
              defaultValue: 'Dr. Elena Rostova',
              label: 'School Director Name',
            },
            {
              name: 'principalTitle',
              type: 'text',
              localized: true,
              required: true,
              defaultValue: 'School Director (Ph.D. in Early Education)',
              label: 'School Director Title',
            },
            {
              name: 'principalMessage',
              type: 'textarea',
              localized: true,
              required: true,
              defaultValue: '"Welcome to a community where every child is seen, heard, and valued. Our dedicated team of international educators is committed to providing an exceptional start to your child\'s lifelong learning journey. We believe that true excellence is achieved when rigor meets warmth."',
              label: 'School Director Message',
            },
            {
              name: 'principalPhoto',
              type: 'upload',
              relationTo: 'media',
              required: false,
              label: 'School Director Portrait',
            },
          ],
        },
        {
          label: 'History & Heritage',
          fields: [
            {
              name: 'historyBadge',
              type: 'text',
              localized: true,
              defaultValue: 'Our Heritage',
              label: 'History Eyebrow Badge',
            },
            {
              name: 'historyTitle',
              type: 'text',
              localized: true,
              defaultValue: 'A Foundation Built on Trust and Care',
              label: 'History Title',
            },
            {
              name: 'historyDescription',
              type: 'textarea',
              localized: true,
              defaultValue: 'Founded in Chanthaburi with a vision for modern, joyful, and bilingual early years learning, Pakdeepan Kindergarten School has nurtured generations of young learners into confident, creative global citizens.',
              label: 'History Narrative',
            },
            {
              name: 'historyImage',
              type: 'upload',
              relationTo: 'media',
              label: 'History Photo / Campus Archive',
            },
            {
              name: 'milestones',
              type: 'array',
              label: 'Historical Milestones',
              fields: [
                {
                  name: 'year',
                  type: 'text',
                  required: true,
                  label: 'Year',
                },
                {
                  name: 'title',
                  type: 'text',
                  localized: true,
                  required: true,
                  label: 'Milestone Title',
                },
                {
                  name: 'description',
                  type: 'textarea',
                  localized: true,
                  label: 'Milestone Description',
                },
              ],
            },
          ],
        },
        {
          label: 'Faculty & Teachers',
          fields: [
            {
              name: 'facultyBadge',
              type: 'text',
              localized: true,
              defaultValue: 'Our Educators',
              label: 'Faculty Eyebrow Badge',
            },
            {
              name: 'facultyTitle',
              type: 'text',
              localized: true,
              defaultValue: 'Passionate Educators, Nurturing Leaders',
              label: 'Faculty Title',
            },
            {
              name: 'facultyDescription',
              type: 'textarea',
              localized: true,
              defaultValue: 'Our team of certified international and Thai educators brings decades of specialized early learning experience and warmth to every classroom.',
              label: 'Faculty Description',
            },
            {
              name: 'facultyMembers',
              type: 'array',
              label: 'Faculty Members',
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                  label: 'Teacher / Staff Name',
                },
                {
                  name: 'role',
                  type: 'text',
                  localized: true,
                  required: true,
                  label: 'Role / Designation',
                },
                {
                  name: 'qualification',
                  type: 'text',
                  localized: true,
                  label: 'Degrees / Certifications',
                },
                {
                  name: 'photo',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Educator Photo',
                },
                {
                  name: 'bio',
                  type: 'textarea',
                  localized: true,
                  label: 'Brief Bio',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
