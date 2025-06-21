import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';
import { MatDialogRef } from '@angular/material/dialog';

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
    private router: Router,
    private authService: AuthService,
    public dialogRef: MatDialogRef<RegisterComponent>
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
    this.authService.register(this.form.getRawValue()).subscribe({
      next: (res: any) => {
        alert('Usuario Creado Sastifactoriamente.');
        this.closeDialog();
      },
      error: (err: any) => {
        console.log(err);
        alert('Ocurrio un error. Intenta de nuevo.');
      },
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
