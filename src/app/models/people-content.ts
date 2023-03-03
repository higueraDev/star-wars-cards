import { PeopleDTO } from './dtos/people-dto';

export interface PeopleContent
  extends Omit<
    PeopleDTO,
    | 'films'
    | 'starships'
    | 'homeworld'
    | 'species'
    | 'url'
    | 'created'
    | 'edited'
    | 'vehicles'
  > {}
