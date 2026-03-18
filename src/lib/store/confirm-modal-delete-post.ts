import { create } from "zustand"

type ConfirmDeletePostStore = {
  postId: number | undefined
  setPostId: (postId: number | undefined) => void
}

export const useConfirmDeletePostModal = create<ConfirmDeletePostStore>()(
  (set) => ({
    postId: undefined,
    setPostId: (postId) => set({ postId }),
  }),
)
