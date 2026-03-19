import { FeedFormInput, Post } from "@/http/types/posts"
import { deleteImage, uploadImage } from "@/lib/upload-image"
import { useCreatePost } from "../posts"
import { useEditPost } from "../posts/useEditPost"

type FeedComposerProps = {
  post?: Post | null
  onSuccess?: () => void
}

export function useFeedComposer({ post, onSuccess }: FeedComposerProps) {
  const isEditing = !!post
  const { mutateAsync: create } = useCreatePost()
  const { mutateAsync: edit } = useEditPost()

  const handleSubmit = async (
    data: FeedFormInput,
    file: File | null,
    hasExistingImage: boolean,
    clear: () => void,
    reset: () => void,
  ) => {
    let imageUrl = "" // ← Usar variável local

    // Upload
    if (file) {
      imageUrl = await uploadImage(file) // ← Sem setImageUrl!

      if (isEditing && post?.image) {
        await deleteImage(post.image)
      }
    } else if (hasExistingImage) {
      imageUrl = post!.image || ""
    }

    const payload = { ...data, image: imageUrl } // ← imageUrl agora está correto!

    if (isEditing) {
      await edit({
        id: post!.id,
        data: payload,
        originalPost: post,
      })
    } else {
      await create(payload)
    }

    reset()
    clear()
    onSuccess?.()
  }

  return { handleSubmit, isEditing }
}
