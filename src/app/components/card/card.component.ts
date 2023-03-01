import { Component, Input } from '@angular/core';
import { Card } from '../../models/card';
import { formatNumber } from '@angular/common';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() card: Card;
  @Input() selected: boolean = false;

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
      const credits = Number(cost_in_credits || '').toLocaleString('en-US');
      const capacity = Number(cargo_capacity || '').toLocaleString('en-US');
      return { ...content, credits, capacity };
    }

    return null;
  }
}
