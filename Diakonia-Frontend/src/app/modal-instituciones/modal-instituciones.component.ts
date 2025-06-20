import { Component, OnInit, Inject } from '@angular/core';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  FormArray,
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
  Direccion,
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
  // lista_condicion = [
  //   'Salud',
  //   'Rehabilitacion Social',
  //   'Exclusion Social',
  //   'Inseguridad Alimentaria',
  //   'Situacion de calle',
  //   'Albergues',
  //   'Discapacidad',
  // ];
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

      nombre_clasificacion: new FormControl(
        { value: null, disabled: this.isAdmin },
        [Validators.required]
      ),
      // correo_contacto: new FormControl(null, [Validators.required]),
      // telefono_contacto: new FormControl(null, [Validators.required]),
      correos: this.formbuilder.array([this.correoForm()]),
      direcciones: this.formbuilder.array([this.direccionEditForm()]),
      telefonos: this.formbuilder.array([this.telefonoForm()]),
    });
  }

  correoForm() {
    return this.formbuilder.group({
      correo_contacto: new FormControl(
        { value: null, disabled: this.isAdmin },
        Validators.required
      ),
    });
  }

  telefonoForm() {
    return this.formbuilder.group({
      telefono_contacto: new FormControl(
        { value: null, disabled: this.isAdmin },
        Validators.required
      ),
    });
  }

  direccionForm() {
    return this.formbuilder.group({
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
    });
  }

  direccionEditForm() {
    return this.formbuilder.group({
      id: new FormControl({ value: null, disabled: this.isAdmin }),
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
    });
  }

  get institucionCorreos() {
    return this.institucionForm.get('correos') as FormArray;
  }

  get institucionTelefonos() {
    return this.institucionForm.get('telefonos') as FormArray;
  }

  get institucionDirecciones(): FormArray {
    return this.institucionForm.get('direcciones') as FormArray;
  }

  addCorreo(): void {
    this.institucionCorreos.push(this.correoForm());
  }

  addTelefono(): void {
    this.institucionTelefonos.push(this.telefonoForm());
  }

  addDireccion(): void {
    this.institucionDirecciones.push(this.direccionEditForm());
  }

  deleteCorreo(id: Required<number>) {
    this.institucionCorreos.removeAt(id);
  }

  deleteTelefono(id: Required<number>) {
    this.institucionTelefonos.removeAt(id);
  }

  deleteDireccion(id: Required<number>) {
    this.institucionDirecciones.removeAt(id);
  }

  ngOnInit(): void {
    // this.obtenerCaracterizaciones();
    // this.obtenerSectores();
    // this.obtenerActividades();

    this.obtainAllInformation();

    if (this.editData) {
      console.log(this.editData.direccion);
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
      // this.institucionForm.controls['direcciones'].patchValue(

      // );
      this.institucionDirecciones.clear();
      this.editData.direccion.forEach((elem: any) => {
        let formDireccion = this.direccionEditForm();
        Object.keys(formDireccion.controls).forEach((key) => {
          formDireccion.patchValue({
            [key]: elem[key],
          });
        });
        this.institucionDirecciones.controls.push(formDireccion);
      });

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

      this.institucionCorreos.clear();
      this.editData.contactos.at(0)?.correos.forEach((elem: any) => {
        let formCorreo = this.correoForm();
        Object.keys(formCorreo.controls).forEach((key) => {
          formCorreo.patchValue({
            [key]: elem[key],
          });
        });
        this.institucionCorreos.controls.push(formCorreo);
      });

      this.institucionTelefonos.clear();
      this.editData.contactos.at(0)?.telefonos.forEach((elem: any) => {
        let formTelefono = this.telefonoForm();
        Object.keys(formTelefono.controls).forEach((key) => {
          formTelefono.patchValue({
            [key]: elem[key],
          });
        });
        this.institucionTelefonos.controls.push(formTelefono);
      });

      this.institucionForm.controls['nombre_clasificacion'].setValue(
        this.editData.clasificacion?.map((elem: Clasificacion) => elem.id)
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
      // direccion_nombre: new FormControl(null, [Validators.required]), //
      // url_direccion: new FormControl(null, [Validators.required]),
      // latitud: new FormControl(null, [Validators.required]), //
      // longitud: new FormControl(null, [Validators.required]), //
      tipo_poblacion: new FormControl(null, [Validators.required]), //
      nombre_clasificacion: new FormControl(null, [Validators.required]), //
      nombre_estado: new FormControl(null, [Validators.required]), //
      mes_ingreso: new FormControl(null, [Validators.required]), //
      anio_ingreso: new FormControl(null, [Validators.required]), //
      nombre_contacto: new FormControl(null, [Validators.required]), //
      apellido_contacto: new FormControl(null, [Validators.required]),
      // correo_contacto: new FormControl(null, [Validators.required]), //
      // telefono_contacto: new FormControl(null, [Validators.required]), //
      direcciones: this.formbuilder.array([this.direccionForm()]),
      telefonos: this.formbuilder.array([this.telefonoForm()]),
      correos: this.formbuilder.array([this.correoForm()]),
    });
  }

  get registerCorreos() {
    return this.registerForm.get('correos') as FormArray;
  }

  get registerTelefonos() {
    return this.registerForm.get('telefonos') as FormArray;
  }

  get registerDirecciones() {
    return this.registerForm.get('direcciones') as FormArray;
  }

  addNewCorreo() {
    this.registerCorreos.push(this.correoForm());
  }

  addNewTelefono() {
    this.registerTelefonos.push(this.telefonoForm());
  }

  addNewDireccion() {
    this.registerDirecciones.push(this.direccionForm());
  }

  deleteRegisterCorreo(id: Required<number>) {
    this.registerCorreos.removeAt(id);
  }

  deleteRegisterTelefono(id: Required<number>) {
    this.registerTelefonos.removeAt(id);
  }

  deleteRegisterDireccion(id: Required<number>) {
    this.registerDirecciones.removeAt(id);
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
        alert('Ocurrió un error. Vuelve a intentar más tarde.');
      }
    );
  }

  addInstitucion() {
    if (this.registerForm.valid) {
      this.api.addInstitucion(this.registerForm.value).subscribe({
        next: (res) => {
          alert('Institución agregada exitosamente');
          this.institucionForm.reset();
          this.dialogRef.close('save');
        },
        error: () => {
          alert('Error al agregar institución');
        },
      });
    } else {
      alert('Rellena campo');
    }
  }

  editInfoInstitucion() {
    if (this.institucionForm.valid) {
      this.api
        .updateInformationInstitucion(
          this.institucionForm.getRawValue(),
          this.editData.id
        )
        .subscribe({
          next: (res: any) => {
            alert(
              'Información de la institución actualizada sastifactoriamente'
            );
            this.institucionForm.reset();
            this.dialogRef.close('update');
          },
          error: (res: any) => {
            alert('Ocurrió un error');
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
