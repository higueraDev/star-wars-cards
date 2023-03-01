import { Injectable } from '@angular/core';
import RandomId from '../helpers/random-id';
import { Card } from '../models/card';
import { People } from '../models/people';
import { Score } from '../models/score';
import { PeopleService } from './people.service';

@Injectable({
  providedIn: 'root'
})
export class CardsService {
  private players: number = 2;
  private peopleLength: number;

  public cards: Card[] = [];
  public scores: Score[] = [];
  public winner: string = '';

  constructor(private peopleService: PeopleService ) {
    this.setScores();
    this.getPeopleLength();
  }

  private getPeopleLength() {
    this.peopleService.getPeople().subscribe((data) => {
      this.peopleLength = data.count;
      this.loadGame();
    });
  }

  public loadGame() {
    this.winner = '';
    this.cards = [];
    for (let index = 0; index < this.players; index++) {
      this.getPeopleData();
    }
  }

  private getPeopleData() {
    this.peopleService.getPeopleById(this.getId()).subscribe({
      next: (response) => this.createPeopleCard(response),
      error: (err) => {
        console.error(err);
        this.getPeopleData();
      },
    });
  }

  private getId() {
    return RandomId.getId(this.peopleLength);
  }

  public get cardsFilled() {
    return this.cards.length === this.players;
  }

  private createPeopleCard(data: People) {
    const content = data;
    const card = {
      title: 'Player ' + (this.cards.length + 1),
      content,
    };

    this.cards.push(card);

    if (this.cardsFilled) {
      this.setWinner();
    }
  }

  private sortCards() {
    return this.cards.slice().sort((a: Card, b: Card) => {
      const _a = Number(a.content.mass.replace(',', '')) || 0;
      const _b = Number(b.content.mass.replace(',', '')) || 0;

      if (_b > _a) return 1;
      if (_b < _a) return -1;

      return 0;
    });
  }

  private setWinner() {
    const sortedCards = this.sortCards();
    const topMass1 = sortedCards[0].content.mass;
    const topMass2 = sortedCards[1].content.mass;
    const topPlayer = sortedCards[0].title;
    this.winner = topMass1 !== topMass2 ? topPlayer : '';
    this.updateScores();
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
