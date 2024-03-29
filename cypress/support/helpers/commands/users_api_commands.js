import ApiRequest from "./api_commands.js";

const api = new ApiRequest(Cypress.env("USERS_API_URL"));

Cypress.Commands.add("addUser", (payload) => {
  api.request("POST", "", payload);
});

Cypress.Commands.add("getUser", (token) => {
  api.request("GET", "me", "", token);
});
Cypress.Commands.add("updateUser", (payload, token) => {
  api.request("PATCH", "me", payload, token);
});

Cypress.Commands.add("deleteUser", (token) => {
  api.request("DELETE", "me", "", token);
});

Cypress.Commands.add("loginByApi", (email, password) => {
  api.request("POST", "login", { email: email, password: password });
});

Cypress.Commands.add("logoutByApi", (token) => {
  api.request("POST", "logout", "", token);
});
