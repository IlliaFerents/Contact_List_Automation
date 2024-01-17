const contactsApiURL = Cypress.env("contactsApiURL");

describe("Contact Search by ID", () => {
  before(() => {
    cy.deleteAllContacts();
  });
  it("retrieves a contact by id", function () {
    cy.addMultipleContacts(1).then((createdContacts) => {
      const contactID = createdContacts[0]._id;

      cy.getContactByID(contactsApiURL, contactID).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body._id).to.eq(contactID);
      });
    });
  });
  it("returns error message for request with invalid id", () => {
    cy.getContactByID(contactsApiURL, "abcde").then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.eq("Invalid Contact ID");
    });
  });
  it("returns empty response body for request with non-exsiting id", () => {
    cy.getContactByID(contactsApiURL, "65a595402b31aa00139c1ff5").then((response) => {
      expect(response.status).to.eq(404);
      expect(response.body).to.be.empty;
    });
  });
});
