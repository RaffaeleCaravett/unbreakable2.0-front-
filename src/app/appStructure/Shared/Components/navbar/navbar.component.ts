import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { NavService } from '../../Services/navService/nav.service';
import { ArgumentsServiceService } from '../../Services/ArgumentsService/arguments-service.service';
import { CommentsAndReviewService } from '../../Services/commentsAndReviewService/commentsAndReview.service';

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
  @Input() navbarToShow:string=''
  argumentsArray:any=[]
  @Input() user:any
location:any=''
bg:boolean=true
notificationArray:any[]=[]
constructor(private sharedDataService: NavService,private argumentsService:ArgumentsServiceService,private commentsAndReviewService:CommentsAndReviewService){

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
    this.navbarToShow=''
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
      localStorage.clear()
    }
    this.formLocation.emit('forms')
    this.sharedDataService.sendData(params);
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
console.log('modified')  })
  })

}

}
