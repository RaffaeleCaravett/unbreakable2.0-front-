import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-x401-speech',
  templateUrl: './x401-speech.component.html',
  styleUrls: ['./x401-speech.component.scss']
})
export class X401SpeechComponent {
@Input() id:string=''

  @ViewChild('x401Speech', { static: false }) private x401Speech!:ElementRef;

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
