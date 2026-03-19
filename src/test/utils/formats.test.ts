import { formatDateTimeBR, formatName } from "@/utils/formats"

describe("formatDateTimeBR", () => {
  it("should format date correctly", () => {
    expect(formatDateTimeBR("2024-03-17 14:02:10")).toBe("17/03/2024, 14:02")
  })

  it("should return 'Data inválida' for invalid date", () => {
    expect(formatDateTimeBR("invalid")).toBe("Data inválida")
  })
})

describe("formatName", () => {
  it("should format name with underscores", () => {
    expect(formatName("Victor Silva")).toBe("victor_silva")
  })

  it("should remove accents", () => {
    expect(formatName("José")).toBe("jose")
  })
})
