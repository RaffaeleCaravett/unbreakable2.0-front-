import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
declare var YT: any;

@Component({
  selector: 'app-nutrition',
  templateUrl: './nutrition.component.html',
  styleUrls: ['./nutrition.component.scss']
})
export class NutritionComponent {
  @Input() user:any
@ViewChild('video1') video1:any
@ViewChild('video2') video2:any
@ViewChild('video3') video3:any
@ViewChild('video4') video4:any
@ViewChild('video5') video5:any

videoUno:any
videoDue:any
videoTre:any
videoQuattro:any
videoCinque:any

  ELEMENT_DATA: any[] = [
    { name: 'Salmon', protein: 25, fat: 10, carbohydrates: 0, vitamins: { b: 12, d: 8, k: 1 }, minerals: { calcium: 20, iron: 1, magnesium: 30 }, omega3: { epa: 300, dha: 400 }, antioxidants: 10, fiber: 0, choline: 90 },
    { name: 'Eggs', protein: 13, fat: 11, carbohydrates: 1, vitamins: { b: 2, d: 1, k: 0.5 }, minerals: { calcium: 30, iron: 2, magnesium: 15 }, omega3: { epa: 20, dha: 25 }, antioxidants: 5, fiber: 0, choline: 250 },
    { name: 'Parmesan Cheese', protein: 35, fat: 26, carbohydrates: 0, vitamins: { b: 1, d: 0.5, k: 0.1 }, minerals: { calcium: 1184, iron: 0.8, magnesium: 28 }, omega3: { epa: 4, dha: 11 }, antioxidants: 2, fiber: 0, choline: 24 },
    { name: 'Beef ', protein: 26, fat: 17, carbohydrates: 0, vitamins: { b: 6, d: 0, k: 1 }, minerals: { calcium: 2, iron: 2, magnesium: 15 }, omega3: { epa: 10, dha: 8 }, antioxidants: 2, fiber: 0, choline: 73 },
    { name: 'Kefir', protein: 3.3, fat: 2, carbohydrates: 4.6, vitamins: { b: 2, d: 1, k: 0.1 }, minerals: { calcium: 100, iron: 0.2, magnesium: 10 }, omega3: { epa: 1, dha: 2 }, antioxidants: 2, fiber: 0, choline: 15 },
    { name: 'Apple', protein: 0.5, fat: 0.2, carbohydrates: 20, vitamins: { b: 0.1, d: 0, k: 0.1 }, minerals: { calcium: 5, iron: 0.1, magnesium: 2 }, omega3: { epa: 0, dha: 0 }, antioxidants: 5, fiber: 2, choline: 0.1 },
    { name: 'Arugula ', protein: 2.6, fat: 0.7, carbohydrates: 3.7, vitamins: { b: 0.1, d: 0, k: 109 }, minerals: { calcium: 160, iron: 1.5, magnesium: 47 }, omega3: { epa: 0, dha: 0 }, antioxidants: 2.5, fiber: 1.6, choline: 12 },
    { name: 'Water', protein: 0, fat: 0, carbohydrates: 0, vitamins: { b: 0, d: 0, k: 0 }, minerals: { calcium: 0, iron: 0, magnesium: 0 }, omega3: { epa: 0, dha: 0 }, antioxidants: 0, fiber: 0, choline: 0 },
    { name: 'Dark Chocolate ', protein: 5, fat: 50, carbohydrates: 20, vitamins: { b: 0.3, d: 0, k: 0.2 }, minerals: { calcium: 30, iron: 10, magnesium: 200 }, omega3: { epa: 2, dha: 3 }, antioxidants: 25, fiber: 10, choline: 15 },
  ]
  displayedColumns: string[] = ['name', 'protein', 'fat', 'carbohydrates', 'vitamin_b', 'vitamin_d', 'vitamin_k', 'coline', 'epa', 'dha', 'minerals_calcium', 'minerals_iron', 'minerals_magnesium', 'antioxidants', 'fiber'];
  dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator!: MatPaginator;


constructor(){
}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.videoUno = new YT.Player(this.video1.nativeElement, {
      videoId: "HN0yEn4vbRw",
      playerVars: {
        controls: 1,
      },
    });
    this.videoDue = new YT.Player(this.video2.nativeElement, {
      videoId: "V2_Jmd6mCUQ",
      playerVars: {
        controls: 1,
      },
    });
    this.videoTre = new YT.Player(this.video3.nativeElement, {
      videoId: "7IpqFOP7yak",
      playerVars: {
        controls: 1,
      },
    });
    this.videoQuattro = new YT.Player(this.video4.nativeElement, {
      videoId: "exNYRhfoc0Y",
      playerVars: {
        controls: 1,
      },
    });
    this.videoCinque = new YT.Player(this.video5.nativeElement, {
      videoId: "tf8sSome1lE",
      playerVars: {
        controls: 1,
      },
    });
  }
  @ViewChild('x401Speech', { static: false }) private x401Speech!:ElementRef;
string:string='nutrition'
words:any
currentIndex = 0;
interval:any
  playSpeech() {
    this.x401Speech.nativeElement.play();
     this.interval= setInterval( ()=> {
      if (this.currentIndex < this.words.length) {
        // this.textElement.nativeElement.textContent += this.words[this.currentIndex] + " ";
        this.currentIndex++;
      } else {
        clearInterval(this.interval);
      }
    }, 42 * 1000 / this.words.length); }
    stopSpeech(){
      this.x401Speech.nativeElement.pause();
      clearInterval(this.interval);
    }

  }
