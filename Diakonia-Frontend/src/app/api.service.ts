import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

const headers = new HttpHeaders({
  Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`
})
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseURL: string = "http://localhost:8000/api";

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
    return this.http.get<any>(`${this.baseURL}/DataInstituciones/${id}`, {headers, withCredentials: true});
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
    return this.http.put(`${this.baseURL}/users/${id}`, data, {headers, withCredentials: true});
  }

  filterInstitucion(data: any) {
    const params = new HttpParams().set("nombre_acitividad", data.nombre_acitividad).set("tipo_poblacion", data.tipo_poblacion);
    return this.http.get(`${this.baseURL}/filter`, {headers, withCredentials: true, params});
  }
}

