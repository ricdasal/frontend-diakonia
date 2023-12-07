import { Component, OnInit } from '@angular/core';
import { Emitters } from '../emitters/emitters';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    Emitters.authEmitter.subscribe((auth: boolean) => {
      this.authenticated = auth;
    });
    let rol: Rol = localStorage
      .getItem('USER_ROLE')
      ?.toUpperCase()
      ?.replace(' ', '_') as Rol;
    this.menuNagivation = menuNagivation[rol];
  }

  logout(): void {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
    });
    this.http
      .post(
        'http://localhost:8000/api/logout',
        {},
        { headers: headers, withCredentials: true }
      )
      .subscribe(() => {
        this.authenticated = false;
        this.router.navigate(['/login']);
        localStorage.removeItem('ACCESS_TOKEN');
        localStorage.removeItem('USER_TOKEN');
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
