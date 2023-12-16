import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class APIsServiceService {

  constructor(private http:HttpClient) { }
  private nations = "/api/nations"
  private cities = "/api/cities"

  postAllNations(nation:{}){
    return this.http.post(environment.API_URL+this.nations,nation)
  }

  postCitiesForNations(city:{}){
    return this.http.post(environment.API_URL+this.cities,city)
  }

  getAllNations(){
    return this.http.get(environment.NATIONS_API)
  }

  getCitiesForNations(city:string){
    return this.http.get(environment.CITIES_API+city)
  }
}
