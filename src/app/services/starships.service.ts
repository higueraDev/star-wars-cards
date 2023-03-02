import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { AllStarshipsDTO } from '../models/all-starships-dto';
import { StarshipDTO } from '../models/starship-dto';

@Injectable({
  providedIn: 'root',
})
export class StarshipsService {
  constructor(private http: HttpClient) {}

  public getStarships() {
    return this.http.get<AllStarshipsDTO>(environment.api + '/starships');
  }

  public getStarshipById(id: number) {
    return this.http.get<StarshipDTO>(environment.api + '/starships/' + id);
  }
}
