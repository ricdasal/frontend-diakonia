import { Component, OnInit } from '@angular/core';
import { Emitters } from '../emitters/emitters';
import { HttpClient } from '@angular/common/http';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { UserService } from '../servicios/user.service';
import { menuNagivation } from 'src/constraints/menu-rol';
import { MenuItems } from 'src/constraints/interfaces/menu-items';

type Rol = keyof typeof menuNagivation;

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  authenticated = false;

  isSmallScreen = false;
  menuOpen = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService
  ) {}

  menuVariable: boolean = false;
  menu_icon_variable: boolean = false;

  menuNagivation: MenuItems[] = [{ routerLink: '', name: '' }];

  ngOnInit(): void {
    let rol: Rol = this.userService.getRol() as Rol;
    this.menuNagivation = menuNagivation[rol];
    Emitters.authEmitter.subscribe((auth: boolean) => {
      this.authenticated = auth;
    });
  }

  logout(): void {
    localStorage.removeItem('ACCESS_TOKEN');
    this.http
      .post('http://localhost:8000/api/logout', {}, { withCredentials: true })
      .subscribe(() => {
        this.authenticated = false;
        this.router.navigate(['/login']);
      });
  }
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  openMenu() {
    this.menuVariable = !this.menuVariable;
    this.menu_icon_variable = !this.menu_icon_variable;
  }
}
