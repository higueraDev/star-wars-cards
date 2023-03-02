import { Card } from './card';
import { StarshipContent } from './starship-content';

export interface StarshipCard extends Card {
  content: StarshipContent;
}
