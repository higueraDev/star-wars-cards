import { Card } from './card';
import { PeopleContent } from './people-content';

export interface PeopleCard extends Card {
  content: PeopleContent;
}
