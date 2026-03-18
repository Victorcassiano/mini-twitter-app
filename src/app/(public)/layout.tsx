import Link from "next/link"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main>
      <h2 className="text-center text-3xl text-primary font-semibold my-10">
        Mini Twitter
      </h2>
      {children}
      <p className="mx-auto font-medium text-foreground text-center text-xs w-80 mt-10">
        Ao clicar em continuar, você concorda com nossos{" "}
        <Link href="#">
          <strong className="underline">Termos de Serviços</strong> e{" "}
        </Link>
        <Link href="#">
          <strong className="underline">Política de Privacidade</strong>
        </Link>
      </p>
    </main>
  )
}
