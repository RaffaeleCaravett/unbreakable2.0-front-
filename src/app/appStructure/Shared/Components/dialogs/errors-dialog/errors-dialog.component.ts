import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-errors-dialog',
  templateUrl: './errors-dialog.component.html',
  styleUrls: ['./errors-dialog.component.scss']
})
export class ErrorsDialogComponent {
error:string=''

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:string ) { }

  ngOnInit(){
this.error=this.dialogData

  }}
