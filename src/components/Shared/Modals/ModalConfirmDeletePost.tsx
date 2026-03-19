import { Trash2 } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Button } from "@/components/ui/button"
import Modal from "@/components/ui/modal"
import { useDeletePost } from "@/http/hooks/posts"
import { useConfirmDeletePostModal } from "@/lib/store/confirm-modal-delete-post"

export const ModalConfirmDeletePost = () => {
  const { postId, setPostId } = useConfirmDeletePostModal()
  const { mutate } = useDeletePost()

  const handleDelete = () => {
    mutate(
      { id: postId! },
      {
        onSettled: () => onClose(),
      },
    )
  }

  const onClose = () => {
    setPostId(undefined)
  }

  return (
    <Modal
      title="Excluir post?"
      visible={Boolean(postId)}
      onClose={onClose}
      footer={
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end [&>button]:px-6 [&>button]:h-10 [&>button]:rounded-full [&>button]:text-sm [&>button]:transition-all [&>button]:duration-500">
          <Button
            variant="outline"
            onClick={onClose}
            className="hover:text-primary hover:border-primary/90"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleDelete}
            className="text-white bg-destructive hover:bg-destructive/80 font-medium shadow-[0px_6px_20px_-7px_var(--destructive)] border-0 disabled:opacity-50"
          >
            Excluir
          </Button>
        </div>
      }
    >
      <div className="flex flex-col items-center gap-4 py-4 text-center">
        <HugeiconsIcon icon={Trash2} size={48} className="text-red-500" />
        <p className="text-gray-600">
          Tem certeza que deseja excluir este post? Esta ação não pode ser
          desfeita.
        </p>
      </div>
    </Modal>
  )
}
