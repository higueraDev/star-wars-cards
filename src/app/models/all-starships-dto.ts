import { StarshipDTO } from "./starship-dto";

export interface AllStarshipsDTO {
  count: number;
  next: string;
  previous: null;
  results: StarshipDTO[];
}
