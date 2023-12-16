import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private chat:string = "/api/chat"
  private message:string = "/api/message"

  constructor(private http:HttpClient) { }


createChat(body:{}){
return this.http.post(environment.API_URL+this.chat,body)
}
findChatByStarterId(id:any){
return this.http.get(environment.API_URL+this.chat+"/starter/"+id)
}
findChatByPartecipantId(id:any){
  return this.http.get(environment.API_URL+this.chat+"/partecipant/"+id)
}
sendMessage(body:{}){
  return this.http.post(environment.API_URL+this.message,body)

}
}
