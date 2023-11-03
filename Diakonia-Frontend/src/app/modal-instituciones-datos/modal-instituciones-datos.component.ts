import { Component, OnInit, Inject  } from '@angular/core';
import {FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup, FormBuilder} from '@angular/forms';
import {NgIf, NgFor} from '@angular/common';
import { ApiService } from '../api.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-modal-instituciones-datos',
  templateUrl: './modal-instituciones-datos.component.html',
  styleUrls: ['./modal-instituciones-datos.component.css']
})
export class ModalInstitucionesDatosComponent implements OnInit{
  institucionForm !: FormGroup;
  actionBtn: string = 'Save';
  id: string='';
  institucionNombre: string='';

  constructor(private formbuilder: FormBuilder,
    private api: ApiService,
    private sharedService: SharedService){}

  ngOnInit() {
    this.getDataInstitucionesId();
    this.sharedService.currentId.subscribe(id => this.id = id);
    // Ahora puedes usar este ID para hacer una nueva solicitud a tu endpoint
    this.id = this.id;
    console.log(this.id);
  }


  toppings = new FormControl('');

  //toppingList: string[] = ['Salud', 'Rehabilitacion Social', 'Exclusion Social', 'Inseguridad Alimentaria', 'Situacion de calle', 'Albergues','Discapacidad'];
  actividadList: string[] = [];

  caracterizacionList: string[] = [];

  tipoPoblacionList: string[] = [];

  estadoList: string[] = [];

  toppings2 = new FormControl('');

  toppingList2: string[] = ['Ballenita', 'Centro', 'Chongon', 'Daule', 'Duran', 'El laurel','El triunfo', 'La libertad', 'Lomas Sargentillo', 'Marcelino Mariduena', 'Naranjito', 'Nobol'];


  email = new FormControl('', [Validators.required, Validators.email]);

  getDataInstitucionesId(){
    this.api.DataInstitucionesId(this.id)
    .subscribe({
      next:(res)=>{
        let obj = res.find((item: { id: string; }) => item.id === this.id);
        //console.log(obj.actividades);
        this.institucionNombre = obj.nombre;

        for (let item of obj.actividades) {
          this.actividadList.push(item.nombre_actividad); // Añadir cada item a la lista
        }
        //console.log(this.actividadList);

        for (let item of obj.caracterizacion) {
          this.caracterizacionList.push(item.nombre_caracterizacion); // Añadir cada item a la lista
        }
        //console.log(this.caracterizacionList);

        for (let item of obj.tipos_poblacion) {
          this.tipoPoblacionList.push(item.tipo_poblacion); // Añadir cada item a la lista
        }
        //console.log(this.tipoPoblacionList);

        for (let item of obj.estado) {
          this.estadoList.push(item.nombre_estado); // Añadir cada item a la lista
        }
        //console.log(this.estadoList);
      },
      error:(err)=>{
        alert("Error while fetching the Records!!")
      }
    })
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
}
