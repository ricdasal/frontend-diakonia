import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Emitters } from '../emitters/emitters';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  message = 'Bienvenido usuario';

  constructor(
    private http:HttpClient
  ){}

  ngOnInit(): void {
      this.http.get('http://127.0.0.1:8000/api/user', {withCredentials:true}).subscribe(
        (res:any) => {
          this.message = `Hi ${res.name}`;
          Emitters.authEmitter.emit(true);
        },
        err =>{
          this.message = 'No estas loggeado';
          Emitters.authEmitter.emit(false);
        }
      );
  }
}
