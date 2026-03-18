"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import dynamic from "next/dynamic"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { NuqsAdapter } from "nuqs/adapters/next/app"
import { Toaster } from "@/components/ui/sonner"

function ProvidersLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const queryClient = new QueryClient()

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="ligth"
      enableSystem
      disableTransitionOnChange
    >
      <QueryClientProvider client={queryClient}>
        <NuqsAdapter>
          {children}
          <Toaster />
        </NuqsAdapter>
      </QueryClientProvider>
    </NextThemesProvider>
  )
}

export const Providers = dynamic(() => Promise.resolve(ProvidersLayout), {
  ssr: false,
})
