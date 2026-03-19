describe("Edit Post", () => {
  beforeEach(() => {
    cy.login("test@test.com", "password")
    cy.visit("/feed")
  })

  it("should show edit option when clicking options", () => {
    cy.get('[data-cy="post-options-button"]').first().click()
    cy.get('[data-cy="post-edit-button"]').should("be.visible")
  })

  it("should open edit modal when clicking edit", () => {
    cy.get('[data-cy="post-options-button"]').first().click()
    cy.get('[data-cy="post-edit-button"]').click()
    cy.contains("Editar post").should("be.visible")
  })

  it("should display composer in edit modal", () => {
    cy.get('[data-cy="post-options-button"]').first().click()
    cy.get('[data-cy="post-edit-button"]').click()
    cy.get('[data-cy="composer-title"]').should("be.visible")
    cy.get('[data-cy="composer-content"]').should("be.visible")
  })
})
