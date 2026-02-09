import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Button } from '../button/button';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule, Button],
  templateUrl: './form.html',
  styleUrl: './form.scss'
})
export class Form {
  buttonData = {
    value: 'Submit',
    type: 'primary'
  };
  admissionForm!: FormGroup;
  years = ['2024-2025', '2025-2026'];
  sections = ['A', 'B', 'C'];
  groups = ['Science', 'Commerce', 'Arts'];
  genders = ['Male', 'Female', 'Other'];
  classes = ['Nursery', 'KG', '1', '2', '3', '4', '5'];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.admissionForm = this.fb.group({
      // guardian info
      motherName: [''],
      fatherName: [''],
      email: [''],
      phone: [''],

      // Student Info
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      admitClass: ['', Validators.required],
      admitSection: ['', Validators.required],

      photo: [null],
      birthCertificate: [null],
    });
  }




  public onSubmit(data: any) {
    console.log(this.admissionForm.value);
  }
  onFileChange(event: any, controlName: string) {
    const file = event.target.files[0];
    if (file) {
      this.admissionForm.patchValue({
        [controlName]: file,
      });
    }
  }

}
