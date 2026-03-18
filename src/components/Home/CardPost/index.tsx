"use client"
import { Heart } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useLikePost } from "@/http/hooks/posts"
import { formatDateTimeBR, formatName } from "@/lib/formats"
import { isAuthenticated } from "@/lib/storage"
import { cn } from "@/lib/utils"
import { PopupOptionsCard } from "./PopupOptionsCard"

type CardPostProps = {
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

export default function CardPost({ post }: CardPostProps) {
  const isAuth = isAuthenticated()
  const { id, authorName, content, createdAt, image, likesCount, title } = post

  const { mutate } = useLikePost()

  return (
    <Card className="relative rounded-2xl border shadow-sm p-0">
      {isAuth && <PopupOptionsCard post={post} />}
      <CardContent className="p-5 space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{authorName}</span>
          <span>@{formatName(authorName)}</span>
          <span>·</span>
          <span>{formatDateTimeBR(createdAt)}</span>
        </div>

        <h2 className="text-lg font-semibold text-foreground">{title}</h2>

        <p className="text-sm text-muted-foreground leading-relaxed">
          {content}
        </p>

        {image && (
          <div className="rounded-xl overflow-hidden border">
            <Image
              src={image}
              alt="post"
              className="w-full h-56 object-cover"
            />
          </div>
        )}

        <Button
          variant="ghost"
          className="group flex items-center gap-2 text-muted-foreground p-0 hover:bg-transparent"
          onClick={() => mutate({ id })}
        >
          <HugeiconsIcon
            icon={Heart}
            className={cn(
              "size-5 transition-colors",
              "text-red-500 fill-red-500",
              "group-hover:text-red-500",
            )}
          />
          <span className="text-base">{likesCount}</span>
        </Button>
      </CardContent>
    </Card>
  )
}
