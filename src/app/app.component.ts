import { AfterViewInit, Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
 import * as AOS from 'aos';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { FormsService } from './appStructure/Shared/Services/FormsService/forms.service';
import { AuthService } from './appStructure/Shared/Services/AuthService/Auth.service';

 @Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit ,AfterViewInit, OnChanges{
  title = 'unbreakable2.0';
  @ViewChild('canvas1', { static: false }) private canvasRef1!: ElementRef;
  @ViewChild('canvas2', { static: false }) private canvasRef2!: ElementRef;

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
  string:string=''
  user:any

   constructor(private router:Router,private formsService:FormsService,private authService:AuthService) {
  this.router.events.subscribe((data:any)=>{
    if(data instanceof NavigationEnd && data.url){
          this.string=data.url
    }
  })

   }
   ngOnChanges(changes: SimpleChanges): void {

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
    this.checkTokens();

  }





  ngOnInit(): void {
    // if(localStorage.getItem('location')){
    //   this.router.navigate([`${localStorage.getItem('location')}`])
    // }
    this.negativePositionValue=-18;
this.positivePositionValue=18
    AOS.init();
  }

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


    checkTokens(){
      let param=localStorage.getItem('param')
      if(localStorage.getItem('accessToken')){
        this.formsService.verifyToken(localStorage.getItem('accessToken')!).subscribe((data:any)=>{
        if(data&&data.id){
          this.authService.setToken(localStorage.getItem('accessToken')!)
          this.user= data
          this.formsService.userSubject.next(this.user)
          localStorage.setItem('user',JSON.stringify(this.user))
           this.formsService.isUserAuthenticate(true)
        switch(param){
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
case '11':
  this.router.navigate(['/profile'])
break;
case '12':
  this.router.navigate(['/connect'])
break;
case '13':
  if (localStorage.getItem('userToVisit')) {
    const userToVisit = localStorage.getItem('userToVisit')!;
  const encodedUser = btoa(JSON.stringify(JSON.parse(userToVisit)));
  this.router.navigate(['/visit-profile',encodedUser])
  }else {
    this.router.navigate(['/home'])
  }
break;
case '14':
  this.router.navigate(['/'])
break;
case '15':
  this.router.navigate(['/notfound'])
break;
default:
  this.formsService.isUserAuthenticate(false)
  this.router.navigate(['/'])
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
                this.formsService.userSubject.next(this.user)
                console.log(this.user)
                localStorage.setItem('user',JSON.stringify(this.user))
                this.formsService.isUserAuthenticate(true)
                switch(param){
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
        case '11':
  this.router.navigate(['/profile'])
break;
case '12':
  this.router.navigate(['/connect'])
break;
case '13':
  if (localStorage.getItem('userToVisit')) {
    const userToVisit = localStorage.getItem('userToVisit')!;
  const encodedUser = btoa(JSON.stringify(JSON.parse(userToVisit)));
  this.router.navigate(['/visit-profile',encodedUser])
  }else {
    this.router.navigate(['/home'])
  }
break;
case '14':
  this.router.navigate(['/'])
break;
case '15':
  this.router.navigate(['/notfound'])
break;
        default:
          this.formsService.isUserAuthenticate(false)
          this.router.navigate(['/'])
            break;
                }
              }
            },err=>{
              this.formsService.isUserAuthenticate(false)
              this.router.navigate(['/'])
            })
          }
        },err=>{
          this.formsService.isUserAuthenticate(false)
          this.router.navigate(['/'])
        })
        })
        }
    }

}
