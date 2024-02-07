export function assertAPIerrorMessages(response, expectedErrors: object) {
  const actualErrors = response.body.errors;
  expect(actualErrors).to.have.keys(expectedErrors);

  for (const [field, message] of Object.entries(expectedErrors)) {
    expect(actualErrors[field].message).to.include(message);
  }

  const expectedErrorMessage = "validation failed:";
  expect(response.body.message.toLowerCase()).to.include(expectedErrorMessage);
}

export function assertContactInfo(actual, expected) {
  expect(actual.fullName).to.equal(expected.firstName + " " + expected.lastName);
  expect(actual.birthDate).to.equal(expected.birthdate);
  expect(actual.email).to.equal(expected.email);
  expect(actual.phoneNumber).to.equal(expected.phone);
  expect(actual.address).to.equal(expected.street1 + " " + expected.street2);
  expect(actual.city).to.equal(
    expected.city + " " + expected.stateProvince + " " + expected.postalCode
  );
  expect(actual.country).to.equal(expected.country);
}
