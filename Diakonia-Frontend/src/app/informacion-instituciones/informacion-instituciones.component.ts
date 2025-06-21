import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ModalInstitucionesComponent } from '../modal-instituciones/modal-instituciones.component';
import { ApiService } from '../api.service';
import { ModalInstitucionesDatosComponent } from '../modal-instituciones-datos/modal-instituciones-datos.component';
import { SharedService } from '../shared.service';
import { ModalInfoInstitucionesComponent } from '../modal-info-instituciones/modal-info-instituciones.component';

@Component({
  selector: 'app-informacion-instituciones',
  templateUrl: './informacion-instituciones.component.html',
  styleUrls: ['./informacion-instituciones.component.css'],
})
export class InformacionInstitucionesComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'nombre',
    'numero_beneficiarios',
    'mapa',
    'acciones',
  ];
  dataSource!: MatTableDataSource<any>;

  elemento: string = '';

  tipos_actividades: string[] = [];
  tipos_poblaciones: string[] = [];

  uploadedFile: boolean = false;
  messageLog: string = '';

  nombreInstitucion = '';

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
    //this.getAllInstituciones();
    this.getInfoInstituciones();
  }

  getInfoInstituciones() {
    this.api.DataInstituciones().subscribe({
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

  openDialogData(row: any) {
    this.sharedService.changeId(row.id);
    this.dialog
      .open(ModalInfoInstitucionesComponent, {
        width: '80vh',
        height: '40vh',
        data: row.id,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'save') {
          //this.getAllInstituciones();
          this.getInfoInstituciones();
        }
      });
  }

  getDataInstituciones() {
    this.api.DataInstituciones().subscribe({
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

  fitroPorInstitucion() {
    if (this.nombreInstitucion == '') {
      this.getDataInstituciones();
    }
    this.dataSource.data = this.dataSource.data.filter(
      (item: { nombre: any }) => {
        return (
          !this.nombreInstitucion ||
          item.nombre
            .toLowerCase()
            .includes(this.nombreInstitucion.toLowerCase())
        );
      }
    );
  }
}
