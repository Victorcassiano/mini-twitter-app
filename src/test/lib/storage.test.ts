import { beforeEach, describe, expect, it, vi } from "vitest"
import {
  AUTH_KEY,
  EXPIRATION_DAYS,
} from "@/domain/common/constants/auth-storage-name"
import {
  getAuthData,
  getAuthToken,
  getAuthUser,
  isAuthenticated,
  removeAuthData,
  setAuthData,
} from "@/lib/storage"

const mockLocalStorage = {
  data: {} as Record<string, string>,
  getItem: vi.fn((key: string) => mockLocalStorage.data[key] || null),
  setItem: vi.fn((key: string, value: string) => {
    mockLocalStorage.data[key] = value
  }),
  removeItem: vi.fn((key: string) => {
    delete mockLocalStorage.data[key]
  }),
  clear: vi.fn(() => {
    mockLocalStorage.data = {}
  }),
}

vi.stubGlobal("localStorage", mockLocalStorage)

describe("Auth Storage", () => {
  beforeEach(() => {
    mockLocalStorage.data = {}
    vi.clearAllMocks()
  })

  describe("setAuthData", () => {
    it("should save auth data to localStorage", () => {
      const authData = {
        token: "test-token",
        user: {
          id: "1",
          name: "John Doe",
          email: "john@example.com",
        },
      }

      setAuthData(authData)

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        AUTH_KEY,
        expect.stringContaining("test-token"),
      )
    })

    it("should include createdAt timestamp", () => {
      const authData = {
        token: "test-token",
        user: {
          id: "1",
          name: "John Doe",
          email: "john@example.com",
        },
      }

      setAuthData(authData)

      const savedData = JSON.parse(mockLocalStorage.data[AUTH_KEY])
      expect(savedData.createdAt).toBeDefined()
      expect(typeof savedData.createdAt).toBe("number")
    })
  })

  describe("getAuthData", () => {
    it("should return auth data when valid", () => {
      const authData = {
        token: "test-token",
        user: {
          id: "1",
          name: "John Doe",
          email: "john@example.com",
        },
        createdAt: Date.now(),
      }

      mockLocalStorage.data[AUTH_KEY] = JSON.stringify(authData)

      const result = getAuthData()

      expect(result).toBeDefined()
      expect(result?.token).toBe("test-token")
      expect(result?.user.name).toBe("John Doe")
    })

    it("should return null when no data exists", () => {
      const result = getAuthData()

      expect(result).toBeNull()
    })

    it("should return null when data is expired", () => {
      const expiredData = {
        token: "test-token",
        user: {
          id: "1",
          name: "John Doe",
          email: "john@example.com",
        },
        createdAt: Date.now() - (EXPIRATION_DAYS + 1) * 24 * 60 * 60 * 1000,
      }

      mockLocalStorage.data[AUTH_KEY] = JSON.stringify(expiredData)

      const result = getAuthData()

      expect(result).toBeNull()
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith(AUTH_KEY)
    })

    it("should return null for invalid JSON", () => {
      mockLocalStorage.data[AUTH_KEY] = "invalid-json"

      const result = getAuthData()

      expect(result).toBeNull()
    })
  })

  describe("removeAuthData", () => {
    it("should remove auth data from localStorage", () => {
      mockLocalStorage.data[AUTH_KEY] = JSON.stringify({
        token: "test",
        user: {},
        createdAt: Date.now(),
      })

      removeAuthData()

      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith(AUTH_KEY)
    })
  })

  describe("isAuthenticated", () => {
    beforeEach(() => {
      vi.stubGlobal("window", { defined: true })
    })

    it("should return true when valid token exists", () => {
      const authData = {
        token: "valid-token",
        user: {
          id: "1",
          name: "John",
          email: "john@example.com",
        },
        createdAt: Date.now(),
      }

      mockLocalStorage.data[AUTH_KEY] = JSON.stringify(authData)

      const result = isAuthenticated()

      expect(result).toBe(true)
    })

    it("should return false when no token exists", () => {
      const result = isAuthenticated()

      expect(result).toBe(false)
    })
  })

  describe("getAuthToken", () => {
    it("should return token when auth data exists", () => {
      const authData = {
        token: "my-token",
        user: {
          id: "1",
          name: "John",
          email: "john@example.com",
        },
        createdAt: Date.now(),
      }

      mockLocalStorage.data[AUTH_KEY] = JSON.stringify(authData)

      const result = getAuthToken()

      expect(result).toBe("my-token")
    })

    it("should return null when no auth data", () => {
      const result = getAuthToken()

      expect(result).toBeNull()
    })
  })

  describe("getAuthUser", () => {
    it("should return user when auth data exists", () => {
      const authData = {
        token: "test-token",
        user: {
          id: "1",
          name: "John Doe",
          email: "john@example.com",
        },
        createdAt: Date.now(),
      }

      mockLocalStorage.data[AUTH_KEY] = JSON.stringify(authData)

      const result = getAuthUser()

      expect(result).toBeDefined()
      expect(result?.id).toBe("1")
      expect(result?.name).toBe("John Doe")
      expect(result?.email).toBe("john@example.com")
    })

    it("should return null when no auth data", () => {
      const result = getAuthUser()

      expect(result).toBeNull()
    })
  })
})
