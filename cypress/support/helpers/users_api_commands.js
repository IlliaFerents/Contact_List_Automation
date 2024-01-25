import ApiRequest from "./api_commands.js";

const api = new ApiRequest(Cypress.env("USERS_API_URL"));

Cypress.Commands.add("addUser", (payload) => {
  api.request("POST", "", payload);
});

Cypress.Commands.add("getUser", () => {
  api.request("GET", "me");
});

Cypress.Commands.add("deleteUser", () => {
  api.request("DELETE", "me");
});

Cypress.Commands.add("loginByApi", (payload) => {
  api.request("POST", "login", payload);
});

Cypress.Commands.add("logoutByApi", () => {
  api.request("POST", "logout");
});