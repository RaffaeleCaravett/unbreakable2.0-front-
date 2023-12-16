import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, OnDestroy, Input } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, OnDestroy {
  private map!: L.Map;
  @Input() country!:string
  @Input() user:any
  constructor(private elementRef: ElementRef,  private httpClient: HttpClient) {}

  ngOnInit(): void {
    // const countryName = this.country;
    // const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
    //   countryName
    // )}&key=${openCageApiKey}`;

    // this.httpClient.get(url).subscribe(
    //   (response: any) => {
    //     const result = response.results[0];

    //     if (result) {
    //       const { lat, lng } = result.geometry;

    //       this.map = L.map('map').setView([lat, lng], 13);

    //       L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //         attribution: '© OpenStreetMap contributors',
    //       }).addTo(this.map);

    //       L.marker([lat, lng])
    //         .addTo(this.map)
    //         .bindPopup(countryName)
    //         .openPopup();
    //     } else {
    //       console.error('Geocoding failed');
    //     }
    //   },
    //   (error) => {
    //     console.error('Error in geocoding', error);
    //   }
    // );
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }
}
