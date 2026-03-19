describe("Register", () => {
  beforeEach(() => {
    cy.visit("/login")
  })

  it("should display register form when tab is clicked", () => {
    cy.contains("Cadastrar").click()

    cy.get('[data-cy="register-name"]').should("be.visible")
    cy.get('[data-cy="register-email"]').should("be.visible")
    cy.get('[data-cy="register-password"]').should("be.visible")
    cy.get('[data-cy="register-submit"]').should("be.visible")
  })

  it("should have correct form labels", () => {
    cy.contains("Cadastrar").click()

    cy.contains("Nome").should("be.visible")
    cy.contains("Email").should("be.visible")
    cy.contains("Senha").should("be.visible")
  })
})
