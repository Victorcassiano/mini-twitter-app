import z from "zod"
import { feedSchema } from "@/http/schemas/posts"

export type CreatePostInput = {
  title: string
  content: string
  image?: string
}

export type GetPostsParams = {
  page?: string
  search?: string
}

export type Post = {
  id: number
  title: string
  content: string
  image: string
  authorId: number
  createdAt: string
  authorName: string
  likesCount: number
  isLiked?: boolean
}

export type FeedFormInput = z.input<typeof feedSchema>
export type FeedFormOutput = z.output<typeof feedSchema>

export type GetPosts = {
  limit: number
  page: number
  posts: Post[]
  total: number
}

export type DeletePostParams = {
  id: number
}

export type LikePostParams = {
  id: number
}
