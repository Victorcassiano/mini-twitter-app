"use client"
import { Heart } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useLikePost } from "@/http/hooks/posts"
import { Post } from "@/http/types/posts"
import { isAuthenticated } from "@/lib/storage"
import { usePostsStore } from "@/lib/store/posts"
import { cn } from "@/lib/utils"
import { formatDateTimeBR, formatName } from "@/utils/formats"
import { highlightHashtags } from "@/utils/render-highlight-hashtags"
import { HoverUser } from "./HoverUser"
import { PopupOptionsCard } from "./PopupOptionsCard"

type CardPostProps = {
  post: Omit<Post, "image"> & { image: string | null }
}

export default function CardPost({ post }: CardPostProps) {
  const isAuth = isAuthenticated()
  const { mutate } = useLikePost()
  const { id, authorName, content, createdAt, image, title } = post

  const toggleLike = usePostsStore((s) => s.toggleLike)

  const handleLike = () => {
    toggleLike(id)

    mutate(
      { id },
      {
        onError: () => {
          toggleLike(id)
        },
      },
    )
  }

  return (
    <Card className="relative rounded-2xl border shadow-sm p-0">
      {isAuth && <PopupOptionsCard post={post} />}
      <CardContent className="p-5 space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <HoverUser username={authorName}>
            <span className="font-semibold text-foreground">{authorName}</span>
            <span>@{formatName(authorName)}</span>
          </HoverUser>
          <span>·</span>
          <span>{formatDateTimeBR(createdAt)}</span>
        </div>

        <h2 className="text-lg font-semibold text-foreground">{title}</h2>

        <p
          className="text-sm text-muted-foreground leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: highlightHashtags(content),
          }}
        />

        {image && (
          <div className="rounded-xl overflow-hidden border">
            <Image
              src={image}
              alt="post"
              width={500}
              height={500}
              className="w-full object-cover"
            />
          </div>
        )}

        <Button
          variant="ghost"
          className="group flex items-center gap-2 text-muted-foreground p-0 hover:bg-transparent"
          onClick={handleLike}
        >
          <HugeiconsIcon
            icon={Heart}
            className={cn(
              "size-5",
              post.isLiked
                ? "text-red-500 fill-red-500"
                : "text-gray-400 fill-transparent",
            )}
          />
          <span className="text-base">{post.likesCount}</span>
        </Button>
      </CardContent>
    </Card>
  )
}
