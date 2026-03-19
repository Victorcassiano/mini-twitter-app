describe("Delete Post", () => {
  beforeEach(() => {
    cy.login("test@test.com", "password")
    cy.visit("/feed")
  })

  it("should show options when clicking options button", () => {
    cy.get('[data-cy="post-options-button"]').first().click()
    cy.get('[data-cy="post-delete-button"]').should("be.visible")
    cy.get('[data-cy="post-edit-button"]').should("be.visible")
  })

  it("should open delete modal and show confirmation", () => {
    cy.get('[data-cy="post-options-button"]').first().click()
    cy.get('[data-cy="post-delete-button"]').click()
    cy.contains("Excluir post?").should("be.visible")
    cy.get('[data-cy="delete-cancel-button"]').should("be.visible")
    cy.get('[data-cy="delete-confirm-button"]').should("be.visible")
  })
})
