import { useMutation } from "@tanstack/react-query"
import { CreatePostInput, Post } from "@/http/types/posts"
import customInstance from "@/lib/mutator"
import { getAuthUser } from "@/lib/storage"
import { usePostsStore } from "@/lib/store/posts"

async function createPost(data: CreatePostInput): Promise<Post> {
  return await customInstance<Post>({
    url: "/posts/",
    method: "POST",
    data,
  })
}

export function useCreatePost() {
  const user = getAuthUser()
  const addPost = usePostsStore((s) => s.addPost)

  return useMutation<Post, Error, CreatePostInput>({
    mutationFn: createPost,
    onSuccess: (response) => {
      addPost({ ...response, authorName: user!.name })
    },
  })
}
