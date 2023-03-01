import { Starship } from "./starship";

export interface AllStarships {
  count: number;
  next: string;
  previous: null;
  results: Starship[];
}
