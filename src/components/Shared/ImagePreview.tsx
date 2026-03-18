import { X } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function ImagePreview({
  src,
  onRemove,
}: {
  src: string
  onRemove: () => void
}) {
  return (
    <div className="relative size-max">
      <Image src={src} alt="Preview" width={200} height={200} />
      <Button
        type="button"
        variant="destructive"
        size="icon"
        className="absolute -top-5 -right-5 rounded-full"
        onClick={onRemove}
      >
        <HugeiconsIcon icon={X} />
      </Button>
    </div>
  )
}
