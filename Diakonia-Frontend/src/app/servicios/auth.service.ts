import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseURL: string = environment.backendUrl;

  constructor(private httpClient: HttpClient) {}

  login(data: any) {
    return this.httpClient.post(`${environment.backendUrl}/login`, data, {
      withCredentials: true,
    });
  }

  register(data: any) {
    return this.httpClient.post(`${environment.backendUrl}/register`, data, {
      withCredentials: true,
    });
  }
}
