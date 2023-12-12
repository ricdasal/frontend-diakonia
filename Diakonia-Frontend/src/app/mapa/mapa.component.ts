import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css'],
})
export class MapaComponent implements OnInit {

  circleCenter: google.maps.LatLngLiteral = {lat: 100, lng: 15};
  radius = 3;


  id: string='';
  nombreInstitucion: string='';
  nombreContacto: string = '';
  apellidoContacto: string = '';
  correosContacto: string[] = [];
  telefonosContacto: string[] = [];

  direccionList: string[] = [];
  sectorizacionList: string[] = [];
  urlsList: string[] = [];
  latitudesList: number[] = [];
  longitudesList: number[] = [];

  constructor(private route: ActivatedRoute,
    private api: ApiService,) {
      this.id = this.route.snapshot.paramMap.get('id') || '';
    }

    ngOnInit(): void {
      this.getDataInstitucionesIdMapa();
    }


    getDataInstitucionesIdMapa(){
      this.api.DataInstitucionesId(this.id)
      .subscribe({
        next:(res)=>{
          //console.log(res[this.id]);
          let obj = res.at(0)
          if (obj) { // Asegúrate de que obj no es undefined

            this.nombreInstitucion = obj.nombre
            console.log(this.nombreInstitucion);


            this.nombreContacto = obj.contactos[0].nombre
            console.log(this.nombreContacto);

            this.apellidoContacto = obj.contactos[0].apellido
            console.log(this.apellidoContacto);

            for (let item of obj.contactos[0].correos) {
              this.correosContacto.push(item.correo_contacto); // Añadir cada item a la lista
            }
            console.log(this.correosContacto);

            for (let item of obj.contactos[0].telefonos) {
              this.telefonosContacto.push(item.telefono_contacto); // Añadir cada item a la lista
            }
            console.log(this.telefonosContacto);

            for (let item of obj.direccion) {
              this.direccionList.push(item.direccion_nombre); // Añadir cada item a la lista
            }
            console.log(this.direccionList);

            for (let item of obj.sectorizacion) {
              this.sectorizacionList.push(item.nombre_sectorizacion); // Añadir cada item a la lista
            }
            console.log(this.sectorizacionList);

            for (let item of obj.direccion) {
              this.latitudesList.push(parseFloat(item.latitud)); // Convertir a número y añadir a la lista
            }
            console.log(this.latitudesList);

            for (let item of obj.direccion) {
              this.longitudesList.push(parseFloat(item.longitud)); // Convertir a número y añadir a la lista
            }
            console.log(this.longitudesList);

            for (let item of obj.direccion) {
              this.urlsList.push(item.url_direccion); // Añadir cada item a la lista
            }
            console.log(this.urlsList);

           // Crear las posiciones de los marcadores
           this.markerPositions = this.latitudesList.map((lat, index) => {
              return {
                lat: lat,
                lng: this.longitudesList[index]
              };
            });



          } else {
            console.log('No se encontró ningún objeto con id:', this.id);
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
    zoom = 4;
    markerOptions: google.maps.MarkerOptions = {
        draggable: false
    };
    markerPositions: google.maps.LatLngLiteral[] = [];
    addMarker(event: google.maps.MapMouseEvent) {
        if (event.latLng != null) this.markerPositions.push(event.latLng.toJSON());
    }



}
