import { PeopleDTO } from './people-dto';
export interface AllPeopleDTO {
  count: number;
  next: string;
  previous: null;
  results: PeopleDTO[];
}


