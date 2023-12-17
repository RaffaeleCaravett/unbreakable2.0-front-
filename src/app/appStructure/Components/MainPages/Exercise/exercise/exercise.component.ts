import { AfterViewChecked, AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
declare var YT: any;

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss']
})
export class ExerciseComponent implements OnInit,AfterViewInit{

  string:string='exercise'

  user:any
typesExercises:any
@ViewChild('video1') video1:any
  videoUno:any

  @ViewChild('video2') video2:any
  videoDue:any
  @ViewChild('video3') video3:any
  videoTre:any

  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem('user')!)

this.typesExercises=[
  {
    name:'Sprinting',
    Testosterone:'26%',
    Growth_Hormone: '200%'
  },
 {name:'Slow negative repetition',
    Testosterone:'30% to 50%',
    Growth_Hormone: '1600%'
  },
  {name:'Isometric training',
    Testosterone:'30%',
    Growth_Hormone: '1600%'
  },
  {name:'HIIT',
    Testosterone:'30%',
    Growth_Hormone: '450%'
  }
]

}
ngAfterViewInit(): void {
    this.videoUno = new YT.Player(this.video1.nativeElement, {
      videoId: "4bskn2RrhPM",
      playerVars: {
        controls: 1,
      },
    });
    this.videoDue = new YT.Player(this.video2.nativeElement, {
      videoId: "hYJ6BZOPZ_4",
      playerVars: {
        controls: 1,
      },
    });
    this.videoTre = new YT.Player(this.video3.nativeElement, {
      videoId: "hjteT0TBSEY",
      playerVars: {
        controls: 1,
      },
    });

  }
}
