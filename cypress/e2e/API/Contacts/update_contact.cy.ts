import * as ContactData from "../../../support/helpers/random_data/contact_data_helper.ts";
import { assertAPIerrorMessages } from "../../../support/helpers/assertions.ts";

describe("Contact Update", { tags: ["@api", "@contact"] }, () => {
  context("PUT /contacts/:id", () => {
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
    it("updates an existing contact with random data", { tags: ["@smoke"] }, function () {
      cy.getContactByID(this.contactID).then((response) => {
        const originalContactData = response.body;

        cy.updateContactByID(this.contactID, this.validPayload).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).not.to.deep.equal(originalContactData);

          cy.getContactByID(this.contactID).then((response) => {
            expect(response.body).to.deep.include(this.validPayload);
          });
        });
      });
    });
    it("partially updates an existing contact", function () {
      cy.getContactByID(this.contactID).then((response) => {
        const originalContactData = response.body;

        cy.updateContactByID(this.contactID, this.requiredOnlyFieldsPayload).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).not.to.deep.equal(originalContactData);

          cy.getContactByID(this.contactID).then((response) => {
            expect(response.body).to.deep.include(this.requiredOnlyFieldsPayload);
          });
        });
      });
    });
    it(
      "error when updating an existing contact with missing required fields",
      { tags: ["@negative"] },
      function () {
        cy.getContactByID(this.contactID).then(() => {
          cy.updateContactByID(this.contactID, {
            email: this.validPayload.email,
            phone: this.validPayload.phone,
          }).then((response) => {
            expect(response.status).to.eq(400);
            assertAPIerrorMessages(response, {
              lastName: "Path `lastName` is required.",
              firstName: "Path `firstName` is required.",
            });
          });
        });
      }
    );
    it(
      "error when updating an existing contact with invalid data",
      { tags: ["@negative"] },
      function () {
        cy.getContactByID(this.contactID).then(() => {
          cy.updateContactByID(this.contactID, this.invalidPayload).then((response) => {
            expect(response.status).to.eq(400);
            assertAPIerrorMessages(response, {
              email: "Email is invalid",
              phone: "Phone number is invalid",
              birthdate: "Birthdate is invalid",
              postalCode: "Postal code is invalid",
            });
          });
        });
      }
    );
    it(
      "error when updating an existing contact with invalid keys",
      { tags: ["@negative"] },
      function () {
        cy.getContactByID(this.contactID).then(() => {
          cy.updateContactByID(this.contactID, {
            firstname: this.validPayload.firstName,
            lastname: this.validPayload.lastName,
            Phone: this.validPayload.phone,
          }).then((response) => {
            expect(response.status).to.eq(400);
            assertAPIerrorMessages(response, {
              lastName: "Path `lastName` is required.",
              firstName: "Path `firstName` is required.",
            });
          });
        });
      }
    );
  });
});
