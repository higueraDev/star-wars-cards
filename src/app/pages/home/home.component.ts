import { Component, OnInit } from '@angular/core';
import { Card } from '../../models/card';
import { PeopleService } from '../../services/people.service';
import { People } from '../../models/people';
import { Score } from '../../models/score';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  private players: number = 2;
  public cards: Card[] = [];
  public scores: Score[] = [];

  constructor(private peopleService: PeopleService) {}

  ngOnInit(): void {
    for (let i = 0; i < this.players || i === 10; i++) {
      this.getPeopleCard();
    }
  }

  getPeopleCard() {
    this.peopleService
      .getOneRandomPerson()
      .subscribe((data) => this.createPeopleCard(data));
  }

  createPeopleCard(data: People) {
    const content = data;
    const card = {
      title: 'Player ' + (this.cards.length + 1),
      content,
    };

    this.cards.push(card);
  }
}
