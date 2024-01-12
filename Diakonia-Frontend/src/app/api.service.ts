import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

const headers = new HttpHeaders({
  Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`
})
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  URL_DESARROLLO = 'http://localhost:8000/api';
  URL_PRODUCCION = 'https://select-monkey-highly.ngrok-free.app';
  baseURL: string = this.URL_DESARROLLO;

  constructor(private http: HttpClient) { }

  AllInstituciones(){
    return this.http.get<any>(`${this.baseURL}/AllInstituciones`, {headers, withCredentials: true});
  }

  postInstitucion(data:any){
    return this.http.post<any>(`${this.baseURL}/postInstitucion`, data, {headers, withCredentials: true});
  }

  DataInstituciones(){
    return this.http.get<any>(`${this.baseURL}/DataInstituciones`, {headers, withCredentials: true});
  }

  DataUsers(){
    return this.http.get<any>(`${this.baseURL}/DataUsers`, {headers, withCredentials: true});
  }

  DataInstitucionesId(id: string){
    return this.http.get<any>(`${this.baseURL}/DataInstitucionesId/${id}`, {headers, withCredentials: true});
  }

  DataInstitucionesDirecciones(){
    return this.http.get<any>(`${this.baseURL}/DataInstitucionesDirecciones`, {headers, withCredentials: true});
  }

  editUser(data: any, id: number) {
    return this.http.put(`${this.baseURL}/users/${id}`, data, {headers, withCredentials: true});
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.baseURL}/users/${id}`, {headers, withCredentials: true});
  }

  disableInstitucion(id: number) {
    return this.http.get(`${this.baseURL}/disableInstitucion/${id}`, {headers, withCredentials: true});
  }

  updateInformationInstitucion(data: any, id: number) {
    console.log(data)
    return this.http.put(`${this.baseURL}/editInstitucion/${id}`, data, {headers, withCredentials: true});
  }

  filterInstitucion(data: any) {
    const {nombre_actividad, tipo_poblacion} = data
    const params = new HttpParams().set("nombre_actividad", nombre_actividad).set("tipo_poblacion", tipo_poblacion);
    console.log(params);
    return this.http.get(`${this.baseURL}/filter`, {headers, withCredentials: true, params});
  }

  getAllActividades() {
    return this.http.get<any>(`${this.baseURL}/actividades`, {headers, withCredentials: true});
  }

  getAllTiposPoblacion() {
    return this.http.get<any>(`${this.baseURL}/tiposPoblacion`, {headers, withCredentials: true});
  }

  getAllInformation() {
    return this.http.get<any>(`${this.baseURL}/getAllInformation`, {headers, withCredentials: true});
  }

  addInstitucion(data: any) {
    return this.http.post<any>(`${this.baseURL}/agregarInstitucion`, data, {headers, withCredentials: true});
  }

  getBeneficiariosXAnio(){

    return this.http.get<any>(`${this.baseURL}/beneficiarios`, {headers, withCredentials: true});

  }

  getBeneficiariosRangoAnio(anioInicio: any, anioFinal: any){

    return this.http.get<any>(`${this.baseURL}/beneficiarios-anio?anioInicio=${anioInicio}&anioFin=${anioFinal}`, {headers, withCredentials: true});

  }

  getInstitucionesEstado(anio: any){

    return this.http.get<any>(`${this.baseURL}/instituciones-estado?&anioFin=${anio}`, {headers, withCredentials: true});

  }

}

