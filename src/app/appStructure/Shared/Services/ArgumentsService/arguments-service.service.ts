import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ArgumentsServiceService {

private arguments:string = '/api/arguments'

  constructor(private http:HttpClient) { }

  getAllArguments(){
    return this.http.get(environment.API_URL+this.arguments)
  }
  getArgumentById(id:number){
    return this.http.get(environment.API_URL+this.arguments+'/'+id)
  }
}
