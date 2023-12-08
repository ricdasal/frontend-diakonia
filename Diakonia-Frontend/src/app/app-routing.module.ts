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
import { InformacionInstitucionesComponent } from './informacion-instituciones/informacion-instituciones.component';
import { MapaInvitadoComponent } from './mapa-invitado/mapa-invitado.component';
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [GuardLoginGuard, RoleGuard],
    data: { roles: ['ADMINISTRADOR', 'USUARIO_GENERAL', 'USUARIO_INVITADO'] },
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [GuardLoginGuard],
  },
  {
    path: 'instituciones',
    component: InstitucionesComponent,
    canActivate: [GuardLoginGuard, RoleGuard],
    data: { roles: ['ADMINISTRADOR', 'USUARIO_GENERAL'] },
  },
  {
    path: 'mapa',
    component: MapaInstitucionesComponent,
    canActivate: [GuardLoginGuard, RoleGuard],
    data: { roles: ['ADMINISTRADOR'] },
  },
  {
    path: 'instituciones/mapa/:id',
    component: MapaComponent,
    canActivate: [GuardLoginGuard, RoleGuard],
    data: { roles: ['ADMINISTRADOR', 'USUARIO_GENERAL'] },
  },
  {
    path: 'adminuser',
    component: AdminUsersComponent,
    canActivate: [GuardLoginGuard, RoleGuard],
    data: { roles: ['ADMINISTRADOR'] },
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [GuardLoginGuard, RoleGuard],
    data: { roles: ['ADMINISTRADOR'] },
  },
  {
    path: 'informacion-instituciones',
    component: InformacionInstitucionesComponent,
    canActivate: [GuardLoginGuard, RoleGuard],
    data: { roles: ['ADMINISTRADOR', 'USUARIO_INVITADO'] },
  },
  {
    path: 'informacion-instituciones/mapa-invitado/:id',
    component: MapaInvitadoComponent,
    canActivate: [GuardLoginGuard, RoleGuard],
    data: { roles: ['ADMINISTRADOR', 'USUARIO_INVITADO'] },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
