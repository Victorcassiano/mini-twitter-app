"use client"
import { X } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import dynamic from "next/dynamic"
import { ReactNode } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

type Props = {
  title: string
  visible: boolean
  onClose?: () => void
  children?: ReactNode
  footer?: ReactNode
  className?: string
}

const Modal = ({
  title,
  visible,
  onClose,
  children,
  footer,
  className,
}: Props) => {
  return (
    <Dialog open={visible} onOpenChange={onClose}>
      <DialogContent
        className={cn(
          "max-h-[calc(100vh-84px)] w-lg max-w-[95vw] overflow-y-auto rounded-md p-0 lg:max-w-7xl",
          className,
        )}
      >
        <DialogHeader className="sticky left-0 right-0 top-0 z-20 w-full flex-row items-center justify-between border-b border-solid border-gray-200 dark:border-card/60 bg-white dark:bg-card p-6">
          <DialogTitle className="h-fit">{title}</DialogTitle>
          {onClose && (
            <Button
              variant={"ghost"}
              className="h-fit w-fit p-0!"
              onClick={onClose}
            >
              <HugeiconsIcon icon={X} size={18} />
            </Button>
          )}
        </DialogHeader>
        <div className="w-full px-4 [&>div>p]:dark:text-white">{children}</div>
        <DialogFooter className="px-4 py-2">{footer}</DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default dynamic(() => Promise.resolve(Modal), { ssr: false })
