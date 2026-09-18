import type { CollectionConfig } from 'payload'
import { revalidateTag } from 'next/cache'

export const Programs: CollectionConfig = {
  slug: 'programs',
  labels: {
    singular: 'Academic Program',
    plural: 'Academic Programs',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'level', 'tuitionFee', 'status'],
    description: 'Manage educational programs and curriculum fee schedules in Thai Baht (฿).',
    group: 'Academics',
  },
  access: {
    read: () => true, // Public read for website
  },
  hooks: {
    afterChange: [
      async () => {
        try {
          revalidateTag('programs-cache', 'default')
          revalidateTag('home-cache', 'default')
        } catch (e) {
          console.error('[Programs afterChange] Revalidation error:', e)
        }
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: {
        en: 'Program Title',
        th: 'ชื่อหลักสูตร',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'URL Slug',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'level',
      type: 'select',
      required: true,
      defaultValue: 'kindergarten',
      options: [
        { label: { en: 'Kindergarten (Ages 2-5)', th: 'ระดับอนุบาล (2-5 ปี)' }, value: 'kindergarten' },
        { label: { en: 'Primary (Grades 1-6)', th: 'ระดับประถมศึกษา (ป.1-ป.6)' }, value: 'primary' },
        { label: { en: 'Secondary (Grades 7-12)', th: 'ระดับมัธยมศึกษา (ม.1-ม.6)' }, value: 'secondary' },
        { label: { en: 'English Program (EP)', th: 'หลักสูตรภาษาอังกฤษ (EP)' }, value: 'english-program' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'published',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
      localized: true,
      label: {
        en: 'Short Summary',
        th: 'คำอธิบายโดยย่อ',
      },
      maxLength: 300,
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: {
        en: 'Featured Image',
        th: 'รูปภาพประจำหลักสูตร',
      },
    },
    // ==========================================
    // TUITION & FEES SECTION (THAI BAHT - THB ฿)
    // ==========================================
    {
      type: 'collapsible',
      label: {
        en: 'Tuition & Fee Structure (Thai Baht - ฿)',
        th: 'โครงสร้างค่าธรรมเนียมการศึกษา (บาท - ฿)',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'tuitionFee',
              type: 'number',
              required: true,
              min: 0,
              label: {
                en: 'Base Tuition (THB ฿)',
                th: 'ค่าเล่าเรียนพื้นฐาน (บาท ฿)',
              },
              admin: {
                placeholder: 'e.g. 25000',
              },
            },
            {
              name: 'billingInterval',
              type: 'select',
              defaultValue: 'term',
              required: true,
              options: [
                { label: { en: 'Per Term / Semester', th: 'ต่อภาคเรียน (เทอม)' }, value: 'term' },
                { label: { en: 'Per Academic Year', th: 'ต่อปีการศึกษา' }, value: 'year' },
                { label: { en: 'Per Month', th: 'ต่อเดือน' }, value: 'month' },
              ],
              label: {
                en: 'Billing Cycle',
                th: 'รอบการชำระ',
              },
            },
          ],
        },
        {
          name: 'additionalFees',
          type: 'array',
          label: {
            en: 'Itemized Additional Fees',
            th: 'รายการค่าธรรมเนียมเพิ่มเติม',
          },
          fields: [
            {
              name: 'feeName',
              type: 'text',
              required: true,
              localized: true,
              label: { en: 'Fee Description', th: 'ชื่อรายการ' },
            },
            {
              name: 'amount',
              type: 'number',
              required: true,
              min: 0,
              label: { en: 'Amount (฿)', th: 'จำนวนเงิน (บาท)' },
            },
            {
              name: 'feeType',
              type: 'select',
              defaultValue: 'one-time',
              options: [
                { label: { en: 'One-time (Entrance / Admission)', th: 'แรกเข้า (ครั้งเดียว)' }, value: 'one-time' },
                { label: { en: 'Per Term', th: 'รายภาคเรียน' }, value: 'term' },
                { label: { en: 'Annual', th: 'รายปี' }, value: 'annual' },
              ],
              label: { en: 'Frequency', th: 'ความถี่' },
            },
          ],
        },
      ],
    },
    {
      name: 'syllabusDocument',
      type: 'upload',
      relationTo: 'media',
      label: {
        en: 'Downloadable Syllabus / Prospectus (PDF)',
        th: 'เอกสารหลักสูตร / โบรชัวร์แนะนำ (PDF)',
      },
    },
  ],
}
