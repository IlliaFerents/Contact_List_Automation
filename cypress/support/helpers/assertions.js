export function assertErrorMessagesAPI(response, expectedErrors) {
  const actualErrors = response.body.errors;
  expect(actualErrors).to.have.keys(expectedErrors);

  for (const [field, message] of Object.entries(expectedErrors)) {
    expect(actualErrors[field].message).to.include(message);
  }

  const expectedErrorMessage = `Contact validation failed: ${Object.keys(expectedErrors)
    .map((field) => `${field}: ${expectedErrors[field]}`)
    .join(", ")}`;
  expect(response.body.message).to.include(expectedErrorMessage);
}
