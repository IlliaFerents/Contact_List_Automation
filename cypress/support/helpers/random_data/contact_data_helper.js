const { faker } = require("@faker-js/faker");

export const generateValidValues = () => {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    birthdate: faker.date.birthdate().toISOString().split("T")[0], // yyyy-mm-dd
    email: faker.internet.email().toLowerCase(),
    phone: faker.string.numeric(8),
    street1: faker.location.streetAddress(),
    street2: faker.location.streetAddress(),
    city: faker.location.city(),
    stateProvince: faker.location.state(),
    postalCode: faker.location.zipCode(),
    country: faker.location.country(),
  };
};

export const validValues = generateValidValues();

export const maxLenValues = {
  firstName: faker.string.alpha(21),
  lastName: faker.string.alpha(21),
  phone: faker.string.numeric(16),
  stateProvince: faker.string.alpha(21),
  postalCode: faker.string.numeric(11),
};

export const invalidValues = {
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: faker.string.alpha(5),
  phone: faker.string.alpha(5),
  birthdate: faker.string.alpha(5),
  postalCode: faker.string.alpha(5),
};

export const requiredOnlyFields = {
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
};

export const invalidKeys = {
  firstame: faker.person.firstName(),
  lastame: faker.person.lastName(),
  Birthdate: faker.date.birthdate().toISOString().split("T")[0], // yyyy-mm-dd
  Email: faker.internet.email().toLowerCase(),
  Phone: faker.string.numeric(8),
  Street1: faker.location.streetAddress(),
  Street2: faker.location.streetAddress(),
  City: faker.location.city(),
  StateProvince: faker.location.state(),
  PostalCode: faker.location.zipCode(),
  CSSountry: faker.location.country(),
};
