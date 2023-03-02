import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { PeopleDTO } from '../models/people-dto';
import { AllPeopleDTO } from '../models/all-people-dto';

@Injectable({
  providedIn: 'root',
})
export class PeopleService {

  constructor(private http: HttpClient) {}

  public getPeople() {
    return this.http.get<AllPeopleDTO>(environment.api + '/people');
  }

  public getPeopleById(id: number) {
    return this.http.get<PeopleDTO>(environment.api + '/people/' + id);
  }
}
