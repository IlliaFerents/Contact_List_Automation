import { randomContactData } from "../../../support/helpers/contact_utils.js";

describe("Contact Creation", () => {
  before(function () {
    cy.wrap(randomContactData).as("payload");
  });
  it("creates a contact with random data", function () {
    cy.POSTrequest("/contacts", this.payload)
      .its("status")
      .should("equal", 201);
  });
});
