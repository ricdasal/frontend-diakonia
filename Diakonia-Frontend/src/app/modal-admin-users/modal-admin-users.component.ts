import { Component, OnInit, Inject  } from '@angular/core';
import {FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup, FormBuilder} from '@angular/forms';
import {NgIf, NgFor} from '@angular/common';
import { ApiService } from '../api.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-admin-users',
  templateUrl: './modal-admin-users.component.html',
  styleUrls: ['./modal-admin-users.component.css']
})
export class ModalAdminUsersComponent implements OnInit{

  usersForm !: FormGroup;
  actionBtn: string = 'Save';

  constructor(private formbuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef: MatDialogRef<ModalAdminUsersComponent>){}

  ngOnInit(): void {
      this.usersForm = this.formbuilder.group({
        id:['',Validators.required],
        name:['',Validators.required],
        apellido:['',Validators.required],
        email: ['',Validators.required],
        cargo_institucional:['',Validators.required],
        telefono:['',Validators.required],
      });

      if(this.editData){
        this.usersForm.controls['id'].setValue(this.editData.id);
        this.usersForm.controls['name'].setValue(this.editData.nombre);
        this.usersForm.controls['apellido'].setValue(this.editData.numero_beneficiarios);
        this.usersForm.controls['email'].setValue(this.editData.ruc);
        this.usersForm.controls['cargo_institucional'].setValue(this.editData.mes_ingreso);
        this.usersForm.controls['telefono'].setValue(this.editData.anio_ingreso);

      }
  }

  editUser(){
    if(!this.editData){
      if(this.usersForm.valid){
        this.api.postInstitucion(this.usersForm.value).subscribe({
          next:(res)=>{
            alert("Usuario editado exitosamente");
            this.usersForm.reset();
            this.dialogRef.close('save');
          },
          error:()=>{
            alert("Error al editar usuario");
          }
        })
      }
    }
  }

  toppings = new FormControl('');

  toppingList: string[] = ['Administrador', 'Usuario General', 'Usuario Invitado'];

  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

}
