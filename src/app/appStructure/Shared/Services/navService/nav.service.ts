import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavService {

  constructor() { }


  dataSubject = new Subject<string>();
  paramSubject = new Subject<number>();


  sendData(data: string) {
    this.dataSubject.next(data);
  }
  sendParam(data: number) {
    this.paramSubject.next(data);
  }
}
