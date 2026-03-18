import * as zod from "zod"

export const postAuthRegisterBodyNameMin = 2

export const postAuthRegisterBodyPasswordMin = 8

export const postAuthRegisterBody = zod.object({
  name: zod.string().min(postAuthRegisterBodyNameMin, {
    error: `Nome deve conter no minimo ${postAuthRegisterBodyPasswordMin} caracteres`,
  }),
  email: zod.email({ error: "Por favor, insira um E-mail válido." }),
  password: zod.string().min(postAuthRegisterBodyPasswordMin, {
    error: `Sua senha deve conter no minimo ${postAuthRegisterBodyPasswordMin} caracteres`,
  }),
})

export const postAuthRegisterResponse = zod.object({
  id: zod.string().optional(),
  name: zod.string().optional(),
  email: zod.email().optional(),
})

export const postAuthLoginBody = zod.object({
  email: zod.email({ error: "Por favor, insira um E-mail válido." }),
  password: zod.string(),
})

export const postAuthLoginResponse = zod.object({
  token: zod.string().optional(),
  user: zod
    .object({
      id: zod.string().optional(),
      name: zod.string().optional(),
      email: zod.email().optional(),
    })
    .optional(),
})
