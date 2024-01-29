import * as ContactData from "../../../support/helpers/random_data/contact_data_helper.js";
import { assertAPIerrorMessages } from "../../../support/helpers/assertions.js";

describe("Contact Creation", { tags: ["@api", "@contact"] }, () => {
  context("POST /contacts", () => {
    beforeEach(function () {
      cy.wrap(ContactData.validValues).as("validPayload");
      cy.wrap(ContactData.invalidValues).as("invalidPayload");
      cy.wrap(ContactData.maxLenValues).as("invalidValueLengthPayload");
      cy.wrap(ContactData.invalidKeys).as("invalidKeysPayload");
    });
    it("creates a contact with random data", { tags: ["@smoke"] }, function () {
      cy.addContact(this.validPayload).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.deep.include(this.validPayload);

        const contactID = response.body._id;

        cy.getContactByID(contactID).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body._id).to.eq(contactID);
        });
      });
    });
    it("error when adding contact with missing required fields", function () {
      cy.addContact({
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
    it("error when adding contact with with invalid data", function () {
      cy.addContact(this.invalidPayload).then((response) => {
        expect(response.status).to.eq(400);
        assertAPIerrorMessages(response, {
          email: "Email is invalid",
          phone: "Phone number is invalid",
          birthdate: "Birthdate is invalid",
          postalCode: "Postal code is invalid",
        });
      });
    });
    it("error when adding contact with field values exceeding maximum length", function () {
      cy.addContact(this.invalidValueLengthPayload).then((response) => {
        expect(response.status).to.eq(400);
        assertAPIerrorMessages(response, {
          firstName: `Path \`firstName\` (\`${ContactData.maxLenValues.firstName}\`) is longer than the maximum allowed length (20).`,
          lastName: `Path \`lastName\` (\`${ContactData.maxLenValues.lastName}\`) is longer than the maximum allowed length (20).`,
          phone: `Path \`phone\` (\`${ContactData.maxLenValues.phone}\`) is longer than the maximum allowed length (15).`,
          stateProvince: `Path \`stateProvince\` (\`${ContactData.maxLenValues.stateProvince}\`) is longer than the maximum allowed length (20).`,
          postalCode: `Path \`postalCode\` (\`${ContactData.maxLenValues.postalCode}\`) is longer than the maximum allowed length (10).`,
        });
      });
    });
    it("error when adding contact with invalid keys", function () {
      cy.addContact(this.invalidKeysPayload).then((response) => {
        expect(response.status).to.eq(400);
        assertAPIerrorMessages(response, {
          lastName: "Path `lastName` is required.",
          firstName: "Path `firstName` is required.",
        });
      });
    });
  });
});
