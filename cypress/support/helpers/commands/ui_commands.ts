import * as UserData from "../random_data/user_data_helper";

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

Cypress.Commands.add("fillForm", { prevSubject: "element" }, ($form, inputs) => {
  cy.wrap($form, { log: false }).within(() => {
    Cypress._.forEach(inputs, (value, selector) => {
      cy.get(selector).type(value);
      cy.get(selector).should("have.value", value);
    });
  });
});
