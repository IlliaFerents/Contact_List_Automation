import * as UserData from "../../../support/helpers/user_data_helper.js";

describe("Users Search", { tags: ["@api", "@user"] }, () => {
  context("GET /users/me", () => {
    beforeEach(function () {
      const validPayload = UserData.generateValidValues();
      cy.wrap(validPayload).as("validPayload");

      cy.addUser(validPayload).then((response) => {
        cy.wrap(response.body.token).as("userToken");
      });
    });
    it("retrieves a current user when no token passed", function () {
      cy.getUser().then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.deep.include({
          email: "illiaferents@gmail.com",
          firstName: "Illia",
          lastName: "Ferents",
        });
      });
    });
    it("retrieves a created user when passing token", function () {
      cy.getUser(this.userToken).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.deep.include({
          email: this.validPayload.email,
          firstName: this.validPayload.firstName,
          lastName: this.validPayload.lastName,
        });
      });
    });
    it("does not include 'password' prop in response when retrieving a user", function () {
      cy.getUser(this.userToken).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).not.to.have.property("password");
        expect(response.body).to.deep.include({
          email: this.validPayload.email,
          firstName: this.validPayload.firstName,
          lastName: this.validPayload.lastName,
        });
      });
    });
    it("error when passing invalid token to retrieve a user", function () {
      cy.getUser("12345").then((response) => {
        expect(response.status).to.eq(401);
        expect(response.body.error).to.eq("Please authenticate.");
        expect(response.body).not.to.deep.include({
          email: this.validPayload.email,
          firstName: this.validPayload.firstName,
          lastName: this.validPayload.lastName,
        });
      });
    });
  });
});
