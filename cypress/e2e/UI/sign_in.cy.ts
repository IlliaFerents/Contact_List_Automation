import { SignInPage } from "../../pages/sign_in_page";

const signInPage = new SignInPage();

describe("User Sign In", { tags: ["@ui", "@user"] }, () => {
  it("signs in with valid credentials", { tags: ["@smoke"] }, function () {
    cy.visit(Cypress.env("BASE_URL"));
    signInPage.fillEmailInput("test@test.com");
  });
});
