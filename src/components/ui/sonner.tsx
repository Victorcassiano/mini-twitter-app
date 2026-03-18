"use client"

import {
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  InformationCircleIcon,
  ReloadIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      closeButton
      richColors
      icons={{
        success: (
          <HugeiconsIcon
            icon={CheckCircle}
            strokeWidth={2}
            className="size-8"
          />
        ),
        info: (
          <HugeiconsIcon
            icon={InformationCircleIcon}
            strokeWidth={2}
            className="size-8"
          />
        ),
        warning: (
          <HugeiconsIcon
            icon={AlertTriangle}
            strokeWidth={2}
            className="size-8"
          />
        ),
        error: (
          <HugeiconsIcon
            icon={AlertCircle}
            strokeWidth={2}
            className="size-8"
          />
        ),
        loading: (
          <HugeiconsIcon
            icon={ReloadIcon}
            strokeWidth={2}
            className="size-8 animate-spin"
          />
        ),
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
