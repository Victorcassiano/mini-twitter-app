import { create } from "zustand"
import { persist } from "zustand/middleware"
import { Post } from "@/http/types/posts"

type PostsStore = {
  posts: Post[]
  userLikes: number[]

  setPosts: (posts: Post[]) => void
  addPosts: (posts: Post[]) => void
  addPost: (post: Post) => void
  removePost: (postId: number) => void
  updatePost: (postId: number, data: Partial<Post>) => void
  toggleLike: (postId: number) => void
  getPost: (postId: number) => Post | undefined
  isLiked: (postId: number) => boolean
}

export const usePostsStore = create<PostsStore>()(
  persist(
    (set, get) => ({
      posts: [],
      userLikes: [],

      setPosts: (posts) => {
        const { userLikes } = get()
        set({
          posts: posts.map((post) => ({
            ...post,
            isLiked: userLikes.includes(post.id),
          })),
        })
      },

      addPosts: (newPosts) => {
        const { posts, userLikes } = get()
        const existingIds = new Set(posts.map((p) => p.id))
        const uniquePosts = newPosts.filter((p) => !existingIds.has(p.id))
        set({
          posts: [
            ...posts,
            ...uniquePosts.map((post) => ({
              ...post,
              likesCount: post.likesCount || 0,
              isLiked: userLikes.includes(post.id),
            })),
          ],
        })
      },

      addPost: (post) => {
        const { posts } = get()
        set({
          posts: [
            {
              ...post,
              likesCount: post.likesCount ?? 0,
              isLiked: false,
            },
            ...posts,
          ],
        })
      },

      removePost: (postId) => {
        const { userLikes } = get()
        set({
          posts: get().posts.filter((p) => p.id !== postId),
          userLikes: userLikes.filter((id) => id !== postId),
        })
      },

      updatePost: (postId, data) => {
        set({
          posts: get().posts.map((p) =>
            p.id === postId ? { ...p, ...data } : p,
          ),
        })
      },

      toggleLike: (postId) => {
        const { userLikes } = get()
        const isLiked = userLikes.includes(postId)

        set({
          userLikes: isLiked
            ? userLikes.filter((id) => id !== postId)
            : [...userLikes, postId],
          posts: get().posts.map((p) =>
            p.id === postId
              ? {
                  ...p,
                  isLiked: !isLiked,
                  likesCount: isLiked ? p.likesCount - 1 : p.likesCount + 1,
                }
              : p,
          ),
        })
      },

      getPost: (postId) => get().posts.find((p) => p.id === postId),

      isLiked: (postId) => get().userLikes.includes(postId),
    }),
    {
      name: "posts-store",
      partialize: (state) => ({ userLikes: state.userLikes }),
    },
  ),
)
