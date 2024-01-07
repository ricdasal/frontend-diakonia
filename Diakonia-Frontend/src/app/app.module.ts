import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './navigation/navigation.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatExpansionModule} from '@angular/material/expansion';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

import { MatDialogModule } from '@angular/material/dialog';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';

import { InstitucionesComponent } from './instituciones/instituciones.component';
import { ModalInstitucionesComponent } from './modal-instituciones/modal-instituciones.component';
import { MatSelectModule } from '@angular/material/select';

import { GoogleMapsModule } from '@angular/google-maps';
import { MapaComponent } from './mapa/mapa.component';
import { ModalInstitucionesDatosComponent } from './modal-instituciones-datos/modal-instituciones-datos.component';
import { MapaInstitucionesComponent } from './mapa-instituciones/mapa-instituciones.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { ModalAdminUsersComponent } from './modal-admin-users/modal-admin-users.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InformacionInstitucionesComponent } from './informacion-instituciones/informacion-instituciones.component';
import { ModalInfoInstitucionesComponent } from './modal-info-instituciones/modal-info-instituciones.component';
import { MapaInvitadoComponent } from './mapa-invitado/mapa-invitado.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    NavigationComponent,
    InstitucionesComponent,
    ModalInstitucionesComponent,
    MapaComponent,
    ModalInstitucionesDatosComponent,
    MapaInstitucionesComponent,
    AdminUsersComponent,
    ModalAdminUsersComponent,
    DashboardComponent,
    InformacionInstitucionesComponent,
    ModalInfoInstitucionesComponent,
    MapaInvitadoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    GoogleMapsModule,
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
