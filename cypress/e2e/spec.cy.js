describe("template spec", () => {
  it("runs with a tag", () => {
    cy.visit("https://example.cypress.io");
  });
  it("it not tagged", () => {
    cy.visit("https://example.cypress.io");
  });
});
