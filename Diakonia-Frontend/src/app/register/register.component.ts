import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup = this.formBuilder.group({
    name: '',
    apellido: '',
    telefono: '',
    cargo_institucional: '',
    email: '',
    password: '',
  });

  roles: String[] = ['Administrador', 'Usuario Invitado', 'Usuario General'];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: '',
      apellido: '',
      telefono: '',
      cargo_institucional: '',
      email: '',
      password: '',
    });
  }

  submit(): void {
    this.http
      .post('http://localhost:8000/api/register', this.form.getRawValue())
      .subscribe(
        (res: any) => {
          alert('Usuario Creado');
        },
        (err: any) => {
          console.log(err);
          alert('Ocurrio un error');
        }
      );
  }
}