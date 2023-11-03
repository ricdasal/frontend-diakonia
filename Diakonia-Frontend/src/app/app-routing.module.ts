import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { InstitucionesComponent } from './instituciones/instituciones.component';
import { MapaComponent } from './mapa/mapa.component';
import { MapaInstitucionesComponent } from './mapa-instituciones/mapa-instituciones.component';
import { GuardLoginGuard } from './guards/guard-login.guard';

const routes: Routes = [
  {path: '', component:HomeComponent, /*canActivate:[GuardLoginGuard]*/},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'instituciones', component: InstitucionesComponent},
  {path: 'mapa', component: MapaInstitucionesComponent},
  { path: 'instituciones/mapa/:id', component: MapaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
