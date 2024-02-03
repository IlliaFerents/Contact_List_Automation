export default class ApiRequest {
  baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  logRequest(method: string, url: string, payload?) {
    const fullUrl = new URL(this.baseUrl + url);

    Cypress.log({
      name: "API Request",
      displayName: "API Req:",
      message: `${method} ${fullUrl.pathname}`,
      consoleProps: () => ({
        Method: method,
        URL: `${fullUrl}`,
        Payload: payload,
      }),
    });
  }

  logResponse(method: string, url: string, response) {
    const isSuccess = response.status >= 200 && response.status < 400;
    const statusIcon = isSuccess ? "🟢" : "🔴";
    const fullUrl = new URL(this.baseUrl + url);

    Cypress.log({
      name: "API Response",
      displayName: "API Res:",
      message: `${statusIcon} ${method} ${response.status}`,
      consoleProps: () => ({
        Method: method,
        URL: `${fullUrl}`,
        Status: response.status,
        Response: response.body,
      }),
    });
  }

  request(method: string, url: string = "", payload?, token: string = Cypress.env("BEARER_TOKEN")) {
    this.logRequest(method, url, payload);

    return cy
      .request({
        method: method,
        url: this.baseUrl + url,
        body: payload,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        failOnStatusCode: false,
        followRedirect: false,
        log: false,
      })
      .then((response) => {
        this.logResponse(method, url, response);
        return response;
      });
  }
}
