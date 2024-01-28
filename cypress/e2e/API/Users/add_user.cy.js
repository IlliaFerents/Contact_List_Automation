import * as UserData from "../../../support/helpers/user_data_helper.js";
import { assertAPIerrorMessages } from "../../../support/helpers/assertions.js";

describe("User Creation", { tags: ["@api", "@user"] }, () => {
  context("POST /users", () => {
    beforeEach(() => {
      cy.wrap(UserData.generateValidValues()).as("validPayload");
      cy.wrap(UserData.invalidValues).as("invalidPayload");
      cy.wrap(UserData.maxMinLenValues).as("invalidValueLengthPayload");
      cy.wrap(UserData.invalidKeys).as("invalidKeysPayload");
    });
    it("creates a user and logs in", { tags: ["@smoke"] }, function () {
      cy.addUser(this.validPayload).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body.user).to.deep.include({
          firstName: this.validPayload.firstName,
          lastName: this.validPayload.lastName,
          email: this.validPayload.email,
        });

        cy.loginByApi({
          email: this.validPayload.email,
          password: this.validPayload.password,
        }).then((response) => {
          expect(response.status).to.eq(200);
        });
      });
    });
    it("error when creating user with same email second time", function () {
      cy.addUser(this.validPayload).then((response) => {
        expect(response.status).to.eq(201);
        cy.addUser(this.validPayload).then((response) => {
          expect(response.status).to.eq(400);
          expect(response.body.message).to.equal("Email address is already in use");
        });
      });
    });
    it("error when creating user with missing required fields", function () {
      cy.addUser({
        email: this.validPayload.email,
      }).then((response) => {
        expect(response.status).to.eq(400);
        assertAPIerrorMessages(response, {
          lastName: "Path `lastName` is required.",
          firstName: "Path `firstName` is required.",
          password: "Path `password` is required.",
        });
      });
    });
    it("error when creating user with missing email", function () {
      cy.addUser({
        firstName: this.validPayload.firstName,
        lastName: this.validPayload.lastName,
        password: this.validPayload.password,
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body.message).to.equal("Email address is already in use");
      });
    });
    it("error when creating user with invalid data(email)", function () {
      cy.addUser(this.invalidPayload).then((response) => {
        expect(response.status).to.eq(400);
        assertAPIerrorMessages(response, {
          email: "Email is invalid",
        });
      });
    });
    it("error when creating user with not allowed fields value length", function () {
      cy.addUser(this.invalidValueLengthPayload).then((response) => {
        expect(response.status).to.eq(400);
        assertAPIerrorMessages(response, {
          firstName: `Path \`firstName\` (\`${this.invalidValueLengthPayload.firstName}\`) is longer than the maximum allowed length (20).`,
          lastName: `Path \`lastName\` (\`${this.invalidValueLengthPayload.lastName}\`) is longer than the maximum allowed length (20).`,
          password: `Path \`password\` (\`${this.invalidValueLengthPayload.password}\`) is shorter than the minimum allowed length (7).`,
        });
      });
    });
    it("error when creating user with invalid key", function () {
      cy.addUser(this.invalidKeysPayload).then((response) => {
        expect(response.status).to.eq(400);
        assertAPIerrorMessages(response, {
          lastName: "Path `lastName` is required.",
          firstName: "Path `firstName` is required.",
          password: "Path `password` is required.",
        });
      });
    });
  });
});
