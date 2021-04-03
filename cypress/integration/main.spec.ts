it('opens the app', () => {
  cy.visit('/').get('nav h1').should('be.visible');
});
