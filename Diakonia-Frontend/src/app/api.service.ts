import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  AllInstituciones(){
    return this.http.get<any>("http://localhost:8000/api/AllInstituciones");
  }

  postInstitucion(data:any){
    return this.http.post<any>("http://localhost:8000/api/postInstitucion", data);
  }

  DataInstituciones(){
    return this.http.get<any>("http://localhost:8000/api/DataInstituciones");
  }

  DataInstitucionesId(id: string){
    return this.http.get<any>(`http://localhost:8000/api/DataInstituciones/${id}`);
  }
}

