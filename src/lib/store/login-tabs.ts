import { create } from "zustand"

type StoreProps = {
  valueTab: string
  setTab: (valueTab: string | undefined) => void
}

export const useStoreLoginTabs = create<StoreProps>()((set) => ({
  valueTab: "login",
  setTab: (valueTab) => set({ valueTab }),
}))
