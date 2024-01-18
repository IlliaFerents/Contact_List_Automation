import * as ContactData from "../../../support/helpers/contact_data_helper.js";
import { assertAPIerrorMessages } from "../../../support/helpers/assertions.js";
const { faker } = require("@faker-js/faker");

const contactsApiURL = Cypress.env("contactsApiURL");

describe("Contact Partial Update", () => {
  before(() => {
    cy.deleteAllContacts();
  });
  beforeEach(() => {
    cy.addMultipleContacts(1).then((createdContact) => {
      cy.wrap(createdContact[0]._id).as("contactID");
    });
  });
  it("patches an existing contact with random data", function () {
    cy.getContactByID(this.contactID).then((response) => {
      const originalContactData = response.body;

      cy.patchContactByID(ContactData.requiredOnlyFields, this.contactID).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).not.to.deep.equal(originalContactData);

        cy.getContactByID(this.contactID).then((response) => {
          expect(response.body).to.deep.include(ContactData.requiredOnlyFields);
        });
      });
    });
  });
  it("patches all properties of an existing contact", function () {
    cy.getContactByID(this.contactID).then((response) => {
      const originalContactData = response.body;

      cy.patchContactByID(ContactData.validValues, this.contactID).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).not.to.deep.equal(originalContactData);

        cy.getContactByID(this.contactID).then((response) => {
          expect(response.body).to.deep.include(ContactData.validValues);
        });
      });
    });
  });
  it("patches existing contact with missing required fields", function () {
    cy.getContactByID(this.contactID).then((response) => {
      const originalContactData = response.body;

      cy.patchContactByID(
        {
          email: ContactData.validValues.email,
          phone: ContactData.validValues.phone,
        },
        this.contactID
      ).then((response) => {
        expect(response.status).to.eq(200);

        cy.getContactByID(this.contactID).then((response) => {
          expect(response.body).to.deep.include({
            email: ContactData.validValues.email,
            phone: ContactData.validValues.phone,
          });
        });
      });
    });
  });
  it("returns unmodified contact for request with invalid keys", function () {
    cy.getContactByID(this.contactID).then((response) => {
      const originalContactData = response.body;

      cy.patchContactByID(
        {
          firstname: ContactData.validValues.firstName,
          lastname: ContactData.validValues.lastName,
          Phone: ContactData.validValues.phone,
        },
        this.contactID
      ).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.deep.include(originalContactData);
      });
    });
  });
  it("returns error messages for patching existing contact with invalid data", function () {
    cy.getContactByID(this.contactID).then((response) => {
      const originalContactData = response.body;

      cy.patchContactByID(ContactData.invalidValues, this.contactID).then((response) => {
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
