export class SignInPage {
  elements = {
    emailInput: () => cy.get("#email"),
  };

  fillEmailInput(email: string) {
    this.elements.emailInput().type(email);
  }
}
