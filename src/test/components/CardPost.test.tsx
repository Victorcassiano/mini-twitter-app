import { fireEvent, render, screen } from "@testing-library/react"
import { beforeEach, describe, expect, it, vi } from "vitest"
import CardPost from "@/components/Home/CardPost"
import type { Post } from "@/http/types/posts"

const mockPost: Post = {
  id: 1,
  title: "Test Post Title",
  content: "This is a test post with #hashtag",
  image: "",
  authorId: 1,
  authorName: "John Doe",
  createdAt: "2024-01-01T12:00:00.000Z",
  likesCount: 5,
  isLiked: false,
}

vi.mock("@/lib/storage", () => ({
  isAuthenticated: vi.fn(() => true),
}))

vi.mock("@/lib/store/posts", () => ({
  usePostsStore: vi.fn(() => ({
    toggleLike: vi.fn(),
  })),
}))

vi.mock("@/http/hooks/posts", () => ({
  useLikePost: () => ({
    mutate: vi.fn(),
  }),
}))

vi.mock("@/components/Home/CardPost/PopupOptionsCard", () => ({
  PopupOptionsCard: vi.fn(() => null),
}))

vi.mock("@/components/Home/CardPost/HoverUser", () => ({
  HoverUser: ({ children }: { children: React.ReactNode }) => children,
}))

describe("CardPost", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("should render post title", () => {
    render(<CardPost post={mockPost} />)
    expect(screen.getByText("Test Post Title")).toBeInTheDocument()
  })

  it("should render post content", () => {
    render(<CardPost post={mockPost} />)
    expect(
      screen.getByText("This is a test post with #hashtag"),
    ).toBeInTheDocument()
  })

  it("should render author name", () => {
    render(<CardPost post={mockPost} />)
    expect(screen.getByText("John Doe")).toBeInTheDocument()
  })

  it("should render likes count", () => {
    render(<CardPost post={mockPost} />)
    expect(screen.getByText("5")).toBeInTheDocument()
  })

  it("should render like button", () => {
    render(<CardPost post={mockPost} />)
    expect(screen.getByRole("button")).toBeInTheDocument()
  })

  it("should call toggleLike when like button is clicked", () => {
    const toggleLikeMock = vi.fn()
    vi.mocked(require("@/lib/store/posts")).usePostsStore.mockReturnValue({
      toggleLike: toggleLikeMock,
    } as never)

    render(<CardPost post={mockPost} />)

    const likeButton = screen.getByRole("button")
    fireEvent.click(likeButton)

    expect(toggleLikeMock).toHaveBeenCalledWith(1)
  })

  it("should render hashtag with proper styling", () => {
    render(<CardPost post={mockPost} />)
    expect(screen.getByText("#hashtag")).toBeInTheDocument()
  })
})
