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

    constructor(private http: HttpClient) { }

    login(form: any){

        return this.http.post('http://localhost:8000/api/login', form.getRawValue(), {withCredentials:true})
        
    }


}