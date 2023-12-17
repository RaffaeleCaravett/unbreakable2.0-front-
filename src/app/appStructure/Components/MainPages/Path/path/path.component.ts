import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
    this.user=JSON.parse(localStorage.getItem('user')!)
     }


// @ViewChild('avatarText',{static:false})private textElement!:ElementRef;


}


