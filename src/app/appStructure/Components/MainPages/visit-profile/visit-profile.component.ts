import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EChartsOption } from 'echarts';
import * as L from 'leaflet';
import { CitiesAndNationsService } from 'src/app/appStructure/Shared/Services/ContinentsAndNations/continents-and-nations.service';
import { FriendshipService } from 'src/app/appStructure/Shared/Services/Friendship/friendship.service';
import { CommentsAndReviewService } from 'src/app/appStructure/Shared/Services/commentsAndReviewService/commentsAndReview.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-visit-profile',
  templateUrl: './visit-profile.component.html',
  styleUrls: ['./visit-profile.component.scss']
})
export class VisitProfileComponent implements OnInit{
  chat:boolean=false
  friendshipSent:boolean=false
@Input() user: any
 userThatVisit:any
commentsArray:any[]=[]
ratingsArray:any[]=[]
rating: number = 0;
hoverRating: number = 0;
stars = [1, 2, 3, 4, 5];
page:number=0
size:number=5
orderBy:string='rating'
sortOrder:string="desc"
orderedRatings:any=undefined
option!:EChartsOption
@Output() location= new EventEmitter<string>()
updateDescription!:FormGroup
userForm!:FormGroup
nations:any[]=[]
continents:any[]=[]
submitted:boolean=false

constructor(private commentService:CommentsAndReviewService,private route: ActivatedRoute,
  private continentsAndNations: CitiesAndNationsService, private friendshipService:FriendshipService,
  private commentAndReviewService:CommentsAndReviewService, private spinnerService: NgxSpinnerService
){


}


ngOnInit(){
  this.spinnerService.show();
  console.log("Start")
  setTimeout(()=>{
    console.log("Stop")
    this.spinnerService.hide();
  },1000)
  localStorage.setItem('param', '13')
  this.route.params.subscribe((params) => {
    const encodedUser = params['userData'];
    const decodedUser = JSON.parse(atob(encodedUser));
    this.user = decodedUser;
    localStorage.setItem('userToVisit',JSON.stringify(this.user))
  });
  this.userThatVisit= JSON.parse(localStorage.getItem('user')!)

this.getFriendship()
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

setTimeout(() => {
this.option  = {
  dataset: {
    source: [
      ['score', 'amount', 'product'],
      [this.commentsArray.length, 1000, 'Comments'],
      [this.ratingsArray.length, 1000, 'Reviews'],
      [0, 1000, 'Friends'],
      [0, 1000, 'Likes']
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
var userNation = this.user.nazione.name;
this.setMapViewForNation(userNation);

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
this.updateDescription.disable()
this.userForm.disable()
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

saveFriendship(){
  this.friendshipService.postFriendship(
    {
      sender_id:this.userThatVisit.id,
      receiver_id:this.user.id,
      friendshipState:"SENT"
    }
    ).subscribe((data)=>{
      this.commentAndReviewService.sendNotification(
        {
          sender_id:this.userThatVisit.id,
          receiver_id:this.user.id,
          statoNotifica:"NOT_SAW",
          comment_id:0,
          friendship_id:data}
          ).subscribe((notification:any)=>{
          },(err)=>{
          })
    },err =>{

    })
    setTimeout(()=>{
this.getFriendship()
    },700)
}

removeFriendship(){
  console.log(this.userThatVisit.id)
  this.friendshipService.getFriendshipBySenderId(this.userThatVisit.id).subscribe((sentFriendships:any)=>{
    if(sentFriendships){
sentFriendships.forEach((f:any) => {
  if(f.sender.id==this.userThatVisit.id&&f.receiver.id==this.user.id&&f.friendshipState=="SENT" ||
  f.sender.id==this.userThatVisit.id&&f.receiver.id==this.user.id&&f.friendshipState=="ACCEPTED"){
  this.friendshipService.deleteFriendship(f.id).subscribe((data:any)=>{this.friendshipSent=false})
  }
});}
},err=>{
})
}

getFriendship(){
  this.friendshipService.getFriendshipBySenderId(this.userThatVisit.id).subscribe((sentFriendships:any)=>{
    if(sentFriendships){
sentFriendships.forEach((f:any) => {
  if(f.sender.id==this.userThatVisit.id&&f.receiver.id==this.user.id&&f.friendshipState=="SENT" ||
  f.sender.id==this.userThatVisit.id&&f.receiver.id==this.user.id&&f.friendshipState=="ACCEPTED"){
    this.friendshipSent=true
  }
});
        }
  },err=>{
  })
}

setMapViewForNation(nation: string) {
  var openCageApiKey = '46d2c313a2cf4ff8a6526625fc1a3001';
  var geocodingEndpoint = 'https://api.opencagedata.com/geocode/v1/json';
let map;
  fetch(`${geocodingEndpoint}?key=${openCageApiKey}&q=${encodeURIComponent(nation)}`)
    .then(response => response.json())
    .then(data => {

      if (data.results && data.results.length > 0) {
        var coordinates = data.results[0].geometry;
        map = L.map('map').setView([coordinates.lat, coordinates.lng], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        L.marker([ coordinates.lat, coordinates.lng]).addTo(map)
          .bindPopup(`${this.user.nome} is here`)
          .openPopup();
      } else {
        var continentCoordinates:any = {
          'North America': { lat: 37.0902, lng: -95.7129 },
          'South America': { lat: -14.235, lng: -51.9253 },
          'Europe': { lat: 51.1657, lng: 10.4515 },
          'Africa': { lat: 9.082, lng: 8.6753 },
          'Asia': { lat: 34.0479, lng: 100.6197 },
          'Australia (Oceania)': { lat: -25.2744, lng: 133.7751 },
          'Antartica': { lat: -82, lng: 0 },
        };

        if (continentCoordinates.hasOwnProperty(this.user.continent.name)) {
          var continentCoords = continentCoordinates[this.user.continent.name];
          map = L.map('map').setView([continentCoords.lat, continentCoords.lng], 13);
        } else {
          map = L.map('map').setView([51.505, -0.09], 4);

        }
      }

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      L.marker([continentCoords.lat, continentCoords.lng]).addTo(map)
        .bindPopup(`${this.user.nome} is here`)
        .openPopup();
    })
    .catch(error => {

      map = L.map('map').setView([51.505, -0.09], 4);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      L.marker([51.5, -0.09]).addTo(map)
        .bindPopup(`${this.user.nome} is here`)
        .openPopup();
      console.error('Error fetching geocoding data:', error);
    });
}
}
