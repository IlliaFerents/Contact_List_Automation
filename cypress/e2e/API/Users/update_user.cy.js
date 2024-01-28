import * as UserData from "../../../support/helpers/user_data_helper.js";
import { assertAPIerrorMessages } from "../../../support/helpers/assertions.js";

describe("User Update", { tags: ["@api", "@user"] }, () => {
  context("PATCH /users/me", () => {
    beforeEach(function () {
      cy.addUser(UserData.generateValidValues()).then((response) => {
        cy.wrap(response.body.token).as("userToken");
        cy.wrap(response.body.user).as("postPayload");
      });
    });
    it("updates an existing user with random data", { tags: ["@smoke"] }, function () {
      cy.updateUser(UserData.generateValidValues(), this.userToken).then((response) => {
        const updatePayload = response.body;
        expect(response.status).to.eq(200);
        expect(updatePayload).not.to.deep.equal(this.postPayload);

        cy.getUser(this.userToken).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.deep.equal(updatePayload);
        });
      });
    });
    it("partially updates an existing user", function () {
      cy.updateUser({ email: UserData.validValues.email }, this.userToken).then((response) => {
        const updatePayload = response.body;
        expect(response.status).to.eq(200);
        expect(updatePayload.email).to.equal(UserData.validValues.email);
        expect(updatePayload).not.to.deep.equal(this.postPayload);

        cy.getUser(this.userToken).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.deep.equal(updatePayload);
        });
      });
    });
    it("error when updating an existing user with invalid data", function () {
      cy.updateUser(UserData.invalidValues, this.userToken).then((response) => {
        expect(response.status).to.eq(400);
        assertAPIerrorMessages(response, {
          email: "Email is invalid",
        });

        cy.getUser(this.userToken).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.deep.equal(this.postPayload);
        });
      });
    });
  });
});
