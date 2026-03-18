"use client"
import { Logout } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Button } from "@/components/ui/button"
import { useConfirmLogoutModal } from "@/lib/store/confirm-modal-logout"
import { ModalConfirmLogout } from "../../Modals/ModalConfirmLogout"

export default function ButtonLogout() {
  const { toggle } = useConfirmLogoutModal()

  return (
    <div className="flex justify-end">
      <Button
        variant="round"
        size="icon-lg"
        className="size-10 rotate-180"
        onClick={toggle}
      >
        <HugeiconsIcon icon={Logout} className="size-4 dark:text-white" />
      </Button>
      <ModalConfirmLogout />
    </div>
  )
}
