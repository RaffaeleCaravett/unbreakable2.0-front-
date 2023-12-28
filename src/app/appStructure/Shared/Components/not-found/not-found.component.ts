import { animate } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit{
  @ViewChild('canvas', { static: true }) private canvasRef1!: ElementRef;
  private renderer = new THREE.WebGLRenderer
  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  private orbit!: OrbitControls;
  private textureLoader = new THREE.TextureLoader();
  private cubeTextureLoader = new THREE.CubeTextureLoader();
  private stars = '../../../../../assets/not-found/Carina-Nebula-Cosmic-Cliffs-NGC-3324-James-Webb-Space-Telescope-NIRCam.jpg';
  sunSphere:any
  mercurio:any
  venuss:any
  earthh:any
  marss:any
  jupiterr:any
  saturnoPlanet:any
  uranioPlanet:any
neptunee:any
plutoo:any


constructor(private router:Router){

}
  ngOnInit(): void {
localStorage.setItem('param','15')
    this.initScene();
    const sunGeo = new THREE.SphereGeometry(16, 30, 30);

    const sunMat = new THREE.MeshBasicMaterial({
      map: this.textureLoader.load('../../../../../assets/not-found/sun.png'),
    });

    this.sunSphere = new THREE.Mesh(sunGeo, sunMat);
    this.scene.add(this.sunSphere);

    this.mercurio = this.createPlanete(3.2, '../../../../../assets/not-found/mercury.png', 28);
    this.venuss = this.createPlanete(5.8, '../../../../../assets/not-found/benus.png', 44);
    this.earthh = this.createPlanete(6, '../../../../../assets/not-found/earth.png', 62);
    this.marss = this.createPlanete(4, '../../../../../assets/not-found/mars.png', 78);
    this.jupiterr = this.createPlanete(12,'../../../../../assets/not-found/jupiter.png', 100);
    this.saturnoPlanet = this.createPlanete(10, '../../../../../assets/not-found/saturno.png', 138, {
      innerRadius: 10,
      outerRadius: 20,
      texture: '../../../../../assets/not-found/saturno.png',
    });
    this.uranioPlanet = this.createPlanete(7, '../../../../../assets/not-found/uranio.png', 176, {
      innerRadius: 7,
      outerRadius: 14,
      texture: '../../../../../assets/not-found/uranio.png',
    });
    this.neptunee = this.createPlanete(7, '../../../../../assets/not-found/neptune.png', 200);
    this.plutoo = this.createPlanete(2.8, '../../../../../assets/not-found/pluto.png', 216);    this.animate();
  }

  private initScene() {
    if(this.canvasRef1){
      const canvas = this.canvasRef1.nativeElement as HTMLCanvasElement;
    this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true ,antialias:true});

    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.camera.position.set(-90, 140, 140);
    this.orbit = new OrbitControls(this.camera, this.renderer.domElement);
    this.orbit.update();

    const ambientLight = new THREE.AmbientLight(0x333333);
    this.scene.add(ambientLight);

    this.scene.background = this.cubeTextureLoader.load([
      this.stars,
      this.stars,
      this.stars,
      this.stars,
      this.stars,
      this.stars,
    ]);
    }
    const pointLight = new THREE.PointLight(0xFFFFFF, 2, 300);
    this.scene.add(pointLight)
  }

createPlanete(size:any, texture:any, position:any, ring?:any) {
    const geo = new THREE.SphereGeometry(size, 30, 30);
    const mat = new THREE.MeshStandardMaterial({
      map: this.textureLoader.load(texture),
      roughness: 1, // Adjust this value based on the desired appearance
    });
    const mesh = new THREE.Mesh(geo, mat);
    const obj = new THREE.Object3D();
    obj.add(mesh);

    // Add point light to illuminate the planet
    const pointLight = new THREE.PointLight(0xffffff, 1, 0);
    obj.add(pointLight);

    if (ring) {
      const ringGeo = new THREE.RingGeometry(ring.innerRadius, ring.outerRadius, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        map: this.textureLoader.load(ring.texture),
        side: THREE.DoubleSide,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      obj.add(ringMesh);
      ringMesh.position.x = position;
      ringMesh.rotation.x = 0.5 * Math.PI;
    }

    this.scene.add(obj);
    mesh.position.x = position;

    return { mesh, obj };
  }
  private animate() {
    this.renderer.setAnimationLoop(() => {
      this.sunSphere.rotateY(0.004);
      this.mercurio.mesh.rotateY(0.004);
      this.venuss.mesh.rotateY(0.002);
      this.earthh.mesh.rotateY(0.002);
      this.marss.mesh.rotateY(0.018);
      this.jupiterr.mesh.rotateY(0.004);
      this.saturnoPlanet.mesh.rotateY(0.03);
      this.uranioPlanet.mesh.rotateY(0.038);
      this.neptunee.mesh.rotateY(0.032);
      this.plutoo.mesh.rotateY(0.004);

      this.mercurio.obj.rotateY(0.04);
      this.venuss.obj.rotateY(0.015);
      this.earthh.obj.rotateY(0.01);
      this.marss.obj.rotateY(0.008);
      this.jupiterr.obj.rotateY(0.002);
      this.saturnoPlanet.obj.rotateY(0.0009);
      this.uranioPlanet.obj.rotateY(0.0004);
      this.neptunee.obj.rotateY(0.0001);
      this.plutoo.obj.rotateY(0.00007);
          this.renderer.render(this.scene, this.camera);
    });

    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }
  goToForms(){
    if(localStorage.getItem('accessToken')){
       localStorage.setItem('param','10')
    this.router.navigate(['/home'])
    }else{
      this.router.navigate(['/'])
    }

  }


}
