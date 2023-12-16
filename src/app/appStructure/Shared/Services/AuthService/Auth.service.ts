import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  private _token: string | null = null;
  private _refreshToken: string | null = null;

   user: BehaviorSubject<any> = new BehaviorSubject<any>(null);


  get token(): string | null {
    return this._token;
  }
  get refreshToken(): string | null {
    return this._refreshToken;
  }
  setToken(token: string): void {
    this._token = token;
  }
  setRefreshToken(refreshToken: string): void {
    this._refreshToken = refreshToken;
  }
  updateUserDatas(user: any) {
    this.user.next(user);
  }

}
