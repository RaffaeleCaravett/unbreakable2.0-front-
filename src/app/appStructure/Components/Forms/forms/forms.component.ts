import { AfterViewInit, Component, EventEmitter, HostListener, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { ArgumentsServiceService } from 'src/app/appStructure/Shared/Services/ArgumentsService/arguments-service.service';
import { FormsService } from 'src/app/appStructure/Shared/Services/FormsService/forms.service';
import { VisitService } from 'src/app/appStructure/Shared/Services/VisitService/vist.seervice';
import { CommentsAndReviewService } from 'src/app/appStructure/Shared/Services/commentsAndReviewService/commentsAndReview.service';
import { NavService } from 'src/app/appStructure/Shared/Services/navService/nav.service';


@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit, OnDestroy,AfterViewInit{
rotateX:number = 0;
rotateY:number = 0;

@ViewChild('myCanvas', { static: true }) myCanvas: any;
@ViewChild('myCanvas1', { static: true }) myCanvas1: any;
@ViewChild('myCanvas2', { static: true }) myCanvas2: any;
  scene!: THREE.Scene;
  camera!: THREE.PerspectiveCamera;
  renderer!: THREE.WebGLRenderer;
  scene1!: THREE.Scene;
  camera1!: THREE.PerspectiveCamera;
  renderer1!: THREE.WebGLRenderer;
  scene2!: THREE.Scene;
  camera2!: THREE.PerspectiveCamera;
  renderer2!: THREE.WebGLRenderer;
  htmlElementRenderer!:CSS2DRenderer;
  controls!:OrbitControls;
  private grid!: any;
  mouse:THREE.Vector2 = new THREE.Vector2();
  highlightMesh!:THREE.Mesh;
  meshBasicMaterial!:THREE.MeshBasicMaterial;
  isDragging:boolean = false;
  previousMouseX:number = 0;
  previousMouseY:number = 0;
  deltaX:number = 0;
  deltaY:number = 0;
  movingX:number =0
  movingY:number =0
  previousMovingX:number =0
  previousMovingY:number =0
  paramValue!:string
  private subscription!: Subscription;
  gridScale = 1;
  sphereGeometry!:THREE.SphereGeometry;
  sphereMaterial!:THREE.MeshBasicMaterial;
  sphereMesh!:THREE.Mesh;
  pointLight!:THREE.PointLight;
  isLessThan1200!:boolean;
  argumentsArray:any[]=[]
  argumentsArray1:any[]=[]
  formSectionCount!: number;
  visitsArray:any[]=[]
  users:any[]=[]
  rating:number=0
  constructor(private sharedDataService: NavService,private commentsAndRatings:CommentsAndReviewService, private argumentsService:ArgumentsServiceService,
    private visitService:VisitService,private formsService:FormsService){
}
  ngOnInit(): void {
    this.visitService.saveVisit().subscribe((data)=>{
      this.visitService.getVisits().subscribe((visits:any)=>{
        if(visits){
          this.visitsArray=visits
        }
      })
      this.formsService.getAll().subscribe((users:any)=>{
        this.users=users.totalElements

      })
      this.commentsAndRatings.getAllRatingsUnauthorized().subscribe((ratings:any)=>{
        let sum=0;
        if(ratings&&ratings.content){
        ratings.content.forEach((rat:any)=>{
        sum+=rat.rating
        })
      }
      this.rating = sum / ratings.content.length;
      this.rating = parseFloat(this.rating.toFixed(1));
    })
    })

    this.paramValue='login'
if(localStorage.getItem('formsLocation')){
  this.paramValue=localStorage.getItem('formsLocation')!
}
  }
ngOnDestroy(): void {
  this.subscription.unsubscribe();
  }
  geometry!:THREE.PlaneGeometry;
  planeGeometry!:THREE.PlaneGeometry;
  material!:THREE.MeshStandardMaterial
  planeMaterial!:THREE.MeshBasicMaterial
  plane!:THREE.Mesh
  plane1!:THREE.Mesh
  textureLoader!:THREE.TextureLoader;
  displacement:any
  orbit!:OrbitControls
objects:any[]=[]
first:number=0
second:number=1
third:number=2
earthLoader!:SVGLoader;
earthData:any;
earthPaths :any;
earthGlobeMesh!:THREE.Mesh
geometry1!:THREE.SphereGeometry
composer!:EffectComposer;
sphere!:THREE.Points
particlesMesh!:THREE.Points
@Output() location : EventEmitter<string>= new EventEmitter<string>
ngAfterViewInit() {
this.argumentsService.getAllArguments().subscribe((data:any)=>{
  if(data){
    this.argumentsArray=data.content
  }
},err=>{
  console.log(err)
})
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ canvas: this.myCanvas.nativeElement ,antialias:true,alpha:true});
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.orbit= new OrbitControls(this.camera,this.renderer.domElement)
    // this.scene1 = new THREE.Scene();
    // this.camera1 = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    // this.renderer1 = new THREE.WebGLRenderer({ canvas: this.myCanvas1.nativeElement ,antialias:true,alpha:true});
    // this.renderer1.setSize(window.innerWidth, window.innerHeight);
    // this.renderer1.setPixelRatio(window.devicePixelRatio);
    this.scene2 = new THREE.Scene();
    this.camera2 = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer2 = new THREE.WebGLRenderer({ canvas: this.myCanvas2.nativeElement ,antialias:true,alpha:true});
    this.renderer2.setSize(window.innerWidth, window.innerHeight);
    this.renderer2.setClearColor(0xffffff)
    this.renderer2.shadowMap.enabled = true;
this.renderer2.shadowMap.type = THREE.PCFSoftShadowMap;
    this.planeGeometry=new THREE.PlaneGeometry(10,10)
    this.planeMaterial = new THREE.MeshBasicMaterial({
  color:'red',
  side:THREE.DoubleSide,
  visible:false
})
this.plane1=new THREE.Mesh(this.planeGeometry,this.planeMaterial)
this.scene.add(this.plane1)
this.plane1.rotateX(-Math.PI / 2);
 this.grid = new THREE.GridHelper( 10, 10 ,'red','red');
 this.scene.add( this.grid );
 const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
 this.scene.add(ambientLight);
 this.plane1.name='ground'
 this.highlightMesh= new THREE.Mesh(
  new THREE.PlaneGeometry(1,1),
  new THREE.MeshBasicMaterial({
    side:THREE.DoubleSide,
    visible:true,
    transparent:true
    })
)
this.highlightMesh.rotateX(-Math.PI / 2);
this.scene.add(this.highlightMesh)
this.highlightMesh.position.set(0.5, 0, 0.5)
// this.textureLoader = new THREE.TextureLoader();
// this.displacement=this.textureLoader.load('../../../../../assets/textures/displacement.jpeg')
// this.textureLoader.load('../../../../../assets/textures/jude.jpg', (texture) => {
//  this.geometry = new THREE.PlaneGeometry(500,500,64,64)

// this.material = new THREE.MeshStandardMaterial({
//   color:'red',
//   map:texture,
//   displacementMap:this.displacement,
//   displacementScale:200.0
// })
// this.plane= new THREE.Mesh(this.geometry,this.material)
// this.plane.rotateX(-0.7)
// this.plane.rotateY(-0.3)
// this.pointLight = new THREE.PointLight('red',400);
// this.scene1.add(this.plane,this.pointLight,ambientLight)

// });

  const ambientLight1 = new THREE.AmbientLight(0xffffff, 0.5);
  const planeGeometry = new THREE.PlaneGeometry(100, 100);
  const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.5 });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -Math.PI / 2;
  plane.position.y = -5;

  plane.receiveShadow = true;
  this.scene2.add(plane)
  const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight1.position.set(1, 1, 1);
  directionalLight1.castShadow = true;
  this.scene2.add(ambientLight1,directionalLight1)


  const geom = new THREE.SphereGeometry(1,64,64)
  const particlesGeometry= new THREE.BufferGeometry;
  const mat = new THREE.PointsMaterial({
    size:0.02,
    color:'orange'
  })
  // const particlesMat = new THREE.PointsMaterial({
  //   size:0.02,
  //   color:'#666666'
  // })
  this.sphere = new THREE.Points(geom,mat)
  const particlesCnt=3000;
  const posArray=new Float32Array(particlesCnt*3);
  for(let i=0;i<particlesCnt;i++){
    posArray[i]=(Math.random()-0.5)*5
  }
particlesGeometry.setAttribute('position',new THREE.BufferAttribute(posArray,3))
// this.particlesMesh= new THREE.Points(particlesGeometry,particlesMat)

  this.scene2.add(this.sphere)
  this.sphere.position.x=-5.5
  this.sphere.position.y=-3

setInterval(()=>{
  this.updateOpacity()
},500);


    this.renderer.setAnimationLoop(()=>this.animate());
    // this.renderer1.setAnimationLoop(()=>this.animate());
    this.renderer2.setAnimationLoop(()=>this.animate());
    this.animate()

}

numCollectors = 5;

createLine(start :any, end:any) {
  const points = [start, end];
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
  return new THREE.Line(geometry, lineMaterial);
}

materials:any
clock=new THREE.Clock().getElapsedTime();

animate() {
    requestAnimationFrame(()=>this.animate());
    const time = Date.now() * 0.005;
    this.materials = Array.isArray(this.highlightMesh.material)
  ? this.highlightMesh.material
  : [this.highlightMesh.material as THREE.Material];


    const randomX = (Math.random() - 0.5) * 700;
    const randomY = (Math.random() - 0.5) * 700;
    const randomZ = Math.random() * 700;

    const intensity = Math.sin(time) * 2000 + 5;

if(this.pointLight){
    this.pointLight.position.set(randomX, randomY, randomZ);
    this.pointLight.intensity = intensity;
    this.pointLight.distance = 600
}
this.objects.forEach(sphereClone=>{
    sphereClone.rotation.x+=0.001
})
this.renderer.render(this.scene, this.camera);
// this.renderer1.render(this.scene1, this.camera1);
this.renderer2.render(this.scene2, this.camera2);
  this.camera.position.set(10, 15, -22);
  this.camera.lookAt(this.plane1.position)
// this.camera1.position.set(0,-100,950)
this.camera2.position.set(0,0,5)

}

isTransparent = true;
opacity = 0;

updateOpacity() {
  this.opacity = this.isTransparent ? 0 : 1;
  this.isTransparent = !this.isTransparent;
  this.materials[0].opacity = this.opacity;
}

  cubeFaces!:HTMLElement[]
   catchTheEvent(event: MouseEvent): void {
      event.stopPropagation();
    if(this.paramValue=='login'){
     this.isDragging = true;
     this.deltaX=this.deltaX - event.clientX;
       this.deltaY=this.deltaY - event.clientY;
      }
   }


  mousePosition:THREE.Vector2 = new THREE.Vector2();
  raycaster:THREE.Raycaster = new THREE.Raycaster();
  intersects:any[]=[]
  getRandomColor (){
    return Math.floor(Math.random() * 16777215);
  };

sphereClone:any
canvas:any
rect:any
@HostListener('mousemove', ['$event'])
   onMouseMove(event: MouseEvent): void {
    // this.particlesMesh.rotateY(event.clientY)
    // if(event.clientX%2==0 && this.material){
    //   const displacementValue =(event.clientY+event.clientX) / 13;
    //   this.material.displacementScale = displacementValue;
    // }

    if(this.canvas= document.querySelector('.canvas') as HTMLElement){
      this.canvas= document.querySelector('.canvas') as HTMLElement
      this.rect = this.canvas.getBoundingClientRect();
    }
    this.mousePosition.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mousePosition.y = -((event.clientY-(this.rect.top))/ window.innerHeight) * 2 + 1 ;
    this.raycaster.setFromCamera(this.mousePosition, this.camera);
    this.intersects = this.raycaster.intersectObjects(this.scene.children);
    this.intersects.forEach(intersect => {
      if (intersect.object.name === 'ground') {
        this.highlightMesh.visible=false
          const highlightPos = new THREE.Vector3().copy(intersect.point).floor().addScalar(0.5);
          this.highlightMesh.position.set(highlightPos.x, 0, highlightPos.z);
           this.highlightMesh.visible=true

           const objectExists =this.objects.find(obj=>{
            return(obj.position.x===this.highlightMesh.position.x)&&(obj.position.z===this.highlightMesh.position.z)
          })
          if(!objectExists){
           this.highlightMesh.material=new THREE.MeshBasicMaterial({
            side:THREE.DoubleSide,
            visible:true,
            transparent:true,
            color:('green')
           })
          }else{
            this.highlightMesh.material=new THREE.MeshBasicMaterial({
              side:THREE.DoubleSide,
              visible:true,
              transparent:true,
              color:'red'
             })
          }
      }
    });
   }

   @HostListener('mousedown', ['$event'])
   onMouseDown(event: MouseEvent): void {
    const sphereMesh= new THREE.Mesh(
      new THREE.SphereGeometry(0.4,4,2),
      new THREE.MeshBasicMaterial({
        wireframe:true,
        color:this.getRandomColor()
      })
    )
    const objectExists =this.objects.find(obj=>{
      return(obj.position.x===this.highlightMesh.position.x)&&(obj.position.z===this.highlightMesh.position.z)
    })
    if(!objectExists ){
      if(this.scene.children.length<4){
    this.intersects.forEach(intersect => {
      if (intersect.object.name === 'ground') {
          this.sphereClone= sphereMesh.clone()
          this.sphereClone.position.copy(this.highlightMesh.position)
this.sphereClone.position.y+=0.5
this.scene.add(this.sphereClone)
this.objects.push(this.sphereClone)
this.highlightMesh.material=new THREE.MeshBasicMaterial({
  side:THREE.DoubleSide,
  visible:true,
  transparent:true,
  color:'red'
 })
      }
    });
  }else{
    this.objects.forEach(obj=>{
    this.scene.remove(obj)
  })
  this.objects=[]
  this.intersects.forEach(intersect => {
    if (intersect.object.name === 'ground') {
        this.sphereClone= sphereMesh.clone()
        this.sphereClone.position.copy(this.highlightMesh.position)
this.sphereClone.position.y+=0.5
this.scene.add(this.sphereClone)
this.objects.push(this.sphereClone)
this.highlightMesh.material=new THREE.MeshBasicMaterial({
side:THREE.DoubleSide,
visible:true,
transparent:true,
color:'red'
})
    }
  });
}
  }
   }

   @HostListener('mouseup', ['$event'])
   onMouseUp(event: MouseEvent): void {
    if(this.paramValue=='login'){
     this.isDragging = false;
     this.deltaX = 0;
     this.deltaY = 0;
     this.previousMouseX =0;
     this.previousMouseY = 0;
     this.movingX = 0;
     this.movingY = 0;
    }
    }

   @HostListener('mouseleave', ['$event'])
   onMouseLeave(event: MouseEvent): void {
    if(this.paramValue=='login'){
     this.isDragging = false;
    }
   }
   traceScrollYBefore:number =0
   traceScrollYAfter:number =0
   @HostListener('window:scroll', ['$event'])
   onMouseScroll(event: MouseEvent): void {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPosition = window.scrollY;

    // Map the scroll position to a range from 5 to -5
    const mappedValue = this.mapRange(scrollPosition, 0, totalHeight, 5, -5);
    const mappedValueY = this.mapRange(scrollPosition, 0, totalHeight, 3, -3);

this.sphere.position.x=-mappedValue  *1.1
this.sphere.rotation.y=-mappedValue  /4
this.sphere.position.y=-mappedValueY*1.1
 }
  mapRange(value: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  }
  windowHeight = window.innerHeight+'px';
  windowHeightOverFlow=window.innerHeight/2+'px'

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;
    this.camera.aspect = newWidth / newHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(newWidth, newHeight);
    this.camera1.aspect = newWidth / newHeight;
    this.camera1.updateProjectionMatrix();
    this.renderer1.setSize(newWidth, newHeight);
    this.camera2.aspect = newWidth / newHeight;
    this.camera2.updateProjectionMatrix();
    this.renderer2.setSize(newWidth, newHeight);
  }

moveBackward(){
  if(this.first>0){
    this.first-=1
    this.second-=1
    this.third-=1
    this.argumentsArray1=[this.argumentsArray[this.first],this.argumentsArray[this.second],this.argumentsArray[this.third]]
  }
}
moveForward(){
  if(this.third<8){
    this.first+=1
    this.second+=1
    this.third+=1
    this.argumentsArray1=[this.argumentsArray[this.first],this.argumentsArray[this.second],this.argumentsArray[this.third]]
  }
}
onMouseOver(event:MouseEvent){
  const carousel = document.querySelector('.scrollable');
  if (carousel) {
    const width = carousel.clientWidth;
    const mouseX = event.clientX*1.1;
    const scrollX = (mouseX / window.innerWidth) * (carousel.scrollWidth - width);

    carousel.scrollLeft = scrollX;
  }
}
receiveLocation(event:string){
this.location.emit(event)
}
}
