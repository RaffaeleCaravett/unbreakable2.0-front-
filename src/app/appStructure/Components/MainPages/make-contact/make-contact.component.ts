import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormsService } from 'src/app/appStructure/Shared/Services/FormsService/forms.service';

@Component({
  selector: 'app-make-contact',
  templateUrl: './make-contact.component.html',
  styleUrls: ['./make-contact.component.scss']
})
export class MakeContactComponent implements OnInit{
  userForm!: FormGroup;
  allUsers:any
page:number=0;
size:number=10;
currentPage:number=0
totalPages!:number
direction:string='ASC'
sortBy:string ='id'
view:string='table'
@Input() user:any
@Output() userToSend:EventEmitter<any>= new EventEmitter<any>
@Output() location: EventEmitter<string> = new EventEmitter<string>
  constructor(private formBuilder: FormBuilder,private formsService:FormsService,private router:Router) {
    this.formsService.userSubject.subscribe((data:any)=>{
      this.user=data
    })
  }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      continent: [''],
      nation: [''],
      age: [''],
    });
this.allUsers=[]
this.getUsers()
  }
previousPage(){
  this.page-=1
  this.getUsers()
}

nextPage(){
  this.page+=1
 this.getUsers()
}
updateSize(param:string){
  this.size=Number(param)
 this.getUsers()
}

getUsers(){
this.formsService.getAllPaginated(
  this.userForm.controls['firstName'].value, this.userForm.controls['lastName'].value, this.userForm.controls['nation'].value, this.userForm.controls['continent'].value,
   this.userForm.controls['email'].value,Number(this.userForm.controls['age'].value), this.direction, this.sortBy, this.page,this.size
  ).subscribe((users: any) => {
    this.allUsers=[]
    this.allUsers = users;
    this.currentPage=users.number+1
    this.totalPages=users.totalPages
  });
}
sendInfos(user:any){
  if(user.id!=this.user.id){
    this.router.navigate(['/visit-profile', { user: JSON.stringify(user) }]);
  }
}
}

