import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Emitters } from '../emitters/emitters';
import { UserDto } from '../servicios/user.dto';
import { UserService } from '../servicios/user.service';
import { menuRol } from 'src/constraints/menu-rol';
import { MenuItems } from 'src/constraints/interfaces/menu-items';

type RolKey = keyof typeof menuRol;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  message = 'Bienvenido usuario';

  menu: MenuItems[] = [{ name: '', routerLink: '' }];

  constructor(private http: HttpClient, private userService: UserService) {
  }

  ngOnInit(): void {
    this.http
      .get('http://localhost:8000/api/user', { withCredentials: true })
      .subscribe(
        (res: any) => {
          this.message = `Hi ${res.name}`;
          this.userService.setCurrentUser(res as UserDto);
          console.log(res, this.userService.getCurrentUser())
          const rol: RolKey =
            this.userService.getRol().toUpperCase() as RolKey;
          this.menu = menuRol[rol] as MenuItems[];
          console.log(rol, this.userService)
          Emitters.authEmitter.emit(true);
        },
        (err) => {
          this.message = 'No estas loggeado';
          Emitters.authEmitter.emit(false);
        }
      );
  }
}
