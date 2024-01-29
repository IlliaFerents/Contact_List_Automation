import * as UserData from "../../../support/helpers/user_data_helper.js";
import { assertAPIerrorMessages } from "../../../support/helpers/assertions.js";

describe("User Update", { tags: ["@api", "@user"] }, () => {
  context("PATCH /users/me", () => {
    beforeEach(function () {
      const validPayload = UserData.generateValidValues();
      const updatePayload = UserData.generateValidValues();

      cy.wrap(validPayload).as("validPayload");
      cy.wrap(updatePayload).as("updatePayload");

      cy.addUser(validPayload).then((response) => {
        cy.wrap(response.body.token).as("userToken");
        cy.wrap(response.body.user).as("originalUserData");
      });
    });
    it("updates an existing user with random data", { tags: ["@smoke"] }, function () {
      cy.updateUser(this.updatePayload, this.userToken).then((response) => {
        const updatedUserData = response.body;

        expect(response.status).to.eq(200);
        expect(updatedUserData).not.to.deep.equal(this.originalUserData);

        cy.getUser(this.userToken).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.deep.equal(updatedUserData);
        });
      });
    });
    it("partially updates an existing user", function () {
      cy.updateUser({ email: this.updatePayload.email }, this.userToken).then((response) => {
        const updatedUserData = response.body;

        expect(response.status).to.eq(200);
        expect(updatedUserData.email).to.equal(this.updatePayload.email);
        expect(updatedUserData.email).not.to.eq(this.originalUserData.email);
        expect(updatedUserData).to.deep.include({
          firstName: this.originalUserData.firstName,
          lastName: this.originalUserData.lastName,
        });

        cy.getUser(this.userToken).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.deep.equal(updatedUserData);
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
          expect(response.body).to.deep.equal(this.originalUserData);
        });
      });
    });
  });
});
