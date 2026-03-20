import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Table } from '../../sharedComponents/table/table';
import { Button } from '../../sharedComponents/button/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BUTTONDATA } from '../../interfaces/common';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogBox } from '../../sharedComponents/dialog-box/dialog-box';

import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [Table, Button, CommonModule, FormsModule, DialogBox, MatDialogModule],
  templateUrl: './students.html',
  styleUrl: './students.scss'
})
export class Students implements OnInit {
  activeTab: string = 'all';
  selectedClass: string = '';
  selectedStatus: string = '';
  searchQuery: string = '';
  currentPage: number = 1;
  pageSize: number = 10;
  totalStudentsCount: number = 0;

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog
  ) { }

  searchButton: BUTTONDATA = {
    value: 'Search',
    type: 'secondary',
    icon: '<i class="fa-solid fa-magnifying-glass me-2"></i>'
  };

  addStudentButton: BUTTONDATA = {
    value: 'Add Student',
    type: 'primary',
    icon: '<i class="fa-solid fa-plus me-2"></i>'
  };

  statsTabs = [
    { key: 'all', label: 'Total Students', image: '/assets/students.png', iconClass: '' },
    { key: 'boys', label: 'Total Boys', image: '/assets/teachers.png', iconClass: 'boys' },
    { key: 'girls', label: 'Total Girls', image: '/assets/students.png', iconClass: 'girls' }
  ];

  students_classes: any[] = [];
  allStudents: any[] = [];

  studentsDetails = {
    title: '',
    column: [
      { name: 'Roll No', key: 'roll_number' },
      { name: 'Name', key: 'name' },
      { name: 'Gender', key: 'gender' },
      { name: 'Status', key: 'status' }
    ],
    action: [
      { name: 'view' },
      { name: 'edit' }
    ],
    path: '',
    dataSource: this.allStudents,
    pagination: true
  };
  totalBoysCount: number = 0;
  totalGirlsCount: number = 0;
  ngOnInit() {
    this.fetchClasses();
  }

  fetchClasses() {
    this.apiService.getClasses().subscribe({
      next: (res: any) => {
        this.students_classes = res.data;
        if (this.students_classes && this.students_classes.length > 0) {
          this.selectedClass = this.students_classes[0]._id;
          this.applyFilters();
        }
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error fetching classes:', err)
    });
  }

  get totalStudents(): number {
    return this.totalStudentsCount;
  }

  get totalBoys(): number {
    return this.totalBoysCount;
  }

  get totalGirls(): number {
    return this.totalGirlsCount;
  }

  public getTabCount(key: string): number {
    if (key === 'boys') return this.totalBoys;
    if (key === 'girls') return this.totalGirls;
    return this.totalStudents;
  }

  public onTabClick(tab: string) {
    this.activeTab = tab;
    this.applyFilters();
  }

  public onPaginationChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1; // 0-indexed to 1-indexed
    this.pageSize = event.pageSize;
    this.applyFilters();
  }

  public onFilterChange() {
    this.currentPage = 1; // Reset to first page
    this.applyFilters();
  }

  public onSearch() {
    this.currentPage = 1; // Reset to first page
    this.applyFilters();
  }

  public onAddStudent() {
    console.log('Add Student clicked');
  }

  public onViewStudent(row: any) {
    if (!row?._id) return;
    
    this.apiService.getStudentDetails(row._id).subscribe({
      next: (res: any) => {
        const studentData = res.data;
        this.dialog.open(DialogBox, {
          width: '700px',
          data: studentData,
          panelClass: 'custom-dialog-container'
        });
      },
      error: (err) => console.error('Error fetching student details:', err)
    });
  }

  private applyFilters() {
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
        console.log('Raw API Response List:', res.data.list);
        const students = res.data.list.map((s: any) => {
          const classId = s.class_id;
          const matchedClass = this.students_classes.find(c => c._id === classId);
          
          return {
            roll_number: s.roll_number,
            _id: s._id,
            name: s.name,
            gender: s.gender ? s.gender.charAt(0).toUpperCase() + s.gender.slice(1) : 'Other',
            status: s.attendance_status || 'Present',
            photo: s.photo || '/assets/students.png',
            class: matchedClass ? matchedClass.class_name : (classId || 'N/A')
          };
        });

        this.totalStudentsCount = res.data.total;
        if (res.data.stats) {
          this.totalBoysCount = res.data.stats.boys;
          this.totalGirlsCount = res.data.stats.girls;
          this.totalStudentsCount = res.data.stats.total;
        }

        this.allStudents = students;

        this.studentsDetails = {
          ...this.studentsDetails,
          dataSource: students
        };
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error fetching students:', err)
    });
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
