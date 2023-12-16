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


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements AfterViewInit, OnChanges{
  chat:boolean=false
  @ViewChild('canvas1', { static: false }) private canvasRef1!: ElementRef;
  @ViewChild('canvas2', { static: false }) private canvasRef2!: ElementRef;
  @ViewChild('x401Speech', { static: false }) private x401Speech!:ElementRef;
  @ViewChild('welcomeSong', { static: false }) private welcomeSong!:ElementRef;
  @Input()location!:String
  bg:boolean=true
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private model!: THREE.Group;
  private mixer!: THREE.AnimationMixer
  private scene1!: THREE.Scene;
  private camera1!: THREE.PerspectiveCamera;
  private renderer1!: THREE.WebGLRenderer;
  private model1!: THREE.Group;
  negativePositionValue!:number;
  positivePositionValue!:number;
  raindropGeometry!: THREE.SphereGeometry;
  raindropMaterial!: THREE.MeshBasicMaterial;
  raindrops: any[]=[];
  raindrop!: THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial, THREE.Object3DEventMap>;
  sondaggio:boolean=true
  sondaggioForm!:FormGroup
  thankYouPhrase!:string
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
  private chatService:ChatService){}

route:Router=this.router
    ngOnInit(){
      localStorage.getItem('welcomeAudioHasStarted')&& localStorage.getItem('welcomeAudioHasStarted')=='true'?
      this.welcomeAudioHasStarted=true:this.welcomeAudioHasStarted=false
this.negativePositionValue=-18;
this.positivePositionValue=18
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
    const canvas = this.canvasRef1.nativeElement as HTMLCanvasElement;
    const canvas1 = this.canvasRef2.nativeElement as HTMLCanvasElement;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    this.camera.position.z = 5;
    this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true ,antialias:true});
    this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setClearColor(0x0077ff, 1);

    this.scene1 = new THREE.Scene();
    this.camera1 = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    this.camera1.position.z = 5;
    this.renderer1 = new THREE.WebGLRenderer({ canvas:canvas1, alpha: true ,antialias:true});
    this.renderer1.setSize(canvas.clientWidth, canvas.clientHeight);
    this.renderer1.setPixelRatio(window.devicePixelRatio)
    this.renderer1.setClearColor(0x000000, 1);

    const loader = new GLTFLoader();
    loader.load('assets/models/sun.glb', (gltf:any) => {
      this.model = gltf.scene;
      this.model.position.x=this.negativePositionValue
      this.model.scale.set(2.7,2.7,2.7 )
      this.scene.add(this.model);
      this.mixer = new THREE.AnimationMixer(this.model);
      const animations = gltf.animations;
      this.mixer.clipAction(animations[0]).play();
      const ambientLight = new THREE.AmbientLight(0xffa500, 2);
       this.scene.add(ambientLight);
      //  this.rotate(this.model)
    });
    loader.load('assets/models/moon.glb', (gltf:any) => {
      this.model1 = gltf.scene;
      this.model1.position.x=this.positivePositionValue
      this.model1.scale.set(8,8,8 )
      this.scene1.add(this.model1);
      this.mixer = new THREE.AnimationMixer(this.model1);
      const animations = gltf.animations;
      this.mixer.clipAction(animations[0]).play();
      const ambientLight = new THREE.AmbientLight(0xffa500, 2);
       const directionalLight = new THREE.DirectionalLight(0xffeedd);
       this.scene1.add(ambientLight,directionalLight);
       this.raindropGeometry = new THREE.SphereGeometry(0.02, 4, 7);
       this.raindropMaterial = new THREE.MeshBasicMaterial({color: 0x888888});
       for (let i = 0; i < 1000; i++) {
        this.raindrop = new THREE.Mesh(this.raindropGeometry, this.raindropMaterial);
        this.raindrop.position.set(
          Math.random() * 10 - 5,
          Math.random() * 10 - 5,
          Math.random() * 10 - 5
        );
        this.raindrops.push(this.raindrop);
        this.scene1.add(this.raindrop);
      }
      //  this.rotate(this.model1)

    });
    loader.load('assets/models/cloud.glb', (gltf:any) => {
      for(let i=0;i<=7;i++){
        const minScale = 0.18;
        const maxScale = 0.22;
        for (let i = 0; i <= 7; i++) {
          const model = gltf.scene.clone()
          const x = Math.random() * 15 - 8;
          const y = Math.random() * 14 - 7;
          const z = Math.random() * 10 - 5;

          model.position.set(x, y, z);
          model.rotation.set(Math.random()*3,Math.random()*3,Math.random()*3)
          const scale = Math.random() * (maxScale - minScale) + minScale;
          model.scale.set(scale, scale, scale);

          const whiteMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

          model.traverse((child: any) => {
            if (child instanceof THREE.Mesh) {
              child.material = whiteMaterial;
            }
          });
          model.name=`${'cloud'}`
          this.scene.add(model);
        }
      }
      this.animate();
    });
    // const controls = new OrbitControls(this.camera, this.renderer.domElement)
    // controls.enableDamping = true
    // controls.dampingFactor = 0.25
    // controls.enableZoom = false
    // const controls1 = new OrbitControls(this.camera1, this.renderer1.domElement)
    // controls1.enableDamping = true
    // controls1.dampingFactor = 0.25
    // controls1.enableZoom = false
setTimeout(()=>{
 if(this.user.img_profilo==null){
      this.formsService.updateUser(this.user.id,
        {
          età:this.user.età,
    email:this.user.email,
    nome:this.user.nome,
    cognome:this.user.cognome,
    continente:this.user.continent.id,
    nazione:this.user.nazione.id,
    img_profilo:"assets/signup/default_profile_picture.jpg"
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
},1000)
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
  // rotate(firstGLB:any){
  //   setInterval(()=>{
  //     firstGLB.rotateX(0.002)
  //     firstGLB.rotateY(0.002)
  //     firstGLB.rotateZ(0.002)
  //     for(let c of this.scene.children){
  //       if(c.name=='cloud'){

  //         if(c.position.x>-16.6&&c.position.x<-12){
  //           c.position.x+=0.06
  //         }
  //         else if (c.position.x>-12&&c.position.x<8.7){
  //         c.position.x+=0.01
  //         }
  //         else if(c.position.x>8.7){
  //           c.position.x+=0.06
  //           if(c.position.x>14.5){
  //          c.position.x=-16.5
  //        }
  //         }
  //       }
  //     }
  //     this.restoreModelsPositions(this.model,this.model1)
  //   },100)
  // }
  animate() {
    requestAnimationFrame(() => this.animate());
    this.renderer.render(this.scene, this.camera);
    // this.animateRain()
    this.renderer1.render(this.scene1, this.camera1);
    this.restoreModelsPositions(this.model,this.model1)

  }

restoreModelsPositions(model:any,model1:any){
if(this.negativePositionValue!=0&&this.positivePositionValue!=0){
  this.negativePositionValue=this.negativePositionValue+0.25
  this.positivePositionValue=this.positivePositionValue-0.25
  if(this.model1){
    model.position.x=this.negativePositionValue
      model1.position.x=this.positivePositionValue
  }
}
}
// animateRain() {
//   for (let i = 0; i < this.raindrops.length; i++) {
//     const raindrop = this.raindrops[i];
//     const randomValue = Number('0.0' + Math.floor(Math.random() * 3));
// raindrop.position.x -= randomValue;
//     if (raindrop.position.x < -5) {
//       raindrop.position.x = 5;
//     }
//   }
// }

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
  this.chatService.findChatByPartecipantId(user.id).subscribe((data:any)=>{
    if(data){
        data.forEach((d:any)=>{
  if(d.starter.id==this.user.id){
    this.currentChat=[]
    this.messagesArray=[]
  this.currentChat=data
  }
  })
this.messagesArray=this.currentChat[0]||null
console.log(this.messagesArray)
      }
    })
    this.chatService.findChatByStarterId(user.id).subscribe((data:any)=>{
        if(data){
            data.forEach((d:any)=>{
      if(d.partecipant.id==this.user.id){
        this.currentChat=[]
        this.messagesArray=[]
        this.currentChat=data
      }
      })
    this.messagesArray=this.currentChat[0]||null
    console.log(this.messagesArray)
          }
        })
}

}
