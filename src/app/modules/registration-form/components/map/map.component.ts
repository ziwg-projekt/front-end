import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import {environment} from '../../../../../environments/environment';
import {Hospital} from '../../../../core/models/hospital';
import {ApiService} from '../../../../core/services/api.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @Input() markers: Hospital[];
  @Output() hospitalClicked: EventEmitter<Hospital>;

  map: mapboxgl.Map;
  style = 'mapbox://styles/hesoyam1298/ckmsepdtt2z2d17o5bghgwcfn';
  lng = 17.0374;
  lat = 51.1110;

  constructor(private api: ApiService) {
    this.hospitalClicked = new EventEmitter<Hospital>();
    this.api.mapEvolved.subscribe(() => {
      setTimeout(() => {
        for (const item of this.markers) {
          item.marker.addTo(this.map);
          item.marker.getElement().addEventListener('click', () => {
            this.showHospital(item);
          });
        }
      }, 100);
    });
  }

  ngOnInit(): void {
    // @ts-ignore
    (mapboxgl as typeof mapboxgl).accessToken = environment.mapboxKey;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 13,
      center: [this.lng, this.lat]
    });
    // Add map controls
    this.map.addControl(new mapboxgl.NavigationControl());
    // this.createMarker(51.1239, 17.0474);
  }

  public createMarker(lng: number, lat: number): void {
    const marker = new mapboxgl.Marker({
      draggable: true,
    }).setLngLat([this.lng, this.lat]).addTo(this.map);
  }

  public showHospital(hospital: Hospital): void {
    this.hospitalClicked.emit(hospital);
  }

}
