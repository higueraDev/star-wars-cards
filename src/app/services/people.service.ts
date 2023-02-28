import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { People } from '../models/people';
import { AllPeople } from '../models/all-people';

@Injectable({
  providedIn: 'root',
})
export class PeopleService {

  constructor(private http: HttpClient) {}

  public getPeople() {
    return this.http.get<AllPeople>(environment.api + '/people');
  }

  public getPeopleById(id: number) {
    return this.http.get<People>(environment.api + '/people/' + id);
  }
}
