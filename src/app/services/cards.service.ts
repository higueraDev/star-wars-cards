import { Injectable } from '@angular/core';
import RandomNumber from '../helpers/random-number';
import { Card } from '../models/card';
import { PeopleDTO } from '../models/people-dto';
import { Score } from '../models/score';
import { PeopleService } from './people.service';
import { StarshipsService } from './starships.service';
import { Resources } from '../models/resources';
import { firstValueFrom } from 'rxjs';
import { StarshipDTO } from '../models/starship-dto';
import MapCards from '../helpers/map-cards';

@Injectable({
  providedIn: 'root',
})
export class CardsService {
  private readonly resources: number = 2;
  private readonly players: number = 2;
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

  private setScores() {
    for (let index = 0; index < this.players; index++) {
      this.scores[index] = {
        title: 'Player ' + (index + 1),
        count: 0,
      };
    }
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

  private get isPeople() {
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

  private createCard(data: unknown) {
    const card: Card = this.isPeople
      ? MapCards.generatePeopleCard(this.title, data as PeopleDTO)
      : MapCards.generateStarshipCard(this.title, data as StarshipDTO);

    this.cards.push(card);

    if (this.cardsFilled) {
      this.setWinner();
    }
  }

  private get title() {
    return 'Player ' + (this.cards.length + 1);
  }

  public get cardsFilled() {
    return this.cards.length === this.players;
  }

  private setWinner() {
    const sortedCards = this.sortCards();
    const topValue1 = sortedCards[0].feat.value;
    const topValue2 = sortedCards[1].feat.value;
    const topPlayer = sortedCards[0].title;

    this.winner = topValue1 !== topValue2 ? topPlayer : '';
    this.updateScores();
  }

  private sortCards() {
    const cards = this.cards.slice();
    return cards.sort((a, b) => {
      const _a = a.feat.value;
      const _b = b.feat.value;

      if (_b > _a) return 1;
      if (_b < _a) return -1;

      return 0;
    });
  }

  private updateScores() {
    this.scores = this.scores.map((score) => {
      let updatedScore = score;
      if (score.title === this.winner) updatedScore.count = score.count + 1;
      return updatedScore;
    });
  }
}
