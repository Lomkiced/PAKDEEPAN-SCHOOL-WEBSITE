import type { CollectionConfig } from "payload"

export const Users: CollectionConfig = {
  slug: "users",
  labels: {
    singular: "User",
    plural: "Users",
  },
  auth: true, // Enables Payload's built-in auth (login, password hashing, JWT)
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "email", "role"],
    description: "Manage admin users who can access the CMS dashboard.",
  },
  access: {
    // Only authenticated admins can manage users
    read: ({ req: { user } }) => Boolean(user),
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      label: "Full Name",
    },
    {
      name: "role",
      type: "select",
      required: true,
      defaultValue: "editor",
      options: [
        { label: "Admin", value: "admin" },
        { label: "Editor", value: "editor" },
      ],
      admin: {
        description: "Admins can manage users. Editors can manage content only.",
      },
    },
  ],
}
