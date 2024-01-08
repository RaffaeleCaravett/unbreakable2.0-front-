import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-path',
  templateUrl: './path.component.html',
  styleUrls: ['./path.component.scss']
})
export class PathComponent implements OnInit {
  user:any

string:string='path'
constructor(){

}
  ngOnInit(): void {
    localStorage.setItem('param','1')
    this.user=JSON.parse(localStorage.getItem('user')!)
     }


// @ViewChild('avatarText',{static:false})private textElement!:ElementRef;


}


