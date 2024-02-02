export class LoginPage {
  elements = {
    emailInput: () => cy.getByID("email"),
    passwordInput: () => cy.getByID("password"),
    submitButton: () => cy.getByID("submit"),
    signUpButton: () => cy.getByID("signup"),
  };

  fillEmail(email: string) {
    return this.elements.emailInput().type(email);
  }

  fillPassword(password: string) {
    return this.elements.passwordInput().type(password, { log: false });
  }

  tapSubmit() {
    return this.elements.submitButton().click();
  }

  tapSignUp() {
    return this.elements.signUpButton().click();
  }
}
