import { useMutation, useQueryClient } from "@tanstack/react-query"
import { LikePostParams } from "@/http/types/posts"
import customInstance from "@/lib/mutator"

async function likePost(params: LikePostParams): Promise<void> {
  return await customInstance<void>({
    url: `/posts/${params.id}/like`,
    method: "POST",
  })
}

export function useLikePost() {
  const queryClient = useQueryClient()

  return useMutation<void, Error, LikePostParams>({
    mutationFn: likePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] })
    },
  })
}
