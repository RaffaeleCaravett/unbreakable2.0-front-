import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { NavService } from '../../Services/navService/nav.service';
import { ArgumentsServiceService } from '../../Services/ArgumentsService/arguments-service.service';
import { CommentsAndReviewService } from '../../Services/commentsAndReviewService/commentsAndReview.service';
import { FormsService } from '../../Services/FormsService/forms.service';
import { Router } from '@angular/router';

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
  private formsService:FormsService,private router:Router){
this.sharedDataService.dataSubject.subscribe((data:any)=>{
  this.navbarToShow=data
})
this.formsService.userSubject.subscribe((data:any)=>{
  this.user=data
})
}
  ngOnChanges(changes: SimpleChanges): void {
    if(this.user){
      this.commentsAndReviewService.getNotification(this.user.id).subscribe((notifications:any)=>{
         this.notificationArray=[]
         this.badgeValue=0
         notifications.forEach((notification:any)=>{
if(notification.receiver.id==this.user.id && notification.statoNotifica=="NOT_SAW"){
  this.notificationArray.push(notification)
  this.badgeValue+=1;
}
         })

  })
   }
    }
  ngOnInit(): void {
    this.navbarToShow?this.navbarToShow=this.navbarToShow:this.navbarToShow='forms'
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

updateNotification(){
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
  switch (param.toLowerCase()) {
    case '/exercise':
      this.sharedDataService.sendParam(4)
      break;
    case '/light':
      this.sharedDataService.sendParam(9)
      break;
    case '/music':
      this.sharedDataService.sendParam(5)
      break;
    case '/heal':
      this.sharedDataService.sendParam(3)
      break;
    case '/food':
      this.sharedDataService.sendParam(2)
      break;
    case '/path':
      this.sharedDataService.sendParam(1)
      break;
    case '/sleep':
      this.sharedDataService.sendParam(8)
      break;
    case '/tips':
      this.sharedDataService.sendParam(6)
      break;
    default:
      console.log(param)
      break;
  }
if(param=='/profile'){
  this.router.navigate([`${param.toLowerCase()}`,this.user.id])
}else{
    this.router.navigate([`${param.toLowerCase()}`])
}

}
}
