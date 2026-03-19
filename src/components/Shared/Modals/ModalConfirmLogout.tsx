import { SecurityWarningFreeIcons } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Button } from "@/components/ui/button"
import Modal from "@/components/ui/modal"
import { useLogout } from "@/http/hooks/auth"
import { useConfirmLogoutModal } from "@/lib/store/confirm-modal-logout"

export const ModalConfirmLogout = () => {
  const { mutate } = useLogout()
  const { toggle, isOpenModalLogout } = useConfirmLogoutModal()

  const handleLogout = () => {
    mutate(undefined, {
      onSettled: () => {
        toggle()

        setTimeout(() => {
          window.location.reload()
        }, 600)
      },
    })
  }

  return (
    <Modal
      title="Sair da conta?"
      visible={Boolean(isOpenModalLogout)}
      onClose={toggle}
      footer={
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end [&>button]:px-6 [&>button]:h-10 [&>button]:rounded-full [&>button]:text-sm [&>button]:transition-all [&>button]:duration-500">
          <Button
            variant="outline"
            onClick={toggle}
            className="hover:text-primary hover:border-primary/90"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleLogout}
            className="text-white bg-destructive hover:bg-destructive/80 font-medium shadow-[0px_6px_20px_-7px_var(--destructive)] border-0 disabled:opacity-50"
          >
            Sair
          </Button>
        </div>
      }
    >
      <div className="flex flex-col items-center gap-4 py-4 text-center">
        <HugeiconsIcon
          icon={SecurityWarningFreeIcons}
          size={48}
          className="text-red-500"
        />
        <p className="text-gray-600">
          Tem certeza que deseja sair? Você precisará fazer login novamente para
          acessar sua conta.
        </p>
      </div>
    </Modal>
  )
}
