import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommentsAndReviewService } from 'src/app/appStructure/Shared/Services/commentsAndReviewService/commentsAndReview.service';

@Component({
  selector: 'app-modify-comment-dialog',
  templateUrl: './modify-comment-dialog.component.html',
  styleUrls: ['./modify-comment-dialog.component.scss']
})
export class ModifyCommentDialogComponent implements OnInit{

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any[] ,private commentsAndRatingService:CommentsAndReviewService,public dialogRef: MatDialogRef<ModifyCommentDialogComponent>,) { }

  commentiForm!:FormGroup
  ngOnInit(): void {
this.commentiForm= new FormGroup({
  textArea: new FormControl(this.dialogData[3],Validators.required)
})
  }

  submitTextArea(){
    if(this.commentiForm.valid){
      this.commentsAndRatingService.modifyComment(Number(this.dialogData[4]),this.dialogData[0].id,
        {
          argument_id:Number(this.dialogData[1].id),
          user_id:this.dialogData[0].id,
          testo:this.commentiForm.controls['textArea'].value
        }).subscribe((commentoRiuscito:any)=>{
if(commentoRiuscito){
this.dialogRef.close()
}
        })
    }
  }

}
