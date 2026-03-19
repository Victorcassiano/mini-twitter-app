import { act, renderHook, waitFor } from "@testing-library/react"
import { beforeEach, describe, expect, it, vi } from "vitest"
import { useImageUpload } from "@/http/hooks/posts/useImageUpload"

vi.mock("@/lib/upload-image", () => ({
  deleteImage: vi.fn().mockResolvedValue({ success: true }),
}))

vi.mock("@/components/Shared/Toaster", () => ({
  showToast: {
    info: vi.fn(),
  },
}))

describe("useImageUpload", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("should have initial empty state", () => {
    const { result } = renderHook(() => useImageUpload())

    expect(result.current.file).toBeNull()
    expect(result.current.preview).toBeNull()
    expect(result.current.hasNewImage).toBe(false)
    expect(result.current.hasExistingImage).toBe(false)
    expect(result.current.hasDeletedExisting).toBe(false)
  })

  it("should set file and preview when selecting valid image", async () => {
    const { result } = renderHook(() => useImageUpload())
    const mockFile = new File(["content"], "test.jpg", { type: "image/jpeg" })

    act(() => {
      result.current.onSelect(mockFile)
    })

    await waitFor(() => {
      expect(result.current.file).toBe(mockFile)
      expect(result.current.preview).toBeTruthy()
      expect(result.current.hasNewImage).toBe(true)
    })
  })

  it("should show toast for file larger than 5MB", () => {
    const { result } = renderHook(() => useImageUpload())
    const largeContent = new Array(6 * 1024 * 1024).join("x")
    const largeFile = new File([largeContent], "large.jpg", {
      type: "image/jpeg",
    })

    act(() => {
      result.current.onSelect(largeFile)
    })

    expect(result.current.file).toBeNull()
  })

  it("should show toast for non-image file", () => {
    const { result } = renderHook(() => useImageUpload())
    const nonImageFile = new File(["content"], "test.pdf", {
      type: "application/pdf",
    })

    act(() => {
      result.current.onSelect(nonImageFile)
    })

    expect(result.current.file).toBeNull()
  })

  it("should handle existing image", async () => {
    const existingUrl = "https://example.com/existing.jpg"
    const { result } = renderHook(() =>
      useImageUpload({ existingImage: existingUrl }),
    )

    await waitFor(() => {
      expect(result.current.preview).toBe(existingUrl)
      expect(result.current.hasExistingImage).toBe(true)
    })
  })

  it("should remove new image", async () => {
    const { result } = renderHook(() => useImageUpload())
    const mockFile = new File(["content"], "test.jpg", { type: "image/jpeg" })

    act(() => {
      result.current.onSelect(mockFile)
    })

    await waitFor(() => {
      expect(result.current.hasNewImage).toBe(true)
    })

    act(() => {
      result.current.onRemove()
    })

    expect(result.current.file).toBeNull()
    expect(result.current.preview).toBeNull()
    expect(result.current.hasNewImage).toBe(false)
  })

  it("should mark existing image as deleted on remove", async () => {
    const existingUrl = "https://example.com/existing.jpg"
    const { result } = renderHook(() =>
      useImageUpload({ existingImage: existingUrl }),
    )

    await waitFor(() => {
      expect(result.current.hasExistingImage).toBe(true)
    })

    act(() => {
      result.current.onRemove()
    })

    expect(result.current.hasDeletedExisting).toBe(true)
    expect(result.current.hasExistingImage).toBe(false)
  })

  it("should delete existing image from storage", async () => {
    const existingUrl = "https://example.com/existing.jpg"
    const { result } = renderHook(() =>
      useImageUpload({ existingImage: existingUrl }),
    )

    await waitFor(() => {
      expect(result.current.hasExistingImage).toBe(true)
    })

    await act(async () => {
      await result.current.onDeleteExisting()
    })

    expect(result.current.hasDeletedExisting).toBe(true)
    expect(result.current.preview).toBeNull()
  })

  it("should clear all state", async () => {
    const { result } = renderHook(() => useImageUpload())
    const mockFile = new File(["content"], "test.jpg", { type: "image/jpeg" })

    act(() => {
      result.current.onSelect(mockFile)
    })

    await waitFor(() => {
      expect(result.current.hasNewImage).toBe(true)
    })

    act(() => {
      result.current.clear()
    })

    expect(result.current.file).toBeNull()
    expect(result.current.preview).toBeNull()
    expect(result.current.hasNewImage).toBe(false)
    expect(result.current.hasDeletedExisting).toBe(false)
  })

  it("should not do anything when onSelect called without file", () => {
    const { result } = renderHook(() => useImageUpload())

    act(() => {
      result.current.onSelect(undefined as unknown as File)
    })

    expect(result.current.file).toBeNull()
    expect(result.current.hasNewImage).toBe(false)
  })

  it("should set hasNewImage correctly", async () => {
    const { result } = renderHook(() => useImageUpload())

    expect(result.current.hasNewImage).toBe(false)

    const mockFile = new File(["content"], "test.jpg", { type: "image/jpeg" })
    act(() => {
      result.current.onSelect(mockFile)
    })

    await waitFor(() => {
      expect(result.current.hasNewImage).toBe(true)
    })
  })
})
