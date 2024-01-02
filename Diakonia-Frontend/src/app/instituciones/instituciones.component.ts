import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ModalInstitucionesComponent } from '../modal-instituciones/modal-instituciones.component';
import * as XLSX from 'xlsx';
import { ApiService } from '../api.service';
import { ModalInstitucionesDatosComponent } from '../modal-instituciones-datos/modal-instituciones-datos.component';
import { SharedService } from '../shared.service';
import { InstitucionDataExcel } from './models/institucion';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Actividad, TiposPoblacion } from '../modal-instituciones/models';
import { catchError, switchMap, tap } from 'rxjs';

const headersAPI = new HttpHeaders({
  Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
});

@Component({
  selector: 'app-instituciones',
  templateUrl: './instituciones.component.html',
  styleUrls: ['./instituciones.component.css'],
})
export class InstitucionesComponent implements OnInit {
  //displayedColumns: string[] = ['id', 'nombre', 'numero_beneficiarios', 'ruc', 'nombre_estado', 'acciones'];

  displayedColumns: string[] = [
    'id',
    'nombre',
    'numero_beneficiarios',
    'ruc',
    'mes_ingreso',
    'anio_ingreso',
    'mapa',
    'acciones',
  ];
  dataSource!: MatTableDataSource<any>;

  elemento: string = '';

  uploadedFile: boolean = false;
  messageLog: string = '';
  filterForm: FormGroup;

  nombreInstitucion = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  actividades: Actividad[] = [];
  tiposPoblacion: TiposPoblacion[] = [];

  constructor(
    private dialog: MatDialog,
    private http: HttpClient,
    private api: ApiService,
    private sharedService: SharedService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.filterForm = this.fb.group({
      nombre_actividad: new FormControl(''),
      tipo_poblacion: new FormControl(''),
    });
  }

  ngOnInit() {
    //this.getAllInstituciones();
    this.getDataInstituciones();
    this.api
      .getAllActividades()
      .pipe(
        tap((actividades: Actividad[]) => (this.actividades = actividades)),
        switchMap(() => {
          return this.api
            .getAllTiposPoblacion()
            .pipe(
              tap(
                (tiposPoblacion: TiposPoblacion[]) =>
                  (this.tiposPoblacion = tiposPoblacion)
              )
            );
        }),
        catchError((err: any) => {
          throw new Error(err);
        })
      )
      .subscribe(
        (res: any) => {
          console.log('OK');
        },
        (err: any) => {
          console.log(err);
        }
      );
  }

  filterSubmit(): void {
    let validFilter =
      this.filterForm.get('nombre_actividad')?.value !== '' ||
      this.filterForm.get('tipo_poblacion')?.value !== '';
    if (validFilter) {
      this.api.filterInstitucion(this.filterForm.value).subscribe(
        (res: any) => {
          this.dataSource = new MatTableDataSource(res.instituciones);
          if (!res) {
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
        },
        (err: any) => {
          alert('Ocurrio un error. Intenta mas tarde');
        }
      );
    } else {
      alert('Ingresa al menos un campo');
    }
  }

  fitroPorInstitucion(){

  if(this.nombreInstitucion == ''){
    this.getDataInstituciones();
  }
   this.dataSource.data = this.dataSource.data.filter(
    (item: { nombre: any; }) => {
    return (
      !this.nombreInstitucion || item.nombre.toLowerCase().includes(this.nombreInstitucion.toLowerCase())
    );

    })

  }


  getDataInstituciones() {
    this.api.DataInstituciones().subscribe({
      next: (res) => {
        console.log('instituciones',res)
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        alert('Error while fetching the Records!!');
      },
    });
  }

  openModalInstituciones() {
    this.dialog
      .open(ModalInstitucionesComponent, {
        width: '75vh',
        height: '95vh',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'save') {
          //this.getAllInstituciones();
          this.getDataInstituciones();
        }
      });
  }

  openDialogData(row: any) {
    this.sharedService.changeId(row.id);
    this.dialog
      .open(ModalInstitucionesDatosComponent, {
        width: '70vh',
        height: '80vh',
        data: row.id,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'save') {
          //this.getAllInstituciones();
          this.getDataInstituciones();
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

  editInstitucion(row: any): void {
    this.api.DataInstitucionesId(row.id).subscribe({
      next: (res: any) => {
        let institucion = res?.at(0);
        this.dialog
          .open(ModalInstitucionesComponent, {
            width: '70vh',
            data: institucion,
          })
          .afterClosed()
          .subscribe((val) => {
            if (val === 'update') {
              //this.getAllInstituciones();
              this.getDataInstituciones();
            }
          });
      },
      error: (err: any) => {
        alert('Ocurrio un error intenta mas tarde.');
      },
    });
  }

  disableInstitucion(row: any): void {
    let res = confirm('Estas seguro de eliminar este usuario?');
    if (res) {
      this.api.disableInstitucion(row.id).subscribe(
        (res: any) => {
          alert('Institucion Desabilitada');
          this.getDataInstituciones();
        },
        (error: any) => {
          alert('Ocurrio un error. Intenta de nuevo');
        }
      );
    }
    return;
  }

  uploadFile(event: Event) {
    let element = event.target as HTMLInputElement;
    this.messageLog = '';
    let file = element.files![0];
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      // Parsea el archivo .xlsx
      let workbook = XLSX.read(fileReader.result, { type: 'binary' });
      let worksheet = workbook.Sheets[workbook.SheetNames[0]];
      let header = XLSX.utils.sheet_to_json(worksheet).at(0) as Object;
      let headers = Object.values(header).map((elem: string) =>
        elem.toLocaleLowerCase().trim().replaceAll(' ', '_')
      );
      let csvData = XLSX.utils.sheet_to_json(worksheet, {
        range: 1,
        header: headers,
      });
      csvData.shift();
      csvData.pop();
      // Envía los datos al backend
      this.uploadedFile = true;

      this.http
        .post(
          'http://localhost:8000/api/readData',
          { data: csvData },
          { withCredentials: true, headers: headersAPI }
        )
        .subscribe(
          (response: any) => {
            if (response?.success) {
              this.messageLog = 'Archivo Subido Correctamente!';
            } else {
              this.messageLog =
                'Algo salio mal. Intenta subir de nuevo el archivo.';
            }
            this.uploadedFile = false;
            this.ngOnInit();
          },
          (error) => {
            this.messageLog = 'Ocurrio un error. Intenta mas tarde.';
            this.uploadedFile = false;
          }
        );
    };
    fileReader.readAsBinaryString(file);
    fileReader.onerror = (e) => {
      alert('Ocurrio un error');
    };
  }
}
