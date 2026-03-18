import { useMutation } from "@tanstack/react-query"
import { AuthResponse, LoginInput } from "@/http/types/auth"
import customInstance from "@/lib/mutator"

async function login(data: LoginInput): Promise<AuthResponse> {
  return await customInstance<AuthResponse>({
    url: "/auth/login",
    method: "POST",
    data,
  })
}

export function useLogin() {
  const { mutate, ...props } = useMutation<AuthResponse, Error, LoginInput>({
    mutationFn: login,
  })

  return {
    mutate,
    ...props,
  }
}
