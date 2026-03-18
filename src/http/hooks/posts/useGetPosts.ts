import { useInfiniteQuery } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"
import { GetPosts, GetPostsParams } from "@/http/types/posts"
import customInstance from "@/lib/mutator"
import { usePostsStore } from "@/lib/store/posts"

export async function getPosts(params?: GetPostsParams): Promise<GetPosts> {
  const queryParams = new URLSearchParams()

  if (params?.page) queryParams.append("page", params.page)
  if (params?.search) queryParams.append("search", params.search)

  return await customInstance<GetPosts>({
    url: "/posts/",
    method: "GET",
    params,
  })
}

export function useGetPosts() {
  const { setPosts, addPosts } = usePostsStore()
  const searchParams = useSearchParams()
  const search = searchParams.get("search") ?? ""

  const { ...props } = useInfiniteQuery<GetPosts>({
    queryKey: ["posts", getPosts.name, search],
    queryFn: async ({ pageParam = 1 }) => {
      const result = await getPosts({ page: String(pageParam), search })
      if (pageParam === 1) {
        setPosts(result.posts)
      } else {
        addPosts(result.posts)
      }
      return result
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.posts.length < lastPage.limit) {
        return undefined
      }
      return lastPage.page + 1
    },
    initialPageParam: 1,
    refetchOnWindowFocus: false,
  })

  return {
    ...props,
  }
}
