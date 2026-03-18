import * as zod from "zod"
import {
  MAX_SIZE_UPLOAD_IMAGE,
  MAX_SIZE_UPLOAD_IMAGE_STRING,
} from "@/domain/common/constants/values-upload-image"

export const getPostsQueryParams = zod.object({
  page: zod.string().optional(),
  search: zod.string().optional(),
})

export const getPostsResponseTitleMin = 3

export const getPostsResponseItem = zod.object({
  id: zod.string().optional(),
  title: zod.string().min(getPostsResponseTitleMin).optional(),
  content: zod.string().min(1).optional(),
  image: zod.string().optional(),
  authorId: zod.string().optional(),
  createdAt: zod.iso.datetime({}).optional(),
})
export const getPostsResponse = zod.array(getPostsResponseItem)

export const postPostsBodyTitleMin = 3

export const postPostsBody = zod.object({
  title: zod.string().min(postPostsBodyTitleMin),
  content: zod.string().min(1),
  image: zod.string().optional(),
})

export const postPostsResponseTitleMin = 3

export const postPostsResponse = zod.object({
  id: zod.string().optional(),
  title: zod.string().min(postPostsResponseTitleMin).optional(),
  content: zod.string().min(1).optional(),
  image: zod.string().optional(),
  authorId: zod.string().optional(),
  createdAt: zod.iso.datetime({}).optional(),
})

export const putPostsByIdParams = zod.object({
  id: zod.string(),
})

export const putPostsByIdBodyTitleMin = 3

export const putPostsByIdBody = zod.object({
  title: zod.string().min(putPostsByIdBodyTitleMin),
  content: zod.string().min(1),
  image: zod.string().optional(),
})

export const putPostsByIdResponseTitleMin = 3

export const putPostsByIdResponse = zod.object({
  id: zod.string().optional(),
  title: zod.string().min(putPostsByIdResponseTitleMin).optional(),
  content: zod.string().min(1).optional(),
  image: zod.string().optional(),
  authorId: zod.string().optional(),
  createdAt: zod.iso.datetime({}).optional(),
})

export const deletePostsByIdParams = zod.object({
  id: zod.string(),
})

export const postPostsByIdLikeParams = zod.object({
  id: zod.string(),
})

export const feedSchema = zod.object({
  title: zod.string().min(1, { message: "O título não pode estar vazio" }),
  content: zod
    .string()
    .min(1, { message: "O conteúdo não pode estar vazio" })
    .max(500, { message: "O conteúdo deve ter no máximo 500 caracteres" }),
  image: zod
    .instanceof(File)
    .refine((file) => file.size <= MAX_SIZE_UPLOAD_IMAGE, {
      message: `Imagem muito grande. Máximo: ${MAX_SIZE_UPLOAD_IMAGE_STRING} MB`,
    })
    .refine((file) => file.type.startsWith("image/"), {
      message: "Apenas imagens são permitidas",
    })
    .transform((file) => file)
    .optional(),
})
