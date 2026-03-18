import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CreatePostInput, Post } from "@/http/types/posts"
import customInstance from "@/lib/mutator"

async function createPost(data: CreatePostInput): Promise<Post> {
  return await customInstance<Post>({
    url: "/posts/",
    method: "POST",
    data,
  })
}

export function useCreatePost() {
  const queryClient = useQueryClient()

  return useMutation<Post, Error, CreatePostInput>({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] })
    },
  })
}
