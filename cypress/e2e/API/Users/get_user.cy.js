describe("Users Search", () => {
  context("GET /users/me", () => {
    it("retrieves a user", { tags: ["@smoke", "@api"] }, function () {
      cy.getUser().then((response) => {
        cy.log(response);
      });
    });
  });
});
