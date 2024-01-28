import * as ContactData from "../../../support/helpers/contact_data_helper.js";
import { assertAPIerrorMessages } from "../../../support/helpers/assertions.js";

describe("Contact Update", { tags: ["@api", "@contact"] }, () => {
  context("PUT /contacts/:id", () => {
    before(() => {
      cy.deleteAllContacts();
    });
    beforeEach(() => {
      cy.addMultipleContacts(1).then((createdContact) => {
        cy.wrap(createdContact[0]._id).as("contactID");
      });
    });
    it("updates an existing contact with random data", { tags: ["@smoke"] }, function () {
      cy.getContactByID(this.contactID).then((response) => {
        const originalContactData = response.body;

        cy.updateContactByID(this.contactID, ContactData.validValues).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).not.to.deep.equal(originalContactData);

          cy.getContactByID(this.contactID).then((response) => {
            expect(response.body).to.deep.include(ContactData.validValues);
          });
        });
      });
    });
    it("partially updates an existing contact", function () {
      cy.getContactByID(this.contactID).then((response) => {
        const originalContactData = response.body;

        cy.updateContactByID(this.contactID, ContactData.requiredOnlyFields).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).not.to.deep.equal(originalContactData);

          cy.getContactByID(this.contactID).then((response) => {
            expect(response.body).to.deep.include(ContactData.requiredOnlyFields);
          });
        });
      });
    });
    it(
      "error when updating an existing contact with missing required fields",
      { tags: ["@api"] },
      function () {
        cy.getContactByID(this.contactID).then((response) => {
          const originalContactData = response.body;

          cy.updateContactByID(this.contactID, {
            email: ContactData.validValues.email,
            phone: ContactData.validValues.phone,
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
      { tags: ["@api"] },
      function () {
        cy.getContactByID(this.contactID).then((response) => {
          const originalContactData = response.body;

          cy.updateContactByID(this.contactID, ContactData.invalidValues).then((response) => {
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
      { tags: ["@api"] },
      function () {
        cy.getContactByID(this.contactID).then((response) => {
          const originalContactData = response.body;

          cy.updateContactByID(this.contactID, {
            firstname: ContactData.validValues.firstName,
            lastname: ContactData.validValues.lastName,
            Phone: ContactData.validValues.phone,
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
