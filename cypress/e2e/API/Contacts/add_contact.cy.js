import * as ContactData from "../../../support/helpers/contact_data_helper.js";
import { assertAPIerrorMessages } from "../../../support/helpers/assertions.js";
const { faker } = require("@faker-js/faker");

const contactsApiURL = Cypress.env("contactsApiURL");

describe("Contact Creation", () => {
  context("POST /contacts", () => {
    it("creates a contact with random data", { tags: ["@smoke", "@api"] }, () => {
      cy.addContact(ContactData.validValues).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.deep.include(ContactData.validValues);
      });
    });
    it("error when adding contact with missing required fields", { tags: ["@api"] }, () => {
      cy.addContact({
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
    it("error when adding contact with with invalid data", { tags: ["@api"] }, () => {
      cy.addContact(ContactData.invalidValues).then((response) => {
        expect(response.status).to.eq(400);
        assertAPIerrorMessages(response, {
          email: "Email is invalid",
          phone: "Phone number is invalid",
          birthdate: "Birthdate is invalid",
          postalCode: "Postal code is invalid",
        });
      });
    });
    it(
      "error when adding contact with field values exceeding maximum length",
      { tags: ["@api"] },
      () => {
        cy.addContact(ContactData.maxLenValues).then((response) => {
          expect(response.status).to.eq(400);
          assertAPIerrorMessages(response, {
            firstName: `Path \`firstName\` (\`${ContactData.maxLenValues.firstName}\`) is longer than the maximum allowed length (20).`,
            lastName: `Path \`lastName\` (\`${ContactData.maxLenValues.lastName}\`) is longer than the maximum allowed length (20).`,
            phone: `Path \`phone\` (\`${ContactData.maxLenValues.phone}\`) is longer than the maximum allowed length (15).`,
            stateProvince: `Path \`stateProvince\` (\`${ContactData.maxLenValues.stateProvince}\`) is longer than the maximum allowed length (20).`,
            postalCode: `Path \`postalCode\` (\`${ContactData.maxLenValues.postalCode}\`) is longer than the maximum allowed length (10).`,
          });
        });
      }
    );
    it("error when adding contact with invalid keys", { tags: ["@api"] }, () => {
      cy.addContact({
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
  });
});
