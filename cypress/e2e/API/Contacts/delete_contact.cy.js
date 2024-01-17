const contactsApiURL = Cypress.env("contactsApiURL");

describe("Contact Deletion by ID", () => {
  before(() => {
    cy.deleteAllContacts();
  });
  it("deletes a contact by id", () => {
    cy.addMultipleContacts(1).then((createdContacts) => {
      const contactID = createdContacts[0]._id;

      cy.deleteContactByID(contactID).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.eq("Contact deleted");

        cy.getContactByID(contactID).then((response) => {
          expect(response.status).to.eq(404);
          expect(response.body).to.be.empty;
        });
      });
    });
  });
  it("deletes multiple contacts by their id's", () => {
    cy.addMultipleContacts(3).then((createdContacts) => {
      const contactIDs = createdContacts.map((contact) => contact._id);

      cy.deleteMultipleContacts(contactIDs);

      contactIDs.forEach((id) => {
        cy.getContactByID(id).then((response) => {
          expect(response.status).to.eq(404);
        });
      });
    });
  });
  it("returns error message for request with invalid id", () => {
    cy.deleteContactByID("abcde").then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.eq("Invalid Contact ID");
    });
  });
  it("returns empty response body for request with non-exsiting id", () => {
    cy.deleteContactByID("65a595402b31aa00139c1ff5").then((response) => {
      expect(response.status).to.eq(404);
      expect(response.body).to.be.empty;
    });
  });
});
