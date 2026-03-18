import { StatusMessageMap } from "../types/statusMessageMap"

export const STATUS_MESSAGES: StatusMessageMap = {
  "/auth/register": {
    POST: {
      201: "Usuário criado com sucesso, basta fazer login!",
      400: "Usuário já cadastrado ou dados inválidos",
    },
  },
  "/auth/login": {
    POST: {
      401: "Credenciais inválidas!",
    },
  },
  "/auth/logout": {
    POST: {
      200: "Logout realizado com sucesso. Token invalidado.",
    },
  },
  "/posts/": {
    PUT: {
      401: "Você precisa estar autenticado para editar este post. Faça login e tente novamente.",
    },
  },
}
