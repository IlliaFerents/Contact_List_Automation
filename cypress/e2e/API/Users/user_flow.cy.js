import * as UserData from "../../../support/helpers/user_data_helper.js";

describe("User Flow", { tags: ["@api", "@user"] }, () => {
  beforeEach(function () {
    const initialUserPayload = UserData.generateValidValues();
    const updatedUserPayload = UserData.generateValidValues();
    const initialPassword = UserData.validValues.password;

    cy.wrap(initialUserPayload).as("initialUserPayload");
    cy.wrap(updatedUserPayload).as("updatedUserPayload");
    cy.wrap(initialPassword).as("initialPassword");

    cy.addUser({ ...initialUserPayload, password: initialPassword }).then((response) => {
      cy.wrap(response.body.user).as("createdUser");
      cy.wrap(response.body.token).as("userToken");
    });
  });

  it("creates, gets, logs in, updates, and deletes a user", { tags: ["@smoke"] }, function () {
    cy.getUser(this.userToken).as("getUser");
    cy.get("@getUser").then((getResponse) => {
      expect(getResponse.status).to.eq(200);
      expect(getResponse.body).not.to.have.property("password");
      expect(this.createdUser).to.deep.include({
        firstName: this.initialUserPayload.firstName,
        lastName: this.initialUserPayload.lastName,
        email: this.initialUserPayload.email,
      });
    });

    cy.loginByApi(this.createdUser.email, this.initialPassword).as("login");
    cy.get("@login").then((response) => {
      expect(response.status).to.eq(200);
    });

    cy.updateUser(this.updatedUserPayload, this.userToken).as("updateUser");
    cy.get("@updateUser").then((updateResponse) => {
      expect(updateResponse.status).to.eq(200);
    });

    cy.getUser(this.userToken).as("getUpdatedUser");
    cy.get("@getUpdatedUser").then((getUpdatedResponse) => {
      const updatedEmail = getUpdatedResponse.body.email;
      const updatedPassword = this.updatedUserPayload.password;

      expect(getUpdatedResponse.status).to.eq(200);
      expect(getUpdatedResponse.body).not.to.deep.equal(this.createdUser);
      expect(getUpdatedResponse.body).to.deep.include({
        firstName: this.updatedUserPayload.firstName,
        lastName: this.updatedUserPayload.lastName,
        email: this.updatedUserPayload.email,
      });

      cy.loginByApi(updatedEmail, updatedPassword).as("loginAfterUpdate");
      cy.get("@loginAfterUpdate").then((response) => {
        expect(response.status).to.eq(200);
      });
    });

    cy.deleteUser(this.userToken).as("deleteUser");
    cy.get("@deleteUser").then((deleteResponse) => {
      expect(deleteResponse.status).to.eq(200);
    });

    cy.getUser(this.userToken).as("getDeletedUser");
    cy.get("@getDeletedUser").then((getDeletedResponse) => {
      expect(getDeletedResponse.status).to.eq(401);
    });
  });
});
