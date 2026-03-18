import { redirect } from "next/navigation"
import {
  AUTHENTICATED_ROUTES,
  PUBLIC_ROUTES,
} from "@/domain/common/constants/routes"
import { isAuthenticated } from "@/lib/storage"

export function AuthGuard({
  children,
  pathname,
}: {
  children: React.ReactNode
  pathname: string
}) {
  const isAuth = isAuthenticated()

  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  )

  const isProtectedRoute = AUTHENTICATED_ROUTES.some((route) =>
    pathname.startsWith(route),
  )

  if (!isAuth && isProtectedRoute) {
    redirect("/login")
  }

  if (isAuth && isPublicRoute) {
    redirect("/feed")
  }

  return children
}
