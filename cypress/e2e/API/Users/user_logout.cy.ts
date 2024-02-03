import * as UserData from "../../../support/helpers/random_data/user_data_helper.ts";

describe("User Logout", { tags: ["@api", "@user"] }, () => {
  context("POST /logout", () => {
    beforeEach(function () {
      const validPayload = UserData.generateValidValues();
      const password = validPayload.password; // static

      cy.addUser({ ...validPayload, password }).then((response) => {
        expect(response.status).to.eq(201);

        cy.wrap(response.body.token).as("userToken");
        const email = response.body.user.email; // dynamic

        cy.loginByApi(email, password).then((response) => {
          expect(response.status).to.eq(200);
        });
      });
    });

    it("successfully logs out a logged-in user", { tags: ["@smoke"] }, function () {
      cy.logoutByApi(this.userToken).then((response) => {
        expect(response.status).to.eq(200);
      });
    });

    it("error when logging out twice in a row", { tags: ["@negative"] }, function () {
      cy.logoutByApi(this.userToken).then((response) => {
        expect(response.status).to.eq(200);

        cy.logoutByApi(this.userToken).then((response) => {
          expect(response.status).to.eq(401);
        });
      });
    });
  });
});
