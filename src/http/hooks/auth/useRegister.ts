import { useMutation } from "@tanstack/react-query"
import { RegisterInput, RegisterResponse } from "@/http/types/auth"
import customInstance from "@/lib/mutator"

async function register(data: RegisterInput): Promise<RegisterResponse> {
  return await customInstance<RegisterResponse>({
    url: "/auth/register",
    method: "POST",
    data,
  })
}

export function useRegister() {
  const { mutate, ...props } = useMutation<
    RegisterResponse,
    Error,
    RegisterInput
  >({
    mutationFn: register,
    onSuccess: (response) => {
      console.log("Usuário registrado:", response)
    },
  })

  return {
    mutate,
    ...props,
  }
}
