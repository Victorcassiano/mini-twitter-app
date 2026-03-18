import { create } from "zustand"
import { Post } from "@/http/types/posts"

type StoreProps = {
  value: Post | null
  set: (value: Post | null) => void
}

export const useStoreEditPost = create<StoreProps>()((set) => ({
  value: null,
  set: (value) => set({ value }),
}))
