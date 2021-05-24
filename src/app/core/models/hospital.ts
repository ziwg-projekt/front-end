import * as mapboxgl from 'mapbox-gl';

export interface Hospital {
  id: number;
  name: string;
  address: any;
  marker: mapboxgl.Marker;
}
