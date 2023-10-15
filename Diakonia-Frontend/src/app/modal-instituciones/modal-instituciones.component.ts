import { Component } from '@angular/core';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgIf, NgFor} from '@angular/common';

@Component({
  selector: 'app-modal-instituciones',
  templateUrl: './modal-instituciones.component.html',
  styleUrls: ['./modal-instituciones.component.css']
})
export class ModalInstitucionesComponent {

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
