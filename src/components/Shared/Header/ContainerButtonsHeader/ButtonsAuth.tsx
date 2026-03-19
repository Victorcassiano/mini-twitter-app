import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useStoreLoginTabs } from "@/lib/store/login-tabs"

export function ButtonsAuth() {
  const router = useRouter()
  const { setTab } = useStoreLoginTabs()

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 justify-end space-x-4 [&>button]:h-10 [&>button]:rounded-full [&>button]:transition-colors [&>button]:p-4 [&>button]:text-sm">
      <Button
        variant="outline"
        onClick={() => {
          setTab("register")
          router.push("/login")
        }}
        className="hidden lg:flex"
      >
        Registrar-se
      </Button>

      <Button
        className="text-white border-0 shadow-[0px_6px_20px_-7px_var(--primary)]"
        onClick={() => {
          setTab("login")
          router.push("/login")
        }}
      >
        Login
      </Button>
    </div>
  )
}
