import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios"
import { showToast } from "@/components/Shared/Toaster"
import { STATUS_MESSAGES } from "@/domain/common/constants/status-message"
import { HttpMethod } from "@/domain/common/types/statusMessageMap"

function getPath(config?: InternalAxiosRequestConfig) {
  if (!config?.url) return ""

  try {
    const url = new URL(config.url, window.location.origin)
    return url.pathname
  } catch {
    return config.url
  }
}

export function getStatusMessage(
  status: number,
  config?: InternalAxiosRequestConfig,
): string | undefined {
  const path = getPath(config)
  const method = config?.method?.toUpperCase() as HttpMethod | undefined

  if (!path || !method) return

  for (const basePath of Object.keys(STATUS_MESSAGES)) {
    if (path.startsWith(basePath)) {
      const message = STATUS_MESSAGES[basePath]?.[method]?.[status]
      if (message) return message
    }
  }
}

export function getErrorMessage(error: AxiosError): string {
  const response = error.response

  if (!response) {
    if (error.code === "ECONNABORTED") {
      return "Tempo de conexão esgotado. Tente novamente"
    }

    if (error.code === "ERR_NETWORK") {
      return "Erro de conexão. Verifique sua internet"
    }

    return "Erro de conexão. Tente novamente"
  }

  const message = getStatusMessage(response.status, error.config)

  return message ?? "Ocorreu um erro inesperado"
}

export function handleApiError(error: AxiosError): void {
  const message = getErrorMessage(error)

  showToast.error({
    title: "Erro",
    description: message,
  })
}

export function handleApiSuccess(
  response?: AxiosResponse,
  statusCode?: number,
): void {
  const status = response?.status ?? statusCode
  if (!status) return

  const message = getStatusMessage(status, response?.config)

  if (!message) return

  showToast.success({
    title: "Sucesso",
    description: message,
  })
}
