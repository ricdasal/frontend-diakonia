import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ModalInstitucionesComponent } from '../modal-instituciones/modal-instituciones.component';
import * as XLSX from 'xlsx';
import { ApiService } from '../api.service';
import { Dialog } from '@angular/cdk/dialog';


@Component({
  selector: 'app-instituciones',
  templateUrl: './instituciones.component.html',
  styleUrls: ['./instituciones.component.css']
})
export class InstitucionesComponent implements OnInit{
  displayedColumns: string[] = ['id', 'nombre', 'numero_beneficiarios', 'ruc', 'nombre_estado', 'acciones'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog:MatDialog,
    private http: HttpClient,
    private api: ApiService,
    private router: Router){

  }

  ngOnInit() {
    this.getAllInstituciones();
  }


  getAllInstituciones(){
    this.api.AllInstituciones()
    .subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort
      },
      error:(err)=>{
        alert("Error while fetching the Records!!")
      }
    })
  }

  openDialog() {
    this.dialog.open(ModalInstitucionesComponent, {
      width:'30%'
    }).afterClosed().subscribe(val=>{
      if(val === 'save'){
        this.getAllInstituciones();
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

  editInstitucion(row:any){
    this.dialog.open(ModalInstitucionesComponent, {
      width:'30%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val === 'update'){
        this.getAllInstituciones();
      }
    })
  }

  uploadFile(event: Event) {
    let element = event.target as HTMLInputElement;
    let file = element.files![0];
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      // Parsea el archivo .xlsx
      let workbook = XLSX.read(fileReader.result, {type: 'binary'});
      let worksheet = workbook.Sheets[workbook.SheetNames[0]];
      let csvData = XLSX.utils.sheet_to_json(worksheet);
      console.log(csvData);
      // Envía los datos al backend

      this.http.post('http://localhost:8000/api/readData', {data: csvData}).subscribe(
        (response) => {
          console.log(response); // Haz algo con la respuesta del servidor
        },
        (error) => {
          console.error(error); // Maneja el error
        }
      );


    };
    fileReader.readAsBinaryString(file);
  }



}
