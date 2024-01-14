Cypress.Commands.add("POSTrequest", (baseURL, path, payload) => {
  cy.request({
    method: "POST",
    url: baseURL + path,
    body: payload,
    headers: {
      Authorization: `Bearer ${Cypress.env("token")}`,
      "Content-Type": "application/json",
    },
    failOnStatusCode: false,
    followRedirect: false,
  });
});