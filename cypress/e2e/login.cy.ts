/**
 * Login
 * - should display login page correctly
 * - should display error message when username is empty
 * - should display error message when password is empty
 * - should display toast error when username and password are wrong
 * - should display home page when username and password are correct
 * - should not be able to visit login page when already logged in
 * - should not be able to visit register page when already logged in
 */
describe('Login', () => {
  beforeEach(() => {
    cy.visit('/login')
  })

  it('should display login page correctly', () => {
    cy.get('form input[placeholder*=email i]').should('be.visible')
    cy.get('form input[placeholder*=password i]').should('be.visible')
    cy.get('form button[type=submit]')
      .should('be.visible')
      .and('have.lengthOf', 1)
  })

  it('should display error message when username is empty', () => {
    cy.get('form button[type=submit]').click()
    cy.get('form input[placeholder*=email i]')
      .next()
      .contains(/invalid email/i)
      .should('be.visible')
      .and('have.class', 'text-destructive')
  })

  it('should display error message when password is empty', () => {
    cy.get('form input[placeholder*=email i]').type('example@test.com')
    cy.get('form button[type=submit]').click()
    cy.get('form input[placeholder*=password i]')
      .next()
      .contains(/String must contain at least 6 character\(s\)/i)
      .should('be.visible')
      .and('have.class', 'text-destructive')
  })

  it('should display toast error when username and password are wrong', () => {
    cy.get('form input[placeholder*=email i]').type('example@test.com')
    cy.get('form input[placeholder*=password i]').type('example')
    cy.get('form button[type=submit]').click()
    cy.get('.toast')
      .contains(/email or password is wrong/i)
      .should('be.visible')
  })

  it('should display home page when username and password are correct', () => {
    cy.get('form input[placeholder*=email i]').type('test1000@test.com')
    cy.get('form input[placeholder*=password i]').type('test1234')
    cy.get('form button[type=submit]').click()
    cy.url({ timeout: 6000 }).should('eq', `${Cypress.config().baseUrl}/home`)
  })

  it('should not be able to visit login page when already logged in', () => {
    cy.get('form input[placeholder*=email i]').type('test1000@test.com')
    cy.get('form input[placeholder*=password i]').type('test1234')
    cy.get('form button[type=submit]').click()
    cy.url({ timeout: 6000 }).should('eq', `${Cypress.config().baseUrl}/home`)
    cy.visit('/login')
    cy.url({ timeout: 6000 }).should('eq', `${Cypress.config().baseUrl}/home`)
  })

  it('should not be able to visit register page when already logged in', () => {
    cy.get('form input[placeholder*=email i]').type('test1000@test.com')
    cy.get('form input[placeholder*=password i]').type('test1234')
    cy.get('form button[type=submit]').click()
    cy.url({ timeout: 6000 }).should('eq', `${Cypress.config().baseUrl}/home`)
    cy.visit('/register')
    cy.url({ timeout: 6000 }).should('eq', `${Cypress.config().baseUrl}/home`)
  })
})
