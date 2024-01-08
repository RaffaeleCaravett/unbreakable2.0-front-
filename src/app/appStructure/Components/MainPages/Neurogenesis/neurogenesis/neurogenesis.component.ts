import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
declare var YT: any;

@Component({
  selector: 'app-neurogenesis',
  templateUrl: './neurogenesis.component.html',
  styleUrls: ['./neurogenesis.component.scss']
})
export class NeurogenesisComponent implements AfterViewInit {
  string:string='heal'

   user:any
  @ViewChild('video1') video1:any
  videoUno:any

  constructor(){}
ngAfterViewInit(): void {
  localStorage.setItem('param','3')
    this.videoUno = new YT.Player(this.video1.nativeElement, {
      videoId: "B_tjKYvEziI",
      playerVars: {
        controls: 1,
      },
    });
    this.user=JSON.parse(localStorage.getItem('user')!)

  }


}
