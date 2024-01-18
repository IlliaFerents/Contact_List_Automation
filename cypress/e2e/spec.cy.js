describe("template spec", () => {
  it("passes", { tags: "@smoke" }, () => {
    cy.visit("https://example.cypress.io");
  });
});
