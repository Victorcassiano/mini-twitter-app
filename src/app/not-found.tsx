import { Home } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <HugeiconsIcon icon={Home} size={64} className="text-muted-foreground" />
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-muted-foreground">Página não encontrada</p>
      <Link href="/feed">
        <Button className="w-full h-12 px-4 rounded-full text-white font-medium shadow-[0px_6px_20px_-7px_var(--primary)] transition-colors border-0 text-base">
          Voltar para tela inicial
        </Button>
      </Link>
    </div>
  )
}
