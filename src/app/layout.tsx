import type { Metadata } from "next"
import { Geist, Geist_Mono, Inter } from "next/font/google"
import "./globals.css"
import { headers } from "next/headers"
import { AuthGuard } from "@/components/Shared/AuthGuard"
import { cn } from "@/lib/utils"
import { Providers } from "./Providers"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Mini Twitter",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = (await headers()).get("x-pathname") || ""

  return (
    <html lang="br" className={cn("font-sans", inter.variable)}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background`}
      >
        <AuthGuard pathname={pathname}>
          <Providers>{children}</Providers>
        </AuthGuard>
      </body>
    </html>
  )
}
