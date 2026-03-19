import { MAX_AGE_PUBLIC_URL } from "@/domain/common/constants/values-upload-image"
import { supabase } from "./supabase"

export async function uploadImage(file: File): Promise<string> {
  const ext = file.name.split(".").pop()
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

  const { error } = await supabase.storage
    .from("images-posts")
    .upload(fileName, file)

  if (error) throw error

  const { data } = await supabase.storage
    .from("images-posts")
    .createSignedUrl(fileName, MAX_AGE_PUBLIC_URL)

  return data!.signedUrl
}

export async function deleteImage(url: string): Promise<void> {
  if (!url) return

  const parts = url.split("/images-posts/")
  const filePath = parts[1]?.split("?")[0]

  if (!filePath) return

  const { error } = await supabase.storage
    .from("images-posts")
    .remove([filePath])

  if (error) {
    console.error("Erro ao deletar imagem:", error)
  }
}
