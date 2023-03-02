import { PeopleDTO } from '../models/people-dto';
import { PeopleCard } from '../models/people-card';
import { PeopleContent } from '../models/people-content';
import { StarshipContent } from '../models/starship-content';
import { StarshipDTO } from '../models/starship-dto';
import { StarshipCard } from '../models/starship-card';
import FormatNumber from './format-number';

export default class MapCards {
  private static mapPeopleData(data: PeopleDTO): PeopleContent {
    const {
      films,
      starships,
      homeworld,
      species,
      url,
      created,
      edited,
      vehicles,
      ...content
    } = data;

    return content;
  }

  private static mapStarshipData(data: StarshipDTO): StarshipContent {
    const {
      films,
      pilots,
      url,
      created,
      edited,
      cost_in_credits,
      cargo_capacity,
      ..._content
    } = data;

    const credits = FormatNumber.formatStringToNumber(cost_in_credits);
    const capacity = FormatNumber.formatStringToNumber(cargo_capacity);
    const content = { ..._content, credits, capacity };

    return content;
  }

  public static generatePeopleCard(title: string, data: PeopleDTO): PeopleCard {
    const card = {
      title,
      content: this.mapPeopleData(data),
      feat: {
        title: 'mass',
        value: FormatNumber.formatFeatString(data.mass),
      },
    };
    return card;
  }

  public static generateStarshipCard(
    title: string,
    data: StarshipDTO
  ): StarshipCard {
    const card = {
      title,
      content: this.mapStarshipData(data),
      feat: {
        title: 'crew',
        value: FormatNumber.formatFeatString(data.crew),
      },
    };
    return card;
  }
}
