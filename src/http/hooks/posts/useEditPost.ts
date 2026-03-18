import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CreatePostInput, Post } from "@/http/types/posts"
import customInstance from "@/lib/mutator"

type UpdatePostParams = {
  id: number
  data: CreatePostInput
}

async function updatePost({ id, data }: UpdatePostParams): Promise<Post> {
  return await customInstance<Post>({
    url: `/posts/${id}`,
    method: "PUT",
    data,
  })
}

export function useEditPost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] })
    },
  })
}
