describe("Logout", () => {
  beforeEach(() => {
    cy.login("test@test.com", "password")
    cy.visit("/feed")
  })

  it("should display feed when authenticated", () => {
    cy.get('[data-cy="composer-title"]').should("be.visible")
  })

  it("should clear authentication on logout", () => {
    cy.logout()
    cy.get('[data-cy="login-email"]').should("be.visible")
  })
})
