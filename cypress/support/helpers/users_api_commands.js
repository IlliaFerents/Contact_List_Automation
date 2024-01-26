import ApiRequest from "./api_commands.js";

const api = new ApiRequest(Cypress.env("USERS_API_URL"));

Cypress.Commands.add("addUser", (payload) => {
  api.request("POST", "", payload);
});

Cypress.Commands.add("getUser", (token) => {
  api.request("GET", "me", "", token);
});

Cypress.Commands.add("deleteUser", (token) => {
  api.request("DELETE", "me", "", token);
});

Cypress.Commands.add("loginByApi", (payload) => {
  api.request("POST", "login", payload);
});

Cypress.Commands.add("logoutByApi", () => {
  api.request("POST", "logout");
});
