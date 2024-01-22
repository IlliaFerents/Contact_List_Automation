import * as ContactData from "../../../support/helpers/contact_data_helper.js";

describe("Contact Flow", () => {
  beforeEach(() => {
    cy.deleteAllContacts();

    const originalPayload = ContactData.generateValidValues();
    const updatePayload = {
      firstName: ContactData.validValues.firstName,
      lastName: ContactData.validValues.lastName,
      email: ContactData.validValues.email,
    };
    cy.wrap(originalPayload).as("originalPayload");
    cy.wrap(updatePayload).as("updatePayload");

    cy.addContact(originalPayload).then((response) => {
      cy.wrap(response.body).as("originalContactData");
      cy.wrap(response.body._id).as("contactID");
    });
  });
  it("creates, gets, updates, and deletes a contact", { tags: ["@smoke", "@api"] }, function () {
    cy.getContactByID(this.contactID).as("getContact");
    cy.get("@getContact").then((getResponse) => {
      expect(getResponse.status).to.eq(200);
      expect(this.originalContactData).to.deep.include(this.originalPayload);
    });

    cy.updateContactByID(this.contactID, this.updatePayload).as("updateContact");
    cy.get("@updateContact").then((updateResponse) => {
      expect(updateResponse.status).to.eq(200);
    });

    cy.getContactByID(this.contactID).as("getUpdatedContact");
    cy.get("@getUpdatedContact").then((getUpdatedResponse) => {
      expect(getUpdatedResponse.status).to.eq(200);
      expect(getUpdatedResponse.body).not.to.deep.equal(this.originalContactData);
      expect(getUpdatedResponse.body).to.deep.include(this.updatePayload);
    });

    cy.deleteContactByID(this.contactID).as("deleteContact");
    cy.get("@deleteContact").then((deleteResponse) => {
      expect(deleteResponse.status).to.eq(200);
    });

    cy.getContactByID(this.contactID).as("getDeletedContact");
    cy.get("@getDeletedContact").then((getDeletedResponse) => {
      expect(getDeletedResponse.status).to.eq(404);
    });
  });
});
