import { Component } from '@angular/core';
import { CardsService } from '../../services/cards.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private cardsService: CardsService) {}

  public loadGame() {
    this.cardsService.selectResource();
  }

  public get cardsFilled() {
    return this.cardsService.cardsFilled;
  }

  public get cards() {
    return this.cardsService.cards;
  }
  public get scores() {
    return this.cardsService.scores;
  }
  public get winner() {
    return this.cardsService.winner;
  }
}
