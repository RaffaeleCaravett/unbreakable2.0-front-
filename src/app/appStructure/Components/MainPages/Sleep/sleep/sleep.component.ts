import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
declare var YT: any;


@Component({
  selector: 'app-sleep',
  templateUrl: './sleep.component.html',
  styleUrls: ['./sleep.component.scss']
})
export class SleepComponent implements OnInit,AfterViewInit{
  string:string='sleep'

    @Input() user:any
    @ViewChild('player') playerElement!: ElementRef;
    private player: any;

  ngOnInit(): void {

   }
   ngAfterViewInit(): void {
    this.player = new YT.Player(this.playerElement.nativeElement, {
      videoId: "5MuIMqhT8DM",
      playerVars: {
        controls: 1,
      },
    });
     }
}
