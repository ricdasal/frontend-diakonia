import { Component, OnInit, Inject  } from '@angular/core';
import {FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup, FormBuilder} from '@angular/forms';
import {NgIf, NgFor} from '@angular/common';
import { ApiService } from '../api.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-modal-instituciones',
  templateUrl: './modal-instituciones.component.html',
  styleUrls: ['./modal-instituciones.component.css']
})
export class ModalInstitucionesComponent implements OnInit{

  institucionForm !: FormGroup;
  actionBtn: string = 'Save';

  constructor(private formbuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef: MatDialogRef<ModalInstitucionesComponent>){}

  ngOnInit(): void {
      this.institucionForm = this.formbuilder.group({
        id:['',Validators.required],
        nombre:['',Validators.required],
        numero_beneficiarios:['',Validators.required],
        ruc: ['',Validators.required],
        nombre_estado:['',Validators.required],
      });

      if(this.editData){
        this.institucionForm.controls['id'].setValue(this.editData.id);
        this.institucionForm.controls['nombre'].setValue(this.editData.nombre);
        this.institucionForm.controls['numero_beneficiarios'].setValue(this.editData.numero_beneficiarios);
        this.institucionForm.controls['ruc'].setValue(this.editData.ruc);
        this.institucionForm.controls['nombre_estado'].setValue(this.editData.nombre_estado);

      }
  }

  addInstitucion(){
    if(!this.editData){
      if(this.institucionForm.valid){
        this.api.postInstitucion(this.institucionForm.value).subscribe({
          next:(res)=>{
            alert("Institucion agregada exitosamente");
            this.institucionForm.reset();
            this.dialogRef.close('save');
          },
          error:()=>{
            alert("Error al agregar producto");
          }
        })
      }
    }
  }

  toppings = new FormControl('');

  toppingList: string[] = ['Salud', 'Rehabilitacion Social', 'Exclusion Social', 'Inseguridad Alimentaria', 'Situacion de calle', 'Albergues','Discapacidad'];

  toppings2 = new FormControl('');

  toppingList2: string[] = ['Ballenita', 'Centro', 'Chongon', 'Daule', 'Duran', 'El laurel','El triunfo', 'La libertad', 'Lomas Sargentillo', 'Marcelino Mariduena', 'Naranjito', 'Nobol'];


  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
}
