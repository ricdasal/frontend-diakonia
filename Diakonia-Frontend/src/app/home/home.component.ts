import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Emitters } from '../emitters/emitters';
import { UserDto } from '../servicios/user.dto';
import { UserService } from '../servicios/user.service';
import { menuRol } from 'src/constraints/menu-rol';
import { MenuItems } from 'src/constraints/interfaces/menu-items';

type RolKey = keyof typeof menuRol;
const headers = new HttpHeaders({
  Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
});
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  message = 'Bienvenido usuario';

  menu: MenuItems[];

  constructor(private http: HttpClient, private userService: UserService) {
    this.menu = [{ name: '', routerLink: '' }];
  }

  ngOnInit(): void {
    this.http
      .get('http://localhost:8000/api/user', {
        headers: headers,
        withCredentials: true,
      })
      .subscribe(
        (res: any) => {
          this.message = `Hi ${res.name}`;
          this.userService.setCurrentUser(res as UserDto);
          const rol: RolKey = localStorage.getItem('USER_ROLE') as RolKey;
          this.menu = menuRol[rol] as MenuItems[];
          console.log(this.menu, rol);
          Emitters.authEmitter.emit(true);
        },
        (err) => {
          this.message = 'No estas loggeado';
          Emitters.authEmitter.emit(false);
        }
      );
  }
}
