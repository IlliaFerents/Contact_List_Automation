import * as ContactData from "./../support/helpers/random_data/contact_data_helper.ts";

export class ContactListPage {
  elements = {
    logoutButton: () => cy.getByID("logout"),
    addContactButton: () => cy.getByID("add-contact"),
    contactBodyRow: () => cy.get(".contactTableBodyRow"),
  };

  getContactInfo(contactNumInTable: number) {
    const properties = [
      "id",
      "fullName",
      "birthDate",
      "email",
      "phoneNumber",
      "address",
      "city",
      "country",
    ];

    return this.elements
      .contactBodyRow()
      .eq(contactNumInTable - 1)
      .then((contactRow) => {
        const contactBody = contactRow.children();

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const contactInfo: ContactData.ContactInfo = {};
        properties.forEach((property, index) => {
          contactInfo[property] = contactBody[index].innerText;
        });

        return contactInfo;
      });
  }
}
