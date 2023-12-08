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
          let userRole = res.user?.replace(' ', '_')?.toUpperCase();
          localStorage.setItem('USER_ROLE', userRole);
          localStorage.setItem('ACCESS_TOKEN', res.token);
          this.userService.setRol(userRole);
          console.log(res);
          this.router.navigateByUrl('/');
        },
        (err: any) => {
          alert('Parece que las credenciales no son autenticas');
          this.form.reset();
        }
      );
  }
}
