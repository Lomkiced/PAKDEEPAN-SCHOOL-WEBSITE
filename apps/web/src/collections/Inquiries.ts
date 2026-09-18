import type { CollectionConfig } from "payload"

export const Inquiries: CollectionConfig = {
  slug: "inquiries",
  labels: {
    singular: "Inquiry",
    plural: "Inquiries",
  },
  admin: {
    useAsTitle: "email",
    defaultColumns: ["firstName", "lastName", "email", "interest", "createdAt"],
    description: "All contact form submissions from the website. Read-only for staff review.",
  },
  access: {
    read: ({ req: { user } }) => Boolean(user), // Only admins can view
    create: () => true, // Public — anyone can submit the contact form
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: "firstName",
      type: "text",
      required: true,
      label: "First Name",
    },
    {
      name: "lastName",
      type: "text",
      required: true,
      label: "Last Name",
    },
    {
      name: "email",
      type: "email",
      required: true,
      label: "Email Address",
    },
    {
      name: "interest",
      type: "select",
      required: true,
      label: "Area of Interest",
      options: [
        { label: "Early Years", value: "early_years" },
        { label: "Primary School", value: "primary" },
        { label: "Secondary School", value: "secondary" },
        { label: "General Inquiry", value: "other" },
      ],
    },
    {
      name: "message",
      type: "textarea",
      required: true,
      label: "Message",
    },
    {
      name: "status",
      type: "select",
      defaultValue: "new",
      options: [
        { label: "New", value: "new" },
        { label: "In Progress", value: "in_progress" },
        { label: "Resolved", value: "resolved" },
      ],
      admin: {
        position: "sidebar",
        description: "Track the status of this inquiry.",
      },
    },
  ],
}
