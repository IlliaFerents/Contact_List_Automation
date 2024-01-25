describe("Contact Search by ID", () => {
  context("GET /contacts/:id", () => {
    before(() => {
      cy.deleteAllContacts();
    });
    it("retrieves a contact by id", { tags: ["@smoke", "@api"] }, function () {
      cy.addMultipleContacts(1).then((createdContacts) => {
        const contactID = createdContacts[0]._id;

        cy.getContactByID(contactID).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body._id).to.eq(contactID);
        });
      });
    });
    it("error when retrieving a contact with invalid id", { tags: ["@api"] }, () => {
      cy.getContactByID("abcde").then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.eq("Invalid Contact ID");
      });
    });
    it("error when retrieving a contact with non-exsiting id", { tags: ["@api"] }, () => {
      cy.getContactByID("65a595402b31aa00139c1ff5").then((response) => {
        expect(response.status).to.eq(404);
        expect(response.body).to.be.empty;
      });
    });
  });
});
