"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Email } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useRouter } from "next/navigation"
import { Controller, useForm } from "react-hook-form"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useLogin } from "@/http/hooks/auth"
import { postAuthLoginBody } from "@/http/schemas/auth"
import { LoginInput } from "@/http/types/auth"
import { setAuthData } from "@/lib/storage"
import { Button } from "../ui/button"

export function LoginForm() {
  const router = useRouter()
  const { mutate, isPending } = useLogin()

  const form = useForm<LoginInput>({
    resolver: zodResolver(postAuthLoginBody),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = (data: LoginInput) => {
    mutate(data, {
      onSuccess: (response) => {
        if (response.token && response.user) {
          setAuthData({
            token: response.token,
            user: {
              id: response.user.id ?? "",
              name: response.user.name ?? "",
              email: response.user.email ?? "",
            },
          })
        }

        router.push("/feed")
      },
    })
  }

  return (
    <Card className="w-full sm:max-w-md bg-transparent border-transparent p-0 overflow-visible">
      <CardHeader className="p-0 mt-10">
        <CardTitle className="text-primary font-bold text-2xl">
          Olá, de novo!
        </CardTitle>
        <CardDescription>
          Por favor, insira os seus dados para fazer login.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            {/* Campo Email */}
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="login-email">Email</FieldLabel>
                  <Input
                    {...field}
                    type="email"
                    placeholder="Insira seu e-mail"
                    autoComplete="email"
                    icon={<HugeiconsIcon icon={Email} className="size-6" />}
                    disabled={isPending}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Campo Senha */}
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="login-password">Senha</FieldLabel>
                  <Input
                    {...field}
                    type="password"
                    placeholder="Insira a sua senha"
                    autoComplete="current-password"
                    disabled={isPending}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="p-0">
        <Button
          type="button"
          onClick={form.handleSubmit(onSubmit)}
          disabled={isPending}
          className="w-full h-12 rounded-full text-white font-medium shadow-[0px_6px_20px_-7px_var(--primary)] transition-colors border-0 text-base"
        >
          {isPending ? (
            <div className="flex items-center gap-2">
              <div className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Entrando...
            </div>
          ) : (
            "Continuar"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
