import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-path',
  templateUrl: './path.component.html',
  styleUrls: ['./path.component.scss']
})
export class PathComponent {
  @Input() user:any

string:string='path'



// @ViewChild('avatarText',{static:false})private textElement!:ElementRef;


}
