Cypress.Commands.add("getByID", (idValue, ...args) => {
  return cy.get(`#${idValue}`, ...args);
});

Cypress.Commands.add("login", (email, password) => {
  cy.session(
    [email, password],
    () => {
      cy.loginByApi(email, password);
    },
    {
      cacheAcrossSpecs: true,
      validate() {
        cy.getCookie("token").should("exist");
      },
    }
  );
});

Cypress.Commands.add("loginWithGeneratedUser", () => {
  const validUserData = UserData.generateValidValues();

  cy.addUser(validUserData).then((createdUser) => {
    const email = createdUser.body.user.email;
    const password = validUserData.password;
    cy.login(email, password);
  });
});
