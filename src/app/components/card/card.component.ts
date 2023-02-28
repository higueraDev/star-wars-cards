import { Component, Input } from '@angular/core';
import { Card } from '../../models/card';
import { People } from '../../models/people';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() card: Card;

  get content() {
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
    } = this.card.content;
    return content;
  }
}
