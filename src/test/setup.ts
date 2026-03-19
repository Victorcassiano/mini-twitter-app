import "@testing-library/jest-dom"
import { vi } from "vitest"

const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
  key: vi.fn(),
  length: 0,
}

vi.stubGlobal("localStorage", localStorageMock)
vi.stubGlobal("sessionStorage", localStorageMock)
