import * as UserData from "../../../support/helpers/user_data_helper.js";

describe("Users Deletion", () => {
  context("DELETE /users/me", () => {
    before(() => {
      cy.addUser(UserData.validValues).then((response) => {
        cy.wrap(response.body.token).as("accessToken");
      });
    });
    it("deletes a user", { tags: ["@smoke", "@api"] }, function () {
      cy.deleteUser(this.accessToken).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.empty;

        cy.getUser(this.accessToken).then((response) => {
          expect(response.status).to.eq(401);
          expect(response.body.error).to.eq("Please authenticate.");
        });
      });
    });
    it.only("when passing invalid token to delete a user", { tags: ["@api"] }, function () {
      cy.deleteUser("12345").then((response) => {
        expect(response.status).to.eq(401);
        expect(response.body.error).to.eq("Please authenticate.");
      });
    });
  });
});
