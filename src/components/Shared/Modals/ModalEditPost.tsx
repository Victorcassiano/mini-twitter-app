import { zodResolver } from "@hookform/resolvers/zod"
import { Image } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Controller, useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Modal from "@/components/ui/modal"
import { Textarea } from "@/components/ui/textarea"
import { useEditPost } from "@/http/hooks/posts/useEditPost"
import { feedSchema } from "@/http/schemas/posts"
import { FeedFormValues } from "@/http/types/posts"
import { useStoreEditPost } from "@/lib/store/edit-post"

export const ModalEditPost = () => {
  const { value, set } = useStoreEditPost()
  const { mutate, isPending } = useEditPost()

  const form = useForm<FeedFormValues>({
    resolver: zodResolver(feedSchema),
    defaultValues: {
      title: value?.title,
      content: value?.content,
    },
  })

  const onClose = () => {
    set(undefined)
    form.reset()
  }

  const onSubmit = (data: FeedFormValues) => {
    console.log(data)
    mutate(
      { id: value!.id, data: { title: data.title, content: data.content } },
      { onSettled: () => onClose() },
    )
  }

  const handleImageUpload = () => {
    // Lógica para upload de imagem
    console.log("Upload image")
  }

  return (
    <Modal
      title="Editar post"
      visible={!!value}
      onClose={onClose}
      footer={
        <div className="flex gap-3 [&>button]:px-6 [&>button]:h-10 [&>button]:rounded-full [&>button]:text-sm [&>button]:transition-all [&>button]:duration-500">
          <Button
            variant="outline"
            onClick={onClose}
            className="hover:text-destructive hover:border-destructive"
          >
            Cancelar
          </Button>
          <Button
            type="button"
            onClick={form.handleSubmit(onSubmit)}
            className="text-white font-medium shadow-[0px_6px_20px_-7px_var(--primary)] border-0 disabled:opacity-50"
          >
            {isPending ? "Salvando..." : "Salvar"}
          </Button>
        </div>
      }
      className="w-4xl"
    >
      <div className="w-full max-w-4xl mx-auto bg-white rounded-xl border border-gray-200 shadow-lg p-4">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FieldGroup>
            <Controller
              control={form.control}
              name="title"
              render={({ field, fieldState }) => (
                <Field>
                  <Input
                    placeholder="Insira um título"
                    className="resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0 text-lg placeholder:text-gray-500 dark:bg-white dark:text-black"
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
                    className="min-h-25 resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0 text-lg placeholder:text-gray-500 dark:bg-white dark:text-black"
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
          </div>
        </form>
      </div>
    </Modal>
  )
}
