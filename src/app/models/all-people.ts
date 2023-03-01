import { People } from './people';
export interface AllPeople {
  count: number;
  next: string;
  previous: null;
  results: People[];
}


