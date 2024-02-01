import * as ContactData from "../../../support/helpers/random_data/contact_data_helper.ts";

describe("Contact Flow", { tags: ["@api", "@contact"] }, () => {
  const initialContactPayload = ContactData.generateValidValues();
  const updatedContactPayload = {
    firstName: ContactData.validValues.firstName,
    lastName: ContactData.validValues.lastName,
    email: ContactData.validValues.email,
  };
  beforeEach(() => {
    cy.deleteAllContacts();

    cy.wrap(initialContactPayload).as("initialContactPayload");
    cy.wrap(updatedContactPayload).as("updatedContactPayload");

    cy.addContact(initialContactPayload).then((response) => {
      cy.wrap(response.body).as("createdContact");
      cy.wrap(response.body._id).as("contactID");
    });
  });
  it("creates, gets, updates, and deletes a contact", { tags: ["@smoke"] }, function () {
    cy.getContactByID(this.contactID).then((getResponse) => {
      expect(getResponse.status).to.eq(200);
      expect(this.createdContact).to.deep.include(this.initialContactPayload);
    });

    cy.updateContactByID(this.contactID, this.updatedContactPayload).then((updateResponse) => {
      expect(updateResponse.status).to.eq(200);
    });

    cy.getContactByID(this.contactID).then((getUpdatedResponse) => {
      expect(getUpdatedResponse.status).to.eq(200);
      expect(getUpdatedResponse.body).not.to.deep.equal(this.createdContact);
      expect(getUpdatedResponse.body).to.deep.include(this.updatedContactPayload);
    });

    cy.deleteContactByID(this.contactID).then((deleteResponse) => {
      expect(deleteResponse.status).to.eq(200);
    });

    cy.getContactByID(this.contactID).then((getDeletedResponse) => {
      expect(getDeletedResponse.status).to.eq(404);
    });
  });
});
