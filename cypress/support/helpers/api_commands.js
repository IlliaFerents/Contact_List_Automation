import * as ContactData from "./contact_data_helper.js";
const contactsApiURL = Cypress.env("contactsApiURL");

Cypress.Commands.add("addContact", (payload) => {
  cy.request({
    method: "POST",
    url: contactsApiURL,
    body: payload,
    headers: {
      Authorization: `Bearer ${Cypress.env("token")}`,
      "Content-Type": "application/json",
    },
    failOnStatusCode: false,
    followRedirect: false,
  });
});

Cypress.Commands.add("getAllContacts", () => {
  cy.request({
    method: "GET",
    url: contactsApiURL,
    headers: {
      Authorization: `Bearer ${Cypress.env("token")}`,
      "Content-Type": "application/json",
    },
    failOnStatusCode: false,
    followRedirect: false,
  });
});

Cypress.Commands.add("getContactByID", (id) => {
  cy.request({
    method: "GET",
    url: contactsApiURL + id,
    headers: {
      Authorization: `Bearer ${Cypress.env("token")}`,
      "Content-Type": "application/json",
    },
    failOnStatusCode: false,
    followRedirect: false,
  });
});

Cypress.Commands.add("updateContactByID", (payload, id) => {
  cy.request({
    method: "PUT",
    url: contactsApiURL + id,
    body: payload,
    headers: {
      Authorization: `Bearer ${Cypress.env("token")}`,
      "Content-Type": "application/json",
    },
    failOnStatusCode: false,
    followRedirect: false,
  });
});

Cypress.Commands.add("patchContactByID", (payload, id) => {
  cy.request({
    method: "PATCH",
    url: contactsApiURL + id,
    body: payload,
    headers: {
      Authorization: `Bearer ${Cypress.env("token")}`,
      "Content-Type": "application/json",
    },
    failOnStatusCode: false,
    followRedirect: false,
  });
});

Cypress.Commands.add("deleteContactByID", (id) => {
  cy.request({
    method: "DELETE",
    url: contactsApiURL + id,
    headers: {
      Authorization: `Bearer ${Cypress.env("token")}`,
      "Content-Type": "application/json",
    },
    failOnStatusCode: false,
    followRedirect: false,
  });
});

Cypress.Commands.add("deleteMultipleContacts", (ids) => {
  ids.forEach((id) => {
    cy.request({
      method: "DELETE",
      url: contactsApiURL + id,
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
    url: contactsApiURL,
    headers: {
      Authorization: `Bearer ${Cypress.env("token")}`,
      "Content-Type": "application/json",
    },
  }).then((response) => {
    response.body.forEach((contact) => {
      cy.request({
        method: "DELETE",
        url: `${contactsApiURL}${contact._id}`,
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
    cy.addContact(ContactData.generateValidValues()).then((response) => {
      createdContacts.push(response.body);
    });
  }
  return cy.wrap(createdContacts);
});
