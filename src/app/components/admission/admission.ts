import { Component, ViewChild, OnInit } from '@angular/core';
import { Form } from '../../sharedComponents/form/form';
import { FORM } from '../../interfaces/common';
import { ApiService } from '../../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admission',
  standalone: true,
  imports: [Form],
  templateUrl: './admission.html',
  styleUrl: './admission.scss'
})
export class Admission implements OnInit {
  @ViewChild(Form) admissionForm!: Form;

  constructor(private apiService: ApiService, private snackBar: MatSnackBar) {}

  private showMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

  ngOnInit() {
    this.fetchClasses();
  }

  fetchClasses() {
    this.apiService.getClasses().subscribe({
      next: (res) => {
        if (res && res.data) {
          const classOptions = res.data.map((c: any) => ({ label: c.class_name, value: c._id }));
          const studentSection = this.admissionFormConfig.sections.find(s => s.sectionTitle === 'Student Information');
          if (studentSection) {
            const classField = studentSection.fields.find(f => f.key === 'admitClass');
            if (classField) {
              classField.options = classOptions;
            }
          }
        }
      }
    });
  }

  admissionFormConfig: FORM = {
    sections: [
      {
        sectionTitle: 'Student Information',
        fields: [
          { key: 'firstName', label: 'First Name', type: 'text', required: true, colSpan: 1 },
          { key: 'lastName', label: 'Last Name', type: 'text', required: true, colSpan: 1 },
          { key: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female', 'Other'], required: true, colSpan: 1 },
          { key: 'dob', label: 'Date of Birth', type: 'date', required: true, colSpan: 1 },
          { key: 'admitClass', label: 'Admission Class', type: 'select', options: ['Nursery', 'KG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'], required: true, colSpan: 2 },
          { key: 'photo', label: 'Student Photo', type: 'file', colSpan: 2 },
          { key: 'birthCert', label: 'Birth Certificate', type: 'file', colSpan: 2 },
        ]
      },
      {
        sectionTitle: 'Guardian Information',
        fields: [
          { key: 'fatherName', label: 'Father Name', type: 'text', required: true, colSpan: 2 },
          { key: 'motherName', label: 'Mother Name', type: 'text', required: true, colSpan: 2 },
          { key: 'email', label: 'Email ID', type: 'email', required: true, colSpan: 2 },
          { key: 'phone', label: 'Phone Number', type: 'tel', required: true, colSpan: 2 },
          { key: 'address', label: 'Home Address', type: 'text', colSpan: 4 },
        ]
      },
      {
        sectionTitle: 'Documents Upload',
        fields: [
          { key: 'studentAadhar', label: 'Student Aadhar Card', type: 'file', colSpan: 2 },
          { key: 'parentAadhar', label: 'Parent Aadhar Card', type: 'file', colSpan: 2 },
          { key: 'reportCard', label: 'Prev. Class Report Card / Migration', type: 'file', colSpan: 2 },
        ]
      }
    ],
    submitButton: {
      value: 'Submit Application',
      type: 'primary',
      icon: '<i class="fa-solid fa-paper-plane me-2"></i>'
    }
  };

  onFormSubmit(data: any) {
    console.log('Admission Form Data:', data);

    const payload = {
      role: 'student',
      name: `${data.firstName || ''} ${data.lastName || ''}`.trim(),
      gender: data.gender ? data.gender.toLowerCase() : 'male',
      date_of_birth: data.dob,
      email: data.email,
      joining_date: new Date().toISOString(),
      class_id: data.admitClass,
      parent_info: {
        father_name: data.fatherName,
        mother_name: data.motherName,
        phone: data.phone,
        address: data.address
      },
      documents: {
        photo: '/assets/students.png',
        birth_certificate: '',
        aadhar_card: '',
        parent_aadhar: '',
        report_card: ''
      },
      is_bus_service: false
    };

    if (!payload.name || !payload.date_of_birth || !payload.email || !data.admitClass) {
      this.showMessage('Please fill all required fields properly');
      return;
    }

    this.apiService.register(payload).subscribe({
      next: (res) => {
        console.log('Registration success:', res);
        this.showMessage('Student admitted successfully!');
        if(this.admissionForm) this.admissionForm.resetForm();
      },
      error: (err) => {
        console.error('Registration failed:', err);
        this.showMessage(err.error?.message || 'Failed to admit student');
      }
    });
  }
}
