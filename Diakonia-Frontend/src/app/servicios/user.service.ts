import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDto } from './user.dto';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: UserDto = {
    id: -1,
    name: '',
    email: '',
    cargo_institucional: '',
    telefono: '',
  };

  constructor(private http: HttpClient) {}

  getRol(): string {
    return (
      this.user.cargo_institucional || this.user.user || 'USUARIO_INVITADO'
    );
  }

  getCurrentUser() {
    return this.user;
  }

  setCurrentUser(user: UserDto) {
    this.user = user;
  }
}
