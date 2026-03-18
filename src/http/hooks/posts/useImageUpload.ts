import { useEffect, useState } from "react"
import { showToast } from "@/components/Shared/Toaster"
import {
  MAX_SIZE_UPLOAD_IMAGE,
  MAX_SIZE_UPLOAD_IMAGE_STRING,
} from "@/domain/common/constants/values-upload-image"
import { deleteImage } from "@/lib/upload-image"

type UseImageUploadOptions = {
  existingImage?: string | null
}

type UseImageUploadReturn = {
  file: File | null
  preview: string | null
  onSelect: (file?: File) => void
  onRemove: () => void
  onDeleteExisting: () => Promise<void>
  hasNewImage: boolean
  hasExistingImage: boolean
  hasDeletedExisting: boolean
  clear: () => void
}

export function useImageUpload(
  options: UseImageUploadOptions = {},
): UseImageUploadReturn {
  const { existingImage } = options

  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [hasDeletedExisting, setHasDeletedExisting] = useState(false)

  const hasNewImage = file !== null
  const hasExistingImage = !!(existingImage && !hasDeletedExisting)

  useEffect(() => {
    if (existingImage && !hasNewImage && !hasDeletedExisting) {
      setPreview(existingImage)
    }
  }, [existingImage, hasNewImage, hasDeletedExisting])

  const onSelect = (selectedFile?: File) => {
    if (!selectedFile) return

    if (selectedFile.size > MAX_SIZE_UPLOAD_IMAGE) {
      showToast.info({
        title: `Imagem muito grande. Máximo: ${MAX_SIZE_UPLOAD_IMAGE_STRING} MB`,
      })
      return
    }

    if (!selectedFile.type.startsWith("image/")) {
      showToast.info({ title: "Apenas imagens permitidas" })
      return
    }

    setFile(selectedFile)
    setPreview(URL.createObjectURL(selectedFile))
    setHasDeletedExisting(false)
  }

  const onRemove = () => {
    if (preview && !preview.startsWith("data:")) {
      setHasDeletedExisting(true)
    }
    setFile(null)
    setPreview(null)
  }

  const onDeleteExisting = async () => {
    if (existingImage) {
      await deleteImage(existingImage)
    }
    setHasDeletedExisting(true)
    setPreview(null)
  }

  const clear = () => {
    setFile(null)
    setPreview(null)
    setHasDeletedExisting(false)
  }

  useEffect(() => {
    return () => {
      if (preview?.startsWith("blob:")) {
        URL.revokeObjectURL(preview)
      }
    }
  }, [preview])

  return {
    file,
    preview,
    onSelect,
    onRemove,
    onDeleteExisting,
    hasNewImage,
    hasExistingImage,
    hasDeletedExisting,
    clear,
  }
}
