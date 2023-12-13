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
import { ClienteWAService } from '../servicios/servicios';
import { AppModule } from '../app.module';
import {
  Actividad,
  Caracterizacion,
  Clasificacion,
  Estado,
  Institucion,
  Sectorizacion,
  TiposPoblacion,
} from './models';

@Component({
  selector: 'app-modal-instituciones',
  templateUrl: './modal-instituciones.component.html',
  styleUrls: ['./modal-instituciones.component.css'],
})
export class ModalInstitucionesComponent implements OnInit {
  institucionForm!: FormGroup;
  actionBtn: string = 'Guardar Cambios';

  // toppings = new FormControl('');

  // toppingList: string[] = [
  //   'Salud',
  //   'Rehabilitacion Social',
  //   'Exclusion Social',
  //   'Inseguridad Alimentaria',
  //   'Situacion de calle',
  //   'Albergues',
  //   'Discapacidad',
  // ];

  // toppings2 = new FormControl('');

  // toppingList2: string[] = [
  //   'Ballenita',
  //   'Centro',
  //   'Chongon',
  //   'Daule',
  //   'Duran',
  //   'El laurel',
  //   'El triunfo',
  //   'La libertad',
  //   'Lomas Sargentillo',
  //   'Marcelino Mariduena',
  //   'Naranjito',
  //   'Nobol',
  // ];

  // email = new FormControl('', [Validators.required, Validators.email]);

  // lista_actividades: Array<any> = [];
  // lista_caracterizaciones: Array<any> = [];
  // lista_sectores: Array<any> = [];
  // lista_tipo_poblacion: Array<any> = [
  //   'Familias (Niños, Adolescentes, Adultos)',
  //   'Niños Y Niñas',
  //   'Mujeres',
  //   'Niños, niñas y Adolescentes',
  //   'Adulto Mayor',
  //   'Jóvenes Y Adultos',
  //   'Jóvenes',
  //   'Niños, Niñas, Adolescentes, Adultos Con Discapacidad',
  //   'Adolescentes, Adultos',
  // ];
  // lista_clasificacion = ['oro', 'plata', 'bronce'];
  lista_condicion = [
    'Salud',
    'Rehabilitacion Social',
    'Exclusion Social',
    'Inseguridad Alimentaria',
    'Situacion de calle',
    'Albergues',
    'Discapacidad',
  ];
  // lista_estados = ['ACTIVA', 'EN PROCESO DE DESVINCULACION', 'DONACION'];

  isAdmin: boolean;
  condiciones: boolean[] = [true, false];
  registerForm!: FormGroup;
  actividades: Actividad[] = [];
  tipos_poblacion: TiposPoblacion[] = [];
  caracterizaciones: Caracterizacion[] = [];
  sectorizaciones: Sectorizacion[] = [];
  estados: Estado[] = [];
  clasificaciones: Clasificacion[] = [];

  constructor(
    private formbuilder: FormBuilder,
    private api: ApiService,
    private servicios: ClienteWAService,
    @Inject(MAT_DIALOG_DATA) public editData: Institucion,
    private dialogRef: MatDialogRef<ModalInstitucionesComponent>
  ) {
    this.isAdmin = !(localStorage.getItem('USER_ROLE') === 'ADMINISTRADOR');
    this.institucionForm = this.formbuilder.group({
      numero_beneficiarios: new FormControl(null, [Validators.required]),
      nombre_contacto: new FormControl(null, [Validators.required]),
      apellido_contacto: new FormControl(null, [Validators.required]),
      correo_contacto: new FormControl(null, [Validators.required]),
      telefono_contacto: new FormControl(null, [Validators.required]),
      nombre: new FormControl({ value: null, disabled: this.isAdmin }, [
        Validators.required,
      ]),
      representante_legal: new FormControl(
        { value: null, disabled: this.isAdmin },
        [Validators.required]
      ),
      ruc: new FormControl({ value: null, disabled: this.isAdmin }, [
        Validators.required,
      ]),
      caracterizaciones: new FormControl(
        { value: null, disabled: this.isAdmin },
        [Validators.required]
      ),
      sectorizaciones: new FormControl(
        { value: null, disabled: this.isAdmin },
        [Validators.required]
      ),
      actividades: new FormControl({ value: null, disabled: this.isAdmin }, [
        Validators.required,
      ]),
      tipo_poblacion: new FormControl({ value: null, disabled: this.isAdmin }, [
        Validators.required,
      ]),
      nombre_estado: new FormControl({ value: null, disabled: this.isAdmin }, [
        Validators.required,
      ]),
      mes_ingreso: new FormControl({ value: null, disabled: this.isAdmin }, [
        Validators.required,
      ]),
      anio_ingreso: new FormControl({ value: null, disabled: this.isAdmin }, [
        Validators.required,
      ]),
      direccion_nombre: new FormControl(
        { value: null, disabled: this.isAdmin },
        [Validators.required]
      ),
      url_direccion: new FormControl({ value: null, disabled: this.isAdmin }, [
        Validators.required,
      ]),
      latitud: new FormControl({ value: null, disabled: this.isAdmin }, [
        Validators.required,
      ]),
      longitud: new FormControl({ value: null, disabled: this.isAdmin }, [
        Validators.required,
      ]),
      nombre_clasificacion: new FormControl(
        { value: null, disabled: this.isAdmin },
        [Validators.required]
      ),
      condicion: new FormControl({ value: null, disabled: this.isAdmin }, [
        Validators.required,
      ]),
    });
  }

  ngOnInit(): void {
    // this.obtenerCaracterizaciones();
    // this.obtenerSectores();
    // this.obtenerActividades();

    this.obtainAllInformation();

    if (this.editData) {
      this.institucionForm.patchValue(this.editData);
      this.institucionForm.controls['actividades'].setValue(
        this.editData.actividades?.map((elem: Actividad) => elem.id)
      );
      this.institucionForm.controls['caracterizaciones'].setValue(
        this.editData.caracterizacion?.map((elem: Caracterizacion) => elem.id)
      );

      this.institucionForm.controls['sectorizaciones'].setValue(
        this.editData.sectorizacion?.map((elem: Sectorizacion) => elem.id)
      );
      this.institucionForm.controls['tipo_poblacion'].setValue(
        this.editData.tipos_poblacion?.at(0)?.tipo_poblacion
      );
      this.institucionForm.controls['nombre_estado'].setValue(
        this.editData.estado?.at(0)?.nombre_estado
      );
      this.institucionForm.controls['direccion_nombre'].setValue(
        this.editData.direccion?.at(0)?.direccion_nombre
      );
      this.institucionForm.controls['url_direccion'].setValue(
        this.editData.direccion?.at(0)?.url_direccion
      );
      this.institucionForm.controls['latitud'].setValue(
        this.editData.direccion?.at(0)?.latitud
      );
      this.institucionForm.controls['longitud'].setValue(
        this.editData.direccion?.at(0)?.longitud
      );
      this.institucionForm.controls['anio_ingreso'].setValue(
        this.editData.red_bda?.at(0)?.anio_ingreso
      );
      this.institucionForm.controls['mes_ingreso'].setValue(
        this.editData.red_bda?.at(0)?.mes_ingreso
      );
      this.institucionForm.controls['nombre_contacto'].setValue(
        this.editData.contactos?.at(0)?.nombre
      );
      this.institucionForm.controls['apellido_contacto'].setValue(
        this.editData.contactos?.at(0)?.apellido
      );
      this.institucionForm.controls['correo_contacto'].setValue(
        this.editData.contactos?.at(0)?.correos.at(0)?.correo_contacto
      );
      this.institucionForm.controls['telefono_contacto'].setValue(
        this.editData.contactos?.at(0)?.telefonos.at(0)?.telefono_contacto
      );
      this.institucionForm.controls['nombre_clasificacion'].setValue(
        this.editData.clasificacion?.at(0)?.nombre_clasificacion
      );
      this.institucionForm.controls['condicion'].setValue(
        this.editData.clasificacion?.at(0)?.condicion
      );
    }

    this.registerForm = new FormGroup({
      nombre_caracterizacion: new FormControl(null, [Validators.required]), //
      nombre_actividad: new FormControl(null, [Validators.required]),
      nombre_institucion: new FormControl(null, [Validators.required]), //
      nombre_sectorizacion: new FormControl(null, [Validators.required]), //
      representante_legal: new FormControl(null, [Validators.required]), //
      ruc: new FormControl(null, [Validators.required]), //
      numero_beneficiarios: new FormControl(null, [Validators.required]), //
      condicion: new FormControl(null, [Validators.required]),
      direccion_nombre: new FormControl(null, [Validators.required]), //
      url_direccion: new FormControl(null, [Validators.required]),
      latitud: new FormControl(null, [Validators.required]), //
      longitud: new FormControl(null, [Validators.required]), //
      tipo_poblacion: new FormControl(null, [Validators.required]), //
      nombre_clasificacion: new FormControl(null, [Validators.required]), //
      nombre_estado: new FormControl(null, [Validators.required]), //
      mes_ingreso: new FormControl(null, [Validators.required]), //
      anio_ingreso: new FormControl(null, [Validators.required]), //
      nombre_contacto: new FormControl(null, [Validators.required]), //
      apellido_contacto: new FormControl(null, [Validators.required]),
      correo_contacto: new FormControl(null, [Validators.required]), //
      telefono_contacto: new FormControl(null, [Validators.required]), //
    });
  }

  obtainAllInformation(): void {
    this.api.getAllInformation().subscribe(
      (res: any) => {
        this.actividades = res.actividades;
        this.tipos_poblacion = res.tipos_poblacion;
        this.caracterizaciones = res.caracterizaciones;
        this.sectorizaciones = res.sectorizaciones;
        this.estados = res.estados;
        this.clasificaciones = res.clasificaciones;
      },
      (error: any) => {
        alert('Ocurrio un error. Vuelve a intentar mas tarde.');
      }
    );
  }

  addInstitucion() {
    if (!this.editData) {
      if (this.registerForm.valid) {
        console.log(this.registerForm.value);
        // this.api.addInstitucion(this.institucionForm.value).subscribe({
        //   next: (res) => {
        //     alert('Institucion agregada exitosamente');
        //     this.institucionForm.reset();
        //     this.dialogRef.close('save');
        //   },
        //   error: () => {
        //     alert('Error al agregar producto');
        //   },
        // });
      }
    }
  }

  editInfoInstitucion() {
    if (this.institucionForm.valid) {
      this.api
        .updateInformationInstitucion(
          this.institucionForm.value,
          this.editData.id
        )
        .subscribe({
          next: (res: any) => {
            alert(
              'Informacion de la institucion actualizada sastifactoriamente'
            );
            this.institucionForm.reset();
            this.dialogRef.close('update');
          },
          error: (res: any) => {
            alert('Ocurrio un error');
          },
        });
    }
  }

  // getErrorMessage() {
  //   if (this.email.hasError('required')) {
  //     return 'You must enter a value';
  //   }

  //   return this.email.hasError('email') ? 'Not a valid email' : '';
  // }

  // obtenerCaracterizaciones() {
  //   this.servicios.obtenerCaracterizaciones().subscribe((res: any) => {
  //     this.lista_caracterizaciones = this.lista_caracterizaciones.concat(res);
  //   });
  // }

  // obtenerSectores() {
  //   this.servicios.obtenerSectores().subscribe((res: any) => {
  //     this.lista_sectores = this.lista_sectores.concat(res);
  //   });
  // }

  // obtenerActividades() {
  //   this.servicios.obtenerActividades().subscribe((res) => {
  //     this.lista_actividades = this.lista_actividades.concat(res);
  //   });
  // }

  registrarInstitucion(form: any) {
    console.log(form.value);
    this.servicios.ingresarInstitucion(form).subscribe((res: any) => {
      console.log(res);
    });
  }
}
