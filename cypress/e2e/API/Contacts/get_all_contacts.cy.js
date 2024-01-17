import * as ContactData from "../../../support/helpers/contact_data.js";
const contactsApiURL = Cypress.env("contactsApiURL");

describe("Contact Search", () => {
  beforeEach(() => {
    cy.deleteAllContacts();
  });
  it("retrieves a list of all contacts", () => {
    cy.addMultipleContacts(4);

    cy.getAllContacts().then((response) => {
      expect(response.status).to.eq(200);

      expect(response.body.length).to.eq(4);
      response.body.forEach((contact) => {
        expect(Object.keys(contact)).to.include.members(Object.keys(ContactData.validValues));
      });
    });
  });
  it("retrieves an empty list when no contacts added", () => {
    cy.getAllContacts().then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.length).to.eq(0);
    });
  });
});
