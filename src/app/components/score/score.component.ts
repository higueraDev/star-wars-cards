import { Component, Input } from '@angular/core';
import { Score } from '../../models/score';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss'],
})
export class ScoreComponent {
  @Input() scores: Score[];

  private get topScore() {
    const counts = this.scores.map((score) => score.count);
    return Math.max(...counts);
  }

  private isTopCount(count: number) {
    return count === this.topScore;
  }

  public getCountColor (count: number){
    return this.isTopCount(count) ? 'accent' : 'none'
  }
}
