"use client"

import * as React from "react"
import { useField } from "@payloadcms/ui"
import { ImageUploader } from "./ImageUploader"

export interface ImageUploaderFieldProps {
  path: string
  field: {
    name: string
    label?: string
    admin?: {
      description?: string
    }
  }
}

export function ImageUploaderField(props: ImageUploaderFieldProps) {
  const { path, field } = props
  const { value, setValue } = useField<any>({ path })

  const currentUrl =
    typeof value === "string"
      ? value
      : value?.url
      ? value.url
      : ""

  const currentId =
    typeof value === "object" && value?.id ? value.id : typeof value === "number" ? value : undefined

  return (
    <div className="mb-6 w-full">
      <ImageUploader
        label={field?.label || field?.name || "Image Asset"}
        description={field?.admin?.description || "Upload an image file or paste an external image URL."}
        initialImageUrl={currentUrl}
        initialMediaId={currentId}
        onImageUploaded={(res) => {
          // If relationship expects ID, store the ID (or URL if external)
          setValue(res.id || res.url)
        }}
        onRemove={() => setValue(null)}
      />
    </div>
  )
}

export default ImageUploaderField

