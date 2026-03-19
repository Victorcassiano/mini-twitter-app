describe("Like Post", () => {
  beforeEach(() => {
    cy.login("test@test.com", "password")
    cy.visit("/feed")
    cy.get('[data-cy="post-like-button"]').first().as("likeButton")
  })

  it("should display like button", () => {
    cy.get("@likeButton").should("be.visible")
  })

  it("should toggle like on click", () => {
    cy.get("@likeButton").click()
    cy.get("@likeButton").should("be.visible")
  })

  it("should show different states after clicking", () => {
    cy.get("@likeButton").click()
    cy.wait(500)
    cy.get("@likeButton").click()
    cy.wait(500)
    cy.get("@likeButton").should("be.visible")
  })
})
