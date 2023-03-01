import { Injectable } from '@angular/core';
import RandomNumber from '../helpers/random-id';
import { Card } from '../models/card';
import { People } from '../models/people';
import { Score } from '../models/score';
import { PeopleService } from './people.service';
import { StarshipsService } from './starships.service';
import { Resources } from '../models/resources';
import { firstValueFrom } from 'rxjs';
import { Starship } from '../models/starship';

@Injectable({
  providedIn: 'root',
})
export class CardsService {
  private readonly resources: number = 2;
  private players: number = 2;
  private peopleLength: number;
  private starshipsLength: number;
  private resourceSelected: Resources;

  public cards: Card[] = [];
  public scores: Score[] = [];
  public winner: string = '';

  constructor(
    private peopleService: PeopleService,
    private starshipsService: StarshipsService
  ) {
    this.setScores();
    this.loadResources();
  }

  private async loadResources() {
    const resources = await Promise.all([
      firstValueFrom(this.getPeopleLength()),
      firstValueFrom(this.getStarshipsLength()),
    ]);
    this.peopleLength = resources[0].count;
    this.starshipsLength = resources[1].count;
    this.selectResource();
  }

  private getPeopleLength() {
    return this.peopleService.getPeople();
  }

  private getStarshipsLength() {
    return this.starshipsService.getStarships();
  }

  public selectResource() {
    const numberSelected = RandomNumber.getNumber(this.resources);
    if (numberSelected === 1) this.resourceSelected = Resources.people;
    else this.resourceSelected = Resources.starships;
    this.loadGame();
  }

  get isPeople() {
    return this.resourceSelected === Resources.people;
  }

  private loadGame() {
    this.winner = '';
    this.cards = [];
    for (let index = 0; index < this.players; index++) {
      if (this.isPeople) this.getPeopleData();
      else this.getStarshipsData();
    }
  }

  private getPeopleData() {
    this.peopleService.getPeopleById(this.getId(this.peopleLength)).subscribe({
      next: (response) => this.createCard(response),
      error: (err) => {
        console.error(err);
        this.getPeopleData();
      },
    });
  }

  private getStarshipsData() {
    this.starshipsService
      .getStarshipById(this.getId(this.starshipsLength))
      .subscribe({
        next: (response) => this.createCard(response),
        error: (err) => {
          console.error(err);
          this.getStarshipsData();
        },
      });
  }

  private getId(length: number) {
    return RandomNumber.getNumber(length);
  }

  private createCard(data: People | Starship) {
    const card: Card = {
      title: 'Player ' + (this.cards.length + 1),
    };

    this.isPeople
      ? (card.peopleContent = data as People)
      : (card.starshipContent = data as Starship);

    this.cards.push(card);

    if (this.cardsFilled) {
      this.setWinner();
    }
  }

  public get cardsFilled() {
    return this.cards.length === this.players;
  }

  private setWinner() {
    const sortedCards = this.sortCards();
    let topValue1, topValue2;

    if (this.isPeople) {
      topValue1 = sortedCards[0].peopleContent?.mass;
      topValue2 = sortedCards[1].peopleContent?.mass;
    } else {
      topValue1 = sortedCards[0].starshipContent?.crew;
      topValue2 = sortedCards[1].starshipContent?.crew;
    }

    const topPlayer = sortedCards[0].title;

    this.winner = topValue1 !== topValue2 ? topPlayer : '';
    this.updateScores();
  }

  private sortCards() {
    const cards = this.cards.slice();

    return cards.sort((a: Card, b: Card) => {
      let _a, _b;

      if (this.isPeople) {
        _a = Number(a.peopleContent?.mass.replace(',', '')) || 0;
        _b = Number(b.peopleContent?.mass.replace(',', '')) || 0;
      } else {
        _a = Number(a.starshipContent?.crew.replace(',', '')) || 0;
        _b = Number(b.starshipContent?.crew.replace(',', '')) || 0;
      }

      if (_b > _a) return 1;
      if (_b < _a) return -1;

      return 0;
    });
  }

  private setScores() {
    for (let index = 0; index < this.players; index++) {
      this.scores[index] = {
        title: 'Player ' + (index + 1),
        count: 0,
      };
    }
  }

  private updateScores() {
    this.scores = this.scores.map((score) => {
      let updatedScore = score;
      if (score.title === this.winner) updatedScore.count = score.count + 1;
      return updatedScore;
    });
  }
}
