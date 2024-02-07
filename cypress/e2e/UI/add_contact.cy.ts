import { ContactListPage } from "../../pages/contact_list_page";
import { AddContactPage } from "../../pages/add_contact_page";
import * as ContactData from "../../support/helpers/random_data/contact_data_helper.ts";
import { assertContactInfo } from "../../support/helpers/assertions.ts";

const contactListPage = new ContactListPage();
const addContactPage = new AddContactPage();

describe("Contact Creation", { tags: ["@ui", "@contact"] }, () => {
  beforeEach(function () {
    cy.wrap(ContactData.generateValidValues()).as("validContactData");

    cy.loginWithGeneratedUser();
    cy.visit("/contactList");
    contactListPage.openAddContactForm();
  });
  it("creates a contact with random data", { tags: ["@smoke"] }, function () {
    addContactPage.fillAddContactForm(this.validContactData);
    addContactPage.tapSubmit();

    contactListPage.getContactInfo(1).then((contactInfo) => {
      assertContactInfo(contactInfo, this.validContactData);
    });
  });
});
