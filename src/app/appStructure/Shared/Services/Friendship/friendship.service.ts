import { HttpClient } from '@angular/common/http';
import {  Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})

export class FriendshipService {

private friendship:string ='/api/friendship'

constructor(private http:HttpClient){}


getFriendshipBySenderId(senderId:number){
  return this.http.get(environment.API_URL+this.friendship+'/sender/'+senderId)
}
getFriendshipByReceiverId(receiverId:number){
  return this.http.get(environment.API_URL+this.friendship+'/receiver/'+receiverId)
}
postFriendship(body:{}){
  return this.http.post(environment.API_URL+this.friendship,body)
}

modifyFriendship(notificationId:any,receiver_id:number,body:{}){
  return this.http.put(environment.API_URL+this.friendship+`/${notificationId}/${receiver_id}`,body)
}
deleteFriendship(friendship_id:number){
  return this.http.delete(environment.API_URL+this.friendship+'/'+friendship_id)
}
}
