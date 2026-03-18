import { useMutation, useQueryClient } from "@tanstack/react-query"
import customInstance from "@/lib/mutator"
import { removeAuthData } from "@/lib/storage"

async function logout(): Promise<void> {
  return await customInstance<void>({
    url: "/auth/logout",
    method: "POST",
  })
}

export function useLogout() {
  const queryClient = useQueryClient()

  return useMutation<void, Error, void>({
    mutationFn: logout,
    onSuccess: () => {
      removeAuthData()

      queryClient.clear()
    },
    onError: () => {
      removeAuthData()
    },
  })
}
