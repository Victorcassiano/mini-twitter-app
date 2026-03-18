"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Image } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import dynamic from "next/dynamic"
import { Controller, useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useCreatePost } from "@/http/hooks/posts"
import { feedSchema } from "@/http/schemas/posts"
import { FeedFormValues } from "@/http/types/posts"

function FeedComposerComponent() {
  const { mutate, isPending } = useCreatePost()

  const form = useForm<FeedFormValues>({
    resolver: zodResolver(feedSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  })

  const content = form.watch("content")

  const onSubmit = async (data: FeedFormValues) => {
    mutate(
      { content: data.content, title: data.title },
      {
        onSuccess: () => {
          form.reset()
        },
      },
    )
  }

  const handleImageUpload = () => {
    // Lógica para upload de imagem
    console.log("Upload image")
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-xl border border-gray-200 shadow-lg p-4 mt-8">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FieldGroup>
          <Controller
            control={form.control}
            name="title"
            render={({ field, fieldState }) => (
              <Field>
                <Input
                  placeholder="Insira um título"
                  className="resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0 text-lg placeholder:text-gray-500 dark:bg-white"
                  {...field}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="content"
            render={({ field, fieldState }) => (
              <Field>
                <Textarea
                  placeholder="E aí, o que está rolando?"
                  className="min-h-25 resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0 text-lg placeholder:text-gray-500 dark:bg-white"
                  rows={3}
                  {...field}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleImageUpload}
            className="group size-8 text-gray-500 hover:text-gray-700 hover:bg-transparent"
          >
            <HugeiconsIcon
              icon={Image}
              className="size-full text-primary group-hover:text-primary/80"
            />
            <span className="sr-only">Adicionar imagem</span>
          </Button>

          <Button
            type="submit"
            disabled={!content?.trim() || isPending}
            className="px-6 h-10 rounded-full text-white font-medium shadow-[0px_6px_20px_-7px_var(--primary)] transition-colors border-0 text-base disabled:opacity-50"
          >
            {isPending ? "Postando..." : "Postar"}
          </Button>
        </div>
      </form>
    </div>
  )
}

export const FeedComposer = dynamic(
  () => Promise.resolve(FeedComposerComponent),
  {
    ssr: false,
  },
)
