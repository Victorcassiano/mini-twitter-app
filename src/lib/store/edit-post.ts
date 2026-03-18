import { create } from "zustand"
import { Post } from "@/http/types/posts"

type StoreProps = {
  value: Post | undefined
  set: (value: Post | undefined) => void
}

export const useStoreEditPost = create<StoreProps>()((set) => ({
  value: undefined,
  set: (value) => set({ value }),
}))
