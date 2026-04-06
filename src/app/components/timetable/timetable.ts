import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { NotificationService } from '../../services/notification.service';
import { Button } from '../../sharedComponents/button/button';

@Component({
    selector: 'app-timetable',
    standalone: true,
    imports: [CommonModule, FormsModule, Button],
    templateUrl: './timetable.html',
    styleUrl: './timetable.scss'
})
export class Timetable implements OnInit {
    classes: any[] = [];
    teachers: any[] = [];
    subjects: string[] = [];
    selectedClass: string = '';
    selectedClassName: string = '';
    
    days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    timetableData: any = {
        "Monday": [],
        "Tuesday": [],
        "Wednesday": [],
        "Thursday": [],
        "Friday": [],
        "Saturday": []
    }; 
    
    uniqueTimeSlots: string[] = [];
    
    isModalOpen = false;
    isTabularView = false;
    modalData: any = {
        _id: null,
        day: '',
        subject: '',
        teacherId: '',
        startTime: '08:00',
        endTime: '09:00'
    };

    printBtn = { value: 'Print', type: 'secondary', icon: '<i class="fa-solid fa-print me-2"></i>' };
    cancelBtn = { value: 'Cancel', type: 'secondary' };

    get tabularBtnData() {
        return {
            value: this.isTabularView ? 'Standard View' : 'Tabular View',
            type: this.isTabularView ? 'primary' : 'secondary',
            icon: this.isTabularView ? '<i class="fa-solid fa-calendar-day me-2"></i>' : '<i class="fa-solid fa-table me-2"></i>'
        };
    }
    
    get saveBtnData() {
        return { 
            value: this.modalData._id ? 'Update Period' : 'Save Period', 
            type: 'primary' 
        };
    }

    constructor(
        private apiService: ApiService,
        private notify: NotificationService,
        private cdr: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this.loadClasses();
        this.loadTeachers();
    }

    loadClasses() {
        this.apiService.getClasses().subscribe({
            next: (res) => {
                this.classes = res.data;
                if (this.classes.length > 0) {
                    this.selectedClass = this.classes[0]._id;
                    this.selectedClassName = this.classes[0].class_name;
                    this.onClassChange();
                }
            },
            error: (err) => {
                this.notify.error('Error fetching classes');
            }
        });
    }

    loadTeachers() {
        this.apiService.getTeachers({ limit: 100 }).subscribe({
            next: (res) => {
                this.teachers = res.data;
            },
            error: (err) => {
                this.notify.error('Error fetching teachers');
            }
        });
    }

    onClassChange() {
        if (!this.selectedClass) return;
        const cls = this.classes.find(c => c._id === this.selectedClass);
        this.selectedClassName = cls ? cls.class_name : '';
        this.subjects = cls ? cls.subjects : [];
        this.loadTimetable();
    }

    loadTimetable() {
        if (!this.selectedClass) return;
        this.apiService.getTimetable(this.selectedClass).subscribe({
            next: (res) => {
                // Backend returns data grouped by day
                this.timetableData = res.data || {
                    "Monday": [],
                    "Tuesday": [],
                    "Wednesday": [],
                    "Thursday": [],
                    "Friday": [],
                    "Saturday": []
                };
                this.updateUniqueTimeSlots();
                this.cdr.detectChanges();
            },
            error: () => {
                this.resetTimetableData();
                this.cdr.detectChanges();
            }
        });
    }

    resetTimetableData() {
        this.timetableData = {
            "Monday": [], "Tuesday": [], "Wednesday": [],
            "Thursday": [], "Friday": [], "Saturday": []
        };
        this.uniqueTimeSlots = [];
    }

    updateUniqueTimeSlots() {
        const slots = new Set<string>();
        Object.values(this.timetableData).forEach((daySlots: any) => {
            daySlots.forEach((slot: any) => {
                slots.add(`${slot.startTime} - ${slot.endTime}`);
            });
        });
        this.uniqueTimeSlots = Array.from(slots).sort((a, b) => a.localeCompare(b));
    }

    openEditModal(entry: any) {
        this.modalData = { ...entry };
        this.isModalOpen = true;
    }

    getTeacherName(teacherId: string) {
        const teacher = this.teachers.find(t => t._id === teacherId);
        return teacher ? teacher.name : 'Unknown';
    }

    saveSlot() {
        if (!this.selectedClass) return;
        if (!this.modalData.day || !this.modalData.subject || !this.modalData.teacherId || !this.modalData.startTime || !this.modalData.endTime) {
            this.notify.error('Please fill all required fields');
            return;
        }

        if (this.modalData.startTime >= this.modalData.endTime) {
            this.notify.error('Start time must be before end time');
            return;
        }

        const payload = {
            id: this.modalData._id,
            classId: this.selectedClass,
            ...this.modalData
        };

        this.apiService.saveTimetable(payload).subscribe({
            next: (res) => {
                this.notify.success(res.message || 'Timetable saved');
                this.isModalOpen = false;
                this.loadTimetable();
            },
            error: (err) => {
                this.notify.error(err.error?.message || 'Error saving timetable');
            }
        });
    }

    deleteEntry(id: string) {
        if (!confirm('Are you sure you want to delete this period?')) return;
        
        this.apiService.deleteTimetable(id).subscribe({
            next: () => {
                this.notify.success('Period deleted successfully');
                this.loadTimetable();
            },
            error: (err) => {
                this.notify.error(err.error?.message || 'Error deleting period');
            }
        });
    }

    closeModal() {
        this.isModalOpen = false;
    }

    toggleTabularView() {
        this.isTabularView = !this.isTabularView;
    }

    getEntryForDayAndTime(day: string, timeSlot: string) {
        return this.timetableData[day]?.find((slot: any) => `${slot.startTime} - ${slot.endTime}` === timeSlot);
    }

    printTimetable() {
        window.print();
    }
}
