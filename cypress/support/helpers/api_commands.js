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

Cypress.Commands.add("GETallContacts", (baseURL) => {
  cy.request({
    method: "GET",
    url: baseURL,
    headers: {
      Authorization: `Bearer ${Cypress.env("token")}`,
      "Content-Type": "application/json",
    },
    failOnStatusCode: false,
    followRedirect: false,
  });
});

Cypress.Commands.add("GETcontactByID", (baseURL, id) => {
  cy.request({
    method: "GET",
    url: baseURL + id,
    headers: {
      Authorization: `Bearer ${Cypress.env("token")}`,
      "Content-Type": "application/json",
    },
    failOnStatusCode: false,
    followRedirect: false,
  });
});

Cypress.Commands.add("DELETEallContacts", () => {
  cy.request({
    method: "GET",
    url: "https://thinking-tester-contact-list.herokuapp.com/contacts",
    headers: {
      Authorization: `Bearer ${Cypress.env("token")}`,
      "Content-Type": "application/json",
    },
  }).then((response) => {
    response.body.forEach((contact) => {
      cy.request({
        method: "DELETE",
        url: `https://thinking-tester-contact-list.herokuapp.com/contacts/${contact._id}`,
        headers: {
          Authorization: `Bearer ${Cypress.env("token")}`,
          "Content-Type": "application/json",
        },
        failOnStatusCode: false,
      });
    });
  });
});

Cypress.Commands.add("addContacts", (numOfContacts) => {
  for (let i = 0; i < numOfContacts; i++) {
    cy.POSTrequest(
      "https://thinking-tester-contact-list.herokuapp.com/contacts/",
      ContactData.validValues
    );
  }
});
