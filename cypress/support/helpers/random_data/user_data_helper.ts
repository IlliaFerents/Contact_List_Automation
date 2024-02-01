const { faker } = require("@faker-js/faker");

export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const generateValidValues = (): UserData => {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email().toLowerCase(),
    password: faker.internet.password(),
  };
};

export const validValues: UserData = generateValidValues();

export const invalidValues: UserData = {
  firstName: faker.string.alpha(5), // accepts any value
  lastName: faker.string.alpha(5), // accepts any value
  email: faker.string.alpha(5),
  password: faker.internet.password(), // accepts any value
};

export const invalidLengthValues: UserData = {
  firstName: faker.string.alpha(21),
  lastName: faker.string.alpha(21),
  email: faker.internet.email(), // accepts any length
  password: faker.string.alpha({ length: { min: 1, max: 6 } }),
};

export const invalidKeys = {
  firstname: faker.person.firstName(),
  lastname: faker.person.lastName(),
  Email: faker.internet.email().toLowerCase(),
  Password: faker.internet.password(),
};
