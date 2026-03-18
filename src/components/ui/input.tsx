"use client"

import { Input as InputPrimitive } from "@base-ui/react/input"
import { Eye, EyeOff } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { ClassValue } from "clsx"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "./button"

interface InputProps extends React.ComponentProps<"input"> {
  icon?: React.ReactNode
  leftIcon?: React.ReactNode
  containerClassName?: ClassValue
}

function Input({
  className,
  type,
  icon,
  leftIcon,
  containerClassName,
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = React.useState(false)

  const isPassword = type === "password"
  const inputType = isPassword ? (showPassword ? "text" : "password") : type

  return (
    <div className={cn("relative", containerClassName)}>
      {leftIcon && (
        <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-muted-foreground">
          {leftIcon}
        </div>
      )}

      <InputPrimitive
        type={inputType}
        data-slot="input"
        className={cn(
          "h-12 w-full min-w-0 rounded-md border border-muted-foreground/20 bg-input text-sm transition-colors outline-none",
          "placeholder:text-muted-foreground",
          "focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30",
          "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
          "aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20",
          "dark:bg-input/30",
          leftIcon ? "pl-10" : "pl-2",
          (icon || isPassword) && "pr-10",
          className,
        )}
        {...props}
      />

      {isPassword ? (
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute inset-y-0 right-2 my-auto h-8 w-8 text-muted-foreground hover:text-foreground"
        >
          {showPassword ? (
            <HugeiconsIcon icon={EyeOff} className="size-5" />
          ) : (
            <HugeiconsIcon icon={Eye} className="size-5" />
          )}
        </Button>
      ) : (
        icon && (
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-muted-foreground">
            {icon}
          </div>
        )
      )}
    </div>
  )
}

export { Input }
