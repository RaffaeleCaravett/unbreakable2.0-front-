import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EmojisService {

  private getAllEmojis:string = "/api/emojis/all"
  private searchEmojis:string = "/api/emojis/search"


  constructor(private http:HttpClient) { }


  getAll(){
    return this.http.get(environment.API_URL+this.getAllEmojis)
  }


  search(name:string){
    return this.http.get(environment.API_URL+this.searchEmojis+`?partialName=${name}`)
  }
}
