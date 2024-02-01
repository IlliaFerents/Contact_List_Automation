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
  firstName: faker.string.alpha(5),
  lastName: faker.string.alpha(5),
  email: faker.string.alpha(5),
  password: faker.internet.password(),
};

export const maxMinLenValues: UserData = {
  firstName: faker.string.alpha(21),
  lastName: faker.string.alpha(21),
  email: faker.internet.email(),
  password: faker.string.alpha({ length: { min: 1, max: 6 } }),
};

export const invalidKeys: UserData = {
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: faker.internet.email().toLowerCase(),
  password: faker.internet.password(),
};
