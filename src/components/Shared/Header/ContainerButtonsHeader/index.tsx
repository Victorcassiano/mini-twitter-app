"use client"
import { isAuthenticated } from "@/lib/storage"
import ButtonLogout from "./ButtonLogout"
import { ButtonsAuth } from "./ButtonsAuth"

export function ContainerButtonsHeader() {
  const isAuth = isAuthenticated()

  return (
    <div className="flex justify-end">
      {isAuth ? <ButtonLogout /> : <ButtonsAuth />}
    </div>
  )
}
