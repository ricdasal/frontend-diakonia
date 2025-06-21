import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalInstitucionesComponent } from '../modal-instituciones/modal-instituciones.component';
import * as XLSX from 'xlsx';
import { ApiService } from '../api.service';
import { Dialog } from '@angular/cdk/dialog';
import { ModalInstitucionesDatosComponent } from '../modal-instituciones-datos/modal-instituciones-datos.component';
import { SharedService } from '../shared.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalAdminUsersComponent } from '../modal-admin-users/modal-admin-users.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css'],
})
export class AdminUsersComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'apellido',
    'cargo_institucional',
    'email',
    'telefono',
    'acciones',
  ];
  dataSource!: MatTableDataSource<any>;

  elemento: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private http: HttpClient,
    private api: ApiService,
    private sharedService: SharedService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getDataUsers();
  }

  getDataUsers() {
    this.api.DataUsers().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        alert('Error while fetching the Records!!');
      },
    });
  }

  openDialog() {
    this.dialog
      .open(ModalAdminUsersComponent, {
        width: '30%',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'save') {
          //this.getAllInstituciones();
          this.getDataUsers();
        }
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editUser(row: any) {
    this.dialog
      .open(ModalAdminUsersComponent, {
        width: '70vh',
        data: row,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'update') {
          //this.getAllInstituciones();
          this.getDataUsers();
        }
      });
  }

  deleteUser(row: any) {
    this.api.deleteUser(row.id).subscribe(
      (res: any) => {
        alert('Usuario Elimado Correctamente');
        this.getDataUsers();
      },
      (res: any) => {
        alert('Ocurrio un error. Intenta mas tarde.');
      }
    );
  }

  newUser() {
    this.dialog
      .open(RegisterComponent, {
        width: '100vh',
      })
      .afterClosed()
      .subscribe(() => {
        this.getDataUsers();
      });
  }
}
