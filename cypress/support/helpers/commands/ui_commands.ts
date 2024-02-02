Cypress.Commands.add("getByID", (idValue, ...args) => {
  return cy.get(`#${idValue}`, ...args);
});
