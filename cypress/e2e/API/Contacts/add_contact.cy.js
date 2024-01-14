import { randomContactData } from "../../../support/helpers/contact_utils.js";

const contactsApiURL = Cypress.env("contactsApiURL");

describe("Contact Creation", () => {
  it("creates a contact with random data", () => {
    cy.POSTrequest(contactsApiURL, "/", randomContactData).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.deep.include(randomContactData);
    });
  });
  it.only("returns error messages for request with missing required fields", () => {
    cy.POSTrequest(contactsApiURL, "/", {
      email: "test@test.com",
      phone: "22222222",
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.errors).to.have.keys("lastName", "firstName");
      expect(response.body.errors.lastName.message).to.eq("Path `lastName` is required.");
      expect(response.body.errors.firstName.message).to.eq("Path `firstName` is required.");
      expect(response.body.message).to.eq(
        "Contact validation failed: lastName: Path `lastName` is required., firstName: Path `firstName` is required.",
      );
    });
  });
});
