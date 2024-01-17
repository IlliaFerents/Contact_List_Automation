import * as ContactData from "../../../support/helpers/contact_data.js";
import { assertErrorMessagesAPI } from "../../../support/helpers/assertions.js";
const { faker } = require("@faker-js/faker");

const contactsApiURL = Cypress.env("contactsApiURL");

describe("Contact Creation", () => {
  it("creates a contact with random data", () => {
    cy.addContact(ContactData.validValues).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.deep.include(ContactData.validValues);
    });
  });
  it("returns error messages for request with missing required fields", () => {
    cy.addContact({
      email: ContactData.validValues.email,
      phone: ContactData.validValues.phone,
    }).then((response) => {
      expect(response.status).to.eq(400);
      assertErrorMessagesAPI(response, {
        lastName: "Path `lastName` is required.",
        firstName: "Path `firstName` is required.",
      });
    });
  });
  it("returns error messages for request with invalid data", () => {
    cy.addContact(ContactData.invalidValues).then((response) => {
      expect(response.status).to.eq(400);
      assertErrorMessagesAPI(response, {
        email: "Email is invalid",
        phone: "Phone number is invalid",
        birthdate: "Birthdate is invalid",
        postalCode: "Postal code is invalid",
      });
    });
  });
  it("returns error messages for request with fields values exceeding maximum length", () => {
    cy.addContact(ContactData.maxLenValues).then((response) => {
      expect(response.status).to.eq(400);
      assertErrorMessagesAPI(response, {
        firstName: `Path \`firstName\` (\`${ContactData.maxLenValues.firstName}\`) is longer than the maximum allowed length (20).`,
        lastName: `Path \`lastName\` (\`${ContactData.maxLenValues.lastName}\`) is longer than the maximum allowed length (20).`,
        phone: `Path \`phone\` (\`${ContactData.maxLenValues.phone}\`) is longer than the maximum allowed length (15).`,
        stateProvince: `Path \`stateProvince\` (\`${ContactData.maxLenValues.stateProvince}\`) is longer than the maximum allowed length (20).`,
        postalCode: `Path \`postalCode\` (\`${ContactData.maxLenValues.postalCode}\`) is longer than the maximum allowed length (10).`,
      });
    });
  });
});
