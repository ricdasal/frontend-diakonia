import { Injectable } from '@angular/core';
import { HttpClient, HttpContext, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ClienteWAService {

    URL_DESARROLLO = "http://localhost:8000/api/"
    URL_PRODUCCION = ""

    URL_APIS: string = this.URL_DESARROLLO;

    URL_LOGIN: string = this.URL_APIS + "login"
    URL_CARACTERIZACION:string = this.URL_APIS + 'caracterizacion';
    URL_SECTORIZACION:string =  this.URL_APIS + 'sectores';
    URL_ACTIVIDADES:string = this.URL_APIS + 'actividades';



    URL_INGRESAR_INSTITUCION: string = this.URL_APIS + 'ingresarInstitucion'

    constructor(private http: HttpClient) { }

    login(form: any){
      return this.http.post(this.URL_LOGIN, form.getRawValue(), {withCredentials:true})
    }

    obtenerCaracterizaciones(){
      return this.http.get(this.URL_CARACTERIZACION, {withCredentials:true})
    }

    obtenerSectores(){
      return this.http.get(this.URL_SECTORIZACION, {withCredentials:true})
    }

    obtenerActividades(){
      return this.http.get(this.URL_ACTIVIDADES, {withCredentials:true});
    }

    ingresarInstitucion(form: any){

      return this.http.post(this.URL_INGRESAR_INSTITUCION, form.value, {withCredentials:true})

    }

}