import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { INPUTDETAILS } from '../../interfaces/common';

@Component({
  selector: 'app-input-field',
  imports: [FormsModule,MatFormFieldModule, MatInputModule],
  templateUrl: './input-field.html',
  styleUrl: './input-field.scss'
})
export class InputField {

  @Input() inputDetails: INPUTDETAILS = {
    label: 'Username',
    type: 'text',
    maxLength: 10,
    required: false,
    value:''
  };

}
