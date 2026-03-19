describe("Create Post", () => {
  beforeEach(() => {
    cy.login("test@test.com", "password")
    cy.visit("/feed")
  })

  it("should display feed composer", () => {
    cy.get('[data-cy="composer-title"]').should("be.visible")
    cy.get('[data-cy="composer-content"]').should("be.visible")
    cy.get('[data-cy="composer-submit"]').should("be.visible")
  })

  it("should disable submit when content is empty", () => {
    cy.get('[data-cy="composer-title"]').type("Test Title")
    cy.get('[data-cy="composer-submit"]').should("be.disabled")
  })

  it("should enable submit when content is filled", () => {
    cy.get('[data-cy="composer-title"]').type("Test Title")
    cy.get('[data-cy="composer-content"]').type("Test Content")
    cy.get('[data-cy="composer-submit"]').should("be.enabled")
  })
})
