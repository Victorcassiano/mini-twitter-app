import { describe, expect, it } from "vitest"
import { highlightHashtags } from "@/utils/render-highlight-hashtags"

describe("highlightHashtags", () => {
  it("should highlight hashtags", () => {
    const result = highlightHashtags("Hello #world")
    expect(result).toContain("<span")
    expect(result).toContain("#world")
  })
})
