import * as UserData from "../../support/helpers/random_data/user_data_helper";
import { LoginPage } from "../../pages/login_page";

const loginPage = new LoginPage();

describe("User Login", { tags: ["@ui", "@user"] }, () => {
  beforeEach(function () {
    const validUserData = UserData.generateValidValues();
    cy.wrap(UserData.invalidValues).as("InvalidUserData");

    cy.addUser(validUserData).then((createdUser) => {
      cy.wrap(createdUser.body.user.email).as("email");
      cy.wrap(validUserData.password).as("password");
    });
    cy.visit("/");
  });
  it("logs in with valid credentials", { tags: ["@smoke"] }, function () {
    loginPage.fillEmail(this.email).should("have.value", this.email);
    loginPage
      .fillPassword(this.password)
      .should("have.value", this.password)
      .and("have.attr", "type", "password");
    loginPage.tapSubmit();

    cy.location("pathname").should("equal", "/contactList");
    cy.getByID("logout").should("be.visible");
  });
  it("displays error when logging in with invalid password", { tags: ["@negative"] }, function () {
    loginPage.fillEmail(this.email).should("have.value", this.email);
    loginPage
      .fillPassword(this.InvalidUserData.password)
      .should("have.value", this.InvalidUserData.password);
    loginPage.tapSubmit();

    cy.getByID("error").should("have.text", "Incorrect username or password");
    cy.location("pathname").should("equal", "/");
    cy.contains("h1", "Contact List App").should("be.visible");
  });
  it("displays error when logging in with invalid email", { tags: ["@negative"] }, function () {
    loginPage
      .fillEmail(this.InvalidUserData.email)
      .should("have.value", this.InvalidUserData.email);
    loginPage.fillPassword(this.password).should("have.value", this.password);
    loginPage.tapSubmit();

    cy.getByID("error").should("have.text", "Incorrect username or password");
    cy.location("pathname").should("equal", "/");
    cy.contains("h1", "Contact List App").should("be.visible");
  });
  it("displays error when logging in with empty fields", { tags: ["@negative"] }, function () {
    loginPage.elements.emailInput().should("be.empty");
    loginPage.elements.passwordInput().should("be.empty");
    loginPage.tapSubmit();

    cy.getByID("error").should("have.text", "Incorrect username or password");
    cy.location("pathname").should("equal", "/");
    cy.contains("h1", "Contact List App").should("be.visible");
  });
});
