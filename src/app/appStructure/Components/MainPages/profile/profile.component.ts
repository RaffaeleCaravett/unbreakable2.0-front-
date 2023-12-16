import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EChartsOption } from 'echarts';
import * as L from 'leaflet';
import { AuthService } from 'src/app/appStructure/Shared/Services/AuthService/Auth.service';
import { CitiesAndNationsService } from 'src/app/appStructure/Shared/Services/ContinentsAndNations/continents-and-nations.service';
import { FormsService } from 'src/app/appStructure/Shared/Services/FormsService/forms.service';
import { FriendshipService } from 'src/app/appStructure/Shared/Services/Friendship/friendship.service';
import { CommentsAndReviewService } from 'src/app/appStructure/Shared/Services/commentsAndReviewService/commentsAndReview.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  @Input() user:any
  commentsArray:any[]=[]
  ratingsArray:any[]=[]
  rating: number = 0;
  hoverRating: number = 0;
  stars = [1, 2, 3, 4, 5];
  page:number=0
  size:number=5
  orderBy:string='rating'
  sortOrder:string="desc"
  orderedRatings:any[]=[]
  option!:EChartsOption
  @Output() location= new EventEmitter<string>()
  updateDescription!:FormGroup
  userForm!:FormGroup
  nations:any[]=[]
  continents:any[]=[]
  submitted:boolean=false
  likesArray:any=[]
  friendshipArray:any=[]
constructor(private commentService:CommentsAndReviewService,
  private authService:AuthService,
  private cdr: ChangeDetectorRef,private continentsAndNations: CitiesAndNationsService,private signupService:FormsService,
  private friendshipService:FriendshipService){}


ngOnInit(){
  this.submitted=false
  this.continentsAndNations.getAllContinents().subscribe((data:any)=>{
    if(data && data.content){
      this.continents=data.content;
    }
  })
this.commentService.getCommentByUser(this.user.id).subscribe((comments:any)=>{
  if(comments){
    this.commentsArray=comments
  }
})
this.commentService.getRatingByUser(this.user.id).subscribe((ratings:any)=>{
  if(ratings){
    this.ratingsArray=ratings
  }
})

this.commentService.getRatingByUserPaginated(this.user.id,this.page,this.size,this.orderBy,this.sortOrder).subscribe((ordered:any)=>{
  if(ordered){
   this.orderedRatings=ordered.content
  }
})

this.commentService.findLikesByUserId(Number(this.user.id)).subscribe((likes)=>{
  console.log(likes)
  this.likesArray=likes
})
this.friendshipService.getFriendshipByReceiverId(this.user.id).subscribe((friendship)=>{
  console.log(friendship)
  this.friendshipArray=friendship
})
setTimeout(() => {
  this.option  = {
    dataset: {
      source: [
        ['score', 'amount', 'product'],
        [this.commentsArray.length, 500, 'Comments'],
        [this.ratingsArray.length, 500, 'Reviews'],
        [this.friendshipArray.length, 500, 'Friends'],
        [this.likesArray.length, 500, 'Likes']
      ]
    },
    grid: { containLabel: true },
    xAxis: { name: 'amount' },
    yAxis: { type: 'category' },
    visualMap: {
      orient: 'horizontal',
      left: 'center',
      min: 0,
      max: 1000,
      text: ['High Score', 'Low Score'],
      dimension: 0,
      inRange: {
        color: ['#65B581', '#FFCE34', '#FD665F']
      }
    },
    series: [
      {
        type: 'bar',
        encode: {
          x: 'amount',
          y: 'product'
        }
      }
    ]
  };
}, 1000);
const map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

L.marker([51.5, -0.09]).addTo(map)
  .bindPopup('You are here.')
  .openPopup();



  this.updateDescription=new FormGroup({
    description: new FormControl(this.user.description||'')
  })

this.userForm=new FormGroup({
  nome: new FormControl(this.user.nome),
  cognome:new FormControl(this.user.cognome),
  email:new FormControl(this.user.email),
  continente:new FormControl(),
  nazione:new FormControl(),
  eta:new FormControl(this.user.età)
})
this.userForm.controls['continente'].setValue(this.user.continent.id)
this.callNationsByContinentId(this.userForm.controls['continente'].value)
this.userForm.controls['nazione'].setValue(this.user.nazione.id)
this.userForm.updateValueAndValidity()
}

callNationsByContinentId(continentId:number){
  if(continentId){
    this.continentsAndNations.getNationsByContinentId(continentId).subscribe((data:any)=>{
     this.nations=[]
    this.nations=data
  })
  }else{
    this.nations=[]
  }
  }

  updateUser(){
    console.log(this.user.id)
   this.signupService.updateUser(Number(this.user.id),
    {
      età:this.userForm.controls['eta'].value||this.user.età,
      email:this.userForm.controls['email'].value||this.user.email,
      nome:this.userForm.controls['nome'].value||this.user.nome,
      cognome:this.userForm.controls['cognome'].value||this.user.cognome,
      continente:Number(this.userForm.controls['continente'].value||this.user.continent.it),
      img_profilo:this.user.img_profilo,
      nazione:Number(this.userForm.controls['nazione'].value||this.user.nazione.id),
      description:this.updateDescription.controls['description'].value||this.user.description
   }).subscribe((data:any)=>{
    if(data){
      this.user=data
this.authService.updateUserDatas(data)
      this.cdr.detectChanges()
      this.submitted= true
    }
   })
  }
}
