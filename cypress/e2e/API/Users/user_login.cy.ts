import * as UserData from "../../../support/helpers/random_data/user_data_helper.ts";

describe("User Login", { tags: ["@api", "@user"] }, () => {
  context("POST /login", () => {
    beforeEach(() => {
      const validPayload = UserData.generateValidValues();
      cy.wrap(validPayload).as("validPayload");
      cy.wrap(UserData.invalidValues).as("invalidPayload");

      cy.addUser(validPayload).then((response) => {
        expect(response.status).to.eq(201);

        cy.wrap(response.body.user.email).as("email");
        cy.wrap(validPayload.password).as("password");
        cy.wrap(response.body.token).as("userToken");
      });
    });
    it("successfully logs in", { tags: ["@smoke"] }, function () {
      cy.loginByApi(this.email, this.password).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
    it("error when logging in with deleted user credentials", function () {
      cy.deleteUser(this.userToken).then((response) => {
        expect(response.status).to.eq(200);

        cy.loginByApi(this.email, this.password).then((response) => {
          expect(response.status).to.eq(401);
        });
      });
    });
    it("error when logging in with invalid credentials", function () {
      cy.loginByApi(this.invalidPayload.email, this.invalidPayload.password).then((response) => {
        expect(response.status).to.eq(401);
      });
    });
    it("error when logging in with missing credentials", function () {
      cy.loginByApi({}).then((response) => {
        expect(response.status).to.eq(401);
      });
    });
  });
});
