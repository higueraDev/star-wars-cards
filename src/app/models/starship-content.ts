import { StarshipDTO } from './starship-dto';

export interface StarshipContent
  extends Omit<
    StarshipDTO,
    | 'films'
    | 'pilots'
    | 'url'
    | 'created'
    | 'edited'
    | 'cost_in_credits'
    | 'cargo_capacity'
  > {
    credits: string,
    capacity: string
  }
