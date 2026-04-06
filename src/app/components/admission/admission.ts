import { Component, ViewChild, OnInit, ChangeDetectorRef } from '@angular/core';
import { Form } from '../../sharedComponents/form/form';
import { FORM } from '../../interfaces/common';
import { ApiService } from '../../services/api.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-admission',
  standalone: true,
  imports: [Form],
  templateUrl: './admission.html',
  styleUrl: './admission.scss'
})
export class Admission implements OnInit {
  @ViewChild(Form) admissionForm!: Form;

  admissionFormConfig: FORM = {
    sections: [
      {
        sectionTitle: 'Student Information',
        fields: [
          { key: 'first_name', label: 'First Name', type: 'text', required: true },
          { key: 'last_name', label: 'Last Name', type: 'text' },
          { key: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female', 'Other'], required: true },
          { key: 'dob', label: 'Date of Birth', type: 'date', required: true },
          { key: 'class_id', label: 'Admission Class', type: 'select', options: [], required: true },
          { key: 'blood_group', label: 'Blood Group', type: 'select', options: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] },
          { key: 'photo', label: 'Student Photo', type: 'file' },
        ]
      },
      {
        sectionTitle: 'Guardian Information',
        sectionKey: 'guardians',
        addButton: true,
        fields: [
          { key: 'relation', label: 'Relation', type: 'select', options: ['Father', 'Mother', 'Guardian', 'Other'], required: true },
          { key: 'name', label: 'Name', type: 'text', required: true },
          { key: 'email', label: 'Email ID', type: 'email' },
          { key: 'phone', label: 'Phone Number', type: 'tel', required: true },
          { key: 'occupation', label: 'Occupation', type: 'text' },
          { key: 'aadhaar_card', label: 'Aadhar Card', type: 'file' }
        ]
      },
      {
        sectionTitle: 'Documents Upload',
        sectionKey: 'documents',
        addButton: true,
        fields: [
          { key: 'type', label: 'Document Tpye', type: 'select', options: ['Adhar Card', 'Birth Certificate', 'Migration/Report Card']},
          { key: 'file', label: 'Upload File', type: 'file' },
        ]
      }
    ],
    submitButton: {
      value: 'Submit Application',
      type: 'primary',
      icon: '<i class="fa-solid fa-paper-plane me-2"></i>'
    }
  };

  constructor(
    private apiService: ApiService,
    private notify: NotificationService,
    private cdr: ChangeDetectorRef) { }

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
            const classField = studentSection.fields.find(f => f.key === 'class_id');
            if (classField) {
              classField.options = classOptions;
              this.admissionFormConfig = { ...this.admissionFormConfig };
              this.cdr.detectChanges();
            }
          }
        }
      },
      error: (err) => {
        this.notify.error(err.error.message);
      }
    });
  }

  onFormSubmit(data: any) {
    console.log(data)
    const payload = {
      role: 'student',
      name: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
      gender: data.gender ? data.gender.toLowerCase() : 'male',
      date_of_birth: data.dob,
      blood_group: data.blood_group,
      photo: data.photo,
      class_id: data.admitClass,
      guardians: data.guardians || [],
      documents: data.documents || []
    };

    if (!payload.name || payload.guardians.length === 0 || payload.documents.length === 0) {
      this.notify.info('Please fill all required fields properly');
      return;
    }

    this.apiService.admission(payload).subscribe({
      next: (res) => {
        this.notify.success(res.message);
        if (this.admissionForm) this.admissionForm.resetForm();
      },
      error: (err) => {
        this.notify.error(err.error.message);
      }
    });
  }
}
