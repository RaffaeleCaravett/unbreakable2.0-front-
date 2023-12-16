import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CommentsAndReviewService {

  private ratings:string = '/api/ratings'
  private ratingsByArgument:string = '/api/ratings/argument/'
  private ratingsByUser:string = '/api/ratings/user/'
  private comments:string = '/api/comments'
  private commentsByArgument:string = '/api/comments/argument/'
  private commentsByUser:string = '/api/comments/user/'
  private ratingsUnauthorized:string='/auth/rating'
  private likes:string='/api/likes'
  private commentUser:string ='/commentoUser'
  private notification:string='/api/notification'

  constructor(private http:HttpClient) { }

  getAllRatings(){
    return this.http.get(environment.API_URL+this.ratings)
  }
  getAllRatingsUnauthorized(){
    return this.http.get(environment.API_URL+this.ratingsUnauthorized)
  }

  postRating(body:{}){
    return this.http.post(environment.API_URL+this.ratings,body)
  }

  getRatingByArgumentName(argumentName:string){
  return this.http.get(environment.API_URL+this.ratingsByArgument+argumentName)
  }

  getRatingByUser(userId:number){
    return this.http.get(environment.API_URL+this.ratingsByUser+userId)
  }

  getAllComments(){
    return this.http.get(environment.API_URL+this.comments)
  }

  postComment(body:{}){
    return this.http.post(environment.API_URL+this.comments,body)
  }

  getCommentByArgumentName(argumentName:string){
  return this.http.get(environment.API_URL+this.commentsByArgument+argumentName)
  }

  getCommentByUser(userId:number){
    return this.http.get(environment.API_URL+this.commentsByUser+userId)
  }
deleteComment(commentId:number,userId:number){
return this.http.delete(environment.API_URL+this.comments+`/${commentId}/${userId}`)
}
modifyComment(commentId:number,userId:number,body:{}){
  return this.http.put(environment.API_URL+this.comments+`/${commentId}/${userId}`,body)
}

getRatingByUserPaginated(userId:number,page:number,size:number,orderBy:string,sortDirection:string){
  return this.http.get(environment.API_URL+this.ratingsByUser+'paginatedByRating/'+`${userId}?page=${page}&size=${size}&orderBy=${orderBy}&sortDirection=${sortDirection}`)
}

interact(body:{}){
return this.http.post(environment.API_URL+this.likes,body)
}
findLikesByCommentAndUser(commentId: number, userId: number){
  return this.http.get(environment.API_URL+this.likes+`${this.commentUser}?commentId=${commentId}&userId=${userId}`);
}
findLikesByUserId( userId: number){
  return this.http.get(environment.API_URL+this.likes+`/user/${userId}`);
}
sendNotification(body:{}){
  return this.http.post(environment.API_URL+this.notification,body)
}
getNotification(getterId:number){
  return this.http.get(environment.API_URL+this.notification+'/receiver/'+getterId)
}

updateNotification(notificationId:number,userId:number,body:{}){
return this.http.put(environment.API_URL+this.notification+`/${notificationId}/${userId}`,body)
}
}
