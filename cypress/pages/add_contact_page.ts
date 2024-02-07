export class AddContactPage {
  elements = {
    firstNameInput: "#firstName",
    lastNameInput: "#lastName",
    birthdateInput: "#birthdate",
    emailInput: "#email",
    phoneInput: "#phone",
    street1Input: "#street1",
    street2Input: "#street2",
    cityInput: "#city",
    stateProvinceInput: "#stateProvince",
    postalCodeInput: "#postalCode",
    countryInput: "#country",
    addContactForm: () => cy.getByID("add-contact"),
    submitButton: () => cy.getByID("submit"),
    cancelButton: () => cy.getByID("cancel"),
  };

  fillAddContactForm(contactData) {
    const formValues = {};

    for (const [key, value] of Object.entries(contactData)) {
      const inputSelector = this.elements[key + "Input"];
      if (inputSelector) {
        formValues[inputSelector] = value;
      }
    }

    return this.elements.addContactForm().fillForm(formValues);
  }

  tapSubmit() {
    this.elements.submitButton().click();
    cy.reload();
  }
}
