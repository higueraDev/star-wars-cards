import { PeopleCard } from '../models/people-card';
import { faker } from '@faker-js/faker';
import { Gender } from '../models/enums/gender';

export const generatePeopleCard = (): PeopleCard => ({
  title: faker.name.firstName(),
  content: {
    birth_year: faker.date.birthdate().toDateString(),
    eye_color: faker.color.human(),
    gender: faker.helpers.objectValue(Gender),
    hair_color: faker.color.human(),
    height: faker.datatype.number({ min: 50, max: 220 }).toString(),
    mass: faker.datatype.number({ min: 50, max: 300 }).toString(),
    name: faker.name.fullName(),
    skin_color: faker.color.human(),
  },
  feat: {
    title: 'mass',
    value: faker.datatype.number({ min: 50, max: 300 }),
  },
});

export const generatePeopleArray = (size: number = 2): PeopleCard[] => {
  const cards: PeopleCard[] = [];
  for (let index = 0; index < size; index++) {
    cards.push(generatePeopleCard());
  }

  return cards;
};
