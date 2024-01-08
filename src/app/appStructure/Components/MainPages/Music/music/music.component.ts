import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
declare var YT: any;

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss']
})
export class MusicComponent implements AfterViewInit{
  string:string='music'

   user:any
  @ViewChild('video1') video1:any
  videoUno:any

ngAfterViewInit(): void {
  localStorage.setItem('param','5')

  this.videoUno = new YT.Player(this.video1.nativeElement, {
    videoId: "2w0oRSN0AVM",
    playerVars: {
      controls: 1,
    },
  });
  this.user=JSON.parse(localStorage.getItem('user')!)
}

}
