import * as UserData from "../../../support/helpers/user_data_helper.js";

describe("User Logout", { tags: ["@api", "@user"] }, () => {
  context("POST /logout", () => {
    beforeEach(function () {
      const password = UserData.validValues.password; // static

      cy.addUser({ ...UserData.generateValidValues(), password }).then((response) => {
        expect(response.status).to.eq(201);
        cy.wrap(response.body.token).as("userToken");
        const email = response.body.user.email; // dynamic

        cy.loginByApi({ email, password }).then((response) => {
          expect(response.status).to.eq(200);
        });
      });
    });

    it("successfully logs out a logged-in user", { tags: ["@smoke"] }, function () {
      cy.logoutByApi(this.userToken).then((response) => {
        expect(response.status).to.eq(200);
      });
    });

    it("error when logging out without providing an access token", function () {
      cy.logoutByApi().then((response) => {
        expect(response.status).to.eq(401);
      });
    });
  });
});
