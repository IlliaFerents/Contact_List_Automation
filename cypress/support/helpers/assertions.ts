export function assertAPIerrorMessages(response, expectedErrors: object) {
  const actualErrors = response.body.errors;
  expect(actualErrors).to.have.keys(expectedErrors);

  for (const [field, message] of Object.entries(expectedErrors)) {
    expect(actualErrors[field].message).to.include(message);
  }

  const expectedErrorMessage = "validation failed:";
  expect(response.body.message.toLowerCase()).to.include(expectedErrorMessage);
}
