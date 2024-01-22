import * as ContactData from "./contact_data_helper.js";

const contactsApiURL = Cypress.env("CONTACTS_API_URL");

Cypress.Commands.add("addContact", (payload) => {
  cy.apiRequest("POST", contactsApiURL, "", payload);
});

Cypress.Commands.add("getAllContacts", () => {
  cy.apiRequest("GET", contactsApiURL);
});

Cypress.Commands.add("getContactByID", (id) => {
  cy.apiRequest("GET", contactsApiURL, id);
});

Cypress.Commands.add("updateContactByID", (id, payload) => {
  cy.apiRequest("PUT", contactsApiURL, id, payload);
});

Cypress.Commands.add("patchContactByID", (id, payload) => {
  cy.apiRequest("PATCH", contactsApiURL, id, payload);
});

Cypress.Commands.add("deleteContactByID", (id) => {
  cy.apiRequest("DELETE", contactsApiURL, id);
});

Cypress.Commands.add("deleteMultipleContacts", (ids) => {
  ids.forEach((id) => {
    cy.deleteContactByID(id);
  });
});

Cypress.Commands.add("deleteAllContacts", () => {
  cy.getAllContacts(contactsApiURL).then((response) => {
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
