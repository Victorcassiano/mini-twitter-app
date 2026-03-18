export type StatusMessageMap = {
  [path: string]: {
    [method in HttpMethod]?: {
      [status: number]: string
    }
  }
}

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
