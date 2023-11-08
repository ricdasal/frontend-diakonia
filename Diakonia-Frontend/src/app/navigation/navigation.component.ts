import { Component, OnInit } from '@angular/core';
import { Emitters } from '../emitters/emitters';
import { HttpClient } from '@angular/common/http';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  authenticated = false;

  isSmallScreen = false;
  menuOpen = false;

  constructor(
    private http: HttpClient,
    private router: Router
  ){}

  menuVariable:boolean = false;
  menu_icon_variable:boolean = false;


  ngOnInit(): void {
      Emitters.authEmitter.subscribe(
        (auth:boolean) => {
          this.authenticated = auth;
        }
      );
  }

  logout(): void {
    this.http.post('http://localhost:8000/api/logout', {}, {withCredentials:true})
    .subscribe( () => {
        this.authenticated = false;
        this.router.navigate(['/login']);
    });
}
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  openMenu(){
    this.menuVariable =! this.menuVariable;
    this.menu_icon_variable =! this.menu_icon_variable;

  }
}
