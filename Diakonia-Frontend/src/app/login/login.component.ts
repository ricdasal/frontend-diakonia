import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../servicios/user.service';
import { UserDto } from '../servicios/user.dto';
import { AuthService } from '../servicios/auth.service';

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
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: '',
      password: '',
    });
  }

  submit(form: any): void {
    this.authService.login(this.form.getRawValue()).subscribe({
      next: (res: any) => {
        let userRole = res.user?.replace(' ', '_')?.toUpperCase();
        localStorage.setItem('USER_ROLE', userRole);
        localStorage.setItem('ACCESS_TOKEN', res.token);
        this.userService.setRol(userRole);
        console.log(res);
        this.router.navigateByUrl('/');
      },
      error: (err: any) => {
        alert('Parece que las credenciales no son autenticas');
        this.form.reset();
      },
    });
  }
}
