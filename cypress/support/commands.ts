import "./commands"

declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>
      logout(): Chainable<void>
      createPost(title: string, content: string): Chainable<void>
    }
  }
}

Cypress.Commands.add("login", (email: string, _password: string) => {
  const authData = {
    token: "mock-token-123",
    user: { id: "1", name: "Test User", email: email },
    createdAt: Date.now(),
  }

  cy.visit("/login")
  cy.window().then((win) => {
    win.localStorage.setItem("auth_data", JSON.stringify(authData))
  })
  cy.visit("/feed")
})

Cypress.Commands.add("logout", () => {
  cy.window().then((win) => {
    win.localStorage.removeItem("auth_data")
  })
  cy.visit("/login")
})

Cypress.Commands.add("createPost", (title: string, content: string) => {
  cy.get('[data-cy="composer-title"]').type(title)
  cy.get('[data-cy="composer-content"]').type(content)
  cy.get('[data-cy="composer-submit"]').click()
})
