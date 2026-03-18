"use client"

import { useEffect, useRef } from "react"

interface Props {
  onIntersect: () => void
  isFetchingNextPage: boolean
}

export function InfiniteScrollSentinel({
  onIntersect,
  isFetchingNextPage,
}: Props) {
  const sentinelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetchingNextPage) {
          onIntersect()
        }
      },
      { rootMargin: "100px" },
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [onIntersect, isFetchingNextPage])

  return <div ref={sentinelRef} className="h-4" suppressHydrationWarning />
}
