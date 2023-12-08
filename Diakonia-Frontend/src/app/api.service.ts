import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const headers = new HttpHeaders({
  Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`
})
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  AllInstituciones(){
    return this.http.get<any>("http://localhost:8000/api/AllInstituciones", {headers, withCredentials: true});
  }

  postInstitucion(data:any){
    return this.http.post<any>("http://localhost:8000/api/postInstitucion", data, {headers, withCredentials: true});
  }

  DataInstituciones(){
    return this.http.get<any>("http://localhost:8000/api/DataInstituciones", {headers, withCredentials: true});
  }

  DataUsers(){
    return this.http.get<any>("http://localhost:8000/api/DataUsers", {headers, withCredentials: true});
  }

  DataInstitucionesId(id: string){
    return this.http.get<any>(`http://localhost:8000/api/DataInstituciones/${id}`, {headers, withCredentials: true});
  }

  DataInstitucionesDirecciones(){
    return this.http.get<any>(`http://localhost:8000/api/DataInstitucionesDirecciones`, {headers, withCredentials: true});
  }
}

