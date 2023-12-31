import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import {  Subject } from 'rxjs';
import { LoginRequest, SignupRequest } from 'src/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class FormsService {

  constructor(private httpModule:HttpClient) { }

  dataSubject = new Subject<number>();
  userSubject = new Subject<any>();
  private signup = "/auth/register"
  private login = "/auth/login"
  private verifyTkn = "/auth/"
  private uploadImage = "/auth/upload/"
  private user = "/user/"
  private isAuthenticated = false;

  sendData(data: number) {
    this.dataSubject.next(data);
  }
  sendUser(user:any){
    console.log(user)
    this.userSubject.next(user)
  }
signupRequest(body:SignupRequest){
return this.httpModule.post(environment.API_URL+this.signup,body)
}
loginRequest(body:LoginRequest){
  return this.httpModule.post(environment.API_URL+this.login,body)
  }

  verifyToken(token:string){
    return this.httpModule.get(environment.API_URL+this.verifyTkn+token)
  }
  verifyRefreshToken(refreshToken:string){
    return this.httpModule.get(environment.API_URL+this.verifyTkn+'refreshToken/'+refreshToken)
  }
  uploadProfileImage(selectedImage: File, id:number) {
    const formData = new FormData();
      formData.append('immagine_profilo', selectedImage||'');
return this.httpModule.post(environment.API_URL+this.uploadImage+id, formData);
  }
  updateUser(id:number,body:{}){
    return this.httpModule.put(environment.API_URL+this.user+id,body)
  }

  updateUserDescription(id:number,body:{}){
    return this.httpModule.patch(environment.API_URL+this.user+`${id}/description`,body)
  }

  getAll(){
    return this. httpModule.get(environment.API_URL+'/auth/user')
  }
  getAllPaginated(nome?: string, cognome?: string, nazione?: string, continent?: string, email?: string, eta?: number, direction: string = 'ASC', sort: string = 'id', page: number = 0, size: number = 10) {

    return this.httpModule.get(environment.API_URL+`/auth/search?nome=${nome||''}&cognome=${cognome||''}&nazione=${nazione||''}&continent=${continent||''}&email=${email||''}&eta=${Number(eta)}
    &direction=${direction}&sort=${sort}&page=${page}&size=${size}`);
  }

  isUserAuthenticate(bool?:boolean){
    if(bool){
      return this.isAuthenticated=bool
    }else{
      return this.isAuthenticated
    }
  }
}
