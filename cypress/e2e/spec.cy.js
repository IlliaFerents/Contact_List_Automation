describe("template spec", () => {
  it("runs with a tag", { tags: "@smoke" }, () => {
    cy.visit("https://example.cypress.io");
  });
  it("it not tagged", () => {
    cy.visit("https://example.cypress.io");
  });
});
