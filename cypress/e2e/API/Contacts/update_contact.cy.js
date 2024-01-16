import * as ContactData from "../../../support/helpers/contact_data.js";
import { assertErrorMessagesAPI } from "../../../support/helpers/assertions.js";
const { faker } = require("@faker-js/faker");

const contactsApiURL = Cypress.env("contactsApiURL");

describe("Contact Update", () => {
  before(() => {
    cy.addContacts(3).then((createdContacts) => {
      cy.wrap(createdContacts[0]._id).as("contactOneID");
      cy.wrap(createdContacts[1]._id).as("contactTwoID");
      cy.wrap(createdContacts[2]._id).as("contactThreeID");
    });
  });
  it("updates an existing contact with random data", function () {
    cy.GETcontactByID(contactsApiURL, this.contactOneID).then((response) => {
      const originalContactData = response.body;

      cy.updateContactDataByID(contactsApiURL, ContactData.validValues, this.contactOneID).then(
        (response) => {
          expect(response.status).to.eq(200);
          expect(response.body).not.to.deep.equal(originalContactData);
          expect(response.body).to.deep.include(ContactData.validValues);
        }
      );
    });
  });
});
