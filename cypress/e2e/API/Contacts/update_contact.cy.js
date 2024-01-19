import * as ContactData from "../../../support/helpers/contact_data_helper.js";
import { assertAPIerrorMessages } from "../../../support/helpers/assertions.js";
const { faker } = require("@faker-js/faker");

const contactsApiURL = Cypress.env("contactsApiURL");

describe("Contact Update", () => {
  context("PUT /contacts/:id", () => {
    before(() => {
      cy.deleteAllContacts();
    });
    beforeEach(() => {
      cy.addMultipleContacts(1).then((createdContact) => {
        cy.wrap(createdContact[0]._id).as("contactID");
      });
    });
    it("updates an existing contact with random data", { tags: ["@smoke", "@api"] }, function () {
      cy.getContactByID(this.contactID).then((response) => {
        const originalContactData = response.body;

        cy.updateContactByID(ContactData.validValues, this.contactID).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).not.to.deep.equal(originalContactData);

          cy.getContactByID(this.contactID).then((response) => {
            expect(response.body).to.deep.include(ContactData.validValues);
          });
        });
      });
    });
    it("updates an existing contact with incomplete data", { tags: ["@api"] }, function () {
      cy.getContactByID(this.contactID).then((response) => {
        const originalContactData = response.body;

        cy.updateContactByID(ContactData.requiredOnlyFields, this.contactID).then((response) => {
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

          cy.updateContactByID(
            {
              email: ContactData.validValues.email,
              phone: ContactData.validValues.phone,
            },
            this.contactID
          ).then((response) => {
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

          cy.updateContactByID(ContactData.invalidValues, this.contactID).then((response) => {
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

          cy.updateContactByID(
            {
              firstname: ContactData.validValues.firstName,
              lastname: ContactData.validValues.lastName,
              Phone: ContactData.validValues.phone,
            },
            this.contactID
          ).then((response) => {
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
