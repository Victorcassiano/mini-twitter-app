import { act, renderHook } from "@testing-library/react"
import { beforeEach, describe, expect, it, vi } from "vitest"
import type { Post } from "@/http/types/posts"
import { usePostsStore } from "@/lib/store/posts"

const mockPost: Post = {
  id: 1,
  title: "Test Post",
  content: "Test content",
  image: "",
  authorId: 1,
  authorName: "Test User",
  createdAt: "2024-01-01T00:00:00.000Z",
  likesCount: 5,
  isLiked: false,
}

describe("usePostsStore", () => {
  beforeEach(() => {
    const { result } = renderHook(() => usePostsStore())
    act(() => {
      result.current.posts = []
      result.current.userLikes = []
    })
    vi.clearAllMocks()
  })

  it("should add a post", () => {
    const { result } = renderHook(() => usePostsStore())

    act(() => {
      result.current.addPost(mockPost)
    })

    expect(result.current.posts).toHaveLength(1)
    expect(result.current.posts[0]).toMatchObject({
      id: mockPost.id,
      title: mockPost.title,
      content: mockPost.content,
      likesCount: 5,
      isLiked: false,
    })
  })

  it("should add post at the beginning of the list", () => {
    const { result } = renderHook(() => usePostsStore())

    const post1 = { ...mockPost, id: 1, title: "First" }
    const post2 = { ...mockPost, id: 2, title: "Second" }

    act(() => {
      result.current.addPost(post1)
      result.current.addPost(post2)
    })

    expect(result.current.posts[0].id).toBe(2)
    expect(result.current.posts[1].id).toBe(1)
  })

  it("should update an existing post", () => {
    const { result } = renderHook(() => usePostsStore())

    act(() => {
      result.current.addPost(mockPost)
    })

    act(() => {
      result.current.updatePost(1, {
        title: "Updated Title",
        content: "Updated content",
      })
    })

    expect(result.current.posts[0].title).toBe("Updated Title")
    expect(result.current.posts[0].content).toBe("Updated content")
  })

  it("should not update non-existent post", () => {
    const { result } = renderHook(() => usePostsStore())

    act(() => {
      result.current.addPost(mockPost)
    })

    act(() => {
      result.current.updatePost(999, { title: "Hacked" })
    })

    expect(result.current.posts[0].title).toBe(mockPost.title)
  })

  it("should remove a post", () => {
    const { result } = renderHook(() => usePostsStore())

    act(() => {
      result.current.addPost(mockPost)
    })

    expect(result.current.posts).toHaveLength(1)

    act(() => {
      result.current.removePost(1)
    })

    expect(result.current.posts).toHaveLength(0)
  })

  it("should remove post from userLikes when deleted", () => {
    const { result } = renderHook(() => usePostsStore())

    act(() => {
      result.current.addPost(mockPost)
      result.current.toggleLike(1)
    })

    expect(result.current.userLikes).toContain(1)

    act(() => {
      result.current.removePost(1)
    })

    expect(result.current.userLikes).not.toContain(1)
  })

  it("should toggle like - add like", () => {
    const { result } = renderHook(() => usePostsStore())

    act(() => {
      result.current.addPost(mockPost)
    })

    expect(result.current.posts[0].likesCount).toBe(5)
    expect(result.current.posts[0].isLiked).toBe(false)

    act(() => {
      result.current.toggleLike(1)
    })

    expect(result.current.userLikes).toContain(1)
    expect(result.current.posts[0].likesCount).toBe(6)
    expect(result.current.posts[0].isLiked).toBe(true)
  })

  it("should toggle like - remove like (unlike)", () => {
    const { result } = renderHook(() => usePostsStore())

    act(() => {
      result.current.addPost(mockPost)
      result.current.toggleLike(1)
    })

    expect(result.current.posts[0].likesCount).toBe(6)

    act(() => {
      result.current.toggleLike(1)
    })

    expect(result.current.userLikes).not.toContain(1)
    expect(result.current.posts[0].likesCount).toBe(5)
    expect(result.current.posts[0].isLiked).toBe(false)
  })

  it("should set posts with isLiked based on userLikes", () => {
    const { result } = renderHook(() => usePostsStore())

    act(() => {
      result.current.toggleLike(1)
    })

    const posts = [
      { ...mockPost, id: 1 },
      { ...mockPost, id: 2 },
    ]

    act(() => {
      result.current.setPosts(posts)
    })

    expect(result.current.posts[0].isLiked).toBe(true)
    expect(result.current.posts[1].isLiked).toBe(false)
  })

  it("should add posts without duplicates", () => {
    const { result } = renderHook(() => usePostsStore())

    const posts = [
      { ...mockPost, id: 1 },
      { ...mockPost, id: 2 },
    ]

    act(() => {
      result.current.addPosts(posts)
    })

    expect(result.current.posts).toHaveLength(2)

    const morePosts = [
      { ...mockPost, id: 2 },
      { ...mockPost, id: 3 },
    ]

    act(() => {
      result.current.addPosts(morePosts)
    })

    expect(result.current.posts).toHaveLength(3)
    expect(result.current.posts.find((p) => p.id === 2)).toBeDefined()
  })

  it("should get a post by id", () => {
    const { result } = renderHook(() => usePostsStore())

    act(() => {
      result.current.addPost(mockPost)
    })

    const post = result.current.getPost(1)

    expect(post).toBeDefined()
    expect(post?.id).toBe(1)
  })

  it("should return undefined for non-existent post", () => {
    const { result } = renderHook(() => usePostsStore())

    const post = result.current.getPost(999)

    expect(post).toBeUndefined()
  })

  it("should check if post is liked", () => {
    const { result } = renderHook(() => usePostsStore())

    expect(result.current.isLiked(1)).toBe(false)

    act(() => {
      result.current.toggleLike(1)
    })

    expect(result.current.isLiked(1)).toBe(true)
  })
})
