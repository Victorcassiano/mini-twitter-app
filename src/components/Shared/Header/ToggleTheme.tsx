"use client"
import { Moon02Icon, Sun } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ToggleTheme() {
  const { theme, setTheme } = useTheme()

  const toggle = () => {
    if (theme === "dark") {
      setTheme("ligth")
    } else {
      setTheme("dark")
    }
  }

  return (
    <Button variant="round" size="icon-lg" className="size-10" onClick={toggle}>
      <HugeiconsIcon
        icon={theme === "ligth" ? Moon02Icon : Sun}
        className="dark:text-white"
      />
    </Button>
  )
}
