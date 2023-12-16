import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CitiesAndNationsService {

  private continents:string = "/api/continents";
  private nations:string = "/api/nations/continents/";

  constructor(private http:HttpClient) { }

  getAllContinents(){
    return this.http.get(environment.API_URL+this.continents)
  }

  getNationsByContinentId(continentId: number) {
    return this.http.get(environment.API_URL + this.nations + continentId);
  }
}
