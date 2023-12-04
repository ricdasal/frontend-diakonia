import { Component, OnInit, Inject  } from '@angular/core';
import {FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup, FormBuilder} from '@angular/forms';
import {NgIf, NgFor} from '@angular/common';
import { ApiService } from '../api.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClienteWAService } from '../servicios/servicios';
import { AppModule } from '../app.module';


@Component({
  selector: 'app-modal-instituciones',
  templateUrl: './modal-instituciones.component.html',
  styleUrls: ['./modal-instituciones.component.css']
})
export class ModalInstitucionesComponent implements OnInit{

  institucionForm !: FormGroup;
  actionBtn: string = 'Guardar Cambios';

  toppings = new FormControl('');

  toppingList: string[] = ['Salud', 'Rehabilitacion Social', 'Exclusion Social', 'Inseguridad Alimentaria', 'Situacion de calle', 'Albergues','Discapacidad'];

  toppings2 = new FormControl('');

  toppingList2: string[] = ['Ballenita', 'Centro', 'Chongon', 'Daule', 'Duran', 'El laurel','El triunfo', 'La libertad', 'Lomas Sargentillo', 'Marcelino Mariduena', 'Naranjito', 'Nobol'];


  email = new FormControl('', [Validators.required, Validators.email]);

  lista_actividades: Array<any> = [];
  lista_caracterizaciones: Array<any> = [];
  lista_sectores: Array<any> = [];
  lista_tipo_poblacion: Array<any> = ["Familias (Niños, Adolescentes, Adultos)",
    "Niños Y Niñas",
    "Mujeres", 
    "Niños, niñas y Adolescentes",
    "Adulto Mayor", 
    "Jóvenes Y Adultos", 
    "Jóvenes",
    "Niños, Niñas, Adolescentes, Adultos Con Discapacidad",
    "Adolescentes, Adultos"
  ]
  lista_clasificacion = ['oro', 'plata', 'bronce'];
  lista_condicion = ['Salud', 'Rehabilitacion Social', 'Exclusion Social', 'Inseguridad Alimentaria', 'Situacion de calle', 'Albergues','Discapacidad'];
  lista_estados = ['ACTIVA', 'EN PROCESO DE DESVINCULACION', 'DONACION', ]


  registerForm!: FormGroup;

  constructor(private formbuilder: FormBuilder,
    private api: ApiService,
    private servicios: ClienteWAService,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef: MatDialogRef<ModalInstitucionesComponent>){}

  ngOnInit(): void {
      this.obtenerCaracterizaciones();
      this.obtenerSectores();
      this.obtenerActividades()
      // this.institucionForm = this.formbuilder.group({
      //   id:['',Validators.required],
      //   nombre:['',Validators.required],
      //   numero_beneficiarios:['',Validators.required],
      //   ruc: ['',Validators.required],
      //   mes_ingreso:['',Validators.required],
      //   anio_ingreso:['',Validators.required],
      // });

      // if(this.editData){
      //   this.institucionForm.controls['id'].setValue(this.editData.id);
      //   this.institucionForm.controls['nombre'].setValue(this.editData.nombre);
      //   this.institucionForm.controls['numero_beneficiarios'].setValue(this.editData.numero_beneficiarios);
      //   this.institucionForm.controls['ruc'].setValue(this.editData.ruc);
      //   this.institucionForm.controls['mes_ingreso'].setValue(this.editData.mes_ingreso);
      //   this.institucionForm.controls['anio_ingreso'].setValue(this.editData.anio_ingreso);

      // }

      this.registerForm = new FormGroup({
        nombre_institucion: new FormControl(null, [Validators.required]),//
        representante_legal: new FormControl(null, [Validators.required]),
        ruc: new FormControl(null, [Validators.required]),//
        numero_beneficiarios: new FormControl(null, [Validators.required]),//
        actividad_id: new FormControl(null, [Validators.required]),//
        caracterizacion_id: new FormControl(null, [Validators.required]),//
        nombre_clasificacion: new FormControl(null, [Validators.required]),//
        condicion: new FormControl(null, [Validators.required]),
        nombre_contacto: new FormControl(null, [Validators.required]),//
        apellido_contacto: new FormControl(null, [Validators.required]),//
        correo_contacto: new FormControl(null, [Validators.required]),//
        telefono_contacto: new FormControl(null, [Validators.required]),//
        direccion: new FormControl(null, [Validators.required]),//
        url_direccion: new FormControl(null, [Validators.required]),//
        latitud: new FormControl(null, [Validators.required]),//
        longitud: new FormControl(null, [Validators.required]),//
        nombre_estado: new FormControl(null, [Validators.required]),
        mes_ingreso: new FormControl(null, [Validators.required]),//
        anio_ingreso: new FormControl(null, [Validators.required]),//
        sector_id: new FormControl(null, [Validators.required]),//
        tipo_poblacion: new FormControl(null, [Validators.required]),//
      })
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



  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  obtenerCaracterizaciones(){
    this.servicios.obtenerCaracterizaciones()
    .subscribe((res: any) =>{
      console.log(res);
      this.lista_caracterizaciones = this.lista_caracterizaciones.concat(res);
    })
  }

  obtenerSectores(){
    this.servicios.obtenerSectores()
    .subscribe((res: any) => {
      this.lista_sectores =  this.lista_sectores.concat(res);
    })
  }

  obtenerActividades(){
    this.servicios.obtenerActividades()
    .subscribe((res)=>{
      this.lista_actividades = this.lista_actividades.concat(res);
    })
  }


  registrarInstitucion(form: any){
    console.log(form.value);
    this.servicios.ingresarInstitucion(form)
    .subscribe((res: any) => {
      console.log(res)
    })

  }
}
