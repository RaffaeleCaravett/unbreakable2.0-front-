import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

@Component({
  selector: 'app-unbreackable-letters',
  templateUrl: './unbreackable-letters.component.html',
  styleUrls: ['./unbreackable-letters.component.scss']
})
export class UnbreackableLettersComponent implements AfterViewInit{
  @ViewChild('canvas3', { static: true }) private canvasRef3!: ElementRef;

@Input()letter!:string

private scene1 = new THREE.Scene();
private camera1 = new THREE.PerspectiveCamera(75, 16 / 7, 0.1, 1000);
private renderer1!: THREE.WebGLRenderer;
coneGeometry:THREE.BoxGeometry = new THREE.BoxGeometry(0.4, 0.4,0.4);
colors:any[] = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff];
text:string = "Unbreakable";
xPosition:number = 0;
yPosition:number = 3;
zPosition:number = 1;
cones:any[]=[]
randomNumbers:number[]=[0.09,-0.09]
yGoesUp: boolean=false;
xGoesDiagonal:boolean=false
coneMaterial!:THREE.MeshBasicMaterial;
cone!:THREE.Mesh;
coneMaterial2!:THREE.MeshBasicMaterial;
cone2!:THREE.Mesh;
coneMaterial3!:THREE.MeshBasicMaterial;
cone3!:THREE.Mesh;
coneMaterial4!:THREE.MeshBasicMaterial;
cone4!:THREE.Mesh;
coneMaterial5!:THREE.MeshBasicMaterial;
cone5!:THREE.Mesh;
coneMaterial6!:THREE.MeshBasicMaterial;
cone6!:THREE.Mesh;
coneMaterial7!:THREE.MeshBasicMaterial;
cone7!:THREE.Mesh;
conesToRotate:any[]=[]

ngAfterViewInit(){
  const canvas3 = this.canvasRef3.nativeElement as HTMLCanvasElement;
  this.renderer1 = new THREE.WebGLRenderer({ canvas:canvas3, alpha: true ,antialias:true});
  this.renderer1.setSize(canvas3.clientWidth, canvas3.clientHeight);
  this.renderer1.setPixelRatio(window.devicePixelRatio)
  this.camera1.position.z = 5;
  this.scene1.clear()
  if(this.letter=='U'){
    for (let i = 0; i <=121; i++) {
      this.coneMaterial = new THREE.MeshBasicMaterial({ color:this.colors[Math.floor(Math.random() * this.colors.length)] });
      this.cone = new THREE.Mesh(this.coneGeometry, this.coneMaterial);
      this.coneMaterial2 = new THREE.MeshBasicMaterial({ color: this.colors[Math.floor(Math.random() * this.colors.length)] });
      this.cone2 = new THREE.Mesh(this.coneGeometry, this.coneMaterial2);
      this.coneMaterial3 = new THREE.MeshBasicMaterial({ color: this.colors[Math.floor(Math.random() * this.colors.length)] });
      this.cone3 = new THREE.Mesh(this.coneGeometry, this.coneMaterial3);
     this.coneMaterial4 = new THREE.MeshBasicMaterial({ color: this.colors[Math.floor(Math.random() * this.colors.length)] });
     this.cone4 = new THREE.Mesh(this.coneGeometry, this.coneMaterial4);
      this.coneMaterial5 = new THREE.MeshBasicMaterial({ color: this.colors[Math.floor(Math.random() * this.colors.length)] });
      this.cone5 = new THREE.Mesh(this.coneGeometry, this.coneMaterial5);
      this.coneMaterial6 = new THREE.MeshBasicMaterial({ color: this.colors[Math.floor(Math.random() * this.colors.length)] });
      this.cone6 = new THREE.Mesh(this.coneGeometry, this.coneMaterial6);
      this.coneMaterial7 = new THREE.MeshBasicMaterial({ color: this.colors[Math.floor(Math.random() * this.colors.length)] });
      this.cone7 = new THREE.Mesh(this.coneGeometry, this.coneMaterial7);
      this.cone.position.set(this.xPosition, this.yPosition, 0);
      this.cone2.position.set(this.xPosition+0.2, this.yPosition, 0);
      this.cone3.position.set(this.xPosition+0.5, this.yPosition, 0);
      this.cone4.position.set(this.xPosition+0.8, this.yPosition, 0);
      this.cone5.position.set(this.xPosition+1.1, this.yPosition, 0);
      this.cone6.position.set(this.xPosition+1.3, this.yPosition, 0);
      this.cone7.position.set(this.xPosition+1.5, this.yPosition, 0);
      this.cone.name='U'+i
      this.cone2.name='U'+i
      this.cone3.name='U'+i
      this.cone4.name='U'+i
      this.cone5.name='U'+i
      this.cone6.name='U'+i
      this.cone7.name='U'+i
      if(i<50){
this.yPosition += -0.11;
      }
      if(i>50&&i<=60){
        this.yPosition += -0.08;
        this.xPosition+=0.27

              }
              if(i>60&&i<=70){
                this.yPosition += 0.08;
                this.xPosition+=0.27
                this.cone.name='U'+i

                      }
                      if(i>70&&i<=121){
                        this.yPosition+=0.11
                        this.cone.name='U'+i

                      }

      this.scene1.add(this.cone,this.cone2,this.cone3,this.cone4,this.cone5,this.cone6,this.cone7)
      this.conesToRotate = [this.cone, this.cone2, this.cone3,this.cone4,this.cone5,this.cone6,this.cone7];
      this.cones.push(this.conesToRotate)
      }

this.animate()
  }
//   if(this.letter=='N'){
//     for (let i = 0; i <=150; i++) {
//       this.coneMaterial = new THREE.MeshBasicMaterial({ color:this.colors[Math.floor(Math.random() * this.colors.length)] });
//       this.cone = new THREE.Mesh(this.coneGeometry, this.coneMaterial);
//       this.coneMaterial2 = new THREE.MeshBasicMaterial({ color: this.colors[Math.floor(Math.random() * this.colors.length)] });
//       this.cone2 = new THREE.Mesh(this.coneGeometry, this.coneMaterial2);
//       this.coneMaterial3 = new THREE.MeshBasicMaterial({ color: this.colors[Math.floor(Math.random() * this.colors.length)] });
//       this.cone3 = new THREE.Mesh(this.coneGeometry, this.coneMaterial3);
//       this.coneMaterial4 = new THREE.MeshBasicMaterial({ color: this.colors[Math.floor(Math.random() * this.colors.length)] });
//       this.cone4 = new THREE.Mesh(this.coneGeometry, this.coneMaterial4);
//       this.coneMaterial5 = new THREE.MeshBasicMaterial({ color: this.colors[Math.floor(Math.random() * this.colors.length)] });
//       this.cone5 = new THREE.Mesh(this.coneGeometry, this.coneMaterial5);
//       this.coneMaterial6 = new THREE.MeshBasicMaterial({ color: this.colors[Math.floor(Math.random() * this.colors.length)] });
//       this.cone6 = new THREE.Mesh(this.coneGeometry, this.coneMaterial6);
//       this.coneMaterial7 = new THREE.MeshBasicMaterial({ color: this.colors[Math.floor(Math.random() * this.colors.length)] });
//       this.cone7 = new THREE.Mesh(this.coneGeometry, this.coneMaterial7);
//       this.cone.position.set(this.xPosition, this.yPosition, 0);
//       this.cone2.position.set(this.xPosition+0.2, this.yPosition, 0);
//       this.cone3.position.set(this.xPosition+0.4, this.yPosition, 0);
//       this.cone4.position.set(this.xPosition+0.6, this.yPosition, 0);
//       this.cone5.position.set(this.xPosition+0.8, this.yPosition, 0);
//       this.cone6.position.set(this.xPosition+1, this.yPosition, 0);
//       this.cone7.position.set(this.xPosition+1.2, this.yPosition, 0);
//       this.cone.name='N'+i
//       this.cone2.name='N'+i
//       this.cone3.name='N'+i
//       this.cone4.name='N'+i
//       this.cone5.name='N'+i
//       this.cone6.name='N'+i
//       this.cone7.name='N'+i
//       if(i<=50){
//       this.yPosition+=-0.18

//       }
//       if(i>50&&i<=110){
//         if(i==51){
//           this.yPosition=3
//         }
//         this.yPosition+=-0.1085
//         this.xPosition+=0.08
//       }
//       if(i>110&&i<=150){
//         if(i==111){
//           this.xPosition+=0.8
//         }
//         this.yPosition+=0.165
//         }
//         this.scene1.add(this.cone,this.cone2,this.cone3,this.cone4,this.cone5,this.cone6,this.cone7)
//         this.conesToRotate = [this.cone, this.cone2, this.cone3,this.cone4,this.cone5,this.cone6,this.cone7];
//       this.cones.push(this.conesToRotate)
//       }
// this.animate()
//   }
//   if(this.letter=='B'){
//     for (let i = 0; i <=220; i++) {

//       this.coneMaterial = new THREE.MeshBasicMaterial({ color:this.colors[Math.floor(Math.random() * this.colors.length)] });
//       this.cone = new THREE.Mesh(this.coneGeometry, this.coneMaterial);
//       this.coneMaterial2 = new THREE.MeshBasicMaterial({ color: this.colors[Math.floor(Math.random() * this.colors.length)] });
//       this.cone2 = new THREE.Mesh(this.coneGeometry, this.coneMaterial2);
//       this.coneMaterial3 = new THREE.MeshBasicMaterial({ color: this.colors[Math.floor(Math.random() * this.colors.length)] });
//       this.cone3 = new THREE.Mesh(this.coneGeometry, this.coneMaterial3);
//       this.coneMaterial4 = new THREE.MeshBasicMaterial({ color: this.colors[Math.floor(Math.random() * this.colors.length)] });
//       this.cone4 = new THREE.Mesh(this.coneGeometry, this.coneMaterial4);
//       this.coneMaterial5 = new THREE.MeshBasicMaterial({ color: this.colors[Math.floor(Math.random() * this.colors.length)] });
//       this.cone5 = new THREE.Mesh(this.coneGeometry, this.coneMaterial5);
//       this.coneMaterial6 = new THREE.MeshBasicMaterial({ color: this.colors[Math.floor(Math.random() * this.colors.length)] });
//       this.cone6 = new THREE.Mesh(this.coneGeometry, this.coneMaterial6);
//       this.coneMaterial7 = new THREE.MeshBasicMaterial({ color: this.colors[Math.floor(Math.random() * this.colors.length)] });
//       this.cone7 = new THREE.Mesh(this.coneGeometry, this.coneMaterial7);
//       this.cone.position.set(this.xPosition, this.yPosition, 0);
//       this.cone2.position.set(this.xPosition+0.2, this.yPosition, 0);
//       this.cone3.position.set(this.xPosition+0.4, this.yPosition, 0);
//       this.cone4.position.set(this.xPosition+0.6, this.yPosition, 0);
//       this.cone5.position.set(this.xPosition+0.8, this.yPosition, 0);
//       this.cone6.position.set(this.xPosition+1, this.yPosition, 0);
//       this.cone7.position.set(this.xPosition+1.2, this.yPosition, 0);
//       this.cone.name='B'+i
//       this.cone2.name='B'+i
//       this.cone3.name='B'+i
//       this.cone4.name='B'+i
//       this.cone5.name='B'+i
//       this.cone6.name='B'+i
//       this.cone7.name='B'+i
//       if(i<=30){
//         this.yPosition+=-0.2
//         }else if(i>30&&i<=220){
//           if(i<=55){
//             this.xPosition+=0.2
//           }else if(i>55&&i<=62){
//             this.yPosition+=0.05;
//             this.xPosition+=0.2
//           }else if(i>62&&i<=65){
//             this.yPosition+=0.1;
//             this.xPosition+=0.01
//           }else if(i>65&&i<=70){
//             this.yPosition+=0.2;
//             this.xPosition+=0.09
//           }else if(i>70&&i<=73){
//             this.yPosition+=0.2;
//             this.xPosition+=-0.09
//           }else if(i>73&&i<=79){
//             this.yPosition+=0.1;
//             this.xPosition+=-0.2
//           }else if(i>79&&i<=100){
//             this.yPosition+=0.025;
//             this.xPosition+=-0.2
//           }else if(i>100&&i<=105){
//             this.yPosition+=0.025;
//             this.xPosition+=0.2
//           }else if(i>105&&i<=113){
//             this.yPosition+=0.025;
//             this.xPosition+=0.1
//           }else if(i>113&&i<=125){
//             this.yPosition+=0.04;
//             this.xPosition+=0.1
//           }else if(i>125&&i<=130){
//             this.yPosition+=0.07;
//             this.xPosition+=0.05
//           }else if(i>130&&i<=136){
//             this.yPosition+=0.07;
//             this.xPosition+=0.05
//           }else if(i>136&&i<=140){
//             this.yPosition+=0.07;
//             this.xPosition+=-0.02
//           }else if(i>136&&i<=160){
//             this.yPosition+=0.025;
//             this.xPosition+=-0.01
//           }else if(i>160&&i<=185){
//             this.yPosition+=0.02;
//             this.xPosition+=-0.02
//           }else if(i>185&&i<=220){
//             this.yPosition+=0.001;
//             this.xPosition+=-0.1
//           }
//         }
//         this.scene1.add(this.cone,this.cone2,this.cone3,this.cone4,this.cone5,this.cone6,this.cone7)
//         this.conesToRotate = [this.cone, this.cone2, this.cone3,this.cone4,this.cone5,this.cone6,this.cone7];
//       this.cones.push(this.conesToRotate)
//       }
// this.animate()
//   }
//   if(this.letter=='R'){
//     this.yPosition=-3.3
//     for (let i = 0; i <=325; i++) {
//       this.coneMaterial = new THREE.MeshBasicMaterial({ color:this.colors[Math.floor(Math.random() * this.colors.length)] });
//       this.cone = new THREE.Mesh(this.coneGeometry, this.coneMaterial);
//       this.coneMaterial2 = new THREE.MeshBasicMaterial({ color: this.colors[Math.floor(Math.random() * this.colors.length)] });
//       this.cone2 = new THREE.Mesh(this.coneGeometry, this.coneMaterial2);
//       this.coneMaterial3 = new THREE.MeshBasicMaterial({ color: this.colors[Math.floor(Math.random() * this.colors.length)] });
//       this.cone3 = new THREE.Mesh(this.coneGeometry, this.coneMaterial3);
//       this.coneMaterial4 = new THREE.MeshBasicMaterial({ color: this.colors[Math.floor(Math.random() * this.colors.length)] });
//       this.cone4 = new THREE.Mesh(this.coneGeometry, this.coneMaterial4);
//       this.coneMaterial5 = new THREE.MeshBasicMaterial({ color: this.colors[Math.floor(Math.random() * this.colors.length)] });
//       this.cone5 = new THREE.Mesh(this.coneGeometry, this.coneMaterial5);
//       this.coneMaterial6 = new THREE.MeshBasicMaterial({ color: this.colors[Math.floor(Math.random() * this.colors.length)] });
//       this.cone6 = new THREE.Mesh(this.coneGeometry, this.coneMaterial6);
//       this.coneMaterial7 = new THREE.MeshBasicMaterial({ color: this.colors[Math.floor(Math.random() * this.colors.length)] });
//       this.cone7 = new THREE.Mesh(this.coneGeometry, this.coneMaterial7);
//       this.cone.position.set(this.xPosition, this.yPosition, 0);
//       this.cone2.position.set(this.xPosition+0.2, this.yPosition, 0);
//       this.cone3.position.set(this.xPosition+0.4, this.yPosition, 0);
//       this.cone4.position.set(this.xPosition+0.6, this.yPosition, 0);
//       this.cone5.position.set(this.xPosition+0.8, this.yPosition, 0);
//       this.cone6.position.set(this.xPosition+1, this.yPosition, 0);
//       this.cone7.position.set(this.xPosition+1.2, this.yPosition, 0);
//       this.cone.name='R'+i
//       this.cone2.name='R'+i
//       this.cone3.name='R'+i
//       this.cone4.name='R'+i
//       this.cone5.name='R'+i
//       this.cone6.name='R'+i
//       this.cone7.name='R'+i
//       if(i<=30){
//         this.yPosition+=0.2
//         }else if(i>30&&i<=40){
//           this.xPosition+=0.2
//         }else if(i>40&&i<=50){
//           this.yPosition+=-0.01
//           this.xPosition+=0.2
//         }else if(i>50&&i<=55){
//           this.yPosition+=-0.01
//           this.xPosition+=0.02
//         }else if(i>55&&i<=85){
//           this.yPosition+=-0.025
//           this.xPosition+=0.03
//         }else if(i>85&&i<=105){
//           this.yPosition+=-0.03
//           this.xPosition+=0.01
//         }else if(i>105&&i<=115){
//           this.yPosition+=-0.03
//           this.xPosition+=0.001
//         }else if(i>115&&i<=145){
//           this.yPosition+=-0.03
//           this.xPosition+=-0.01
//         }else if(i>145&&i<=230){
//           this.yPosition+=-0.01
//           this.xPosition+=-0.03
//         }else if(i>230&&i<=325){
//           this.yPosition+=-0.025
//           this.xPosition+=0.035
//                 }

//                 this.scene1.add(this.cone,this.cone2,this.cone3,this.cone4,this.cone5,this.cone6,this.cone7)
//                 this.conesToRotate = [this.cone, this.cone2, this.cone3,this.cone4,this.cone5,this.cone6,this.cone7];
//       this.cones.push(this.conesToRotate)
//       }
// this.animate()
//   }
//   if(this.letter=='E'){
//     for (let i = 0; i <=122; i++) {
//       this.coneMaterial = new THREE.MeshBasicMaterial({ color:this.colors[Math.floor(Math.random() * this.colors.length)] });
//       this.cone = new THREE.Mesh(this.coneGeometry, this.coneMaterial);
//       this.coneMaterial2 = new THREE.MeshBasicMaterial({ color: this.colors[Math.floor(Math.random() * this.colors.length)] });
//       this.cone2 = new THREE.Mesh(this.coneGeometry, this.coneMaterial2);
//       this.coneMaterial3 = new THREE.MeshBasicMaterial({ color: this.colors[Math.floor(Math.random() * this.colors.length)] });
//       this.cone3 = new THREE.Mesh(this.coneGeometry, this.coneMaterial3);
//       this.coneMaterial4 = new THREE.MeshBasicMaterial({ color: this.colors[Math.floor(Math.random() * this.colors.length)] });
//       this.cone4 = new THREE.Mesh(this.coneGeometry, this.coneMaterial4);
//       this.coneMaterial5 = new THREE.MeshBasicMaterial({ color: this.colors[Math.floor(Math.random() * this.colors.length)] });
//       this.cone5 = new THREE.Mesh(this.coneGeometry, this.coneMaterial5);
//       this.coneMaterial6 = new THREE.MeshBasicMaterial({ color: this.colors[Math.floor(Math.random() * this.colors.length)] });
//       this.cone6 = new THREE.Mesh(this.coneGeometry, this.coneMaterial6);
//       this.coneMaterial7 = new THREE.MeshBasicMaterial({ color: this.colors[Math.floor(Math.random() * this.colors.length)] });
//       this.cone7 = new THREE.Mesh(this.coneGeometry, this.coneMaterial7);
//       this.cone.position.set(this.xPosition, this.yPosition, 0);
//       this.cone2.position.set(this.xPosition+0.2, this.yPosition, 0);
//       this.cone3.position.set(this.xPosition+0.4, this.yPosition, 0);
//       this.cone4.position.set(this.xPosition+0.6, this.yPosition, 0);
//       this.cone5.position.set(this.xPosition+0.8, this.yPosition, 0);
//       this.cone6.position.set(this.xPosition+1, this.yPosition, 0);
//       this.cone7.position.set(this.xPosition+1.2, this.yPosition, 0);
//       this.cone.name='E'+i
//       this.cone2.name='E'+i
//       this.cone3.name='E'+i
//       this.cone4.name='E'+i
//       this.cone5.name='E'+i
//       this.cone6.name='E'+i
//       this.cone7.name='E'+i
//       if(i<=29){
//      this.yPosition+=-0.2
//       }else if(i>29&&i<=60){
//         this.xPosition+=0.2
//       }else if(i>60&&i<=81){
//         if(i==61){
//           this.yPosition=0
//           this.xPosition=0
//         }
//         this.xPosition+=0.2
//       }else if(i>91&&i<=122){
//         if(i==92){
//           this.yPosition=2.9
//           this.xPosition=0
//         }
//         this.xPosition+=0.2
//       }

//       this.scene1.add(this.cone,this.cone2,this.cone3,this.cone4,this.cone5,this.cone6,this.cone7)
//       this.conesToRotate = [this.cone, this.cone2, this.cone3,this.cone4,this.cone5,this.cone6,this.cone7];
//       this.cones.push(this.conesToRotate)
//       }
// this.animate()
//   }
//   if(this.letter=='A'){
//     this.yPosition=-3
//     for (let i = 0; i <=110; i++) {
//       this.coneMaterial = new THREE.MeshBasicMaterial({ color:this.colors[Math.floor(Math.random() * this.colors.length)] });
//       this.cone = new THREE.Mesh(this.coneGeometry, this.coneMaterial);
//       this.coneMaterial2 = new THREE.MeshBasicMaterial({ color: this.colors[Math.floor(Math.random() * this.colors.length)] });
//       this.cone2 = new THREE.Mesh(this.coneGeometry, this.coneMaterial2);
//       this.coneMaterial3 = new THREE.MeshBasicMaterial({ color: this.colors[Math.floor(Math.random() * this.colors.length)] });
//       this.cone3 = new THREE.Mesh(this.coneGeometry, this.coneMaterial3);
//       this.coneMaterial4 = new THREE.MeshBasicMaterial({ color: this.colors[Math.floor(Math.random() * this.colors.length)] });
//       this.cone4 = new THREE.Mesh(this.coneGeometry, this.coneMaterial4);
//       this.coneMaterial5 = new THREE.MeshBasicMaterial({ color: this.colors[Math.floor(Math.random() * this.colors.length)] });
//       this.cone5 = new THREE.Mesh(this.coneGeometry, this.coneMaterial5);
//       this.coneMaterial6 = new THREE.MeshBasicMaterial({ color: this.colors[Math.floor(Math.random() * this.colors.length)] });
//       this.cone6 = new THREE.Mesh(this.coneGeometry, this.coneMaterial6);
//       this.coneMaterial7 = new THREE.MeshBasicMaterial({ color: this.colors[Math.floor(Math.random() * this.colors.length)] });
//       this.cone7 = new THREE.Mesh(this.coneGeometry, this.coneMaterial7);
//       this.cone.position.set(this.xPosition, this.yPosition, 0);
//       this.cone2.position.set(this.xPosition+0.2, this.yPosition, 0);
//       this.cone3.position.set(this.xPosition+0.5, this.yPosition, 0);
//       this.cone4.position.set(this.xPosition+0.8, this.yPosition, 0);
//       this.cone5.position.set(this.xPosition+1.1, this.yPosition, 0);
//       this.cone6.position.set(this.xPosition+1.3, this.yPosition, 0);
//       this.cone7.position.set(this.xPosition+1.5, this.yPosition, 0);
//       this.cone.name='A'+i
//       this.cone2.name='A'+i
//       this.cone3.name='A'+i
//       this.cone4.name='A'+i
//       this.cone5.name='A'+i
//       this.cone6.name='A'+i
//       this.cone7.name='A'+i
//       if(i<30){
// this.yPosition += 0.18;
//       }
//       if(i>30&&i<=40){
//         this.yPosition += 0.1;
//         this.xPosition+=0.3
//               }
//               if(i>40&&i<=50){
//                 this.yPosition += -0.1;
//                 this.xPosition+=0.3
//                       }
//                       if(i>50&&i<=80){
//                         this.yPosition+=-0.18
//                       } if(i>80&&i<=110){
//                         if(i==81){
//                           this.yPosition=0
//                           this.xPosition=0
//                         }
//                         this.xPosition+=0.2
//                       }

//                       this.scene1.add(this.cone,this.cone2,this.cone3,this.cone4,this.cone5,this.cone6,this.cone7)
//                       this.conesToRotate = [this.cone, this.cone2, this.cone3,this.cone4,this.cone5,this.cone6,this.cone7];
//       this.cones.push(this.conesToRotate)
//       }

// this.animate()
//   }
//   if(this.letter=='C'){
//     this.xPosition=5.5
//     for (let i = 0; i <=113; i++) {
//       this.coneMaterial = new THREE.MeshBasicMaterial({ color:this.colors[Math.floor(Math.random() * this.colors.length)] });
//       this.cone = new THREE.Mesh(this.coneGeometry, this.coneMaterial);
//       this.coneMaterial2 = new THREE.MeshBasicMaterial({ color: this.colors[Math.floor(Math.random() * this.colors.length)] });
//       this.cone2 = new THREE.Mesh(this.coneGeometry, this.coneMaterial2);
//       this.coneMaterial3 = new THREE.MeshBasicMaterial({ color: this.colors[Math.floor(Math.random() * this.colors.length)] });
//       this.cone3 = new THREE.Mesh(this.coneGeometry, this.coneMaterial3);
//       this.coneMaterial4 = new THREE.MeshBasicMaterial({ color: this.colors[Math.floor(Math.random() * this.colors.length)] });
//       this.cone4 = new THREE.Mesh(this.coneGeometry, this.coneMaterial4);
//       this.coneMaterial5 = new THREE.MeshBasicMaterial({ color: this.colors[Math.floor(Math.random() * this.colors.length)] });
//       this.cone5 = new THREE.Mesh(this.coneGeometry, this.coneMaterial5);
//       this.coneMaterial6 = new THREE.MeshBasicMaterial({ color: this.colors[Math.floor(Math.random() * this.colors.length)] });
//       this.cone6 = new THREE.Mesh(this.coneGeometry, this.coneMaterial6);
//       this.coneMaterial7 = new THREE.MeshBasicMaterial({ color: this.colors[Math.floor(Math.random() * this.colors.length)] });
//       this.cone7 = new THREE.Mesh(this.coneGeometry, this.coneMaterial7);
//       this.cone.position.set(this.xPosition, this.yPosition, 0);
//       this.cone2.position.set(this.xPosition+0.2, this.yPosition, 0);
//       this.cone3.position.set(this.xPosition+0.5, this.yPosition, 0);
//       this.cone4.position.set(this.xPosition+0.8, this.yPosition, 0);
//       this.cone5.position.set(this.xPosition+1.1, this.yPosition, 0);
//       this.cone6.position.set(this.xPosition+1.3, this.yPosition, 0);
//       this.cone7.position.set(this.xPosition+1.5, this.yPosition, 0);
//       this.cone.name='C'+i
//       this.cone2.name='C'+i
//       this.cone3.name='C'+i
//       this.cone4.name='C'+i
//       this.cone5.name='C'+i
//       this.cone6.name='C'+i
//       this.cone7.name='C'+i
//      if(i<20){
//       this.xPosition+=-0.2
//      }else if(i>20&&i<=33){
//       this.yPosition+=-0.05
//       this.xPosition+=-0.2
//      }else if(i>33&&i<=40){
//       this.yPosition+=-0.1
//       this.xPosition+=-0.05
//      }else if(i>40&&i<=45){
//       this.yPosition+=-0.1
//       this.xPosition+=-0.02
//      }else if(i>45&&i<=55){
//       this.yPosition+=-0.1
//       this.xPosition+=-0.01
//      }else if(i>55&&i<=65){
//       this.yPosition+=-0.1
//       this.xPosition+=0.01
//      }else if(i>65&&i<=70){
//       this.yPosition+=-0.1
//       this.xPosition+=0.02
//      }else if(i>70&&i<=77){
//       this.yPosition+=-0.1
//       this.xPosition+=0.05
//      }else if(i>77&&i<=90){
//       this.yPosition+=-0.05
//       this.xPosition+=0.2
//      }if(i>90){
//       this.xPosition+=0.2
//      }


//      this.scene1.add(this.cone,this.cone2,this.cone3,this.cone4,this.cone5,this.cone6,this.cone7)
//      this.conesToRotate = [this.cone, this.cone2, this.cone3,this.cone4,this.cone5,this.cone6,this.cone7];
//       this.cones.push(this.conesToRotate)
//       }
// this.animate()
//   }
//   if(this.letter=='K'){
//     this.xPosition=5.5
//     for (let i = 0; i <=320; i++) {
//       this.coneMaterial = new THREE.MeshBasicMaterial({ color:this.colors[Math.floor(Math.random() * this.colors.length)] });
//       this.cone = new THREE.Mesh(this.coneGeometry, this.coneMaterial);
//       this.coneMaterial2 = new THREE.MeshBasicMaterial({ color: this.colors[Math.floor(Math.random() * this.colors.length)] });
//       this.cone2 = new THREE.Mesh(this.coneGeometry, this.coneMaterial2);
//       this.coneMaterial3 = new THREE.MeshBasicMaterial({ color: this.colors[Math.floor(Math.random() * this.colors.length)] });
//       this.cone3 = new THREE.Mesh(this.coneGeometry, this.coneMaterial3);
//       this.coneMaterial4 = new THREE.MeshBasicMaterial({ color: this.colors[Math.floor(Math.random() * this.colors.length)] });
//       this.cone4 = new THREE.Mesh(this.coneGeometry, this.coneMaterial4);
//       this.coneMaterial5 = new THREE.MeshBasicMaterial({ color: this.colors[Math.floor(Math.random() * this.colors.length)] });
//       this.cone5 = new THREE.Mesh(this.coneGeometry, this.coneMaterial5);
//       this.coneMaterial6 = new THREE.MeshBasicMaterial({ color: this.colors[Math.floor(Math.random() * this.colors.length)] });
//       this.cone6 = new THREE.Mesh(this.coneGeometry, this.coneMaterial6);
//       this.coneMaterial7 = new THREE.MeshBasicMaterial({ color: this.colors[Math.floor(Math.random() * this.colors.length)] });
//       this.cone7 = new THREE.Mesh(this.coneGeometry, this.coneMaterial7);
//       this.cone.position.set(this.xPosition, this.yPosition, 0);
//       this.cone2.position.set(this.xPosition+0.2, this.yPosition, 0);
//       this.cone3.position.set(this.xPosition+0.4, this.yPosition, 0);
//       this.cone4.position.set(this.xPosition+0.6, this.yPosition, 0);
//       this.cone5.position.set(this.xPosition+0.8, this.yPosition, 0);
//       this.cone6.position.set(this.xPosition+1, this.yPosition, 0);
//       this.cone7.position.set(this.xPosition+1.2, this.yPosition, 0);
//       this.cone.name='K'+i
//       this.cone2.name='K'+i
//       this.cone3.name='K'+i
//       this.cone4.name='K'+i
//       this.cone5.name='K'+i
//       this.cone6.name='K'+i
//       this.cone7.name='K'+i
//       if(i<=100){
//      this.yPosition+=-0.025
//      this.xPosition+=-0.04
//       }else if(i>100&&i<=247){
//         this.yPosition+=-0.025
//          this.xPosition+=0.04
//       }else if(i>247&&i<=310){
//         if(i==248){
//           this.yPosition=3.2
//           this.xPosition=1
//         }
//          this.yPosition+=-0.1
//       }
//       this.scene1.add(this.cone,this.cone2,this.cone3,this.cone4,this.cone5,this.cone6,this.cone7)
//       this.conesToRotate = [this.cone, this.cone2, this.cone3,this.cone4,this.cone5,this.cone6,this.cone7];
//       this.cones.push(this.conesToRotate)
//       }
// this.animate()
//   }
//   if(this.letter=='L'){
//     for (let i = 0; i <=63; i++) {
//       this.coneMaterial = new THREE.MeshBasicMaterial({ color:this.colors[Math.floor(Math.random() * this.colors.length)] });
//       this.cone = new THREE.Mesh(this.coneGeometry, this.coneMaterial);
//       this.coneMaterial2 = new THREE.MeshBasicMaterial({ color: this.colors[Math.floor(Math.random() * this.colors.length)] });
//       this.cone2 = new THREE.Mesh(this.coneGeometry, this.coneMaterial2);
//       this.coneMaterial3 = new THREE.MeshBasicMaterial({ color: this.colors[Math.floor(Math.random() * this.colors.length)] });
//       this.cone3 = new THREE.Mesh(this.coneGeometry, this.coneMaterial3);
//       this.coneMaterial4 = new THREE.MeshBasicMaterial({ color: this.colors[Math.floor(Math.random() * this.colors.length)] });
//       this.cone4 = new THREE.Mesh(this.coneGeometry, this.coneMaterial4);
//       this.coneMaterial5 = new THREE.MeshBasicMaterial({ color: this.colors[Math.floor(Math.random() * this.colors.length)] });
//       this.cone5 = new THREE.Mesh(this.coneGeometry, this.coneMaterial5);
//       this.coneMaterial6 = new THREE.MeshBasicMaterial({ color: this.colors[Math.floor(Math.random() * this.colors.length)] });
//       this.cone6 = new THREE.Mesh(this.coneGeometry, this.coneMaterial6);
//       this.coneMaterial7 = new THREE.MeshBasicMaterial({ color: this.colors[Math.floor(Math.random() * this.colors.length)] });
//       this.cone7 = new THREE.Mesh(this.coneGeometry, this.coneMaterial7);
//       this.cone.position.set(this.xPosition, this.yPosition, 0);
//       this.cone2.position.set(this.xPosition+0.2, this.yPosition, 0);
//       this.cone3.position.set(this.xPosition+0.4, this.yPosition, 0);
//       this.cone4.position.set(this.xPosition+0.6, this.yPosition, 0);
//       this.cone5.position.set(this.xPosition+0.8, this.yPosition, 0);
//       this.cone6.position.set(this.xPosition+1, this.yPosition, 0);
//       this.cone7.position.set(this.xPosition+1.2, this.yPosition, 0);
//       this.cone.name='L'+i
//       this.cone2.name='L'+i
//       this.cone3.name='L'+i
//       this.cone4.name='L'+i
//       this.cone5.name='L'+i
//       this.cone6.name='L'+i
//       this.cone7.name='L'+i
//       if(i<=29){
//      this.yPosition+=-0.2
//       }else if(i>29&&i<=63){
//         this.xPosition+=0.2
//       }
//       this.scene1.add(this.cone,this.cone2,this.cone3,this.cone4,this.cone5,this.cone6,this.cone7)
//       this.conesToRotate = [this.cone, this.cone2, this.cone3,this.cone4,this.cone5,this.cone6,this.cone7];
//       this.cones.push(this.conesToRotate)
//       }
// this.animate()
//   }


}
animate() {
  requestAnimationFrame(() => this.animate());
  this.renderer1.render(this.scene1, this.camera1);

  this.cones.forEach((conesToRotate) => {
    conesToRotate.forEach((cone:any) => {
      if(cone.id%2==0){
         cone.rotation.x += 0.07 + Math.random() * this.randomNumbers[Math.floor(Math.random()*2)];
      cone.rotation.y += 0.08 + Math.random() * this.randomNumbers[Math.floor(Math.random()*2)];
      cone.rotation.z += 0.1 + Math.random() * this.randomNumbers[Math.floor(Math.random()*2)];
      }else{
        cone.rotation.x += 0.1 + Math.random() * this.randomNumbers[Math.floor(Math.random()*-2)];
        cone.rotation.y += 0.07 + Math.random() * this.randomNumbers[Math.floor(Math.random()*-2)];
        cone.rotation.z += 0.05 + Math.random() * this.randomNumbers[Math.floor(Math.random()*-2)];
      }

    });
  });
}
randomPosition(){
this.cones.forEach(cone=>{
  cone.forEach((c:THREE.Mesh)=>{
    c.position.set(
    -2+Math.random()*this.randomNumbers[Math.floor(Math.random())]*100,
    -3+Math.random()*this.randomNumbers[Math.floor(Math.random())]*100,
    Math.random()*this.randomNumbers[Math.floor(Math.random())]*10)
  })
})
}
restorePosition(){
this.scene1.clear()
this.xPosition = 0;
this.yPosition = 3;
this.zPosition = 1;
this.cones=[]
  this.ngAfterViewInit()}

    }

