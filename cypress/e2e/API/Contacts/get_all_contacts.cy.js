import * as ContactData from "../../../support/helpers/contact_data_helper.js";

describe("Contact Search", { tags: ["@api", "@contact"] }, () => {
  context("GET /contacts", () => {
    beforeEach(() => {
      cy.wrap(ContactData.validValues).as("validPayload");
      cy.deleteAllContacts();
    });
    it("retrieves a list of all contacts", { tags: ["@smoke"] }, function () {
      cy.addMultipleContacts(4);

      cy.getAllContacts().then((response) => {
        expect(response.status).to.eq(200);

        expect(response.body.length).to.eq(4);
        response.body.forEach((contact) => {
          expect(Object.keys(contact)).to.include.members(Object.keys(this.validPayload));
        });
      });
    });
    it("retrieves an empty list when no contacts added", () => {
      cy.getAllContacts().then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.length).to.eq(0);
      });
    });
  });
});
