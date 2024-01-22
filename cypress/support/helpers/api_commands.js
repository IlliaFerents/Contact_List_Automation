Cypress.Commands.add("apiRequest", (method, baseUrl, url = "", payload) => {
  cy.request({
    method: method,
    url: baseUrl + url,
    body: payload,
    headers: {
      Authorization: `Bearer ${Cypress.env("BEARER_TOKEN")}`,
      "Content-Type": "application/json",
    },
    failOnStatusCode: false,
    followRedirect: false,
  });
});
