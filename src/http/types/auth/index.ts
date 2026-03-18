export type LoginInput = {
  email: string
  password: string
}

export type AuthResponse = {
  token: string
  user: {
    id: string
    name: string
    email: string
  }
}

export type RegisterInput = {
  name: string
  email: string
  password: string
}

export type RegisterResponse = {
  id: string
  name: string
  email: string
}
