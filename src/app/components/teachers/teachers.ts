import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Table } from '../../sharedComponents/table/table';
import { Button } from '../../sharedComponents/button/button';
import { Form } from '../../sharedComponents/form/form';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BUTTONDATA, FORM } from '../../interfaces/common';
import { ApiService } from '../../services/api.service';
import { CommonService } from '../../services/common.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-teachers',
  imports: [Table, Button, Form, CommonModule, FormsModule],
  templateUrl: './teachers.html',
  styleUrl: './teachers.scss'
})
export class Teachers implements OnInit {
  @ViewChild(Form) teacherForm!: Form;

  constructor(
    private apiService: ApiService,
    private notify: NotificationService,
    public service: CommonService,
    private cdr: ChangeDetectorRef,
  ) { }

  activeTab: string = 'all';
  selectedStatus: string = '';
  searchQuery: string = '';
  isFormVisible: boolean = false;
  currentPage: number = 1;
  pageSize: number = 10;
  totalTeachersCount: number = 0;

  teacherFormConfig: FORM = {
    sections: [
      {
        sectionTitle: 'Personal Details',
        fields: [
          { key: 'first_name', label: 'First Name', type: 'text', required: true },
          { key: 'last_name', label: 'Last Name', type: 'text', required: true },
          { key: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female', 'Other'], required: true },
          { key: 'dob', label: 'Date of Birth', type: 'date', required: true },
          { key: 'mobile', label: 'Mobile No.', type: 'tel', required: true },
          { key: 'email', label: 'Email ID', type: 'email', required: true },
          { key: 'blood_group', label: 'Blood Group', type: 'select', options: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] },
          { key: 'photo', label: 'Photo', type: 'file' },
        ]
      },
      {
        sectionTitle: 'Professional Details',
        fields: [
          { key: 'highest_qualification', label: 'Highest Qualification', type: 'text' },
          { key: 'experience', label: 'Experience (Years)', type: 'number' },
          { key: 'class', label: 'Class', type: 'select', options: [] },
          { key: 'subject', label: 'Subject', type: 'text' },
          { key: 'joining_date', label: 'Joining Date', type: 'date', required: true },

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
          { key: 'type', label: 'Document Tpye', type: 'select', options: ['Adhar Card', 'Highest Qualification', 'Experience Certificate'] },
          { key: 'file', label: 'Upload File', type: 'file' },
        ]
      }
    ],
    submitButton: {
      value: 'Save Teacher',
      type: 'primary',
      icon: '<i class="fa-solid fa-save me-2"></i>'
    }
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

  teachersDetails = {
    title: '',
    column: [
      { name: 'Name', key: 'name' },
      { name: 'Email', key: 'email' },
      { name: 'Phone', key: 'phone' },
      { name: 'Gender', key: 'gender_display' },
      { name: 'Joining Date', key: 'joining_date_display' },
      { name: 'Status', key: 'status', type: 'toggle' }
    ],
    action: [
      { name: 'view' }
    ],
    path: '',
    dataSource: [],
    pagination: true
  };

  ngOnInit() {
    this.fetchTeachers();
    this.fetchClassesList();
  }

  fetchTeachers() {

    const params: any = {
      search: this.searchQuery.trim(),
      pagination: true,
      page: this.currentPage,
      limit: this.pageSize
    };

    this.apiService.getTeachers(params).subscribe({
      next: (res: any) => {
        const teachers = res.data.list.map((t: any) => ({
          ...t,
          gender_display: t.gender ? t.gender.charAt(0).toUpperCase() + t.gender.slice(1) : 'Other',
          joining_date_display: t.joining_date ? new Date(t.joining_date).toLocaleDateString() : 'N/A',
        }));

        this.totalTeachersCount = res.data.total;
        this.teachersDetails = {
          ...this.teachersDetails,
          dataSource: teachers
        };
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.notify.error(err.error.message);
      }
    });
  }

  fetchClassesList() {
    this.apiService.getClasses().subscribe({
      next: (res: any) => {
        if (res && res.data) {
          const classes = res.data.map((c: any) => ({ label: c.class_name, value: c._id }));
          const section = this.teacherFormConfig.sections.find(s => s.sectionTitle === 'Professional Details');
          if (section) {
            const classField = section.fields.find(f => f.key === 'class');
            if (classField) {
              classField.options = classes;
              this.teacherFormConfig = { ...this.teacherFormConfig };
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

  get totalTeachers(): number {
    return this.totalTeachersCount;
  }

  public getTabCount(key: string): number {
    return this.totalTeachers;
  }

  public onFilterChange() {
    this.currentPage = 1;
    this.fetchTeachers();
  }

  public onSearch() {
    this.currentPage = 1;
    this.fetchTeachers();
  }

  public onPaginationChange(event: any) {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.fetchTeachers();
  }

  public onAddTeacher() {
    this.isFormVisible = !this.isFormVisible;
    if (this.isFormVisible && this.teacherForm) {
      this.teacherForm.resetForm();
    }
  }

  public onFormSubmit(data: any) {

    const payload = {
      role: 'teacher',
      name: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
      gender: data.gender ? data.gender.toLowerCase() : 'male',
      date_of_birth: data.dob,
      email: data.email,
      phone: data.phone,
      blood_group: data.blood_group,
      photo: '',
      joining_date: new Date().toISOString(),
      highest_qualification: data.highest_qualification,
      experience: data.experience || 0,
      class: data.class,
      subject: data.subject,
      guardians: data.guardians || [],
      documents: data.documents || []
    };

    this.apiService.admission(payload).subscribe({
      next: (res) => {
        this.notify.success(res.message);
        if (this.teacherForm) this.teacherForm.resetForm();
        this.isFormVisible = false;
        this.fetchTeachers();
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
        joining_date: row.joining_date ? new Date(row.joining_date).toISOString().split('T')[0] : '',
      };
      if (this.teacherForm) {
        this.teacherForm.setFormValue(patchData);
      }
    }, 100);
  }

  public onStatusToggle(event: any) {
    const { row, value } = event;
    const newStatus = value ? 'enable' : 'disable';

    // this.apiService.updateTeacher(row._id, { status: newStatus }).subscribe({
    //   next: (res: any) => {
    //     this.notify.success(res.message || 'Status updated successfully');
    //     this.fetchTeachers();
    //   },
    //   error: (err) => {
    //     this.notify.error(err.error?.message || 'Error updating status');
    //     this.fetchTeachers();
    //   }
    // });
  }

}
