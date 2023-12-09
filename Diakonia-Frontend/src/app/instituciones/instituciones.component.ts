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
import { Dialog } from '@angular/cdk/dialog';
import { ModalInstitucionesDatosComponent } from '../modal-instituciones-datos/modal-instituciones-datos.component';
import { SharedService } from '../shared.service';
import { InstitucionDataExcel } from './models/institucion';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private http: HttpClient,
    private api: ApiService,
    private sharedService: SharedService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.filterForm = this.fb.group({
      nombre_actividad: new FormControl(""),
      tipo_poblacion: new FormControl(""),
  });
  }

  ngOnInit() {
    //this.getAllInstituciones();
    this.getDataInstituciones();
    
  }

  filterSubmit(): void {
    this.api.filterInstitucion(this.filterForm.value).subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, (err: any) => {
      alert("Ocurrio un error. Intenta mas tarde");
    })
  }

  getDataInstituciones() {
    this.api.DataInstituciones().subscribe({
      next: (res) => {
        console.log(res[0].red_bda[0].mes_ingreso);
        //this.elemento = res
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
    this.dialog.open(ModalInstitucionesComponent, {
      width:'75vh',
      height: '95vh'
    }).afterClosed().subscribe(val=>{
      if(val === 'save'){
        //this.getAllInstituciones();
        this.getDataInstituciones();
      }
    })
  }

  openDialogData(row: any) {
    this.sharedService.changeId(row.id);
    this.dialog.open(ModalInstitucionesDatosComponent, {
      width:'70vh'
    }).afterClosed().subscribe(val=>{
      if(val === 'save'){
        //this.getAllInstituciones();
        this.getDataInstituciones();
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editInstitucion(row: any) {
    this.dialog
      .open(ModalInstitucionesComponent, {
        width: '30%',
        data: row,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'update') {
          //this.getAllInstituciones();
          this.getDataInstituciones();
        }
      });
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
      }) as InstitucionDataExcel[];
      csvData.shift();
      csvData.pop();
      // Envía los datos al backend
      this.uploadedFile = true;
      
      this.http
        .post('http://localhost:8000/api/readData', { data: csvData }, { withCredentials:true, headers: headersAPI})
        .subscribe(
          (response: any) => {
            if (response?.success) {
              this.messageLog = 'Archivo Subido Correctamente!';
            } else {
              this.messageLog =
                'Algo salio mal. Intenta subir de nuevo el archivo.';
            }
            this.uploadedFile = false;
            this.getDataInstituciones();
            this.messageLog = '';
          },
          (error) => {
            this.messageLog = 'Ocurrio un error. Intenta mas tarde.';
            this.uploadedFile = false;
          }
        );
    };
    fileReader.readAsBinaryString(file);
  }
}
