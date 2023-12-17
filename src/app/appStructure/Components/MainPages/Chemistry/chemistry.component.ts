import { AfterViewInit, Component, Input, ViewChild} from '@angular/core';
declare var YT: any;

@Component({
  selector: 'app-chemistry',
  templateUrl: './chemistry.component.html',
  styleUrls: ['./chemistry.component.scss']
})
export class ChemistryComponent implements AfterViewInit {
  string:string='chemistry'
  user:any
  @ViewChild('video1') video1:any
  videoUno:any
  ngAfterViewInit(): void {
    this.user=JSON.parse(localStorage.getItem('user')!)

    this.videoUno = new YT.Player(this.video1.nativeElement, {
      videoId: "Xs_46tP_hpk",
      playerVars: {
        controls: 1,
      },
    });
  }



}
