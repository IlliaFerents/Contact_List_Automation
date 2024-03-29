import * as ContactData from "../random_data/contact_data_helper.js";
import ApiRequest from "./api_commands.js";

const api = new ApiRequest(Cypress.env("CONTACTS_API_URL"));

Cypress.Commands.add("addContact", (payload) => {
  api.request("POST", "", payload);
});

Cypress.Commands.add("getAllContacts", () => {
  api.request("GET");
});

Cypress.Commands.add("getContactByID", (id) => {
  api.request("GET", id);
});

Cypress.Commands.add("updateContactByID", (id, payload) => {
  api.request("PUT", id, payload);
});

Cypress.Commands.add("patchContactByID", (id, payload) => {
  api.request("PATCH", id, payload);
});

Cypress.Commands.add("deleteContactByID", (id) => {
  api.request("DELETE", id);
});

Cypress.Commands.add("deleteMultipleContacts", (ids) => {
  ids.forEach((id) => {
    cy.deleteContactByID(id);
  });
});

Cypress.Commands.add("deleteAllContacts", () => {
  cy.getAllContacts().then((response) => {
    response.body.forEach((contact) => {
      cy.deleteContactByID(contact._id);
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
