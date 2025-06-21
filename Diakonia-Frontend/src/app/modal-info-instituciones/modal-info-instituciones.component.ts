import { Component, OnInit, Inject } from '@angular/core';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { ApiService } from '../api.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-modal-info-instituciones',
  templateUrl: './modal-info-instituciones.component.html',
  styleUrls: ['./modal-info-instituciones.component.css'],
})
export class ModalInfoInstitucionesComponent implements OnInit {
  institucionForm!: FormGroup;
  actionBtn: string = 'Save';

  institucionNombre: string = '';

  actividadList: string[] = [];

  tipoPoblacionList: string[] = [];

  constructor(
    private formbuilder: FormBuilder,
    private api: ApiService,
    private sharedService: SharedService,
    @Inject(MAT_DIALOG_DATA) public id: string
  ) {}

  ngOnInit() {
    this.getDataInstitucionesId();
    this.sharedService.currentId.subscribe((id) => (this.id = id));
    // Ahora puedes usar este ID para hacer una nueva solicitud a tu endpoint
    this.id = this.id;
  }

  getDataInstitucionesId() {
    this.api.DataInstitucionesId(this.id).subscribe({
      next: (res) => {
        let obj = res.find((item: { id: string }) => item.id === this.id);
        this.institucionNombre = obj.nombre;

        for (let item of obj.actividades) {
          this.actividadList.push(item.nombre_actividad); // Añadir cada item a la lista
        }

        for (let item of obj.tipos_poblacion) {
          this.tipoPoblacionList.push(item.tipo_poblacion); // Añadir cada item a la lista
        }
      },
      error: (err) => {
        alert('Error while fetching the Records!!');
      },
    });
  }
}
