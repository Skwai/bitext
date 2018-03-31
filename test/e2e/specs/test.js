// https://docs.cypress.io/api/introduction/api.html

describe('App', () => {
  it('Submits the form', () => {
    cy.visit(Cypress.env('VUE_DEV_SERVER_URL'))
    cy.get('#App')
    cy.get('form')
    cy.get('#AppForm__CountryCode').select('+61')
    cy.get('#AppForm__PhoneNumber').type('412345678')
    cy.get('#AppForm__Price').type(5000000)
    cy.get('button').click()
  })
})
