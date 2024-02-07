export class ContactListPage {
  elements = {
    logoutButton: () => cy.getByID("logout"),
    addContactButton: () => cy.getByID("add-contact"),
    contactBodyRow: () => cy.get(".contactTableBodyRow"),
  };

  contactInfoProps = [
    "id",
    "fullName",
    "birthDate",
    "email",
    "phoneNumber",
    "address",
    "city",
    "country",
  ];

  openAddContactForm() {
    return this.elements.addContactButton().click();
  }

  getContactInfo(contactNumInTable: number) {
    return this.elements
      .contactBodyRow()
      .eq(contactNumInTable - 1)
      .then((contactRow) => {
        const contactBody = contactRow.children();
        const contactInfo = {};
        this.contactInfoProps.forEach((property, index) => {
          contactInfo[property] = contactBody[index].innerText;
        });

        return contactInfo;
      });
  }
}
