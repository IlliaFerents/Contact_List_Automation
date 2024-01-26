export default class ApiRequest {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  request(method, url = "", payload, token = Cypress.env("BEARER_TOKEN")) {
    return cy.request({
      method: method,
      url: this.baseUrl + url,
      body: payload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      failOnStatusCode: false,
      followRedirect: false,
    });
  }
}
