import * as UserData from "../../../support/helpers/user_data_helper.js";

describe("Users Search", () => {
  context("GET /users/me", () => {
    before(() => {
      cy.addUser(UserData.validValues).then((response) => {
        cy.wrap(response.body.token).as("accessToken");
      });
    });
    it("retrieves a current user when no token passed", { tags: ["@smoke", "@api"] }, function () {
      cy.getUser().then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.deep.include({
          email: "illiaferents@gmail.com",
          firstName: "Illia",
          lastName: "Ferents",
        });
      });
    });
    it("retrieves a created user when passing token", { tags: ["@smoke", "@api"] }, function () {
      cy.getUser(this.accessToken).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.deep.include({
          email: UserData.validValues.email,
          firstName: UserData.validValues.firstName,
          lastName: UserData.validValues.lastName,
        });
      });
    });
    it("error when passing invalid token to retrieve a user", { tags: ["@api"] }, function () {
      cy.getUser("12345").then((response) => {
        expect(response.status).to.eq(401);
        expect(response.body.error).to.eq("Please authenticate.");
        expect(response.body).not.to.deep.include({
          email: UserData.validValues.email,
          firstName: UserData.validValues.firstName,
          lastName: UserData.validValues.lastName,
        });
      });
    });
  });
});
