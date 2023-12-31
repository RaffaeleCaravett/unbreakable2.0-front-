import {  Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommentsAndReviewService } from '../../Services/commentsAndReviewService/commentsAndReview.service';
import { ArgumentsServiceService } from '../../Services/ArgumentsService/arguments-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModifyCommentDialogComponent } from '../dialogs/modifyCommentDialog/modify-comment-dialog/modify-comment-dialog.component';
import { NavService } from '../../Services/navService/nav.service';
import { FormsService } from '../../Services/FormsService/forms.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comments-and-reviews',
  templateUrl: './comments-and-reviews.component.html',
  styleUrls: ['./comments-and-reviews.component.scss']
})
export class CommentsAndReviewsComponent implements OnInit,OnChanges{
  user:any
  @Input() argument_id:number=0
  rating: number = 0;
  hoverRating: number = 0;
  stars = [1, 2, 3, 4, 5];
  alreadyCensed:boolean=false
  ratingSum:number=0
  media:number=0
  allComments:any[]=[]
  argument:any
  previousArgumentId:number=0
  emoji:boolean=false
  @Output() location:EventEmitter<string>= new EventEmitter<string>
  @Output() userToSend:EventEmitter<any>= new EventEmitter<any>

  constructor(private commentsAndRatingService:CommentsAndReviewService,private argumentService:ArgumentsServiceService,private dialogRef:MatDialog,
    private router:Router){
            this.rating=0



     }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes){
      this.user=JSON.parse(localStorage.getItem('user')!)
      this.argument_id=Number(localStorage.getItem('param'))
this.argumentService.getArgumentById(Number(this.argument_id)).subscribe((data:any)=>{
  if(data){
    this.argument=data
  }
  this.ratingSum=0;
      this.takeCommenti(this.argument)
this.takeRatings(this.argument.id)
    })
    }
  }


  commentiForm!:FormGroup
  ngOnInit(): void {
this.commentiForm= new FormGroup({
  textArea: new FormControl('',Validators.required)
})
this.user=JSON.parse(localStorage.getItem('user')!)
this.argument_id=Number(localStorage.getItem('param'))
      this.commentsAndRatingService.getRatingByUser(this.user.id).subscribe((data:any)=>{
      if(data){
        data.forEach((d:any)=>{
  if(d.argument.id==this.argument_id){
    this.rating=d.rating
    this.alreadyCensed=true
        }
        })
   }
  })

  }

submitTextArea(){
  if(this.commentiForm.valid){
    this.commentsAndRatingService.postComment(
      {
        argument_id:Number(this.argument_id),
        user_id:this.user.id,
        testo:this.commentiForm.controls['textArea'].value
      }).subscribe((commentoRiuscito:any)=>{
        this.takeCommenti(this.argument)
this.commentiForm.reset()
      })
  }
}
  rate(star: number): void {
    this.rating = star;
this.commentsAndRatingService.postRating(
  {
    argument_id:Number(this.argument_id),
    user_id:this.user.id,
    rating:this.rating
  }
).subscribe((data:any)=>{
if(data){
  this.alreadyCensed=true
  this.takeRatings(this.argument.id)
}
})

  }
deleteComment(commentId:number,userId:number){
this.commentsAndRatingService.deleteComment(commentId,userId).subscribe((deleted:any)=>{
    this.allComments=[]
this.takeCommenti(this.argument)
})
}
modifyComment(commentId:number,userId:number,text:string){
const dialogRef=this.dialogRef.open(ModifyCommentDialogComponent,{
  data:[
    this.user,
    this.argument,
    this.commentiForm,
    text,
    commentId

  ]
})
dialogRef.afterClosed().subscribe((data:any)=>{
  this.takeCommenti(this.argument)
})

}


takeCommenti(data:any){
  this.commentsAndRatingService.getCommentByArgumentName(data.title).subscribe((comments:any)=>{
    this.allComments=[]
    if(comments){
      this.allComments=comments
      }
  })
}

interact(comment:any,c:any){
this.commentsAndRatingService.interact({
    comment_id:comment.id,
    user_id:this.user.id
}).subscribe((like:any)=>{
  this.takeCommenti(c.argument)
  this.commentsAndRatingService.sendNotification(
{
  sender_id:this.user.id,
  receiver_id:comment.user.id,
  statoNotifica:"NOT_SAW",
  comment_id:comment.id,
friendship_id:0}
  ).subscribe((notification:any)=>{
    console.log(notification)
  },(err)=>{
    console.log(err)
  })
},(err)=>{
  this.takeCommenti(c.argument)
})
}
isThisLiked(comment:any): boolean{
let commentId = comment.id
let userId = this.user.id
let isItLiked:boolean=false
 comment.likeResponseDTOs.forEach((like: any) => {
  if( commentId == like.comment_id && userId == like.user_id){
    isItLiked=true
  }
});
return isItLiked
}

sendInfos(c:any){
  if(c.user.id!=this.user.id){
    const encodedUser = btoa(JSON.stringify(c.user));
    this.router.navigate(['/visit-profile', encodedUser]);  }
}
takeRatings(argumentId:number){

   this.media=0
  this.ratingSum=0

  this.commentsAndRatingService.getRatingByArgumentName(this.argument.title).subscribe((dat:any)=>{
    if(dat){
     dat.forEach((da:any)=>{
       this.ratingSum+= da.rating
     })
     this.media=parseFloat((this.ratingSum / dat.length).toFixed(1));
     if(Number.isNaN(this.media)){
       this.media=0
     }
   }
   })

}
addToTextArea(event:any){
  this.commentiForm.controls['textArea'].setValue(this.commentiForm.controls['textArea'].value+event.srcElement.textContent)
}
}
