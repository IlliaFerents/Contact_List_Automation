const contactsApiURL = Cypress.env("contactsApiURL");

describe("Contact Deletion by ID", () => {
  before(() => {
    cy.DELETEallContacts();
  });
  it("deletes a contact by id", () => {
    cy.addContacts(1).then((createdContacts) => {
      const contactID = createdContacts[0]._id;

      cy.DELETEcontactByID(contactsApiURL, contactID).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.eq("Contact deleted");

        cy.GETcontactByID(contactsApiURL, contactID).then((response) => {
          expect(response.status).to.eq(404);
          expect(response.body).to.be.empty;
        });
      });
    });
  });
  it("deletes multiple contacts by their id's", () => {
    cy.addContacts(3).then((createdContacts) => {
      const contactIDs = createdContacts.map((contact) => contact._id);

      cy.DELETEmultipleContactsByID(contactsApiURL, contactIDs);

      contactIDs.forEach((id) => {
        cy.GETcontactByID(contactsApiURL, id).then((response) => {
          expect(response.status).to.eq(404);
        });
      });
    });
  });
  it("returns error message for request with invalid id", () => {
    cy.DELETEcontactByID(contactsApiURL, "abcde").then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.eq("Invalid Contact ID");
    });
  });
  it("returns empty response body for request with non-exsiting id", () => {
    cy.DELETEcontactByID(contactsApiURL, "65a595402b31aa00139c1ff5").then((response) => {
      expect(response.status).to.eq(404);
      expect(response.body).to.be.empty;
    });
  });
});
