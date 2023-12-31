import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { NavService } from '../../Services/navService/nav.service';
import { ArgumentsServiceService } from '../../Services/ArgumentsService/arguments-service.service';
import { CommentsAndReviewService } from '../../Services/commentsAndReviewService/commentsAndReview.service';
import { FormsService } from '../../Services/FormsService/forms.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthGuard } from 'src/app/appStructure/Core/Guard/auth.guard';
import { AuthService } from '../../Services/AuthService/Auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit,AfterViewInit,OnChanges{
  @ViewChild('canvas1', { static: false }) private canvasRef1!: ElementRef;
  badgeValue:number = 0
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private model!: THREE.Group;
  private mixer!: THREE.AnimationMixer
  @Output() formLocation : EventEmitter<string>= new EventEmitter<string>
  @Output() homeLocation : EventEmitter<string>= new EventEmitter<string>
  @Input() navbarToShow!:string
  argumentsArray:any=[]
  user:any
location:any=''
bg:boolean=true
notificationArray:any[]=[]
constructor(private sharedDataService: NavService,private argumentsService:ArgumentsServiceService,private commentsAndReviewService:CommentsAndReviewService,
  private formsService:FormsService,private router:Router,private spinnerService: NgxSpinnerService){
this.sharedDataService.dataSubject.subscribe((data:any)=>{
  this.navbarToShow=data
})
this.formsService.userSubject.subscribe((data:any)=>{
  this.user=data
this.getNotifications()
})
}
  ngOnChanges(changes: SimpleChanges): void {

    }
  ngOnInit(): void {

    this.navbarToShow?this.navbarToShow=this.navbarToShow:this.navbarToShow='forms'
    if(!this.formsService.isUserAuthenticate()){
this.navbarToShow='forms'
    }
    this.argumentsService.getAllArguments().subscribe((data:any)=>{
      if(data){
        this.argumentsArray=data.content
      }
    },err=>{
      console.log(err)
    })

  }

  ngAfterViewInit(): void {
    if(this.canvasRef1){
      const canvas = this.canvasRef1.nativeElement as HTMLCanvasElement;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    this.camera.position.z = 5;
    this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true ,antialias:true});
    this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio)



      const loader = new GLTFLoader();
      loader.load('assets/models/animated_arrow.glb', (gltf:any) => {
      this.model = gltf.scene;
      this.model.scale.set(0.8,0.8,0.8)
      this.model.rotateY(1.1)
      this.scene.add(this.model);
      this.mixer = new THREE.AnimationMixer(this.model);
      const animations = gltf.animations;
      this.mixer.clipAction(animations[0]).play();
      const ambientLight = new THREE.AmbientLight(0xffa500, 2);
       this.scene.add(ambientLight);


      this.animate();
    });
  }

if(localStorage.getItem('param')){
  this.navbarToShow=''
}
  }
  animate() {
    requestAnimationFrame(() => this.animate());
    this.mixer.update(0.05);
    this.renderer.render(this.scene, this.camera);
  }

  goToForms(params:string,clear?:string){
    if(clear=='clear'){
      this.formsService.isUserAuthenticate(true)
      this.navbarToShow='forms'
      localStorage.clear()
    }
this.router.navigate(['/forms'])
localStorage.setItem('formsLocation',params)
  }

updateNotification(event:any){
  this.badgeValue=0
  this.notificationArray.forEach((notification:any)=>{
    let body
if(notification.comment){
  body={
    sender_id:notification.sender.id,
    receiver_id:notification.receiver.id,
    statoNotifica:notification.statoNotifica,
    comment_id:notification.comment.id,
    friendship_id:null
}
}else{
  body={
    sender_id:notification.sender.id,
    receiver_id:notification.receiver.id,
    statoNotifica:notification.statoNotifica,
    comment_id:null,
    friendship_id:notification.friendship.id
}
}

    this.commentsAndReviewService.updateNotification(notification.id,this.user.id,
      body).subscribe((check:any)=>{

       })
  })

}
goToRoute(param:string){



  let p=0;
  switch (param.toLowerCase()) {
    case '/exercise':
      p=4
      break;
    case '/light':
      p=9
      break;
    case '/music':
      p=5
      break;
    case '/heal':
      p=3
      break;
    case '/food':
      p=2
      break;
    case '/path':
      p=1
      break;
    case '/sleep':
      p=8
      break;
    case '/tips':
      p=6
      break;
      case '/chemistry':
      p=7
      break;
      case '/home':
        p=10
        break;
    default:
     p=0
      break;
  }
  this.spinnerService.show();
  setTimeout(()=>{
    this.spinnerService.hide();
  },1000)
localStorage.setItem('param', p.toString())
  this.router.navigate([`${param.toLowerCase()}`])
}

getNotifications(){
  this.commentsAndReviewService.getNotification(this.user.id).subscribe((notifications:any)=>{
    this.notificationArray=[]
    this.badgeValue=0
    notifications.forEach((notification:any)=>{
if(notification.receiver.id==this.user.id && notification.statoNotifica=="NOT_SAW"){
this.notificationArray.push(notification)
this.badgeValue+=1;
}else{
}
    })

})
}
}
