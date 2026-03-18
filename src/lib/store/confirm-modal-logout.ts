import { create } from "zustand"

type ConfirmLogoutModalStore = {
  isOpenModalLogout: boolean
  toggle: () => void
}

export const useConfirmLogoutModal = create<ConfirmLogoutModalStore>()(
  (set) => ({
    isOpenModalLogout: false,
    toggle: () =>
      set((state) => ({
        isOpenModalLogout: !state.isOpenModalLogout,
      })),
  }),
)
