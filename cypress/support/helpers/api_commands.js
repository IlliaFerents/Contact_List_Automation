Cypress.Commands.add("POSTrequest", (path, payload) => {
  cy.request({
    method: "POST",
    url: Cypress.env("apiURL") + path,
    body: payload,
    headers: {
      Authorization: `Bearer ${Cypress.env("token")}`,
      "Content-Type": "application/json",
    },
    failOnStatusCode: false,
    followRedirect: false,
  });
});
