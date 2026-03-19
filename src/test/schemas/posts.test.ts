import { feedSchema } from "@/http/schemas/posts"

describe("feedSchema", () => {
  it("should validate valid data", () => {
    const result = feedSchema.safeParse({
      title: "Hello World",
      content: "This is a test",
    })
    expect(result.success).toBe(true)
  })

  it("should reject empty title", () => {
    const result = feedSchema.safeParse({
      title: "",
      content: "Content",
    })
    expect(result.success).toBe(false)
  })
})
