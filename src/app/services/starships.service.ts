import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { AllStarships } from '../models/all-starships';
import { Starship } from '../models/starship';

@Injectable({
  providedIn: 'root',
})
export class StarshipsService {
  constructor(private http: HttpClient) {}

  public getStarships() {
    return this.http.get<AllStarships>(environment.api + '/starships');
  }

  public getStarshipById(id: number) {
    return this.http.get<Starship>(environment.api + '/starships/' + id);
  }
}
