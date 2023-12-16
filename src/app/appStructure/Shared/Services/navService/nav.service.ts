import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavService {

  constructor() { }


  dataSubject = new Subject<string>();


  sendData(data: string) {
    this.dataSubject.next(data);
  }
}
