import { FileNotFoundIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { ClassValue } from "clsx"
import { useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"

interface Props {
  className?: ClassValue
}

export function EmptyState({ className }: Props) {
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get("search")

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 py-12 text-center",
        className,
      )}
    >
      <HugeiconsIcon
        icon={FileNotFoundIcon}
        size={48}
        className="text-muted-foreground"
      />

      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-muted-foreground/70">
          '{searchQuery}' não encontado!
        </h3>
      </div>
    </div>
  )
}
