import { useMutation, useQueryClient } from "@tanstack/react-query"
import { DeletePostParams } from "@/http/types/posts"
import customInstance from "@/lib/mutator"

async function deletePost(params: DeletePostParams): Promise<void> {
  return await customInstance<void>({
    url: `/posts/${params.id}`,
    method: "DELETE",
  })
}

export function useDeletePost() {
  const queryClient = useQueryClient()

  return useMutation<void, Error, DeletePostParams>({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] })
    },
  })
}
