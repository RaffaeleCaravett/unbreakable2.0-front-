import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tips',
  templateUrl: './tips.component.html',
  styleUrls: ['./tips.component.scss']
})
export class TipsComponent implements OnInit{

  user:any

  cards: any


  ngOnInit(): void {
    localStorage.setItem('param','6')
    this.user=JSON.parse(localStorage.getItem('user')!)

    this.cards=
    [
{name:'Dr Eric Berg',
description:'One of the best expert in nutrition, overall health and exercise.',
image:"assets/background-image/components/Tips/dr-berg-bio.png",
links:[{
  youtubeChannel:'https://www.youtube.com/@DrEricBergDC',
  instagram:'https://www.instagram.com/drericberg/',
  facebook:'https://www.facebook.com/drericberg',
  tikTok:'https://www.tiktok.com/@drbergofficial'
}]
},
{name:'Dr Andrew D. Huberman',
description:'Neuroscientist, talk about nutrition, overall health and mindset.',
image:'assets/background-image/components/Tips/Dr_Andrew_Huberman.jpg',
links:[{
  youtubeChannel:'https://www.youtube.com/@hubermanlab',
  instagram:'https://www.instagram.com/hubermanlab/',
  facebook:'https://www.facebook.com/hubermanlab',
  tikTok:'https://www.tiktok.com/@hubermanlab'
}]
},
{name:'Siim Land',
description:'Expert in longevity, talks about reverse aging, nutrition and exercise.',
image:'assets/background-image/components/Tips/SiimLand.jpg',
links:[{
  youtubeChannel:'https://www.youtube.com/@SiimLand',
  instagram:'https://www.instagram.com/siimland/',
  facebook:'https://www.facebook.com/thesiimland',
  tikTok:'https://www.tiktok.com/@siimland'
}]
}
,{name:'Lillie Kane',
description:'Talks about nutrition, food scam and exercise.',
image:'assets/background-image/components/Tips/LillieKane.jpg',
links:[{
  youtubeChannel:'https://www.youtube.com/@LillieKane',
  instagram:'https://www.instagram.com/lillie_kane_/',
  facebook:'https://www.facebook.com/LillieKaneYoutube',
  tikTok:'https://www.tiktok.com/@lillie_kane_'
}]
} ,
{name:'Luca Veronese',
description:'Talks about how to reverse metabolism, nutrition and fitness.',
image:'assets/background-image/components/Tips/lucaVeronese.jpg',
links:[{
  youtubeChannel:'https://www.youtube.com/@topmodelfit',
  instagram:'https://www.instagram.com/lucaveronese.official/',
  facebook:'https://www.facebook.com/lucaveronesetrainer',
  tikTok:'https://www.tiktok.com/@lucaveronese.md'
}]
} ,
{name:'Dr. Paulo Saladino',
description:'Expert in nutrition, fitness and overall health.',
image:'assets/background-image/components/Tips/pauoloSaladino.jpg',
links:[{
  youtubeChannel:'https://www.youtube.com/@Paulsaladinomd',
  instagram:'https://www.instagram.com/paulsaladinomd/',
  facebook:'#',
  tikTok:'https://www.tiktok.com/@paulsaladinomd2'
}]
} ,
{name:'Dr. Fabio Bussacchini',
description:'https://www.youtube.com/@fabiobussacchini5398',
image:'assets/background-image/components/Tips/fabioBussacchini.jpg',
links:[{
  youtubeChannel:'https://www.tiktok.com/@dott.fabiobussacchini',
  instagram:'https://www.instagram.com/dott.fabiobussacchini/',
  facebook:'https://www.facebook.com/DrFabioBussacchini',
  tikTok:'https://www.tiktok.com/@dott.fabiobussacchini'
}]
} ]
  }
}
