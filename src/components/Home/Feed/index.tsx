"use client"

import dynamic from "next/dynamic"
import { EmptyState } from "@/components/Shared/EmptyState"
import { Loader } from "@/components/Shared/Loader"
import { ModalConfirmDeletePost } from "@/components/Shared/Modals/ModalConfirmDeletePost"
import { ModalEditPost } from "@/components/Shared/Modals/ModalEditPost"
import { useGetPosts } from "@/http/hooks/posts"
import { useStoreEditPost } from "@/lib/store/edit-post"
import CardPost from "../CardPost"
import { InfiniteScrollSentinel } from "../InfiniteScrollSentinel"

function FeedCompopnent() {
  const { value } = useStoreEditPost()
  const { posts, fetchNextPage, isFetchingNextPage, isLoading, isFetching } =
    useGetPosts()

  if (isLoading || isFetching) return <Loader />

  if (posts.length === 0 && !isLoading) {
    return <EmptyState />
  }

  return (
    <section className="my-5 space-y-5">
      {posts.map((item) => (
        <CardPost key={item.id} post={item} />
      ))}

      <InfiniteScrollSentinel
        onIntersect={fetchNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />

      <ModalConfirmDeletePost />

      {value && <ModalEditPost />}
    </section>
  )
}

export const Feed = dynamic(() => Promise.resolve(FeedCompopnent), {
  ssr: false,
})
