"use client"

import dynamic from "next/dynamic"
import { Feed } from "@/components/Home/Feed"
import { FeedComposer } from "@/components/Home/FeedComposer"
import { isAuthenticated } from "@/lib/storage"

function Page() {
  const isAuth = isAuthenticated()

  return (
    <div className="mx-auto w-3xl gap-5">
      {isAuth && <FeedComposer />}

      <Feed />
    </div>
  )
}

export default dynamic(() => Promise.resolve(Page), {
  ssr: false,
})
