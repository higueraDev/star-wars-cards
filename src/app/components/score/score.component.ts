import { Component, Input } from '@angular/core';
import { Score } from '../../models/score';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss'],
})
export class ScoreComponent {
  @Input() score: Score;
}
