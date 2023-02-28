import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { People } from '../models/people';

@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  private peopleLength = 82;

  constructor(private http: HttpClient) {}

  private getRandomNumber() {
    return Math.round(Math.random() * this.peopleLength) || 1;
  }

  public getOneRandomPerson() {
    return this.http.get<People>(
      environment.api + '/people/' + this.getRandomNumber()
    );
  }
}
