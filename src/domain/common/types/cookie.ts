export type AuthUserData = {
  id: string
  name: string
  email: string
}

export type AuthCookieData = {
  token: string
  user: AuthUserData
}
