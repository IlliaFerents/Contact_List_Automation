const contactsApiURL = Cypress.env("contactsApiURL");

describe("Contact Search by ID", () => {
  before(() => {
    cy.DELETEallContacts();
  });
  it("retrieves a contact by id", function () {
    cy.addContacts(1).then((response) => {
      const contactID = response.body._id;

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
  it("returns error message for request with non-exsiting id", () => {
    cy.GETcontactByID(contactsApiURL, "65a595402b31aa00139c1ff5").then((response) => {
      expect(response.status).to.eq(404);
      expect(response.body).to.be.empty;
    });
  });
  it.only("returns empty array for request with special characters in id", () => {
    cy.GETcontactByID(contactsApiURL, "#?/.").then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.deep.equal([]);
    });
  });
});
