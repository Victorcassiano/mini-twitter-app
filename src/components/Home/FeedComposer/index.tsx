"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { ImageIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import dynamic from "next/dynamic"
import { useRef } from "react"
import { useForm } from "react-hook-form"
import { ImagePreview } from "@/components/Shared/ImagePreview"
import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useFeedComposer } from "@/http/hooks/feed/useFeedComposer"
import { useImageUpload } from "@/http/hooks/posts/useImageUpload"
import { feedSchema } from "@/http/schemas/posts"
import { FeedFormInput, Post } from "@/http/types/posts"

type FeedComposerProps = {
  post?: Post | null
  onSuccess?: () => void
}

function FeedComposerComponent({ post, onSuccess }: FeedComposerProps = {}) {
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const { file, preview, onSelect, onRemove, hasExistingImage, clear } =
    useImageUpload({ existingImage: post?.image })

  const { handleSubmit, isEditing } = useFeedComposer({ post, onSuccess })

  const form = useForm<FeedFormInput>({
    resolver: zodResolver(feedSchema),
    defaultValues: {
      title: post?.title || "",
      content: post?.content || "",
    },
  })

  const content = form.watch("content")

  const isPending = form.formState.isSubmitting

  const onSubmit = (data: FeedFormInput) =>
    handleSubmit(data, file, hasExistingImage, clear, form.reset)

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-xl border p-4 mt-8 dark:bg-card">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FieldGroup>
          <Field>
            <Input
              placeholder="Insira um título"
              className="border-0 p-0 text-lg dark:bg-transparent"
              {...form.register("title")}
            />
            <FieldError errors={[form.formState.errors.title]} />
          </Field>

          <Field>
            <Textarea
              placeholder="E aí, o que está rolando?"
              className="min-h-25 border-0 p-0 text-lg dark:bg-transparent"
              {...form.register("content")}
            />
            <FieldError errors={[form.formState.errors.content]} />
          </Field>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => onSelect(e.target.files?.[0])}
          />

          {preview && <ImagePreview src={preview} onRemove={onRemove} />}
        </FieldGroup>

        <div className="flex justify-between border-t pt-4">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => fileInputRef.current?.click()}
            className="group size-8 text-gray-500 hover:text-gray-700 hover:bg-transparent"
          >
            <HugeiconsIcon
              icon={ImageIcon}
              className="size-full text-primary group-hover:text-primary/80"
            />
            <span className="sr-only">Adicionar imagem</span>
          </Button>

          <Button
            type="submit"
            disabled={!content?.trim() || isPending}
            className="px-6 h-10 rounded-full text-white font-medium shadow-[0px_6px_20px_-7px_var(--primary)] transition-colors duration-500 border-0 text-base disabled:opacity-80"
          >
            {isPending ? "Salvando..." : isEditing ? "Salvar" : "Postar"}
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
