import { People } from './people';
import { Starship } from './starship';

export interface Card {
  title: string;
  peopleContent?: People;
  starshipContent?: Starship;
}
