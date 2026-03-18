import { useMutation } from "@tanstack/react-query"
import { DeletePostParams } from "@/http/types/posts"
import customInstance from "@/lib/mutator"
import { usePostsStore } from "@/lib/store/posts"

async function deletePost(params: DeletePostParams): Promise<void> {
  return await customInstance<void>({
    url: `/posts/${params.id}`,
    method: "DELETE",
  })
}

export function useDeletePost() {
  const removePost = usePostsStore((s) => s.removePost)

  return useMutation<void, Error, DeletePostParams>({
    mutationFn: deletePost,
    onSuccess: (_, { id }) => {
      removePost(id)
    },
  })
}
