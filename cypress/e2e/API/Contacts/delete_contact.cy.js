describe("User Deletion", () => {
  it("deletes user", function () {
    cy.request({
      method: "GET",
      url: "https://thinking-tester-contact-list.herokuapp.com/contacts/1",
      headers: {
        Authorization: `Bearer ${Cypress.env("token")}`,
        "Content-Type": "application/json",
      },
    }).then((response) => {
      cy.log(response);
    });
  });
});
