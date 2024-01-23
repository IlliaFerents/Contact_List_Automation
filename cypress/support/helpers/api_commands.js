export default class ApiRequest {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  request(method, url = "", payload) {
    return cy.request({
      method: method,
      url: this.baseUrl + url,
      body: payload,
      headers: {
        Authorization: `Bearer ${Cypress.env("BEARER_TOKEN")}`,
        "Content-Type": "application/json",
      },
      failOnStatusCode: false,
      followRedirect: false,
    });
  }
}
