export default class ApiRequest {
  baseUrl: string;
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  request(method: string, url: string = "", payload?, token: string = Cypress.env("BEARER_TOKEN")) {
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
