import Axios, { AxiosError, AxiosRequestConfig } from "axios"
import env from "@/lib/env"
import { handleApiError, handleApiSuccess } from "./api-handler"
import { getAuthToken } from "./storage"

export const AXIOS_INSTANCE = Axios.create({
  baseURL: env.API_KEY,
})

AXIOS_INSTANCE.interceptors.request.use(
  (config) => {
    const token = getAuthToken()

    if (token) config.headers.Authorization = `Bearer ${token}`

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

AXIOS_INSTANCE.interceptors.response.use(
  (response) => {
    handleApiSuccess(response)

    return response
  },
  (error: AxiosError) => {
    handleApiError(error)

    return Promise.reject(error)
  },
)

export const customInstance = <T>(config: AxiosRequestConfig): Promise<T> => {
  const source = Axios.CancelToken.source()
  const promise = AXIOS_INSTANCE({ ...config, cancelToken: source.token }).then(
    ({ data }) => data,
  )

  return promise
}

export default customInstance

export type ErrorType<Error> = AxiosError<Error>
