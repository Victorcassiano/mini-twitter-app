import {
  AUTH_KEY,
  EXPIRATION_DAYS,
} from "@/domain/common/constants/auth-storage-name"

interface AuthUserData {
  id: string
  name: string
  email: string
}

interface AuthData {
  token: string
  user: AuthUserData
  createdAt: number
}

export function setAuthData(data: Omit<AuthData, "createdAt">): void {
  const dataWithTimestamp = {
    ...data,
    createdAt: Date.now(),
  }
  localStorage.setItem(AUTH_KEY, JSON.stringify(dataWithTimestamp))
}

export function getAuthData(): AuthData | null {
  try {
    const value = localStorage.getItem(AUTH_KEY)
    if (!value) return null

    const data = JSON.parse(value) as AuthData
    const isExpired = Date.now() - data.createdAt > EXPIRATION_DAYS

    if (isExpired) {
      removeAuthData()
      return null
    }

    return data
  } catch {
    return null
  }
}

export function removeAuthData(): void {
  localStorage.removeItem(AUTH_KEY)
}

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false
  const authData = getAuthData()
  return Boolean(authData?.token)
}

export function getAuthToken(): string | null {
  const authData = getAuthData()
  return authData?.token ?? null
}

export function getAuthUser(): AuthUserData | null {
  const authData = getAuthData()
  return authData?.user ?? null
}
