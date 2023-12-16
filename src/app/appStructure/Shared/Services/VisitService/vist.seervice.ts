import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class VisitService {

  constructor(private http:HttpClient) { }


  private visit= "/api/visit"


  saveVisit(){
return this.http.post(environment.API_URL+this.visit,{})
  }


  getVisits(){
    return this.http.get(environment.API_URL+this.visit)
  }
}
