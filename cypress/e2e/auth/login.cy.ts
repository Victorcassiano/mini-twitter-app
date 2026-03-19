describe("Login", () => {
  beforeEach(() => {
    cy.visit("/login")
  })

  it("should display login form", () => {
    cy.get('[data-cy="login-email"]').should("be.visible")
    cy.get('[data-cy="login-password"]').should("be.visible")
    cy.get('[data-cy="login-submit"]').should("be.visible")
  })

  it("should have correct form labels", () => {
    cy.contains("Email").should("be.visible")
    cy.contains("Senha").should("be.visible")
    cy.get('[data-cy="login-submit"]').should("contain", "Continuar")
  })
})
