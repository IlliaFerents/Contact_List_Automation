const contactsApiURL = Cypress.env("contactsApiURL");

describe("Contact Search by ID", () => {
  before(() => {
    cy.DELETEallContacts();
  });
  it("retrieves a contact by id", function () {
    cy.addContacts(1).then((createdContacts) => {
      const contactID = createdContacts[0]._id;

      cy.GETcontactByID(contactsApiURL, contactID).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body._id).to.eq(contactID);
      });
    });
  });
  it("returns error message for request with invalid id", () => {
    cy.GETcontactByID(contactsApiURL, "abcde").then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.eq("Invalid Contact ID");
    });
  });
  it("returns empty response body for request with non-exsiting id", () => {
    cy.GETcontactByID(contactsApiURL, "65a595402b31aa00139c1ff5").then((response) => {
      expect(response.status).to.eq(404);
      expect(response.body).to.be.empty;
    });
  });
});
