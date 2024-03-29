import * as UserData from "../../../support/helpers/random_data/user_data_helper.js";

describe("User Flow", { tags: ["@api", "@user"] }, () => {
  const initialUserPayload = UserData.generateValidValues();
  const updatedUserPayload = UserData.generateValidValues();
  const initialPassword = UserData.validValues.password;

  beforeEach(function () {
    cy.wrap(initialUserPayload).as("initialUserPayload");
    cy.wrap(updatedUserPayload).as("updatedUserPayload");
    cy.wrap(initialPassword).as("initialPassword");

    cy.addUser({ ...initialUserPayload, password: initialPassword }).then((response) => {
      cy.wrap(response.body.user).as("createdUser");
      cy.wrap(response.body.token).as("userToken");
    });
  });

  it("creates, gets, logs in, updates, and deletes a user", { tags: ["@smoke"] }, function () {
    cy.getUser(this.userToken).then((getResponse) => {
      expect(getResponse.status).to.eq(200);
      expect(getResponse.body).not.to.have.property("password");
      expect(this.createdUser).to.deep.include({
        firstName: this.initialUserPayload.firstName,
        lastName: this.initialUserPayload.lastName,
        email: this.initialUserPayload.email,
      });
    });

    cy.loginByApi(this.createdUser.email, this.initialPassword).then((response) => {
      expect(response.status).to.eq(200);
    });

    cy.updateUser(this.updatedUserPayload, this.userToken).then((updateResponse) => {
      expect(updateResponse.status).to.eq(200);
    });

    cy.getUser(this.userToken).then((getUpdatedResponse) => {
      const updatedEmail = getUpdatedResponse.body.email;
      const updatedPassword = this.updatedUserPayload.password;

      expect(getUpdatedResponse.status).to.eq(200);
      expect(getUpdatedResponse.body).not.to.deep.equal(this.createdUser);
      expect(getUpdatedResponse.body).to.deep.include({
        firstName: this.updatedUserPayload.firstName,
        lastName: this.updatedUserPayload.lastName,
        email: this.updatedUserPayload.email,
      });

      cy.loginByApi(updatedEmail, updatedPassword).then((response) => {
        expect(response.status).to.eq(200);
      });
    });

    cy.deleteUser(this.userToken).then((deleteResponse) => {
      expect(deleteResponse.status).to.eq(200);
    });

    cy.getUser(this.userToken).then((getDeletedResponse) => {
      expect(getDeletedResponse.status).to.eq(401);
    });
  });
});
