import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Table } from '../../sharedComponents/table/table';
import { Button } from '../../sharedComponents/button/button';
import { Form } from '../../sharedComponents/form/form';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FORM } from '../../interfaces/common';
import { PageEvent } from '@angular/material/paginator';
import { ApiService } from '../../services/api.service';
import { CommonService } from '../../services/common.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [Table, Button, Form, CommonModule, FormsModule],
  templateUrl: './students.html',
  styleUrl: './students.scss'
})
export class Students implements OnInit {
  @ViewChild(Form) studentForm!: Form;
  public isFormVisible: boolean = false;
  activeTab: string = 'all';
  selectedClass: string = '';
  selectedStatus: string = '';
  searchQuery: string = '';
  currentPage: number = 1;
  pageSize: number = 10;
  totalStudentsCount: number = 0;

  statsTabs = [
    { key: 'all', label: 'Total Students', image: '/assets/students.png' },
    { key: 'boys', label: 'Total Boys', image: '/assets/teachers.png' },
    { key: 'girls', label: 'Total Girls', image: '/assets/students.png' }
  ];

  students_classes: any[] = [];
  allStudents: any[] = [];

  studentsDetails = {
    title: '',
    column: [
      { name: 'Roll No', key: 'roll_number' },
      { name: 'Name', key: 'name' },
      { name: 'Gender', key: 'gender_display' },
      { name: 'Class', key: 'class_name' },
      { name: 'Status', key: 'status' }
    ],
    action: [
      { name: 'view' },
      { name: 'edit' }
    ],
    path: '',
    dataSource: [],
    pagination: true
  };
  totalBoysCount: number = 0;
  totalGirlsCount: number = 0;

  studentFormConfig: FORM = {
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
          { key: 'type', label: 'Document Tpye', type: 'select', options: ['Adhar Card', 'Birth Certificate', 'Migration/Report Card'] },
          { key: 'file', label: 'Upload File', type: 'file' },
        ]
      }
    ],
    submitButton: {
      value: 'Save Changes',
      type: 'primary'
    }
  };

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef,
    private notify: NotificationService,
    public service: CommonService,
  ) { }

  ngOnInit() {
    this.fetchClasses();
  }

  fetchClasses() {
    this.apiService.getClasses().subscribe({
      next: (res: any) => {
        this.students_classes = res.data;
        const classOptions = res.data.map((c: any) => ({ label: c.class_name, value: c._id }));
        const studentSection = this.studentFormConfig.sections.find(s => s.sectionTitle === 'Student Information');
        if (studentSection) {
          const classField = studentSection.fields.find(f => f.key === 'class_id');
          if (classField) {
            classField.options = classOptions;
          }
        }
        if (this.students_classes && this.students_classes.length > 0) {
          this.selectedClass = this.students_classes[0]._id;
          this.fetchStudents();
        }
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error fetching classes:', err)
    });
  }

  public getTabCount(key: string): number {
    if (key === 'boys') return this.totalBoysCount;
    if (key === 'girls') return this.totalGirlsCount;
    return this.allStudents.length;
  }

  public onPaginationChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.fetchStudents();
  }

  public onFilterChange() {
    this.currentPage = 1; // Reset to first page
    this.fetchStudents();
  }

  public onSearch() {
    this.currentPage = 1; // Reset to first page
    this.fetchStudents();
  }

  private fetchStudents() {
    const params: any = {
      className: this.selectedClass,
      status: this.selectedStatus,
      search: this.searchQuery.trim(),
      pagination: true,
      page: this.currentPage,
      limit: this.pageSize
    };

    if (this.activeTab === 'boys') {
      params.gender = 'male';
    } else if (this.activeTab === 'girls') {
      params.gender = 'female';
    }

    this.apiService.getStudents(params).subscribe({
      next: (res: any) => {
        const students = res.data.list.map((s: any) => {
          const matchedClass = this.students_classes.find(c => c._id === s.class_id);
          return {
            ...s,
            gender_display: s.gender ? s.gender.charAt(0).toUpperCase() + s.gender.slice(1) : 'Other',
            status: s.attendance_status || 'Present',
            class_name: matchedClass ? matchedClass.class_name : 'N/A'
          };
        });

        this.totalStudentsCount = res.data.total;
        if (res.data.stats) {
          this.totalBoysCount = res.data.stats.boys;
          this.totalGirlsCount = res.data.stats.girls;
          this.totalStudentsCount = res.data.stats.total;
        }

        this.allStudents = students;
        this.studentsDetails = { ...this.studentsDetails, dataSource: students };
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.notify.error(err.error.message);
      }
    });
  }

  public onViewDetails(row: any) {
    this.isFormVisible = true;
    setTimeout(() => {
      const names = row.name ? row.name.split(' ') : ['', ''];
      const patchData = {
        ...row,
        first_name: row.first_name || names[0],
        last_name: row.last_name || names.slice(1).join(' '),
        dob: row.date_of_birth ? new Date(row.date_of_birth).toISOString().split('T')[0] : '',
      };
      if (this.studentForm) {
        this.studentForm.setFormValue(patchData);
      }
    }, 100);
  }

  public onBack() {
    this.isFormVisible = false;
  }

}
