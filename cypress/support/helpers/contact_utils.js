const { faker } = require("@faker-js/faker");

export const randomContactData = {
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
