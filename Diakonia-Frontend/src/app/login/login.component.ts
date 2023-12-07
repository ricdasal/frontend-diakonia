import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../servicios/user.service';
import { UserDto } from '../servicios/user.dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hide = true;

  form: FormGroup = this.formBuilder.group({
    name: '',
    password: '',
  });

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: '',
      password: '',
    });
  }

  submit(form: any): void {
    this.http
      .post('http://localhost:8000/api/login', this.form.getRawValue(), {
        withCredentials: true,
      })
      .subscribe(
        (res: any) => {
          console.log(res);
          localStorage.setItem('USER_ROLE', res.user);
          localStorage.setItem('ACCESS_TOKEN', res.token);
          this.router.navigate(['/']);
        },
        (err: any) => {
          alert('Inicia De Nuevo');
        }
      );
  }
}
