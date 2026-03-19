import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { formatName } from "@/utils/formats"

export function HoverUser({
  children,
  username,
}: {
  children: React.ReactNode
  username: string
}) {
  return (
    <HoverCard>
      <HoverCardTrigger
        delay={200}
        closeDelay={200}
        className="space-x-2 hover:cursor-pointer"
      >
        {children}
      </HoverCardTrigger>
      <HoverCardContent side="top" className="relative">
        <Button
          variant="outline"
          className="absolute inset-y-0 right-3 top-3 border-primary text-primary"
        >
          Seguir
        </Button>
        <div className="flex flex-row items-center gap-2">
          <Avatar>
            <AvatarImage src="/logo-twitter.png" />
            <AvatarFallback>T</AvatarFallback>
          </Avatar>
          <h2>{username}</h2>
        </div>
        <h2 className="mt-5">@{formatName(username)}</h2>
      </HoverCardContent>
    </HoverCard>
  )
}
