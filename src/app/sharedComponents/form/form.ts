import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule, FormArray } from '@angular/forms';
import { Button } from '../button/button';
import { CommonModule } from '@angular/common';
import { FORM, FORMFIELD } from '../../interfaces/common';

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
    this.initForm();
  }

  private initForm(): void {
    const group: any = {};

    this.formConfig.sections.forEach(section => {
      if (section.addButton) {
        const key = section.sectionKey || this.getSectionKey(section);
        group[key] = this.fb.array([this.createSectionGroup(section)]);
      } else {
        section.fields.forEach(field => {
          const validators = [];
          if (field.required) {
            validators.push(Validators.required);
          }
          if (field.type === 'email') {
            validators.push(Validators.email);
          }
          group[field.key] = [field.value || '', validators];
        });
      }
    });

    this.dynamicForm = this.fb.group(group);
  }

  private createSectionGroup(section: any): FormGroup {
    const group: any = {};
    section.fields.forEach((field: FORMFIELD) => {
      const validators = [];
      if (field.required) {
        validators.push(Validators.required);
      }
      if (field.type === 'email') {
        validators.push(Validators.email);
      }
      group[field.key] = [field.value || '', validators];
    });
    return this.fb.group(group);
  }

  public getSectionKey(section: any): string {
    return section.sectionTitle?.toLowerCase().replace(/\s+/g, '_') || 'section';
  }

  public getSectionArray(section: any): FormArray {
    const key = section.sectionKey || this.getSectionKey(section);
    return this.dynamicForm.get(key) as FormArray;
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
    this.formConfig.sections.forEach(section => {
      if (section.addButton) {
        const array = this.getSectionArray(section);
        while (array.length > 1) {
          array.removeAt(1);
        }
        array.reset();
      }
    });
  }

  public setFormValue(value: any) {
    if (this.dynamicForm) {
      this.formConfig.sections.forEach(section => {
        if (section.addButton) {
          const key = section.sectionKey || this.getSectionKey(section);
          const array = this.getSectionArray(section);
          const dataArray = value[key] || [];
          
          while (array.length < dataArray.length) {
            array.push(this.createSectionGroup(section));
          }
          while (array.length > dataArray.length && array.length > 1) {
            array.removeAt(array.length - 1);
          }
        }
      });
      this.dynamicForm.patchValue(value);
    }
  }

  public patchValue(value: any) {
    if (this.dynamicForm) {
      this.dynamicForm.patchValue(value);
    }
  }

  onFileChange(event: any, controlName: string, section?: any, index?: number) {
    const file = event.target.files[0];
    if (file) {
      if (section && index !== undefined) {
        const array = this.getSectionArray(section);
        array.at(index).get(controlName)?.setValue(file);
      } else {
        this.dynamicForm.get(controlName)?.setValue(file);
      }
    }
  }



  addSection(section: any) {
    const array = this.getSectionArray(section);
    array.push(this.createSectionGroup(section));
  }
  removeSection(section: any, index: number) {
    const array = this.getSectionArray(section);
    if (array.length > 1) {
      array.removeAt(index);
    }
  }
}
