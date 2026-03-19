import { describe, expect, it } from "vitest"
import {
  postAuthLoginBody,
  postAuthLoginResponse,
  postAuthRegisterBody,
  postAuthRegisterResponse,
} from "@/http/schemas/auth"

describe("Auth Schemas", () => {
  describe("postAuthLoginBody", () => {
    it("should validate valid login data", () => {
      const result = postAuthLoginBody.safeParse({
        email: "user@example.com",
        password: "password123",
      })

      expect(result.success).toBe(true)
    })

    it("should reject invalid email", () => {
      const result = postAuthLoginBody.safeParse({
        email: "invalid-email",
        password: "password123",
      })

      expect(result.success).toBe(false)
    })

    it("should reject missing password", () => {
      const result = postAuthLoginBody.safeParse({
        email: "user@example.com",
      })

      expect(result.success).toBe(false)
    })

    it("should reject empty email", () => {
      const result = postAuthLoginBody.safeParse({
        email: "",
        password: "password123",
      })

      expect(result.success).toBe(false)
    })
  })

  describe("postAuthRegisterBody", () => {
    it("should validate valid register data", () => {
      const result = postAuthRegisterBody.safeParse({
        name: "John Doe",
        email: "user@example.com",
        password: "password123",
      })

      expect(result.success).toBe(true)
    })

    it("should reject name with less than 2 characters", () => {
      const result = postAuthRegisterBody.safeParse({
        name: "J",
        email: "user@example.com",
        password: "password123",
      })

      expect(result.success).toBe(false)
    })

    it("should reject invalid email", () => {
      const result = postAuthRegisterBody.safeParse({
        name: "John Doe",
        email: "invalid-email",
        password: "password123",
      })

      expect(result.success).toBe(false)
    })

    it("should reject password with less than 8 characters", () => {
      const result = postAuthRegisterBody.safeParse({
        name: "John Doe",
        email: "user@example.com",
        password: "short",
      })

      expect(result.success).toBe(false)
    })

    it("should reject missing fields", () => {
      const result = postAuthRegisterBody.safeParse({
        name: "John Doe",
      })

      expect(result.success).toBe(false)
    })
  })

  describe("postAuthLoginResponse", () => {
    it("should validate response with all fields", () => {
      const result = postAuthLoginResponse.safeParse({
        token: "abc123",
        user: {
          id: "1",
          name: "John",
          email: "user@example.com",
        },
      })

      expect(result.success).toBe(true)
    })

    it("should validate response with empty fields", () => {
      const result = postAuthLoginResponse.safeParse({})

      expect(result.success).toBe(true)
    })

    it("should validate response with only token", () => {
      const result = postAuthLoginResponse.safeParse({
        token: "abc123",
      })

      expect(result.success).toBe(true)
    })
  })

  describe("postAuthRegisterResponse", () => {
    it("should validate response with all fields", () => {
      const result = postAuthRegisterResponse.safeParse({
        id: "1",
        name: "John",
        email: "user@example.com",
      })

      expect(result.success).toBe(true)
    })

    it("should validate empty response", () => {
      const result = postAuthRegisterResponse.safeParse({})

      expect(result.success).toBe(true)
    })
  })
})
