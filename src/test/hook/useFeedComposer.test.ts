import { renderHook } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { useFeedComposer } from "@/http/hooks/feed/useFeedComposer"

const mockCreateMutateAsync = vi.fn()
const mockEditMutateAsync = vi.fn()
const mockOnSuccess = vi.fn()

vi.mock("@/http/hooks/posts/useCreatePost", () => ({
  useCreatePost: () => ({
    mutateAsync: mockCreateMutateAsync,
  }),
}))

vi.mock("@/http/hooks/posts/useEditPost", () => ({
  useEditPost: () => ({
    mutateAsync: mockEditMutateAsync,
  }),
}))

vi.mock("@/lib/upload-image", () => ({
  uploadImage: vi.fn().mockResolvedValue("https://example.com/image.jpg"),
  deleteImage: vi.fn().mockResolvedValue({ success: true }),
}))

describe("useFeedComposer", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("should return isEditing as false when no post provided", () => {
    const { result } = renderHook(() => useFeedComposer({}))

    expect(result.current.isEditing).toBe(false)
  })

  it("should return isEditing as true when post provided", () => {
    const mockPost = {
      id: 1,
      title: "Test",
      content: "Content",
      image: "",
      authorId: 1,
      createdAt: "2024-01-01",
      authorName: "User",
      likesCount: 0,
    }

    const { result } = renderHook(() => useFeedComposer({ post: mockPost }))

    expect(result.current.isEditing).toBe(true)
  })

  it("should call create mutation for new post without image", async () => {
    const { result } = renderHook(() =>
      useFeedComposer({ onSuccess: mockOnSuccess }),
    )

    const data = { title: "New Post", content: "Content" }
    const clear = vi.fn()
    const reset = vi.fn()

    await result.current.handleSubmit(data, null, false, clear, reset)

    expect(mockCreateMutateAsync).toHaveBeenCalledWith({
      title: "New Post",
      content: "Content",
      image: "",
    })
    expect(mockOnSuccess).toHaveBeenCalled()
    expect(clear).toHaveBeenCalled()
    expect(reset).toHaveBeenCalled()
  })

  it("should upload image when creating new post with file", async () => {
    const { result } = renderHook(() =>
      useFeedComposer({ onSuccess: mockOnSuccess }),
    )

    const data = { title: "New Post", content: "Content" }
    const mockFile = new File(["content"], "test.jpg", { type: "image/jpeg" })
    const clear = vi.fn()
    const reset = vi.fn()

    await result.current.handleSubmit(data, mockFile, false, clear, reset)

    expect(mockCreateMutateAsync).toHaveBeenCalledWith({
      title: "New Post",
      content: "Content",
      image: "https://example.com/image.jpg",
    })
  })

  it("should call edit mutation for existing post", async () => {
    const mockPost = {
      id: 1,
      title: "Old Title",
      content: "Old Content",
      image: "",
      authorId: 1,
      createdAt: "2024-01-01",
      authorName: "User",
      likesCount: 0,
    }

    const { result } = renderHook(() =>
      useFeedComposer({ post: mockPost, onSuccess: mockOnSuccess }),
    )

    const data = { title: "New Title", content: "New Content" }
    const clear = vi.fn()
    const reset = vi.fn()

    await result.current.handleSubmit(data, null, false, clear, reset)

    expect(mockEditMutateAsync).toHaveBeenCalledWith({
      id: 1,
      data: { title: "New Title", content: "New Content", image: "" },
      originalPost: mockPost,
    })
  })

  it("should keep existing image when editing without new image", async () => {
    const mockPost = {
      id: 1,
      title: "Old Title",
      content: "Old Content",
      image: "https://example.com/old.jpg",
      authorId: 1,
      createdAt: "2024-01-01",
      authorName: "User",
      likesCount: 0,
    }

    const { result } = renderHook(() =>
      useFeedComposer({ post: mockPost, onSuccess: mockOnSuccess }),
    )

    const data = { title: "New Title", content: "New Content" }
    const clear = vi.fn()
    const reset = vi.fn()

    await result.current.handleSubmit(data, null, true, clear, reset)

    expect(mockEditMutateAsync).toHaveBeenCalledWith({
      id: 1,
      data: {
        title: "New Title",
        content: "New Content",
        image: "https://example.com/old.jpg",
      },
      originalPost: mockPost,
    })
  })
})
