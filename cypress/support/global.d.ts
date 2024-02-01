declare namespace Cypress {
  interface TestConfigOverrides {
    tags?: string[];
  }

  interface SuiteConfigOverrides {
    tags?: string[];
  }

  interface Chainable {
    /**
     * Custom command to add a contact via API.
     * @param {object} payload - Payload for adding a contact.
     * @example cy.addContact(payload)
     */
    addContact(payload: object): Chainable<Response>;

    /**
     * Custom command to get a list of all contacts via API.
     * @example cy.getAllContacts()
     */
    getAllContacts(): Chainable<Response>;

    /**
     * Custom command to retrieve a contact by ID via API.
     * @param id - The unique identifier of the contact.
     * @example cy.getContactById('1')
     */
    getContactByID(id: string): Chainable<Response>;

    /**
     * Custom command to update a contact by ID via API.
     * @param id - The unique identifier of the contact.
     * @param {object} payload  - The data to be updated on the contact.
     * @example cy.updateContactById('1', { firstName: "John" })
     */
    updateContactByID(id: string, payload: object): Chainable<Response>;

    /**
     * Custom command to partially update a contact by ID via API.
     * @param id - The unique identifier of the contact.
     * @param {object} payload  - The data to be partially updated on the contact.
     * @example cy.patchContactById('1', { lastName: "Doe" })
     */
    patchContactByID(id: string, payload: object): Chainable<Response>;

    /**
     * Custom command to delete a contact by ID via API.
     * @param id - The unique identifier of the contact.
     * @example cy.deleteContactById('1')
     */
    deleteContactByID(id: string): Chainable<Response>;

    /**
     * Custom command to delete multiple contacts by their IDs via API.
     * @param ids - An array of unique identifiers of the contacts to be deleted.
     * @example cy.deleteMultipleContacts(['1', '2', '3'])
     */
    deleteMultipleContacts(ids: string[]): Chainable<Response>;

    /**
     * Custom command to delete all contacts via API.
     * @example cy.deleteAllContacts()
     */
    deleteAllContacts(): Chainable<Response>;

    /**
     * Custom command to add multiple contacts via API.
     * @param numOfContacts - The number of contacts to be added.
     * @returns Chainable object containing information about the created contacts.
     * @example cy.addMultipleContacts(3).then(createdContacts => cy.log(createdContacts))
     */
    addMultipleContacts(numOfContacts: number): Chainable<Response>;

    /**
     * Custom command to add a user via API.
     * @param {object} payload - Payload for adding a user.
     * @example cy.addUser({ name: "John Doe", email: "john.doe@example.com", password: "password123" })
     */
    addUser(payload: object): Chainable<Response>;

    /**
     * Custom command to get user information via API.
     * @param {string} token - User authentication token.
     * @example cy.getUser("userAuthToken")
     */
    getUser(token?: string): Chainable<Response>;

    /**
     * Custom command to update user information via API.
     * @param {object} payload - Payload for updating user information.
     * @param {string} token - User authentication token.
     * @example cy.updateUser({ name: "Updated Name" }, "userAuthToken")
     */
    updateUser(payload: object, token: string): Chainable<Response>;

    /**
     * Custom command to delete a user via API.
     * @param {string} token - User authentication token.
     * @example cy.deleteUser("userAuthToken")
     */
    deleteUser(token: string): Chainable<Response>;

    /**
     * Custom command to log in a user via API.
     * @param {string} email - User's email address.
     * @param {string} password - User's password.
     * @example cy.loginByApi("user@example.com", "password123")
     */
    loginByApi(email: string, password: string): Chainable<Response>;

    /**
     * Custom command to log out a user via API.
     * @param {string} token - User authentication token.
     * @example cy.logoutByApi("userAuthToken")
     */
    logoutByApi(token: string): Chainable<Response>;
  }
}
