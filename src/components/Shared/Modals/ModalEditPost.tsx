import { FeedComposer } from "@/components/Home/FeedComposer"
import Modal from "@/components/ui/modal"
import { useStoreEditPost } from "@/lib/store/edit-post"

export const ModalEditPost = () => {
  const { value, set } = useStoreEditPost()

  const onClose = () => {
    set(null)
  }

  return (
    <Modal
      title="Editar post"
      visible={!!value}
      onClose={onClose}
      className="w-4xl"
    >
      <FeedComposer post={value} onSuccess={onClose} />
    </Modal>
  )
}
