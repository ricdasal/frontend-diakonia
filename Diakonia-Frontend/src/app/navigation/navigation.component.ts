import { Component, OnInit } from '@angular/core';
import { Emitters } from '../emitters/emitters';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  authenticated = false;

  constructor(){}

  ngOnInit(): void {
      Emitters.authEmitter.subscribe(
        (auth:boolean) => {
          this.authenticated = auth;
        }
      );
  }
}
