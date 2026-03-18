import {
  Edit02Icon,
  MoreVerticalIcon,
  Trash2,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useConfirmDeletePostModal } from "@/lib/store/confirm-modal-delete-post"
import { useStoreEditPost } from "@/lib/store/edit-post"

type PopupOptionsCardProps = {
  post: {
    id: number
    authorId: number
    authorName: string
    content: string
    createdAt: string
    image: string
    likesCount: number
    title: string
  }
}

export function PopupOptionsCard({ post }: PopupOptionsCardProps) {
  const { id } = post
  const { setPostId } = useConfirmDeletePostModal()
  const { set: setEdit } = useStoreEditPost()

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant={"ghost"}
            className="absolute size-8 right-2 top-2 rounded-xl"
          >
            <HugeiconsIcon icon={MoreVerticalIcon} />
          </Button>
        }
      />
      <PopoverContent className="w-32 gap-1">
        <Button
          variant={"ghost"}
          className="flex items-center justify-between"
          onClick={() => setPostId(id)}
        >
          Deletar
          <HugeiconsIcon icon={Trash2} className="text-red-500" />
        </Button>
        <Button
          variant={"ghost"}
          className="flex items-center justify-between"
          onClick={() => setEdit(post)}
        >
          Editar
          <HugeiconsIcon icon={Edit02Icon} className="text-blue-500" />
        </Button>
      </PopoverContent>
    </Popover>
  )
}
