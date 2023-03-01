import { Component, OnInit } from '@angular/core';
import { Card } from '../../models/card';
import { PeopleService } from '../../services/people.service';
import { People } from '../../models/people';
import { Score } from '../../models/score';
import RandomId from '../../helpers/random-id';
import { CardsService } from '../../services/cards.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private cardsService: CardsService) {}

  public loadGame() {
    this.cardsService.loadGame();
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
