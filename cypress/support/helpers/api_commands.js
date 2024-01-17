import * as ContactData from "./contact_data.js";

Cypress.Commands.add("addContact", (baseURL, payload) => {
  cy.request({
    method: "POST",
    url: baseURL,
    body: payload,
    headers: {
      Authorization: `Bearer ${Cypress.env("token")}`,
      "Content-Type": "application/json",
    },
    failOnStatusCode: false,
    followRedirect: false,
  });
});

Cypress.Commands.add("getAllContacts", (baseURL) => {
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

Cypress.Commands.add("getContactByID", (baseURL, id) => {
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

Cypress.Commands.add("updateContactByID", (baseURL, payload, id) => {
  cy.request({
    method: "PUT",
    url: baseURL + id,
    body: payload,
    headers: {
      Authorization: `Bearer ${Cypress.env("token")}`,
      "Content-Type": "application/json",
    },
    failOnStatusCode: false,
    followRedirect: false,
  });
});

Cypress.Commands.add("patchContactByID", (baseURL, payload, id) => {
  cy.request({
    method: "PATCH",
    url: baseURL + id,
    body: payload,
    headers: {
      Authorization: `Bearer ${Cypress.env("token")}`,
      "Content-Type": "application/json",
    },
    failOnStatusCode: false,
    followRedirect: false,
  });
});

Cypress.Commands.add("deleteContactByID", (baseURL, id) => {
  cy.request({
    method: "DELETE",
    url: baseURL + id,
    headers: {
      Authorization: `Bearer ${Cypress.env("token")}`,
      "Content-Type": "application/json",
    },
    failOnStatusCode: false,
    followRedirect: false,
  });
});

Cypress.Commands.add("deleteMultipleContacts", (baseURL, ids) => {
  ids.forEach((id) => {
    cy.request({
      method: "DELETE",
      url: baseURL + id,
      headers: {
        Authorization: `Bearer ${Cypress.env("token")}`,
        "Content-Type": "application/json",
      },
      failOnStatusCode: false,
      followRedirect: false,
    });
  });
});

Cypress.Commands.add("deleteAllContacts", () => {
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

Cypress.Commands.add("addMultipleContacts", (numOfContacts) => {
  const createdContacts = [];

  for (let i = 0; i < numOfContacts; i++) {
    cy.addContact(
      "https://thinking-tester-contact-list.herokuapp.com/contacts/",
      ContactData.validValues
    ).then((response) => {
      createdContacts.push(response.body);
    });
  }
  return cy.wrap(createdContacts);
});
