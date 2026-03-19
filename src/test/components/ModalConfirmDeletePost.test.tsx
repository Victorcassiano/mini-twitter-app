import { fireEvent, render, screen } from "@testing-library/react"
import { beforeEach, describe, expect, it, vi } from "vitest"
import { ModalConfirmDeletePost } from "@/components/Shared/Modals/ModalConfirmDeletePost"

const mockMutate = vi.fn()
const mockSetPostId = vi.fn()

vi.mock("@/lib/store/confirm-modal-delete-post", () => ({
  useConfirmDeletePostModal: vi.fn(() => ({
    postId: 1,
    setPostId: mockSetPostId,
  })),
}))

vi.mock("@/http/hooks/posts", () => ({
  useDeletePost: () => ({
    mutate: mockMutate,
  }),
}))

describe("ModalConfirmDeletePost", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("should render modal title", () => {
    render(<ModalConfirmDeletePost />)

    expect(screen.getByText("Excluir post?")).toBeInTheDocument()
  })

  it("should render warning message", () => {
    render(<ModalConfirmDeletePost />)

    expect(
      screen.getByText(/Tem certeza que deseja excluir este post?/i),
    ).toBeInTheDocument()
  })

  it("should render cancel button", () => {
    render(<ModalConfirmDeletePost />)

    expect(
      screen.getByRole("button", { name: /cancelar/i }),
    ).toBeInTheDocument()
  })

  it("should render delete button", () => {
    render(<ModalConfirmDeletePost />)

    expect(screen.getByRole("button", { name: /excluir/i })).toBeInTheDocument()
  })

  it("should call onClose when cancel button is clicked", () => {
    render(<ModalConfirmDeletePost />)

    const cancelButton = screen.getByRole("button", { name: /cancelar/i })
    fireEvent.click(cancelButton)

    expect(mockSetPostId).toHaveBeenCalledWith(undefined)
  })

  it("should call mutate with post id when delete button is clicked", () => {
    render(<ModalConfirmDeletePost />)

    const deleteButton = screen.getByRole("button", { name: /excluir/i })
    fireEvent.click(deleteButton)

    expect(mockMutate).toHaveBeenCalledWith(
      { id: 1 },
      expect.objectContaining({
        onSettled: expect.any(Function),
      }),
    )
  })

  it("should close modal after delete", () => {
    mockMutate.mockImplementation((_, options) => {
      options?.onSettled?.()
    })

    render(<ModalConfirmDeletePost />)

    const deleteButton = screen.getByRole("button", { name: /excluir/i })
    fireEvent.click(deleteButton)

    expect(mockSetPostId).toHaveBeenCalledWith(undefined)
  })

  it("should render trash icon", () => {
    render(<ModalConfirmDeletePost />)

    const trashIcon = document.querySelector("[data-hugeicons]")
    expect(trashIcon).toBeTruthy()
  })
})
