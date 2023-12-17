import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
declare var YT: any;

@Component({
  selector: 'app-light',
  templateUrl: './light.component.html',
  styleUrls: ['./light.component.scss']
})
export class LightComponent implements AfterViewInit{
  string:string='light'

   user:any
  @ViewChild('video1') video1:any
  videoUno:any

ngAfterViewInit(): void {
  this.user=JSON.parse(localStorage.getItem('user')!)

  this.videoUno = new YT.Player(this.video1.nativeElement, {
    videoId: "fciGNBN0nKM",
    playerVars: {
      controls: 1,
    },
  });  }

}
