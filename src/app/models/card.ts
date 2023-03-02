import { Feat } from './feat';
export interface Card {
  title: string;
  content: unknown;
  feat: Feat;
}
