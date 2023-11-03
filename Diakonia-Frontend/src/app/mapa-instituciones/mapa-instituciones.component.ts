import { Component } from '@angular/core';

@Component({
  selector: 'app-mapa-instituciones',
  templateUrl: './mapa-instituciones.component.html',
  styleUrls: ['./mapa-instituciones.component.css']
})
export class MapaInstitucionesComponent {

  center: google.maps.LatLngLiteral = {
    lat: -2.2058400,
    lng: -79.9079500
  };
  zoom = 4;
  markerOptions: google.maps.MarkerOptions = {
      draggable: false
  };
  markerPositions: google.maps.LatLngLiteral[] = [];
  addMarker(event: google.maps.MapMouseEvent) {
      if (event.latLng != null) this.markerPositions.push(event.latLng.toJSON());
  }

}
