import * as ContactData from "../../../support/helpers/contact_data_helper.js";
import { assertAPIerrorMessages } from "../../../support/helpers/assertions.js";

describe("Contact Partial Update", { tags: ["@api", "@contact"] }, () => {
  context("PATCH /contacts:id", () => {
    before(() => {
      cy.deleteAllContacts();
    });
    beforeEach(() => {
      cy.wrap(ContactData.validValues).as("validPayload");
      cy.wrap(ContactData.invalidValues).as("invalidPayload");
      cy.wrap(ContactData.requiredOnlyFields).as("requiredOnlyFieldsPayload");

      cy.addMultipleContacts(1).then((createdContact) => {
        cy.wrap(createdContact[0]._id).as("contactID");
      });
    });
    it("patches an existing contact with random data", { tags: ["@smoke"] }, function () {
      cy.getContactByID(this.contactID).then((response) => {
        const originalContactData = response.body;

        cy.patchContactByID(this.contactID, this.requiredOnlyFieldsPayload).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).not.to.deep.equal(originalContactData);

          cy.getContactByID(this.contactID).then((response) => {
            expect(response.body).to.deep.include(this.requiredOnlyFieldsPayload);
          });
        });
      });
    });
    it("patches all properties of an existing contact", function () {
      cy.getContactByID(this.contactID).then((response) => {
        const originalContactData = response.body;

        cy.patchContactByID(this.contactID, this.validPayload).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).not.to.deep.equal(originalContactData);

          cy.getContactByID(this.contactID).then((response) => {
            expect(response.body).to.deep.include(this.validPayload);
          });
        });
      });
    });
    it("patches existing contact with missing required fields", function () {
      cy.getContactByID(this.contactID).then(() => {
        cy.patchContactByID(this.contactID, {
          email: this.validPayload.email,
          phone: this.validPayload.phone,
        }).then((response) => {
          expect(response.status).to.eq(200);

          cy.getContactByID(this.contactID).then((response) => {
            expect(response.body).to.deep.include({
              email: this.validPayload.email,
              phone: this.validPayload.phone,
            });
          });
        });
      });
    });
    it("returns unmodified contact when patching a contact with invalid keys", function () {
      cy.getContactByID(this.contactID).then((response) => {
        const originalContactData = response.body;

        cy.patchContactByID(this.contactID, {
          firstname: this.validPayload.firstName,
          lastname: this.validPayload.lastName,
          Phone: this.validPayload.phone,
        }).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.deep.include(originalContactData);
        });
      });
    });
    it("error when patching existing contact with invalid data", function () {
      cy.getContactByID(this.contactID).then(() => {
        cy.patchContactByID(this.contactID, this.invalidPayload).then((response) => {
          expect(response.status).to.eq(400);
          assertAPIerrorMessages(response, {
            email: "Email is invalid",
            phone: "Phone number is invalid",
            birthdate: "Birthdate is invalid",
            postalCode: "Postal code is invalid",
          });
        });
      });
    });
  });
});
