import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-form-map-stage',
  templateUrl: './form-map-stage.component.html',
  styleUrls: ['./form-map-stage.component.scss']
})
export class FormMapStageComponent implements OnInit {
  map: mapboxgl.Map;
  style = 'mapbox://styles/hesoyam1298/ckmsepdtt2z2d17o5bghgwcfn';
  lat = 37.75;
  lng = -122.41;

  constructor() {
  }

  ngOnInit(): void {
    (mapboxgl as typeof mapboxgl).accessToken = environment.mapboxKey;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 13,
      center: [this.lng, this.lat]
    });
    // Add map controls
    this.map.addControl(new mapboxgl.NavigationControl());
  }

}
