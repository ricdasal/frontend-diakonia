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
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {path: '', component:HomeComponent, canActivate:[GuardLoginGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent, canActivate:[GuardLoginGuard]},
  {path: 'instituciones', component: InstitucionesComponent, canActivate:[GuardLoginGuard]},
  {path: 'mapa', component: MapaInstitucionesComponent, canActivate:[GuardLoginGuard]},
  { path: 'instituciones/mapa/:id', component: MapaComponent, canActivate:[GuardLoginGuard]},
  { path: 'adminuser', component: AdminUsersComponent, canActivate:[GuardLoginGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate:[GuardLoginGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
