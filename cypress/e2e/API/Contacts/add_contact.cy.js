import * as ContactData from "../../../support/helpers/contact_data_helper.js";
import { assertAPIerrorMessages } from "../../../support/helpers/assertions.js";

describe("Contact Creation", { tags: ["@api", "@contact"] }, () => {
  context("POST /contacts", () => {
    it("creates a contact with random data", { tags: ["@smoke"] }, () => {
      cy.addContact(ContactData.validValues).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.deep.include(ContactData.validValues);

        const contactID = response.body._id;

        cy.getContactByID(contactID).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body._id).to.eq(contactID);
        });
      });
    });
    it("error when adding contact with missing required fields", () => {
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
    it("error when adding contact with with invalid data", () => {
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
    it("error when adding contact with field values exceeding maximum length", () => {
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
    });
    it("error when adding contact with invalid keys", () => {
      cy.addContact(ContactData.invalidKeys).then((response) => {
        expect(response.status).to.eq(400);
        assertAPIerrorMessages(response, {
          lastName: "Path `lastName` is required.",
          firstName: "Path `firstName` is required.",
        });
      });
    });
  });
});
