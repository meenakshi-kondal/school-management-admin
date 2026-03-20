import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Button } from '../button/button';
import { CommonModule } from '@angular/common';
import { FORM } from '../../interfaces/common';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule, Button, CommonModule],
  standalone: true,
  templateUrl: './form.html',
  styleUrl: './form.scss'
})
export class Form implements OnInit {
  @Input() formConfig: FORM = {
    sections: []
  };

  @Output() formSubmit = new EventEmitter<any>();

  dynamicForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    const group: any = {};

    this.formConfig.sections.forEach(section => {
      section.fields.forEach(field => {
        const validators = [];
        if (field.required) {
          validators.push(Validators.required);
        }
        group[field.key] = [field.value || '', validators];
      });
    });

    this.dynamicForm = this.fb.group(group);
  }

  public onSubmit() {
    if (this.dynamicForm.valid) {
      this.formSubmit.emit(this.dynamicForm.value);
    } else {
      this.dynamicForm.markAllAsTouched();
    }
  }

  public resetForm() {
    this.dynamicForm.reset();
  }

  onFileChange(event: any, controlName: string) {
    const file = event.target.files[0];
    if (file) {
      this.dynamicForm.patchValue({
        [controlName]: file,
      });
    }
  }
}
