import { AfterViewInit, Component, ElementRef, HostListener, Input, OnChanges, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ArgumentsServiceService } from 'src/app/appStructure/Shared/Services/ArgumentsService/arguments-service.service';
import { ChatService } from 'src/app/appStructure/Shared/Services/ChatService/chat.service';
import { FormsService } from 'src/app/appStructure/Shared/Services/FormsService/forms.service';
import { FriendshipService } from 'src/app/appStructure/Shared/Services/Friendship/friendship.service';
import { AuthService } from 'src/app/appStructure/Shared/Services/AuthService/Auth.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements AfterViewInit, OnChanges{
  chat:boolean=false

  @ViewChild('x401Speech', { static: false }) private x401Speech!:ElementRef;
  @ViewChild('welcomeSong', { static: false }) private welcomeSong!:ElementRef;
  @Input()location!:String


  events: string[] = [];
  opened!: boolean ;
  argumentsArray: any=[];
  x401IsSpeaking:boolean=false
  welcomeAudioHasStarted:boolean=false
  @Input() user:any
  userToVisit:any
  friendShipArray:any[]=[]
  chatArray:any[]=[]
  heightChat:number=350;
  chatForm!:FormGroup
  messagesArray:any[]=[]
  currentChat:any
 constructor(private argumentsService:ArgumentsServiceService, private router :Router, private formsService:FormsService,private friendship:FriendshipService,
  private chatService:ChatService,private authService:AuthService,private spinnerService: NgxSpinnerService){

  }

    ngOnInit(){

      localStorage.setItem('param', '10')
        this.checkTokens()
      localStorage.getItem('welcomeAudioHasStarted')&& localStorage.getItem('welcomeAudioHasStarted')=='true'?
      this.welcomeAudioHasStarted=true:this.welcomeAudioHasStarted=false

this.argumentsService.getAllArguments().subscribe((data:any)=>{
  if(data){
    this.argumentsArray=data.content
  }
},err=>{
  console.log(err)
})

  }
playWelcomeAudio(){
  this.welcomeSong.nativeElement.play()
  setTimeout(()=>{
    this.welcomeSong.nativeElement.pause()
    },16000)
}

  ngAfterViewInit(): void {


setTimeout(()=>{
 if(this.user ){
  console.log(this.user.img_profile)
  this.formsService.updateUser(this.user.id,
        {
          età:this.user.età,
    email:this.user.email,
    nome:this.user.nome,
    cognome:this.user.cognome,
    continente:this.user.continent.id,
    nazione:this.user.nazione.id,
    img_profilo:this.user.img_profilo||"assets/signup/default_profile_picture.jpg"
        }
      ).subscribe((updated:any)=>{
        this.user=updated
      })
    }
    this.friendship.getFriendshipBySenderId(this.user.id).subscribe((friendship:any)=>{
     if(friendship){
        this.friendShipArray=friendship
        this.friendShipArray.forEach(friendship=>{
          this.chatService.createChat(
            {
user_id1:friendship.sender.id,
user_id2:friendship.receiver.id
          }).subscribe(data=>{
          })
        })
      }
    })
},2500)
this.chatForm= new FormGroup({
  message: new FormControl('',Validators.required)
})
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.friendShipArray=[]
    if(this.user){
      this.friendship.getFriendshipBySenderId(this.user.id).subscribe((friendship:any)=>{
      if(friendship){
         this.friendShipArray=friendship
         this.friendShipArray.forEach(friendship=>{
           this.chatService.createChat(
             {
 user_id1:friendship.sender.id,
 user_id2:friendship.receiver.id
           }).subscribe(data=>{
           })
         })
       }
     })
    }
    this.location=localStorage.getItem('location')!;
  }





@ViewChild('avatarText',{static:false})private textElement!:ElementRef;
text =
  "Hey there, I'm Avatar X401, your guide to the Unbreakable platform. Super excited to embark on this journey with you! Who Am I? I'm not just your virtual guide;"+
  "think of me as your friendly companion on the path to a stronger, healthier you. My mission? To make your experience with Unbreakable as seamless and enjoyable as possible."+
  "Remember that Unbreakable is not a competition with someone, it only regards yourself. Your starting position is not anyone else's starting position. That being said, take a breath,"+
  "relax yourself and let's kick off this Unbreakable journey together without wasting any time!  So, take a look at the navbar "+
  " if you didn't yet and choose an argument from where to start from. "+
  "Enjoy it! ";
words:any
currentIndex = 0;
interval:any

playSpeech() {
  this.welcomeSong.nativeElement.pause()
this.x401Speech.nativeElement.play();
this.words= this.text.split(" ");
 this.interval= setInterval( ()=> {
  if (this.currentIndex < this.words.length) {
    this.textElement.nativeElement.textContent += this.words[this.currentIndex] + " ";
    this.currentIndex++;
  } else {
    clearInterval(this.interval);
  }
}, 42 * 1000 / this.words.length); }
stopSpeech(){
  this.welcomeSong.nativeElement.pause()
  this.x401Speech.nativeElement.pause();
  clearInterval(this.interval);
}

@HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
if(!this.welcomeAudioHasStarted){
  this.playWelcomeAudio() }
this.welcomeAudioHasStarted=true
localStorage.setItem('welcomeAudioHasStarted','true')
}
@HostListener('click', ['$event'])
  onMouseClick(event: MouseEvent) {
this.welcomeSong.nativeElement.pause()
}
scrollToBottom() {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth'
  });
}

  scrollToTop(){
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
}

onReceiveUserToVisit(event:any){
  this.userToVisit=event
}

receiveLocation(event:string){
console.log(event)
  this.location=event
}

shouldShowButton: boolean = false;

@HostListener('window:scroll', ['$event'])
  onScroll(event:any) {
    if(window.scrollY>50){
      this.shouldShowButton = true;
    }else{
      this.shouldShowButton = false;
    }
  }
windowWidth:number=window.innerWidth
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
     this.windowWidth = window.innerWidth;
  }
addToChatArray(user:any){
  this.chatArray=[]
  this.chatArray.push(user)
  this.chatArray=[...new Set(this.chatArray)]

 this.checkMessages(user)
}
removeFromChatArray(user:any){
  this.chatArray = this.chatArray.filter((u: any) => u.email !== user.email);
}
sendMessage(us:any){

  if(this.chatForm.valid){
this.chatService.sendMessage(
  {
    sender_id:this.user.id,
    receiver_id:us.id,
    text:this.chatForm.controls['message'].value,
    chat_id:this.currentChat[0].id
  }
).subscribe((data:any)=>{
  this.chatForm.reset()
this.checkMessages(us)
})
  }
}

checkMessages(user:any){
  this.messagesArray=[]
  this.chatService.findChatByPartecipantId(user.id).subscribe((data:any)=>{
    if(data){
        data.forEach((d:any)=>{
  if(d.starter.id==this.user.id){
    this.chat=true
    this.currentChat=[]
    this.messagesArray=[]
  this.currentChat=data
  this.messagesArray=data[0].messageList
  }
  })
      }
    })
    this.chatService.findChatByStarterId(user.id).subscribe((data:any)=>{
        if(data){
            data.forEach((d:any)=>{
      if(d.partecipant.id==this.user.id){
        this.chat=true
        this.currentChat=[]
        this.messagesArray=[]
        this.currentChat=data
    this.messagesArray=data[0].messageList
    console.log(this.messagesArray)
      }
      })
          }
        })
}

showSpinner() {
  this.spinnerService.show();

  setTimeout(() => {
    this.spinnerService.hide();
  }, 1000);
}
checkTokens(){
  if(localStorage.getItem('accessToken')){
    this.formsService.verifyToken(localStorage.getItem('accessToken')!).subscribe((data:any)=>{
    if(data&&data.id){
      this.authService.setToken(localStorage.getItem('accessToken')!)
      this.user= data
      localStorage.setItem('user',JSON.stringify(this.user))
       this.formsService.isUserAuthenticate(true)
    switch(localStorage.getItem('param')){
      case '1':
        this.router.navigate(['/path'])
break;
case '2':
this.router.navigate(['/food'])
break;
case '3':
this.router.navigate(['/heal'])
break;
case '4':
this.router.navigate(['/exercise'])
break;
case '5':
this.router.navigate(['/music'])
break;
case '6':
this.router.navigate(['/tips'])
break;
case '7':
this.router.navigate(['/chemistry'])
break;
case '8':
this.router.navigate(['/sleep'])
break;
case '9':
this.router.navigate(['/light'])
break;
case '10':
this.router.navigate(['/home'])
break;
default:
this.formsService.isUserAuthenticate(false)
this.router.navigate([''])
break;
    }

    }
    },(err:any)=>{
    this.formsService.verifyRefreshToken(localStorage.getItem('refreshToken')!).subscribe((data:any)=>{
      if(data){
        localStorage.setItem('accessToken',data.accessToken)
        this.authService.setToken(localStorage.getItem('accessToken')!);
        this.formsService.verifyToken(localStorage.getItem('accessToken')!).subscribe((data:any)=>{
          if(data&&data.id){
            this.user= data
            localStorage.setItem('user',JSON.stringify(this.user))
            this.formsService.isUserAuthenticate(true)
            switch(localStorage.getItem('param')){
              case '1':
                this.router.navigate(['/path'])
    break;
    case '2':
      this.router.navigate(['/food'])
    break;
    case '3':
      this.router.navigate(['/heal'])
    break;
    case '4':
      this.router.navigate(['/exercise'])
    break;
    case '5':
      this.router.navigate(['/music'])
    break;
    case '6':
      this.router.navigate(['/tips'])
    break;
    case '7':
      this.router.navigate(['/chemistry'])
    break;
    case '8':
      this.router.navigate(['/sleep'])
    break;
    case '9':
      this.router.navigate(['/light'])
    break;
    case '10':
      this.router.navigate(['/home'])
    break;
    default:
      this.formsService.isUserAuthenticate(false)
      this.router.navigate([''])
        break;
            }
          }
        })
      }
    },err=>{
      this.formsService.isUserAuthenticate(false)
      this.router.navigate([''])
    })
    })
    }
}

}
