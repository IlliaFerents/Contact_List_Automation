import * as UserData from "../../../support/helpers/user_data_helper.js";

describe("User Deletion", { tags: ["@api", "@user"] }, () => {
  context("DELETE /users/me", () => {
    before(() => {
      cy.addUser(UserData.validValues).then((response) => {
        cy.wrap(response.body.token).as("userToken");
      });
    });
    it("deletes a user", { tags: ["@smoke"] }, function () {
      cy.deleteUser(this.userToken).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.empty;

        cy.getUser(this.userToken).then((response) => {
          expect(response.status).to.eq(401);
          expect(response.body.error).to.eq("Please authenticate.");
        });
      });
    });
    it("error when passing invalid token to delete a user", function () {
      cy.deleteUser("12345").then((response) => {
        expect(response.status).to.eq(401);
        expect(response.body.error).to.eq("Please authenticate.");
      });
    });
  });
});
