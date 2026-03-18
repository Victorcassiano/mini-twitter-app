import { toast } from "sonner"

export type ToastType = "success" | "info" | "warning" | "error" | "loading"

interface ToastOptions {
  title?: string
  description?: string
  duration?: number
}

export const showToast = {
  success: ({ title, description, duration = 4000 }: ToastOptions) => {
    return toast.success(title, {
      description,
      duration,
      classNames: {
        toast: "flex! flex-row! gap-5!",
        success: "bg-green-50! border-green-600!",
        content: "flex flex-col gap-1 text-green-600!",
        description: "text-muted-foreground! text-sm",
        closeButton: "bg-zinc-50! border-green-600! text-green-600!",
        icon: "text-green-600!",
      },
    })
  },

  info: ({ title, description, duration = 4000 }: ToastOptions) => {
    return toast.info(title, {
      description,
      duration,
      classNames: {
        toast: "flex! flex-row! gap-5!",
        info: "bg-blue-50! border-blue-600!",
        content: "flex flex-col gap-1 text-blue-600!",
        description: "text-muted-foreground! text-sm",
        closeButton: "bg-zinc-50! border-blue-600! text-blue-600!",
        icon: "text-blue-600!",
      },
    })
  },

  warning: ({ title, description, duration = 4000 }: ToastOptions) => {
    return toast.warning(title, {
      description,
      duration,
      classNames: {
        toast: "flex! flex-row! gap-5!",
        warning: "bg-orange-50! border-orange-600!",
        content: "flex flex-col gap-1 text-orange-600!",
        description: "text-muted-foreground! text-sm",
        closeButton: "bg-zinc-50! border-orange-600! text-orange-600!",
        icon: "text-orange-600!",
      },
    })
  },

  error: ({ title, description, duration = 4000 }: ToastOptions) => {
    return toast.error(title, {
      description,
      duration,
      classNames: {
        toast: "flex! flex-row! gap-5!",
        error: "bg-red-50! border-red-600!",
        content: "flex flex-col gap-1 text-red-600!",
        description: "text-muted-foreground! text-sm",
        closeButton: "bg-zinc-50! border-red-600! text-red-600!",
        icon: "text-red-600!",
      },
    })
  },

  loading: ({ title, description, duration = Infinity }: ToastOptions) => {
    return toast.loading(title, {
      description,
      duration,
      classNames: {
        toast: "flex! flex-row! gap-5!",
        content: "flex flex-col gap-1 text-red-600!",
        title: "text-primary!",
        description: "text-muted-foreground! text-sm",
        closeButton: "bg-zinc-50! border-red-600! text-red-600!",
        icon: "text-primary!",
      },
    })
  },
}
