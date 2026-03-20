import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from '../../sharedComponents/table/table';
import { Button } from '../../sharedComponents/button/button';
import { Form } from '../../sharedComponents/form/form';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BUTTONDATA, FORM } from '../../interfaces/common';
import { ApiService } from '../../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-teachers',
  imports: [Table, Button, Form, CommonModule, FormsModule],
  templateUrl: './teachers.html',
  styleUrl: './teachers.scss'
})
export class Teachers implements OnInit {
  @ViewChild(Form) teacherForm!: Form;
  constructor(private apiService: ApiService, private snackBar: MatSnackBar) {}

  private showMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }
  activeTab: string = 'all';
  selectedClass: string = 'Standard 01';
  selectedStatus: string = '';
  searchQuery: string = '';
  isFormVisible: boolean = false;

  teacherFormConfig: FORM = {
    title: 'Add New Teacher',
    sections: [
      {
        sectionTitle: 'Personal Details',
        fields: [
          { key: 'firstName', label: 'First Name', type: 'text', required: true, colSpan: 2 },
          { key: 'lastName', label: 'Last Name', type: 'text', required: true, colSpan: 2 },
          { key: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female', 'Other'], required: true, colSpan: 1 },
          { key: 'dob', label: 'Date of Birth', type: 'date', required: true, colSpan: 1 },
          { key: 'mobile', label: 'Mobile No.', type: 'tel', required: true, colSpan: 2 },
          { key: 'email', label: 'Email ID', type: 'email', required: true, colSpan: 2 },
          { key: 'photo', label: 'Teacher Photo', type: 'file', colSpan: 2 },
        ]
      },
      {
        sectionTitle: 'Professional Details',
        fields: [
          { key: 'subject', label: 'Subject', type: 'text', required: true, colSpan: 2 },
          { key: 'class', label: 'Assigned Class', type: 'select', options: ['Standard 01', 'Standard 02', 'Standard 03', 'Standard 04', 'Standard 05', 'Standard 06'], required: true, colSpan: 2 },
          { key: 'qualification', label: 'Qualification', type: 'text', colSpan: 2 },
          { key: 'experience', label: 'Experience (Years)', type: 'number', colSpan: 2 },
        ]
      },
      {
        sectionTitle: 'Documents Upload',
        fields: [
          { key: 'aadharCard', label: 'Aadhar Card (PDF)', type: 'file', colSpan: 2 },
          { key: 'tenthCert', label: '10th Certificate (PDF)', type: 'file', colSpan: 2 },
          { key: 'twelfthCert', label: '12th Certificate (PDF)', type: 'file', colSpan: 2 },
          { key: 'degreeCert', label: 'Degree Certificate (PDF)', type: 'file', colSpan: 2 },
        ]
      }
    ],
    submitButton: {
      value: 'Save Teacher',
      type: 'primary',
      icon: '<i class="fa-solid fa-save me-2"></i>'
    }
  };

  searchButton: BUTTONDATA = {
    value: 'Search',
    type: 'secondary',
    icon: '<i class="fa-solid fa-magnifying-glass me-2"></i>'
  };

  addTeacherButton: BUTTONDATA = {
    value: 'Add Teacher',
    type: 'primary',
    icon: '<i class="fa-solid fa-plus me-2"></i>'
  };

  statsTabs = [
    { key: 'all', label: 'Total Teachers', image: '/assets/teachers.png', iconClass: '' }
  ];

  teachers_classes: any[] = [];

  allTeachers = [
    { id: 1, name: 'John Doe', gender: 'Male', subject: 'Math', class: 'Standard 01', photo: '/assets/teachers.png', status: 'Present' },
    { id: 2, name: 'Jane Smith', gender: 'Female', subject: 'English', class: 'Standard 01', photo: '/assets/students.png', status: 'Present' },
    { id: 3, name: 'Robert Brown', gender: 'Male', subject: 'Science', class: 'Standard 02', photo: '/assets/teachers.png', status: 'Absent' },
    { id: 4, name: 'Emily Davis', gender: 'Female', subject: 'History', class: 'Standard 01', photo: '/assets/students.png', status: 'Present' },
    { id: 5, name: 'Michael Wilson', gender: 'Male', subject: 'Geography', class: 'Standard 03', photo: '/assets/teachers.png', status: 'Leave' },
  ];

  teachersDetails = {
    title: '',
    column: [
      { name: 'ID', key: 'id' },
      { name: 'Name', key: 'name' },
      { name: 'Gender', key: 'gender' },
      { name: 'Subject', key: 'subject' },
      { name: 'Class', key: 'class' },
      { name: 'Status', key: 'status' }
    ],
    action: [
      { name: 'view' },
      { name: 'edit' }
    ],
    path: '',
    dataSource: this.allTeachers,
    pagination: true
  };

  ngOnInit() {
    this.fetchDynamicClasses();
    this.applyFilters();
  }

  fetchDynamicClasses() {
    this.apiService.getClasses().subscribe({
      next: (res) => {
        if (res && res.data) {
          this.teachers_classes = res.data;
          
          // Update the form config with real class options
          const classOptions = res.data.map((c: any) => c.class_name);
          const profSection = this.teacherFormConfig.sections.find(s => s.sectionTitle === 'Professional Details');
          if (profSection) {
            const classField = profSection.fields.find(f => f.key === 'class');
            if (classField) {
              classField.options = classOptions;
            }
          }
        }
      }
    });
  }

  get totalTeachers(): number {
    return this.allTeachers.length;
  }

  public getTabCount(key: string): number {
    return this.totalTeachers;
  }

  public onFilterChange() {
    this.applyFilters();
  }

  public onSearch() {
    this.applyFilters();
  }

  public onAddTeacher() {
    this.isFormVisible = !this.isFormVisible;
  }

  public onFormSubmit(data: any) {
    console.log('Teacher Form Data:', data);

    const payload = {
      role: 'teacher',
      name: `${data.firstName || ''} ${data.lastName || ''}`.trim(),
      gender: data.gender ? data.gender.toLowerCase() : 'male',
      date_of_birth: data.dob,
      email: data.email,
      joining_date: new Date().toISOString(),
      qualification: [
        {
          institue_name: data.qualification || 'N/A',
          degree: 'N/A',
          year: new Date().getFullYear(),
          board: 'N/A'
        }
      ]
    };

    if (!payload.name || !payload.date_of_birth || !payload.email) {
      this.showMessage('Please fill all required fields properly');
      return;
    }

    this.apiService.register(payload).subscribe({
      next: (res) => {
        console.log('Registration success:', res);
        this.showMessage('Teacher added successfully!');
        if(this.teacherForm) this.teacherForm.resetForm();
        this.isFormVisible = false;
        // Optionally fetch teachers again or add to list
      },
      error: (err) => {
        console.error('Registration failed:', err);
        this.showMessage(err.error?.message || 'Failed to add teacher');
      }
    });

  }

  private applyFilters() {
    let filtered = [...this.allTeachers];

    // Filter by class
    if (this.selectedClass) {
      filtered = filtered.filter(t => t.class === this.selectedClass);
    }

    // Filter by search query (name or ID)
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.trim().toLowerCase();
      filtered = filtered.filter(t =>
        t.name.toLowerCase().includes(query) || t.id.toString().includes(query)
      );
    }

    this.teachersDetails = {
      ...this.teachersDetails,
      dataSource: filtered
    };
  }

  public getCardColor(index: number) {
    const cardColor = [
      '#3e3eb5f2',
      '#cf4242',
      '#e1b44b',
      '#075A6D',
      '#F17404',
      '#695845',
      '#DE76D2'
    ];
    return cardColor[index % cardColor.length];
  }
}
