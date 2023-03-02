import { Component, Input } from '@angular/core';
import { Card } from '../../models/card';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() card: Card;
  @Input() selected: boolean = false;

  private formatStringNumber(value: string) {
    const numberValue = Number(value);
    const formattedValue = Number.isNaN(numberValue)
      ? '-'
      : numberValue.toLocaleString('en-US');
    return formattedValue;
  }

  get content() {
    if (this.card.peopleContent) {
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
      } = this.card.peopleContent;
      return content;
    }
    if (this.card.starshipContent) {
      const {
        films,
        pilots,
        url,
        created,
        edited,
        cost_in_credits,
        cargo_capacity,
        ...content
      } = this.card.starshipContent;
      const credits = this.formatStringNumber(cost_in_credits);
      const capacity = this.formatStringNumber(cargo_capacity);
      return { ...content, credits, capacity };
    }

    return null;
  }
}
