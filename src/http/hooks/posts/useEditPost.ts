import { useMutation } from "@tanstack/react-query"
import { CreatePostInput, Post } from "@/http/types/posts"
import customInstance from "@/lib/mutator"
import { usePostsStore } from "@/lib/store/posts"

type UpdatePostParams = {
  id: number
  data: CreatePostInput
  originalPost: Post
}

async function fetchUpdatePost({
  id,
  data,
  originalPost,
}: UpdatePostParams): Promise<UpdatePostParams> {
  await customInstance<Post>({
    url: `/posts/${id}`,
    method: "PUT",
    data,
  })

  return { id, data, originalPost }
}

export function useEditPost() {
  const updatePost = usePostsStore((s) => s.updatePost)

  return useMutation({
    mutationFn: fetchUpdatePost,
    onSuccess: (response) => {
      updatePost(response.id, {
        ...response.originalPost,
        id: response.id,
        title: response.data.title,
        content: response.data.content,
        image: response.data.image,
      })
    },
  })
}
