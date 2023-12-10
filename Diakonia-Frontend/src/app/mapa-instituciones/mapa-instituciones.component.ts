import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';

declare var google: any;

@Component({
  selector: 'app-mapa-instituciones',
  templateUrl: './mapa-instituciones.component.html',
  styleUrls: ['./mapa-instituciones.component.css']
})
export class MapaInstitucionesComponent {

  dato: string='';
  direccionMapList: string[] = [];
  latitudesMapList: number[] = [];
  longitudesMapList: number[] = [];
  radioAccionList:number[] = [];
  map: any;

  constructor(private route: ActivatedRoute,
    private api: ApiService,) {}
    ngOnInit(): void {
      this.getDataInstitucionesDireccionesMapa();
    }

    getDataInstitucionesDireccionesMapa(){
      this.api.DataInstituciones()
      .subscribe({
        next:(res)=>{
          console.log(res);
          let obj = res;
          if (obj) { // Asegúrate de que obj no es undefined
            for (let item of obj) {
              for (let direccion of item.direccion) {
                this.direccionMapList.push(direccion.direccion_nombre); // Añadir cada item a la lista
                this.latitudesMapList.push(parseFloat(direccion.latitud)); // Convertir a número y añadir a la lista
                this.longitudesMapList.push(parseFloat(direccion.longitud)); // Convertir a número y añadir a la lista
              }
            }
            console.log(this.direccionMapList);
            console.log(this.latitudesMapList);
            console.log(this.longitudesMapList);

            for (let item of obj) {
              // Llenar radioAccionList basado en el número de beneficiarios
              let beneficiarios = item.numero_beneficiarios;
              if (beneficiarios <= 100) {
                this.radioAccionList.push(100);
              } else if (beneficiarios > 100 && beneficiarios <= 200) {
                this.radioAccionList.push(200);
              } else if (beneficiarios > 200 && beneficiarios <= 300) {
                this.radioAccionList.push(300);
              } else if (beneficiarios > 300 && beneficiarios <= 400) {
                this.radioAccionList.push(400);
              } else if (beneficiarios > 400 && beneficiarios <= 500) {
                this.radioAccionList.push(500);
              } else if (beneficiarios > 500 && beneficiarios <= 600) {
                this.radioAccionList.push(600);
              } else if (beneficiarios > 600 && beneficiarios <= 700) {
                this.radioAccionList.push(700);
              } else if (beneficiarios > 700 && beneficiarios <= 800) {
                this.radioAccionList.push(800);
              } else if (beneficiarios > 800 && beneficiarios <= 900) {
                this.radioAccionList.push(900);
              } else if (beneficiarios > 900) {
                this.radioAccionList.push(1000);
              }
            }
            console.log(this.radioAccionList);

            // Crear las posiciones de los marcadores
            this.markerPositions = this.latitudesMapList.map((lat, index) => {
              return {
                lat: lat,
                lng: this.longitudesMapList[index]
              };
            });


            // Crear los círculos alrededor de los marcadores
            this.markerPositions.forEach((position, index) => {
              const cityCircle = new google.maps.Circle({
                strokeColor: "#fff",
                strokeOpacity: 0.2,
                strokeWeight: 1,
                fillColor: "#fff",
                fillOpacity: 0.15,
                map: this.map,
                center: position,
                radius: this.radioAccionList[index]
              });
            });



          } else {
            console.log('No se encontró ningún objeto con id:', this.dato);
          }
        },
        error:(err)=>{
          alert("Error while fetching the Records!!")
        }
      })
    }

  center: google.maps.LatLngLiteral = {
    lat: -2.2058400,
    lng: -79.9079500
  };
  zoom = 8;
  markerOptions: google.maps.MarkerOptions = {
      draggable: false,
      icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
  };

  markerPositions: google.maps.LatLngLiteral[] = [];
  addMarker(event: google.maps.MapMouseEvent) {
  }
}
